import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';

@Injectable()
export class SupplyService {

  constructor(private http: Http) {
  }
  public getAll(config?: Object) {
    const params = config || {
      currentStore: AppConfig.APP_CURRENT_STORE,
    };
    console.log(params);
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/supplies`, { params })
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

  public updateSupply(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT_OLD}/supplies/${id}`, data)
      .map(response => response.json())
  }

  public findSupply(id) {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/supplies/${id}`)
      .map(response => response.json())
  }
}
