/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable, Optional, Inject, Injector } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { NbAbstractAuthProvider } from '../providers/abstract-auth.provider';
import { NbAuthSimpleToken, NbTokenService } from './token.service';
import { NB_AUTH_PROVIDERS_TOKEN } from '../auth.options';

export class NbAuthResult {

  protected token: any;
  protected body: any;
  protected errors: string[] = [];
  protected messages: string[] = [];

  // TODO pass arguments in options object
  constructor(protected success: boolean,
    protected response?: any,
    protected redirect?: any,
    errors?: any,
    messages?: any,
    token?: NbAuthSimpleToken) {

    this.errors = this.errors.concat([errors]);
    if (errors instanceof Array) {
      this.errors = errors;
    }

    this.messages = this.messages.concat([messages]);
    if (messages instanceof Array) {
      this.messages = messages;
    }

    this.token = token;
  }

  getResponse(): any {
    return this.response;
  }

  getTokenValue(): any {
    return this.response.body.data.api_token;
  }

  replaceToken(token: NbAuthSimpleToken): any {
    this.token = token
  }

  getRedirect(): any {
    return this.redirect;
  }

  getErrors(): string[] {
    return this.errors.filter(val => !!val);
  }

  getMessages(): string[] {
    return this.messages.filter(val => !!val);
  }

  isSuccess(): boolean {
    return this.success;
  }

  isFailure(): boolean {
    return !this.success;
  }
}

@Injectable()
export class NbAuthService {
  private user: any;
  private currentStore: any;

  constructor(protected tokenService: NbTokenService,
              protected injector: Injector,
              @Optional() @Inject(NB_AUTH_PROVIDERS_TOKEN) protected providers = {}) {
    this.setCurrentUser(JSON.parse(localStorage.getItem('user_data')));
    const store = localStorage.getItem('current_store');
    this.setCurrentStore(store);
  }

  setCurrentUser(user) {
    localStorage.setItem('user_data', JSON.stringify(user));
    this.user = user;
  }

  getCurrentUser() {
    return Observable.of(this.user);
  }

  setCurrentStore(store) {
    localStorage.setItem('current_store', store);
    this.currentStore = store;
  }

  getCurrentStore() {
    return Observable.of(this.currentStore);
  }

  clear() {
    localStorage.removeItem('user_data');
  }
  /**
   * Retrieves current authenticated token stored
   * @returns {Observable<any>}
   */
  getToken(): Observable<NbAuthSimpleToken> {
    return this.tokenService.get();
  }

  /**
   * Returns true if auth token is presented in the token storage
   * // TODO: check exp date for JWT token
   * @returns {Observable<any>}
   */
  isAuthenticated(): Observable<any> {
    return this.getToken().map(token => !!(token && token.getValue()));
  }

  /**
   * Returns tokens stream
   * @returns {Observable<any>}
   */
  onTokenChange(): Observable<NbAuthSimpleToken> {
    return this.tokenService.tokenChange();
  }

  /**
   * Returns authentication status stream
   *  // TODO: check exp date for JWT token
   * @returns {Observable<any>}
   */
  onAuthenticationChange(): Observable<boolean> {
    return this.onTokenChange().map(token => !!(token && token.getValue()));
  }

  /**
   * Authenticates with the selected provider
   * Stores received token in the token storage
   *
   * Example:
   * authenticate('email', {email: 'email@example.com', password: 'test'})
   *
   * @param provider
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  authenticate(provider: string, data?: any): Observable<NbAuthResult> {
    return this.getProvider(provider).authenticate(data)
      .switchMap((result: NbAuthResult) => {
        if (result.isSuccess() && result.getTokenValue()) {
          this.setCurrentUser(result.getResponse().body.data);
          return this.tokenService.set(result.getTokenValue())
            .switchMap(_ => this.tokenService.get())
            .map(token => {
              result.replaceToken(token);
              return result;
            });
        }

        return Observable.of(result);
      });
  }

  /**
   * Registers with the selected provider
   * Stores received token in the token storage
   *
   * Example:
   * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
   *
   * @param provider
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  register(provider: string, data?: any): Observable<NbAuthResult> {
    return this.getProvider(provider).register(data)
      .switchMap((result: NbAuthResult) => {
        if (result.isSuccess() && result.getTokenValue()) {
          this.setCurrentUser(result.getResponse().body.data);
          return this.tokenService.set(result.getTokenValue())
            .switchMap(_ => this.tokenService.get())
            .map(token => {
              result.replaceToken(token);
              return result;
            });
        }

        return Observable.of(result);
      });
  }

  /**
   * Sign outs with the selected provider
   * Removes token from the token storage
   *
   * Example:
   * logout('email')
   *
   * @param provider
   * @returns {Observable<NbAuthResult>}
   */
  logout(provider: string): Observable<NbAuthResult> {
    return this.getProvider(provider).logout()
      .do((result: NbAuthResult) => {
        if (result.isSuccess()) {
          this.tokenService.clear().subscribe(() => { });
          this.clear();
        }
      });
  }

  /**
   * Sends forgot password request to the selected provider
   *
   * Example:
   * requestPassword('email', {email: 'email@example.com'})
   *
   * @param provider
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  requestPassword(provider: string, data?: any): Observable<NbAuthResult> {
    return this.getProvider(provider).requestPassword(data);
  }

  /**
   * Tries to reset password with the selected provider
   *
   * Example:
   * resetPassword('email', {newPassword: 'test'})
   *
   * @param provider
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  resetPassword(provider: string, data?: any): Observable<NbAuthResult> {
    return this.getProvider(provider).resetPassword(data);
  }

  getProvider(provider: string): NbAbstractAuthProvider {
    if (!this.providers[provider]) {
      throw new TypeError(`Nb auth provider '${provider}' is not registered`);
    }

    return this.injector.get(this.providers[provider].service);
  }
}
