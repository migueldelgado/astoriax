import { Component, OnInit } from '@angular/core';
import { DailySalesService } from '../../../@core/data/daily-sales.service';
import { LocalDataSource } from 'ng2-smart-table';
import {
  numberWithCommas,
  valuePrepareFunction,
} from '../../../@core/utils/utils';
import { getDateStringByDate } from '../../../@core/utils/dateUtils';
import { Observable } from 'rxjs/Observable';
import { DateHelper } from 'app/helpers/date-helper';

@Component({
  selector: 'ngx-daily-sales-table',
  templateUrl: './daily-sales.component.html',
  styleUrls: ['./daily-sales.component.scss'],
})
export class DailySalesComponent implements OnInit {
  day: string;
  month: string;
  year: string;
  years: string[];
  dailySalesMonth: any;

  settingsItemsTable;
  settingTotalsTable;
  settingTotalsDayTable;
  items: LocalDataSource = new LocalDataSource();
  totals: LocalDataSource = new LocalDataSource();
  totalDays: LocalDataSource = new LocalDataSource();

  constructor(
    private dailySalesService: DailySalesService,
    private dateHelper: DateHelper,
  ) {
    const commonSettings = {
      noDataMessage: 'No hay informacion disponible',
      hideSubHeader: true,
      pager: false,
    };

    this.settingsItemsTable = {
      ...commonSettings,
      actions: false,
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      columns: {
        name: { title: '', editable: false },
        shift1: { title: 'Manana', valuePrepareFunction },
        shift2: { title: 'Tarde', valuePrepareFunction },
        total: { title: 'Total', valuePrepareFunction, editable: false },
      },
    };

    this.settingTotalsTable = {
      ...commonSettings,
      actions: false,
      attr: {
        class: 'estoesdiferente',
      },
      rowClassFunction: row => {
        if (row.data.day === this.day) {
          return 'selected';
        }
        return '';
      },
      columns: {
        day: { title: 'Dia' },
        total: { title: 'Total', valuePrepareFunction },
      },
    };

    this.settingTotalsDayTable = {
      ...commonSettings,
      // hideHeader: true,
      attr: {
        class: 'table-totals',
      },
      actions: false,
      columns: {
        title: { title: '' },
        shift1: { title: 'Manana', valuePrepareFunction },
        shift2: { title: 'Tarde', valuePrepareFunction },
        total: { title: 'Total', valuePrepareFunction },
      },
    };
  }

  ngOnInit() {
    this.setCurrentMonthAndYear();
    const todayDateStr = getDateStringByDate(new Date());
    this.toggleEditSales(true);

    this.loadItemsTotalsByDate(todayDateStr);
    this.loadTotalsMonth(this.month, this.year);
  }

  toggleEditSales(isEditEnable) {
    if (!isEditEnable) {
      this.settingsItemsTable.actions = false;
    } else {
      this.settingsItemsTable.actions = {
        columnTitle: '',
        position: 'right',
        delete: false,
      };
    }
    this.settingsItemsTable = Object.assign({}, this.settingsItemsTable);
  }

  loadItemsTotalsByDate(date) {
    this.dailySalesService.getTotalItemsByDay(date).subscribe((data: any) => {
      this.items.load(data.items);
      this.totals.load(data.totals);
    });
  }

  loadTotalsMonth(month, year) {
    this.dailySalesService.getSalesTotals({ month, year }).subscribe(totals => {
      this.totalDays.load(totals);
    });
  }

  numberWithCommas(val) {
    return numberWithCommas(val);
  }

  getCurrentDayString() {
    let currentDate = new Date().getDate().toString();
    if (currentDate.length === 1) currentDate = '0' + currentDate;
    return currentDate;
  }

  rowUpdated(evt) {
    const dateStr = this.getDateStr();

    const commonProps = {
      dailysalesitem_id: evt.newData.id,
      date: dateStr,
    };

    const paramsShift1 = {
      ...commonProps,
      shift_id: 1,
      amount: evt.newData.shift1,
    };
    const paramsShift2 = {
      ...commonProps,
      shift_id: 2,
      amount: evt.newData.shift2,
    };

    Observable.forkJoin(
      this.dailySalesService.create(paramsShift1),
      this.dailySalesService.create(paramsShift2),
    ).subscribe(() => {
      evt.confirm.resolve(evt.newData);
      this.loadItemsTotalsByDate(dateStr);
      this.loadTotalsMonth(this.month, this.year);
    });
  }

  userRowSelect(evt) {
    this.day = evt.data.day;
    this.loadItemsTotalsByDate(this.getDateStr());
  }

  setCurrentMonthAndYear() {
    const date = new Date();
    const years = [];
    const year = date.getFullYear();

    for (let i = 0; i < 5; i++) {
      years.push((year - i).toString());
    }
    let monthStr = (date.getMonth() + 1).toString();
    if (monthStr.length === 1) monthStr = '0' + monthStr;

    this.years = years;
    this.year = year.toString();
    this.month = monthStr;
    this.day = date.getDate().toString();
  }

  getDateStr(): string {
    return `${this.year}-${this.month}-${this.day}`;
  }

  updateDate() {
    if (
      this.dateHelper.getCurrentMonth() === Number(this.month) &&
      this.dateHelper.getCurrentYear() === Number(this.year)
    ) {
      this.toggleEditSales(true);
    } else if (
      this.dateHelper.getCurrentMonth() - 1 === Number(this.month) &&
      this.dateHelper.getCurrentYear() === Number(this.year) &&
      this.dateHelper.getCurrentDay() <= 4
    ) {
      this.toggleEditSales(true);
    } else {
      this.toggleEditSales(false);
    }

    this.day = '01';
    this.loadItemsTotalsByDate(this.getDateStr());
    this.loadTotalsMonth(this.month, this.year);
  }

  getReportPDF() {
    const dateSale = this.getDateStr();

    this.dailySalesService.getDayReport(dateSale).subscribe(
      (result: any) => {
        window.open(result.data.path, '_blank');
      },
      () => {
        alert('Error al generar reporte');
      },
    );
  }
}
