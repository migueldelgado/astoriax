///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {SupplyService} from '../../../@core/data/supply.service';
import {StoreService} from '../../../@core/data/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../../@core/data/recipe.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {IMyDpOptions} from 'angular4-datepicker/src/my-date-picker/interfaces/my-options.interface';
import {AppConfig} from '../../../app.config';
import {LoanService} from '../../../@core/data/loan.service';
import {SupplierService} from '../../../@core/data/supplier.service';
import {PurchaseService} from '../../../@core/data/purchase.service';

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
    id_store: null,
    id_shift: 1,
    id_supplier: null,
    invoice_number: null,
    supplies: [],
  };

  // {"date":"2018-02-09T23:52:47.910Z","invoice_number":"123","id_store":"1","id_shift":"1","id_supplier":"4",
  // "supplies":[{"id_supply":"49","quantity":"1"}]}

  options: IMyDpOptions = {
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
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    Observable.forkJoin(this.storeService.getAll(), this.supplierService.getAll(), this.supplyService.getAll())
      .subscribe(result => {
        this.stores = result[0];
        this.suppliers = result[1];
        this.supplies = result[2];
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
          const [day, month, year] = data.date.split('/');
          this.data.id_shift = data.shift.id_shift;
          this.data.id_store = data.store.id_store;
          this.data.invoice_number = data.invoice_number;
          this.date.jsdate = new Date(year, parseInt(month, 10) - 1, day);
          this.data.id_supplier = data.supplier.id_supplier;
          this.data.supplies = data.supplies.map((s) => ({
            quantity: s.quantity,
            id_supply: s.supply.id_supply,
          }));
        })
    });
  }

  addSupply(e) {
    e.preventDefault();
    this.data.supplies.push({
      id_supply: null,
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
    const data = Object.assign({}, this.data, {
      id_store: AppConfig.APP_CURRENT_STORE,
      date: this.date.jsdate,
      id_purchase: this.id,
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
        const err = JSON.parse(error._body);
        alert(err.message);
      });
  }

  update(data) {
    this.purchaseService.update(this.id, data)
      .subscribe((result) => {
        this.cancel()
      }, (error) => {
        const err = JSON.parse(error._body);
        alert(err.message);
      });
  }
}
