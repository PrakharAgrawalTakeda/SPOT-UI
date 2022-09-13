import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { GlobalVariables } from 'app/shared/global-variables';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(private http: HttpClient, private authService: MsalService) { }
  async getproject(projectid) {
    var url = GlobalVariables.apiurl + "Projects/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getprojectviewdata(projectid) {
    var url = GlobalVariables.apiurl + "ProjectHubData/ProjectView/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getmembersbyproject(projectid) {
    var url = GlobalVariables.apiurl + "ProjectHubData/ProjectTeam/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getportfolioData(projectid) {
    var url = GlobalVariables.apiurl + "PortfolioCenterData/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getGeneralInfoData(projectid) {
    var url = GlobalVariables.apiurl + "ProjectHubData/GeneralInfo/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getfilterlist(){
    var userid = GlobalVariables.apiurl+"FilterProjects/FilterCriteria"
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async askNeedSingle(itemid: string){
    var userid = GlobalVariables.apiurl+"AskNeed/"+itemid
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async editAskNeed(body){
    var link = GlobalVariables.apiurl+"AskNeed/" + body.askNeedUniqueId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async addAskNeed(body){
    var link = GlobalVariables.apiurl+"AskNeed"
    const abc$ = this.http.post(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async overallStatusSingle(itemid: string){
    var userid = GlobalVariables.apiurl+"OverAllStatus/"+itemid
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async editOverallStatus(body){
    var link = GlobalVariables.apiurl+"OverAllStatus/" + body.statusUnquieId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async editGeneralInfo(projectid, body) {
    var url = GlobalVariables.apiurl + "Projects/" + projectid
    const abc$ = this.http.put(url, body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getHubSettings(projectid: string){
    var userid = GlobalVariables.apiurl+"HubSetting/"+projectid
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async addHubSetting(body){
    var link = GlobalVariables.apiurl+"HubSetting"
    const abc$ = this.http.post(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async editHubSetting(body){
    var link = GlobalVariables.apiurl+"HubSetting/" + body.hubSettingId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async riskIssueSingle(itemid: string){
    var userid = GlobalVariables.apiurl+"RiskIssue/"+itemid
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async editRiskIssue(body){
    var link = GlobalVariables.apiurl+"RiskIssue/" + body.riskIssueUniqueId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async addRiskIssue(body){
    var link = GlobalVariables.apiurl+"RiskIssue"
    const abc$ = this.http.post(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async scheduleSingle(itemid: string){
    var userid = GlobalVariables.apiurl+"Schedule/"+itemid
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async editSchedule(body){
    var link = GlobalVariables.apiurl+"Schedule/" + body.scheduleUniqueId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async bulkeditSchedule(body){
    var link = GlobalVariables.apiurl+"Schedule/BulkEdit/" + body.projectId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async addSchedule(body){
    var link = GlobalVariables.apiurl+"Schedule"
    const abc$ = this.http.post(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async deleteAskNeed(id: string){
    var link = GlobalVariables.apiurl+"AskNeed/"+id
    const abc$ = this.http.delete(link)
    const response = await lastValueFrom(abc$)
    return response
  }
  async deleteSchedule(id: string){
    var link = GlobalVariables.apiurl+"Schedule/"+id
    const abc$ = this.http.delete(link)
    const response = await lastValueFrom(abc$)
    return response
  }
  async deleteRiskIssue(id: string){
    var link = GlobalVariables.apiurl+"RiskIssue/"+id
    const abc$ = this.http.delete(link)
    const response = await lastValueFrom(abc$)
    return response
  }
}
