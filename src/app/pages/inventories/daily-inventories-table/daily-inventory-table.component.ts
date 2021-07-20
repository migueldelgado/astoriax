import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyInventoryService } from '../../../@core/data/daily-inventory.service';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';
import { StoreService } from '../../../@core/data/store.service';
import { Observable } from 'rxjs/Observable';
import { NbAuthService } from '../../../auth/services';

@Component({
  selector: 'ngx-supplies-table',
  templateUrl: './daily-inventory-table.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }

      nb-card-body {
        min-height: 400px;
      }
    `,
  ],
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

  dateFrom = { jsdate: new Date(Date.now() - 604800000) };
  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  source: LocalDataSource = new LocalDataSource();
  firstLoad = false;

  constructor(
    private dailyInventoryService: DailyInventoryService,
    private storeService: StoreService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    if (!this.hasPermission('INV')) {
      this.router.navigate(['/pages']);
      return;
    }

    this.settings.actions = {
      ...this.settings.actions,
      add: this.hasPermission('AINV'),
      edit: this.hasPermission('MINV'),
      delete: this.hasPermission('EINV'),
    };
    this.fetch(this.dateFrom.jsdate, this.dateTo.jsdate);
  }

  onChangeFrom(date) {
    if (!this.firstLoad) {
      return;
    }
    this.fetch(date.jsdate, this.dateTo.jsdate);
  }

  onChangeTo(date) {
    if (!this.firstLoad) {
      return;
    }
    this.fetch(this.dateFrom.jsdate, date.jsdate);
  }

  fetch(dateFrom, dateTo) {
    const from: string = this.datePipe.transform(dateFrom, 'yyyy-MM-dd');
    const to: string = this.datePipe.transform(dateTo, 'yyyy-MM-dd');
    Observable.forkJoin(
      this.dailyInventoryService.getAll(from, to),
      this.storeService.getAll(),
    ).subscribe(
      (result: Array<any>) => {
        const [dInv, stores] = result;
        const inventories = dInv.data;
        inventories.forEach(i => {
          const store = stores.find(s => s.id === i.store_id) || {};
          i.store = store.name;
        });
        this.source.load(inventories);
        this.firstLoad = true;
      },
      error => {
        this.source.load([]);
        this.firstLoad = true;
      },
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDelete(event): void {
    if (!this.hasPermission('EINV')) {
      alert('No tiene permisos para eliminar inventario')
      return;
    }

    if (!window.confirm('Desea borrar inventario?')) {
      return ;
    }

    this.dailyInventoryService
      .deleteInventory(event.data.id)
      .subscribe(
        () => this.source.remove(event.data),
        error => {
          const errorMessage = JSON.parse(error._body);
          alert(errorMessage.message);
        },
      );
  }

  onCreate(el): void {
    if (!this.hasPermission('AINV')) {
      alert('No tiene permisos para agregar inventario')
      return;
    }
    this.router.navigate([`../daily/new`], { relativeTo: this.route });
  }

  onEdit(evt): void {
    if (!this.hasPermission('MINV')) {
      alert('No tiene permisos para agregar inventario')
      return;
    }
    this.router.navigate([`../daily/edit/${evt.data.id}`], {
      relativeTo: this.route,
    });
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }
}
