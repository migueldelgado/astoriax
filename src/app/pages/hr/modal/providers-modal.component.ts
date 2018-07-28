import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

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
    state: true,
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

  constructor(private activeModal: NgbActiveModal) {
  }

  closeModal() {
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
}
