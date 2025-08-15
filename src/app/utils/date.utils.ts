export class DateUtils {
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static setStartOfDay(date: Date): Date {
    const result = new Date(date);
    return result;
  }

  static createDateRange(fecha: string): { inicio: Date; fin: Date } {
    const fechaInicio = DateUtils.setStartOfDay(new Date(fecha));
    const fechaFin = DateUtils.addDays(fechaInicio, 1);
    console.log("Fecha Inicio:", fechaInicio, "Fecha Fin:", fechaFin);
    return { inicio: fechaInicio, fin: fechaFin };
  }
}