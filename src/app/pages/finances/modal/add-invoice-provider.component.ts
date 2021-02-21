import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-modal',
  templateUrl: './add-invoice-provider.component.html',
})
export class AddInvoiceProviderComponent {

  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }

  onChangeTo() {

  }
}
