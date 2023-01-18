import { Component, OnDestroy } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { SalesService } from '../../sales/sales.service';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import { DateHelper } from 'app/helpers/date-helper';

@Component({
  selector: 'ngx-sales-history-component',
  styleUrls: ['./sales-history.component.scss'],
  templateUrl: './sales-history.component.html',
})
export class SalesHistoryComponent implements OnDestroy {
  salesHistory: Array<any> = [];
  theme: NbJSThemeOptions;
  themeSubscription: any;
  monthlyChart: { series: any[]; labels: any[] };
  yearlyChart: { series: any[]; labels: any[] };
  months: { value: number; label: string }[];
  years: any[];
  dateMonthlySale: any;
  dateYearlySale: any;

  constructor(
    private saleService: SalesService,
    private themeService: NbThemeService,
    private dateHelper: DateHelper,
  ) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.theme = theme;
    });
    let currentYear = this.dateHelper.getCurrentYear();
    this.years = Array.from(
      [currentYear, currentYear - 1, currentYear - 2, currentYear - 3],
      (year: number) => ({ value: year, label: year }),
    );
    this.months = dateHelper.getMonths();

    this.dateMonthlySale = {
      month: this.months[new Date().getMonth()],
      year: this.years[0],
    };
    this.dateYearlySale = { year: this.years[0] };
  }

  ngOnInit() {
    this.loadMonthlyHistorySales();
    this.loadYearlyHistorySales();
  }

  onChangeMonthlyDate(monthlyDate, type) {
    this.dateMonthlySale[type] = monthlyDate;
    this.loadMonthlyHistorySales();
  }

  onChangeYearlyDate(yearlyDate) {
    this.dateYearlySale.year = yearlyDate;
    this.loadYearlyHistorySales();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  loadMonthlyHistorySales() {
    let currentYear = this.getInitialSeries('primary');
    let previousYear = this.getInitialSeries('danger');
    let secondPrevious = this.getInitialSeries('warning');
    this.monthlyChart = { series: [], labels: [] };

    this.saleService
      .getMonthlyHistorySales(
        this.dateMonthlySale.month.value,
        this.dateMonthlySale.year.value,
      )
      .subscribe((monthlyHistorySales: any) => {
        if (!monthlyHistorySales.data || !monthlyHistorySales.data.sales)
          return false;

        const historySales = monthlyHistorySales.data.sales;
        const years = monthlyHistorySales.data.years;
        currentYear.label = years[0];
        previousYear.label = years[1];
        secondPrevious.label = years[2];

        for (let sale of historySales) {
          this.monthlyChart.labels.push(sale.day_number);
          currentYear.data.push(sale[years[0]]);
          previousYear.data.push(sale[years[1]]);
          secondPrevious.data.push(sale[years[2]]);
        }

        this.monthlyChart.series = [currentYear, previousYear, secondPrevious];
      });
  }

  loadYearlyHistorySales() {
    let currentYear = this.getInitialSeries('primary');
    let previousYear = this.getInitialSeries('danger');
    let secondPrevious = this.getInitialSeries('warning');
    this.yearlyChart = { series: [], labels: [] };

    this.saleService
      .getYearlyHistorySales(this.dateYearlySale.year.value)
      .subscribe((yearlyHistorySales: any) => {
        if (!yearlyHistorySales.data || !yearlyHistorySales.data.sales)
          return false;

        const historySales = yearlyHistorySales.data.sales;
        const years = yearlyHistorySales.data.years;
        currentYear.label = years[0];
        previousYear.label = years[1];
        secondPrevious.label = years[2];

        for (let sale of historySales) {
          this.yearlyChart.labels.push(
            this.dateHelper.getMonthNameByNumber(sale.month_number),
          );
          currentYear.data.push(sale[years[0]]);
          previousYear.data.push(sale[years[1]]);
          secondPrevious.data.push(sale[years[2]]);
        }

        this.yearlyChart.series = [currentYear, previousYear, secondPrevious];
      });
  }

  getInitialSeries(color) {
    return {
      label: '',
      data: [],
      pointRadius: 5,
      borderColor: this.theme.variables[color],
      backgroundColor: NbColorHelper.hexToRgbA(
        this.theme.variables[color],
        0.3,
      ),
    };
  }
}
