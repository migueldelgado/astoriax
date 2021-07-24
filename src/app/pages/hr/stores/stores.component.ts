import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';
import { StoreService } from '../../../@core/data/store.service';
import { NbAuthService } from '../../../auth/services';

@Component({
  selector: 'ngx-stores-admin-table',
  templateUrl: './stores.component.html',
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
export class StoresComponent implements OnInit {
  stores: LocalDataSource = new LocalDataSource();
  settings: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private authService: NbAuthService,
  ) {

    this.settings = {
      mode: 'external',
      add: { addButtonContent: '<i class="nb-plus"></i>' },
      edit: { editButtonContent: '<i class="nb-edit"></i>' },
      delete: { deleteButtonContent: '<i class="nb-trash"></i>' },
      actions: {
        columnTitle: '',
        position: 'right',
        add: authService.hasPermission('ALOC'),
        edit: authService.hasPermission('MLOC'),
        delete: authService.hasPermission('ELOC')
      },
      columns: {
        name: { title: 'Nombre', type: 'string' },
        phone: { title: 'Telefono', type: 'string' },
        address: { title: 'Dirección', type: 'string' },
        city: { title: 'Ciudad', type: 'string' }
      }
    };
  }

  ngOnInit() {
    if (!this.authService.hasPermission('LOC')) {
      this.router.navigate(['/pages']);
      return;
    }

    this.loadStores();
  }

  loadStores() {
    this
      .storeService
      .getAll()
      .subscribe(stores => this.stores.load(stores));
  }

  onClickAdd() {
    this.router.navigate(['./new'], {
      relativeTo: this.route,
    });
  }

  onClickEdit(evt) {
    this.router.navigate(
      [`./${evt.data.id}`], 
      { relativeTo: this.route }
    );
  }

  onClickDelete(evt) {
    if (!confirm('Seguro que desea borrar el local?')) {
      return;
    }

    this
      .storeService
      .delete(evt.data.id)
      .subscribe(() => this.loadStores());
  }
}
