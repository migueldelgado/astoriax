import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {

  constructor(private http: Http) {
  }

  public getAll() {
    return this.http.get('http://localhost:4200/assets/fake-api/insumos.json')
      .map(response => response.json())
      .map((supplies: any) => {
        return supplies.data.map(s => this.parseData(s));
      });
  }

  private parseData(data): any {
    return data;
  }


}
