import { Component } from '@angular/core';
import { AuditsService } from '../audits.service';

@Component({
  selector: 'audits-add',
  templateUrl: './auditadd.html',
  styleUrls: ['./auditadd.scss'],
})
export class AuditAddComponent {
    result = {};

  constructor(private auditService: AuditsService) {}

  loadAudits() {
    this.auditService.getAll().subscribe( p => this.result = p );
  }
}
