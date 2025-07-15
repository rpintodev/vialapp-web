import { Component } from '@angular/core';
import { BannerReportComponent } from '../../../components/banner/banner-report/banner-report.component';
import { FilterBovedaReportComponent } from 'src/app/components/filter-card/filter-boveda-report/filter-boveda-report.component';


@Component({
  selector: 'app-boveda-report',
  imports: [BannerReportComponent, FilterBovedaReportComponent],
  templateUrl: './boveda-report.component.html',
})
export class BovedaReportComponent {

}
