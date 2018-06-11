import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuardService} from '../auth/services/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivateChild: [AuthGuardService],
  children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'audits',
        loadChildren: './audits/audits.module#AuditModule',
      },
      {
        path: 'store/products',
        loadChildren: './products/products.module#ProductsModule',
      },
      {
        path: 'store/inventories',
        loadChildren: './inventories/inventories.module#InventoriesModule',
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule',
      },
      {
        path: 'reports',
        loadChildren: './reports/reports.module#ReportsModule',
      },
      {
        path: 'ui-features',
        loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
      },
      {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule',
      },
      {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule',
      },
      {
        path: 'editors',
        loadChildren: './editors/editors.module#EditorsModule',
      },
      {
        path: 'forms',
        loadChildren: './forms/forms.module#FormsModule',
      },
      {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule',
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
