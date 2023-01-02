import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs/observable/of';

import { ThemeModule } from '../../../@theme/theme.module';

import { RecipeFormComponent } from './recipe-form.component';
import { RecipeService } from 'app/@core/data/recipe.service';
import { SupplyService } from 'app/@core/data/supply.service';
import { NbAuthService } from 'app/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { RecipesTableComponent } from '../recipes-table/recipes-table.component';
import { ProductsComponent } from '../products.component';
import { SuppliesTableComponent } from '../supplies-table/supplies-table.component';
import { SupplyFormComponent } from '../supply-form/supply-form.component';

@Component({ template: '' })
class DummyComponent{}

const routes = [{
  path: '',
  component: ProductsComponent,
  children: [
    { path: 'recipes', component: RecipesTableComponent }, 
    { path: 'recipes/new', component: RecipeFormComponent },
    { path: 'recipes/edit/:id', component: RecipeFormComponent }
  ],
}];

describe('ProvidersComponent', () => {
  let component: RecipeFormComponent;
  let fixture: ComponentFixture<RecipeFormComponent>;
  let recipeServiceMock: any;
  let supplyServiceMock: any;
  let authServiceMock: any;
  let router: Router;
  let activateRoute: ActivatedRoute;
  let location: Location;

  beforeEach(async(() => {
    supplyServiceMock = jasmine.createSpyObj('SupplyService', ['getSuppliesByStore']);
    authServiceMock = jasmine.createSpyObj('NbAuthService', ['hasPermission']);
    recipeServiceMock = jasmine.createSpyObj(
      'RecipeService',
      [
        'findRecipe',
        'createRecipe',
        'updateRecipe'
      ]
    );

    recipeServiceMock.findRecipe.and.returnValue(of({data: {
      stores: [{name: 'Store1'}],
      supplies: []
    }}));
    recipeServiceMock.createRecipe.and.returnValue(of([]));
    recipeServiceMock.updateRecipe.and.returnValue(of([]));
    supplyServiceMock.getSuppliesByStore.and.returnValue(of([]));
    authServiceMock.hasPermission.and.returnValue(true);

    //spyOn(apiService, 'fetchData').and.returnValue(Promise.resolve(promisedData));

    TestBed.configureTestingModule({
      declarations: [ RecipeFormComponent ],
      // schemas: [NO_ERRORS_SCHEMA],
      imports: [
        ThemeModule,
        RouterTestingModule
        // .withRoutes(routes)
      ],
      providers: [
        { provide: RecipeService, useValue: recipeServiceMock },
        { provide: SupplyService, useValue: supplyServiceMock },
        { provide: NbAuthService, useValue: authServiceMock },
        // { provide: ActivatedRoute, useValue: { params: of({id: 123}) }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    activateRoute = TestBed.get(ActivatedRoute);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(RecipeFormComponent);
    component = fixture.componentInstance;
  });

  it('Should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('Should redirect to /pages when no permission', () => {
      authServiceMock.hasPermission.and.returnValue(false);
      spyOn(router, 'navigate');
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledWith(['/pages']);
    })

    // it('Should change route to pages', () => {
    //   authServiceMock.hasPermission.and.returnValue(false);
    //   fixture.detectChanges();
    //   const location = TestBed.get(Location);
    //   expect(location.path()).toBe('pages');
    // })

    it('Should call getSuppliesByStore at the start', () => {
      const response = [{ id: 2, name: 'Juan' }];
      supplyServiceMock.getSuppliesByStore.and.returnValue(of(response));
      activateRoute.params = of({id: 123});

      fixture.detectChanges();

      expect(supplyServiceMock.getSuppliesByStore).toHaveBeenCalled();
      expect(component.supplies).toEqual(response);
      expect(component.id).toBe(123);
    });
  });

  describe('Adding a new recipe', () => {
    it('Should start with 3 button at the start', () => {
      fixture.detectChanges();
      const compile = fixture.debugElement.nativeElement;
      const buttons = compile.querySelectorAll('button');
      expect(buttons.length).toBe(3);
    })

    it('Should navigate back to recipes page when click cancel', () => {
      fixture.detectChanges();
      const compile = fixture.debugElement.nativeElement;
      const buttons: HTMLButtonElement = compile.querySelector('.btn-cancel');
      buttons.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('/');
      });
    })
  });

});
