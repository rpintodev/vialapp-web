import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppSalesOverviewComponent } from 'src/app/components/sales-overview/sales-overview.component';
import { AppTransactionPerformanceComponent } from 'src/app/components/transactions-performance/transactions-performance.component';
import { AppDenominationCardComponent } from 'src/app/components/denomination-card/denomination-cards.component';
import { BannerComponent } from 'src/app/components/banner/banner-dashboard/banner.component';

@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppDenominationCardComponent,
    AppSalesOverviewComponent,
    AppTransactionPerformanceComponent,
    BannerComponent,
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }