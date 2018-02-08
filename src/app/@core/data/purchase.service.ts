import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';

@Injectable()
export class PurchaseService {

  constructor(private http: Http) {
  }
  public getAll(config?: Object) {
    const params = config || {
      currentStore: AppConfig.APP_CURRENT_STORE,
    };
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/purchases`, { params })
      .map(response => response.json())
      .map((stores: any) => {
        return stores.data;
      });
  }


  public find(id) {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/purchases/${id}?currentStore=${AppConfig.APP_CURRENT_STORE}`)
      .map(response => response.json())
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT_OLD}/purchases/${id}`)
      .map(response => response.json())
  }

  public create(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT_OLD}/purchases`, data)
      .map(response => response.json())
  }

  public update(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT_OLD}/purchases/${id}`, data)
      .map(response => response.json())
  }
}
