import { Component, OnInit } from '@angular/core';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import { Http } from '@angular/http';

import { ProductsService } from '../products.service';

@Component({
  selector: 'ngx-supplies-table',
  templateUrl: './supplies-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SuppliesTableComponent implements OnInit {

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


  source: LocalDataSource = new LocalDataSource();


  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsService.getAll()
      .subscribe((products: any) => {
        this.source.load(products);
      })
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
