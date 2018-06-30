import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-fixed-costs-table',
  templateUrl: './fixed-costs.component.html',
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
    table th {
      position: relative;
      width: 25%;
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
    table.total-table td, tfoot td {
      background-color: #342e73;
    }
    table.total-table td:first-child, tfoot td:first-child {
      background-color: #231f4e;
    }
  `],
})
export class FixedCostsComponent implements OnInit {

  settings = {
    actions: false,
    mode: 'external',
    columns: {
      name: {
        title: 'Costo',
        type: 'string',
        width: '25%',
      },
      secondColumn: {
        title: 'Junio 2017',
        type: 'number',
        width: '25%',
      },
      thirdColumn: {
        title: 'Mayo 2018',
        type: 'number',
        width: '25%',
      },
      fourthColumn: {
        title: 'Junio al dia',
        type: 'number',
        width: '25%',
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
      name: 'Arriendo',
      secondColumn: 0,
      thirdColumn: 0,
      fourthColumn: 0,
    }, {
      name: 'Seguro Local',
      secondColumn: 0,
      thirdColumn: 0,
      fourthColumn: 0,
    }, {
      name: 'Marketing y publicidad',
      secondColumn: 0,
      thirdColumn: 0,
      fourthColumn: 0,
    }, {
      name: 'Gastos varios',
      secondColumn: -12084251,
      thirdColumn: 0,
      fourthColumn: 0,
    }, {
      name: 'Caja chica',
      secondColumn: 0,
      thirdColumn: 0,
      fourthColumn: 0,
    }, {
      name: 'Viatico',
      secondColumn: 0,
      thirdColumn: 0,
      fourthColumn: 0,
    },  {
      name: 'Asignaciones de representación',
      secondColumn: 0,
      thirdColumn: 0,
      fourthColumn: 0,
    },  {
      name: 'Reinversión de maquinaria',
      secondColumn: 0,
      thirdColumn: 0,
      fourthColumn: 0,
    }]);
  }


}
