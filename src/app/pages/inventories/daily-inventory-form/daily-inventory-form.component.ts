import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../../../@core/data/supply.service';
import { ActivatedRoute, Router } from '@angular/router';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { DailyInventoryService } from '../../../@core/data/daily-inventory.service';
import { NbAuthService } from '../../../auth/services';
import { DatePipe } from '@angular/common';
import { StoreService } from '../../../@core/data/store.service';

@Component({
  selector: 'ngx-inventory-form',
  templateUrl: './daily-inventory-form.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
    `,
  ],
})
export class DailyInventoryFormComponent implements OnInit {
  id: number;
  storeId;
  stores: Array<any> = [];
  supplies: Array<any> = [];
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  date = {
    jsdate: new Date(),
  };

  constructor(
    private supplyService: SupplyService,
    private dailyInventoryService: DailyInventoryService,
    private storeService: StoreService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.storeId = this.authService.getCurrentStore();
  }

  ngOnInit() {
    if (!this.hasPermission('INV')) {
      this.router.navigate(['/pages']);
      return;
    }

    this.storeService.getAll(true).subscribe(result => {
      this.stores = result;
    });

    this.route.params.subscribe(params => {
      if (!params.id) {
        this.loadSupplies();
        return;
      }
      this.loadDailyInventory(params.id);
    });
  }

  loadDailyInventory(id) {
    this.id = id;
    this.dailyInventoryService.findInventory(id).subscribe((result: any) => {
      // const { data } = result;
      // const [day, month, year] = data.date.split('/');
      this.supplies = result;
      // this.date.jsdate = new Date(this.supplies.date);
      // this.supplies = data.supplies.map(s => ({
      //   id_supply: s.supply.id_supply,
      //   name: s.supply.name,
      //   initial_quantity: s.initial_quantity,
      //   final_quantity: s.final_quantity,
      // }));
    });
  }

  onChangeStore() {
    this.loadSupplies();
  }

  loadSupplies() {
    if (!this.storeId) {
      return;
    }
    this.supplyService.getByStoreId(this.storeId).subscribe((result: any) => {
      this.supplies = result.data;
    });
  }

  onSubmit() {
    const supplies: Array<Object> = [];
    for (const supply of this.supplies) {
      supplies.push({
        supply_id: supply.id,
        initial_quantity: supply.initial_quantity,
        final_quantity: supply.final_quantity,
      });
    }
    const data = {
      date: this.datePipe.transform(this.date.jsdate, 'yyyy-MM-dd'),
      store_id: this.storeId,
      supplies: supplies,
    };

    if (this.id && !this.hasPermission('MINV')) {
      alert('No tienes permisos para editar inventarios');
      return;
    }

    if (!this.id && !this.hasPermission('AINV')) {
      alert('No tienes permisos para agregar inventarios');
      return;
    }

    const observable = this.id
      ? this.dailyInventoryService.updateInventory(this.id, {
          ...data,
          id_daily_inventory: this.id,
        })
      : this.dailyInventoryService.createInventory(data);
    observable.subscribe(
      result => {
        this.cancel();
      },
      () => {
        alert('Error al guardar inventario');
      },
    );
  }

  cancel() {
    this.router.navigate(['/pages/inventories/daily']);
  }
  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }
}
