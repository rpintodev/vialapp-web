import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/app/models/usuario';
import { Environment } from 'src/app/environment/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  authService = inject(AuthService);
  constructor(private http: HttpClient){}
  usuarioSession: IUsuario = this.authService.userData;

  private apiUrl = `${Environment.NODESERVER}api/usuarios`
 
  public createUsuario(usuario: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/create`,usuario);
  }

  public updateUsuario(usuario:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/updateWithOutImage`,usuario);
  }

  public getUsuariosByPeaje():Observable<any[]>{
    const body = {id_peaje:this.usuarioSession.IdPeaje};
    return this.http.post<any[]>(`${this.apiUrl}/getall`,body);
  }

  public getUsuariosByRolAndPeaje(id_rol:string):Observable<any[]>{
    const body = {
      id_peaje:this.usuarioSession.IdPeaje,
      id_rol:id_rol
    };
    return this.http.post<any[]>(`${this.apiUrl}/findByRolAndPeaje`,body);
  }

  public getGrupos():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/getGrupos`);
  }


}
