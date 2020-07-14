import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class SupplyService {
  currentStore

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }

  public getAll() {
    const currentStore = this.authService.getCurrentStore();
    let url = `${AppConfig.STORES + currentStore}/supplies`;
    if (!currentStore) {
      url = `${AppConfig.API_ENDPOINT}supplies`
    }
    return this.http.get(url);
  }

  public getTotalList() {
    return this.http.get(`${AppConfig.API_ENDPOINT}supplies`);
  }

  public getByStoreId(id, inventory = false) {
    return this.http.get(`${AppConfig.STORES + id}/supplies${inventory ? '?inventory=true' : ''}`);
  }

  public deleteSupply(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}supplies/${id}?store_id=${this.currentStore}`)
  }

  public createSupply(data) {
    data.store_id = this.currentStore;
    return this.http.post(`${AppConfig.API_ENDPOINT}supplies`, data)
  }

  public updateSupply(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}supplies/${id}`, data)
  }

  public findSupply(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}supplies/${id}`)
  }
}
