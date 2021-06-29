import {Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class ReportsService {

  currentStore: number;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }

  public getCrossReport(dateFrom, dateTo, supplyReportType) {   
    return this.http.post(`${AppConfig.API_ENDPOINT}cross-report`, {
      date_from: dateFrom,
      date_to: dateTo,
      store_id: this.currentStore
    }, { responseType: 'blob'});
  }
}
