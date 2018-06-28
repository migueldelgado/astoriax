import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-general-expenses-table',
  templateUrl: './general-expenses.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    nb-card-body {
      min-height: 400px;
    }
  `],
})
export class GeneralExpensesComponent implements OnInit {

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
