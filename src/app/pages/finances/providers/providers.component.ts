import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProviderDetailComponent } from '../modal/provider-detail.component';
import { numberWithCommas, valuePrepareFunction } from '../../../@core/utils/utils';
import { SupplierService } from '../../../@core/data/supplier.service';


@Component({
  selector: 'ngx-providers-table',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  total: any;
  tax: any;
  source: LocalDataSource = new LocalDataSource();

  settings = {
    mode: 'external',
    noDataMessage:'No hay informacion disponible',
    actions: {
      columnTitle: '',
      add: false,
      delete: false,
      position: 'right'
    },
    edit: {
      editButtonContent: '<i class="nb-search"></i>',
      confirmSave: true,
    },
    columns: {
      name: { title: '' },
      month1: { title: 'Enero', valuePrepareFunction },
      month2: { title: 'Febrero', valuePrepareFunction },
      month3: { title: 'Marzo', valuePrepareFunction },
      month4: { title: 'Abril', valuePrepareFunction },
      month5: { title: 'Mayo', valuePrepareFunction },
      month6: { title: 'Junio', valuePrepareFunction },
      month7: { title: 'Julio', valuePrepareFunction },
      // month8: { title: 'Agosto', valuePrepareFunction },
      // month9: { title: 'Septiembre', valuePrepareFunction },
      // month10: { title: 'Octubre', valuePrepareFunction },
      // month11: { title: 'Noviembre', valuePrepareFunction },
      // month12: { title: 'Diciembre', valuePrepareFunction },
      
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    const year = new Date().getFullYear();
    this.loadData(year);
  }

  loadData(year){
    this.supplierService.getSupplierInvoicesByYear(year)
      .subscribe(results => {
        this.total = results.total;
        this.tax = Math.trunc(this.total * 0.19);
        this.source.load(results.purchasesBySupplier);
      });
  }

  onClickView(evt) {
    const activeModal = this.modalService.open(ProviderDetailComponent, {
      size: 'lg',
      //container: 'nb-layout',
      windowClass: 'modal-xxl',
    });
    activeModal.componentInstance.initialize(evt.data.supplier_id);
    // activeModal.componentInstance.OnInit
  }

  numberWithCommas(val){
    return numberWithCommas(val);
  }

  getReportPDF(){
    let params = {
      year: new Date().getFullYear()
    }

    this.supplierService.getTotalInvoicesReport(params)
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
