import { Component, Input, OnInit } from '@angular/core';

import { NbSidebarService } from '@nebular/theme';
import { NbMenuService } from '../menu/menu.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthService } from '../../../auth/services';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() position: string = 'normal';

  user: any;
  currentStore: any;

  userMenu = [{ type: 'logout', title: 'Log out' }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private analyticsService: AnalyticsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.currentStore = this.authService.getCurrentStore();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  onChangeStore() {
    this.authService.setCurrentStore(this.currentStore);
    window.location.reload();
  }

  onClick(event) {
    this.authService.logout('email').subscribe(result => {
      this.router.navigate(['/auth/login']);
    });
  }
}
