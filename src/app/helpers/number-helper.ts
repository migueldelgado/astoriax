import { Injectable } from '@angular/core';

@Injectable()
export class NumberHelper {
  validateInteger(value) {
    var RegExPattern = /[0-9]+$/;
    return RegExPattern.test(value);
  }

  formatNumberCL(value) {
    if (this.validateInteger(value)) {
      var result = '';
      value = value
        .toString()
        .split('')
        .reverse()
        .join('');
      var i = value.length;
      while (i > 0)
        result +=
          (i % 3 === 0 && i != value.length ? '.' : '') +
          value.substring(i--, i);
      return result;
    }
    return '';
  }

  formatCurrency(num: number) {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(num);
  }

  formatNumberWithThousands(num) {
    return new Intl.NumberFormat().format(num);
  }
}
