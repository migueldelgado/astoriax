import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SupplyService} from '../../../@core/data/supply.service';
import {ActivatedRoute, Router} from '@angular/router';

function sortByNumber(direction: number, a: string, b: string) {
  const numberA = parseInt(a, 10);
  const numberB = parseInt(b, 10);
  if (direction > 0) {
    return numberA - numberB;
  }
  return numberB - numberA;
}

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
    actions: {
      columnTitle: 'Acciones',
      position: 'right',
    },
    mode: 'external',
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
        compareFunction: sortByNumber,
      },
      stock_min: {
        title: 'Stock Minimo',
        type: 'number',
        compareFunction: sortByNumber,
      },
    },
  };


  source: LocalDataSource = new LocalDataSource();


  constructor(private suppliesService: SupplyService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.suppliesService.getAll()
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

  onDelete(event): void {
    this.suppliesService.deleteSupply(event.data.id_supply)
      .subscribe((result: any) => {
        this.source.remove(event.data);
      }, error => {
        const errorMessage = JSON.parse(error._body);
        alert(errorMessage.message);
      })
  }

  onCreate(el): void {
    this.router.navigate([`../supplies/new`], { relativeTo: this.route });
  }

  onEdit(el): void {
    this.router.navigate([`../supplies/edit/${el.data.id_supply}`], { relativeTo: this.route });
  }
}
