import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  numberWithCommas,
  valuePrepareFunction,
} from '../../../@core/utils/utils';
import { SupplierService } from '../../../@core/data/supplier.service';
import { DateHelper } from 'app/helpers/date-helper';

@Component({
  selector: 'ngx-providers-table',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit {
  total: any;
  tax: any;
  showTable;
  source: LocalDataSource = new LocalDataSource();
  sourceTotals: LocalDataSource = new LocalDataSource();

  settings = {
    mode: 'external',
    noDataMessage: 'No hay informacion disponible',
    actions: {
      columnTitle: '',
      add: false,
      delete: false,
      position: 'right',
    },
    edit: {
      editButtonContent: '<i class="nb-search"></i>',
      confirmSave: true,
    },
    columns: {},
  };

  settingsTotals = {
    noDataMessage: 'No hay informacion disponible',
    hideSubHeader: true,
    pager: false,
    actions: false,
    columns: {},
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService,
    private dateHelper: DateHelper,
  ) {}

  ngOnInit() {
    this.loadData(this.dateHelper.getDateApiFormatFromDate(new Date()));
  }

  loadData(date, monthToShow?) {
    this.supplierService
      .getSupplierInvoicesLastMonths(date, monthToShow)
      .subscribe(response => {
        this.settingColumnNames(response.columns);
        this.source.load(response.purchases);
        this.sourceTotals.load(response.totalMonth);
        this.total = response.totalPeriod;
        this.tax = Math.trunc(this.total * 0.19);
        this.showTable = true;
      });
  }

  settingColumnNames(columns: { name: string; year: string }[]) {
    for (let column of columns) {
      if (column.name === 'id') {
        this.settings.columns[column.name] = { title: 'Codigo', width: '5%' };
      } else if (column.name === 'name') {
        this.settings.columns[column.name] = { title: 'Proveedor' };
        this.settingsTotals.columns[column.name] = { title: '' };
      } else {
        this.settings.columns[column.name] = {
          title: `${this.dateHelper.getMonthNameByEnglishAbr(column.name)} ${
            column.year
          }`,
          valuePrepareFunction,
        };
        this.settingsTotals.columns[column.name] = {
          title: `${this.dateHelper.getMonthNameByEnglishAbr(column.name)} ${
            column.year
          }`,
          valuePrepareFunction,
        };
      }
    }
  }

  onClickView(evt) {
    this.router.navigate([`${evt.data.id}`], {
      relativeTo: this.route,
    });
  }

  numberWithCommas(val) {
    return numberWithCommas(val);
  }

  getReportPDF() {
    const date = this.dateHelper.getDateApiFormatFromDate(new Date());

    this.supplierService.getTotalInvoicesReport(date).subscribe(
      (result: any) => {
        window.open(result.data.path, '_blank');
      },
      () => {
        alert('Error al generar reporte');
      },
    );
  }
}
