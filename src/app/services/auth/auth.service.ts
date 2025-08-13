import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Environment } from 'src/app/environment/environment';
import { UsuarioMapper } from 'src/app/mappers/model.mapper';
import { IUsuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
   constructor(private http: HttpClient) { }

  private apiUrl = `${Environment.NODESERVER}api/usuarios`;

  usuario:IUsuario;
  private token: string = '';

  public login(usuario: string, contraseña: string):Observable <IUsuario> {
    const body = {
      Usuario: usuario,
      Password: contraseña
    };
    return this.http.post<IUsuario>(`${this.apiUrl}/login`, body);
  }


  get isLoggedIn(){
    let token=localStorage.getItem('token');
    return token?true:false
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  get userData(){
    let userData = localStorage.getItem('user');
    return userData?JSON.parse(userData):null;
  }

}
