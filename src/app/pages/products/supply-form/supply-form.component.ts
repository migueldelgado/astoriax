///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {SupplyService} from '../../../@core/data/supply.service';
import {SupplyTypeService} from '../../../@core/data/supply-type.service';
import {SupplyReportTypeService} from '../../../@core/data/supply-report-type.service';
import {SupplierService} from '../../../@core/data/supplier.service';
import {SupplyClassificationService} from '../../../@core/data/supply-classification.service';
import {UnitService} from '../../../@core/data/unit.service';
import {StoreService} from '../../../@core/data/store.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';

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
  id: number;
  supplyClassifications$: Observable<any>;
  supplyReportTypes$: Observable<any>;
  stores$: Observable<any>;
  supplyTypes$: Observable<any>;
  suppliers$: Observable<any>;
  units$: Observable<any>;
  statusTypes = [
    {
      id_status: 1,
      description: 'Activo',
    },
    {
      id_status: 0,
      description: 'Inactivo',
    },
  ];

  data = {
    price: 0,
    name: '',
    stock_min: 0,
    wastage_rate: null,
    stores: [],
    processed: 0,
    show_daily_inventory: 0,
    id_supply_classification: null,
    id_supply_type: null,
    id_unit: null,
    id_supplier: null,
    id_supply_report_type: null,
  };

  constructor(
    private supplyService: SupplyService,
    private storeService: StoreService,
    private supplyTypeService: SupplyTypeService,
    private supplyReportTypeService: SupplyReportTypeService,
    private supplierService: SupplierService,
    private supplyClassificationService: SupplyClassificationService,
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.stores$ = this.storeService.getAll();
    this.supplyTypes$ = this.supplyTypeService.getAll();
    this.suppliers$ = this.supplierService.getAll();
    this.units$ = this.unitService.getAll();
    this.supplyReportTypes$ = this.supplyReportTypeService.getAll();
    this.supplyClassifications$ = this.supplyClassificationService.getAll();
    this.route.params.subscribe(params => {
      if (!params.id) {
        return ;
      }
      this.id = params.id;
      console.log(this.id);
      this.supplyService.findSupply(this.id)
        .subscribe((result) => {
          this.data = Object.assign({}, result.data[0]);
        })
    });
  }

  addStore(e) {
    // console.log('##', $event);
    e.preventDefault();
    this.data.stores.push({
      stock: 0,
      status: {
        id_status: null,
      },
      store: {
        id_store: null,
      },
    });
  }

  removeStore(i) {
    this.data.stores = [...this.data.stores.slice(0, i), ...this.data.stores.slice(i + 1)];
  }

  onSubmit() {
    if (this.id) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    this.supplyService.createSupply(this.data)
      .subscribe((result) => {
        this.cancel()
      }, (error) => {
        const err = JSON.parse(error._body);
        alert(err.message);
      });
  }

  update() {
    this.supplyService.updateSupply(this.id, this.data)
      .subscribe((result) => {
        this.cancel()
      }, (error) => {
        const err = JSON.parse(error._body);
        alert(err.message);
      });
  }

  cancel() {
    this.router.navigate(['/pages/products/supplies'])
  }
}
