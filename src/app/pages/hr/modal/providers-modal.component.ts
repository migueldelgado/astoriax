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
    stores: [],
  };

  stores = [
    {
      item_id: 1,
      item_text: 'Astoria CCP',
    }, {
      item_id: 2,
      item_text: 'Astoria MPLA',
    }, {
      item_id: 3,
      item_text: 'Astoria MPTR',
    }, {
      item_id: 4,
      item_text: 'Astoria OESTE',
    }, {
      item_id: 5,
      item_text: 'Astoria MPBB',
    }, {
      item_id: 6,
      item_text: 'Astoria MCCP',
    },
  ];

  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Seleccionar todos',
    unSelectAllText: 'Desmarcar todos',
    itemsShowLimit: 6,
    allowSearchFilter: true,
  };

  constructor(private activeModal: NgbActiveModal, private supplierService: SupplierService) {
  }

  closeModal() {
    this.id = null;
    this.activeModal.close();
  }

  onItemSelect(item: any) {
    // tslint:disable-next-line
    console.log(item);
  }
  onSelectAll (items: any) {
    // tslint:disable-next-line
    console.log(items);
  }

  onChangeTo() {

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
