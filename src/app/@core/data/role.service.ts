import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class RoleService {
  constructor(private http: HttpClient, private authService: NbAuthService) {}

  public getAll() {
    return this.http
      .get(`${AppConfig.API_ENDPOINT}roles`)
      .map((result: any) => result.data);
  }

  public getPermissions() {
    return this.http
      .get(`${AppConfig.API_ENDPOINT}permissions`)
      .map((result: any) => result.data);
  }

  public deleteRole(id) {
    return this.http.delete(`${AppConfig.API_ENDPOINT}roles/${id}`);
  }

  public createRole(data) {
    return this.http.post(`${AppConfig.API_ENDPOINT}roles`, data);
  }

  public updateRole(id, data) {
    return this.http.put(`${AppConfig.API_ENDPOINT}roles/${id}`, data);
  }

  public findRole(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}roles/${id}`);
  }
}
