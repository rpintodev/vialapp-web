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
    iconName: 'file-invoice',
    chip: true,
    route: '',
    children: [
      {
        displayName: 'Asignación',
        iconName: 'user-square',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route: '',
      },
      {
        displayName: 'Usuarios',
        iconName: 'users-group',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route: '',
      },
    ],
  },

  {
    navCap: 'REPORTS',
  },
  
   {
    displayName: 'Reportes Recaudación',
    iconName: 'file-invoice',
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
