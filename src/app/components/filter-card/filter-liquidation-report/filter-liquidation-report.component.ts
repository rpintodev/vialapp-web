import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import * as moment from 'moment';
import { MovimientoMapper } from 'src/app/mappers/model.mapper';
import { MaterialModule } from 'src/app/material.module';
import { IMovimiento } from 'src/app/models/movimiento';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import generateLiquidationReport from 'src/app/services/pdf/liquidation-report-pdf.service';

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
    movimientos: IMovimiento[];
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

    console.log('Id turno seleccionado:',event);
    this.cajeroSeleccionado = event;
  }

  onFechaChange(event: any) {
    this.getCajerosLiquidados(event.value);
  }

  ngOnInit() {
    this.getCajerosLiquidados(this.fechaSeleccionada);
  }

  async generateReport(idTurno:string) {
    
    this.movimientoService.getMovimientosByTurno(idTurno).subscribe( async response=>{
      this.movimientos = response.map(MovimientoMapper.fromDto);
      const pdfBlobUrl = await generateLiquidationReport(this.movimientos);
      this.pdfGenerated.emit(pdfBlobUrl);
    });
    
  }

}
