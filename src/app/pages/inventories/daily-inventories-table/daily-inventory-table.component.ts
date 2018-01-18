import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SupplyService} from '../../../@core/data/supply.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DailyInventoryService} from '../../../@core/data/daily-inventory.service';
import {IMyDpOptions} from 'angular4-datepicker/src/my-date-picker/interfaces/my-options.interface';
import {AppConfig} from '../../../app.config';

@Component({
  selector: 'ngx-supplies-table',
  templateUrl: './daily-inventory-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class DailyInventoryTableComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: 'Acciones',
      position: 'right',
    },
    mode: 'external',
    columns: {
      date: {
        title: 'Fecha',
        type: 'string',
      },
      store: {
        title: 'Local',
        type: 'string',
      },
    },
  };

  dateFrom = { jsdate: new Date() };
  dateTo = { jsdate: new Date() };
  options: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  source: LocalDataSource = new LocalDataSource();
  firstLoad = false;

  constructor(
    private dailyInventoryService: DailyInventoryService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.fetch(new Date(), new Date());
  }

  onChangeFrom(date) {
    if (!this.firstLoad) {
      return;
    }
    console.log(date)
    this.fetch(date.jsdate, this.dateTo.jsdate);
  }

  onChangeTo(date) {
    console.log(this.firstLoad);
    if (!this.firstLoad) {
      return;
    }
    console.log(date)
    this.fetch(this.dateFrom.jsdate, date.jsdate);
  }

  fetch(dateFrom, dateTo) {
    const from = dateFrom.toJSON();
    const to = dateTo.toJSON();

    this.dailyInventoryService.getAll({ currentStore: AppConfig.APP_CURRENT_STORE, dateFrom: from, dateTo: to })
      .subscribe((dailyInventories: any) => {
        this.source.load(dailyInventories);
        this.firstLoad = true;
      }, () => {
        this.source.load([])
        this.firstLoad = true;
      })
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDelete(event): void {
    this.dailyInventoryService.deleteInventory(event.data.id_daily_inventory)
      .subscribe((result: any) => {
        this.source.remove(event.data);
      }, error => {
        const errorMessage = JSON.parse(error._body);
        alert(errorMessage.message);
      })
  }

  onCreate(el): void {
    this.router.navigate([`../daily/new`], { relativeTo: this.route });
  }

  onEdit(el): void {
    this.router.navigate([`../daily/edit/${el.data.id_daily_inventory}`], { relativeTo: this.route });
  }
}
