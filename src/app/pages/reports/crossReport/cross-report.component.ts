import { Component } from '@angular/core';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'ngx-cross-report',
  templateUrl: './crossReport.html',
  styleUrls: ['./crossReport.scss'],
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
      name: 'Insumo de Venta'
    }
  ]

  constructor(private reportsService: ReportsService) {}

  getReport(dateFrom, dateTo, typeOfReport) {
    const from = dateFrom.jsdate.toJSON();
    const to = dateTo.jsdate.toJSON();
    
    this.reportsService.getCrossReport(from, to, typeOfReport)
      .subscribe((data: any) => {
        window.location.href = data.data.path;
      })
  }
}
