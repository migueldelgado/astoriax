///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {AuditsService} from '../audits.service';
import {ActivatedRoute, Router} from '@angular/router';

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

  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-search"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-edit"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    actions: {
      columnTitle: 'Acciones',
      position: 'right',
    },
    columns: {
      audit_type: {
        title: 'Tipo',
        type: 'string',
      },
      store: {
        title: 'Tienda',
        type: 'string',
      },
      manager: {
        title: 'Jefe de local',
        type: 'string',
      },
      date: {
        title: 'Fecha',
        type: 'date',
      },
    },
  };


  source: LocalDataSource = new LocalDataSource();
  loading = true;

  constructor(private auditService: AuditsService, private route: ActivatedRoute, private router: Router) {
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
