import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AccountFinanceRoutingModule, routedComponents } from './account-finance.routing';
import { AccountingFinanceComponent } from './accounting-finance.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';

const components = [
  AccountingFinanceComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AccountFinanceRoutingModule,
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
})
export class AccountFinanceModule {}
