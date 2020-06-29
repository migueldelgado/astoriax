import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {SupplierService} from '../../../@core/data/supplier.service';

@Component({
  selector: 'ngx-providers-modal',
  templateUrl: './providers-modal.component.html',
  styles: [`
    ng-multiselect-dropdown {
      width: 100%;
    }
    .multiselect-dropdown {
      width: 100%;
    }
    .multiselect-dropdown span.selected-item {
      margin-bottom: 5px;
    }
  `],
})
export class ProvidersModalComponent {

  private id = null;
  dateTo = {jsdate: new Date()};
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    monthSelector: true,
    yearSelector: true,
  };

  data = {
    rut: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    account: '',
    bank: '',
  };
  constructor(private activeModal: NgbActiveModal, private supplierService: SupplierService) {
  }

  closeModal() {
    this.id = null;
    this.activeModal.close();
  }

  setSupplier(s) {
    this.data = {
      ...this.data,
      ...s,
    };
    this.id = s.id;
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      alert('Todos los campos son requeridos');
      return;
    }

    const action = this.id ? this.supplierService.update({
      ...this.data,
      id: this.id,
    }) : this.supplierService.create(this.data);
    action.subscribe((result: any) => {
      this.activeModal.close({
        data: result,
      });
    }, (error) => {
      alert('Error guardando ');
    });

  }
}
