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

  public deleteRecipe(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT_OLD}/recipes/${id}`)
      .map(response => response.json())
  }

  public createRecipe(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT_OLD}/recipes`, data)
      .map(response => response.json())
  }

  public updateRecipe(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT_OLD}/recipes/${id}`, data)
      .map(response => response.json())
  }

  public findRecipe(id) {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/recipes/${id}`)
      .map(response => response.json())
  }

}
