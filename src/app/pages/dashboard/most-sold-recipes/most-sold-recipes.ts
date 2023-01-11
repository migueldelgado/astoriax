import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { RecipeService } from 'app/@core/data/recipe.service';
import { DateHelper } from 'app/helpers/date-helper';

@Component({
  selector: 'ngx-most-sold-recipes',
  styleUrls: ['./most-sold-recipes.component.scss'],
  template: `
    <nb-card>
      <nb-card-header>
        <span>Productos mas vendidos</span>
        <div class="ghost-dropdown" ngbDropdown>
          <button
            type="button"
            class="btn btn-sm btn-primary"
            ngbDropdownToggle
          >
            {{ year.label }}
          </button>
          <ul class="dropdown-menu">
            <li
              class="dropdown-item"
              *ngFor="let year of years"
              (click)="onChangeYearlyDate(year)"
            >
              {{ year.label }}
            </li>
          </ul>
        </div>
      </nb-card-header>
      <nb-card-body>
        <ngx-echarts-pie
          *ngIf="data.length"
          [title]="title"
          [data]="data"
          [labels]="labels"
        ></ngx-echarts-pie>
      </nb-card-body>
    </nb-card>
  `,
})
export class MostSoldRecipesComponent implements OnInit {
  title: string = 'Recetas';
  data: { value: number; name: string }[];
  labels: string[];
  years: any[];
  year: any;
  limit = '5';

  constructor(
    private dateHelper: DateHelper,
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    let currentYear = this.dateHelper.getCurrentYear();

    this.years = Array.from(
      [currentYear, currentYear - 1, currentYear - 2, currentYear - 3],
      (year: number) => ({ value: year, label: year }),
    );

    this.year = this.years[0];

    this.loadMostSoldRecipes(this.year.value, this.limit);
  }

  onChangeYearlyDate(yearlyDate) {
    this.year = yearlyDate;
    this.loadMostSoldRecipes(yearlyDate.value, this.limit);
  }

  loadMostSoldRecipes(year: string, limit?: string) {
    this.data = [];
    this.labels = [];
    this.recipeService
      .getMostSoldRecipesByYear(year, limit)
      .subscribe(response => {
        if (!response.data) return;
        this.data = response.data.map(recipe => {
          this.labels.push(recipe.recipe_name);
          return { value: recipe.quantity, name: recipe.recipe_name };
        });
      });
  }
}
