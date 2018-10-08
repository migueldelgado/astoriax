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
        return isNewApi ? suppliers : suppliers.data;
      });
  }

}
