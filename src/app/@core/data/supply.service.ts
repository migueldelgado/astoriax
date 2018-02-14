import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class SupplyService {

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

    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/supplies`, { params: httpParams })
      .map((supplies: any) => {
        return supplies.data;
      });
  }

  public deleteSupply(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT_OLD}/supplies/${id}`)
  }

  public createSupply(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT_OLD}/supplies`, data)
  }

  public updateSupply(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT_OLD}/supplies/${id}`, data)
  }

  public findSupply(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT_OLD}/supplies/${id}`)
  }
}
