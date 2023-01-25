import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {
  InventoriesRoutingModule,
  routedComponents,
} from './inventories.routing';
import { InventoriesComponent } from './inventories.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';
import { PurchaseSearchModalComponent } from './credits/credit-form/purchase-search-modal.component';

const components = [InventoriesComponent, PurchaseSearchModalComponent];

@NgModule({
  imports: [
    ThemeModule,
    InventoriesRoutingModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [...components, ...routedComponents],
  providers: [DatePipe],
  entryComponents: [PurchaseSearchModalComponent],
})
export class InventoriesModule {}
