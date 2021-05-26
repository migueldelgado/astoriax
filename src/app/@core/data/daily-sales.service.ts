import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class DailySalesService {
  currentStore: number;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }
  public getSales(params) {
    const store = this.currentStore;
    const month = parseInt(params.month);
    const year = parseInt(params.year);

    const url = `${AppConfig.API_ENDPOINT}dailySales?store_id=${store}&month=${month}&year=${year}`;

    return this.http.get(url);
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

  public getDayReport(values) {
    let params = {
      store_id: this.currentStore,
      day: parseInt(values.day),
      month: parseInt(values.month),
      year: parseInt(values.year)
    }

    return this.http.post(`${AppConfig.API_ENDPOINT}dailySales/report`, params);
  }

}
