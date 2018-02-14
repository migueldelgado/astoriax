import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class DailyInventoryService {

  constructor(private http: Http, private authService: NbAuthService) {

  }
  public getAll(config?: Object) {
    const params = config || {
      currentStore: this.authService.getCurrentStore(),
    };
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/daily_inventory`, { params })
      .map(response => response.json())
      .map((inventories: any) => {
        return inventories.data;
      });
  }

  public deleteInventory(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT_OLD}/daily_inventory/${id}`)
      .map(response => response.json())
  }

  public createInventory(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT_OLD}/daily_inventory`, data)
      .map(response => response.json())
  }

  public updateInventory(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT_OLD}/daily_inventory/${id}`, data)
      .map(response => response.json())
  }

  public findInventory(id, idStore) {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/daily_inventory/${id}?currentStore=${idStore}`)
      .map(response => response.json())
  }
}
