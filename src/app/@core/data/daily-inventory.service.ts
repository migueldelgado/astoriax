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
    const currentStore = this.authService.getCurrentStore();
    let url = `${AppConfig.STORES + currentStore}/inventories?from=${from}&to=${to}`;
    if (!currentStore) {
      url = `${AppConfig.API_ENDPOINT}inventories?from=${from}&to=${to}`
    }

    return this.http.get(url)
  }

  public deleteInventory(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}inventories/${id}`)
  };

  public createInventory(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT}inventories`, data)
  }

  public updateInventory(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}inventories/${id}`, data)
  }

  public findInventory(id) {
    return this.http.get(`${AppConfig.STORES + this.currentStore}/inventories/${id}`)
      .map(({data}: any) => {
        return data.map((i) => {
          return {
            ...i,
            initial_quantity: i.pivot.initial_quantity,
            final_quantity: i.pivot.final_quantity,
          }
        })
      })
  }

  private parseData(data): any {
    return data;
  }
}
