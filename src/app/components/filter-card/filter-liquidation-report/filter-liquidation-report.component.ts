import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import * as moment from 'moment';
import { MaterialModule } from 'src/app/material.module';
import { IMovimiento } from 'src/app/models/movimiento';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import generatePDF from 'src/app/services/pdf/liquidation-report-pdf.service';

@Component({
  selector: 'app-filter-liquidation-report',
  imports: [MatCardModule,MatFormFieldModule,MatDatepickerModule,MatInput, MaterialModule, CommonModule],
  templateUrl: './filter-liquidation-report.component.html',
  providers: [provideNativeDateAdapter()],
  
})
export class FilterLiquidationReportComponent implements OnInit {

    fechaSeleccionada: Date = new Date();
    selectedCajero:IMovimiento[];
    cajeroSeleccionado: string = '0'; // Valor por defecto para "Todos"
    @Output() pdfGenerated = new EventEmitter<string>();

  constructor(private movimientoService:MovimientoService) {}

  getCajerosLiquidados(fecha:Date){
    const fechaInicio=moment(fecha).format('YYYY-MM-DD hh:mm:ss');
    this.movimientoService.getCajerosliquidadosByDate(fechaInicio).subscribe(response =>{
      this.selectedCajero = response.map(d=> ({
        id: d.Id,
        nombreCajero: d.NombreCajero,
        idturno: d.IdTurno,
        fecha: d.Fecha,
      }));
      console.log("Cajeros liquidados:", this.selectedCajero);
    },error =>{
      console.error("Error al obtener cajeros liquidados:", error);
    });
  }

  setCajeroSeleccionado(event: any) {
    this.cajeroSeleccionado = event.value;
  }

  onFechaChange(event: any) {
    this.getCajerosLiquidados(event.value);
  }

  ngOnInit() {
    this.getCajerosLiquidados(this.fechaSeleccionada);
  }

  async generateReport() {
    const products = [
      { nombre: 'papas', cantidad: 3, total: 23.5 },
      { nombre: 'huevos', cantidad: 2, total: 12.5 },
      { nombre: 'pan', cantidad: 1, total: 5.0 },
    ];

    const pdfBlobUrl = await generatePDF(
      products,
      '12345',
      new Date().toLocaleDateString()
    );

    this.pdfGenerated.emit(pdfBlobUrl);
  }

}
