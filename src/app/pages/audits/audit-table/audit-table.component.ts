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
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    actions: {
      delete: false,
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
      created_at: {
        title: 'Fecha',
        type: 'date',
      },
    },
  };


  source: LocalDataSource = new LocalDataSource();


  constructor(private auditService: AuditsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.auditService.getAll()
      .subscribe((audits: any) => {
        this.source.load(audits);
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

  onEdit(event): void {
    this.router.navigate([`../audit/${event.data.id}`], { relativeTo: this.route });
  }

  onDelete(event): void {
    // console.log(event);
  }
}
