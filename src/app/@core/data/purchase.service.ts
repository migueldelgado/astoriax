import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class PurchaseService {
  currentStore;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }

  public getPurchases(purchaseParams?: any) {
    let params = new HttpParams().append('store_id', this.currentStore);
    if (purchaseParams && purchaseParams.supplierId)
      params = params.append('supplier_id', purchaseParams.supplierId);
    if (purchaseParams && purchaseParams.dateFrom)
      params = params.append('from', purchaseParams.dateFrom);
    if (purchaseParams && purchaseParams.dateTo)
      params = params.append('to', purchaseParams.dateTo);
    if (purchaseParams && Number(purchaseParams.isPaid) >= 0)
      params = params.append('is_paid', purchaseParams.isPaid);
    if (purchaseParams && purchaseParams.supplierId)
      params = params.append('supplier_id', purchaseParams.supplierId);

    const url = `${AppConfig.API_ENDPOINT}purchases`;

    return this.http.get(url, { params }).map((response: any) => response.data);
  }

  public find(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}purchases/${id}`);
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}purchases/${id}`);
  }

  public create(data) {
    data.is_paid = 0;
    console.log(data);
    return this.http.post(`${AppConfig.API_ENDPOINT}purchases`, data);
  }

  public update(id, data) {
    data.store_id = this.currentStore;
    return this.http.put(`${AppConfig.API_ENDPOINT}purchases/${id}`, data);
  }
}
