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
        route: RoutesService.ROUTES.RECAUDACION_VIAL.ASIGNACION,
      },
      {
        displayName: 'Usuarios',
        iconName: 'users-group',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route: RoutesService.ROUTES.RECAUDACION_VIAL.USUARIOS,
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
        route: RoutesService.ROUTES.REPORTS.LIQUIDATION,
      },
      {
        displayName: 'Informe de bóveda',
        iconName: 'file-invoice',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route: RoutesService.ROUTES.REPORTS.BOVEDA,
      },
      {
        displayName: 'Consolidado',
        iconName: 'file-invoice',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route: RoutesService.ROUTES.REPORTS.CONSOLIDATED,
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
  {
    displayName: 'App Settings',
    iconName: 'settings',
    route: RoutesService.ROUTES.SETTINGS.APP_SETTINGS,
  },
  
];
