import { NgModule } from '@angular/core';
import { DatePipe} from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { NgMultiSelectDropDownModule } from '../../../libs/ng-multiselect-dropdown';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { HrRoutingModule, routedComponents } from './hr.routing';

import { HrComponent } from './hr.component';
import { StoresModalComponent } from './modal/stores-modal.component';
import { UserPasswordModalComponent } from './modal/user-password-modal.component';

const components = [
  HrComponent,
  StoresModalComponent,
  UserPasswordModalComponent
];

@NgModule({
  imports: [
    ThemeModule,
    HrRoutingModule,
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
    StoresModalComponent,
    UserPasswordModalComponent,
  ],
})
export class HrModule { }
