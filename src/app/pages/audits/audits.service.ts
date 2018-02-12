import {Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AuditsService {

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get(AppConfig.API_ENDPOINT + 'audits')
      .map((audits: Object[]) => {
        return audits.map(this.parseData);
      });
  }

  public find(id) {
    return this.http.get(`${AppConfig.API_ENDPOINT}audits/${id}` )
  }

  private parseData(data): any {
    return data;
  }

  public getAuditTypes() {
    return this.http.get(`${AppConfig.API_ENDPOINT}audit_type`)
  }

  public getSectionList() {
    return this.http.get(`${AppConfig.API_ENDPOINT}sections`)
  }

  public getRevisionList(): Observable<Object[]> {
    return this.http.get(`${AppConfig.API_ENDPOINT}revisions`)
  }

  public getAuditData(auditType: string) {
    const auditTypeId = parseInt(auditType, 10);
    const obs = Observable.forkJoin<any>(this.getSectionList(), this.getRevisionList());
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
  }

  public getStores() {
    return this.http.get(`${AppConfig.API_ENDPOINT}stores`)
  }

  public getUsers() {
    return this.http.get(`${AppConfig.API_ENDPOINT}users`)
  }

  public saveAudit(audit) {
    return this.http.post(`${AppConfig.API_ENDPOINT}audits`, audit)
  }

  public getAuditReport(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}audit_report/${id}`)
  }

}
