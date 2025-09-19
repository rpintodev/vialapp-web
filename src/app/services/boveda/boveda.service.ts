import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Environment } from 'src/app/environment/environment';
import { IBoveda } from 'src/app/models/boveda';
import { AuthService } from '../auth/auth.service';
import { IUsuario } from 'src/app/models/usuario';
import { BovedaMapper } from 'src/app/mappers/model.mapper';
import { BovedaRequestFactory } from 'src/app/factories/boveda-request.factory';

@Injectable({
  providedIn: 'root'
})
export class BovedaService {
  
  authService = inject(AuthService);
  constructor(private http: HttpClient) { }

  private readonly requestFactory = inject(BovedaRequestFactory);
  private apiUrl = `${Environment.NODESERVER}api/boveda`;
  private ultimaBovedaSubject = new BehaviorSubject<IBoveda | null>(null);

  ultimaBoveda$ = this.ultimaBovedaSubject.asObservable();

  setUltimaBoveda(data: IBoveda) {
    this.ultimaBovedaSubject.next(data);
  }

  public getBovedaByDate(fecha:string):Observable<{ data: any[] }>{
    const fechaFin = new Date(fecha);
    fechaFin.setDate(fechaFin.getDate() + 1); // Incrementar un
    const body = {
        fecha_inicio: fecha,
        fecha_fin: fechaFin,
    }
    return this.http.post<{ data: any[] }>(`${this.apiUrl}/getBovedaByDate`,body);
  }

  public getBoveda():Observable<IBoveda>{
    return this.http.get<any>(`${this.apiUrl}/getall`).pipe(map(reponse => BovedaMapper.fromDto(reponse[0])))
  }

  public getBovedaTag():Observable<IBoveda>{
    return this.http.get<any>(`${this.apiUrl}/getSecreBoveda`).pipe(map(reponse => BovedaMapper.fromDto(reponse[0])))
  }

  public updateBoveda(boveda:IBoveda):Observable<any>{
    const body = this.requestFactory.createUpdateBovedaRequest(boveda);
    console.log('Update Boveda Request Body:', body);
    return this.http.post<any>(`${this.apiUrl}/editarBoveda`,body);
  }




}