import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountingFinanceComponent } from './accounting-finance.component';
import { ProvidersComponent } from './providers/providers.component';
import { TreasuryComponent } from './treasury/treasury.component';
import { TreasuryFormComponent } from './treasury/treasury-form/treasury-form.component';
import { ProviderDetailComponent } from './providers/provider-detail.component';

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
        path: 'providers/:id',
        component: ProviderDetailComponent,
      },
      {
        path: 'treasury',
        component: TreasuryComponent,
      },
      {
        path: 'treasury/new',
        component: TreasuryFormComponent,
      },
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
  TreasuryFormComponent
];
