import { NavItem } from './nav-item/nav-item';
import { RoutesService } from 'src/app/services/routes/routes.service';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: RoutesService.ROUTES.DASHBOARD,
  },
  

  {
    navCap: 'Apps',
  },
  
  {
    displayName: 'Recaudacion vial',
    iconName: 'device-tablet-dollar',
    chip: true,
    route: '',
    children: [
      {
        displayName: 'Asignación',
        iconName: 'user-square',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route: RoutesService.ROUTES.RECAUDACION_VIAL.ASIGNACION, ///recaudacion-vial/asignacion
      },
      {
        displayName: 'Usuarios',
        iconName: 'users-group',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route: RoutesService.ROUTES.RECAUDACION_VIAL.USUARIOS, ///recaudacion-vial/usuarios
      },
      {
        displayName: 'App Settings',
        iconName: 'settings',
        route: RoutesService.ROUTES.SETTINGS.APP_SETTINGS, ///settings/app-settings
      },
  
    ],
  },

  {
    navCap: 'REPORTS',
  },
  
   {
    displayName: 'Reportes Recaudación',
    iconName: 'report-analytics',
    chip: true,
    route: '',
    children: [
  
      {
        displayName: 'Informe de Liquidaciones',
        iconName: 'file-invoice',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route: RoutesService.ROUTES.REPORTS.LIQUIDATION, ///reports/liquidation-report
      },
      {
        displayName: 'Consolidado',
        iconName: 'file-invoice',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route: RoutesService.ROUTES.REPORTS.CONSOLIDATED, ///reports/consolidated-report
      },
    ],
  },
  {
    navCap: 'SETTINGS',
  },
  
  {
    displayName: 'User Settings',
    iconName: 'user-scan',
    route: '',
  },

];
