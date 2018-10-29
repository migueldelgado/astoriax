///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import {Component, OnInit} from '@angular/core';
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

  reportTypes = [
    {
      name: 'Insumo de ventas',
      value: 'IV',
    },
    {
      name: 'Insumo de procesos',
      value: 'IP',
    },
    {
      name: 'Insumo Operacional',
      value: 'IO',
    },
  ];

  units = [
    'Kilogramos', 'Unidades', 'Litros',
  ];

  types = [
    'Directo', 'Indirecto',
  ];

  classifications = [
    'Crítico', 'No Crítico',
  ];
  // {"code":200,"data":
  // {"id":11,"supplier_id":1,"name":"completenge7","classification":"Completos",
  // "type":"this is a type","unit":"KG","report_type":"OV","stock_min":"20",
  // "show_in_daily_inventory":"1","show_in_process":"1","wastage_rate":"0.1","price":"500",
  // "deleted_at":null,"created_at":"2018-10-28 20:43:01","updated_at":"2018-10-28 20:43:01"}}
  data = {
    price: 0,
    name: '',
    stock_min: 0,
    wastage_rate: null,
    stores: [],
    show_in_process: 0,
    show_in_daily_inventory: 0,
    supplier_id: null,
    report_type: null,
    classification: null,
    type: null,
    unit: null,
  };

  stores = [];

  constructor(
    private supplyService: SupplyService,
    private storeService: StoreService,
    private supplyTypeService: SupplyTypeService,
    private supplyReportTypeService: SupplyReportTypeService,
    private supplierService: SupplierService,
    private supplyClassificationService: SupplyClassificationService,
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.stores$ = this.storeService.getAll();
    this.supplyTypes$ = this.supplyTypeService.getAll();
    this.suppliers$ = this.supplierService.getAll(true);
    this.units$ = this.unitService.getAll();
    this.supplyReportTypes$ = this.supplyReportTypeService.getAll();
    this.supplyClassifications$ = this.supplyClassificationService.getAll();
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.id = params.id;
      this.supplyService.findSupply(this.id)
        .subscribe((result) => {
          const stores = result.data.stores.map((s) => ({
            store_id: s.id,
            stock: s.pivot.stock,
          }));
          this.data = Object.assign(this.data, result.data, { stores });
        })
    });

    this.storeService.getAll(true)
      .subscribe((result) => {
        this.stores = result;
      })
  }

  addStore(e) {
    // console.log('##', $event);
    e.preventDefault();
    this.data.stores.push({
      stock: 0,
      store_id: null,
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
    this.router.navigate(['/pages/store/products/supplies'])
  }
}
