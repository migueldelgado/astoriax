import { Injectable } from '@angular/core';

@Injectable()
export class DateHelper {
  months = [
    { value: 1, en: 'jan', label: 'Enero' },
    { value: 2, en: 'feb', label: 'Febrero' },
    { value: 3, en: 'mar', label: 'Marzo' },
    { value: 4, en: 'apr', label: 'Abril' },
    { value: 5, en: 'may', label: 'Mayo' },
    { value: 6, en: 'jun', label: 'Junio' },
    { value: 7, en: 'jul', label: 'Julio' },
    { value: 8, en: 'aug', label: 'Agosto' },
    { value: 9, en: 'sep', label: 'Septiembre' },
    { value: 10, en: 'oct', label: 'Octubre' },
    { value: 11, en: 'nov', label: 'Noviembre' },
    { value: 12, en: 'dec', label: 'Diciembre' },
  ];

  getMonths(): { value: number; label: string }[] {
    return this.months;
  }

  getCurrentMonth(): number {
    return new Date().getMonth() + 1;
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  getMonthNumberFromDate(date: Date): number {
    return date.getMonth() + 1;
  }

  getMonthStringFromDate(date: Date): string {
    const monthNumber = (date.getMonth() + 1).toString();
    return monthNumber.length === 1 ? `0${monthNumber}` : monthNumber;
  }

  getDateApiFormatFromDate(date: Date): string {
    const day = date.getDate();
    const month = this.getMonthNumberFromDate(date);
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  getMonthNameByNumber(monthNumber: string | number) {
    monthNumber = Number(monthNumber);
    const monthObject = this.months.find(month => month.value === monthNumber);
    return monthObject.label || undefined;
  }

  getMonthNameByEnglishAbr(monthAbr: string) {
    const monthObject = this.months.find(
      month => month.en.toLowerCase() === monthAbr.toLowerCase(),
    );
    return monthObject.label || undefined;
  }

  subtractMonthsToDate(date: Date, months: number) {
    date.setMonth(date.getMonth() - months);
    return date;
  }

  addMonthsToDate(date: Date, months: number) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
}
