import {Component, OnInit} from '@angular/core';
import {AuditsService} from '../audits.service';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private auditService: AuditsService, private route: ActivatedRoute, private router: Router) {
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
    const score = section.revisions.reduce((acc, r) => {
      let value = 0;
      const classification = r.classification ? r.classification.toLowerCase() : '';
      if (classification === 'no aplica' || classification === 'cumple') {
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

  onSave() {
    if (!this.shiftId) {
      alert('Debe seleccionar turno');
      return ;
    }

    if (!this.storeId) {
      alert('Debe seleccionar Tienda');
      return ;
    }

    if (!this.managerId) {
      alert('Debe seleccionar Jefe de local');
      return ;
    }


    // {
    //   "audit_type_id": "1",
    //   "auditor_id": "1",
    //   "manager_id": "1",
    //   "store_id": "1",
    //   "shift_id": "1",
    //   "revisions": [
    //   {
    //     "revision_id": "1",
    //     "score": "2",
    //     "classification": "Cumple",
    //     "comment": "comment test"
    //   }
    // ]
    // }

    const data = {
      audit_type_id: this.auditTypeId,
      auditor_id: '1',
      manager_id: this.managerId,
      store_id: this.storeId,
      shift_id: this.shiftId,
      revisions: null,
    };

    const revisions = this.sections.reduce((acc, s) => {
      const sectionRevisions = s.revisions.map((r) => ({
        score: r.score,
        revision_id: r.id,
        classification: r.classification,
        comment: r.comment,
      }));

      return [...acc, ...sectionRevisions];
    }, []);

    data.revisions = revisions;

    const result = this.auditService.saveAudit(data);
    result.subscribe(() => {
      this.router.navigate(['../audit-list'], { relativeTo: this.route })
    }, (error) => {
      alert('Error al guardar auditoria')
    })
  }
}
