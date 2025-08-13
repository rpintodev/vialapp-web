import {Routes} from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component'; 
import { compareAsc } from 'date-fns';

export const RecaudacionVialRoutes: Routes =[
  {

    path: '',
    children:[
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      
    ]

  },
];