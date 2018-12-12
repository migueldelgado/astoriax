import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { NbAuthService } from '../../../auth/services';
import { OutputService } from '../../../@core/data/output.service';
import { parseErrroMessage } from '../../../@core/utils/error';

@Component({
  selector: 'ngx-output-table',
  templateUrl: './output-table.component.html',
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
export class OutputTableComponent implements OnInit {
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
      date: {
        title: 'Fecha',
        type: 'string',
      },
      store: {
        title: 'Local',
        type: 'string',
      },
      type: {
        title: 'Tipo',
        type: 'string',
      },
    },
  };

  dateFrom = { jsdate: new Date(Date.now() - 604800000) };
  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  source: LocalDataSource = new LocalDataSource();
  firstLoad = false;

  constructor(
    private outputService: OutputService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    if (!this.hasPermission('SAL')) {
      this.router.navigate(['/pages']);
      return;
    }

    this.settings.actions = {
      ...this.settings.actions,
      add: this.hasPermission('ASAL'),
      edit: this.hasPermission('MSAL'),
      delete: this.hasPermission('ESAL'),
    };
    this.fetch(this.dateFrom.jsdate, this.dateTo.jsdate);
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

  fetch(dateFrom, dateTo) {
    const from: string = this.datePipe.transform(dateFrom, 'yyyy-MM-dd');
    const to: string = this.datePipe.transform(dateTo, 'yyyy-MM-dd');
    Observable.forkJoin(this.outputService.getAll(from, to)).subscribe(
      (result: Array<any>) => {
        const [dOutputs] = result;
        const outputs = dOutputs.data;
        this.source.load(outputs);
        this.firstLoad = true;
      },
      error => {
        this.source.load([]);
        this.firstLoad = true;
      },
    );
  }

  onDelete(event): void {
    if (!window.confirm('Seguro que desea borrar salida?')) {
      return;
    }
    this.outputService.delete(event.data.id).subscribe(
      (result: any) => {
        this.source.remove(event.data);
      },
      error => {
        let errorMessage = { message: 'Error al eliminar salida' };
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
    this.router.navigate([`../outputs/new`], { relativeTo: this.route });
  }

  onEdit(evt): void {
    this.router.navigate([`../outputs/${evt.data.id}`], {
      relativeTo: this.route,
    });
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }
}
