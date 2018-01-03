import { Injectable } from '@angular/core';
import {AppConfig} from '../../app.config';
import {Http} from '@angular/http';

@Injectable()
export class SupplierService {

  constructor(private http: Http) {
  }
  public getAll() {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/suppliers`)
      .map(response => response.json())
      .map((supplies: any) => {
        return supplies.data;
      });
  }

}
