import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';

import { NbAuthService } from '../auth.service';
import { NbAuthJWTToken } from '../token.service';
import { NB_AUTH_INTERCEPTOR_HEADER } from '../../auth.options';
import {StateService} from '../../../@core/data/state.service';

@Injectable()
export class NbAuthSimpleInterceptor implements HttpInterceptor {
  private pendingRequests: number = 0;
  constructor(private injector: Injector,
              @Inject(NB_AUTH_INTERCEPTOR_HEADER) protected headerName: string = 'Authorization') {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken()
      .switchMap((token: NbAuthJWTToken) => {
        if (token && token.getValue()) {
          req = req.clone({
            setHeaders: {
              [this.headerName]: `Bearer ${token.getValue()}`,
            },
          });
        }
        this.pendingRequests++;
        this.stateService.setLoadingState(true);
        return next.handle(req)
          .finally(() => {
            this.pendingRequests--;
            if (this.pendingRequests === 0) {
              this.stateService.setLoadingState(false);
            }
          })
      });
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }

  protected get stateService(): StateService {
    return this.injector.get(StateService);
  }
}
