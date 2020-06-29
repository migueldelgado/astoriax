import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../@core/data/recipe.service';
import { NbAuthService } from '../../../auth/services';
import { parseErrroMessage } from '../../../@core/utils/error';

function sortByNumber(direction: number, a: string, b: string) {
  const numberA = parseInt(a, 10);
  const numberB = parseInt(b, 10);
  if (direction > 0) {
    return numberA - numberB;
  }
  return numberB - numberA;
}

@Component({
  selector: 'ngx-supplies-table',
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
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: 'Acciones',
      position: 'right',
    },
    mode: 'external',
    columns: {
      name: {
        title: 'Nombre',
        type: 'string',
      },
      classification: {
        title: 'Clasificación',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private recipeService: RecipeService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.hasPermission('REC')) {
      this.router.navigate(['/pages']);
      return;
    }
    this.settings.actions = {
      ...this.settings.actions,
      add: this.hasPermission('AREC'),
      edit: this.hasPermission('MREC'),
      delete: this.hasPermission('EREC'),
    };
    this.recipeService.getAll().subscribe((recipes: any) => {
      this.source.load(recipes);
    });
  }

  onDelete(event): void {
    if (!window.confirm('Desea eliminar receta?')) {
      return;
    }
    this.recipeService.deleteRecipe(event.data.id).subscribe(
      (result: any) => {
        this.source.remove(event.data);
      },
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
}
