import { Component } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { Http } from '@angular/http';

import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'supplies-table',
  templateUrl: './supplies-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SuppliesTableComponent {

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
    columns: {
      name: {
        title: 'Nombre',
        type: 'string',
      },
      classification: {
        title: 'Clasificación',
        type: 'string',
      },
      type: {
        title: 'Tipo',
        type: 'string',
      },
      price: {
        title: 'Precio',
        type: 'integer',
      },
      stock_min: {
        title: 'Stock Minimo',
        type: 'number',
      },
    },
  };


  source: ServerDataSource;

  constructor(http: Http) {
    // const data = this.service.getData();
    this.source = new ServerDataSource(http, { endPoint: 'http://localhost:4200/assets/fake-api/insumos.json', dataKey: 'data' });

    // this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
