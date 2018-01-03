import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';

@Injectable()
export class StoreService {

  constructor(private http: Http) {
  }
  public getAll() {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/stores`)
      .map(response => response.json())
      .map((stores: any) => {
        return stores.data;
      });
  }
}
