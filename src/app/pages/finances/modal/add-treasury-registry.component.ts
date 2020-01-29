import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { ClassificationService } from '../../classification/classification.service';
import { TreasuryService } from '../treasury/treasury.service';

@Component({
  selector: 'ngx-add-treasury-registry-modal',
  templateUrl: './add-treasury-registry.component.html',
})
export class AddTreasuryRegistryComponent {

  date = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  classifications = [];
  paymentTypes = [];
  selectedClassification: any;
  selectedTransferType: any;
  selectedPaymentTypes: any;
  reason: any;
  amount: any;
  loading = true;

  constructor(
    private activeModal: NgbActiveModal,
    private classificationService: ClassificationService,
    private treasuryService: TreasuryService,
  ) {
    this.getClassification();
    this.getPaymentTypes();
  }

  getClassification() {
    this.classificationService.getClassifications()
      .subscribe((data: any) => {
        this.classifications = data;
        this.selectedClassification = data[0].name;
        this.loading = false;
      })
  }

  getPaymentTypes() {
    this.classificationService.getPaymentTypes()
      .subscribe((data: any) => {
        this.paymentTypes = data;
        this.selectedPaymentTypes = data[0].name;
        this.loading = false;
      })
  }

  onSave() {
    const data = {
      date: this.date,
      transfer_type: this.selectedTransferType,
      classification: this.selectedClassification,
      reason: this.reason,
      amount: this.amount,
    }

    this.treasuryService.saveTreasuries(data);
  }

  closeModal() {
    this.activeModal.close();
  }

  onChangeTo() {

  }
}
