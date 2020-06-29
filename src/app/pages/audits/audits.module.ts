import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {AuditsRoutingModule} from './audits.routing';
import {AuditComponent} from './audits.component';
import {AuditOverviewComponent} from './overview/auditoverview.component';
import {AuditAddComponent} from './auditAdd/auditadd.component';
import {AuditDetailComponent} from './audit-detail/audit-detail.component';
import {AuditsService} from './audits.service'
import {AuditTableComponent} from './audit-table/audit-table.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { LoadingModule } from 'ngx-loading';
import {ChartModule} from 'angular2-chartjs';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';


const components = [
  AuditComponent,
  AuditOverviewComponent,
  AuditAddComponent,
  AuditTableComponent,
  AuditDetailComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AuditsRoutingModule,
    Ng2SmartTableModule,
    LoadingModule,
    ChartModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...components,
  ],
  providers: [
    AuditsService,
  ],
})

export class AuditModule {
}
