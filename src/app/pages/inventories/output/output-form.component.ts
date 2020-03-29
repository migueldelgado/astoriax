import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../../../@core/data/supply.service';
import { ActivatedRoute, Router } from '@angular/router';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { NbAuthService } from '../../../auth/services';
import { OutputService } from '../../../@core/data/output.service';
import { RecipeService } from '../../../@core/data/recipe.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-output-form',
  templateUrl: './output-form.component.html',
  styleUrls: ['./output-form.component.scss']
})
export class OutputFormComponent implements OnInit {

  id: number;
  storeId;
  output = { recipes: [], supplies: [] };
  showSales = true;
  types = [ 'Ventas', 'Bajas', 'Colacion' ];

  date = { jsdate: new Date(), };
  data = { type: this.types[0], supplies: [], recipes: [], };

  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
  };

  constructor(
    private supplyService: SupplyService,
    private outputService: OutputService,
    private recipeService: RecipeService,
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.storeId = this.authService.getCurrentStore();
  }

  ngOnInit() {
    if (!this.hasPermission('SAL')) {
      this.router.navigate(['/pages']);
      return;
    }

    this.route.params.subscribe(params => {
      if (params.id) this.id = params.id;
      this.loadData();
    });
  }

  loadData(){
    if (this.id > 0){
      //EDIT
      this.outputService.find(this.id).subscribe(({ data }: any) => {
        const d = new Date(data.date);
        this.date = {
          jsdate: new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000),
        };
        this.output.recipes = data.recipes;
        this.output.supplies = data.supplies;

        this.data.type = data.type;
    
        this.onChangeType(this.data.type);
        this.loadSupplyAndRecipes();
      });
    }else{
      //NEW
      this.loadSupplyAndRecipes();
    }
  }

  loadSupplyAndRecipes(){
    Observable.forkJoin(
      this.recipeService.getAll(),
      this.supplyService.getAll(),
    ).subscribe((result: Array<any>) => {   
      this.processData(result[0], result[1].data);
    });
  }

  processData(recipes, supplies){
    this.data.recipes = recipes.map(recipe => {
      const outputRecipe = this.output.recipes.find(rec => rec.id === recipe.id);

      let finalRecipe: any = {
        id: recipe.id,
        name: recipe.name,
        quantity: 0,
        reason: ''
      }
      
      if (outputRecipe){
        finalRecipe.quantity = outputRecipe.pivot.quantity;
        finalRecipe.reason = outputRecipe.pivot.reason;
      }
      return { ...finalRecipe };
    });


    this.data.supplies = supplies.map(supply => {
      const outputSupply = this.output.supplies.find(rec => rec.id === supply.id);
      let finalSupply: any = {
        id: supply.id,
        name: supply.name,
        quantity: 0,
        reason: ''
      }
      if (outputSupply){
        finalSupply.quantity = outputSupply.pivot.quantity;
        finalSupply.reason = outputSupply.pivot.reason;
      }
      return { ...finalSupply };
    });
  }

  onChangeType(type){
    if (type === 'Ventas') this.showSales = true;
    if (type === 'Bajas') this.showSales = false;
    if (type === 'Colacion') this.showSales = false;
  }

  onSubmit() {
    const dt = this.date.jsdate;
    const date = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;

    const data: any = {
      type: this.data.type,
      amount: 0,
      date,
    };

    if (data.type !== 'Ventas') {
      data.supplies = this.data.supplies
        .filter(d => parseInt(d.quantity, 10) > 0)
        .map(s => ({
          supply_id: s.id,
          quantity: s.quantity,
          reason: s.reason,
        }));
    }

    data.recipes = this.data.recipes
      .filter(d => parseInt(d.quantity, 10) > 0)
      .map(s => ({
        recipe_id: s.id,
        quantity: s.quantity,
        reason: s.reason,
      }));

    if (this.id && !this.hasPermission('MSAL')) {
      alert('No tienes permisos para editar inventarios');
      return;
    }

    if (!this.id && !this.hasPermission('ASAL')) {
      alert('No tienes permisos para agregar inventarios');
      return;
    }

    let observable: any;

    if (this.id > 0) {
      observable = this.outputService.update(this.id, { ...data, })
    }else{
      observable = this.outputService.create(data);
    }

    observable.subscribe(
      result => { this.cancel(); },
      () => { alert('Error al guardar inventario'); },
    );
  }

  cancel() {
    this.router.navigate(['/pages/inventories/outputs']);
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }
}
