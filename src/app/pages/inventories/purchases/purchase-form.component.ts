///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {SupplyService} from '../../../@core/data/supply.service';
import {StoreService} from '../../../@core/data/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../../@core/data/recipe.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {AppConfig} from '../../../app.config';
import {LoanService} from '../../../@core/data/loan.service';
import {SupplierService} from '../../../@core/data/supplier.service';
import {PurchaseService} from '../../../@core/data/purchase.service';
import {NbAuthService} from '../../../auth/services';
import {parseErrroMessage} from '../../../@core/utils/error';

@Component({
  selector: 'ngx-supply-form',
  templateUrl: './purchase-form.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class PurchaseFormComponent implements OnInit {
  id: string;
  supplies: Array<any> = [];
  stores: Array<any> = [];
  suppliers: Array<any> = [];
  data = {
    store_id: null,
    supplier_id: null,
    document_number: null,
    date: new Date(),
    supplies: [],
  };

// {
//   "store_id": 1,
//   "supplier_id": 1,
//   "document_number": 1645899,
//   "date": "2018-05-05",
//   "supplies":[
//     {
//       "supply_id": 1,
//       "quantity": 10
//     },
//     {
//       "supply_id": 2,
//       "quantity": 10
//     }
//     ]
// }

  // {"date":"2018-02-09T23:52:47.910Z","invoice_number":"123","id_store":"1","id_shift":"1","id_supplier":"4",
  // "supplies":[{"id_supply":"49","quantity":"1"}]}

  options: INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };
  date = {
    jsdate: new Date(),
    formatted: null,
  };


  constructor(private purchaseService: PurchaseService,
              private supplyService: SupplyService,
              private supplierService: SupplierService,
              private storeService: StoreService,
              private authService: NbAuthService,
              private route: ActivatedRoute,
              private router: Router) {
    this.data.store_id = this.authService.getCurrentStore();
  }

  ngOnInit() {

    Observable.forkJoin(this.storeService.getAll(true), this.supplierService.getAll(true), this.supplyService.getAll())
      .subscribe((result: any) => {
        this.stores = result[0];
        this.suppliers = result[1];
        this.supplies = result[2].data;
        this.loadPurchaseData();
      })

  }

  loadPurchaseData() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.id = params.id;
      this.purchaseService.find(this.id)
        .subscribe(({data}) => {
          this.data.store_id = data.store_id;
          this.data.document_number = data.document_number;
          const d = new Date(data.date);
          const userTimezoneOffset = d.getTimezoneOffset() * 60000;
          this.date = { jsdate: new Date(d.getTime() + userTimezoneOffset), formatted: null };
          this.data.supplier_id = data.supplier_id;
          const supplies = data.supplies || [];
          this.data.supplies = supplies.map((s) => ({
            quantity: s.quantity,
            supply_id: s.supply_id,
          }));
        })
    });
  }

  addSupply(e) {
    e.preventDefault();
    this.data.supplies.push({
      supply_id: null,
      quantity: '1',
    });
  }

  removeSupply(i) {
    this.data.supplies = [...this.data.supplies.slice(0, i), ...this.data.supplies.slice(i + 1)];
  }

  cancel() {
    this.router.navigate(['/pages/inventories/purchases']);
  }

  onSubmit() {
    const d = this.date.jsdate;
    const month = d.getMonth();
    const day = d.getDate();
    const year = d.getFullYear();
    const data = Object.assign({}, this.data, {
      date: `${year}-${month + 1}-${day}`,
      id: this.id,
    });

    if (this.id) {
      this.update(data)
    } else {
      this.save(data)
    }
  }

  save(data) {
    this.purchaseService.create(data)
      .subscribe((result) => {
        this.cancel()
      }, (error) => {
        alert(parseErrroMessage(error));
      });
  }

  update(data) {
    this.purchaseService.update(this.id, data)
      .subscribe((result) => {
        this.cancel()
      }, (error) => {
        alert(parseErrroMessage(error));
      });
  }
}
