import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class ProcessService {

  currentStore:number;

  constructor(
    private http: HttpClient, 
    private authService: NbAuthService
  ) {
    this.currentStore = this.authService.getCurrentStore();
  }

  public getAll(params) {
    let url = `${AppConfig.API_ENDPOINT}processes?`;
    if (params.selectedStore) {
      url += `store_id=${this.currentStore}&`;
    }
    if (params.from && params.to) {
      url += `from=${params.from}&to=${params.to}`;
    }
    return this.http.get(url).map((response:any) => response.data);
  }

  public getTotalList() {
    return this.http.get(`${AppConfig.API_ENDPOINT}processes`);
  }

  public getByStoreId(id) {
    return this.http.get(`${AppConfig.STORES + id}/processes`);
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}processes/${id}`);
  }

  public create(data) {
    data.store_id = this.currentStore;
    return this.http.post(`${AppConfig.API_ENDPOINT}processes`, data);
  }

  public update(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}processes/${id}`, data);
  }

  public find(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}processes/${id}`);
  }
}
