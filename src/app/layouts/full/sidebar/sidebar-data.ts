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
    displayName: 'Reportes',
    iconName: 'report',
    route: '',
    chip: true,
    external: true,
    chipClass: 'bg-light-secondary text-secondary',
  },
  

  {
    navCap: 'Apps',
  },
  
  {
    displayName: 'Recuadacion vial',
    iconName: 'file-invoice',
    chip: true,
    route: '',
    children: [
      {
        displayName: 'Liquidacion',
        iconName: 'point',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route: '',
      },
      {
        displayName: 'Detail',
        iconName: 'point',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        route:
          '',
      },
      {
        displayName: 'Create',
        iconName: 'point',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        chipContent: 'PRO',
        route: '/https://modernize-angular-main.netlify.app/apps/addInvoice',
      },
      {
        displayName: 'Edit',
        iconName: 'point',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        chipContent: 'PRO',
        route:
          '/https://modernize-angular-main.netlify.app/apps/editinvoice/101',
      },
    ],
  },
  
];
