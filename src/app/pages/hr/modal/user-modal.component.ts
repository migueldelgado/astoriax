import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-user-modal',
  templateUrl: './user-modal.component.html',
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
export class UserModalComponent {

  dateTo = {jsdate: new Date()};
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    monthSelector: true,
    yearSelector: true,
  };

  data = {
    rut: '',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    phone: '',
    roles: [],
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

  roles = [
    {
      item_id: 1,
      item_text: 'Nivel Gerencial',
    }, {
      item_id: 2,
      item_text: 'Nivel Sub-gerencial',
    }, {
      item_id: 3,
      item_text: 'Nivel operacional',
    }, {
      item_id: 4,
      item_text: 'Nivel Jefatura',
    }, {
      item_id: 5,
      item_text: 'Nivel Maestro',
    }, {
      item_id: 6,
      item_text: 'Nivel Funcionario',
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

  setUser(user) {
    this.data = {
      ...user,
    }
  }
}
