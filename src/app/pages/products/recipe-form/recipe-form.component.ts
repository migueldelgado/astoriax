///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../../../@core/data/supply.service';
import { StoreService } from '../../../@core/data/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../@core/data/recipe.service';
import { parseErrroMessage } from '../../../@core/utils/error';
import 'rxjs/add/operator/map';

@Component({
    selector: 'ngx-supply-form',
    templateUrl: './recipe-form.component.html',
    styles: [
        `
            nb-card {
                transform: translate3d(0, 0, 0);
            }
        `,
    ],
})
export class RecipeFormComponent implements OnInit {
    id: string;
    supplies: Array<any> = [];
    supplyMap = {};
    totalCost: number = 0;
    data = {
        supplies: [],
        name: '',
        classification: '',
    };

    constructor(
        private recipeService: RecipeService,
        private supplyService: SupplyService,
        private storeService: StoreService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.supplyService.getAll().subscribe((result: any) => {
            this.supplies = result.data;
            this.loadRecipeData();
        });
    }

    loadRecipeData() {
        this.route.params.subscribe(params => {
            if (!params.id) {
                return;
            }
            this.id = params.id;
            this.recipeService.findRecipe(this.id).subscribe(result => {
                const data = result.data;
                delete data.stores;
                this.data = Object.assign({}, data);
                this.data.supplies = data.supplies.map(s => {
                    return {
                        supply: s,
                        supply_id: s.id,
                        quantity: s.pivot.quantity,
                    };
                });
                this.recalculateSupplyMap();
            });
        });
    }

    addSupply(e) {
        e.preventDefault();
        this.data.supplies.push({
            quantity: '1',
            supply_id: '',
            supply: null,
        });
    }

    onChangeSupply(id, index) {
        if (!id) {
            this.data.supplies[index].supply = null;
            this.data.supplies[index].supply_id = '';
            this.recalculateSupplyMap();
            return;
        }
        const supply = this.supplies.find(s => s.id === parseInt(id, 10));
        // const idSupply = this.data.supplies[index].id_supply;
        // console.log(e, this.data.supplies, idSupply);
        // const supply = this.supplies.find((s) => s.id_supply === idSupply);
        // this.data.supplies[index].supply = Object.assign({}, supply);
        this.data.supplies[index].supply = supply;
        this.data.supplies[index].supply_id = supply.id;
        this.recalculateCost(index);
        this.recalculateSupplyMap();
    }

    recalculateSupplyMap() {
        this.supplyMap = this.data.supplies.reduce((acc, s) => {
            return {
                ...acc,
                [s.supply_id]: true,
            };
        }, {});
    }

    recalculateCost(i: number) {
        // const supply = this.data.supplies[i];
        // if (!supply.quantity || supply.quantity <= 0) {
        //   supply.cost = 0;
        //   return;
        // }
        // if (!supply.supply.price) {
        //   supply.cost = 0;
        //   return ;
        // }
        // supply.cost = supply.quantity * supply.supply.price;
        // this.totalCost = this.data.supplies.reduce((acc, s) => acc + s.cost, 0);
    }

    removeSupply(i) {
        this.data.supplies = [
            ...this.data.supplies.slice(0, i),
            ...this.data.supplies.slice(i + 1),
        ];
        this.recalculateSupplyMap();
    }

    cancel(e?) {
        if (e) {
            e.preventDefault();
        }
        this.router.navigate(['/pages/store/products/recipes']);
    }

    onSubmit() {
        const data = { ...this.data };
        data.supplies = this.data.supplies.map(s => {
            return {
                supply_id: s.supply_id,
                quantity: s.quantity,
            };
        });
        if (this.id) {
            this.update(data);
        } else {
            this.save(data);
        }
    }

    save(data) {
        this.recipeService.createRecipe(data).subscribe(
            result => {
                this.cancel();
            },
            error => {
                let errorMessage = { message: 'Error al crear receta' };
                try {
                    if (error && error.error) {
                        errorMessage = { message: parseErrroMessage(error) };
                    } else {
                        errorMessage = JSON.parse(error._body);
                    }
                } catch (e) {}

                alert(errorMessage.message);
            },
        );
    }

    update(data) {
        this.recipeService.updateRecipe(this.id, data).subscribe(
            result => {
                this.cancel();
            },
            error => {
                let errorMessage = { message: 'Error al modificar receta' };
                try {
                    if (error && error.error) {
                        errorMessage = { message: parseErrroMessage(error) };
                    } else {
                        errorMessage = JSON.parse(error._body);
                    }
                } catch (e) {}

                alert(errorMessage.message);
            },
        );
    }
}
