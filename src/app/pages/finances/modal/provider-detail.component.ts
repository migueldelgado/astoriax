import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-provider-detail-modal',
  templateUrl: './provider-detail.component.html',
  styles: [`
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
export class ProviderDetailComponent {

  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    monthSelector: true,
    yearSelector: true,
  };

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }

  onChangeTo() {

  }
}
