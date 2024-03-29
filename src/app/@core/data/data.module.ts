import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from './users.service';
import { ElectricityService } from './electricity.service';
import { SalesService } from '../../pages/sales/sales.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PlayerService } from './player.service';
import { StoreService } from './store.service';
import { SupplyService } from './supply.service';
import { OutputService } from './output.service';
import { SupplierService } from './supplier.service';
import { UnitService } from './unit.service';
import { SupplyTypeService } from './supply-type.service';
import { SupplyReportTypeService } from './supply-report-type.service';
import { SupplyClassificationService } from './supply-classification.service';
import { RecipeService } from './recipe.service';
import { DailyInventoryService } from './daily-inventory.service';
import { DailySalesService } from './daily-sales.service';
import { PurchaseService } from './purchase.service';
import { UserService } from './user.service';
import { RoleService } from './role.service';
import { ProcessService } from './process.service';
import { CreditService } from './credit.service';
import { NumberHelper } from '../../helpers/number-helper';
import { DateHelper } from 'app/helpers/date-helper';

const SERVICES = [
  UsersService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  // Real services
  DailyInventoryService,
  PurchaseService,
  RecipeService,
  SalesService,
  StoreService,
  SupplierService,
  SupplyReportTypeService,
  SupplyClassificationService,
  SupplyService,
  SupplyTypeService,
  UnitService,
  UserService,
  RoleService,
  OutputService,
  ProcessService,
  DailySalesService,
  CreditService,
  NumberHelper,
  DateHelper,
];

@NgModule({
  imports: [CommonModule],
  providers: [...SERVICES],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [...SERVICES],
    };
  }
}
