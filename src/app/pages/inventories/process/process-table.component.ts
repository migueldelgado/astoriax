import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';
import { NbAuthService } from '../../../auth/services';
import { parseErrroMessage } from '../../../@core/utils/error';
import { ProcessService } from '../../../@core/data/process.service';

@Component({
  selector: 'ngx-process-table',
  templateUrl: './process-table.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }

      nb-card-body {
        min-height: 400px;
      }
    `,
  ],
})
export class ProcessTableComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: 'Acciones',
      position: 'right',
    },
    mode: 'external',
    columns: {
      id: {
        title: 'ID',
        type: 'string',
      },
      date: {
        title: 'Fecha',
        type: 'string',
      },
      store: {
        title: 'Local',
        type: 'string',
      },
    },
  };

  dateFrom = { jsdate: new Date(Date.now() - 604800000) };
  dateTo = { jsdate: new Date() };
  firstLoad = false;
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private processService: ProcessService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    if (!this.hasPermission('PSS')) {
      this.router.navigate(['/pages']);
      return;
    }

    this.settings.actions = {
      ...this.settings.actions,
      add: this.hasPermission('APSS'),
      edit: this.hasPermission('MPSS'),
      delete: this.hasPermission('EPSS'),
    };
    this.fetch(this.dateFrom.jsdate, this.dateTo.jsdate);
  }

  fetch(dateFrom, dateTo) {
    const from: string = this.datePipe.transform(dateFrom, 'yyyy-MM-dd');
    const to: string = this.datePipe.transform(dateTo, 'yyyy-MM-dd');
    this.processService.getAll(from, to).subscribe(
      (result: any) => {
        const processes = result.data;
        this.source.load(processes);
        this.firstLoad = true;
      },
      () => {
        this.source.load([]);
        this.firstLoad = true;
      },
    );
  }

  onChangeFrom(date) {
    if (!this.firstLoad) {
      return;
    }
    this.fetch(date.jsdate, this.dateTo.jsdate);
  }

  onChangeTo(date) {
    if (!this.firstLoad) {
      return;
    }
    this.fetch(this.dateFrom.jsdate, date.jsdate);
  }

  onDelete(event): void {
    if (!this.hasPermission('EPSS')) {
      alert('No tiene permiso para borrar proceso');
      return;
    }
    if (!window.confirm('Seguro que desea borrar proceso?')) {
      return;
    }

    this.processService.delete(event.data.id).subscribe(
      (result: any) => {
        this.source.remove(event.data);
      },
      error => {
        let errorMessage = { message: 'Error al eliminar proceso' };
        try {
          if (error && error.error) {
            errorMessage = { message: parseErrroMessage(error) };
          } else {
            errorMessage = JSON.parse(error._body);
          }
        } catch (e) {}

        alert(errorMessage.message);
      },
    );
  }

  onCreate(el): void {
    this.router.navigate([`../processes/new`], { relativeTo: this.route });
  }

  onEdit(evt): void {
    this.router.navigate([`../processes/${evt.data.id}`], {
      relativeTo: this.route,
    });
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }
}
