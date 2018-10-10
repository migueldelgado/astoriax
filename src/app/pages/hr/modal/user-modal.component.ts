import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../@core/data/user.service';

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

  id = null;

  password = '';
  data = {
    rut: '',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
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

  constructor(private activeModal: NgbActiveModal, private userService: UserService) {
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

  setUser(user) {
    this.data = {
      ...user,
    };

    this.id = user.id;
  }

  onClickGeneratePassword() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.password = text;
  }

  save(form: NgForm) {
    if (form.invalid) {
      alert('Todos los campos son requeridos');
      return;
    }
    const action = this.id ? this.userService.update({
      ...this.data,
      id: this.id,
    }) : this.userService.create({...this.data, password: this.password});
    action.subscribe((result: any) => {
      this.activeModal.close({
        data: result,
      });
    }, (error) => {
      alert('Error guardando ');
    });
  }
}
