import { Component, OnInit } from '@angular/core';
import { DailySalesService } from '../../../@core/data/daily-sales.service';
import { LocalDataSource } from 'ng2-smart-table';
import { numberWithCommas, valuePrepareFunction } from '../../../@core/utils/utils';
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
  totals = {
    difference: {
      shift1: 0,
      shift2: 0,
      total: 0,
    },
    net: {
      shift1: 0,
      shift2: 0,
      total: 0
    },
    noJunaeb: {
      shift1: 0,
      shift2: 0,
      total: 0
    }
  };
 
  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();

  settings = {
    hideSubHeader: true,
    noDataMessage:'No hay informacion disponible',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
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
    },
    pager: { display: false },
  };

  settings2 = {
    hideSubHeader: true,
    noDataMessage:'No hay informacion disponible',
    rowClassFunction: (row) => {
      if (row.data.day === this.day){
        return 'selected';
      }
      return '';
    },
    actions: {
      columnTitle: '',
      add: false,
      delete: false,
      edit: false,
    },
    columns: {
      day: { title: 'Dia', },
      total: { title: 'Total', valuePrepareFunction },
    },
    pager: { display: false },
  };

  constructor(private dailySalesService: DailySalesService){}

  ngOnInit() {
    this.setCurrentMonthAndYear();
    let dayStr = new Date().getDate().toString();
    dayStr = dayStr.length === 1 ? '0' + dayStr : dayStr;
    this.loadData(this.month, this.year, dayStr);
  }

  loadData(month, year, day){
    const params = { month, year };

    this.dailySalesService.getSales(params)
      .subscribe((result: any) => {
        this.dailySalesMonth = result.data;
        this.updateData(day);
      });
  }

  numberWithCommas(val){
    return numberWithCommas(val);
  }

  updateData(dayStr){
    this.day = dayStr;
    const currentDate = this.getDateStr();
    const currentDayItems = this.dailySalesMonth[currentDate].items;
    const currentDayTotals = [];
    this.totals = {
      difference: {
        shift1: this.dailySalesMonth[currentDate].totalDifferenceShift1,
        shift2: this.dailySalesMonth[currentDate].totalDifferenceShift2,
        total: this.dailySalesMonth[currentDate].totalDifference,
      },
      net: {
        shift1: 0,
        shift2: 0,
        total: this.dailySalesMonth[currentDate].totalNet
      },
      noJunaeb: {
        shift1: 0,
        shift2: 0,
        total: this.dailySalesMonth[currentDate].totalNoJunaeb
      }
    };

    for (const day in this.dailySalesMonth){
      currentDayTotals.push({ 
        day:  this.dailySalesMonth[day].day,
        total: this.dailySalesMonth[day].total
      });
    }

    this.source.load(currentDayItems);
    this.source2.load(currentDayTotals);
  }

  getCurrentDayString(){
    let currentDate = new Date().getDate().toString();
    if (currentDate.length === 1) currentDate = '0' + currentDate;
    return currentDate;
  }

  rowUpdated(evt){
    const dateStr = this.getDateStr();
    const itemId = evt.newData.id;
    const amountShift1 = evt.newData.shift1;
    const amountShift2 = evt.newData.shift2;

    const commonProps = {
      dailysalesitem_id: itemId,
      date: dateStr
    }

    const paramsShift1 = {
      ...commonProps,
      shift_id: 1,
      amount: amountShift1
    }
    const paramsShift2 = {
      ...commonProps,
      shift_id: 2,
      amount: amountShift2
    }

    Observable.forkJoin(
      this.dailySalesService.create(paramsShift1),
      this.dailySalesService.create(paramsShift2)
    ).subscribe((results: any) => {
      this.loadData(this.month, this.year, this.day);
      evt.confirm.resolve(evt.newData);
    });
  }

  calculateTotal(data){
    let total = 0;
    for(const item in data) {
      if (item !== 'total') total += data[item].shift1 + data[item].shift2;
    }
    return total;
  }

  userRowSelect(evt){
    this.updateData(evt.data.day);
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
  }

  getDaysSelectedMonth(){
    const year = parseInt(this.year);
    const month = parseInt(this.month);
    return new Date(year, month, 0).getDate();
  }

  getDateStr(){
    return `${this.year}-${this.month}-${this.day}`;
  }

  updateDate(){
    const dayStr = '01';
    this.loadData(this.month, this.year, dayStr);
  }

  getReportPDF(){
    let params = {
      day: this.day,
      month: this.month,
      year: this.year
    }

    this.dailySalesService.getDayReport(params)
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
