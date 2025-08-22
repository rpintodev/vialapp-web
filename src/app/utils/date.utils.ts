import * as moment from 'moment';

export class DateUtils {
  static addDays(date: string, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static setStartOfDay(date: Date): Date {
    const dateString = date.toISOString().split('T')[0];
    return new Date(`${dateString}T00:00:00.000`);
  }

  static createDateRange(fecha: string): { inicio: Date; fin: Date } {
    const fechaFin = new Date(fecha);
    fechaFin.setDate(fechaFin.getDate() + 1); 
    return { inicio: new Date(fecha), fin: fechaFin };
  }

  static formateDate(fecha:Date){
  return moment(fecha).format('YYYY-MM-DD');
  }

   static formatearFechaDeposito(fecha: any): string {
        if (!fecha) return 'Fecha no disponible';
        const fechaFormateada = new Date(fecha);
        return fechaFormateada.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

}