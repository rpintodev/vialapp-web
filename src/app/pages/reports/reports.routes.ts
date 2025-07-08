import {Routes} from '@angular/router';

import {BovedaReportComponent} from './boveda-report/boveda-report.component';
import { ConsolidatedReportComponent } from './consolidated-report/consolidated-report.component';
import { LiquidationReportComponent } from './liquidation-report/liquidation-report.component';
import { compareAsc } from 'date-fns';

export const RerportsRoutes: Routes =[
  {

    path: '',
    children:[
      {
        path: 'boveda-report',
        component: BovedaReportComponent,
      },
      {
        path: 'liquidation-report',
        component: LiquidationReportComponent,
      },
      {
        path: 'consolidated-report',
        component: ConsolidatedReportComponent,
      },
    ]

  },
];