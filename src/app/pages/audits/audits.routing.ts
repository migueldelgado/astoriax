import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuditComponent} from './audits.component';
import {AuditOverviewComponent} from './overview/auditoverview.component';
import {AuditAddComponent} from './auditAdd/auditadd.component';
import {AuditTableComponent} from './audit-table/audit-table.component';

const routes: Routes = [
  {
    path: '',
    component: AuditComponent,
    children: [
      {
        path: 'auditAdd',
        component: AuditAddComponent,
      },
      {
        path: 'audit-list',
        component: AuditTableComponent,
      },
      {
        path: 'overview',
        component: AuditOverviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditsRoutingModule {
}
