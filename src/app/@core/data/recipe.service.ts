import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class RecipeService {
  currentStore;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.currentStore = this.authService.getCurrentStore();
  }

  public getAll(filter?) {
    let name;
    let classification;

    let url = `${AppConfig.API_ENDPOINT}recipes?store_id=${this.currentStore}`;

    if (!!filter) {
      name = !!filter.name ? filter.name : '';
      classification = !!filter.classification ? filter.classification : '';
      url = `${url}&name=${name}&classification=${classification}`;
    }

    return this.http.get(url).map((supplies: any) => {
      return supplies.data;
    });
  }

  public getTotalList() {
    return this.http.get(`${AppConfig.API_ENDPOINT}recipes`);
  }

  public deleteRecipe(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}recipes/${id}`);
  }

  public createRecipe(data) {
    data.store_id = this.authService.getCurrentStore();
    return this.http.post(`${AppConfig.API_ENDPOINT}recipes`, data);
  }

  public updateRecipe(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}recipes/${id}`, data);
  }

  public findRecipe(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}recipes/${id}`);
  }

  public getMostSoldRecipesByYear(year: string, limit?: string) {
    const url = `${AppConfig.API_ENDPOINT}reports/mostSoldRecipesYear`;
    const params = new HttpParams()
      .append('store_id', this.currentStore)
      .append('year', year)
      .append('limit', limit);

    return this.http.get<any>(url, { params });
  }
}
