import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { valuePrepareFunction } from '../../../@core/utils/utils';

@Component({
  styles: [
    `
      table {
        margin-top: 1rem;
      }

      .table-close {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.25s ease-out;
      }

      .table-open {
        max-height: 600px;
        transition: max-height 0.25s ease-in;
      }
    `,
  ],
  template: `
    <a
      *ngIf="rowData.credit_notes.length"
      (click)="onClickValueCell($event)"
      href="#"
      >{{ renderValue }}
    </a>

    <div [ngClass]="{ 'table-close': !showTable, 'table-open': showTable }">
      <table>
        <tr>
          <th>Num. Nota</th>
          <th>Monto</th>
        </tr>
        <tr *ngFor="let creditNote of rowData.credit_notes">
          <td>{{ creditNote.credit_number }}</td>
          <td>{{ formatCurrency(creditNote.credit_amount) }}</td>
        </tr>
      </table>
    </div>

    <div *ngIf="rowData.credit_notes.length === 0" style="text-align:center">
      --
    </div>
  `,
})
export class CreditRenderComponent implements ViewCell, OnInit {
  renderValue: string;
  showTable: boolean;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue =
      Number(this.value) === 0 ? '0' : valuePrepareFunction(this.value);
  }

  onClickValueCell(evt) {
    evt.preventDefault();
    this.showTable = !this.showTable;
  }

  formatCurrency(amount) {
    return valuePrepareFunction(amount);
  }
}
