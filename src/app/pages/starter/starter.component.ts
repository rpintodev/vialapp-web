import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppSalesOverviewComponent } from 'src/app/components/sales-overview/sales-overview.component';
import { AppYearlyBreakupComponent } from 'src/app/components/yearly-breakup/yearly-breakup.component';
import { AppMonthlyEarningsComponent } from 'src/app/components/monthly-earnings/monthly-earnings.component';
import { AppRecentTransactionsComponent } from 'src/app/components/recent-transactions/recent-transactions.component';
import { AppProductPerformanceComponent } from 'src/app/components/product-performance/product-performance.component';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { AppTopCardComponent } from 'src/app/components/top-cards/top-cards.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';

@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppTopCardComponent,
    AppSalesOverviewComponent,
    AppYearlyBreakupComponent,
    AppMonthlyEarningsComponent,
    AppRecentTransactionsComponent,
    AppProductPerformanceComponent,
    BannerComponent,
    AppBlogCardsComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }