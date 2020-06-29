/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable, Optional, Inject, Injector } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';

import { NbAbstractAuthProvider } from '../providers/abstract-auth.provider';
import { NbAuthSimpleToken, NbTokenService } from './token.service';
import { NB_AUTH_PROVIDERS_TOKEN } from '../auth.options';
import { UserService } from '../../@core/data/user.service';
import { RoleService } from '../../@core/data/role.service';
import { get } from 'lodash';

export class NbAuthResult {
  protected token: any;
  protected body: any;
  protected errors: string[] = [];
  protected messages: string[] = [];

  // TODO pass arguments in options object
  constructor(
    protected success: boolean,
    protected response?: any,
    protected redirect?: any,
    errors?: any,
    messages?: any,
    token?: NbAuthSimpleToken,
  ) {
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
    this.token = token;
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
  private userStores: any;
  private lastCheck: Date;

  constructor(
    protected tokenService: NbTokenService,
    protected userService: UserService,
    protected roleService: RoleService,
    protected injector: Injector,
    @Optional() @Inject(NB_AUTH_PROVIDERS_TOKEN) protected providers = {},
  ) {
    this.setCurrentUser(JSON.parse(localStorage.getItem('user_data')));
    const store = localStorage.getItem('current_store');
    this.setCurrentStore(store);
    this.lastCheck = new Date(0);
  }

  setCurrentUser(user) {
    localStorage.setItem('user_data', JSON.stringify(user));
    this.user = user;
  }

  getCurrentUser() {
    return Observable.of(this.user);
  }

  getUser() {
    return this.user;
  }

  setCurrentStore(store) {
    localStorage.setItem('current_store', store);
    this.currentStore = store;
  }

  getCurrentStore() {
    return this.currentStore || '';
  }

  setUserStores(stores) {
    localStorage.setItem('user_stores', JSON.stringify(stores));
    this.userStores = stores;
  }

  getUserStores() {
    const userStores = JSON.parse(localStorage.getItem('user_stores'));
    return userStores || [];
  }

  clear() {
    localStorage.removeItem('user_data');
    localStorage.removeItem('current_store');
    this.user = null;
    this.currentStore = null;
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
    const user = this.user || null;
    const diff = new Date().getTime() - this.lastCheck.getTime();
    if (diff < 60000 || !user) {
      return Observable.of(!!user);
    }

    this.lastCheck = new Date();
    return Observable.forkJoin(
      this.userService.findUser(user.id),
      this.getToken(),
    )
      .catch(() => Observable.of(false))
      .map(result => {
        const updatedUser = result[0].data;
        this.setRoles(updatedUser);
        return !!result;
      });
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
  async authenticate(provider: string, data?: any): Promise<NbAuthResult> {
    const result = await this.getProvider(provider)
      .authenticate(data)
      .toPromise();
    if (!result.isSuccess() || !result.getTokenValue()) {
      return result;
    }
    const u = result.getResponse().body.data;
    await this.setToken(result).toPromise();
    const user = await this.userService
      .findUser(u.id)
      .toPromise()
      .then(res => {
        return res.data;
      });

    this.setCurrentUser(user);
    this.setCurrentStore(get(user, 'stores[0].id', null));
    this.setUserStores(user.stores);
    await this.setRoles(user);

    return result;
  }

  setToken(result: NbAuthResult): Observable<NbAuthResult> {
    return this.tokenService
      .set(result.getTokenValue())
      .switchMap(_ => this.tokenService.get())
      .map(token => {
        result.replaceToken(token);
        return result;
      });
  }

  async setRoles(user) {
    const roles = get(user, 'roles', []);
    const rolesIds = roles.map(r => r.id);
    if (rolesIds.length) {
      const obs = rolesIds.map(r =>
        this.roleService
          .findRole(r)
          .toPromise()
          .then(role => role.data),
      );
      const roleResults = await Promise.all(obs);
      user.permissions = roleResults.reduce((acc, r: any) => {
        const rolePerm = r.permissions.reduce((rAcc, rP) => {
          return {
            ...rAcc,
            [rP.code]: rP,
          };
        }, {});
        return {
          ...acc,
          ...rolePerm,
        };
      }, {});
      this.setCurrentUser(user);
    }
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
    return this.getProvider(provider)
      .register(data)
      .switchMap((result: NbAuthResult) => {
        if (result.isSuccess() && result.getTokenValue()) {
          const user = result.getResponse().body.data;

          this.setCurrentUser(user);

          return this.tokenService
            .set(result.getTokenValue())
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
    return this.getProvider(provider)
      .logout()
      .do((result: NbAuthResult) => {
        if (result.isSuccess()) {
          this.tokenService.clear().subscribe(() => {});
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

  hasPermission(key: string): boolean {
    const user = this.getUser() || { permissions: {}};
    const p = user.permissions || {};
    return !!p[key];
  }
}
