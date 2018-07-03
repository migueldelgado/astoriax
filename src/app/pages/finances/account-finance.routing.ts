import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AccountingFinanceComponent} from './accounting-finance.component';
import {ProvidersComponent} from './providers/providers.component';
import {TreasuryComponent} from './treasury/treasury.component';
// import {GeneralExpensesComponent} from './general-expenses/general-expenses.component';
// import {FixedCostsComponent} from './fixed-costs/fixed-costs.component';

const routes: Routes = [
  {
    path: '',
    component: AccountingFinanceComponent,
    children: [
      {
        path: 'providers',
        component: ProvidersComponent,
      },
      {
        path: 'treasury',
        component: TreasuryComponent,
      },
      // {
      //   path: 'fixed-costs',
      //   component: FixedCostsComponent,
      // },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountFinanceRoutingModule {
}

export const routedComponents = [
  ProvidersComponent,
  TreasuryComponent,
];
