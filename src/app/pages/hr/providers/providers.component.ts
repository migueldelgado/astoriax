import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';

import { SupplierService } from '../../../@core/data/supplier.service';
import { NbAuthService } from '../../../auth/services';


@Component({
  selector: 'ngx-providers-admin-table',
  templateUrl: './providers.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }

    nb-card-body {
      min-height: 400px;
    }
  `],
})
export class ProvidersComponent implements OnInit {
  settings: any;
  suppliers: LocalDataSource = new LocalDataSource();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: NbAuthService,
    private supplierService: SupplierService,
  ) {
    this.settings = {
      mode: 'external',
      add: { addButtonContent: '<i class="nb-plus"></i>' },
      edit: { editButtonContent: '<i class="nb-edit"></i>' },
      delete: { deleteButtonContent: '<i class="nb-trash"></i>' },
      actions: {
        columnTitle: '',
        position: 'right',
        add: authService.hasPermission('APRO'),
        edit: authService.hasPermission('MPRO'),
        delete: authService.hasPermission('EPRO')
      },
      columns: {
        name: { title: 'Nombre', type: 'string' },
        rut: { title: 'Rut', type: 'string' },
        phone: { title: 'Telefono', type: 'string' },
        email: { title: 'Email', type: 'string' }
      }
    };
  }

  ngOnInit() {
    if (!this.authService.hasPermission('PRO')) {
      this.router.navigate(['/pages']);
      return;
    }

    this.loadSuppliers();
  }

  loadSuppliers() {
    this
      .supplierService
      .getAll()
      .subscribe(suppliers => this.suppliers.load(suppliers));
  }

  onClickAdd() {
    this.router.navigate(
      ['./new'],
      { relativeTo: this.route }
    );
  }

  onClickEdit(evt) {
    this.router.navigate([`./${evt.data.id}`], {
      relativeTo: this.route,
    });
  }

  onClickDelete(evt) {
    if (!window.confirm('Seguro que desea borrar proveedor?')) {
      return ;
    }

    this.supplierService
      .delete(evt.data.id)
      .subscribe(
        () => this.loadSuppliers(),
        () => alert('Hubo un problema al borrar proveedor')
      );
  }
}
