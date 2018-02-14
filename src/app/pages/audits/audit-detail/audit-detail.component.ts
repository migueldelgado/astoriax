import {Component, OnInit} from '@angular/core';
import {AuditsService} from '../audits.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-audits-detail',
  templateUrl: './audit-detail.component.html',
  styles: [`
    nb-card-body {
      min-height: 160px;
    }
  `],
})
export class AuditDetailComponent implements OnInit {
  downloadPath = null;
  audit: any = {};
  sections;
  auditTypeId: string = null;
  shiftId: number = null;
  storeId = null;
  managerId = null;
  score: number = null;
  result = {};

  constructor(private auditService: AuditsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.params.id, 10);
    this.auditService.find(id)
      .subscribe((audit) => {
        this.audit = audit;
      });
    this.auditService.getAuditReport(id)
      .subscribe((result) => {
        this.downloadPath = result.downloadPath;
      }, () => {
        this.downloadPath = null;
      })
  }

  onAuditTypeChange() {
    if (!this.auditTypeId) {
      this.score = null;
      return;
    }
    this.auditService.getAuditData(this.auditTypeId)
      .subscribe(data => {
        this.sections = data;
        this.score = 1;
      })
  }
}
