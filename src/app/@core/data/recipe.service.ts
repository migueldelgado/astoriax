import { Injectable } from '@angular/core';
import {AppConfig} from '../../app.config';
import {Http} from '@angular/http';

@Injectable()
export class RecipeService {

  constructor(private http: Http) {
  }
  public getAll() {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/recipes?currentStore=${AppConfig.APP_CURRENT_STORE}`)
      .map(response => response.json())
      .map((supplies: any) => {
        return supplies.data;
      });
  }

}
