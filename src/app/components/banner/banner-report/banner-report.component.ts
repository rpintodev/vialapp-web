import { NumberInput } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner-report',
  imports: [],
  templateUrl: './banner-report.component.html',
})
export class BannerReportComponent {
  @Input() tipoReporte: number;

  
  // 0: Liquidacion, 1: Ventas, 2: Compras, 3: Inventario
}
