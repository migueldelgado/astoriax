import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class PurchaseService {

  constructor(private http: HttpClient, private authService: NbAuthService) {
  }
  public getAll(config?: Object) {
    const params = config || {
      currentStore: this.authService.getCurrentStore(),
    };

    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/purchases`, { params: httpParams })
      .map((stores: any) => {
        return stores.data;
      });
  }


  public find(id) {
    return this.http.get<any>(
      `${AppConfig.API_ENDPOINT_OLD}/purchases/${id}?currentStore=${this.authService.getCurrentStore()}`,
    )
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT_OLD}/purchases/${id}`)
  }

  public create(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT_OLD}/purchases`, data)
  }

  public update(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT_OLD}/purchases/${id}`, data)
  }
}
