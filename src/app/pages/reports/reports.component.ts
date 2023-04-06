import { Component } from '@angular/core';
import { NbAuthService } from 'app/auth';

@Component({
  selector: 'ngx-reports',
  template: `
    <ngx-cross-report></ngx-cross-report>
    <ngx-supplies-bought-report></ngx-supplies-bought-report>
    <ngx-sales-breakdown-report *ngIf="isAdmin"></ngx-sales-breakdown-report>
  `,
})
export class ReportsComponent {

  isAdmin: any;

  constructor(private authService: NbAuthService) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.isAdmin = user.roles.find(role => role.name === 'ADMIN');
  }
}
