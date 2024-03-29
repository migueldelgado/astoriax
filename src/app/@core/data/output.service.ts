import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class OutputService {
  currentStore = this.authService.getCurrentStore();
  constructor(private http: HttpClient, private authService: NbAuthService) {}

  public getAll(from, to) {
    let url = `${AppConfig.STORES + this.currentStore}/outputs`;
    if (!this.currentStore) {
      url = `${AppConfig.API_ENDPOINT}outputs`;
    }
    return this.http.get(`${url}?from=${from}&to=${to}`);
  }

  public getTotalList() {
    return this.http.get(`${AppConfig.API_ENDPOINT}outputs`);
  }

  public getByStoreId(id) {
    return this.http.get(`${AppConfig.STORES + id}/outputs`);
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}outputs/${id}`);
  }

  public create(data) {
    data.store_id = this.currentStore;
    return this.http.post(`${AppConfig.API_ENDPOINT}outputs`, data);
  }

  public update(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}outputs/${id}`, data);
  }

  public find(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}outputs/${id}`);
  }
}
