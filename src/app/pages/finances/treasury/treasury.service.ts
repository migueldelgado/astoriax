import { Injectable } from '@angular/core';
import { AppConfig } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { NbAuthService } from '../../../auth/services';

@Injectable()
export class TreasuryService {

    constructor(private http: HttpClient, private authService: NbAuthService) {}

    public getTreasuries(storeId, from, to, transferType) {
        const params: string = 'store_id=' + storeId + '&from=' + from + '&to=' + to + '&transfer_type=' + transferType;
        const url: string = AppConfig.API_ENDPOINT + 'treasuries?' + params;

        return this.http.get(url)
            .map((response: Object) => {
                return response['data'];
            });
    }

    public saveTreasuries(params) {
        return this.http.post(AppConfig.API_ENDPOINT + 'treasuries', params);
    }

    public deleteTreasuries(treasuryId) {
        return this.http.delete(`${AppConfig.API_ENDPOINT}treasuries/${treasuryId}`);
    }

    private parseData(data: any): any {
        return data;
    }
}
