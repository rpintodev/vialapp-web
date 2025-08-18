import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',              
        canActivate: [authGuard],

        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./pages/reports/reports.routes').then(
            (m) => m.RerportsRoutes
          ),
      },
      {
        path: 'recaudacion-vial',
        loadChildren: () =>
          import('./pages/recaudacion-vial/recaudacion-vial.routes').then(
            (m) => m.RecaudacionVialRoutes
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.routes').then(
            (m) => m.SettingsRoutes
          ),
      },
        
      
      
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
 
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
