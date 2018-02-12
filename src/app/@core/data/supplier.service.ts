import { Injectable } from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SupplierService {

  constructor(private http: HttpClient) {
  }
  public getAll() {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/suppliers`)
      .map((supplies: any) => {
        return supplies.data;
      });
  }

}
