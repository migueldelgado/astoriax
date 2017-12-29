import {Component, OnInit} from '@angular/core';
import {AuditsService} from '../audits.service';

@Component({
  selector: 'ngx-audits-add',
  templateUrl: './auditadd.html',
  styleUrls: ['./auditadd.scss'],
})
export class AuditAddComponent implements OnInit {
  auditTypes$;
  shiftTypes$;
  revisionList$;
  stores$;
  users$;
  sections;
  auditTypeId: string = null;
  shiftId: number = null;
  storeId = null;
  managerId = null;
  score: number = null;
  result = {};

  constructor(private auditService: AuditsService) {
  }

  ngOnInit() {
    this.auditTypes$ = this.auditService.getAuditTypes();
    this.revisionList$ = this.auditService.getRevisionList();
    this.shiftTypes$ = this.auditService.getShifts();
    this.stores$ = this.auditService.getStores();
    this.users$ = this.auditService.getUsers();
  }

  loadAudits() {
    this.auditService.getAll().subscribe(p => this.result = p);
  }

  onAuditTypeChange() {
    this.auditService.getAuditData(this.auditTypeId)
      .subscribe(data => {
        this.sections = data;
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
    this.score = this.sections.reduce((acc, section) => {
      const sectionScore = section.percentageScore ? section.percentageScore * section.percentage : 0;
      return sectionScore + acc;
    }, 0)
  }
}
