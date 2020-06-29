import { InjectionToken } from '@angular/core';

export interface NbAuthOptions {
  forms?: any;
  providers?: any;
}

export interface NbAuthProviders {
  [key: string]: any;
}

export const defaultSettings: any = {
  forms: {
    login: {
      redirectDelay: 500,
      provider: 'email',
      rememberMe: true,
      showMessages: {
        success: true,
        error: true,
      },
    },
    register: {
      redirectDelay: 500,
      provider: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      terms: true,
    },
    requestPassword: {
      redirectDelay: 500,
      provider: 'email',
      showMessages: {
        success: true,
        error: true,
      },
    },
    resetPassword: {
      redirectDelay: 500,
      provider: 'email',
      showMessages: {
        success: true,
        error: true,
      },
    },
    logout: {
      redirectDelay: 500,
      provider: 'email',
    },
    validation: {
      password: {
        required: true,
        minLength: 1,
        maxLength: 50,
      },
      email: {
        required: true,
      },
      firstName: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      lastName: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      rut: {
        required: true,
        minLength: 7,
        maxLength: 8,
      },
      address: {
        required: true,
        minLength: 5,
        maxLength: 100,
      },
      city: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      phone: {
        required: true,
        minLength: 7,
        maxLength: 20,
      },
    },
  },

};

export const NB_AUTH_OPTIONS_TOKEN = new InjectionToken<NbAuthOptions>('Nebular Auth Options');
export const NB_AUTH_USER_OPTIONS_TOKEN = new InjectionToken<NbAuthOptions>('Nebular User Auth Options');
export const NB_AUTH_PROVIDERS_TOKEN = new InjectionToken<NbAuthProviders>('Nebular Auth Providers');
export const NB_AUTH_TOKEN_WRAPPER_TOKEN = new InjectionToken<NbAuthProviders>('Nebular Auth Token');
export const NB_AUTH_INTERCEPTOR_HEADER = new InjectionToken<NbAuthProviders>('Nebular Simple Interceptor Header');
