import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { valuePrepareFunction } from 'app/@core/utils/utils';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  template: `
    <div class="modal-header">
      <span>Listado Facturas de Compra Pendientes</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ng2-smart-table
        [settings]="settings"
        [source]="source"
        (userRowSelect)="onClickPurchase($event)"
      ></ng2-smart-table>
    </div>
  `,
})
export class PurchaseSearchModalComponent {
  @Input() public purchases;

  source: LocalDataSource = new LocalDataSource();
  settings = {
    noDataMessage: 'No hay informacion disponible',
    actions: false,
    columns: {
      document_number: { title: 'Numero de Factura' },
      supplier: { title: 'Proveedor' },
      date: { title: 'Fecha' },
      amount: { title: 'Monto', valuePrepareFunction },
      is_paid: {
        title: 'Estado',
        valuePrepareFunction: value => (value === 0 ? 'PENDIENTE' : 'PAGADA'),
      },
    },
  };

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.source.load(this.purchases);
  }

  closeModal() {
    this.activeModal.close();
  }

  onClickPurchase(evt) {
    this.activeModal.close(evt.data);
  }
}
