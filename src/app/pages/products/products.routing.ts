import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProductsComponent} from './products.component';
import {SuppliesTableComponent} from './supplies-table/supplies-table.component';
// import { AuditAddComponent } from './auditAdd/auditadd.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'supplies',
        component: SuppliesTableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
}

export const routedComponents = [
  SuppliesTableComponent,
];
