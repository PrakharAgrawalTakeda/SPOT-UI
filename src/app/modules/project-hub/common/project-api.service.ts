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
  async getKeyAssumptionsByProject(projectid) {
      var url = GlobalVariables.apiurl + "KeyAssumption/" + projectid
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
  async getUserByName(name: string){
      var userid = GlobalVariables.apiurl+`ProjectTeams/UserSearch?${name.toString()}`
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
   async deleteKeyAssumption(id: string){
      var link = GlobalVariables.apiurl+"KeyAssumption/"+id
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
  async addKeyAssumption(body){
      var link = GlobalVariables.apiurl+"KeyAssumption"
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
  async bulkEditKeyAssumptions(body,projectId){
      var link = GlobalVariables.apiurl+"KeyAssumption/BulkEdit/" + projectId
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
    async projectCharterSingle(itemid: string){
      var userid = GlobalVariables.apiurl+"ProjectCharter/"+itemid
      const abc$ = this.http.get(userid)
      const response = await lastValueFrom(abc$)
      return response
    }
    async getReportInfoData(projectid) {
      var url = GlobalVariables.apiurl + "ProjectHubData/ReportPageInfo/" + projectid
      const abc$ = this.http.get(url)
      const response = await lastValueFrom(abc$)
      return response
    }
    async updateReportDates(projectid:string ,itemid: string){
      var userid = GlobalVariables.apiurl+"ProjectCharter/UpdateDate/"+projectid+"/"+itemid
      const abc$ = this.http.patch(userid,itemid)
      const response = await lastValueFrom(abc$)
      return response
    }
    async getBusinessCaseOptionInfoData(projectid, optionid) {
      var url = GlobalVariables.apiurl + "BusinessCaseOptionDetail/GetByProjectIdAndOptionId/"+optionid+"/" + projectid
      const abc$ = this.http.get(url)
      const response = await lastValueFrom(abc$)
      return response
    }
    async updateBusinessCaseOptionInfoDetails(body,projectId){
      var link = GlobalVariables.apiurl+"BusinessCaseOptionDetail/" + projectId
      const abc$ = this.http.put(link,body)
      const response = await lastValueFrom(abc$)
      return response
  }
  async BulkEditProjectCharter(projectid: string, data) {
    // var options = {
    //   "headers": {
    //     "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc1OTMzMjk0LCJuYmYiOjE2NzU5MzMyOTQsImV4cCI6MTY3NTkzNzU4MiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQW9jTnZRblY4elBmc01lenZwNW05N01zZHIvaHNkb2UyOXU3Y2F5VDQveTl3dnJGQzcycWd5WUNHR3M4UGpMMU4iLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjI3LjU0LjE4NS4xMDEiLCJuYW1lIjoiV2FnbGF3YWxhLCBaZW5hYiAoZXh0KSIsIm9pZCI6IjgxOTViMDhiLWNhZjYtNDExOS04NWI0LTQyYWU4ZDdmOWU5NyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMjQzNDA5NzI3LTE5MzIwNzY1MjItNDA3NjUyMjc1MS04NDE1MzIiLCJyaCI6IjAuQVJBQU9fYjlWeUotbzBXRDNOTndBeFk2cm52SlZ4VEVPWWxIbXNZY2Vqa2hIWm9RQU5RLiIsInNjcCI6IkFwaS5SZWFkIiwic3ViIjoidHkxbEdaOXpTRHFaOG5BY194TjVSVldMRm1MSEFtTzVDNm5Xdm5GeVppZyIsInRpZCI6IjU3ZmRmNjNiLTdlMjItNDVhMy04M2RjLWQzNzAwMzE2M2FhZSIsInVuaXF1ZV9uYW1lIjoiemVuYWIud2FnbGF3YWxhQHRha2VkYS5jb20iLCJ1cG4iOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInV0aSI6IjR4ekgtRTlDUzBxS25zX3NjcFprQUEiLCJ2ZXIiOiIxLjAifQ.WRWJLJi3wwyJw8HYYBqyr4y_T2mF7QITZHu47pkH5HPhabWLVPB4MrfRwULEpyZ7qq7n8KL_bB5aEGSY-EAmPS8MCrLmjhvtPCoOaXFFkQ_dtoD85na_4FTBOJnOEqpXauwXg4VynAhH-ZQRkdbRlCK8uJuefhePIOHgY6MpMCaKZy9qpsc4QS9XcHiAl81z-wPoE-hEFhWhTAmhxj6Hi2ihgryXGn8kmYQdQEG4X7DyogmsOXIqdas3_Ao4Iq3qiM5AehVO50fEk8mGwqglYrzm20MmfKgNtc1d0VNihKPF2KXB9UsnEy5p0wc2zmrBr2hzVIuiEm9RV67h743Waw"
    //   }
    // }
    // var url = "https://localhost:7288/api/ProjectCharter/" + projectid
    var url = GlobalVariables.apiurl + "ProjectCharter/" + projectid
    const abc$ = this.http.put(url, data)
    const response = await lastValueFrom(abc$)
    return response
  }
  }

