import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CostComponent} from './cost.component';
import {VariableCostsComponent} from './variable-costs/variable-costs.component';

const routes: Routes = [
  {
    path: '',
    component: CostComponent,
    children: [
      {
        path: 'variable-costs',
        component: VariableCostsComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoriesRoutingModule {
}

export const routedComponents = [
  VariableCostsComponent,
];
