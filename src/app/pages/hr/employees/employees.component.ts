import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/data/user.service';
import { NbAuthService } from '../../../auth/services';

@Component({
  selector: 'ngx-employees-admin-table',
  templateUrl: './employees.component.html',
  styleUrls: [ './employees.component.scss' ],
})
export class EmployeesComponent implements OnInit {
  users: Array<any> = [];

  source: LocalDataSource = new LocalDataSource();
  settings = {
    mode: 'external',
    add: { addButtonContent: '<i class="nb-plus"></i>' },
    edit: { editButtonContent: '<i class="nb-edit"></i>' },
    actions: {
      columnTitle: '',
      position: 'right',
      delete: false,
      edit: true,
      add: true,
    },
    columns: {
      first_name: { title: 'Nombre', type: 'text' },
      rut: { title: 'RUT', type: 'text' },
      phone: { title: 'Telefono', type: 'text' },
      address: { title: 'Direccion', type: 'text' }
    },
  };

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

    this.userService.getAll()
      .subscribe((users: any) => {
        this.users = users;
        this.source.load(users);
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

}
