import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from 'src/app/environment/environment';
import { IRol } from 'src/app/models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url=`${Environment.NODESERVER}api/roles`
  http=inject(HttpClient);
  constructor() { }

  getRoles(){
    return this.http.get<IRol>(this.url)
  }

  

}
