import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MsalService} from '@azure/msal-angular';
import {GlobalVariables} from 'app/shared/global-variables';
import {lastValueFrom} from 'rxjs';

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
  async askNeedGetLinkData(projectid: string){
    var userid = GlobalVariables.apiurl+"AskNeed/GetAskNeedLinkData/"+projectid
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async riskIssueGetLinkData(projectid: string){
      var userid = GlobalVariables.apiurl+"RiskIssue/GetRiskIssuesLinkData/"+projectid
      const abc$ = this.http.get(userid)
      const response = await lastValueFrom(abc$)
      return response
  }
  async editAskNeed(projectId: string,body){
    var link = GlobalVariables.apiurl+"AskNeed/"+projectId+"/" + body.askNeedUniqueId
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
  async editRiskIssue(projectId: string,body){
    var link = GlobalVariables.apiurl+"RiskIssue/"+projectId+"/" + body.riskIssueUniqueId
    var abc$ = this.http.put(link,body)
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
  async editSchedule(projectId: string,body){
    var link = GlobalVariables.apiurl+"Schedule/"+projectId+"/" + body.scheduleUniqueId
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
  async deleteAskNeed(projectId:string, id: string){
    var link = GlobalVariables.apiurl+"AskNeed/"+projectId+"/"+id
    const abc$ = this.http.delete(link)
    const response = await lastValueFrom(abc$)
    return response
  }
  async deleteSchedule(projectId:string, id: string){
    var link = GlobalVariables.apiurl+"Schedule/"+projectId+"/"+id
    const abc$ = this.http.delete(link)
    const response = await lastValueFrom(abc$)
    return response
  }
  async deleteRiskIssue(projectId:string, id: string){
    var link = GlobalVariables.apiurl+"RiskIssue/"+projectId+"/"+id
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
  getPhaseState(projectId){
      var url = GlobalVariables.apiurl + "ProjectHubData/PhaseState/"+ projectId
      const abc$ = this.http.get(url)
      const response =  lastValueFrom(abc$)
      return response
  }
  postPhaseState(body){
      var url = GlobalVariables.apiurl + "ProjectHubData/PhaseState"
      const abc$ = this.http.post(url,body)
      const response =  lastValueFrom(abc$)
      return response
  }
  getCapitalPhase(){
      var url = GlobalVariables.apiurl + "ProjectHubData/CapitalPhase"
      const abc$ = this.http.get(url)
      const response =  lastValueFrom(abc$)
      return response
  }
  getIncompleteItems(projectId){
      var url = GlobalVariables.apiurl + "ProjectHubData/IncompleteItems/"+ projectId
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
    var url = GlobalVariables.apiurl + "ProjectHubData/ProjectHubData/" + projectid
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
  async bulkeditAskNeedLinks(body,projectId){
    var link = GlobalVariables.apiurl+"AskNeed/BulkEditAskNeedLinks/" + projectId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async bulkeditRiskIssueLinks(body,projectId){
      var link = GlobalVariables.apiurl+"RiskIssue/BulkEditRiskIssuesLinks/" + projectId
      const abc$ = this.http.put(link,body)
      const response = await lastValueFrom(abc$)
      return response
  }
  async bulkeditScheduleLinks(body,projectId){
    var link = GlobalVariables.apiurl+"Schedule/BulkEditScheduleLinks/" + projectId
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
  async programReport(body){
     var link = GlobalVariables.apiurl+"ProjectHubData/InsertReports"
     const abc$ = this.http.post(link,body)
     const response = await lastValueFrom(abc$)
     return response
  }
  async isParent(projectId:string){
      var url = GlobalVariables.apiurl + "ProjectHubData/IsParent/"+ projectId
      const abc$ = this.http.get(url)
      const response =  lastValueFrom(abc$)
      return response
    }

    async milestoneGetLinkData(projectid: string){
      var userid = GlobalVariables.apiurl+"Schedule/GetScheduleLinkData/"+ projectid
      const abc$ = this.http.get(userid)
      const response = await lastValueFrom(abc$)
      return response
    }
    async bulkeditRiskIssue(body,projectId){
        var link = GlobalVariables.apiurl+"RiskIssue/BulkEdit/" + projectId
        const abc$ = this.http.put(link,body)
        const response = await lastValueFrom(abc$)
        return response
    }

  async getfilterlistToBeDeleted() {
    var options = {
      "headers": {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc0MjI3OTU4LCJuYmYiOjE2NzQyMjc5NTgsImV4cCI6MTY3NDIzMTk4NCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQUFiWXJwb0NpeWxZZWNNY2ZWekFJYi9DODhJQmhWbk5xd3NpaEh6dUZNcm02VklQUWQ1dEthd1pXNmZxRGM2c2UiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjEyMi4xNzkuMTA2LjE5NCIsIm5hbWUiOiJXYWdsYXdhbGEsIFplbmFiIChleHQpIiwib2lkIjoiODE5NWIwOGItY2FmNi00MTE5LTg1YjQtNDJhZThkN2Y5ZTk3Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIyNDM0MDk3MjctMTkzMjA3NjUyMi00MDc2NTIyNzUxLTg0MTUzMiIsInJoIjoiMC5BUkFBT19iOVZ5Si1vMFdEM05Od0F4WTZybnZKVnhURU9ZbEhtc1ljZWpraEhab1FBTlEuIiwic2NwIjoiQXBpLlJlYWQiLCJzdWIiOiJ0eTFsR1o5elNEcVo4bkFjX3hONVJWV0xGbUxIQW1PNUM2bld2bkZ5WmlnIiwidGlkIjoiNTdmZGY2M2ItN2UyMi00NWEzLTgzZGMtZDM3MDAzMTYzYWFlIiwidW5pcXVlX25hbWUiOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInVwbiI6InplbmFiLndhZ2xhd2FsYUB0YWtlZGEuY29tIiwidXRpIjoid2czWGh2STdwME96WlZGR215OGxBQSIsInZlciI6IjEuMCJ9.J2wS0l8SLrJRaxOr1OAz6ThFPMnOu9tEEbEqsG4bZsxfYEkXC9DP4msxSY5Vz2bL-us6kPLRuP8F26v7uq9SLy2_CqCjoT-0CVVp_1hDKlyWrqgJFD6t1UngE-4EuD5lAlL8NtjQWkQv_qZ3Lfu5tQW2fUTo6rIbBWIr-oJ5te68hC-hZPRnTJ0tPu6-FLBxhsrtQ5kKC5owNytTk24txawI6bt5Oxvx7dxy-97nE95b8FXgUqp3Uum2Ovf9lBvpxut1Bs9dgXuYdcdcEj-xREis15n5qq7H1wOogje7OTeKTtL3oKAAtTTngVglDvFcnasXWcY9hmiEH1v02sJGow"
      }
    }
    var userid = "https://localhost:7288/api/FilterProjects/FilterCriteria"
    const abc$ = this.http.get(userid, options)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getLocalCurrency() {
    var options = {
      "headers": {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc0MjI3OTU4LCJuYmYiOjE2NzQyMjc5NTgsImV4cCI6MTY3NDIzMTk4NCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQUFiWXJwb0NpeWxZZWNNY2ZWekFJYi9DODhJQmhWbk5xd3NpaEh6dUZNcm02VklQUWQ1dEthd1pXNmZxRGM2c2UiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjEyMi4xNzkuMTA2LjE5NCIsIm5hbWUiOiJXYWdsYXdhbGEsIFplbmFiIChleHQpIiwib2lkIjoiODE5NWIwOGItY2FmNi00MTE5LTg1YjQtNDJhZThkN2Y5ZTk3Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIyNDM0MDk3MjctMTkzMjA3NjUyMi00MDc2NTIyNzUxLTg0MTUzMiIsInJoIjoiMC5BUkFBT19iOVZ5Si1vMFdEM05Od0F4WTZybnZKVnhURU9ZbEhtc1ljZWpraEhab1FBTlEuIiwic2NwIjoiQXBpLlJlYWQiLCJzdWIiOiJ0eTFsR1o5elNEcVo4bkFjX3hONVJWV0xGbUxIQW1PNUM2bld2bkZ5WmlnIiwidGlkIjoiNTdmZGY2M2ItN2UyMi00NWEzLTgzZGMtZDM3MDAzMTYzYWFlIiwidW5pcXVlX25hbWUiOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInVwbiI6InplbmFiLndhZ2xhd2FsYUB0YWtlZGEuY29tIiwidXRpIjoid2czWGh2STdwME96WlZGR215OGxBQSIsInZlciI6IjEuMCJ9.J2wS0l8SLrJRaxOr1OAz6ThFPMnOu9tEEbEqsG4bZsxfYEkXC9DP4msxSY5Vz2bL-us6kPLRuP8F26v7uq9SLy2_CqCjoT-0CVVp_1hDKlyWrqgJFD6t1UngE-4EuD5lAlL8NtjQWkQv_qZ3Lfu5tQW2fUTo6rIbBWIr-oJ5te68hC-hZPRnTJ0tPu6-FLBxhsrtQ5kKC5owNytTk24txawI6bt5Oxvx7dxy-97nE95b8FXgUqp3Uum2Ovf9lBvpxut1Bs9dgXuYdcdcEj-xREis15n5qq7H1wOogje7OTeKTtL3oKAAtTTngVglDvFcnasXWcY9hmiEH1v02sJGow"
      }
    }
    var userid = "https://localhost:7288/api/Budget/GetLocalCurrency"
    const abc$ = this.http.get(userid, options)
    const response = await lastValueFrom(abc$)
    return response
  }

  }

