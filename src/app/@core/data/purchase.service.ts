import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class PurchaseService {
  currentStore;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }

  public getPurchases(params: any) {

    let query = `?store_id=${this.currentStore}`;

    if (params.supplierId) {
      query += `&supplier_id=${params.supplierId}`;
    }
    
    if (params.dateFrom) {
      query += `&from=${params.dateFrom}`;
    }

    if (params.dateTo) {
      query += `&to=${params.dateTo}`;
    }

    if (params.isPaid !== null && typeof params.isPaid !== 'undefined') {
      query += `&is_paid=${params.isPaid}`;
    }

    const url = `${AppConfig.API_ENDPOINT}purchases${query}`;

    return this.http.get(url).map((r: any) => r.data);
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
    data.is_paid = 0;
    console.log(data);
    return this.http.post(`${AppConfig.API_ENDPOINT}purchases`, data)
  }

  public update(id, data) {
    data.store_id = this.currentStore;
    return this.http.put(`${AppConfig.API_ENDPOINT}purchases/${id}`, data)
  }
}
