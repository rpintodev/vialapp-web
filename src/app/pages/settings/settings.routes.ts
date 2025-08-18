import {Routes} from '@angular/router';

import { AppSettingsComponent } from './app-settings/app-settings.component'; 

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