import {Routes} from '@angular/router';

import { AppSettingsComponent } from './app-settings/app-settings.component'; 
import { routePermissionsGuard } from 'src/app/core/route-permissions';

export const SettingsRoutes: Routes =[
  {

    path: '',
    children:[
      {
        path: 'app-settings',
        component: AppSettingsComponent,
      },
      
      
    ]

  },
];