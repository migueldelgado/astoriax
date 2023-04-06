import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ReportsRoutingModule } from './reports.routing';
import { ReportsComponent } from './reports.component';
import { LoadingModule } from 'ngx-loading';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { CrossReportComponent } from './crossReport/cross-report.component';
import { ReportsService } from './reports.service';
import { SuppliesBoughtReportComponent } from './supplies-bought-report/supplies-bought-report.component';
import { SalesBreakdownReportComponent } from './sales-breakdown-report/sales-breakdown-report.component';

const components = [
  ReportsComponent,
  CrossReportComponent,
  SuppliesBoughtReportComponent,
  SalesBreakdownReportComponent
];

@NgModule({
  imports: [
    ThemeModule,
    ReportsRoutingModule,
    LoadingModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [...components],
  providers: [ReportsService],
})
export class ReportsModule {}
