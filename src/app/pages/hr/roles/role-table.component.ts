import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../@core/data/role.service';
import { NbAuthService } from '../../../auth/services';

@Component({
  selector: 'ngx-role-admin-table',
  templateUrl: './role-table.component.html',
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

      table tr td {
        position: relative;
        padding: 0.875rem 1.25rem;
        border: 1px solid #342e73;
        vertical-align: middle;
      }

      table th {
        position: relative;
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

      table .btn-icon {
        padding: 0.25rem 0.5rem !important;
      }
    `,
  ],
})
export class RoleTableComponent implements OnInit {
  roles: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private authService: NbAuthService,
  ) {}

  ngOnInit() {
    if (!this.hasPermission('ROL')) {
      this.router.navigate(['/pages']);
      return;
    }
    this.roleService.getAll().subscribe(roles => {
      this.roles = roles;
    });
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }

  onClickPlus(id) {
    this.router.navigate([`/pages/hr/roles/${id}`]);
  }

  onClickCreate() {
    this.router.navigate([`/pages/hr/roles/new`]);
  }

  onClickDelete(id): void {
    if (!window.confirm('Desea eliminar rol?')) {
      return;
    }

    this.roleService.deleteRole(id).subscribe(
      (result: any) => {
        this.roles = this.roles.filter(r => r.id !== id);
      },
      error => {
        let errorMessage = { message: 'Error al eliminar' };
        try {
          if (error && error.error) {
            errorMessage = error.error;
          } else {
            errorMessage = JSON.parse(error._body);
          }
        } catch (e) {}

        alert(errorMessage.message);
      },
    );
  }
}
