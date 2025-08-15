export interface MovimientoByDateRequest {
  fecha_inicio: Date;
  fecha_fin: Date;
  id_tipomovimiento: string;
  id_peaje: string;
}

export interface CajerosLiquidadosRequest {
  fecha_inicio: Date;
  fecha_fin: Date;
  id_peaje: string;
}

export interface MovimientosByTurnoRequest {
  IdTurno: string;
}