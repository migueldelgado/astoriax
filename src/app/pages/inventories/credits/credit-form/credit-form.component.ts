import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { CreditService } from '../../../../@core/data/credit.service';
import { PurchaseService } from 'app/@core/data/purchase.service';
import { NgForm } from '@angular/forms';
import { getDateStringByDate, stringToDate } from 'app/@core/utils/dateUtils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseSearchModalComponent } from './purchase-search-modal.component';

@Component({
  selector: 'ngx-credit-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.scss'],
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
    amount: '0',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private creditService: CreditService,
    private purchaseService: PurchaseService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    // if (!this.hasPermission('PSS')) {
    //   this.router.navigate(['/pages']);
    //   return;
    // }

    this.route.queryParams.subscribe(params => {
      this.purchaseService.getPurchases({ isPaid: 0 }).subscribe(purchases => {
        this.purchases = purchases;
      });

      if (Object.keys(params).length) {
        this.id = params.id;
        this.date.jsdate = stringToDate(params.date);
        this.data.amount = params.amount;
        this.data.date = params.date;
        this.data.document_number = params.document_number;
        this.data.purchase_id = params.purchase_id;
        this.data.purchase_number = params.purchase_number;
      }
    });
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
      amount: this.data.amount,
    };

    if (this.id) {
      this.creditService.update(this.id, params).subscribe(() => {
        this.navigateToParent();
      });
    } else {
      this.creditService.create(params).subscribe(() => {
        this.navigateToParent();
      });
    }
  }

  navigateToParent() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onClickSearchPurchase() {
    const activeModal = this.modalService.open(PurchaseSearchModalComponent, {
      size: 'lg',
      container: 'nb-layout',
    });

    activeModal.componentInstance.purchases = this.purchases;

    activeModal.result.then(result => {
      if (result && result.document_number) {
        this.data.purchase_id = result.id;
        this.data.purchase_number = result.document_number;
      }
    });
  }
}
