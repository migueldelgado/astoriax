import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {AppConfig} from '../../../app.config';
import {PurchaseService} from '../../../@core/data/purchase.service';
import {NbAuthService} from '../../../auth/services';

@Component({
  selector: 'ngx-supplies-table',
  templateUrl: './purchase-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    nb-card-body {
      min-height: 400px;
    }
  `],
})
export class PurchaseTableComponent implements OnInit {

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
      document_number: {
        title: 'Numero Factura',
        type: 'string',
      },
      date: {
        title: 'Fecha',
        type: 'string',
      },
      name_provider: {
        title: 'Proveedor',
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
    private purchaseService: PurchaseService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: NbAuthService) {}

  ngOnInit() {
    this.fetch(new Date(), new Date());
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
    const from = dateFrom.toJSON();
    const to = dateTo.toJSON();

    this.purchaseService.getAll({ dateFrom: from, dateTo: to })
      .subscribe((purchases: any) => {
        this.source.load(purchases);
        this.firstLoad = true;
      }, () => {
        this.source.load([])
        this.firstLoad = true;
      })
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDelete(event): void {
    this.purchaseService.delete(event.data.id_loan)
      .subscribe((result: any) => {
        this.source.remove(event.data);
      }, error => {
        const errorMessage = JSON.parse(error._body);
        alert(errorMessage.message);
      })
  }

  onCreate(el): void {
    this.router.navigate([`../purchase/new`], { relativeTo: this.route });
  }

  onEdit(el): void {
    this.router.navigate([`../purchase/edit/${el.data.id}`], { relativeTo: this.route });
  }
}
