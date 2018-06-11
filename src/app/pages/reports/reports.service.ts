import {Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class ReportsService {

  constructor(private http: HttpClient, private authService: NbAuthService) {}

  public getCrossReport(dateFrom, dateTo, supplyReportType){
    const currentStore = localStorage.getItem('current_store');
    return this.http.get(AppConfig.API_ENDPOINT_OLD + '/reports?crossreport=true&dateFrom=' +
                dateFrom + '&dateTo=' + dateTo + '&id_store=' + currentStore + '&id_supply_report_type=' + supplyReportType)
      .map((data: Object[]) => {
        return data.map(this.parseData);
      });
  }

  private parseData(data): any {
    return data;
  }
}
