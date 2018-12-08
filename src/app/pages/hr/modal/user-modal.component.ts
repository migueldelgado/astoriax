import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../@core/data/user.service';

@Component({
  selector: 'ngx-user-modal',
  templateUrl: './user-modal.component.html',
  styles: [
    `
      ng-multiselect-dropdown {
        width: 100%;
      }

      .multiselect-dropdown {
        width: 100%;
      }

      .multiselect-dropdown span.selected-item {
        margin-bottom: 5px;
      }
    `,
  ],
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

  stores = [];

  roles = [];

  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Seleccionar todos',
    unSelectAllText: 'Desmarcar todos',
    itemsShowLimit: 6,
    allowSearchFilter: true,
  };

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
  ) {}

  closeModal() {
    this.activeModal.close();
  }

  onItemSelect(item: any) {}

  onSelectAll(items: any) {}

  onChangeTo() {}

  setUser(user, roles, stores) {
    this.data = {
      ...user,
    };

    this.data.roles =
      user && user.roles
        ? user.roles.map(r => ({
            item_id: r.id,
            item_text: r.name,
          }))
        : [];
    this.data.stores =
      user && user.stores
        ? user.stores.map(r => ({
            item_id: r.id,
            item_text: r.name,
          }))
        : null;
    this.roles = roles.map(r => ({
      item_id: r.id,
      item_text: r.name,
    }));

    this.stores = stores.map(r => ({
      item_id: r.id,
      item_text: r.name,
    }));
    this.id = user.id;
  }

  onClickGeneratePassword() {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

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

    const data: any = {
      ...this.data,
      roles: [],
      stores: [],
      ...(this.password ? { password: this.password } : {}),
    };
    data.roles = this.data.roles.map(r => ({
      role_id: r.item_id,
    }));

    data.stores = this.data.stores.map(r => {
      return { store_id: r.item_id };
    });

    const action = this.id
      ? this.userService.update({
          ...data,
          id: this.id,
        })
      : this.userService.create({ ...data });
    action.subscribe(
      (result: any) => {
        this.activeModal.close({
          data,
        });
      },
      error => {
        alert('Error guardando ');
      },
    );
  }
}
