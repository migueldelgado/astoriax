import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StoreService {

  constructor(private http: HttpClient) {
  }
  public getAll(isNewApi = false) {
    const API = isNewApi ? AppConfig.API_ENDPOINT : `${AppConfig.API_ENDPOINT_OLD}/`;
    return this.http.get(`${API}stores`)
      .map((stores: any) => {
        return stores.data;
      });
  }
}
