import { Component } from '@angular/core';

import { MENU_ITEMS, NbMenuItemExtended } from './pages-menu';
import { NbAuthService } from '../auth/services';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-astoriax-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-astoriax-layout>
  `,
})
export class PagesComponent {
  menu: NbMenuItemExtended[] = [];
  constructor(private authService: NbAuthService) {
    this.mapItem = this.mapItem.bind(this);
    // this.menu = MENU_ITEMS
    this.menu = MENU_ITEMS.map(this.mapItem);
    console.log(this.menu)
  }

  mapItem(m: NbMenuItemExtended) {
    console.log(m, m.children);
    return {
      ...m,
      hidden: !this.hasPermission(m.permissions),
      children: m.children ? m.children.map(this.mapItem) : null,
    };
  }

  hasPermission(permissions = []) {
    if (!permissions || !permissions.length) {
      return true;
    }
    return !!permissions.find(p => this.authService.hasPermission(p));
  }
}
