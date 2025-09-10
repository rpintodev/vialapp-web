import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { U } from '@angular/cdk/unique-selection-dispatcher.d-DSFqf1MM';
import { identity } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeajeRequestFactory {

    constructor(private authService: AuthService) { }

    updatePeajeRequest():any{
        const idPeaje = this.authService.userData.IdPeaje == '1'? '2': '1';
        const idUsuario = this.authService.userData.Id
        const user = this.authService.userData.Usuario
        return {
            IdPeaje: idPeaje,
            Id: idUsuario,
            Usuario: user,
            session_token: localStorage.getItem('token'),
        }
    }



}




