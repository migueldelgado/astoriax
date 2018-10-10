import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProvidersModalComponent} from '../modal/providers-modal.component';
import {SupplierService} from '../../../@core/data/supplier.service';


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
  `],
})
export class ProvidersComponent implements OnInit {

  suppliers: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private supplierService: SupplierService,
  ) {
  }

  ngOnInit() {
    this.supplierService.getAll(true)
      .subscribe((suppliers) => {
        this.suppliers = suppliers;
      })
  }

  onChangeTo() {

  }

  onClickEdit(supplier) {
    const i = this.suppliers.findIndex(s => s.id === supplier.id);
    const activeModal = this.modalService.open(ProvidersModalComponent, {size: 'lg', container: 'nb-layout'});
    activeModal.componentInstance.setSupplier(supplier);
    activeModal.result.then((result) => {
      if (!result) {
        return;
      }
      this.suppliers[i] = {...result.data}
    })
  }

  onClickAdd() {
    const activeModal = this.modalService.open(ProvidersModalComponent, {size: 'lg', container: 'nb-layout'});
    activeModal.componentInstance.setSupplier({});
    activeModal.result.then((result) => {
      if (!result) {
        return;
      }
      this.suppliers.push(result.data);
    })
  }

}
