import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { CreditService } from '../../../../@core/data/credit.service';
import { PurchaseService } from 'app/@core/data/purchase.service';
import { NgForm } from '@angular/forms';
import { getDateStringByDate, stringToDate } from 'app/@core/utils/dateUtils';

@Component({
  selector: 'ngx-credit-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.scss']
})
export class CreditFormComponent implements OnInit {
    id: number;
    date = { jsdate: new Date() };
    purchases: any[];
  
    options: INgxMyDpOptions = {
        dateFormat: 'dd-mm-yyyy',
    };
  
    data: any = {
        purchase_id: '',
        date: '',
        document_number: '',
        amount: '0'
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private creditService: CreditService,
        private purchaseService: PurchaseService
    ) {}

    ngOnInit() {
        // if (!this.hasPermission('PSS')) {
        //   this.router.navigate(['/pages']);
        //   return;
        // }

        this.route.params.subscribe(params => {
            if (params.id) {
                this.init(params.id);
            } else {
                this.init();
            }
            
        });
    }

    init(id?: number) {
        const params = {
            isPaid: 0
        };
        this.purchaseService.getPurchases(params)
            .subscribe(purchases => {
                this.purchases = purchases;
            });
        if (id) {
            this.id = id;
            this.creditService.find(id).subscribe((credit: any) => {
                this.date.jsdate = stringToDate(credit.data.date);
                this.data.amount = credit.data.amount;
                this.data.date = credit.data.date;
                this.data.document_number = credit.data.document_number;
                this.data.purchase_id = 67;
                console.log(credit.data.purchase_id);
            });
        }
    }

    cancel() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            alert('Todos los campos son requeridos');
            return;
        }

        let params = {
            date: getDateStringByDate(this.date.jsdate),
            document_number: this.data.document_number,
            purchase_id: this.data.purchase_id,
            amount: this.data.amount
        };

        if (this.id) {
            this.creditService.update(this.id, params).subscribe(() => {

            });    
        } else {
            this.creditService.create(params).subscribe(() => {
                this.router.navigate(['..'], { relativeTo: this.route });
            });
        }

    }

}
