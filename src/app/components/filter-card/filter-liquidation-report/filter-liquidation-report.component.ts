import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-filter-liquidation-report',
  imports: [MatCardModule,MatFormFieldModule,MatDatepickerModule,MatInput, MatSelectModule],
  templateUrl: './filter-liquidation-report.component.html',
  providers: [provideNativeDateAdapter()],
  
})
export class FilterLiquidationReportComponent {

    fechaSeleccionada: Date = new Date();
    selectedCajero = [
        { name: 'Veronica San Martin', value: 'cajero1' },
        { name: 'Nicole Ruiz', value: 'cajero2' },
        { name: 'Andre Moreno', value: 'cajero3' }
    ];
    onFechaChange(event: any) {
  }

}
