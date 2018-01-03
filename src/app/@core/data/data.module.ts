import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
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

const SERVICES = [
  UserService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  // Real services
  StoreService,
  SupplierService,
  SupplyReportTypeService,
  SupplyClassificationService,
  SupplyService,
  SupplyTypeService,
  UnitService,
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
