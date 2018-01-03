///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {SupplyService} from '../../../@core/data/supply.service';
import {SupplyTypeService} from '../../../@core/data/supply-type.service';
import {SupplyReportTypeService} from '../../../@core/data/supply-report-type.service';
import {SupplierService} from '../../../@core/data/supplier.service';
import {SupplyClassificationService} from '../../../@core/data/supply-classification.service';
import {UnitService} from '../../../@core/data/unit.service';
import {StoreService} from '../../../@core/data/store.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ngx-supply-form',
  templateUrl: './supply-form.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SupplyFormComponent implements OnInit {
  supplyClassifications$: Observable<any>;
  supplyReportTypes$: Observable<any>;
  stores$: Observable<any>;
  supplyTypes$: Observable<any>;
  suppliers$: Observable<any>;
  units$: Observable<any>;


  constructor(
    private supplyService: SupplyService,
    private storeService: StoreService,
    private supplyTypeService: SupplyTypeService,
    private supplyReportTypeService: SupplyReportTypeService,
    private supplierService: SupplierService,
    private supplyClassificationService: SupplyClassificationService,
    private unitService: UnitService,
  ) {
  }

  ngOnInit() {
    this.stores$ = this.storeService.getAll();
    this.supplyTypes$ = this.supplyTypeService.getAll();
    this.suppliers$ = this.supplierService.getAll();
    this.units$ = this.unitService.getAll();
    this.supplyReportTypes$ = this.supplyReportTypeService.getAll();
    this.supplyClassifications$ = this.supplyClassificationService.getAll();
  }
}
