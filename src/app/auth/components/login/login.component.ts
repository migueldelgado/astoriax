/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

import { NbAuthResult, NbAuthService } from '../../services/auth.service';

@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
})
export class NbLoginComponent implements OnInit {
  redirectDelay: number = 100;
  showMessages: any = {};
  provider: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
    protected router: Router,
  ) {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
  }

  ngOnInit() {
    this.service.isAuthenticated().subscribe(result => {
      if (result) {
        this.router.navigate(['/pages']);
      }
    });
  }

  async login(): Promise<void> {
    this.errors = this.messages = [];
    this.submitted = true;
    const result = await this.service.authenticate(this.provider, this.user);
    if (result.isSuccess()) {
      this.messages = result.getMessages();
    } else {
      this.errors = result.getErrors();
    }

    this.submitted = false;

    const redirect = result.getRedirect();
    if (redirect) {
      setTimeout(() => {
        this.router.navigate(['/pages']);
      }, this.redirectDelay);
    }
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
