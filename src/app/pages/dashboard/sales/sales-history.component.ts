import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { SalesService } from '../../sales/sales.service';
import { getMonthNameByMonthNumber } from '../../../@core/utils/dateUtils';

@Component({
  selector: 'ngx-sales-history-component',
  styleUrls: ['./sales-history.component.scss'],
  templateUrl: './sales-history.component.html',
})
export class SalesHistoryComponent implements OnDestroy {

  saleService: any;
  salesHistory: Array<any> = [];
  currentTheme: string;
  themeSubscription: any;

  constructor(private sService: SalesService, private themeService: NbThemeService) {
    this.saleService = sService;
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit() {
    this.saleService.getSalesHistory()
    .subscribe((result: any) => {
      var currentYear = new Date().getFullYear();
      this.salesHistory = result.data;
      this.salesHistory.forEach(saleHistory => {
        if (saleHistory.year == currentYear) {
          saleHistory.active = true;
        }
        saleHistory.salesByMonth.forEach(saleMonth => {
          saleMonth.monthName = getMonthNameByMonthNumber(saleMonth.month);
          saleMonth.total = Math.floor(1000 + Math.random() * 9000);
        });
      });
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
