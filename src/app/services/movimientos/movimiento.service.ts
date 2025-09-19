import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Environment } from 'src/app/environment/environment';
import { AuthService } from '../auth/auth.service';
import { MovimientoRequestFactory } from '../../factories/movimeinto-request.factory';
import { MovimientoMapper } from 'src/app/mappers/model.mapper';
import { IMovimiento } from 'src/app/models/movimiento';
import { get } from 'node:http';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private readonly authService = inject(AuthService);
  private readonly requestFactory = inject(MovimientoRequestFactory);
  private readonly apiUrl = `${Environment.NODESERVER}api/movimientos`;

  constructor(private http: HttpClient) {}


  getByDateAndTipoMovimiento(fecha: string, idTipoMovimiento: string): Observable<any[]> {
    const request = this.requestFactory.createByDateAndTipoRequest(fecha, idTipoMovimiento);
    return this.http.post<any[]>(`${this.apiUrl}/findByDateTipoMovimiento`, request).pipe(map((response) => response.map(MovimientoMapper.fromDto)));
  }

  getCajerosliquidadosByDate(fecha: string): Observable<any[]> {
    const request = this.requestFactory.createCajerosLiquidadosRequest(fecha);
    return this.http.post<any[]>(`${this.apiUrl}/getCajerosliquidadosByDate`, request);
  }

  getVentaTag(mes: number):Observable<any[]> {
    const request = this.requestFactory.createVentaTagRequest(mes);
    return this.http.post<any[]>(`${this.apiUrl}/getVentaTag`, request).pipe(
      map((response) => response.map(MovimientoMapper.fromDto))
    );
  }

  getMovimientosByTurno(idTurno: string): Observable<IMovimiento[]> {
    const request = { IdTurno: idTurno };
    return this.http.post<any[]>(`${this.apiUrl}/findByTurno`, request).pipe(
      map((response) => response.map(MovimientoMapper.fromDto)));

  }
  
  getMovimientosReporteRetiros(fecha: Date): Observable<any[]> {
    const request = {
      fecha_inicio: fecha,
      fecha_fin: fecha,
    };
    console.log('Request for getMovimientosReporteRetiros:', request);
    return this.http.post<any[]>(`${this.apiUrl}/getMovimientosReporteRetiros`, request, { withCredentials: true }).pipe(
      map((response) => response.map(MovimientoMapper.fromDto))
    );
  }

  getUltimosDepositos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getFortiusByDateActual`).pipe(
      map((response) => response.map(MovimientoMapper.fromDto))
    );
  }

  getUltimosCanjes(): Observable<any[]> {
    const request = this.requestFactory.createFortiusRequest();
    return this.http.post<any[]>(`${this.apiUrl}/getFortiusByMonth`, request).pipe(
      map((response) => response.map(MovimientoMapper.fromDto))
    );
  }

  updateTransaction(movimiento: IMovimiento): Observable<any> {
    const body = this.requestFactory.createUpdateMovimientoRequest(movimiento);
    return this.http.post<any>(`${this.apiUrl}/updateApertura`, body);
  }

}