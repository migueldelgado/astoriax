import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HrComponent } from './hr.component';

import { ProvidersComponent } from './providers/providers.component';
import { SuppliersFormComponent } from './providers/suppliers-form.component';
import { StoresComponent } from './stores/stores.component';
import { StoresFormComponent } from './stores/stores-form.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { RoleFormComponent } from './roles/role-form.component';
import { RoleTableComponent } from './roles/role-table.component';

const routes: Routes = [
  {
    path: '',
    component: HrComponent,
    children: [
      { path: 'suppliers', component: ProvidersComponent },
      { path: 'suppliers/new', component: SuppliersFormComponent },
      { path: 'suppliers/:id', component: SuppliersFormComponent },
      { path: 'stores', component: StoresComponent },
      { path: 'stores/:id', component: StoresFormComponent },
      // { path: 'stores/new', component: StoresFormComponent }, TODO: Fix this issue
      { path: 'employees', component: EmployeesComponent },
      { path: 'employees/new', component: EmployeeFormComponent },
      { path: 'employees/:id', component: EmployeeFormComponent },
      { path: 'roles', component: RoleTableComponent },
      { path: 'roles/:id', component: RoleFormComponent },
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
  SuppliersFormComponent,
  StoresComponent,
  StoresFormComponent,
  EmployeesComponent,
  EmployeeFormComponent,
  RoleTableComponent,
  RoleFormComponent,
];
