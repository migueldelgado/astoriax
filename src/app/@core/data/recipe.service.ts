import { Injectable } from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) {
  }
  public getAll() {
    return this.http.get(`${AppConfig.API_ENDPOINT_OLD}/recipes?currentStore=${AppConfig.APP_CURRENT_STORE}`)
      .map((supplies: any) => {
        return supplies.data;
      });
  }

  public deleteRecipe(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT_OLD}/recipes/${id}`)
  }

  public createRecipe(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT_OLD}/recipes`, data)
  }

  public updateRecipe(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT_OLD}/recipes/${id}`, data)
  }

  public findRecipe(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT_OLD}/recipes/${id}`)
  }

}
