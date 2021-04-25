import { Injectable } from '@angular/core';
import { AppConfig } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '../../../auth/services';
import 'rxjs/add/operator/map';

@Injectable()
export class TreasuryService {

    currentStore: number;

    constructor(private http: HttpClient, private authService: NbAuthService) {
        this.currentStore = this.authService.getCurrentStore();
    }

    public getTreasuries(from, to, transferType?) {
        let params: string = `store_id=${this.currentStore}&from=${from}&to=${to}`;
        if (transferType) params += `&transfer_type=${transferType}`;
        const url: string = AppConfig.API_ENDPOINT + 'treasuries?' + params;

        return this.http.get(url)
            .map((response: Object) => {
                return response['data'];
            });
    }

    public saveTreasuries(params) {
        params.store_id = this.currentStore;
        return this.http.post(AppConfig.API_ENDPOINT + 'treasuries', params);
    }

    public deleteTreasuries(treasuryId) {
        return this.http.delete(`${AppConfig.API_ENDPOINT}treasuries/${treasuryId}`);
    }

    private parseData(data: any): any {
        return data;
    }
}
