import { Component } from '@angular/core';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { ReportsService } from '../reports.service';

import { getDateStringByDate } from '../../../@core/utils/dateUtils';

@Component({
  selector: 'ngx-cross-report',
  templateUrl: './cross-report.html',
  styleUrls: ['./cross-report.scss'],
})
export class CrossReportComponent {

  dateFrom = { jsdate: new Date() };
  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  typeOfReports = [
    {
      id: 1,
      name: 'Insumo de Venta',
    },
  ]

  constructor(private reportsService: ReportsService) {}

  getReport(dateFrom, dateTo, typeOfReport) {
    const from = getDateStringByDate(dateFrom.jsdate);
    const to = getDateStringByDate(dateTo.jsdate);
    this.reportsService.getCrossReport(from, to, typeOfReport)
      .subscribe(response => this.downLoadFile(response));
  }

  downLoadFile(blob: any) {
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }
}
