import {Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {NbAuthService} from '../../auth/services';

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
@Injectable()
export class AuditsService {

  constructor(private http: HttpClient, private authService: NbAuthService) {
  }

  public getAll() {
    return this.http.get(AppConfig.API_ENDPOINT + 'audits')
      .map((audits: Object[]) => {
        return audits.map(this.parseData);
      });
  }

  public find(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}audits/${id}` )
      .map(audit => {
        const sections = audit.audit_type.sections;
        sections.forEach(section => {
          const score = section.revisions.reduce((acc, r) => {
            r.classification = r.pivot.classification;
            r.comment = r.pivot.comment;
            r.modified = false;
            let value = 0;
            const classification = r.classification ? r.classification.toLowerCase() : '';
            if (classification === 'no aplica' || classification === 'cumple') {
              value = 1;
            }
            return acc + value;
          }, 0);
          section.percentageScore = score / section.revisions.length;
        });
        audit.score = sections.reduce((acc, s) => {
          const sectionScore = s.percentageScore ? s.percentageScore * s.percentage : 0;
          return sectionScore + acc;
        }, 0);
        return audit;
      })
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
                  classification: 'No Aplica',
                  comment: '',
                  modified: true,
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

  public updateAudit(id, audit) {
    return this.http.put(`${AppConfig.API_ENDPOINT}audits/${id}`, audit);
  }

  public getAuditReport(id) {
    return this.http.get<any>(`${AppConfig.API_ENDPOINT}audit_report/${id}`)
  }

  public getAuditOverView(typeId, year) {
    const storeId = this.authService.getCurrentStore();
    return this.http.get<any>(
      `${AppConfig.API_ENDPOINT}getAuditOverview/${storeId}/${typeId}/${year}`,
    )
      .map(result => {
        const data = result.map((a) => {
          const date = new Date(a.date);
          const userTimezoneOffset = date.getTimezoneOffset() * 60000;
          const audit: any = {
            id: a.id,
            month: new Date(date.getTime() + userTimezoneOffset).getMonth(),
            score: 100,
          };
          const sections = a.revisions.reduce((acc, rev) => {
            const s = acc[rev.section_id] || {
              name: rev.section.name,
              percentage: rev.section.percentage,
              accumScore: 0,
              revisions: 0,
              finalScore: 0,
            };

            s.revisions++;
            s.accumScore += rev.pivot.classification.toLowerCase() === 'no cumple' ? 0 : 1;
            s.finalScore = (s.accumScore * 100) / s.revisions;
            acc[rev.section_id] = s;
            return acc;
          }, {});
          audit.sections = sections;
          audit.score = Object.keys(sections).reduce((acc, key) => {
            return acc + (sections[key].finalScore * sections[key].percentage);
          }, 0);
          return audit;
        });
        const graphData = {
          labels: [],
          scores: [],
          valid: [],
          average: '',
        };
        MONTHS.forEach((month, index) => {
          const audits = data.filter(d => d.month === index);
          if (audits.length === 0) {
            return;
          }
          const total = audits.reduce((acc, a) => acc + a.score, 0) / audits.length;
          graphData.labels.push(month);
          graphData.scores.push(total.toFixed(2));
          graphData.valid.push(true);
        });

        if (graphData.labels.length === 2) {
          const month = graphData.labels[0];
          const index = MONTHS.indexOf(month);
          if (index === 0) {
            graphData.labels.unshift(MONTHS[11]);
          } else {
            graphData.labels.unshift(MONTHS[index - 1]);
          }
          graphData.scores.unshift(0);
          graphData.valid.unshift(false);
        } else if (graphData.labels.length === 1) {
          const month = graphData.labels[0];
          const index = MONTHS.indexOf(month);
          if (index === 0) {
            graphData.labels.unshift(MONTHS[11]);
          } else {
            graphData.labels.unshift(MONTHS[index - 1]);
          }
          graphData.scores.unshift(0);
          graphData.valid.unshift(false);
          if (index === 11) {
            graphData.labels.push(MONTHS[0]);
          } else {
            graphData.labels.push(MONTHS[index + 1]);
          }
          graphData.scores.push(0);
          graphData.valid.push(false);
        }
        let count = 0;
        let sum = 0;
        graphData.scores.forEach((s, index) => {
          if (!graphData.valid[index]) {
            return;
          }
          count++;
          sum += parseFloat(s);
        });

        graphData.average = ((sum / count) / 100).toFixed(2);
        return graphData;
      });
  }
}
