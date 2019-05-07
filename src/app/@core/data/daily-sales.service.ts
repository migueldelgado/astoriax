import { Injectable } from '@angular/core';
// import {Http} from '@angular/http';
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
  public getAll(month) {
    const currentStore = this.authService.getCurrentStore();
    const url = `${AppConfig.API_ENDPOINT}dailySales`;

    return this.http.get(url);
  }

  public getAllByMonth(month) {
    const currentStore = this.authService.getCurrentStore();
    let url = `${AppConfig.STORES + currentStore}/dailySales?date=${month}`;
    if (!currentStore) {
      url = `${AppConfig.API_ENDPOINT}dailySales?date=${month}`;
    }

    return this.http.get(url);
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}dailySales/${id}`);
  }

  public create(data) {
    data.store_id = this.authService.getCurrentStore();
    return this.http.post(`${AppConfig.API_ENDPOINT}dailySales`, data);
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
}
