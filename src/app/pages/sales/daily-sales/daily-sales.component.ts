import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DailySalesService } from '../../../@core/data/daily-sales.service';

@Component({
  selector: 'ngx-daily-sales-table',
  templateUrl: './daily-sales.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
      nb-card-body {
        min-height: 400px;
      }
      table {
        line-height: 1.5em;
        border-collapse: collapse;
        border-spacing: 0;
        display: table;
        width: 100%;
        max-width: 100%;
        overflow: auto;
        word-break: normal;
        word-break: keep-all;
      }
      table tr td:first-child {
        width: 15%;
      }
      table tr td {
        position: relative;
        padding: 0.875rem 1.25rem;
        border: 1px solid #342e73;
        vertical-align: middle;
      }
      table th {
        position: relative;
        padding: 0.875rem 1.25rem;
        border: 1px solid #342e73;
        vertical-align: middle;
        padding: 0.875rem 1.25rem;
        padding-right: 1.75rem;
        font-family: Exo;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.25;
        color: #ffffff;
      }
      table th:first-child {
        width: 15%;
      }
      table .btn-icon {
        padding: 0.25rem 0.5rem !important;
      }
      tr.selected {
        background-color: rgba(0, 255, 170, 0.25);
      }
    `,
  ],
})
export class DailySalesComponent implements OnInit {
  editing = {
    sales_cashier1: false,
    sales_cashier2: false,
    invoice1: false,
    invoice2: false,
    cash1: false,
    cash2: false,
    null_invoice1: false,
    null_invoice2: false,
    total_transbank_cred1: false,
    total_transbank_cred2: false,
    total_transbank_deb1: false,
    total_transbank_deb2: false,
    invoice_to_pay1: false,
    invoice_to_pay2: false,
    junaeb_edenred1: false,
    junaeb_edenred2: false,
    junaeb_sodexo1: false,
    junaeb_sodexo2: false,
  };

  base: any = {
    sales_cashier1: '0',
    sales_cashier2: '0',
    invoice1: '0',
    invoice2: '0',
    cash1: '0',
    cash2: '0',
    null_invoice1: '0',
    null_invoice2: '0',
    total_transbank_cred1: '0',
    total_transbank_cred2: '0',
    total_transbank_deb1: '0',
    total_transbank_deb2: '0',
    invoice_to_pay1: '0',
    invoice_to_pay2: '0',
    junaeb_edenred1: '0',
    junaeb_edenred2: '0',
    junaeb_sodexo1: '0',
    junaeb_sodexo2: '0',
  };
  current: any = {
    sales_cashier1: '0',
    sales_cashier2: '0',
    invoice1: '0',
    invoice2: '0',
    cash1: '0',
    cash2: '0',
    null_invoice1: '0',
    null_invoice2: '0',
    total_transbank_cred1: '0',
    total_transbank_cred2: '0',
    total_transbank_deb1: '0',
    total_transbank_deb2: '0',
    invoice_to_pay1: '0',
    invoice_to_pay2: '0',
    junaeb_edenred1: '0',
    junaeb_edenred2: '0',
    junaeb_sodexo1: '0',
    junaeb_sodexo2: '0',
  };

  totals: any = {
    sales_cashier_total: 0,
    invoice_total: 0,
    cash_total: 0,
    null_invoice_total: 0,
    total_transbank_cred_total: 0,
    total_transbank_deb_total: 0,
    invoice_to_pay1_total: 0,
    junaeb_edenred_total: 0,
    junaeb_sodexo_total: 0,
    dailyTotal: 0,
    dailyTotalNet: 0,
    dailyTotalNoJunaeb: 0,
    total1: 0,
    total2: 0,
  };

  keys: string[] = [];
  years: String[] = [];
  currentId: null;
  currentDate: '';
  year = new Date().getFullYear().toString();
  month = '01';
  dates: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private dailySalesService: DailySalesService,
  ) {
    const currentMonth = new Date().getMonth() + 1;
    this.month = currentMonth.toString();
    if (currentMonth < 10) {
      this.month = '0' + currentMonth;
    }
  }

  ngOnInit() {
    const d = new Date();
    const currentYear = d.getFullYear();
    for (let i = 0; i < 20; i++) {
      this.years.push((currentYear - i).toString());
    }
    this.loadDataForMonth();
  }

  loadDataForMonth(shouldFetch = true) {
    const daysInMonth = new Date(
      parseInt(this.year, 10),
      parseInt(this.month, 10),
      0,
    ).getDate();

    this.dailySalesService
      .getAllByMonth(`${this.year}-${this.month}`)
      .subscribe((result: any) => {
        const data = result.data || {};
        this.dates = [];
        for (let i = 1; i <= daysInMonth; i++) {
          const day = i > 10 ? i : `0${i}`;
          const key = `${this.year}-${this.month}-${day}`;
          if (data[key]) {
            this.dates[i - 1] = { ...data[key], date: key };
          } else {
            this.dates[i - 1] = { id: null, total: 0, date: key };
          }
        }
        const id = this.dates[0].id;
        if (!shouldFetch) {
          return;
        }
        if (id) {
          this.loadId(id);
        } else {
          this.currentId = null;
          this.currentDate = this.dates[0].date;
          this.calculateTotals({ ...this.base });
        }
      });
  }

  loadId(id) {
    this.currentId = id;
    this.dailySalesService.find(id).subscribe(d => {
      this.keys = Object.keys(d);
      this.currentDate = d.date;
      this.calculateTotals(d);
    });
  }

  onClickRow(id, date) {
    if (id) {
      if (this.currentId !== id) {
        this.loadId(id);
      }
      return;
    }
    this.currentId = null;
    this.currentDate = date;
    this.calculateTotals({ ...this.base });
  }

  calculateTotals(d) {
    let dailyTotal = 0;
    let total1 = 0;
    let total2 = 0;
    this.keys
      .filter(k => k.includes('1'))
      .forEach(key => {
        const baseKey = key.substring(0, key.length - 1);
        const key1 = baseKey + '1';
        const key2 = baseKey + '2';
        const keyTotal = baseKey + '_total';
        const n1 = Number.parseInt(d[key1]) || 0;
        const n2 = Number.parseInt(d[key2]) || 0;
        if (!key.includes('junaeb')) {
          total1 += n1;
          total2 += n2;
        }
        dailyTotal += n1 + n2;
        this.current[key1] = d[key1];
        this.current[key2] = d[key2];
        this.totals[keyTotal] = n1 + n2;
      });

    this.totals.dailyTotal = dailyTotal;
    this.totals.dailyTotalNet = Math.round(dailyTotal / 1.19);
    this.totals.dailyTotalNoJunaeb = total1 + total2;
    this.totals.total1 = total1;
    this.totals.total2 = total2;
  }

  onClickNumber($event, key) {
    $event.preventDefault();
    $event.stopPropagation();
    Object.keys(this.editing).forEach(k => {
      this.editing[k] = false;
    });
    this.editing[key] = true;
  }

  onClickOutside() {
    Object.keys(this.editing).forEach(k => {
      this.editing[k] = false;
    });
  }

  onSave() {
    const data = {
      ...this.current,
      date: this.currentDate,
      id: this.currentId || undefined,
    };

    let observable;
    if (this.currentId) {
      observable = this.dailySalesService.update(this.currentId, data);
    } else {
      observable = this.dailySalesService.create(data);
    }
    observable.subscribe(result => {
      const d = result.data || {};
      this.currentId = d.id;
      this.loadDataForMonth(false);
    });
  }

  onChange() {
    this.calculateTotals(this.current);
  }
}
