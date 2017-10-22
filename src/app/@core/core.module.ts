import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthProvider, NbEmailPassAuthProvider } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: NbEmailPassAuthProvider,
        config: {
          delay: 3000,
          baseEndpoint: 'http://laravel.dev',
          login: {
            endpoint: '/login',
            method: 'post',
            rememberMe: false,
            // redirect: {
            //   success: '/auth/register',
            //   failure: '/pages/audits/auditAdd'
            // },
            defaultErrors: ['Email/Password combinacion incorrecta, porfavor intenta denuevo'],
            defaultMessages: ['Te has entrado correctamente'],
          },
          logout: {
            endpoint: '/api/auth/logout'
          },
          requestPass: {
            endpoint: '/api/auth/request-pass'
          },
          resetPass: {
            endpoint: '/api/auth/reset-pass'
          }
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
  
  private configuration : NbEmailPassAuthProvider;
  
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
