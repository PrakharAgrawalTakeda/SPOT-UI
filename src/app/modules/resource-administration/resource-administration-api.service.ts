import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalVariables} from 'app/shared/global-variables';
import {lastValueFrom} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResourceAdministrationApiService {
    constructor(private http: HttpClient) {}

    async getTeamByPortfolio(portfolioId) {
        var url = GlobalVariables.apiurl + "CapacityManagementTeam/GetCapacityManagementTeamByPortfolio/" + portfolioId
        const abc$ = this.http.get(url)
        const response = await lastValueFrom(abc$)
        return response
      }
}
