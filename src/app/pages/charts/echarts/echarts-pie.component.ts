import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { NumberHelper } from 'app/helpers/number-helper';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements OnInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  @Input() title: string;
  @Input() data: { value: number; name: string }[];
  @Input() labels: string[];

  constructor(
    private theme: NbThemeService,
    private numberHelper: NumberHelper,
  ) {}

  ngOnInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [
          colors.warningLight,
          colors.infoLight,
          colors.dangerLight,
          colors.successLight,
          colors.primaryLight,
        ],
        tooltip: { trigger: 'item', formatter: '{b} : {c} ({d}%)' },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.labels,
          textStyle: { color: echarts.textColor, fontSize: 10 },
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: '80%',
            selectedMode: 'multiple',
            center: ['50%', '50%'],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: { color: echarts.textColor },
                formatter: label => {
                  return `${this.numberHelper.formatNumberWithThousands(
                    label.value,
                  )} (${label.percent}%)`;
                },
                position: 'inside',
              },
            },
            labelLine: {
              normal: {
                show: false,
                lineStyle: { color: echarts.axisLineColor },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
