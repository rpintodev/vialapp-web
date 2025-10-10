import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ChartOptions } from 'src/app/utils/charts.utils';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import { IMovimiento } from 'src/app/models/movimiento';
import { calcularFaltante, calcularTotalRecibido } from 'src/app/utils/movimientos-utils';
import { BovedaService } from 'src/app/services/boveda/boveda.service';

@Component({
  selector: 'app-tag-overview',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NgApexchartsModule,
    TablerIconsModule
  ],
  templateUrl: './tag-overview.component.html',
    styleUrls: ['./tag-overview.component.scss']
 })
export class TagOverviewComponent implements OnInit {
  saldoTags :number;
  cantidadTags : number;
  movimientos: IMovimiento[] = [];
  tagsVendidos: number;
  selectedMonth = new Date().getMonth();
  currentMonth = '';
  isLoadingData: boolean = true;

  public areaChartOptions: Partial<ChartOptions> | any;
  
    constructor(
      private movimientoService:MovimientoService,
      private bovedaService: BovedaService,
    ){}

  months = [
    { value: 0, name: 'Enero' },
    { value: 1, name: 'Febrero' },
    { value: 2, name: 'Marzo' },
    { value: 3, name: 'Abril' },
    { value: 4, name: 'Mayo' },
    { value: 5, name: 'Junio' },
    { value: 6, name: 'Julio' },
    { value: 7, name: 'Agosto' },
    { value: 8, name: 'Septiembre' },
    { value: 9, name: 'Octubre' },
    { value: 10, name: 'Noviembre' },
    { value: 11, name: 'Diciembre' }
  ];

  chartOptions: ChartOptions = {
    series: [
      {
        name: 'Ventas',
        data: []
      }
    ],
    chart: {
      type: 'bar',
      height: 280, // Altura reducida pero suficiente para mostrar el eje X
      toolbar: {
        show: false
      },
      // Agregar padding para evitar corte del eje X
      offsetY: -10, // Mueve el gráfico hacia arriba para dar más espacio al eje X
      offsetX: 0
    },
    colors: ['#398bf7'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          fontSize: '11px', // Reducir tamaño de fuente para que quepa mejor
          fontFamily: 'Arial, sans-serif'
        },
        offsetY: 0 // Ajustar posición vertical de las etiquetas
      }
    },
    yaxis: {
      title: {
        text: 'Ventas ($)'
      },
      labels: {
        style: {
          fontSize: '11px'
        }
      }
    },
    grid: {
      show: true,
      borderColor: '#e0e6ed',
      strokeDashArray: 5,
      padding: {
        top: 0,
        right: 0,
        bottom: 10, // Aumentar padding inferior para las etiquetas del eje X
        left: 0
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    theme: {
      mode: 'light'
    },
    tooltip: {
      enabled: true,
      theme: 'light'
    },
    legend: {
      show: true,
      position: 'top'
    },
    markers: {
      size: 0
    },
    fill: {
      opacity: 1
    },
    labels: []
  };

  ngOnInit() {
    this.loadData();
  }

  private loadData(){
    this.isLoadingData = true;
    this.updateCurrentMonth();
    this.getBovedaTag();
    this.getVentaTags();
    this.generateData();
  }

  updateCurrentMonth() {
    this.currentMonth = this.months[this.selectedMonth].name;

  }

  changeMonth() {
    this.isLoadingData = true;
    this.updateCurrentMonth();
    this.getVentaTags();
  }

  private getBovedaTag(){
    this.bovedaService.getBovedaTag().subscribe((data) => {
      this.saldoTags = parseFloat(data.total??'0') || 0;
    }) 
  }

  private getVentaTags(){
    this.movimientoService.getVentaTag(this.selectedMonth+1).subscribe((data) => {
      this.movimientos = data.map(item => ({
        totalRecibido: calcularTotalRecibido(item),
        fecha: item.Fecha,
        ...item
      }));
      this.generateData();
      this.isLoadingData = true;

    });
  }

  generateData() {
    const daysInMonth = new Date(new Date().getFullYear(), this.selectedMonth + 1, 0).getDate();
    const categories = [];
    const data = []

    for (let i = 1; i <= daysInMonth; i++) {
      categories.push(i.toString());
      const dailyTotal = this.movimientos
        .filter(mov => new Date(mov.fecha ?? '').getDate() === i)
        .map((mov) => parseInt(mov.totalRecibido ?? '0') || 0)
        .reduce((sum, value) => sum + value, 0);
      data.push(dailyTotal);
    }

    this.chartOptions = {
      ...this.chartOptions,
      series: [{ name: 'Ventas', data }],
      xaxis: { ...this.chartOptions.xaxis, categories }
    };
  }
}
