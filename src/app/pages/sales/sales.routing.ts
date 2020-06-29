import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SalesComponent} from './sales.component';
import {ChequesComponent} from './cheques/cheques.component';
import {AddChequesComponent} from './add-cheques/add-cheques.component';
import {DailySalesComponent} from './daily-sales/daily-sales.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      {
        path: 'cheques',
        component: ChequesComponent,
      },
      {
        path: 'add-cheques',
        component: AddChequesComponent,
      },
      {
        path: 'daily-sales',
        component: DailySalesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {
}

export const routedComponents = [
  ChequesComponent,
  AddChequesComponent,
  DailySalesComponent,
];
