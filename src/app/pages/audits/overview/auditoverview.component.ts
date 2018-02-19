import { Component, OnInit } from '@angular/core';
import { AuditsService } from '../audits.service';
import {NbColorHelper, NbThemeService} from '@nebular/theme';
import {NbAuthService} from '../../../auth/services';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'ngx-audits-overview',
  templateUrl: './auditoverview.html',
  styleUrls: ['./auditoverview.scss'],
})
export class AuditOverviewComponent implements OnInit {
  data: any = [];
  themeSubscription: any;
  options: any;
  colors: any;
  auditTypes: any;
  auditTypeId: any;
  years: any = [];
  year: any = new Date().getFullYear();
  store: any;

  constructor(private auditsService: AuditsService, private theme: NbThemeService, private authService: NbAuthService) {

    for (let i = 0; i < 20; i++) {
      this.years.push(this.year - i);
    }
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.colors = config.variables;
      const chartjs: any = config.variables.chartjs;

      // this.data = {
      //   labels: ['January', 'February'],
      //   datasets: [{
      //     data: [65, 59],
      //     label: 'Tienda',
      //     backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
      //     borderColor: colors.primary,
      //   }],
      // };

      this.options = {
        responsive: true,
        maintainAspectRatio: true,
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
                beginAtZero: true,
                min: 0,
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

  ngOnInit() {
    Observable.forkJoin(this.auditsService.getAuditTypes(), this.authService.getCurrentUser())
      .subscribe(([types, user]) => {
        this.auditTypes = types;
        this.auditTypeId = types[0].id;
        const store = user.stores.find(s => s.id === parseInt(this.authService.getCurrentStore(), 10));
        this.store = store ? store.name : 'Tienda';
        this.onChange();
      })
  }

  onChange() {
    this.auditsService.getAuditOverView(this.auditTypeId, this.year)
      .subscribe((r) => {
        // this.data = r;
        this.data = {
          labels: r.labels,
          datasets: [{
            data: r.scores,
            label: this.store,
            backgroundColor: NbColorHelper.hexToRgbA(this.colors.primary, 0.3),
            borderColor: this.colors.infoLight,
          }],
        };
      })
  }
}
