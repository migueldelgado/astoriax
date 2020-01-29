import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { NbAuthService } from '../../auth/services';

@Injectable()
export class ClassificationService {

    constructor(
        private http: HttpClient,
        private authService: NbAuthService,
    ) {}

    public getClassifications() {
        return this.http
            .get(AppConfig.API_ENDPOINT + 'classifications')
            .map((classifications: Object[]) => {
                return classifications['data'];
            });
    }

    public getPaymentTypes() {
        return this.http
            .get(AppConfig.API_ENDPOINT + 'paymenttypes')
            .map((paymenttypes: Object[]) => {
                return paymenttypes['data'];
            });
    }

}
