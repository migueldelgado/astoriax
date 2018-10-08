import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }
  public getAll() {
    return this.http.get(`${AppConfig.API_ENDPOINT}users`)
      .map((users: any) => {
        return users;
      });
  }

  public findUser(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}users/${id}`)
  }
}
