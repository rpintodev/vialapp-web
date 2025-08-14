import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
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
        route: '/recaudacion-vial/asignacion',
      },
      {
        displayName: 'Usuarios',
        iconName: 'users-group',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route: '/recaudacion-vial/usuarios',
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
        route:
          '/reports/liquidation-report',
      },
      {
        displayName: 'Informe de bóveda',
        iconName: 'file-invoice',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route:
          '/reports/boveda-report',
      },
      {
        displayName: 'Consolidado',
        iconName: 'file-invoice',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route:
          '/reports/consolidated-report',
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
