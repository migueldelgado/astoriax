import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {AuditsRoutingModule} from './audits.routing';
import {AuditComponent} from './audits.component';
import {AuditOverviewComponent} from './overview/auditoverview.component';
import {AuditAddComponent} from './auditAdd/auditadd.component';
import {AuditsService} from './audits.service'

const components = [
  AuditComponent,
  AuditOverviewComponent,
  AuditAddComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AuditsRoutingModule,
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
