import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class LoanService {

  constructor(private http: HttpClient) {
  }
  public getAll(config?: Object) {
    const params = config || {
      currentStore: AppConfig.APP_CURRENT_STORE,
    };
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/loans`, { params: httpParams })
      .map((stores: any) => {
        return stores.data;
      });
  }


  public find(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT_OLD}/loans/${id}?currentStore=${AppConfig.APP_CURRENT_STORE}`)
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT_OLD}/loans/${id}`)
  }

  public create(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT_OLD}/loans`, data)
  }

  public update(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT_OLD}/loans/${id}`, data)
  }
}
