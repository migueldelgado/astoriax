import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LocalDataSource } from 'ng2-smart-table';

import { RecipeService } from '../../../../@core/data/recipe.service';

@Component({
  selector: 'ngx-recipe-modal',
  template: `
    <div>
      <div class="modal-header">
        <span>Insumos de {{ recipeName }}</span>
        <button class="close" aria-label="Close" (click)="closeModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <ng2-smart-table
          [settings]="settings"
          [source]="supplies"
        ></ng2-smart-table>
      </div>
    </div>
  `,
  styles: [`

  `],
})
export class RecipeModalComponent {
  supplies: LocalDataSource = new LocalDataSource();
  recipeName: string;
  settings;

  constructor(
    private activeModal: NgbActiveModal, 
    private recipeService: RecipeService
  ) {
    this.settings = {
      hideSubHeader: true,
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        name: { title: 'Nombre', type: 'text' },
        quantity: { title: 'Cantidad', type: 'text' },
        classification: { title: 'Clasificacion', type: 'text' }
      },
    };
  }

  initialize(recipeId) {
    this
      .recipeService
      .findRecipe(recipeId)
      .subscribe(recipe => {
        console.log(recipe)
        this.recipeName = recipe.data.name;
        const supplies = recipe.data.supplies.map(supply => {
          return {
            name: supply.name,
            quantity: supply.pivot.quantity,
            classification: supply.classification
          }
        })
        this.supplies.load(supplies)
      });
  }

  closeModal() {
    this.activeModal.close();
  }
}
