import {Injectable} from '@angular/core';
// import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class DailyInventoryService {

  currentStore: number;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }
  public getAll(from, to) {
    return this.http.get(`${AppConfig.STORES + this.currentStore}/inventories?from=${from}&to=${to}`)
  }

  public deleteInventory(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}/inventories/${id}`)
  };

  public createInventory(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT}inventories`, data)
  }

  public updateInventory(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}/inventories/${id}`, data)
  }

  public findInventory(id) {
    return this.http.get(`${AppConfig.STORES + this.currentStore}/inventories/${id}`)
  }

  private parseData(data): any {
    return data;
  }
}
