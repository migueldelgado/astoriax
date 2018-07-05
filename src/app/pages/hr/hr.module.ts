import { NgModule } from '@angular/core';
import { DatePipe} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import { HrRoutingModule, routedComponents } from './hr.routing'
import { HrComponent } from './hr.component';

const components = [
  HrComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    HrRoutingModule,
    Ng2SmartTableModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...components,
    ...routedComponents,
  ],
  providers: [
    DatePipe,
  ],
  entryComponents: [
  ],
})
export class HrModule { }
