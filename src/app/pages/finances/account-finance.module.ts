import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AccountFinanceRoutingModule, routedComponents } from './account-finance.routing';
import { AccountingFinanceComponent } from './accounting-finance.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';
import { AddInvoiceProviderComponent } from './modal/add-invoice-provider.component';
import { AddTreasuryRegistryComponent } from './modal/add-treasury-registry.component';
import { ConfirmationModalComponent } from './modal/confirmation-modal.component';
import { TreasuryService } from './treasury/treasury.service';
import { ClassificationService } from '../classification/classification.service';
import { ToasterModule } from 'angular2-toaster';
import { ProviderDetailComponent } from './providers/provider-detail.component';
import { ProviderDetailComponentModal } from './modal/provider-detail.component';

const components = [
  AccountingFinanceComponent,
  AddInvoiceProviderComponent,
  AddTreasuryRegistryComponent,
  ConfirmationModalComponent,
  ProviderDetailComponent,
  ProviderDetailComponentModal
];

@NgModule({
  imports: [
    ThemeModule,
    AccountFinanceRoutingModule,
    Ng2SmartTableModule,
    NgxMyDatePickerModule.forRoot(),
    ToasterModule
  ],
  declarations: [
    ...components,
    ...routedComponents,
  ],
  providers: [
    DatePipe,
    TreasuryService,
    ClassificationService,
  ],
  entryComponents: [
    AddInvoiceProviderComponent,
    AddTreasuryRegistryComponent,
    ConfirmationModalComponent,
    ProviderDetailComponent,
    ProviderDetailComponentModal
  ],
})
export class AccountFinanceModule {}
