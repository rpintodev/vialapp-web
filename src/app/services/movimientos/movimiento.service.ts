import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Environment } from 'src/app/environment/environment';
import { AuthService } from '../auth/auth.service';
import { MovimientoRequestFactory } from '../../factories/movimeinto-request.factory';
import { MovimientoMapper } from 'src/app/mappers/model.mapper';
import { IMovimiento } from 'src/app/models/movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private readonly authService = inject(AuthService);
  private readonly requestFactory = inject(MovimientoRequestFactory);
  private readonly apiUrl = `${Environment.NODESERVER}api/movimientos`;

  constructor(private http: HttpClient) {}

  private get userPeajeId(): string {
    return this.authService.userData.IdPeaje;
  }

  getByDateAndTipoMovimiento(fecha: string, idTipoMovimiento: string): Observable<any[]> {
    const request = this.requestFactory.createByDateAndTipoRequest(fecha, idTipoMovimiento, this.userPeajeId);
    return this.http.post<any[]>(`${this.apiUrl}/findByDateTipoMovimiento`, request);
  }

  getCajerosliquidadosByDate(fecha: string): Observable<any[]> {
    const request = this.requestFactory.createCajerosLiquidadosRequest(fecha, this.userPeajeId);
    return this.http.post<any[]>(`${this.apiUrl}/getCajerosliquidadosByDate`, request);
  }

  getMovimientosByTurno(idTurno: string): Observable<IMovimiento[]> {
    const request = { IdTurno: idTurno };
    return this.http.post<any[]>(`${this.apiUrl}/findByTurno`, request).pipe(
      map((response) => response.map(MovimientoMapper.fromDto))
    );
  }
  
  getMovimientosReporteRetiros(fecha: Date): Observable<any[]> {
    const request = {
      fecha_inicio: fecha,
      fecha_fin: fecha,
      id_peaje: this.userPeajeId
    };
    return this.http.post<any[]>(`${this.apiUrl}/getMovimientosReporteRetiros`, request);
  }
}