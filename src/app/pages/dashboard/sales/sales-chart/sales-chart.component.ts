import { OnInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { NumberHelper } from 'app/helpers/number-helper';

declare const echarts: any;

@Component({
  selector: 'ngx-chart',
  styleUrls: ['./chart.component.scss'],
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})
export class SalesChartComponent implements OnDestroy, OnInit {
  data: any;
  options: any;
  themeSubscription: any;
  chartjs: any;

  @Input() series: any;
  @Input() labels: any;
  @Input() title: string;

  constructor(
    private theme: NbThemeService,
    private numberHelper: NumberHelper,
  ) {
    this.themeSubscription = theme.getJsTheme().subscribe(config => {
      this.chartjs = config.variables.chartjs;
    });
  }

  ngOnInit(): void {
    this.options = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        xAxes: [
          {
            gridLines: { display: false, color: this.chartjs.axisLineColor },
            ticks: { fontColor: this.chartjs.textColor },
          },
        ],
        yAxes: [
          {
            gridLines: { display: false, color: this.chartjs.axisLineColor },
            ticks: {
              fontColor: this.chartjs.textColor,
              callback: (value, index, values) =>
                this.numberHelper.formatCurrency(value),
            },
          },
        ],
      },
      legend: { labels: { fontColor: this.chartjs.textColor } },
    };

    this.data = { labels: this.labels, datasets: this.series };
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
