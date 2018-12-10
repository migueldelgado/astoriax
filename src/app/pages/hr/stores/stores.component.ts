import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoresModalComponent } from '../modal/stores-modal.component';
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

      table {
        line-height: 1.5em;
        border-collapse: collapse;
        border-spacing: 0;
        display: table;
        width: 100%;
        max-width: 100%;
        overflow: auto;
        word-break: normal;
        word-break: keep-all;
      }

      table tr td:first-child {
        width: 25%;
      }

      table tr td {
        width: 15%;
        position: relative;
        padding: 0.875rem 1.25rem;
        border: 1px solid #342e73;
        vertical-align: middle;
      }

      table th {
        position: relative;
        width: 15%;
        padding: 0.875rem 1.25rem;
        border: 1px solid #342e73;
        vertical-align: middle;
        padding: 0.875rem 1.25rem;
        padding-right: 1.75rem;
        font-family: Exo;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.25;
        color: #ffffff;
      }

      table th:first-child {
        width: 25%;
      }

      table .btn-icon {
        padding: 0.25rem 0.5rem !important;
      }
    `,
  ],
})
export class StoresComponent implements OnInit {
  stores: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private storeService: StoreService,
    private authService: NbAuthService,
  ) {}

  ngOnInit() {
    if (!this.hasPermission('LOC')) {
      this.router.navigate(['/pages']);
      return;
    }
    this.storeService.getAll(true).subscribe(stores => {
      this.stores = stores;
    });
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }

  onChangeTo() {}

  onClickPlus(id) {
    this.router.navigate([`/pages/hr/stores/${id}`]);
  }

  onClickCreate() {
    this.router.navigate([`/pages/hr/stores/new`]);
  }

  onClickDelete(id) {
    if (!confirm('Desea Borrar el local?')) {
      return;
    }

    this.storeService.delete(id).subscribe(() => {
      this.stores = this.stores.filter(s => s.id !== id);
    });
  }

  //
  // onClickView() {
  //   const activeModal = this.modalService.open(AddInvoiceProviderComponent, { size: 'lg', container: 'nb-layout' });
  //
  //   activeModal.componentInstance.modalHeader = 'Detalle del proveedor';
  //
  // }
}
