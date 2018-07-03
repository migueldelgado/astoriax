import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-treasury-table',
  templateUrl: './treasury.component.html',
  styles: [`
    nb-actions {
      display: inline-flex;
      margin: 0rem 0 1rem;
      border: 1px solid #342e73;
      border-radius: 7px
    }
    table {
      line-height: 1.5em;
      border-collapse: collapse;
      border-spacing: 0;
      display: table;
      width: 100%;
      max-width: 100%;
      overflow: auto;
      word-break: normal;
      word-break: keep-all;
    }
    table tr td {
      position: relative;
      padding: 0.875rem 1.25rem;
      border: 1px solid #342e73;
      vertical-align: middle;
    }
    table th {
      position: relative;
      padding: 0.875rem 1.25rem;
      border: 1px solid #342e73;
      vertical-align: middle;
      padding: 0.875rem 1.25rem;
      padding-right: 1.75rem;
      font-family: Exo;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.25;
      color: #ffffff;
    }
    .pdf-container {
      display: flex;
      justify-content: flex-end;
      padding: 0 0 1rem;
    }
    tfoot td:first-child {
      background-color: #231f4e;
    }
  `],
})
export class TreasuryComponent implements OnInit {

  dateFrom = { jsdate: new Date() };
  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  store: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {

  }

  onChangeFrom(date) {
    // tslint:disable-next-line
    console.log(date);
  }

  onChangeTo(date) {
    // tslint:disable-next-line
    console.log(date);
  }


}
