import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class ProcessService {
  constructor(private http: HttpClient, private authService: NbAuthService) {}

  public getAll(from, to) {
    const currentStore = this.authService.getCurrentStore();
    let url = `${AppConfig.STORES + currentStore}/processes`;
    if (!currentStore) {
      url = `${AppConfig.API_ENDPOINT}processes`;
    }
    return this.http.get(`${url}?from=${from}&to=${to}`);
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
    return this.http.post(`${AppConfig.API_ENDPOINT}processes`, data);
  }

  public update(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}processes/${id}`, data);
  }

  public find(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}processes/${id}`);
  }
}
