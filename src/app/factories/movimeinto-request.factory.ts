// factories/movimiento-request.factory.ts
import { Injectable } from '@angular/core';
import { DateUtils } from '../utils/date.utils';
import { MovimientoByDateRequest, CajerosLiquidadosRequest } from '../models/requests/moviemiento-requests';
import { MovimientoMapper } from '../mappers/model.mapper';

@Injectable({
  providedIn: 'root'
})
export class MovimientoRequestFactory {


  
  createByDateAndTipoRequest(fecha: string, idTipoMovimiento: string, idPeaje: string): MovimientoByDateRequest {
    const { inicio, fin } = DateUtils.createDateRange(fecha);
    return {
      fecha_inicio: inicio,
      fecha_fin: fin,
      id_tipomovimiento: idTipoMovimiento,
      id_peaje: idPeaje
    };
  }

  createCajerosLiquidadosRequest(fecha: string, idPeaje: string): CajerosLiquidadosRequest {
    const { inicio, fin } = DateUtils.createDateRange(fecha);
    return {
      fecha_inicio: inicio,
      fecha_fin: fin,
      id_peaje: idPeaje
    };
  }

  createVentaTagRequest(mes: number, idPeaje: string): any {
    return {
      mes: mes,
      año: new Date().getFullYear(),
      id_peaje: idPeaje
    };
  }

  
  createFortiusRequest(idPeaje: string): any {
    return {
      mes: new Date().getMonth() + 1,
      año: new Date().getFullYear(),
      id_peaje: idPeaje
    };
  }

  createUpdateMovimientoRequest(movimiento: any): any {
    const movimeintoMapped = MovimientoMapper.toDto(movimiento);
    return {
      ...movimeintoMapped
    };

  }


}