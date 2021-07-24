import { Component } from '@angular/core';
import { UserService } from 'app/@core/data/user.service';
import { NgForm } from '@angular/forms';
import { RoleService } from 'app/@core/data/role.service';
import { StoreService } from 'app/@core/data/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
    isEdit:boolean;
    id = null;

    data = {
      id: null,
      rut: '',
      first_name: '',
      last_name: '',
      address: '',
      city: '',
      phone: '',
      email: '',
      audit_created_email: 0,
      password: '',
      roles: [],
      stores: []
    };
  
    password = '';
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
      private router: Router,
      private route: ActivatedRoute,
      private userService: UserService,
      private roleService: RoleService,
      private storeService: StoreService
    ) {}

    ngOnInit() {
      Observable.forkJoin(
        this.roleService.getAll(),
        this.storeService.getAll()
      ).subscribe((result: any) => {
        this.roles = result[0];
        this.stores = result[1];

        this
          .route
          .params
          .subscribe(params => {
            this.id = params.id;
            if (this.id) this.loadUser();
          });
      });
    }

    loadUser() {
      this.isEdit = true;
      this.userService.findUser(this.id)
        .subscribe(user => {
          this.data = {
            id: user.data.id,
            rut: user.data.rut,
            first_name: user.data.first_name,
            last_name: user.data.last_name,
            address: user.data.address,
            city: user.data.city,
            phone: user.data.phone,
            email: user.data.email,
            password: user.data.password,
            audit_created_email: user.data.audit_created_email,
            roles: user.data.roles,
            stores: user.data.stores
          };
        });
    }
  
    onCancel() {
        this.router.navigate(['/pages/hr/employees']);
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

    getValue(objId, type) {
        if (this.isEdit) {
            let result = this.data[type] ? !!this.data[type].find(x => x.id === objId) : false;
            return result;
        }
    }

    toggle(evt, objId, type) {
        if (evt.target.checked) {
            let obj = this[type].find(x => x.id === objId);
            this.data[type].push(obj);
        } else {
            this.data[type] = this.data[type].filter(x => x.id !== objId);
        }
    }
  
    save(form: NgForm) {
        if (form.invalid) {
            alert('Todos los campos son requeridos');
            return;
        }

        let params = {
            id: this.data.id,
            rut: this.data.rut,
            first_name: this.data.first_name,
            last_name: this.data.last_name,
            address: this.data.address,
            city: this.data.city,
            phone: this.data.phone,
            email: this.data.email,
            audit_created_email: this.data.audit_created_email,
            roles: [],
            stores: []
        };

        if (form.value.password) params['password'] = form.value.password;

        this.data.roles.forEach(role => params.roles.push({ role_id: role.id }));
        this.data.stores.forEach(store => params.stores.push({ store_id: store.id }));
  
        const action = this.isEdit
            ? this.userService.update(params)
            : this.userService.create(params);
        action.subscribe(
            () => this.onCancel(),
            () => alert('Error guardando ')
        );

    }

}