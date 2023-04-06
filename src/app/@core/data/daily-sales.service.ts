import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class DailySalesService {
  currentStore: number;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }

  public getSalesTotals(params) {
    const store = this.currentStore;
    const month = parseInt(params.month);
    const year = parseInt(params.year);
    return this.http.get(
      `${AppConfig.API_ENDPOINT}dailySales/totalDaysByMonth?store_id=${store}&month=${month}&year=${year}`
    ).map((response:any) => response.data);
  }

  public getTotalItemsByDay(date) {
    const store = this.currentStore;
    return this.http.get(
      `${AppConfig.API_ENDPOINT}dailySales/saleItemsByDay?store_id=${store}&date=${date}`
    ).map((response:any) => response.data);
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}dailySales/${id}`);
  }

  public create(params) {
    params.store_id = this.currentStore;
    return this.http.post(`${AppConfig.API_ENDPOINT}dailySales`, params);
  }

  public update(id, data) {
    data.store_id = this.authService.getCurrentStore();
    return this.http.put(`${AppConfig.API_ENDPOINT}dailySales/${id}`, data);
  }

  public find(id) {
    return this.http
      .get(`${AppConfig.API_ENDPOINT}dailySales/${id}`)
      .map((result: any) => {
        const { data } = result;
        return data;
      });
  }

  public getDayReport(dateSale) {
    let params = {
      store_id: this.currentStore,
      date: dateSale
    }

    return this.http.post(`${AppConfig.API_ENDPOINT}dailySales/report`, params);
  }

  public getSalesBreakdownReport(from, to) {
    const url = `${AppConfig.API_ENDPOINT}reports/dailySalesBreakdown`;
    const params = new HttpParams()
      .append('date_from', from)
      .append('date_to', to);

    return this.http.get(url, { params, responseType: 'blob' });
  }

}
