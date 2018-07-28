import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-providers-modal',
  templateUrl: './stores-modal.component.html',
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
export class StoresModalComponent {

  dateTo = {jsdate: new Date()};
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    monthSelector: true,
    yearSelector: true,
  };

  data = {
    name: '',
    address: '',
    phone: '',
    state: true,
    rut: [],
  };

  ruts = [
    {
      item_id: 1,
      item_text: '99.643.457-6',
    }, {
      item_id: 2,
      item_text: '151774007',
    }, {
      item_id: 3,
      item_text: '761432341',
    }, {
      item_id: 4,
      item_text: '761432456',
    },
  ];

  dropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Seleccionar todos',
    unSelectAllText: 'Desmarcar todos',
    itemsShowLimit: 6,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
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
