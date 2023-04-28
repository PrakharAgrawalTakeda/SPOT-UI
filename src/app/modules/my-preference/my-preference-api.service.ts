import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalVariables} from 'app/shared/global-variables';
import {lastValueFrom} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MyPreferenceApiService {

    constructor(private http: HttpClient) {
    }

    async updateRole(userid: string, securityGroupId: string) {
        var link = GlobalVariables.apiurl + "SecurityRoles/" + userid + "?SecurityGroupId=" + securityGroupId
        const abc$ = this.http.put(link, securityGroupId)
        const response = await lastValueFrom(abc$)
        return response
    }

    async getuserPreference(userid: string) {
        var url = GlobalVariables.apiurl + "UserPreference/" + userid
        const abc$ = this.http.get(url)
        const response = await lastValueFrom(abc$)
        return response
    }

    async updateuserPreference(userid, body) {
        var link = GlobalVariables.apiurl + "UserPreference/" + userid
        const abc$ = this.http.put(link, body)
        const response = await lastValueFrom(abc$)
        return response
    }

    async getMasterStandardMilestoneSets(userId: string) {
        var userid = GlobalVariables.apiurl + "StandardMilestoneSet/GetMasterTemplates/" + userId
        const abc$ = this.http.get(userid)
        const response = await lastValueFrom(abc$)
        return response
    }

    async checkAccess(userId: string) {
        var userid = GlobalVariables.apiurl + "StandardMilestoneSet/CheckAccess/" + userId
        const abc$ = this.http.get(userid)
        const response = await lastValueFrom(abc$)
        return response
    }

    async getDetails(userId: string) {
        var userid = GlobalVariables.apiurl + "StandardMilestoneSet/GetDetails/" + userId
        const abc$ = this.http.get(userid)
        const response = await lastValueFrom(abc$)
        return response
    }

    async addStandardMilestoneSet(body) {
        var link = GlobalVariables.apiurl + "StandardMilestoneSet";
        const abc$ = this.http.post(link, body)
        const response = await lastValueFrom(abc$)
        return response
    }

    async editStandardMilestoneSet(body, projectId) {
        var link = GlobalVariables.apiurl + "StandardMilestoneSet/Edit/" + projectId
        const abc$ = this.http.put(link, body)
        const response = await lastValueFrom(abc$)
        return response
    }

    async GetPortfolioOwnerForPreferences() {
        var link = GlobalVariables.apiurl + "PortfolioOwner/GetPortfolioOwnersForPreferences"
        const abc$ = this.http.get(link)
        const response = await lastValueFrom(abc$)
        return response
    }

    async deleteMilestone(id) {
        var link = GlobalVariables.apiurl + "StandardMilestoneSet/" + id
        const abc$ = this.http.delete(link)
        const response = await lastValueFrom(abc$)
        return response
    }
}
