import { Injectable } from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';
import { NbAuthService } from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public auth: NbAuthService, public router: Router) {}

  canActivate(): Observable<any> {
    return this.auth.isAuthenticated();
  }

  canActivateChild(): Observable<any> {
    return this.auth.isAuthenticated();
  }
}
