import { Injectable } from '@angular/core';

@Injectable()
export class DateHelper {
  months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
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
}
