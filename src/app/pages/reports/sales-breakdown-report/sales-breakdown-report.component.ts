import { Component } from '@angular/core';
import { INgxMyDpOptions } from 'ngx-mydatepicker';

import { getDateStringByDate } from '../../../@core/utils/dateUtils';
import { SupplyService } from 'app/@core/data/supply.service';
import { DailySalesService } from 'app/@core/data/daily-sales.service';

@Component({
  selector: 'ngx-sales-breakdown-report',
  templateUrl: './sales-breakdown-report.component.html',
  styleUrls: ['./sales-breakdown-report.component.scss'],
})
export class SalesBreakdownReportComponent {
  dateFrom = { jsdate: new Date() };
  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  constructor(private dailySaleService: DailySalesService) {}

  getReport(dateFrom, dateTo) {
    const from = getDateStringByDate(dateFrom.jsdate);
    const to = getDateStringByDate(dateTo.jsdate);
    this.dailySaleService
      .getSalesBreakdownReport(from, to)
      .subscribe((response: Blob) => this.downLoadFile(response));
  }

  downLoadFile(blob: Blob) {
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }
}
