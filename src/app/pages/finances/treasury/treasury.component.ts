import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TreasuryService } from './treasury.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService } from '../../../auth/services';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { IMyDateModel } from 'ngx-mydatepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getDateStringByDate, getFirstDateOfByYear } from '../../../@core/utils/dateUtils';

@Component({
  selector: 'ngx-treasury-table',
  templateUrl: './treasury.component.html'
})
export class TreasuryComponent implements OnInit {

  //correct way to setup table
  settings = {
    mode: 'external',
    add: { addButtonContent: '<i class="nb-plus"></i>' },
    edit: { editButtonContent: '<i class="nb-edit"></i>' },
    delete: { deleteButtonContent: '<i class="nb-trash"></i>' },
    actions: {
      columnTitle: '', 
      position: 'right',
      edit: false
    },
    columns: {
      date: { title: 'Fecha', type: 'text' },
      status: { 
        title: 'Estado', 
        type: 'text',
        valuePrepareFunction: (cell, row) => {
          if (typeof row.status == 'undefined' || row.status == null || row.status === ''){
            return row.status;
          }
          return row.status === 0 ? 'INACTIVE' : 'ACTIVE';
        }
      },
      transfer_type: {
        title: 'Tipo de movimiento', 
        type: 'text',
        valuePrepareFunction: (cell, row) => row.transfer_type === 'I' ? 'INGRESO' : 'EGRESO'
      },
      // paymentType: { title: 'Forma de pago', type: 'text' },
      classification: { title: 'Clasificacion', type: 'text' },
      // reason: { title: 'Motivo', type: 'text' },
      // cheque_number: { title: 'Cheque', type: 'text' },
      amount: { title: 'Monto', type: 'text' }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  dateFrom = { jsdate: getFirstDateOfByYear(new Date().getFullYear()) };
  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = { dateFormat: 'dd-mm-yyyy' };
  store: any;
  userStores;
  storeSelected;

  result: any = {
    treasuries: '',
    totalReal: 0,
    totalProjected: 0,
    totalInactiveOutcome: 0
  };

  transferType: any = "";

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private treasuryService: TreasuryService,
    private authService: NbAuthService
  ) {}

  ngOnInit() {
    this.userStores = this.authService.getUserStores();
    this.storeSelected = this.userStores[0].id || '';
    this.getTreasuries(null, null);
  }

  onChangeDateFrom(event: IMyDateModel) {
    this.getTreasuries(event.jsdate, null);
  }

  onChangeDateTo(event: IMyDateModel) {
    this.getTreasuries(null, event.jsdate);
  }

  onCreate(): void {
    this.router.navigate([`./new`], { relativeTo: this.route });
  }

  onDelete(evt) {
    this.treasuryService.deleteTreasuries(evt.data.id)
      .subscribe(res => {
        this.getTreasuries();
      });
  }

  getTreasuries(dateFrom?, dateTo?) {
    const from: String = getDateStringByDate(dateFrom || this.dateFrom.jsdate);
    const to: String = getDateStringByDate(dateTo || this.dateTo.jsdate);

    this.treasuryService.getTreasuries(from, to)
      .subscribe((data: any) => {
        this.source = data.treasuries;
        this.result.totalReal = data.totalReal;
        this.result.totalProjected = data.totalProjected;
        this.result.totalInactiveOutcome = data.totalInactiveOutcome;
        this.loading = false;
      })
  }

}
