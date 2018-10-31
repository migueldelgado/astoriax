import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbEmailPassAuthProvider } from '../auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { AppConfig } from '../app.config';

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: NbEmailPassAuthProvider,
        config: {
          delay: 3000,
          baseEndpoint: AppConfig.API_ENDPOINT,
          login: {
            endpoint: 'login',
            method: 'post',
            rememberMe: false,
            defaultErrors: ['Email/Password combinacion incorrecta, porfavor intenta denuevo'],
            defaultMessages: ['Te has entrado correctamente'],
          },
          logout: {
            endpoint: 'logout',
            method: 'post',
          },
          requestPass: {
            endpoint: 'auth/request-pass',
          },
          resetPass: {
            endpoint: 'auth/reset-pass',
          },
          register: {
            endpoint: 'register',
            method: 'POST',
          },
        },
      },
    },
  }).providers,
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {

  private configuration: NbEmailPassAuthProvider;

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
