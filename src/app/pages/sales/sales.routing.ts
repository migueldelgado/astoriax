import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SalesComponent} from './sales.component';
import {ChequesComponent} from './cheques/cheques.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      {
        path: 'cheques',
        component: ChequesComponent,
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
];
