import { Component } from '@angular/core';

@Component({
  selector: 'ngx-reports',
  template: `
    <ngx-cross-report></ngx-cross-report>
    <ngx-supplies-bought-report></ngx-supplies-bought-report>
  `,
})
export class ReportsComponent {}
