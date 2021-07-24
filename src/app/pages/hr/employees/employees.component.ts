import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';

import { NbAuthService } from '../../../auth/services';
import { UserService } from '../../../@core/data/user.service';

@Component({
  selector: 'ngx-employees-admin-table',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  users: Array<any> = [];
  settings: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: NbAuthService,
  ) {}

  ngOnInit() {
    if (!this.hasPermission('EMP')) {
      this.router.navigate(['/pages']);
      return;
    }

    this.settings = {
      mode: 'external',
      add: { addButtonContent: '<i class="nb-plus"></i>' },
      edit: { editButtonContent: '<i class="nb-edit"></i>' },
      delete: { deleteButtonContent: '<i class="nb-trash"></i>' },
      actions: {
        columnTitle: '',
        position: 'right',
        add: this.hasPermission('AEMP'),
        edit: this.hasPermission('MEMP'),
        delete: this.hasPermission('EEMP')
      },
      columns: {
        first_name: { title: 'Nombre', type: 'text' },
        rut: { title: 'RUT', type: 'text' },
        phone: { title: 'Telefono', type: 'text' },
        address: { title: 'Direccion', type: 'text' }
      },
    };

    this.loadUsers()
  }

  loadUsers() {
    const currentStoreId =
      !this.userService.isCurrentUserAdmin() ?
        this.authService.getCurrentStore() : '';

    this.userService.getAll(currentStoreId)
      .subscribe((users: any) => {
        this.users = users;
        this.source.load(this.users);
      });
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }

  onClickEdit(evt: any) {
    if (!this.hasPermission('MEMP')) {
      alert('No tienes permiso para modificar empleados');
      return;
    }
    this.router.navigate([`/pages/hr/employees/${evt.data.id}`]);
  }

  onClickAdd() {
    if (!this.hasPermission('AEMP')) {
      alert('No tienes permiso para agregar empleados');
      return;
    }

    this.router.navigate(['/pages/hr/employees/new']);
  }

  onClickDelete(evt) {
    if (!window.confirm('Seguro que desea borrar usuario?')) {
      return ;
    }

    this.userService
      .delete(evt.data.id)
      .subscribe(
        () => this.loadUsers(),
        () => alert('Hubo un problema al borrar proveedor')
      );
  }

}
