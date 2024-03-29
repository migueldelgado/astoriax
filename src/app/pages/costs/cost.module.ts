import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { InventoriesRoutingModule, routedComponents } from './cost.routing';
import { CostComponent } from './cost.component';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';

const components = [
  CostComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    InventoriesRoutingModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...components,
    ...routedComponents,
  ],
  providers: [
    DatePipe,
  ],
})
export class CostModule {}
