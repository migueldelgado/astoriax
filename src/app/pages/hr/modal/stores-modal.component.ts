import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {StoreService} from '../../../@core/data/store.service';

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

  id: null;
  data = {
    name: '',
    address: '',
    phone: '',
    city: '',
    rut: [],
  };

  private creating = false;

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
    limitSelection: 1,
  };

  constructor(private activeModal: NgbActiveModal, private storeService: StoreService) {
  }

  closeModal() {
    this.activeModal.close();
  }

  onItemSelect(item: any) {
    // tslint:disable-next-line
    console.log(item);
  }

  onSelectAll(items: any) {
    // tslint:disable-next-line
    console.log(items);
  }

  onChangeTo() {

  }

  setStore(store) {
    this.data = {
      name: store.name,
      address: store.address,
      phone: store.phone,
      city: store.city,
      rut: null,
    };
    this.id = store.id;
  }

  save(form) {
    if (form.invalid) {
      alert('Todos los campos son requeridos');
      return;
    }
    const action = this.id ? this.storeService.update({
      ...this.data,
      id: this.id,
    }) : this.storeService.create(this.data);
    action.subscribe((result: any) => {
      this.activeModal.close({
        creating: !this.id,
        data: result.data,
      });
    }, (error) => {
      alert('Error guardando ');
    });
  }
}
