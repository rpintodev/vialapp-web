import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  
  // Definir todas las rutas en un solo lugar
  static readonly ROUTES = {
    DASHBOARD: '/dashboard',
    RECAUDACION_VIAL: {
      ASIGNACION: '/recaudacion-vial/asignacion',
      USUARIOS: '/recaudacion-vial/usuarios'
    },
    REPORTS: {
      LIQUIDATION: '/reports/liquidation-report',
      BOVEDA: '/reports/boveda-report',
      CONSOLIDATED: '/reports/consolidated-report'
    },
    SETTINGS: {
      APP_SETTINGS: '/settings/app-settings',
      USER_SETTINGS: '/settings/user-settings'
    }
  };

  // Métodos helper para obtener rutas específicas
  getAppSettingsRoute(): string {
    return RoutesService.ROUTES.SETTINGS.APP_SETTINGS;
  }

  getUsuariosRoute(): string {
    return RoutesService.ROUTES.RECAUDACION_VIAL.USUARIOS;
  }

  // Más métodos según necesites...
}
