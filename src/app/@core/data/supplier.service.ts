import { Injectable } from '@angular/core';
import {AppConfig} from '../../app.config';
import { NbAuthService } from '../../auth/services';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SupplierService {
  currentStore: number;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }

  public getAll() {
    return this.http.get(`${AppConfig.API_ENDPOINT}suppliers`)
      .map((suppliers: any) => {
        return suppliers.data;
      });
  }

  public getSuppliers() {
    const urlParams = `store_id=${this.currentStore}`;
    const url = `${AppConfig.API_ENDPOINT}suppliers?${urlParams}`;
    
    return this.http.get(url)
      .map((suppliers: any) => {
        return suppliers.data;
      });
  }

  public getSupplierInvoicesByYear(year) {
    const urlParams = `store_id=${this.currentStore}&year=${year}`;
    const url = `${AppConfig.API_ENDPOINT}suppliers/getAllInvoicesByYear?${urlParams}`;
    
    return this.http.get(url)
      .map((invoicesTotals: any) => {
        return invoicesTotals.data;
      });
  }

  public getInvoicesBySupplier(params) {
    const urlParams = `store_id=${this.currentStore}&year=${params.year}&month=${params.month}&supplier_id=${params.supplier_id}`;
    const url = `${AppConfig.API_ENDPOINT}suppliers/${params.supplier_id}/invoices?${urlParams}`;
    
    return this.http.get(url)
      .map((result: any) => {
        return result.data;
      });
  }

  public findSupplier(supplierId) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}suppliers/${supplierId}`);
  }

  public update(supplier) {
    return this.http.put(`${AppConfig.API_ENDPOINT}suppliers/${supplier.id}`, supplier);
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}suppliers/${id}`);
  }

  public create(supplier) {
    return this.http.post(`${AppConfig.API_ENDPOINT}suppliers`, supplier);
  }

  public getTotalInvoicesReport(params){
    params.store_id = this.currentStore;
    const urlParams = `?store_id=${this.currentStore}&year=${params.year}`;
    return this.http.get(`${AppConfig.API_ENDPOINT}suppliers/invoicesByYear${urlParams}`);
  }

  public getInvoicesReport(params){
    params.store_id = this.currentStore;
    const urlParams = `?store_id=${this.currentStore}&year=${params.year}&month=${params.month}&supplier_id=${params.supplier_id}`;
    return this.http.get(`${AppConfig.API_ENDPOINT}suppliers/1/invoicesReport${urlParams}`);
  }

}
