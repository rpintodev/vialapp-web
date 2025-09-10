import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from 'src/app/environment/environment';
import { IPeaje } from 'src/app/models/peaje';
import { Observable } from 'rxjs';
import { PeajeRequestFactory } from 'src/app/factories/peaje-request.factory';


@Injectable({
  providedIn: 'root'
})
export class PeajeService {
  url=`${Environment.NODESERVER}api/peaje`
  http=inject(HttpClient);
  constructor(private peajeRequestFactory: PeajeRequestFactory) { }

  public getPeajes():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/getall`)
  }

  public updatePeaje():Observable<any[]>{
    const request = this.peajeRequestFactory.updatePeajeRequest();
    console.log('Request para actualizar peaje:', request);
    return this.http.post<any[]>(`${this.url}/updatePeaje`, request)
  }

  

}
