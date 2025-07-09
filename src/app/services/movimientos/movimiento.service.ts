import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from 'src/app/environment/environment';
import { ITipoMovimiento } from 'src/app/models/tipoMovimiento';
import { AuthService } from '../auth/auth.service';
import { IUsuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})

export class MovimientoService{
    authService = inject(AuthService);
    usuarioSession:IUsuario=this.authService.userData;
    constructor(private http:HttpClient) { }
    private apiUrl=`${Environment.NODESERVER}api/movimientos`;

    public getByDateAndTipoMovimiento(fecha:string, idTipoMovimiento:string):Observable<any[]>{
        const fechaFin = new Date(fecha);
        fechaFin.setDate(fechaFin.getDate() + 1); // Incrementar un día
        const body = {
            fecha_inicio: fecha,
            fecha_fin: fechaFin,
            id_tipomovimiento: idTipoMovimiento,
            id_peaje: this.usuarioSession.IdPeaje,
        }
        return this.http.post<any[]>(`${this.apiUrl}/findByDateTipoMovimiento`,body);
    }

    public getCajerosliquidadosByDate(fecha:string):Observable<any[]>{
        const fechaInicio = new Date(fecha);
        // Establecer hora a 5:00am
        fechaInicio.setHours(0, 0, 0, 0);

        const fechaFin = new Date(fechaInicio);
        fechaFin.setDate(fechaFin.getDate() + 1); // Día siguiente
        // Mantener hora a 5:00am
        fechaFin.setHours(0, 0, 0, 0);// Incrementar un día
        const body = {
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            id_peaje: this.usuarioSession.IdPeaje,
        }
        console.log("Cuerpo de la solicitud:", body);
        return this.http.post<any[]>(`${this.apiUrl}/getCajerosliquidadosByDate`,body);
    }

}