import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  public getAll(storeId) {
    return this.http.get(`${AppConfig.API_ENDPOINT}users?store_id=${storeId}`).map((users: any) => {
      return users.data || [];
    });
  }

  public findUser(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}users/${id}`);
  }

  public update(data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}users/${data.id}`, data);
  }

  public create(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT}users`, data);
  }

  public delete(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}users/${id}`);
  }

  public isCurrentUserAdmin() {
    const ADMIN = 1;
    const currentUserData = JSON.parse(localStorage.getItem('user_data'));
    return currentUserData.roles.find(r => r.id === ADMIN);
  }
}
