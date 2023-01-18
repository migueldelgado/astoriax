import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class SalesService {
  currentStore: number;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }

  public getSalesHistory() {
    const url = `${AppConfig.API_ENDPOINT}stores/${
      this.currentStore
    }/getSalesHistory`;
    return this.http.get(url);
  }

  public getMonthlyHistorySales(month: string, year: string) {
    let params = new HttpParams()
      .append('store_id', this.currentStore.toString())
      .append('month', month)
      .append('year', year);

    const url = `${AppConfig.API_ENDPOINT}sales/monthlyHistorySales`;
    return this.http.get(url, { params });
  }

  public getYearlyHistorySales(year: string) {
    let params = new HttpParams()
      .append('store_id', this.currentStore.toString())
      .append('year', year);

    const url = `${AppConfig.API_ENDPOINT}sales/yearlyHistorySales`;
    return this.http.get(url, { params });
  }
}
