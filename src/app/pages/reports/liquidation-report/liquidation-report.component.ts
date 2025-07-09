import { Component } from '@angular/core';
import { BannerReportComponent } from '../../../components/banner/banner-report/banner-report.component';
import { FilterLiquidationReportComponent } from 'src/app/components/filter-card/filter-liquidation-report/filter-liquidation-report.component';
import { PdfCardComponent } from 'src/app/components/pdf-card/pdf-card/pdf-card.component';
@Component({
  selector: 'app-liquidation-report',
  imports: [BannerReportComponent,FilterLiquidationReportComponent,PdfCardComponent],
  templateUrl: './liquidation-report.component.html',
})
export class LiquidationReportComponent {
    public pdfSrc: string | undefined;

}
