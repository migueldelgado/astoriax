import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import { valuePrepareFunction } from '../../../@core/utils/utils';
import { SupplierService } from '../../../@core/data/supplier.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-provider-detail-modal',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.scss']
})
export class ProviderDetailComponent {

  source: LocalDataSource = new LocalDataSource();
  suppliers: any[];
  supplierSelected: any;
  yearSelected: any;
  monthSelected: any;
  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    monthSelector: true,
    yearSelector: true,
  };

  settings = {
    hideSubHeader: true,
    noDataMessage:'No hay informacion disponible',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    actions: { delete: false, add: false, edit: false },
    columns: {
      document_number: { 
        title: 'Factura', 
        // valuePrepareFunction: (val) => {
        //   return val === 'F' ? 'FACTURA' : 'NOTA DE CREDITO'
        // }
      },
      date: { title: 'Fecha' },
      status: { title: 'Estado' },
      payment_record: { title: 'Registro de pago'},
      amount: { title: 'Monto', valuePrepareFunction},
    },
  };

  constructor(
    private activeModal: NgbActiveModal,
    private supplierService: SupplierService,  
  ) { }

  initialize(supplieId){
      this.monthSelected = (new Date().getMonth() + 1);
      this.yearSelected = new Date().getFullYear();
      this.supplierSelected = supplieId;
      this.loadData();
  }

  loadData(){
    this.supplierService.getSuppliers()
      .subscribe((result:any) => {
        this.suppliers = result;
        this.getInvoices();
      });
  }

  getInvoices(){
    const params = { 
      supplier_id: this.supplierSelected,
      year: this.yearSelected, 
      month: this.monthSelected 
    }

    this.supplierService.getInvoicesBySupplier(params)
      .subscribe((result:any) => {
        this.source.load(result.invoices);
      });
  }

  onUpdate() {
    this.getInvoices();
  }

  closeModal() {
    this.activeModal.close();
  }

  getReportPDF(){
    let params = {
      year: this.yearSelected,
      month: this.monthSelected,
      supplier_id: this.supplierSelected
    }

    this.supplierService.getInvoicesReport(params)
      .subscribe(
        (result: any) => {
          window.open(result.data.path, '_blank');
        }, 
        () => {
          alert('Error al generar reporte')
        }
      )
  }

}
