import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../../@core/data/recipe.service';

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
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
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
      cost: {
        title: 'Costo Producto',
        type: 'integer',
        compareFunction: sortByNumber,
      },
    },
  };


  source: LocalDataSource = new LocalDataSource();


  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.recipeService.getAll()
      .subscribe((recipes: any) => {
        this.source.load(recipes);
      })
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Desea continuar?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDelete(event): void {
    this.recipeService.deleteRecipe(event.data.id_supply)
      .subscribe((result: any) => {
        this.source.remove(event.data);
      }, error => {
        const errorMessage = JSON.parse(error._body);
        alert(errorMessage.message);
      })
  }

  onCreate(el): void {
    this.router.navigate([`../recipes/new`], { relativeTo: this.route });
  }

  onEdit(el): void {
    this.router.navigate([`./edit/${el.data.id_recipe}`], { relativeTo: this.route });
  }
}
