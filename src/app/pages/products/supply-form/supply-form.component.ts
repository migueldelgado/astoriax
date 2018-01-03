import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

import { ProductsService } from '../products.service';

function sortByNumber(direction: number, a: string, b: string) {
  const numberA = parseInt(a, 10);
  const numberB = parseInt(b, 10);
  if (direction > 0) {
    return numberA - numberB;
  }
  return numberB - numberA;
}

@Component({
  selector: 'ngx-supply-form',
  templateUrl: './supply-form.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SupplyFormComponent implements OnInit {


  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
  }
}
