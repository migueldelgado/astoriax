import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SupplyClassificationService {

  constructor(private http: HttpClient) {
  }
  public getAll() {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/supplies_classification`)
      .map((supplies: any) => {
        return supplies.data;
      });
  }
}
