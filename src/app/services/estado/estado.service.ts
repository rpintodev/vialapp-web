import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor() { }
  http = inject(HttpClient);
  url = Environment.NODESERVER + 'api/estados';


  public getEstados(){
    return this.http.get<any[]>(`${this.url}/getall`);
  }


}
