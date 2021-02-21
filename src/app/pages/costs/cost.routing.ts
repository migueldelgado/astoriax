import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CostComponent} from './cost.component';
import {VariableCostsComponent} from './variable-costs/variable-costs.component';
import {GeneralExpensesComponent} from './general-expenses/general-expenses.component';
import {FixedCostsComponent} from './fixed-costs/fixed-costs.component';

const routes: Routes = [
  {
    path: '',
    component: CostComponent,
    children: [
      {
        path: 'variable-costs',
        component: VariableCostsComponent,
      },
      {
        path: 'general-expenses',
        component: GeneralExpensesComponent,
      },
      {
        path: 'fixed-costs',
        component: FixedCostsComponent,
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
  GeneralExpensesComponent,
  FixedCostsComponent,
];
