import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { authGuard } from './core/auth-guard';
import { loginGuard } from './core/login-guard';
import { routePermissionsGuard } from './core/route-permissions';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',              
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'reports',
        canActivate: [routePermissionsGuard],
        loadChildren: () =>
          import('./pages/reports/reports.routes').then(
            (m) => m.RerportsRoutes
          ),
      },
      {
        path: 'recaudacion-vial',
        canActivate: [routePermissionsGuard],

        loadChildren: () =>
          import('./pages/recaudacion-vial/recaudacion-vial.routes').then(
            (m) => m.RecaudacionVialRoutes
          ),
      },
      {
        path: 'settings',
        canActivate: [routePermissionsGuard],
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
        canActivate: [loginGuard],
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
