import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuditsService {

    constructor(private http: Http) {}

    public getAll() {
        // return this.http
        //     .get(`http://laravel.dev/api/audits`, {})
        //     .map((res:Response) => res.json());
        
        return this.http.get(AppConfig.API_ENDPOINT + 'audits')
            .map(response => response.json())
            .map((audits: Object[]) => {
                return audits.map(audit => this.parseData(audit));
            });
    }

    private parseData(data): any {
        return data;
    }


}