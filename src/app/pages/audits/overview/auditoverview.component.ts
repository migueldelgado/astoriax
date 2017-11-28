import { Component } from '@angular/core';
import { AuditsService } from '../audits.service';

@Component({
  selector: 'ngx-audits-overview',
  templateUrl: './auditoverview.html',
  styleUrls: ['./auditoverview.scss'],
})
export class AuditOverviewComponent {

  constructor(auditsService: AuditsService) {
    // tslint:disable-next-line
    console.log(auditsService.getAll());
  }

}
