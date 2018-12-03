///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../@core/data/role.service';
import { parseErrroMessage } from '../../../@core/utils/error';
import 'rxjs/add/operator/map';

@Component({
  selector: 'ngx-role-form',
  templateUrl: './role-form.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
    `,
  ],
})
export class RoleFormComponent implements OnInit {
  id: string;
  data = {
    permissions: [],
    name: '',
    description: '',
  };
  permissions = [];

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.roleService.getPermissions().subscribe((result: any) => {
      this.permissions = result;
      this.loadRole();
    });
  }

  loadRole() {
    this.route.params.subscribe(params => {
      if (!params.id || params.id.toLowerCase() === 'new') {
        this.preloadRole([]);
        return;
      }
      this.id = params.id;
      this.roleService.findRole(this.id).subscribe(({ data }: any) => {
        this.data = { ...this.data, ...data };
        const { permissions } = data;
        this.preloadRole(permissions);
      });
    });
  }

  preloadRole(permissions = []) {
    this.data.permissions = this.permissions.map(r => {
      const selected = permissions.find(rec => rec.id === r.id);
      return { ...r, selected };
    });
  }

  cancel(e?) {
    if (e) {
      e.preventDefault();
    }
    this.router.navigate(['/pages/hr/roles']);
  }

  onSubmit() {
    const data = {
      name: this.data.name,
      description: this.data.description,
      permissions: [],
    };

    data.permissions = this.data.permissions
      .filter(s => s.selected)
      .map(s => ({
        permission_id: s.id,
      }));

    if (this.id) {
      this.update(data);
    } else {
      this.save(data);
    }
  }

  save(data) {
    this.roleService.createRole(data).subscribe(
      result => {
        this.cancel();
      },
      error => {
        alert(parseErrroMessage(error));
      },
    );
  }

  update(data) {
    this.roleService.updateRole(this.id, data).subscribe(
      result => {
        this.cancel();
      },
      error => {
        alert(parseErrroMessage(error));
      },
    );
  }
}
