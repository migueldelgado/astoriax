import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { ClassificationService } from '../../../classification/classification.service';
import { TreasuryService } from '../treasury.service';
import { SupplierService } from '../../../../@core/data/supplier.service';
import { PurchaseService } from '../../../../@core/data/purchase.service';
import { NbAuthService } from '../../../../auth/services';
import { getDateStringByDate } from '../../../../@core/utils/dateUtils';
import { getToasterSettings } from '../../../../@core/utils/toasterUtil';
import { ToasterService } from 'angular2-toaster';

import { TYPEOFMOVEMENT, TYPEOFMOVEMENTARRAY } from '../../../../constants/type-of-movement';
import { TYPEOFPAYMENTS } from '../../../../constants/type-of-payment';
import { CLASSIFICATION } from '../../../../constants/classification';

import 'style-loader!angular2-toaster/toaster.css';
import { Observable } from 'rxjs';

@Component({
    selector: 'ngx-treasury-form',
    templateUrl: './treasury-form.component.html'
})

export class TreasuryFormComponent implements OnInit {

    options: INgxMyDpOptions = {
        dateFormat: 'dd-mm-yyyy',
    };

    transferTypes: Array<any>;

    statusOptions: Array<any> = [
        { code: 1, name: "ACTIVO" },
        { code: 0, name: "INACTIVO" }
    ];
  
    classifications: Array<any>;
    suppliers: Array<any> = [];
    purchases: Array<any> = [];
    paymentTypes: Array<any>;
    paymentTypesByPayment: Array<any>;
    paymentRecord: String;
    checkNumber: String;
    userStores: Array<any>;

    /* NG-MODELS */
    selectedStore: Number;
    selectedSupplier: Number;
    selectedClassification: any;
    selectedTransferType: any;
    selectedStatus: any = this.statusOptions[0].code;
    selectedPaymentType: any;

    date = { jsdate: new Date() };
    reason: any;
    amount: any;
    config: any;
    loading = true;

    TYPEOFMOVEMENT: any;
    TYPEOFPAYMENTS: any;
    CLASSIFICATION: any;
  
    constructor(
      private classificationService: ClassificationService,
      private treasuryService: TreasuryService,
      private supplierService: SupplierService,
      private purchaseService: PurchaseService,
      private toasterService: ToasterService,
      private authService: NbAuthService,
      private route: ActivatedRoute,
      private router: Router
    ) {
        this.transferTypes = TYPEOFMOVEMENTARRAY;
        this.selectedTransferType = this.transferTypes[0].CODE;
        this.TYPEOFMOVEMENT = TYPEOFMOVEMENT;
        this.TYPEOFPAYMENTS = TYPEOFPAYMENTS;
        this.CLASSIFICATION = CLASSIFICATION;
    }

    ngOnInit() {
        this.getClassification();
        this.getPaymentTypes();
        this.getSuppliers();
    }

    onChangeSuppliers() {
        this.getPurchases();
    }

    onChangeTransferType() {
        this.setPaymentTypes();
    }

    onCancel() {
        this.redirectToTreasury();
    }

    onSelectPurchase(purchase) {
        this.amount = this.purchases.reduce((accumulator, currentValue) => {
            if (currentValue.selected)
                return accumulator + currentValue.amount
            return accumulator
        }, 0).toString()
    }

    isSuppliersSelected() {
        return (
            this.selectedTransferType === this.TYPEOFMOVEMENT.EGRESO.CODE &&
            this.selectedClassification === this.CLASSIFICATION.COSTOVARIABLE.PROVEEDOR.ID
        )
    }

    checkPurchases() {
        return this.isSuppliersSelected() ? !this.purchases.some(p => p.selected) : false;
    }
  
    getClassification() {
      this.classificationService.getClassifications()
        .subscribe((data: any) => {
          this.classifications = data;
          this.selectedClassification = data[0].id;
          this.loading = false;
        })
    }
  
    getPaymentTypes() {
      this.classificationService.getPaymentTypes()
        .subscribe((data: any) => {
          this.paymentTypes = data;
          this.setPaymentTypes();
          this.loading = false;
        })
    }

    setPaymentTypes() {
        this.paymentTypesByPayment = this.paymentTypes.filter(value => value.type === this.selectedTransferType);
        this.selectedPaymentType = this.paymentTypesByPayment[0].id;
    }

    getSuppliers() {
        this.supplierService.getSuppliers()
            .subscribe((suppliers: any) => {
                this.suppliers = suppliers;
                this.selectedSupplier = suppliers[0].id;
                this.getPurchases();
            })
    }

    getPurchases() {
        const params = { supplierId: this.selectedSupplier }

        this.purchaseService.getPurchases(params)
            .subscribe((purchases: any) => {
                this.purchases = purchases.filter(p => !p.is_paid);
                this.loading = false;
            })
    }

    getPurchasesSelected() {
        return this.purchases.filter(purchase => purchase.selected);
    }

    redirectToTreasury() {
        this.router.navigate([`../`], { relativeTo: this.route });
    }

    async onSubmit() {
        const listOfServices = [];

        let params: any = {
            date: getDateStringByDate(this.date.jsdate),
            transfer_type: this.selectedTransferType,
            paymenttype_id: this.selectedPaymentType,
            reason: this.reason,
            amount: Number(this.amount.replace(/\D+/g, ''))
        };

        if (this.selectedTransferType === TYPEOFMOVEMENT.EGRESO.CODE) {
            params.classification_id = this.selectedClassification;
            params.status = this.selectedStatus;
            if (this.selectedPaymentType === TYPEOFPAYMENTS.GIROCHEQUE.ID) {
                params.cheque_number = this.checkNumber;
            }
            if (this.selectedClassification === this.CLASSIFICATION.COSTOVARIABLE.PROVEEDOR.ID) {
                for(const purchase of this.getPurchasesSelected()) {
                    listOfServices.push(
                        this.purchaseService.update(purchase.id, {
                            amount_paid: purchase.amount,
                            is_paid: 1
                        })
                    )
                }
            }
        }

        if (listOfServices.length) {
            listOfServices.push(this.treasuryService.saveTreasuries(params))
            Observable.forkJoin(listOfServices).subscribe(
                results => this.redirectToTreasury(),
                error => this.showToast(error.message)
            )
        } else {
            this.treasuryService.saveTreasuries(params)
            .subscribe(
                treasury => this.redirectToTreasury(),
                error => this.showToast(error.message)
            );
        }
    }

    private showToast(params) {
        const { config, toast } = getToasterSettings(params);
        this.config = config;
        this.toasterService.popAsync(toast);
    }

}