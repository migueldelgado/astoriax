import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from './users.service';
import { ElectricityService } from './electricity.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PlayerService } from './player.service';
import {StoreService} from './store.service';
import {SupplyService} from './supply.service';
import {SupplierService} from './supplier.service';
import {UnitService} from './unit.service';
import {SupplyTypeService} from './supply-type.service';
import {SupplyReportTypeService} from './supply-report-type.service';
import {SupplyClassificationService} from './supply-classification.service';
import {RecipeService} from './recipe.service';
import {DailyInventoryService} from './daily-inventory.service';
import {LoanService} from './loan.service';
import {PurchaseService} from './purchase.service';
import {UserService} from './user.service';

const SERVICES = [
  UsersService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  // Real services
  DailyInventoryService,
  LoanService,
  PurchaseService,
  RecipeService,
  StoreService,
  SupplierService,
  SupplyReportTypeService,
  SupplyClassificationService,
  SupplyService,
  SupplyTypeService,
  UnitService,
  UserService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
