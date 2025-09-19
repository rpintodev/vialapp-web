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

export class TipoMovimientoService {

    authService = inject(AuthService);
    constructor(private http:HttpClient) { }

    private apiUrl=`${Environment.NODESERVER}api/tipomovimiento`;

    public getAll():Observable<{data: any[]}>{
        return this.http.get<{data: any[]}>(`${this.apiUrl}/getAll`);
    }

}