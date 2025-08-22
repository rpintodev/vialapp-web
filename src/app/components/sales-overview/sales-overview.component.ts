import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TablerIconsModule } from 'angular-tabler-icons';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ChartComponent,NgApexchartsModule,} from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { BovedaService } from 'src/app/services/boveda/boveda.service';
import { IBoveda } from 'src/app/models/boveda';
import { DateUtils } from 'src/app/utils/date.utils';
import { FormatValue } from 'src/app/utils/boveda.utils';
import * as moment from 'moment';
import { ChartOptions } from 'src/app/utils/charts.utils';

@Component({
  selector: 'app-sales-overview',
imports: [
  NgApexchartsModule, 
  MaterialModule,
  MatDatepickerModule,
  TablerIconsModule,
  MatButtonModule, 
  MatIconModule,
  MatFormFieldModule, 
  MatInputModule],
  templateUrl: './sales-overview.component.html',
  	providers: [provideNativeDateAdapter()],
})
export class AppSalesOverviewComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public areaChartOptions: Partial<ChartOptions> | any;
  fechaSeleccionada: Date = new Date();
  ultimaBoveda: IBoveda;
  constructor( 
    private service:BovedaService, 
    private bovedaState: BovedaService) {}


  ngOnInit() {
    this.getBoveda(this.fechaSeleccionada);
  }

  getBoveda(fechaT:Date){
    const fechaString = DateUtils.formateDate(fechaT);
    this.service.getBovedaByDate(fechaString).subscribe(response => {

      const totalFormateado = FormatValue.currency(response.data[response.data.length - 1].Total);

      // Asignamos la última boveda
      this.ultimaBoveda = {
        fecha: response.data[response.data.length - 1].Fecha,
        moneda1: response.data[response.data.length - 1].Moneda_1,
        billete5: response.data[response.data.length - 1].Billete_5,
        billete10: response.data[response.data.length - 1].Billete_10,
        billete20: response.data[response.data.length - 1].Billete_20,
        total: totalFormateado
      }

      // Actualizamos el estado de la última boveda
      this.bovedaState.setUltimaBoveda(this.ultimaBoveda);

      
      // Aquí construimos los arrays de series
      const moneda1 = response.data.map(d => ({
        x: moment(d.Fecha).toDate(),
        y: d.Moneda_1
      }));
      const billete5 = response.data.map(d => ({
        x: moment(d.Fecha).toDate(),
        y: d.Billete_5 *5
      }));
      const billete10 = response.data.map(d => ({
        x: moment(d.Fecha).toDate(),
        y: d.Billete_10*10
      }));
      const billete20 = response.data.map(d => ({
        x: moment(d.Fecha).toDate(),
        y: d.Billete_20*20
      }));

      this.areaChartOptions = {
        series: [
          { name: '$1', data: moneda1 },
          { name: '$5', data: billete5 },
          { name: '$10', data: billete10 },
          { name: '$20', data: billete20 }
        ],
        chart: {
          type: 'area',
          height: 350,
          toolbar: { show: true, tools: { zoom: true, zoomin: true, zoomout: true, pan: true, reset: true } },
          zoom: { enabled: true },
        },
        xaxis: {
          type: 'datetime',
          title: { text: 'Hora' },
          labels: {
            datetimeFormatter: {
              hour: 'HH:mm'
            }
          }
        },
        yaxis: {
          title: { text: 'Cantidad' }
        },
        grid: { borderColor: '#e7e7e7' },
        stroke: { curve: 'smooth' },
        tooltip: {
          x: {
            format: 'dd/MM/yyyy HH:mm'
          }
        },
        dataLabels: { enabled: false },
        legend: { position: 'top' },
        colors: ['#2196F3', '#4CAF50', '#FFC107', '#FF5722'],
        markers: { size: 0 }
      };
    });
  };

  onFechaChange(event: any) {
    this.getBoveda(event.value);
  }

  
}
