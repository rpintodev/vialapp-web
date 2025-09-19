import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Environment } from 'src/app/environment/environment';
import { HttpClient } from '@angular/common/http';
import { ITurno } from 'src/app/models/turno';
import { map, Observable } from 'rxjs';
import { TurnoMapper } from 'src/app/mappers/model.mapper';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  constructor(private http: HttpClient) { }

  authService = inject(AuthService);
  private apiUrl = `${Environment.NODESERVER}api/turnos`;

 
  public updateTurno(turno:ITurno):Observable<any>{
    const body = {Turno: turno}
    console.log('Updating turno:', body);
    return this.http.post<any>(`${this.apiUrl}/updateTurno`,body)
  }

  public getAll():Observable<ITurno[]>{
    return this.http.get<ITurno[]>(`${this.apiUrl}/getAllTurnos`).pipe(map(response => response.map(TurnoMapper.fromDto)));
  }

}
