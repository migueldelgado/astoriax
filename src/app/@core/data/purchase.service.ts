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

  public getAll(params: any) {
    const from = params.dateFrom;
    const to = params.dateTo;
    const currentStore = this.authService.getCurrentStore();
    const url = `${AppConfig.API_ENDPOINT}purchases?store_id=${currentStore}&from=${from}&to=${to}`;

    return this.http.get(url).map((r: any) => r.data);
  }

  public getPurchases(params) {

    const storeId = params.storeId || '';
    const supplierId = params.supplierId || '';
    const type = params.type || '';
    const status = params.status || [];
    let statusQuery = '';

    status.forEach(element => {
      statusQuery += '&status[]=' + element;
    });

    const urlParams = `store_id=${storeId}&supplier_id=${supplierId}&type=${type + statusQuery}`;
    const url = `${AppConfig.API_ENDPOINT}purchases?${urlParams}`;
    
    return this.http.get(url)
      .map((purchases: any) => {
        return purchases.data;
      });
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
