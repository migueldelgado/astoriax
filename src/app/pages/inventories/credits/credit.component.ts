import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import {
  numberWithCommas,
  valuePrepareFunction,
} from '../../../@core/utils/utils';
import { CreditService } from 'app/@core/data/credit.service';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { getDateStringByDate } from 'app/@core/utils/dateUtils';

@Component({
  selector: 'ngx-credits',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
})
export class CreditComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();

  settings = {
    mode: 'external',
    noDataMessage: 'No hay informacion disponible',
    add: { addButtonContent: '<i class="nb-plus"></i>' },
    edit: { editButtonContent: '<i class="nb-edit"></i>' },
    delete: { deleteButtonContent: '<i class="nb-trash"></i>' },
    actions: { columnTitle: '', position: 'right' },
    columns: {
      document_number: { title: 'Numero Nota de Credito' },
      date: { title: 'Fecha' },
      purchase_number: { title: 'Numero de Factura' },
      amount: { title: 'Monto', valuePrepareFunction },
    },
  };

  dateFrom = { jsdate: new Date() };
  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = { dateFormat: 'dd-mm-yyyy' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private creditServices: CreditService,
  ) {}

  ngOnInit() {
    this.init();
  }

  init(from?: Date, to?: Date) {
    const dateFrom = from || this.dateFrom.jsdate;
    const dateTo = to || this.dateTo.jsdate;
    const params = {
      from: getDateStringByDate(dateFrom),
      to: getDateStringByDate(dateTo),
    };

    this.creditServices.getAll(params).subscribe((credits: any) => {
      this.source.load(credits.data);
    });
  }

  onAdd(evt) {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(evt) {
    this.router.navigate([`${evt.data.id}`], {
      relativeTo: this.route,
      queryParams: evt.data,
    });
  }

  onDelete(evt) {
    this.creditServices.delete(evt.data.id).subscribe(() => {
      this.init();
    });
  }

  numberWithCommas(val) {
    return numberWithCommas(val);
  }

  onChangeDateFrom(evt) {
    this.init(evt.jsdate);
  }

  onChangeDateTo(evt) {
    this.init(null, evt.jsdate);
  }

  // getReportPDF(){
  //   let params = {
  //     year: new Date().getFullYear()
  //   }

  //   this.supplierService.getTotalInvoicesReport(params)
  //     .subscribe(
  //       (result: any) => {
  //         window.open(result.data.path, '_blank');
  //       },
  //       () => {
  //         alert('Error al generar reporte')
  //       }
  //     )
  // }
}
