import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { getMonthNames } from '../../../../@core/utils/dateUtils';
import { reduce } from 'rxjs/operator/reduce';

declare const echarts: any;

@Component({
  selector: 'ngx-sales-chart',
  styleUrls: ['./sales-chart.component.scss'],
  template: `
    <chart *ngIf="sales" type="line" [data]="data" [options]="options"></chart>
  `
})
export class SalesChartComponent implements OnDestroy, AfterViewInit {
    data: any;
    options: any;
    themeSubscription: any;
    historySalesByYear: any;
    @Input() sales: any;

    constructor(private theme: NbThemeService) {}

    ngAfterViewInit(): void {
      this.themeSubscription = this.theme.getJsTheme().delay(1).subscribe(config => {
          var monthNames = getMonthNames();
          var seriesData: Array<any> = [];
          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;

          this.sales.forEach(saleByYear => {
            var totals = [];
            saleByYear.salesByMonth.forEach(saleMonth => {
              totals.push(saleMonth.total);
            })
            seriesData.push({
              data: totals,
              label: saleByYear.year.toString(),
              //backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
              borderColor: colors.primary
            });
          });

          seriesData[0].backgroundColor = NbColorHelper.hexToRgbA(colors.primary, 0.3);
          seriesData[1].backgroundColor = NbColorHelper.hexToRgbA(colors.danger, 0.3);

          this.data = {
            labels: monthNames,
            datasets: seriesData
          };

          this.options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontColor: chartjs.textColor,
              },
            },
          };

      });
    }

    ngOnDestroy() {
      this.themeSubscription.unsubscribe();
    }

}
