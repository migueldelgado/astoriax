import { Pipe, PipeTransform } from '@angular/core';
import { NumberHelper } from '../helpers/number-helper'

@Pipe({
  name: 'numbercl'
})
export class ChileanNumberPipe implements PipeTransform {

    constructor(public numberHelper: NumberHelper) {}

  transform(numStr: string): string {
    if (numStr !== undefined && numStr !== null) {
        numStr = numStr.replace(/\D+/g, '');
        return this.numberHelper.formatNumberCL(numStr)
    } else {
      return '';
    }
  }
}