///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {SupplyService} from '../../../@core/data/supply.service';
import {StoreService} from '../../../@core/data/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../../@core/data/recipe.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'ngx-supply-form',
  templateUrl: './recipe-form.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class RecipeFormComponent implements OnInit {
  id: string;
  supplies: Array<any> = [];
  stores: Array<any> = [];
  totalCost: number = 0;
  data = {
    stores: [
    ],
    supplies: [
    ],
    name: '',
    classification: '',
  };

  constructor(
    private recipeService: RecipeService,
    private supplyService: SupplyService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {

    Observable.forkJoin(this.storeService.getAll(), this.supplyService.getAll())
      .subscribe(result => {
        this.stores = result[0];
        this.supplies = result[1];
        this.loadRecipeData();
      })

  }

  loadRecipeData() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.id = params.id;
      this.recipeService.findRecipe(this.id)
        .subscribe((result) => {
          const [data] = result.data;
          this.data = Object.assign({}, data);
          this.data.supplies.forEach((s, index) => {
            s.supply = this.supplies.find(supply => supply.id_supply === s.id_supply);
            this.recalculateCost(index);
          });
          this.stores.forEach((s) => {
            s.selected = !!data.stores.find(store => store.id_store === s.id_store);
          })
        })
    });
  }

  addSupply(e) {
    e.preventDefault();
    this.data.supplies.push({
      cost: 0,
      quantity: '1',
      supply: {},
    });
  }

  onChangeSupply(idSupply, index) {
    // const idSupply = this.data.supplies[index].id_supply;
    // console.log(e, this.data.supplies, idSupply);
    const supply = this.supplies.find((s) => s.id_supply === idSupply);
    this.data.supplies[index].supply = Object.assign({}, supply);
    this.recalculateCost(index);
  }

  recalculateCost(i: number) {
    const supply = this.data.supplies[i];
    if (!supply.quantity || supply.quantity <= 0) {
      supply.cost = 0;
      return;
    }
    if (!supply.supply.price) {
      supply.cost = 0;
      return ;
    }
    supply.cost = supply.quantity * supply.supply.price;
    this.totalCost = this.data.supplies.reduce((acc, s) => acc + s.cost, 0);
  }

  removeSupply(i) {
    this.data.supplies = [...this.data.supplies.slice(0, i), ...this.data.supplies.slice(i + 1)];
  }

  cancel() {
    this.router.navigate(['/pages/products/supplies']);
  }

  onSubmit() {
    this.data.stores = this.stores.filter((s) => s.selected);
    if (this.id) {
      this.update()
    } else {
      this.save()
    }
  }

  save() {
    this.recipeService.createRecipe(this.data)
      .subscribe((result) => {
        this.cancel()
      }, (error) => {
        const err = JSON.parse(error._body);
        alert(err.message);
      });
  }

  update() {
    this.recipeService.updateRecipe(this.id, this.data)
      .subscribe((result) => {
        this.cancel()
      }, (error) => {
        const err = JSON.parse(error._body);
        alert(err.message);
      });
  }
}
