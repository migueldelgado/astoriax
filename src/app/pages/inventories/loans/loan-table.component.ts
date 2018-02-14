import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SupplyService} from '../../../@core/data/supply.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DailyInventoryService} from '../../../@core/data/daily-inventory.service';
import {IMyDpOptions} from 'angular4-datepicker/src/my-date-picker/interfaces/my-options.interface';
import {AppConfig} from '../../../app.config';
import {LoanService} from '../../../@core/data/loan.service';
import {NbAuthService} from '../../../auth/services';

@Component({
  selector: 'ngx-supplies-table',
  templateUrl: './loan-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    nb-card-body {
      min-height: 400px;
    }
  `],
})
export class LoanTableComponent implements OnInit {

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
      id_loan: {
        title: 'Id Prestamo',
        type: 'string',
      },
      to: {
        title: 'Hacia',
        type: 'string',
      },
      date: {
        title: 'Fecha',
        type: 'string',
      },
    },
  };

  dateFrom = { jsdate: new Date() };
  dateTo = { jsdate: new Date() };
  options: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  source: LocalDataSource = new LocalDataSource();
  firstLoad = false;
  store: any;

  constructor(
    private loanService: LoanService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.fetch(new Date(), new Date());
    this.store = this.authService.getCurrentStore();
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

    this.loanService.getAll({ currentStore: this.store, dateFrom: from, dateTo: to })
      .subscribe((loans: any) => {
        this.source.load(loans);
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
    this.loanService.delete(event.data.id_loan)
      .subscribe((result: any) => {
        this.source.remove(event.data);
      }, error => {
        const errorMessage = JSON.parse(error._body);
        alert(errorMessage.message);
      })
  }

  onCreate(el): void {
    this.router.navigate([`../loan/new`], { relativeTo: this.route });
  }

  onEdit(el): void {
    this.router.navigate([`../loan/edit/${el.data.id_loan}`], { relativeTo: this.route });
  }
}
