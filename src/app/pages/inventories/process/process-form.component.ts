import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { INgxMyDpOptions } from 'ngx-mydatepicker';

import { NbAuthService } from '../../../auth/services';
import { SupplyService } from '../../../@core/data/supply.service';
import { StoreService } from '../../../@core/data/store.service';
import { ProcessService } from '../../../@core/data/process.service';

import { getDateStringByDate } from '../../../@core/utils/dateUtils';

@Component({
  selector: 'ngx-process-form',
  templateUrl: './process-form.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
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

      .row {
        align-items: center;
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class ProcessFormComponent implements OnInit {
  id: number;
  storeId;
  stores: Array<any> = [];
  supplies: Array<any> = [];
  suppliesProcessable: Array<any> = [];
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  date = {
    jsdate: new Date(),
  };
  data = {
    store_id: '',
    supply_id: '',
    date: '',
    wastage: 0,
    final_quantity: '0',
    supplies: [],
  };

  constructor(
    private supplyService: SupplyService,
    private processService: ProcessService,
    private storeService: StoreService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.storeId = this.authService.getCurrentStore();
  }

  ngOnInit() {
    if (!this.hasPermission('PSS')) {
      this.router.navigate(['/pages']);
      return;
    }

    Observable.forkJoin(
      this.supplyService.getAll(),
      this.storeService.getAll(),
    ).subscribe((result: Array<any>) => {
      this.suppliesProcessable = result[0].data.filter(
        p => p.show_in_process === '1' || p.show_in_process === 1,
      );
      this.stores = this.stores = result[1];
      this.route.params.subscribe(params => {
        if (!params.id || params.id.toLowerCase() === 'new') {
          this.preload([]);
          return;
        }
        this.loadProcess(params.id);
      });
    });
  }

  loadProcess(id) {
    this.id = id;
    this.processService.find(id).subscribe(({ data }: any) => {
      const d = new Date(data.date);
      this.storeId = data.store_id;
      this.date = {
        jsdate: new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000),
      };
      this.data = { ...this.data, ...data, supplies: [] };
      this.preload(data.supplies);
    });
  }

  preload(supplies: Array<any>) {
    this.data.supplies = supplies.map(r => {
      return { ...r, quantity: r.pivot.quantity || '0' };
    });
  }

  onChangeSupply() {
    if (!this.data.supply_id) {
      return;
    }
    this.supplyService.findSupply(this.data.supply_id).subscribe(result => {
      const supply = result.data;
      this.preload(supply.supplies);
    });
  }

  onSubmit() {
    const date = getDateStringByDate(this.date.jsdate);
    const data = {
      ...this.data,
      store_id: this.storeId,
      date,
    };

    data.supplies = this.data.supplies.map(s => ({
      supply_id: s.id,
      quantity: s.quantity,
    }));

    if (this.id && !this.hasPermission('MPSS')) {
      alert('No tienes permisos para editar procesos');
      return;
    }

    if (!this.id && !this.hasPermission('APSS')) {
      alert('No tienes permisos para agregar procesos');
      return;
    }

    const observable = this.id
      ? this.processService.update(this.id, {
          ...data,
        })
      : this.processService.create(data);
    observable.subscribe(
      result => {
        this.cancel();
      },
      () => {
        alert('Error al guardar proceso');
      },
    );
  }

  cancel() {
    this.router.navigate(['/pages/inventories/processes']);
  }
  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }
}
