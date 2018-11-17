import { Injectable } from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SupplierService {

  constructor(private http: HttpClient) {
  }
  public getAll(isNewApi = false) {
    const API = isNewApi ? AppConfig.API_ENDPOINT : `${AppConfig.API_ENDPOINT_OLD}/`;
    return this.http.get(`${API}suppliers`)
      .map((suppliers: any) => {
        return suppliers.data;
      });
  }

  public update(data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}suppliers/${data.id}`, data)
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}suppliers/${id}`)
  }

  public create(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT}suppliers`, data)
  }
}
