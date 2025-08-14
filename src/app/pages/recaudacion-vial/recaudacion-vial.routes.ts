import {Routes} from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component'; 
import { AsignacionComponent } from './asignacion/asignacion.component';

export const RecaudacionVialRoutes: Routes =[
  {

    path: '',
    children:[
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'asignacion',
        component: AsignacionComponent,
      },
      
    ]

  },
];