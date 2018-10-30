import { NgModule } from '@angular/core';
import { DatePipe} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import { HrRoutingModule, routedComponents } from './hr.routing'
import { HrComponent } from './hr.component';
import { UserModalComponent } from './modal/user-modal.component'
import { UserPasswordModalComponent } from './modal/user-password-modal.component'
import { ProvidersModalComponent } from './modal/providers-modal.component'
import { StoresModalComponent } from './modal/stores-modal.component'
import {NgMultiSelectDropDownModule} from '../../../libs/ng-multiselect-dropdown';

const components = [
  HrComponent,
  UserModalComponent,
  UserPasswordModalComponent,
  ProvidersModalComponent,
  StoresModalComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    HrRoutingModule,
    Ng2SmartTableModule,
    NgxMyDatePickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    ...components,
    ...routedComponents,
  ],
  providers: [
    DatePipe,
  ],
  entryComponents: [
    UserModalComponent,
    UserPasswordModalComponent,
    ProvidersModalComponent,
    StoresModalComponent,
  ],
})
export class HrModule { }
