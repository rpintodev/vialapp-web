import { Component, } from '@angular/core';
import { BannerReportComponent } from '../../../components/banner/banner-report/banner-report.component';
import { FilterConsolidationReportComponent } from 'src/app/components/filter-card/filter-consolidation-report/filter-consolidation-report.component';
import { PdfCardComponent } from 'src/app/components/pdf-card/pdf-card/pdf-card.component';

@Component({
  selector: 'app-consolidated-report',
  imports: [BannerReportComponent, FilterConsolidationReportComponent,PdfCardComponent],
  templateUrl: './consolidated-report.component.html',
})


export class ConsolidatedReportComponent {
  public pdfSrc: string | undefined;
  


}
