import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class PurchaseService {
  currentStore: number;
  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }
  public getAll(config: any) {
    return this.http.get(
      `${AppConfig.STORES}${this.currentStore}/purchases?from=${config.dateFrom}&to=${config.dateTo}`,
    ).map((r: any) => r.data)
  }


  public find(id) {
    return this.http.get<any>(
      `${AppConfig.API_ENDPOINT}purchases/${id}`,
    )
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}purchases/${id}`)
  }

  public create(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT}purchases`, data)
  }

  public update(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}purchases/${id}`, data)
  }
}
