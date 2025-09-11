// factories/movimiento-request.factory.ts
import { Injectable } from '@angular/core';
import { DateUtils } from '../utils/date.utils';
import { IBoveda } from '../models/boveda';
import { BovedaMapper } from '../mappers/model.mapper';

@Injectable({
  providedIn: 'root'
})


export class BovedaRequestFactory {

    createUpdateBovedaRequest(boveda:IBoveda):any{
        const bovedaMapped = BovedaMapper.toDto(boveda);
        return {
            ...bovedaMapped
        };
    }

}