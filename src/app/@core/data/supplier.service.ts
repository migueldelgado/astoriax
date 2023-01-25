import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';
import { NbAuthService } from '../../auth/services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SupplierService {
  currentStore: number;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }

  public getAll(): Observable<any> {
    return this.http
      .get(`${AppConfig.API_ENDPOINT}suppliers`)
      .map((suppliers: any) => {
        return suppliers.data;
      });
  }

  public getSuppliers() {
    const urlParams = `store_id=${this.currentStore}`;
    const url = `${AppConfig.API_ENDPOINT}suppliers?${urlParams}`;

    return this.http.get(url).map((suppliers: any) => {
      return suppliers.data;
    });
  }

  public getSupplierInvoicesLastMonths(date, monthToShow = 6) {
    const url = `${
      AppConfig.API_ENDPOINT
    }suppliers/supplierPurchasesLastMonths`;
    const params = new HttpParams()
      .append('store_id', this.currentStore.toString())
      .append('date', date)
      .append('monthsToshow', monthToShow.toString());

    return this.http.get(url, { params }).map((invoicesTotals: any) => {
      return invoicesTotals.data;
    });
  }

  public getInvoicesBySupplier(supplierId, year?, month?, isPaid?) {
    const url = `${AppConfig.API_ENDPOINT}suppliers/purchasesBySupplier`;
    let params = new HttpParams().append(
      'store_id',
      this.currentStore.toString(),
    );
    if (supplierId) params = params.append('supplier_id', supplierId);
    if (year) params = params.append('year', year);
    if (month) params = params.append('month', month);
    if (isPaid === '0' || isPaid === '1')
      params = params.append('is_paid', isPaid);
    return this.http.get(url, { params }).map((result: any) => {
      return result.data;
    });
  }

  public findSupplier(supplierId) {
    return this.http.get<any>(
      `${AppConfig.API_ENDPOINT}suppliers/${supplierId}`,
    );
  }

  public update(supplier) {
    return this.http.put(
      `${AppConfig.API_ENDPOINT}suppliers/${supplier.id}`,
      supplier,
    );
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}suppliers/${id}`);
  }

  public create(supplier) {
    return this.http.post(`${AppConfig.API_ENDPOINT}suppliers`, supplier);
  }

  public getTotalInvoicesReport(date) {
    const url = `${
      AppConfig.API_ENDPOINT
    }suppliers/supplierPurchasesLastMonthsReport`;

    const params = new HttpParams()
      .append('store_id', this.currentStore.toString())
      .append('date', date);

    return this.http.get(url, { params });
  }

  public getInvoicesReport(supplierId, year?, month?, isPaid?) {
    const url = `${AppConfig.API_ENDPOINT}suppliers/purchasesBySupplierReport`;
    let params = new HttpParams().append(
      'store_id',
      this.currentStore.toString(),
    );
    if (supplierId) params = params.append('supplier_id', supplierId);
    if (year) params = params.append('year', year);
    if (month) params = params.append('month', month);
    if (isPaid === '0' || isPaid === '1')
      params = params.append('is_paid', isPaid);

    return this.http.get(url, { params });
  }

  public getInvoicesReportExcel(supplierId, year?, month?, isPaid?) {
    const url = `${
      AppConfig.API_ENDPOINT
    }suppliers/purchasesBySupplierExcelReport`;

    let params: any = {};
    params.store_id = this.currentStore;
    if (supplierId) params.supplier_id = supplierId;
    if (year) params.year = year;
    if (month) params.month = month;
    if (isPaid === '0' || isPaid === '1') params.is_paid = isPaid;

    return this.http.post(url, params, { responseType: 'blob' });
  }
}
