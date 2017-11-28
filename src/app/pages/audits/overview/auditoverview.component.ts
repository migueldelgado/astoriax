import { Component } from '@angular/core';
import { AuditsService } from '../audits.service';

@Component({
  selector: 'audits-overview',
  templateUrl: './auditoverview.html',
  styleUrls: ['./auditoverview.scss'],
})
export class AuditOverviewComponent {

  constructor(auditsService: AuditsService) {
    console.log(auditsService.getAll());
  }

}
