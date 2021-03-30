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

import 'style-loader!angular2-toaster/toaster.css';

@Component({
    selector: 'ngx-treasury-form',
    templateUrl: './treasury-form.component.html'
})

export class TreasuryFormComponent implements OnInit {

    date = { jsdate: new Date() };
    options: INgxMyDpOptions = {
      dateFormat: 'dd-mm-yyyy',
    };

    transferTypes: Array<any> = [
        { code: "I", name: "INGRESO" },
        { code: "E", name: "EGRESO" }
    ];

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
    selectedStore: Number;
    selectedSupplier: Number;
    selectedClassification: any;
    selectedTransferType: any = this.transferTypes[0].code;
    selectedStatus: any = this.statusOptions[0].code;
    selectedPaymentType: any;
    showIncomeLayout: boolean = true;
    showSuppliers: boolean = false;
    showAmount: boolean = true;
    showChequeNumber: boolean = false;
    reason: any;
    amount: any;
    config: any;
    loading = true;
    totalPurchases: any;
  
    constructor(
      private classificationService: ClassificationService,
      private treasuryService: TreasuryService,
      private supplierService: SupplierService,
      private purchaseService: PurchaseService,
      private toasterService: ToasterService,
      private authService: NbAuthService,
      private route: ActivatedRoute,
      private router: Router
    ) {}

    ngOnInit() {
        this.getClassification();
        this.getPaymentTypes();
        this.getUserStores();
    }

    onChangeStore() {
        if (this.showSuppliersInput() || (this.suppliers.length > 0)) {
            this.getSuppliers();
        }
    }

    onChangeTransferType() {
        this.showIncomeFields()
        // if (!this.showIncomeFields() && this.showSuppliersInput()) {
        //     this.onChangeStore();
        // };
        this.setPaymentTypes();
        this.showChequeNumberInput();
    }

    onChangePaymentType() {
        this.showChequeNumberInput();
    }

    onChangeClassification() {
        if (this.showSuppliersInput()) {
            this.getSuppliers();
        }
        this.showAmountInput();
    }

    onChangeSuppliers() {
        this.getPurchases();
    }

    onCancel() {
        this.redirectToTreasury();
    }

    showIncomeFields() {
        this.showIncomeLayout = this.selectedTransferType == 'I';
        return this.showIncomeLayout;
    }

    showChequeNumberInput() {
        this.showChequeNumber = ((this.selectedPaymentType == 12) && (!this.showIncomeLayout)); // GIRO CHEQUE
        return this.showChequeNumber;
    }

    showSuppliersInput() {
        this.showSuppliers = ((this.selectedClassification == 8) && (!this.showIncomeLayout));
        return this.showSuppliers;
    }

    showAmountInput() {
        this.showAmount = !this.showSuppliersInput();
        console.log(this.showAmount);
        return this.showAmount;
    }

    getUserStores() {
        this.userStores = this.authService.getUserStores();
        this.selectedStore = this.userStores[0].id;
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
        this.paymentTypesByPayment = this.paymentTypes.filter(value => value.type == this.selectedTransferType);
        this.selectedPaymentType = this.paymentTypesByPayment[0].id;
    }

    getSuppliers() {
        this.supplierService.getSuppliers()
            .subscribe((suppliers: any) => {
                this.suppliers = suppliers;
                this.selectedSupplier = suppliers[0].id;
                this.showSuppliers = true;

                this.getPurchases();
            })
    }

    getPurchases() {
        const params = {
            supplierId: this.selectedSupplier
        }

        this.purchaseService.getPurchases(params)
            .subscribe((purchases: any) => {
                this.purchases = purchases.filter(p => p.amount !== p.amount_paid);
                if (this.purchases.length) {
                    this.totalPurchases = 
                        this.purchases.reduce((a, b) => a + (b.amount - b.amount_paid), 0)
                    console.log(this.totalPurchases);
                }
                
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
        const message = this.validation();
        if (message){
            this.showToast({ message });
            return false;
        }

        let isPurchaseFail;

        let params: any = {
            transfer_type: this.selectedTransferType,
            paymenttype_id: this.selectedPaymentType,
            date: getDateStringByDate(this.date.jsdate),
            reason: this.reason,
            amount: this.amount
        };

        if (!this.showIncomeFields()) {
            params.classification_id = this.selectedClassification;
            params.status = this.selectedStatus;
            if (this.showChequeNumberInput()) { // GIRO CHEQUE
                params.cheque_number = this.checkNumber;
            }
            if (this.showSuppliersInput()) {

                for(const purchase of this.getPurchasesSelected()) {
                    if (purchase.amount_paid === 0) {
                        const data = {
                            amount_paid: purchase.amount
                        };
                        debugger
                        const result = await this.purchaseService.update(purchase.id, data).toPromise();
                        return false;
                    } else return true
                }

                params.supplier_id = this.selectedSupplier;
                params.payment_record = this.paymentRecord;
                params.purchases = this.getPurchasesSelected();
            }
        }
        debugger
        if (isPurchaseFail) {
            this.showToast({});
            return;
        }

        this.treasuryService.saveTreasuries(params)
            .subscribe(
                treasury => this.redirectToTreasury(),
                error => this.showToast({})
            );
    }

    validation(): string {
        if (!this.reason) {
            return 'Debes ingresar el motivo';
        }
        if (!this.date) {
            return 'Debes ingresar fecha';
        }
        if (!this.showSuppliers && !this.amount) {
            if (!this.amount) return 'Debes ingresar el monto';
        }

        if (this.showIncomeFields()) { //INGRESOS
            
        } else { //EGRESOS
            if (this.showChequeNumberInput() && !this.checkNumber) {
                return 'Debes ingresar el numero de cheque';
            }
            if (this.showSuppliersInput()) {
                const purchasesSelected = this.getPurchasesSelected();
                if (purchasesSelected.length == 0) return 'No ha seleccionado ninguna factura para pagar';
                
            }
        }
        return null;
    }

    private showToast(params) {
        const { config, toast } = getToasterSettings(params);
        this.config = config;
        this.toasterService.popAsync(toast);
    }

}