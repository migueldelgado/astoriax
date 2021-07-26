///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';
import { AuditsService } from '../audits.service';
import { NbAuthService } from '../../../auth/services';

@Component({
  selector: 'ngx-audit-table',
  templateUrl: './audit-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    nb-card-body {
      min-height: 300px;
    }
  `],
})
export class AuditTableComponent implements OnInit {

  settings;
  source: LocalDataSource = new LocalDataSource();
  loading = true;

  constructor(
    private auditService: AuditsService,
    private route: ActivatedRoute,
    private authService: NbAuthService,
    private router: Router
  ) {
    this.settings = {
      mode: 'external',
      add: { addButtonContent: '<i class="nb-plus"></i>' },
      edit: { editButtonContent: '<i class="nb-search"></i>' },
      delete: { deleteButtonContent: '<i class="nb-edit"></i>' },
      actions: {
        columnTitle: '',
        position: 'right',
        add: authService.hasPermission('AAUD'),
        edit: authService.hasPermission('EAUD'),
        delete: authService.hasPermission('MAUD') //TODO: change permission to look instead of delete
      },
      columns: {
        audit_type: { title: 'Tipo', type: 'string' },
        store: { title: 'Tienda', type: 'string' },
        manager: { title: 'Jefe de local', type: 'string' },
        date: { title: 'Fecha', type: 'date' }
      },
    };
  }

  ngOnInit() {
    this.auditService.getAuditsByCurrentStore()
      .subscribe((audits: any) => {
        this.source.load(audits);
        this.loading = false;
      })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreate(event): void {
    this.router.navigate(['../auditAdd'], { relativeTo: this.route });
  }

  onView(event): void {
    this.router.navigate([`../audit/${event.data.id}`], { relativeTo: this.route });
  }

  onEdit(event): void {
    this.router.navigate([`../audit/${event.data.id}/edit`], { relativeTo: this.route });
  }
}
