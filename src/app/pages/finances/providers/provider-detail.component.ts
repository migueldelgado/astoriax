import { Component } from '@angular/core';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { valuePrepareFunction } from '../../../@core/utils/utils';
import { SupplierService } from '../../../@core/data/supplier.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditRenderComponent } from './credit-render.component';
import { DateHelper } from 'app/helpers/date-helper';

@Component({
  selector: 'ngx-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.scss'],
})
export class ProviderDetailComponent {
  supplierId;
  invoices;
  source: LocalDataSource = new LocalDataSource();
  suppliers: any[];
  supplierSelected: any;
  yearSelected: any;
  monthSelected: any;
  years: { value: number; label: string }[];
  dateTo = { jsdate: new Date() };
  options: INgxMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    monthSelector: true,
    yearSelector: true,
  };

  isPaidSelected;

  settings = {
    hideSubHeader: true,
    noDataMessage: 'No hay informacion disponible',
    actions: false,
    columns: {
      id: { title: 'Codigo' },
      document_number: { title: 'No Factura' },
      date: { title: 'Fecha' },
      purchase_amount: { title: 'Monto', valuePrepareFunction },
      total_credit: {
        type: 'custom',
        title: 'Notas de Credito',
        renderComponent: CreditRenderComponent,
      },
      balance: { title: 'Saldo', valuePrepareFunction },
      is_paid: {
        title: 'Estado',
        valuePrepareFunction: status => (status === 0 ? 'PENDIENTE' : 'PAGADO'),
      },
    },
  };

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router,
    private dateHelper: DateHelper,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.supplierId = params.id;
        this.loadData(params.id);
      }
    });
  }

  loadData(supplyId) {
    this.monthSelected = this.dateHelper.getCurrentMonth();
    this.yearSelected = new Date().getFullYear();
    this.supplierSelected = supplyId;
    this.isPaidSelected = '';

    this.years = [
      { value: this.yearSelected, label: this.yearSelected },
      { value: this.yearSelected - 1, label: this.yearSelected - 1 },
      { value: this.yearSelected - 2, label: this.yearSelected - 2 },
    ];

    this.supplierService.getSuppliers().subscribe((result: any) => {
      this.suppliers = result;
      this.loadPurchases();
    });
  }

  loadPurchases() {
    this.supplierService
      .getInvoicesBySupplier(
        this.supplierSelected,
        this.yearSelected,
        this.monthSelected,
        this.isPaidSelected,
      )
      .subscribe((purchases: any) => {
        this.invoices = purchases;
        this.source.load(purchases);
      });
  }

  onUpdate() {
    this.loadPurchases();
  }

  cancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  getReportPDF() {
    this.supplierService
      .getInvoicesReport(
        this.supplierSelected,
        this.yearSelected,
        this.monthSelected,
        this.isPaidSelected,
      )
      .subscribe(
        (result: any) => {
          window.open(result.data.path, '_blank');
        },
        () => {
          alert('Error al generar reporte');
        },
      );
  }
}
