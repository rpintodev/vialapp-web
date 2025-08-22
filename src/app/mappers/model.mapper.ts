import { I } from "@angular/cdk/a11y-module.d-DBHGyKoh";
import { IBoveda } from "../models/boveda";
import { IMovimiento} from "../models/movimiento";
import { IPeaje } from "../models/peaje";
import {IRol} from "../models/rol";
import { ITurno } from "../models/turno";
import { IUsuario } from "../models/usuario";

export class MovimientoMapper {
  static fromDto(d: any): IMovimiento {
    return {
      id: d.Id,
      idCajero: d.IdCajero,
      idSupervisor: d.IdSupervisor,
      idPeaje: d.IdPeaje,
      idturno: d.IdTurno,
      idTipoMovimiento: d.IdTipoMovimiento,
      turno: d.Turno,
      via: d.Via,
      nombreMovimiento: d.NombreMovimiento,
      nombreCajero: d.NombreCajero,
      nombreSupervisor: d.NombreSupervisor,
      firmacajero: d.FirmaCajero,
      firmasupervisor: d.FirmaSupervisor,
      fecha: d.Fecha,
      recibe1c: d.Recibe_1c,
      recibe5c: d.Recibe_5c,
      recibe10c: d.Recibe_10c,
      recibe25c: d.Recibe_25c,
      recibe50c: d.Recibe_50c,
      recibe1d: d.Recibe_1d,
      recibe10d: d.Recibe_10d,
      recibe5d: d.Recibe_5d,
      recibe20d: d.Recibe_20d,
      entrega1c: d.Entrega_1c,
      entrega5c: d.Entrega_5c,
      entrega10c: d.Entrega_10c,
      entrega25c: d.Entrega_25c,
      entrega50c: d.Entrega_50c,
      entrega1d: d.Entrega_1d,
      entrega10d: d.Entrega_10d,
      entrega5d: d.Entrega_5d,
      entrega20d: d.Entrega_20d,
      simulaciones: d.Simulaciones,
      sobrante: d.Sobrante,
      partetrabajo: d.ParteTrabajo,
      anulaciones: d.Anulaciones,
      valoranulaciones: d.ValorAnulaciones,
      valorsimulaciones: d.ValorSimulaciones,
    };
  }
}

export class RolMapper {
  static fromDto(d: any): IRol {
    return {
      id: d.Id,
      nombre: d.Nombre,
      ruta:d.Ruta
      
    };
  }
}


export class PeajeMapper {
  static fromDto(d: any): IPeaje {
    return {
      id: d.Id,
      nombre: d.Nombre,  
      
    };
  }
}

export class UsuarioMapper {
  static fromDto(d: any): IUsuario {
    return {
      id: d.Id,
      nombre: d.Nombre,
      apellido: d.Apellido,
      telefono: d.Telefono,
      usuario: d.Usuario,
      password: d.Password,
      imagen:d.Imagen,
      idRol:d.IdRol,
      idTurno: d.IdTurno,
      turno: d.Turno,
      via: d.via,
      firma: d.Firma,
      nombreRol: d.NombreRol,
      nombrePeaje: d.NombrePeaje,
      idPeaje: d.IdPeaje,
      estado: d.Estado,
      grupo: d.Grupo,
      ...d      
    };
  }

  static toDto(d: any): IUsuario {
    return {
      Id: d.id,
      Nombre: d.nombre,
      Apellido: d.apellido,
      Telefono: d.telefono,
      Usuario: d.usuario,
      Password: d.password,
      Imagen:d.imagen,
      IdRol:d.idRol,
      IdTurno: d.idTurno,
      Turno: d.turno,
      Via: d.via,
      Firma: d.firma,
      NombreRol: d.nombreRol,
      NombrePeaje: d.nombrePeaje,
      IdPeaje: d.idPeaje,
      Estado: d.estado,
      Grupo: d.grupo,
      ...d      
    };
  }


}

export class BovedaMapper{
  static fromDto(d:any): IBoveda {
    return {
      id: d.Id,
      fecha: d.Fecha,
      esactual: d.EsActual,
      idpeaje: d.IdPeaje,
      moneda001: d.Moneda_001,
      moneda005: d.Moneda_005,
      moneda01: d.Moneda_01,
      moneda025: d.Moneda_025,
      moneda05: d.Moneda_05,
      moneda1: d.Moneda_1,
      billete1: d.Billete_1,
      billete2: d.Billete_2,
      billete5: d.Billete_5,
      billete10: d.Billete_10,
      billete20: d.Billete_20,
      observacion: d.Observacion,
      total: d.Total,
    
    }
  }
}

export class TurnoMapper{
  static fromDto(d: any): ITurno {
    return {
      id: d.Id,
      idSupervisor: d.IdSupervisor,
      nombreSupervisor: d.NombreSupervisor,
      idCajero: d.IdCajero,
      nombreCajero: d.NombreCajero,
      estado: d.Estado,
      fecha: d.Fecha,
      grupo: d.Grupo,
      turno: d.Turno,
      via: d.Via,
      sessiontoken: d.SessionToken
    };
  }
  static toDto(d: ITurno): any {
    return {
      Id: d.id,
      IdSupervisor: d.idSupervisor,
      NombreSupervisor: d.nombreSupervisor,
      IdCajero: d.idCajero,
      NombreCajero: d.nombreCajero,
      Estado: d.estado,
      Fecha: d.fecha,
      Grupo: d.grupo,
      Turno: d.turno,
      Via: d.via,
      SessionToken: d.sessiontoken
    };
  }
}



