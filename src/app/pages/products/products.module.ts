import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProductsRoutingModule, routedComponents } from './products.routing';
import { ProductsComponent } from './products.component';
import { ProductsService } from './products.service'
import { Ng2SmartTableModule } from 'ng2-smart-table';

const components = [
  ProductsComponent,
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
})

export class ProductsModule {}
