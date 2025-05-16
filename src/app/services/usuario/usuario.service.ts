import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/app/models/usuario';
import { Environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${Environment.NODESERVER}api/usuarios`;

  usuario:IUsuario;
  private token: string = '';

  public login(usuario: string, contraseña: string):Observable <IUsuario> {
    const body = {
      usuario: usuario,
      contraseña: contraseña
    };

    console.log('Usuario:', usuario);
    console.log('Contraseña:', contraseña); 
    console.log('URL:', this.apiUrl);

    return this.http.post<IUsuario>(`${this.apiUrl}/login`, body);

    // return this.http.post(this.apiUrl, body);
  }

}
