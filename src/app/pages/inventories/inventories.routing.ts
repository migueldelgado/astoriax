import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {InventoriesComponent} from './inventories.component';
import {DailyInventoryFormComponent} from './daily-inventory-form/daily-inventory-form.component';
import {DailyInventoryTableComponent} from './daily-inventories-table/daily-inventory-table.component';

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
      }, {
        path: 'daily/edit/:id',
        component: DailyInventoryFormComponent,
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
  DailyInventoryFormComponent,
  DailyInventoryTableComponent,
];
