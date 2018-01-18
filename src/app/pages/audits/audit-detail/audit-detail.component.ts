import {Component, OnInit} from '@angular/core';
import {AuditsService} from '../audits.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-audits-detail',
  templateUrl: './audit-detail.component.html',
})
export class AuditDetailComponent implements OnInit {
  downloadPath = null;
  audit: Object = {};
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
    this.auditService.getAll()
      .subscribe((audits) => {
        this.audit = audits.find(a => a.id === id);
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

  onScoreChange(revision, section) {
    let classification = '';
    if (revision.score === 1) {
      classification = 'NO CUMPLE';
    }
    if (revision.score === 2) {
      classification = 'CUMPLE';
    }
    if (revision.score === 3) {
      classification = 'NO APLICA';
    }
    revision.classification = classification;

    const score = section.revisions.reduce((acc, r) => {
      let value = 0;
      const revisionScore = parseInt(r.score, 10);
      if (revisionScore === 2 || revisionScore === 3) {
        value = 1;
      }
      return acc + value;
    }, 0);

    section.percentageScore = score / section.revisions.length;
    this.score = this.sections.reduce((acc, s) => {
      const sectionScore = s.percentageScore ? s.percentageScore * s.percentage : 0;
      return sectionScore + acc;
    }, 0)
  }
}
