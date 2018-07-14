import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AccountFinanceRoutingModule, routedComponents } from './account-finance.routing';
import { AccountingFinanceComponent } from './accounting-finance.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';
import { AddInvoiceProviderComponent } from './modal/add-invoice-provider.component';
import { AddTreasuryRegistryComponent } from './modal/add-treasury-registry.component';
import {ConfirmationModalComponent} from './modal/confirmation-modal.component';
import {ProviderDetailComponent} from './modal/provider-detail.component';

const components = [
  AccountingFinanceComponent,
  AddInvoiceProviderComponent,
  AddTreasuryRegistryComponent,
  ConfirmationModalComponent,
  ProviderDetailComponent,
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
  entryComponents: [
    AddInvoiceProviderComponent,
    AddTreasuryRegistryComponent,
    ConfirmationModalComponent,
    ProviderDetailComponent,
  ],
})
export class AccountFinanceModule {}
