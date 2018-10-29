import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class SupplyService {

  constructor(private http: HttpClient, private authService: NbAuthService) {
  }
  public getAll() {
    const currentStore = this.authService.getCurrentStore();
    return this.http.get(`${AppConfig.STORES + currentStore}/supplies`);
  }

  public deleteSupply(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT_OLD}/supplies/${id}`)
  }

  public createSupply(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT}supplies`, data)
  }

  public updateSupply(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}supplies/${id}`, data)
  }

  public findSupply(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}supplies/${id}`)
  }
}
