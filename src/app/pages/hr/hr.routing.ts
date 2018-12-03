import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrComponent } from './hr.component';
import { ProvidersComponent } from './providers/providers.component';
import { StoresComponent } from './stores/stores.component';
import { StoresFormComponent } from './stores/stores-form.component';
import { EmployeesComponent } from './employees/employees.component';
import { RoleFormComponent } from './roles/role-form.component';
import { RoleTableComponent } from './roles/role-table.component';

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
        path: 'stores/:id',
        component: StoresFormComponent,
      },
      {
        path: 'employees',
        component: EmployeesComponent,
      },
      {
        path: 'roles',
        component: RoleTableComponent,
      },
      {
        path: 'roles/:id',
        component: RoleFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrRoutingModule {}

export const routedComponents = [
  ProvidersComponent,
  StoresComponent,
  EmployeesComponent,
  StoresFormComponent,
  RoleTableComponent,
  RoleFormComponent,
];
