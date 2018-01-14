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
  templateUrl: './recipe-form.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class RecipeFormComponent implements OnInit {
  id: number;
  supplies: Array<any> = [];
  stores$: Observable<any>;

  data = {
    stores: [
      // {
      //   id_store: '2',
      //   name: 'AMPLA',
      //   status: '1',
      //   address: 'VALDIVIA 440 T-401 LOS ANGELES',
      //   phone: '0432451355',
      //   city: 'LOS ANGELES',
      // },
    ],
    supplies: [
    //   {
    //     supply: {
    //       id_supply: '50',
    //       id_supply_classification: '1',
    //       id_supply_type: '1',
    //       id_unit: '3',
    //       id_supplier: '36',
    //       name: 'ACEITE FREÍR',
    //       stock_min: '0',
    //       show_daily_inventory: '1',
    //       processed: '0',
    //       wastage_rate: '0',
    //       id_supply_report_type: '2',
    //       classification: 'Critico',
    //       type: 'Directo',
    //       price: 0,
    //     },
    //     cost: 0,
    //     quantity: '1',
    //   },
    ],
    name: '',
    classification: '',
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
    this.supplyService.getAll()
      .subscribe(supplies => {
        this.supplies = supplies;
      });
    // this.route.params.subscribe(params => {
    //   this.id = +params['id']; // (+) converts string 'id' to a number
    //   this.supplyService.findSupply(this.id)
    //     .subscribe((result) => {
    //       console.log(result);
    //       this.data = Object.assign({}, result.data[0]);
    //       console.log(this.data);
    //     })
    //   // In a real app: dispatch action to load the details here.
    // });
  }

  addSupply(e) {
    e.preventDefault();
    this.data.supplies.push({
      cost: 0,
      quantity: '1',
      supply: {}
    });
  }

  onChangeSupply(idSupply, index) {
    // const idSupply = this.data.supplies[index].id_supply;
    // console.log(e, this.data.supplies, idSupply);
    const supply = this.supplies.find((s) => s.id_supply === idSupply);
    console.log(supply, idSupply, index);
    this.data.supplies[index].supply = Object.assign({}, supply);
    this.recalculateCost(index);
  }

  recalculateCost(i: number) {
    const supply = this.data.supplies[i];
    if (!supply.quantity || supply.quantity <= 0) {
      supply.cost = 0;
      return;
    }
    if (!supply.supply.price) {
      supply.cost = 0;
      return ;
    }
    supply.cost = supply.quantity * supply.supply.price;
  }

  removeSupply(i) {
    this.data.supplies = [...this.data.supplies.slice(0, i), ...this.data.supplies.slice(i + 1)];
  }

  cancel() {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  onChangeStore($event, store) {
    if ($event.returnValue) {
      this.data.stores.push(store);
    } else {
      const index = this.data.stores.indexOf(store);
      this.data.stores = [...this.data.stores.slice(0, index), ...this.data.stores.slice(index + 1)]
    }
  }
}
