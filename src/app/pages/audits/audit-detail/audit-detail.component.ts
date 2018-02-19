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
  id: any;
  sections;
  auditTypeId: string = null;
  score: number = null;
  result = {};

  constructor(private auditService: AuditsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.params.id, 10);
    this.id = id;
    this.auditService.find(id)
      .subscribe((audit) => {
        this.audit = audit;
      });
  }

  onClickDownload() {
    this.auditService.getAuditReport(this.id)
      .subscribe((result) => {
        this.downloadPath = result.downloadPath;
        window.open(result.downloadPath, '_blank');
      }, () => {
        alert('Error generating report')
      })
  }
}
