import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from 'app/shared/global-variables';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CloseOutApiService {

    constructor(private http: HttpClient) { }

    async getCloseoutOutcomes(projectid: string) {
        var url = GlobalVariables.apiurl + "ProjectCloseOut/Outcomes/" + projectid
        const abc$ = this.http.get(url)
        const response = await lastValueFrom(abc$)
        return response
    }

    async patchCloseoutOutcomes(projectid: string, data) {
        var url = GlobalVariables.apiurl + "ProjectCloseOut/Outcomes/" + projectid
        const abc$ = this.http.patch(url, data)
        const response = await lastValueFrom(abc$)
        return response
    }
}
