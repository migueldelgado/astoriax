import { Component, OnInit } from '@angular/core';
import { DailySalesService } from '../../../@core/data/daily-sales.service';
import { LocalDataSource } from 'ng2-smart-table';
import { numberWithCommas, valuePrepareFunction } from '../../../@core/utils/utils';
import { getDateStringByDate } from '../../../@core/utils/dateUtils';
import { Observable } from 'rxjs/Observable';

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

  constructor(private dailySalesService: DailySalesService) {

    const commonSettings = {
      noDataMessage:'No hay informacion disponible',
      hideSubHeader: true,
      pager: false,
    }

    this.settingsItemsTable = {
      ...commonSettings,
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true
      },
      actions: {
        columnTitle: '',
        position: 'right',
        delete: false,
      },
      columns: {
        name: { title: '', editable: false, },
        shift1: { title: 'Manana', valuePrepareFunction },
        shift2: { title: 'Tarde', valuePrepareFunction },
        total: { title: 'Total', valuePrepareFunction, editable: false },
      }
    }

    this.settingTotalsTable = {
      ...commonSettings,
      actions: false,
      attr: {
        class: 'estoesdiferente'
      },
      rowClassFunction: (row) => {
        if (row.data.day === this.day){
          return 'selected';
        }
        return '';
      },
      columns: {
        day: { title: 'Dia' },
        total: { title: 'Total', valuePrepareFunction },
      }
    }

    this.settingTotalsDayTable = {
      ...commonSettings,
      // hideHeader: true,
      attr: {
        class: 'table-totals'
      },
      actions: false,
      columns: {
        title: { title: '', },
        shift1: { title: 'Manana', valuePrepareFunction },
        shift2: { title: 'Tarde', valuePrepareFunction },
        total: { title: 'Total', valuePrepareFunction }
      }
    }
  }

  ngOnInit() {
    this.setCurrentMonthAndYear();
    const todayDateStr = getDateStringByDate(new Date);

    this.loadItemsTotalsByDate(todayDateStr);
    this.loadTotalsMonth(this.month, this.year);
  }

  loadItemsTotalsByDate(date) {
    this.dailySalesService.getTotalItemsByDay(date)
      .subscribe((data: any) => {
        this.items.load(data.items);
        this.totals.load(data.totals);
      });
  }

  loadTotalsMonth(month, year) {
    this.dailySalesService.getSalesTotals({month, year})
      .subscribe(totals => {
        this.totalDays.load(totals);
      });
  }

  numberWithCommas(val){
    return numberWithCommas(val);
  }

  getCurrentDayString(){
    let currentDate = new Date().getDate().toString();
    if (currentDate.length === 1) currentDate = '0' + currentDate;
    return currentDate;
  }

  rowUpdated(evt){
    const dateStr = this.getDateStr();

    const commonProps = {
      dailysalesitem_id: evt.newData.id,
      date: dateStr
    }

    const paramsShift1 = {
      ...commonProps,
      shift_id: 1,
      amount: evt.newData.shift1
    }
    const paramsShift2 = {
      ...commonProps,
      shift_id: 2,
      amount: evt.newData.shift2
    }

    Observable.forkJoin(
      this.dailySalesService.create(paramsShift1),
      this.dailySalesService.create(paramsShift2)
    ).subscribe(() => {
      evt.confirm.resolve(evt.newData);
      this.loadItemsTotalsByDate(dateStr);
      this.loadTotalsMonth(this.month, this.year);
    });
  }

  userRowSelect(evt){
    this.day = evt.data.day;
    this.loadItemsTotalsByDate(this.getDateStr());
  }

  setCurrentMonthAndYear(){
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

  getDateStr(): string{
    return `${this.year}-${this.month}-${this.day}`;
  }

  updateDate(){
    this.day = '01';
    this.loadItemsTotalsByDate(this.getDateStr());
    this.loadTotalsMonth(this.month, this.year);
  }

  getReportPDF(){
    const dateSale = this.getDateStr();

    this.dailySalesService.getDayReport(dateSale)
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
