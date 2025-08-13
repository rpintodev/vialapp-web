import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from 'src/app/environment/environment';
import { IPeaje } from 'src/app/models/peaje';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PeajeService {
  url=`${Environment.NODESERVER}api/peaje`
  http=inject(HttpClient);
  constructor() { }

  public getPeajes():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/getall`)
  }

  

}
