export class DateUtils {
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static setStartOfDay(date: Date): Date {
    const dateString = date.toISOString().split('T')[0];
    return new Date(`${dateString}T00:00:00.000`);
  }

  static createDateRange(fecha: string): { inicio: Date; fin: Date } {
    const fechaInicio = DateUtils.setStartOfDay(new Date(fecha));
    const fechaFin = DateUtils.addDays(fechaInicio, 1);
    return { inicio: fechaInicio, fin: fechaFin };
  }
}