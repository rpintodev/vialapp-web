import { Component } from '@angular/core';
import { BannerReportComponent } from '../../../components/banner/banner-report/banner-report.component';
import { FilterLiquidationReportComponent } from 'src/app/components/filter-card/filter-liquidation-report/filter-liquidation-report.component';

@Component({
  selector: 'app-consolidated-report',
  imports: [BannerReportComponent, FilterLiquidationReportComponent],
  templateUrl: './consolidated-report.component.html',
})


export class ConsolidatedReportComponent {

}
