import { Injectable } from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {NbAuthService} from '../../auth/services';

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient, private authService: NbAuthService) {
  }
  public getAll(filter?) {
    let name;
    let classification
    const store = this.authService.getCurrentStore();
    let url = `${AppConfig.API_ENDPOINT}recipes?store_id=${store}`;

    if (!!filter){
      name = !!filter.name ? filter.name : '';
      classification = !!filter.classification ? filter.classification : '';
      url = `${url}&name=${name}&classification=${classification}`;
    }
    
    return this.http.get(url)
      .map((supplies: any) => {
        return supplies.data;
      });
  }

  public getTotalList() {
    return this.http.get(`${AppConfig.API_ENDPOINT}recipes`);
  }


  public deleteRecipe(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}recipes/${id}`)
  }

  public createRecipe(data) {
    data.store_id = this.authService.getCurrentStore();
    return this.http.post(`${AppConfig.API_ENDPOINT}recipes`, data)
  }

  public updateRecipe(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}recipes/${id}`, data)
  }

  public findRecipe(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}recipes/${id}`)
  }

}
