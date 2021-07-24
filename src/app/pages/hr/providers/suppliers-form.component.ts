import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SupplierService } from '../../../@core/data/supplier.service';

@Component({
  selector: 'ngx-suppliers-form',
  templateUrl: './suppliers-form.component.html'
})
export class SuppliersFormComponent {
  supplierId;
  supplier: {
    id: string;
    rut: string;
    name: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    bank: string;
    account: string;
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private supplierService: SupplierService
  ) {}

  ngOnInit() {
    this
      .route
      .params
      .subscribe(params => {
        if (params.id) {
          this.supplierId = params.id;
          this.loadSupplier();
        }
      });
  }

  loadSupplier() {
    this.supplierService.findSupplier(this.supplierId)
      .subscribe(supplier => {
        this.supplier = {
          id: supplier.data.id,
          rut: supplier.data.rut,
          name: supplier.data.name,
          address: supplier.data.address,
          city: supplier.data.city,
          email: supplier.data.email,
          phone: supplier.data.phone,
          bank: supplier.data.bank,
          account: supplier.data.account
        };
      });
  }

  onClickSave(form: NgForm) {
    const action = 
      this.supplierId ? 
        this.supplierService.update(this.supplier) :
        this.supplierService.create(this.supplier);

    action.subscribe(
      () => this.redirectToSuppliers(),
      () => alert('Problemas al ingresar proveedor')
    );
  }

  onClickCancel() {
    this.redirectToSuppliers()
  }

  redirectToSuppliers() {
    this.router.navigate(
      ['../'],
      { relativeTo: this.route }
    );
  }
}
