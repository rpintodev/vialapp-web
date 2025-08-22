import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Environment } from 'src/app/environment/environment';
import { IBoveda } from 'src/app/models/boveda';
import { AuthService } from '../auth/auth.service';
import { IUsuario } from 'src/app/models/usuario';
import { BovedaMapper } from 'src/app/mappers/model.mapper';

@Injectable({
  providedIn: 'root'
})
export class BovedaService {
  
  authService = inject(AuthService);
  usuarioSession:IUsuario=this.authService.userData;
  constructor(private http: HttpClient) { }

  private apiUrl = `${Environment.NODESERVER}api/boveda`;
  private ultimaBovedaSubject = new BehaviorSubject<IBoveda | null>(null);

  ultimaBoveda$ = this.ultimaBovedaSubject.asObservable();

  private get userPeajeId(): string {
    return this.authService.userData.IdPeaje;
  }
  
  setUltimaBoveda(data: IBoveda) {
    this.ultimaBovedaSubject.next(data);
  }

  public getBovedaByDate(fecha:string):Observable<{ data: any[] }>{
    const fechaFin = new Date(fecha);
    fechaFin.setDate(fechaFin.getDate() + 1); // Incrementar un
    const body = {
        fecha_inicio: fecha,
        fecha_fin: fechaFin,
        id_peaje: this.usuarioSession.IdPeaje,
    }
    return this.http.post<{ data: any[] }>(`${this.apiUrl}/getBovedaByDate`,body);
  }

  public getBoveda():Observable<IBoveda>{
    const body = {id_peaje:this.userPeajeId};
    return this.http.post<any>(`${this.apiUrl}/getall`,body).pipe(map(reponse => BovedaMapper.fromDto(reponse[0])))
  }

  public getBovedaTag():Observable<IBoveda>{
    const body = {id_peaje:this.userPeajeId};
    return this.http.post<any>(`${this.apiUrl}/getSecreBoveda`,body).pipe(map(reponse => BovedaMapper.fromDto(reponse[0])))
  }




}