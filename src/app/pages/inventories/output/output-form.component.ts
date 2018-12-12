import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../../../@core/data/supply.service';
import { ActivatedRoute, Router } from '@angular/router';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { DailyInventoryService } from '../../../@core/data/daily-inventory.service';
import { NbAuthService } from '../../../auth/services';
import { StoreService } from '../../../@core/data/store.service';
import { OutputService } from '../../../@core/data/output.service';
import { RecipeService } from '../../../@core/data/recipe.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-output-form',
  templateUrl: './output-form.component.html',
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

      table tr > *:first-child {
        width: 15% !important;
        max-width: 120px !important;
        min-width: 100px !important;
        text-align: center;
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
    `,
  ],
})
export class OutputFormComponent implements OnInit {
  id: number;
  storeId;
  stores: Array<any> = [];
  supplies: Array<any> = [];
  recipes: Array<any> = [];
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };
  date = {
    jsdate: new Date(),
  };
  types = ['Ventas', 'Bajas', 'Colación'];
  data = {
    supplies: [],
    recipes: [],
    type: '',
  };

  constructor(
    private supplyService: SupplyService,
    private dailyInventoryService: DailyInventoryService,
    private outputService: OutputService,
    private recipeService: RecipeService,
    private storeService: StoreService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.storeId = this.authService.getCurrentStore();
    this.data.type = this.types[0];
  }

  ngOnInit() {
    if (!this.hasPermission('SAL')) {
      this.router.navigate(['/pages']);
      return;
    }

    Observable.forkJoin(
      this.storeService.getAll(true),
      this.recipeService.getAll(),
      this.supplyService.getAll(),
    ).subscribe((result: Array<any>) => {
      this.stores = result[0];
      this.recipes = result[1];
      this.supplies = result[2].data;
      this.route.params.subscribe(params => {
        if (!params.id || params.id.toLowerCase() === 'new') {
          this.preload([], []);
          return;
        }
        this.loadOutput(params.id);
      });
    });
  }

  loadOutput(id) {
    this.id = id;
    this.outputService.find(id).subscribe(({ data }: any) => {
      const d = new Date(data.date);
      this.storeId = data.store_id;
      this.date = {
        jsdate: new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000),
      };
      this.data = { ...this.data, ...data, supplies: [], recipes: [] };
      this.preload(data.recipes, data.supplies);
    });
  }

  preload(recipes: Array<any>, supplies: Array<any>) {
    this.data.recipes = this.recipes.map(r => {
      const selected = recipes.find(rec => rec.id === r.id);
      const d = selected ? selected.pivot : { quantity: '0', reason: '' };
      return { ...r, ...d };
    });

    this.data.supplies = this.supplies.map(r => {
      const selected = supplies.find(rec => rec.id === r.id);
      const d = selected ? selected.pivot : { quantity: '0', reason: '' };
      return { ...r, ...d };
    });
  }

  onSubmit() {
    const dt = this.date.jsdate;
    const date = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    const data = {
      store_id: this.storeId,
      ...this.data,
      date,
    };

    data.supplies = this.data.supplies
      .filter(d => parseInt(d.quantity, 10) > 0)
      .map(s => ({
        supply_id: s.id,
        quantity: s.quantity,
        reason: s.reason,
      }));

    data.recipes = this.data.recipes
      .filter(d => parseInt(d.quantity, 10) > 0)
      .map(s => ({
        recipe_id: s.id,
        quantity: s.quantity,
        reason: s.reason,
      }));

    if (this.id && !this.hasPermission('MSAL')) {
      alert('No tienes permisos para editar inventarios');
      return;
    }

    if (!this.id && !this.hasPermission('ASAL')) {
      alert('No tienes permisos para agregar inventarios');
      return;
    }

    const observable = this.id
      ? this.outputService.update(this.id, {
          ...data,
        })
      : this.outputService.create(data);
    observable.subscribe(
      result => {
        this.cancel();
      },
      () => {
        alert('Error al guardar inventario');
      },
    );
  }

  cancel() {
    this.router.navigate(['/pages/inventories/outputs']);
  }
  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }
}
