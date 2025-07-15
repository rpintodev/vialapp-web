import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MovimientoMapper } from 'src/app/mappers/model.mapper';
import { MaterialModule } from 'src/app/material.module';
import { IMovimiento } from 'src/app/models/movimiento';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import generateBovedaReport from 'src/app/services/pdf/boveda-report.service';

@Component({
  selector: 'app-filter-boveda-report',
  imports: [MatCardModule,MatFormFieldModule,MatDatepickerModule,MatInput, MaterialModule, CommonModule],
  templateUrl: './filter-boveda-report.component.html',
  providers: [provideNativeDateAdapter()],
})
export class FilterBovedaReportComponent {
  constructor(private movimientoService:MovimientoService){}

  fechaSeleccionada: Date ;
  movimientos: IMovimiento[];
  @Output() pdfGenerated = new EventEmitter<string>;

  onFechaChange(event:any){
    this.fechaSeleccionada=event.value;
  }

  async generateReport() {
        
        this.movimientoService.getMovimientosReporteRetiros(this.fechaSeleccionada).subscribe( async response=>{
          this.movimientos = response.map(MovimientoMapper.fromDto);
          const pdfBlobUrl = await generateBovedaReport(this.movimientos);
          this.pdfGenerated.emit(pdfBlobUrl);
        });
        
      }

}
