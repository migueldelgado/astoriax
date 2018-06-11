import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ReportsComponent} from './reports.component';
import {CrossReportComponent} from './crossReport/cross-report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'reporte-cruzado',
        component: CrossReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {
}
