import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';

@Injectable()
export class SupplyService {

  constructor(private http: Http) {
  }
  public getAll() {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/supplies?currentStore=1`)
      .map(response => response.json())
      .map((supplies: any) => {
        return supplies.data;
      });
  }

  public deleteSupply(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT_OLD}/supplies/${id}`)
      .map(response => response.json())
  }

  public createSupply(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT_OLD}/supplies`, data)
      .map(response => response.json())
  }
}
