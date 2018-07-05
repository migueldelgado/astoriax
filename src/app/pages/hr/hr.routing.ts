import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HrComponent} from './hr.component';
import {ProvidersComponent} from './providers/providers.component';
import {StoresComponent} from './stores/stores.component';
import {EmployeesComponent} from './employees/employees.component';

const routes: Routes = [
  {
    path: '',
    component: HrComponent,
    children: [
      {
        path: 'providers',
        component: ProvidersComponent,
      },
      {
        path: 'stores',
        component: StoresComponent,
      },
      {
        path: 'employees',
        component: EmployeesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrRoutingModule {
}

export const routedComponents = [
  ProvidersComponent,
  StoresComponent,
  EmployeesComponent,
];
