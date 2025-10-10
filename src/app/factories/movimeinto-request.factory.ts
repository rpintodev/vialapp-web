// factories/movimiento-request.factory.ts
import { Injectable } from '@angular/core';
import { DateUtils } from '../utils/date.utils';
import { MovimientoMapper } from '../mappers/model.mapper';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MovimientoRequestFactory {


  
  createByDateAndTipoRequest(fecha: string, idTipoMovimiento: string): any {
    const { inicio, fin } = DateUtils.createDateRange(fecha);
    return {
      fecha_inicio: inicio,
      fecha_fin: fin,
      id_tipomovimiento: idTipoMovimiento,
    };
  }

  createCajerosLiquidadosRequest(fecha: string): any {
    const { inicio, fin } = DateUtils.createDateRange(fecha);
    return {
      fecha_inicio: moment(inicio).format('YYYY-MM-DD 00:00:00'),
      fecha_fin: moment(fin).format('YYYY-MM-DD 00:00:00'),
    };
  }

  createVentaTagRequest(mes: number): any {
    return {
      mes: mes,
      año: new Date().getFullYear(),
    };
  }

  
  createFortiusRequest(): any {
    return {
      mes: new Date().getMonth() + 1,
      año: new Date().getFullYear(),
    };
  }

  createUpdateMovimientoRequest(movimiento: any): any {
    const movimeintoMapped = MovimientoMapper.toDto(movimiento);
    return {
      ...movimeintoMapped
    };

  }


}