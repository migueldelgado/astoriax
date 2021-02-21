import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class SalesService {
  currentStore: number;

  constructor(private http: HttpClient, private authService: NbAuthService) {
      this.currentStore = this.authService.getCurrentStore();
  }

  public getSalesHistory() {
      const url = `${AppConfig.API_ENDPOINT}stores/${this.currentStore}/getSalesHistory`;
      return this.http.get(url);
  }
}
