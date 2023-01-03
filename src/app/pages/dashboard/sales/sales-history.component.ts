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
    this.loadMonthlySales();
    this.loadYearlySales();
  }

  onChangeMonthlyDate(monthlyDate, type) {
    this.dateMonthlySale[type] = monthlyDate;
    this.loadMonthlySales();
  }

  onChangeYearlyDate(yearlyDate) {
    this.dateYearlySale.year = yearlyDate;
    this.loadYearlySales();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  loadMonthlySales() {
    let salesSeries = this.getInitialSeries('ventas', 'primary');
    let fiscalSeries = this.getInitialSeries('ventas fiscal', 'danger');
    this.monthlyChart = { series: [], labels: [] };

    this.saleService
      .getSalesByMonth(
        this.dateMonthlySale.month.value,
        this.dateMonthlySale.year.value,
      )
      .subscribe((monthlySales: any) => {
        if (!monthlySales || !monthlySales.data) return false;

        monthlySales.data.forEach(monthlySale => {
          salesSeries.data.push(monthlySale.sales);
          fiscalSeries.data.push(monthlySale.fiscal);
          this.monthlyChart.labels.push(monthlySale.day);
        });

        this.monthlyChart.series.push(salesSeries);
        this.monthlyChart.series.push(fiscalSeries);
      });
  }

  loadYearlySales() {
    let salesSeries = this.getInitialSeries('ventas', 'primary');
    let fiscalSeries = this.getInitialSeries('ventas fiscal', 'danger');
    this.yearlyChart = { series: [], labels: [] };

    this.saleService
      .getSalesByYear(this.dateYearlySale.year.value)
      .subscribe((yearlylySales: any) => {
        if (!yearlylySales || !yearlylySales.data) return false;

        yearlylySales.data.forEach(yearlySale => {
          salesSeries.data.push(yearlySale.sales);
          fiscalSeries.data.push(yearlySale.fiscal);
          this.yearlyChart.labels.push(yearlySale.month);
        });

        this.yearlyChart.series.push(salesSeries);
        this.yearlyChart.series.push(fiscalSeries);
      });
  }

  getInitialSeries(title, color) {
    return {
      label: title,
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
