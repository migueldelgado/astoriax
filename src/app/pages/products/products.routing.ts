import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProductsComponent} from './products.component';
import {SuppliesTableComponent} from './supplies-table/supplies-table.component';
import {SupplyFormComponent} from './supply-form/supply-form.component';
import {RecipesTableComponent} from './recipes-table/recipes-table.component';
import {RecipeFormComponent} from './recipe-form/recipe-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'supplies',
        component: SuppliesTableComponent,
      }, {
        path: 'supplies/new',
        component: SupplyFormComponent,
      }, {
        path: 'supplies/edit/:id',
        component: SupplyFormComponent,
      }, {
        path: 'recipes',
        component: RecipesTableComponent,
      }, {
        path: 'recipes/new',
        component: RecipeFormComponent,
      },  {
        path: 'recipes/edit/:id',
        component: RecipeFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
}

export const routedComponents = [
  SuppliesTableComponent,
  SupplyFormComponent,
  RecipesTableComponent,
  RecipeFormComponent,
];
