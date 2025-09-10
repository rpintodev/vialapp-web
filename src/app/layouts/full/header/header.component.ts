import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUsuario } from 'src/app/models/usuario';
import { PeajeService } from 'src/app/services/peaje/peaje.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

  peajeService = inject(PeajeService)
  toastr = inject(ToastrService);
  authService = inject(AuthService);
  router = inject(Router);

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Input() sidebarOpen: boolean = false;

  usuarioSession:IUsuario=this.authService.userData;
  nombre:string = `${this.usuarioSession.Nombre} ${this.usuarioSession.Apellido}`;
  peaje:string = this.usuarioSession.NombrePeaje;

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl('/authentication/login');
  }

  private removeAndAddSession(response:any):void{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.setItem('token',response.data.session_token);
    localStorage.setItem('user',JSON.stringify(response.data))
  }

 

  private handleSucess(response:any){
        this.removeAndAddSession(response);
        window.location.reload();
        this.toastr.success('Peaje actualizado!', 'Éxito', { timeOut: 3000 });
  }
  
  public updatePeaje():void{
    this.peajeService.updatePeaje().subscribe((response:any) => {
      if (response) {
        this.handleSucess(response);
      }
    });
  }

 



}