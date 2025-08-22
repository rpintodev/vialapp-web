import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import { BovedaSettingsComponent } from 'src/app/components/boveda-settings/boveda-settings.component';
import { AppTransactionPerformanceComponent } from 'src/app/components/transactions-performance/transactions-performance.component';
import { WorkTableComponent } from 'src/app/components/work-table/work-table.component';

@Component({
  selector: 'app-app-settings',
  imports: [
    MatCardModule,
    TablerIconsModule,
    BovedaSettingsComponent,
    WorkTableComponent,
    AppTransactionPerformanceComponent,
  ],
  templateUrl: './app-settings.component.html',
})
export class AppSettingsComponent {

  isSettings: boolean = true;

  openTagModal() {
    // Logic to open the Tag modal
  }
  openBovedaModal(){}
}
