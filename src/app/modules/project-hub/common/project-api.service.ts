
import {HttpClient, HttpParams} from '@angular/common/http';
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
  async bulkeditSchedule(body,projectId){
    var link = GlobalVariables.apiurl+"Schedule/BulkEdit/" + projectId
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
  async deleteOperationalPerformance(id: string){
    var link = GlobalVariables.apiurl+"ProjectCharterKeySuccesses/"+id
    const abc$ = this.http.delete(link)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getOperationalPerformanceSingle(itemid: string){
    var userid = GlobalVariables.apiurl+"ProjectCharterKeySuccesses/"+itemid
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async editOperationalPerformanceSingle(body){
    var link = GlobalVariables.apiurl+"ProjectCharterKeySuccesses/" + body.keySuccessUniqueId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async addOperationalPerformanceSingle(body){
    var link = GlobalVariables.apiurl+"ProjectCharterKeySuccesses"
    const abc$ = this.http.post(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async updatePrimayKPI(projectid:string ,itemid: string){
    var userid = GlobalVariables.apiurl+"Projects/UpdatePrimaryKPI/"+projectid
    const abc$ = this.http.patch(userid,itemid)
    const response = await lastValueFrom(abc$)
    return response
  }
  getDataCompleteness(projectId){
    var url = GlobalVariables.apiurl + "ProjectHubData/DataCompleteness/"+ projectId
    const abc$ = this.http.get(url)
    const response =  lastValueFrom(abc$)
    return response
  }
  getDataCompletenessPercent(projectId){
    var url = GlobalVariables.apiurl + "ProjectHubData/DataCompletenessPercent/"+ projectId
    const abc$ = this.http.get(url)
    const response =  lastValueFrom(abc$)
    return response
  }
  async addProjectTeam(body){
    var link = GlobalVariables.apiurl+"ProjectTeams"
    const abc$ = this.http.post(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async bulkeditQualityReference(body,projectId){
    var link = GlobalVariables.apiurl+"QualityReference/BulkEditQualityRef/" + projectId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getProjectBaseline(projectId){
    var userid = GlobalVariables.apiurl+"ProjectBaselines/" + projectId
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async bulkeditProjectTeam(body,projectId){
    var link = GlobalVariables.apiurl+"ProjectTeams/BulkEdit/" + projectId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async bulkeditKeySuccess(body,projectId){
    var link = GlobalVariables.apiurl+"ProjectCharterKeySuccesses/BulkEdit/" + projectId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async addProjectBaselineLog(body){
    var link = GlobalVariables.apiurl+"ProjectBaselineLogs"
    const abc$ = this.http.post(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getProjectBaselineLog(projectId){
    var userid = GlobalVariables.apiurl+"ProjectBaselineLogs/" + projectId
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async editProjectBaseline(body){
    var link = GlobalVariables.apiurl+"ProjectBaselines/" + body.projectId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getprojectTeams(projectid, teamMemberAdId) {
    const params = new HttpParams().set('id',teamMemberAdId)
    var link = GlobalVariables.apiurl + "ProjectTeams/" + projectid + `?${params.toString()}`
    const abc$ = this.http.get(link)
    const response = await lastValueFrom(abc$)
    return response
  }

  async patchBaselineLogs(body){
    var link = GlobalVariables.apiurl+"ProjectBaselineLogs/IncludedInSlipChart"
    const abc$ = this.http.patch(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getProjectHubData(projectid) {
    var url = GlobalVariables.apiurl + "ProjectHubData/ProjectView/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getProjectBaselineLogDetails(projectId){
    var userid = GlobalVariables.apiurl+"ProjectBaselineLogs/GetProjectBaselineLogDetails/" + projectId
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async bulkeditAskNeeds(body,projectId){
    var link = GlobalVariables.apiurl+"AskNeed/BulkEdit/" + projectId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  getProjectTree(projectId){
    var url = GlobalVariables.apiurl + "ProjectHubData/ProjectTree/"+ projectId
    const abc$ = this.http.get(url)
    const response =  lastValueFrom(abc$)
    return response
  }
  async updateParent(projectId:string, parentId: string){
      var url = GlobalVariables.apiurl + "ProjectHubData/UpdateParent/"+ projectId + "/" +parentId
      var body = [];
      const abc$ = this.http.put(url, body)
      const response =  lastValueFrom(abc$)
      return response
  }
  async linkProject(projectId:string, parentId: string){
      var url = GlobalVariables.apiurl + "ProjectHubData/LinkProject/"+ projectId + "/" +parentId
      var body = [];
      const abc$ = this.http.put(url, body)
      const response =  lastValueFrom(abc$)
      return response
  }
  async getChildren(projectId:string){
      var url = GlobalVariables.apiurl + "ProjectHubData/GetChildren/"+ projectId
      const abc$ = this.http.get(url)
      const response =  lastValueFrom(abc$)
      return response
  }
  async DeleteLink(projectId:string){
      var url = GlobalVariables.apiurl + "ProjectHubData/DeleteLink/"+ projectId
      const abc$ = this.http.delete(url,)
      const response =  lastValueFrom(abc$)
      return response
  }
}
