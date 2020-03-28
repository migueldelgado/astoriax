///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../../../@core/data/supply.service';
import { StoreService } from '../../../@core/data/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { SupplierService } from '../../../@core/data/supplier.service';
import { PurchaseService } from '../../../@core/data/purchase.service';
import { NbAuthService } from '../../../auth/services';
import { parseErrroMessage } from '../../../@core/utils/error';
import { getDateStringByDate } from '../../../@core/utils/dateUtils';

@Component({
  selector: 'ngx-supply-form',
  templateUrl: './purchase-form.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
    `,
  ],
})
export class PurchaseFormComponent implements OnInit {

  id: string;
  supplies: Array<any> = [];
  stores: Array<any> = [];
  suppliers: Array<any> = [];
  data = {
    store_id: null,
    supplier_id: null,
    type: 'F',
    document_number: null,
    date: new Date(),
    supplies: [],
    amount: 0,
  };

  options: INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  date = {
    jsdate: new Date(),
    formatted: null,
  };

  dateDocument = {
    jsdate: new Date(),
    formatted: null,
  };

  constructor(
    private purchaseService: PurchaseService,
    private supplyService: SupplyService,
    private supplierService: SupplierService,
    private storeService: StoreService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.data.store_id = this.authService.getCurrentStore();
  }

  ngOnInit() {
    if (!this.hasPermission('COM')) {
      this.router.navigate(['/pages']);
      return;
    }
    Observable.forkJoin(
      this.storeService.getAll(true),
      this.supplierService.getAll(true),
      this.supplyService.getAll(),
    ).subscribe((result: any) => {
      this.stores = result[0];
      this.suppliers = result[1];
      this.supplies = result[2].data;
      this.loadPurchaseData();
    });
  }

  loadPurchaseData() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.id = params.id;
      this.purchaseService.find(this.id).subscribe(({ data }) => {
        this.data.store_id = data.store_id;
        this.data.document_number = data.document_number;
        const d = new Date(data.date);
        const userTimezoneOffset = d.getTimezoneOffset() * 60000;
        this.date = {
          jsdate: new Date(d.getTime() + userTimezoneOffset),
          formatted: null,
        };
        this.data.supplier_id = data.supplier_id;
        const supplies = data.supplies || [];
        this.data.supplies = supplies.map(s => ({
          quantity: s.pivot.quantity,
          supply_id: s.pivot.supply_id,
        }));
      });
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
    this.data.supplies = [
      ...this.data.supplies.slice(0, i),
      ...this.data.supplies.slice(i + 1),
    ];
  }

  cancel() {
    this.router.navigate(['/pages/inventories/purchases']);
  }

  onSubmit() {
    const date = getDateStringByDate(this.date.jsdate);
    const data = Object.assign({}, this.data, {
      date,
      id: this.id,
    });

    if (this.id) {
      if (!this.hasPermission('MCOM')) {
        alert('No tienes permisos para editar compras');
        return;
      }
      this.update(data);
    } else {
      if (!this.hasPermission('ACOM')) {
        alert('No tienes permisos para editar compras');
        return;
      }
      this.save(data);
    }
  }

  save(data) {
    this.purchaseService.create(data).subscribe(
      result => {
        this.cancel();
      },
      error => {
        alert(parseErrroMessage(error));
      },
    );
  }

  update(data) {
    this.purchaseService.update(this.id, data).subscribe(
      result => {
        this.cancel();
      },
      error => {
        alert(parseErrroMessage(error));
      },
    );
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }
}
