import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-variable-costs-table',
  templateUrl: './variable-costs.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    nb-card-body {
      min-height: 400px;
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
      width: 25%;
        position: relative;
      padding: 0.875rem 1.25rem;
      border: 1px solid #342e73;
      vertical-align: middle;
    }
  `],
})
export class VariableCostsComponent implements OnInit {

  settings = {
    actions: false,
    mode: 'external',
    columns: {
      name: {
        title: 'Costo',
        type: 'string',
      },
      secondColumn: {
        title: 'Junio 2017',
        type: 'number',
      },
      thirdColumn: {
        title: 'Mayo 2018',
        type: 'number',
      },
      fourthColumn: {
        title: 'Junio al dia',
        type: 'number',
      },
    },
  };

  dateFrom = { jsdate: new Date() };
  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  source: LocalDataSource = new LocalDataSource();
  store: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {

    this.source.load([{
      name: 'Proveedor',
      secondColumn: -6599005,
      thirdColumn: 0,
      fourthColumn: 0,
    }, {
      name: 'Finiquito',
      secondColumn: -333845,
      thirdColumn: 0,
      fourthColumn: 0,
    }, {
      name: 'Comisión Transbank D',
      secondColumn: -206442,
      thirdColumn: 0,
      fourthColumn: 0,
    }, {
      name: 'Comisión Transbank C',
      secondColumn: -34733,
      thirdColumn: 0,
      fourthColumn: 0,
    }, {
      name: 'Comisión Sodexho',
      secondColumn: -51238,
      thirdColumn: 0,
      fourthColumn: 0,
    }, {
      name: 'Comisión Edenred',
      secondColumn: -5290,
      thirdColumn: 0,
      fourthColumn: 0,
    }]);
  }


}
