import {Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AuditsService {

  constructor(private http: Http) {
  }

  public getAll() {
    return this.http.get(AppConfig.API_ENDPOINT + 'audits')
      .map(response => response.json())
      .map((audits: Object[]) => {
        return audits.map(this.parseData);
      });
  }

  private parseData(data): any {
    return data;
  }

  public getAuditTypes() {
    return this.http.get(`${AppConfig.API_ENDPOINT}audit_type`)
      .map(response => response.json());
  }

  public getSectionList() {
    return this.http.get(`${AppConfig.API_ENDPOINT}sections`)
      .map(response => response.json())
  }

  public getRevisionList(): Observable<Object[]> {
    return this.http.get(`${AppConfig.API_ENDPOINT}revisions`)
      .map(response => response.json())
  }

  public getAuditData(auditType: string) {
    const auditTypeId = parseInt(auditType, 10);
    const obs = Observable.forkJoin(this.getSectionList(), this.getRevisionList());
    return obs
      .map(([sections, revisions]) => {
        return sections.filter((s) => s.audit_type_id === auditTypeId)
          .map((s) => {
            const sectionRevisions = revisions
              .filter((r) => {
                return s.id === r['section_id'];
              })
              .map((r) => {
                return Object.assign({}, r, {
                  score: 2,
                  classification: 'Cumple',
                  comment: '',
                });
              });
            return Object.assign({}, s, {
              revisions: sectionRevisions,
              percentageScore: 1,
            });
          });
      });
  }

  public getShifts() {
    return this.http.get(`${AppConfig.API_ENDPOINT}shifts`)
      .map(response => response.json());
  }

  public getStores() {
    return this.http.get(`${AppConfig.API_ENDPOINT}stores`)
      .map(response => response.json());
  }

  public getUsers() {
    return this.http.get(`${AppConfig.API_ENDPOINT}users`)
      .map(response => response.json());
  }

  public saveAudit(audit) {
    return this.http.post(`${AppConfig.API_ENDPOINT}audits`, audit)
  }

  public getAuditReport(id) {
    return this.http.get(`${AppConfig.API_ENDPOINT}audit_report/${id}`)
      .map(response => response.json())
  }

}
