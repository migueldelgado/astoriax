import {Component, OnInit} from '@angular/core';
import {SupplyService} from '../../../@core/data/supply.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConfig} from '../../../app.config';
import {IMyDpOptions} from 'angular4-datepicker/src/my-date-picker/interfaces/my-options.interface';
import {DailyInventoryService} from '../../../@core/data/daily-inventory.service';


@Component({
  selector: 'ngx-inventory-form',
  templateUrl: './daily-inventory-form.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class DailyInventoryFormComponent implements OnInit {
  id: number;
  idStore;
  supplies: Array<any> = [];
  options: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  date = {
    jsdate: new Date(),
  };

  constructor(private supplyService: SupplyService,
              private dailyInventoryService: DailyInventoryService,
              private route: ActivatedRoute,
              private router: Router) {
    this.idStore = AppConfig.APP_CURRENT_STORE;
  }

  ngOnInit() {
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
    this.dailyInventoryService.findInventory(id, AppConfig.APP_CURRENT_STORE)
      .subscribe(result => {
        const { data } = result;
        const [day, month, year] = data.date.split('/');

        this.date.jsdate = new Date(year, parseInt(month, 10) - 1, day);
        this.supplies = data.supplies.map(s => ({
          id_supply: s.supply.id_supply,
          name: s.supply.name,
          initial_quantity: s.initial_quantity,
          final_quantity: s.final_quantity,
        }));
      })
  }

  loadSupplies() {
    this.supplyService.getAll({id_store: AppConfig.APP_CURRENT_STORE, show_daily_inventory: true})
      .subscribe((result) => {
        this.supplies = result.map((s) => ({
          id_supply: s.id_supply,
          name: s.name,
          initial_quantity: 0,
          final_quantity: 0,
        }));
      });
  }

  onSubmit() {
    const data = {
      date: this.date.jsdate,
      id_store: this.idStore,
      supplies: this.supplies.map((s) => ({
        id_supply: s.id_supply,
        initial_quantity: s.initial_quantity,
        final_quantity: s.final_quantity,
      })),
    };
    const observable = this.id ?
      this.dailyInventoryService.updateInventory(this.id, {
        ...data,
        id_daily_inventory: this.id,
      }) :
      this.dailyInventoryService.createInventory(data);
    observable
      .subscribe((result) => {
        this.cancel();
      }, () => {
        alert('Error al guardar inventario');
      });
  }

  cancel() {
    this.router.navigate(['/pages/inventories/daily'])
  }
}
