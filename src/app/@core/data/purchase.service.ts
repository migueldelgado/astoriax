import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class PurchaseService {
  constructor(private http: HttpClient, private authService: NbAuthService) {
  }

  public getAll(config: any) {
    const from = config.dateFrom;
    const to = config.dateTo;
    const currentStore = this.authService.getCurrentStore();

    let url = `${AppConfig.STORES + currentStore}/purchases?from=${from}&to=${to}`;

    if (!currentStore) {
      url = `${AppConfig.API_ENDPOINT}purchases?from=${from}&to=${to}`
    }

    return this.http.get(
      url,
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
