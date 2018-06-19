///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {SupplyService} from '../../../@core/data/supply.service';
import {StoreService} from '../../../@core/data/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../../@core/data/recipe.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {AppConfig} from '../../../app.config';
import {LoanService} from '../../../@core/data/loan.service';
import {NbAuthService} from '../../../auth/services';

@Component({
  selector: 'ngx-supply-form',
  templateUrl: './loan-form.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class LoanFormComponent implements OnInit {
  id: string;
  supplies: Array<any> = [];
  stores: Array<any> = [];
  totalCost: number = 0;
  data = {
    targetStoreId: null,
    loanType: null,
    supplies: [],
  };

  options: INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };
  date = {
    jsdate: new Date(),
    formatted: null,
  };


  constructor(private loanService: LoanService,
              private supplyService: SupplyService,
              private storeService: StoreService,
              private authService: NbAuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    Observable.forkJoin(this.storeService.getAll(), this.supplyService.getAll())
      .subscribe((result: any) => {
        this.stores = result[0];
        this.supplies = result[1];
        this.loadLoanData();
      })

  }

  loadLoanData() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.id = params.id;
      this.loanService.find(this.id)
        .subscribe((result) => {
          const data = result.data;
          const [day, month, year] = data.date.split('/');
          this.date.jsdate = new Date(year, parseInt(month, 10) - 1, day);
          this.data.loanType = data.loan_type.id_loan_type;
          this.data.targetStoreId = data.loan_type.id_loan_type === '1' ?
            data.store_to.id_store : data.store_from.id_store;
          this.data.supplies = data.supply_list.map((s) => ({
            quantity: s.quantity,
            id_supply: s.supply.id_supply,
          }))
        })
    });
  }

  addSupply(e) {
    e.preventDefault();
    this.data.supplies.push({
      id_supply: null,
      quantity: '1',
    });
  }

  removeSupply(i) {
    this.data.supplies = [...this.data.supplies.slice(0, i), ...this.data.supplies.slice(i + 1)];
  }

  cancel() {
    this.router.navigate(['/pages/inventories/loan']);
  }

  onSubmit() {
    const data = {
      id_loan_type: this.data.loanType,
      id_store_from: this.data.loanType === '1' ? this.authService.getCurrentStore() : this.data.targetStoreId,
      id_store_to: this.data.loanType !== '2' ? this.data.targetStoreId : this.authService.getCurrentStore(),
      supplies: this.data.supplies,
      date: this.date.formatted,
      id_loan: this.id,
    };
    if (this.id) {
      this.update(data)
    } else {
      this.save(data)
    }
  }

  save(data) {
    this.loanService.create(data)
      .subscribe((result) => {
        this.cancel()
      }, (error) => {
        const err = JSON.parse(error._body);
        alert(err.message);
      });
  }

  update(data) {
    this.loanService.update(this.id, data)
      .subscribe((result) => {
        this.cancel()
      }, (error) => {
        const err = JSON.parse(error._body);
        alert(err.message);
      });
  }
}
