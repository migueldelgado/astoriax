import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddInvoiceProviderComponent} from '../modal/add-invoice-provider.component';
import {ProviderDetailComponent} from '../modal/provider-detail.component';


@Component({
  selector: 'ngx-providers-table',
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
    total-table td, tfoot td {
      background-color: #342e73;
      border: 1px solid #342e73;
    }
    total-table td:first-child, tfoot td:first-child {
      background-color: #231f4e;
    }
    table .btn-icon {
      padding: 0.25rem 0.5rem !important;
    }
    .pdf-container {
      display: flex;
      justify-content: flex-end;
      padding: 0 0 1rem;
    }
  `],
})
export class ProvidersComponent implements OnInit {

  dateFrom = {jsdate: new Date()};
  dateTo = {jsdate: new Date()};
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  source: LocalDataSource = new LocalDataSource();
  store: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {

  }

  onChangeTo() {

  }

  onClickPlus() {
    const activeModal = this.modalService.open(AddInvoiceProviderComponent, {size: 'lg', container: 'nb-layout'});
  }

  onClickView() {
    const activeModal = this.modalService.open(ProviderDetailComponent, {
      size: 'lg',
      container: 'nb-layout',
      windowClass: 'modal-xxl',
    });
  }

}
