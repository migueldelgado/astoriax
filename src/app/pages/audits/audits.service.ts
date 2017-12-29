import {Injectable} from '@angular/core';
import {AppConfig} from '../../app.config';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AuditsService {

  auditTypes = [{
    id: 1,
    description: 'Operacional',
  }, {
    id: 2,
    description: 'Sanitaria',
  }];

  revisionList = [
    {
      description: 'Planificacion de procesos diarios',
    },
    {
      description: 'Inicio de proceso en forma asignada según manual',
    },
    {
      description: 'Tiempos de procesos adecuados al estándar',
    },
    {
      description: 'Peso y cuantificacion de merma (en software)',
    },
    {
      description: 'Calidad de insumos de saldo (rotulados)',
    },
    {
      description: 'Maquinaria para realizar procesos optima',
    },
    {
      description: 'Instalaciones para procesos optima',
    },
  ];

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
                  classification: '',
                  observation: '',
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

}
