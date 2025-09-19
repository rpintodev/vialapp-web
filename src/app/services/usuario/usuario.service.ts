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

  private apiUrl = `${Environment.NODESERVER}api/usuarios`
 
  public createUsuario(usuario: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/create`,usuario);
  }

  public updateUsuario(usuario:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/updateWithOutImage`,usuario);
  }

  public getUsuariosByPeaje():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/getall`);
  }

  public getUsuariosByRolAndPeaje(id_rol:string):Observable<any[]>{
    const body = {
      id_rol:id_rol
    };
    return this.http.post<any[]>(`${this.apiUrl}/findByRolAndPeaje`,body);
  }

  public getGrupos():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/getGrupos`);
  }

  public getByEstadoTurno():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/findAllInTurno`);
  }


}
