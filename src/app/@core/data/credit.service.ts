import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class CreditService {
  currentStore = this.authService.getCurrentStore();

  constructor(private http: HttpClient, private authService: NbAuthService) {}

  public getAll(params) {
    params.store_id = this.currentStore;
    const url = `${AppConfig.API_ENDPOINT}credits`;
    return this.http.get(`${url}?from=${params.from}&to=${params.to}`);
  }

  public create(data) {
    data.store_id = this.currentStore;
    return this.http.post(`${AppConfig.API_ENDPOINT}credits`, data);
  }

  public update(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}credits/${id}`, data);
  }

  public find(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}credits/${id}`);
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}credits/${id}`);
  }

}
