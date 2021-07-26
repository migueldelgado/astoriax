import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProductsRoutingModule, routedComponents } from './products.routing';
import { ProductsComponent } from './products.component';
import { RecipeModalComponent } from './recipes-table/modal/recipe-modal.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const components = [
  ProductsComponent,
  RecipeModalComponent
];

@NgModule({
  imports: [
    ThemeModule,
    ProductsRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...components,
    ...routedComponents,
  ],
  providers: [
  ],
  entryComponents: [
    RecipeModalComponent
  ],
})

export class ProductsModule {}
