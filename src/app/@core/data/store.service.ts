import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StoreService {

  constructor(private http: HttpClient) {
  }
  public getAll(isNewApi = false) {
    const API = isNewApi ? AppConfig.API_ENDPOINT : `${AppConfig.API_ENDPOINT_OLD}/`;
    return this.http.get(`${API}stores`)
      .map((stores: any) => {
        return stores.data;
      });
  }

  public update(data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}stores/${data.id}`, data)
  }

  public create(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT}stores`, data)
  }

  public find(id) {
    return this.http.get(`${AppConfig.API_ENDPOINT}stores/${id}`)
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}stores/${id}`)
  }
}
