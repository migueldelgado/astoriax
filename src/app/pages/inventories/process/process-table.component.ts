import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';
import { INgxMyDpOptions } from 'ngx-mydatepicker';

import { NbAuthService } from '../../../auth/services';
import { ProcessService } from '../../../@core/data/process.service';

import { parseErrroMessage } from '../../../@core/utils/error';
import { getDateStringByDate } from '../../../@core/utils/dateUtils';

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
  settings;
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
    private router: Router
  ) {
    this.settings = {
      mode: 'external',
      add: { addButtonContent: '<i class="nb-plus"></i>' },
      edit: { editButtonContent: '<i class="nb-edit"></i>' },
      delete: { deleteButtonContent: '<i class="nb-trash"></i>' },
      actions: {
        columnTitle: 'Acciones',
        position: 'right',
        add: this.hasPermission('APSS'),
        edit: this.hasPermission('MPSS'),
        delete: this.hasPermission('EPSS'),
      },
      columns: {
        date: { title: 'Fecha', type: 'string' },
        supply_name: { title: 'Insumo', type: 'string' },
        final_quantity: { title: 'Cantidad', type: 'string', filter: false },
      },
    };
  }

  ngOnInit() {
    if (!this.hasPermission('PSS')) {
      this.router.navigate(['/pages']);
      return;
    }
    this.fetch(
      this.dateFrom.jsdate,
      this.dateTo.jsdate
    );
  }

  fetch(dateFrom, dateTo) {
    const params = {
      selectedStore: true,
      from: getDateStringByDate(dateFrom),
      to: getDateStringByDate(dateTo)
    }

    this.processService.getAll(params).subscribe(
      processes => {
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
