import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { InventoriesRoutingModule, routedComponents } from './inventories.routing';
import { InventoriesComponent } from './inventories.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';

const components = [
  InventoriesComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    InventoriesRoutingModule,
    Ng2SmartTableModule,
    MyDatePickerModule,
  ],
  declarations: [
    ...components,
    ...routedComponents,
  ],
  providers: [
  ],
})
export class InventoriesModule {}
