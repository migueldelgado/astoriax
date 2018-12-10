///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../../../@core/data/supply.service';
import { StoreService } from '../../../@core/data/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../@core/data/recipe.service';
import { parseErrroMessage } from '../../../@core/utils/error';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { SupplierService } from '../../../@core/data/supplier.service';
import { NbAuthService } from '../../../auth/services';

@Component({
  selector: 'ngx-store-form',
  templateUrl: './stores-form.component.html',
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
export class StoresFormComponent implements OnInit {
  id: string;
  supplies: Array<any> = [];
  recipes: Array<any> = [];
  suppliers: Array<any> = [];

  data = {
    address: '',
    city: '',
    id: null,
    name: '',
    phone: '',
    recipes: [],
    supplies: [],
    suppliers: [],
  };

  constructor(
    private recipeService: RecipeService,
    private supplyService: SupplyService,
    private storeService: StoreService,
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: NbAuthService,
  ) {}

  ngOnInit() {
    if (!this.hasPermission('LOC')) {
      this.router.navigate(['/pages']);
      return;
    }
    Observable.forkJoin(
      this.supplyService.getTotalList(),
      this.recipeService.getTotalList(),
      this.supplierService.getAll(true),
      // this.recipeService.getTotalList(),
    ).subscribe((result: any) => {
      this.supplies = result[0].data;
      this.recipes = result[1].data || [];
      this.suppliers = result[2] || [];
      this.loadStore();
    });
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }

  loadStore() {
    this.route.params.subscribe(params => {
      if (!params.id || params.id.toLowerCase() === 'new') {
        this.preloadStore([], [], []);
        return;
      }
      this.id = params.id;
      this.storeService.find(this.id).subscribe(({ data }: any) => {
        this.data = { ...this.data, ...data, recipes: [], supplies: [] };
        const { recipes, supplies, suppliers } = data;
        this.preloadStore(recipes, supplies, suppliers);
      });
    });
  }

  preloadStore(
    recipes: Array<any>,
    supplies: Array<any>,
    suppliers: Array<any>,
  ) {
    this.data.recipes = this.recipes.map(r => {
      const selected = !!recipes.find(rec => rec.id === r.id);
      return { ...r, selected };
    });

    this.data.supplies = this.supplies.map(r => {
      const selected = supplies.find(rec => rec.id === r.id);
      const s = selected || { pivot: { stock: 0 } };
      return { ...r, selected: !!selected, stock: s.pivot.stock };
    });

    this.data.suppliers = this.suppliers.map(r => {
      const selected = !!suppliers.find(rec => rec.id === r.id);
      return { ...r, selected };
    });
  }

  cancel(e?) {
    if (e) {
      e.preventDefault();
    }
    this.router.navigate(['/pages/hr/stores']);
  }

  onSubmit() {
    const data = {
      name: this.data.name,
      address: this.data.address,
      phone: this.data.phone,
      city: this.data.city,
      supplies: [],
      recipes: [],
      suppliers: [],
    };

    data.supplies = this.data.supplies
      .filter(s => s.selected)
      .map(s => ({
        supply_id: s.id,
        stock: s.stock,
      }));

    data.recipes = this.data.recipes
      .filter(s => s.selected)
      .map(s => ({
        recipe_id: s.id,
      }));

    data.suppliers = this.data.suppliers
      .filter(s => s.selected)
      .map(s => ({
        supplier_id: s.id,
      }));

    if (this.id) {
      this.update(data);
    } else {
      this.save(data);
    }
  }

  save(data) {
    if (!this.hasPermission('ALOC')) {
      alert('No tiene permisos para agregar local');
      return;
    }
    this.storeService.create(data).subscribe(
      result => {
        this.cancel();
      },
      error => {
        alert(parseErrroMessage(error));
      },
    );
  }

  update(data) {
    if (!this.hasPermission('MLOC')) {
      alert('No tiene permisos para agregar local');
      return;
    }
    this.storeService.update({ ...data, id: this.id }).subscribe(
      result => {
        this.cancel();
      },
      error => {
        alert(parseErrroMessage(error));
      },
    );
  }

  selectAll(e, type) {
    const arr = this.data[type];
    if (!arr || !arr.length) {
      return;
    }
    arr.forEach(item => {
      item.selected = e.target.checked;
    });
  }
}
