import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SupplyService } from '../../../@core/data/supply.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService } from '../../../auth/services';
import { HasPermissionInterface } from '../../../has-permission.interface';

@Component({
  selector: 'ngx-supplies-table',
  templateUrl: './supplies-table.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
    `,
  ],
})

export class SuppliesTableComponent implements OnInit, HasPermissionInterface {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      // createButtonContent: '<i class="nb-checkmark"></i>',
      // cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      // saveButtonContent: '<i class="nb-checkmark"></i>',
      // cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: 'Acciones',
      position: 'right',
      delete: true,
      edit: true,
      add: true,
    },
    mode: 'external',
    columns: {
      name: {
        title: 'Nombre',
        type: 'text',
      },
      classification: {
        title: 'Clasificación',
        type: 'text',
      },
      type: {
        title: 'Tipo',
        type: 'text',
      },
      price: {
        title: 'Precio',
        type: 'text',
        compareFunction: sortByNumber,
      },
      stock_min: {
        title: 'Stock Minimo',
        type: 'text',
        compareFunction: sortByNumber,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private suppliesService: SupplyService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: NbAuthService,
  ) {}

  ngOnInit() {
    if (!this.hasPermission('INS')) {
      this.router.navigate(['/pages']);
      return;
    }

    this.settings.actions = {
      ...this.settings.actions,
      add: this.hasPermission('AINS'),
      edit: this.hasPermission('MINS'),
      delete: this.hasPermission('EINS'),
    };

    this.suppliesService.getAll().subscribe(({ data }: any) => {
      this.source.load(data);
    });
  }

  onDelete(event): void {
    if (!window.confirm('Desea eliminar insumo?')) {
      return;
    }

    this.suppliesService.deleteSupply(event.data.id).subscribe(
      (result: any) => {
        this.source.remove(event.data);
      },
      error => {
        let errorMessage = { message: 'Error al eliminar' };
        try {
          if (error && error.error) {
            errorMessage = error.error;
          } else {
            errorMessage = JSON.parse(error._body);
          }
        } catch (e) {}

        alert(errorMessage.message);
      },
    );
  }

  onCreate(el): void {
    this.router.navigate([`../supplies/new`], { relativeTo: this.route });
  }

  onEdit(el): void {
    this.router.navigate([`../supplies/edit/${el.data.id}`], {
      relativeTo: this.route,
    });
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }
}

function sortByNumber(direction: number, a: string, b: string) {
  const numberA = parseInt(a, 10);
  const numberB = parseInt(b, 10);
  if (direction > 0) {
    return numberA - numberB;
  }
  return numberB - numberA;
}