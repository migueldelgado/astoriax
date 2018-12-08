import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from '../modal/user-modal.component';
import { UserPasswordModalComponent } from '../modal/user-password-modal.component';
import { UserService } from '../../../@core/data/user.service';
import { RoleService } from '../../../@core/data/role.service';
import { StoreService } from '../../../@core/data/store.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-employees-admin-table',
  templateUrl: './employees.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
      nb-card-body {
        min-height: 400px;
      }
      table {
        line-height: 1.5em;
        border-collapse: collapse;
        border-spacing: 0;
        display: table;
        width: 100%;
        max-width: 100%;
        overflow: auto;
        word-break: normal;
        word-break: keep-all;
      }
      table tr td:first-child {
        width: 25%;
      }
      table tr td {
        width: 15%;
        position: relative;
        padding: 0.875rem 1.25rem;
        border: 1px solid #342e73;
        vertical-align: middle;
      }
      table th {
        position: relative;
        width: 15%;
        padding: 0.875rem 1.25rem;
        border: 1px solid #342e73;
        vertical-align: middle;
        padding: 0.875rem 1.25rem;
        padding-right: 1.75rem;
        font-family: Exo;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.25;
        color: #ffffff;
      }
      table th:first-child {
        width: 25%;
      }
      table .btn-icon {
        padding: 0.25rem 0.5rem !important;
      }
    `,
  ],
})
export class EmployeesComponent implements OnInit {
  users: Array<any> = [];
  stores = [];
  roles = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService,
    private roleService: RoleService,
    private storeService: StoreService,
  ) {}

  ngOnInit() {
    Observable.forkJoin(
      this.userService.getAll(),
      this.roleService.getAll(),
      this.storeService.getAll(true),
    ).subscribe(([users, roles, stores]: any) => {
      this.users = users;
      this.roles = roles;
      this.stores = stores;
    });
  }

  onChangeTo() {}

  onClickEdit(id) {
    const i = this.users.findIndex(user => user.id === id);
    this.userService.findUser(id).subscribe(r => {
      const user = r.data;
      const activeModal = this.modalService.open(UserModalComponent, {
        size: 'lg',
        container: 'nb-layout',
      });
      activeModal.componentInstance.setUser(user, this.roles, this.stores);
      activeModal.result.then(
        result => {
          if (!result) {
            return;
          }
          this.users[i] = result.data;
        },
        () => {},
      );
    });
  }

  onClickAdd() {
    const activeModal = this.modalService.open(UserModalComponent, {
      size: 'lg',
      container: 'nb-layout',
    });
    activeModal.componentInstance.setUser({}, this.roles, this.stores);
    activeModal.result.then(
      result => {
        this.users.push(result.data);
      },
      () => {},
    );
  }

  onClickPassword(id) {
    const activeModal = this.modalService.open(UserPasswordModalComponent, {
      size: 'lg',
      container: 'nb-layout',
    });
    activeModal.componentInstance.setUser(id);
  }

  onClickDelete(id) {
    if (!confirm('Desea eliminar al usuario?')) {
      return;
    }

    this.userService.delete(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }
}
