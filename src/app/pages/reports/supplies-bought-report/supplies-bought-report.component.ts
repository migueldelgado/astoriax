import { Component } from '@angular/core';
import { INgxMyDpOptions } from 'ngx-mydatepicker';

import { getDateStringByDate } from '../../../@core/utils/dateUtils';
import { SupplyService } from 'app/@core/data/supply.service';

@Component({
  selector: 'ngx-supplies-bought-report',
  templateUrl: './supplies-bought-report.html',
  styleUrls: ['./supplies-bought-report.scss'],
})
export class SuppliesBoughtReportComponent {
  dateFrom = { jsdate: new Date() };
  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  constructor(private supplyService: SupplyService) {}

  getReport(dateFrom, dateTo) {
    const from = getDateStringByDate(dateFrom.jsdate);
    const to = getDateStringByDate(dateTo.jsdate);
    this.supplyService
      .getSupplyBoughtReport(from, to)
      .subscribe(response => this.downLoadFile(response));
  }

  downLoadFile(blob: Blob) {
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }
}
