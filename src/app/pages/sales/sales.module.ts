import { NgModule } from '@angular/core';
import { DatePipe} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import { SalesRoutingModule, routedComponents } from './sales.routing'
import { SalesComponent } from './sales.component';

const components = [
  SalesComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    SalesRoutingModule,
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
export class SalesModule { }
