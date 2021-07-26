import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { RecipeModalComponent } from './modal/recipe-modal.component';

import { RecipeService } from '../../../@core/data/recipe.service';
import { NbAuthService } from '../../../auth/services';
import { parseErrroMessage } from '../../../@core/utils/error';

@Component({
  selector: 'ngx-recipes-table',
  templateUrl: './recipes-table.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
    `,
  ],
})
export class RecipesTableComponent implements OnInit {
  settings;
  recipes: LocalDataSource = new LocalDataSource();

  constructor(
    private recipeService: RecipeService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.settings = {
      mode: 'external',
      add: { addButtonContent: '<i class="nb-plus"></i>' },
      edit: { editButtonContent: '<i class="nb-edit"></i>' },
      delete: { deleteButtonContent: '<i class="nb-trash"></i>' },
      actions: {
        columnTitle: '',
        position: 'right',
        add: this.hasPermission('AREC'),
        edit: this.hasPermission('MREC'),
        delete: this.hasPermission('EREC'),
      },
      columns: {
        name: { title: 'Nombre', type: 'text' },
        classification: { title: 'Clasificación', type: 'string' }
      },
    };
  }

  ngOnInit() {
    if (!this.hasPermission('REC')) {
      this.router.navigate(['/pages']);
      return;
    }

    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getAll().subscribe((recipes: any) => {
      this.recipes.load(recipes);
    });
  }

  onDelete(event): void {
    if (!window.confirm('Desea eliminar receta?')) {
      return;
    }
    this.recipeService.deleteRecipe(event.data.id).subscribe(
      () => this.loadRecipes(),
      error => {
        let errorMessage = { message: 'Error al eliminar receta' };
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

  onCreate(el): void {
    this.router.navigate([`../recipes/new`], { relativeTo: this.route });
  }

  onEdit(el): void {
    this.router.navigate([`./edit/${el.data.id}`], { relativeTo: this.route });
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }

  onClickRow(evt) {
    const modalOptions: NgbModalOptions = {
      size: 'lg',
      container: 'nb-layout',
    }

    const activeModal = this.modalService.open(
      RecipeModalComponent, 
      modalOptions
    );

    activeModal.componentInstance.initialize(evt.data.id);
  }
}
