import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';

@Injectable()
export class SupplyReportType {

  constructor(private http: Http) {
  }
  public getAll() {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/supply_report_types`)
      .map(response => response.json())
      .map((supplies: any) => {
        return supplies.data;
      });
  }
}
