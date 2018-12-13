import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoriesComponent } from './inventories.component';
import { DailyInventoryFormComponent } from './daily-inventory-form/daily-inventory-form.component';
import { DailyInventoryTableComponent } from './daily-inventories-table/daily-inventory-table.component';
import { PurchaseTableComponent } from './purchases/purchase-table.component';
import { PurchaseFormComponent } from './purchases/purchase-form.component';
import { OutputTableComponent } from './output/output-table.component';
import { OutputFormComponent } from './output/output-form.component';
import { ProcessTableComponent } from './process/process-table.component';

const routes: Routes = [
  {
    path: '',
    component: InventoriesComponent,
    children: [
      {
        path: 'daily',
        component: DailyInventoryTableComponent,
      },
      {
        path: 'daily/new',
        component: DailyInventoryFormComponent,
      },
      {
        path: 'daily/edit/:id',
        component: DailyInventoryFormComponent,
      },
      {
        path: 'purchases',
        component: PurchaseTableComponent,
      },
      {
        path: 'purchase/new',
        component: PurchaseFormComponent,
      },
      {
        path: 'purchase/edit/:id',
        component: PurchaseFormComponent,
      },
      {
        path: 'outputs',
        component: OutputTableComponent,
      },
      {
        path: 'outputs/:id',
        component: OutputFormComponent,
      },
      {
        path: 'processes',
        component: ProcessTableComponent,
      },
      {
        path: 'processes/:id',
        component: ProcessTableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoriesRoutingModule {}

export const routedComponents = [
  DailyInventoryFormComponent,
  DailyInventoryTableComponent,
  PurchaseTableComponent,
  PurchaseFormComponent,
  OutputTableComponent,
  OutputFormComponent,
  ProcessTableComponent,
];
