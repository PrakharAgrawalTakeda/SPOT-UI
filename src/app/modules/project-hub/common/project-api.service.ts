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
  async getBudgetPerformanceById(projectid) {
      var url = GlobalVariables.apiurl + "BudgetPerformance/GetByProjectId/" + projectid
      const abc$ = this.http.get(url)
      const response = await lastValueFrom(abc$)
      return response
  }
  async getKeyAssumptionsByOption(projectid, optionId) {
      var url = GlobalVariables.apiurl + "BusinessCase/KeyAssumption/" + projectid+ "/"+ optionId
      const abc$ = this.http.get(url)
      const response = await lastValueFrom(abc$)
      return response
  }
  async getRiskIssuesByOption(projectid, optionId) {
      var url = GlobalVariables.apiurl + "BusinessCase/RiskIssue/" + projectid+ "/"+ optionId
      const abc$ = this.http.get(url)
      const response = await lastValueFrom(abc$)
      return response
  }
  async getTimelineByOption(projectid, optionId) {
      var url = GlobalVariables.apiurl + "BusinessCase/Timeline/" + projectid+ "/"+ optionId
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
    var url = GlobalVariables.apiurl + "GeneralInfo/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getProjectRequirements(projectid) {
      var url = GlobalVariables.apiurl + "BenefitsAndRequirements/" + projectid
      const abc$ = this.http.get(url)
      const response = await lastValueFrom(abc$)
      return response
  }
  async getBusinessCaseBenefits(projectid, optionId) {
      var url = GlobalVariables.apiurl + "BusinessCaseBenefits/GetByProjectIdAndOptionId/" + projectid + "/" + optionId
      const abc$ = this.http.get(url)
      const response = await lastValueFrom(abc$)
      return response
  }
  async getGeneralInfoDataWizzard(projectid, callLocation) {
      var url = GlobalVariables.apiurl + "GeneralInfo/" + projectid + "?wizard="+callLocation
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

  async bulkeditFunding(body,projectId){
    var link = GlobalVariables.apiurl+"Funding/BulkEditFunding/" + projectId
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
  async editProjectRequirements(userId, body) {
      var url = GlobalVariables.apiurl + "BenefitsAndRequirements/UpdateProjectProposal/" + userId
      const abc$ = this.http.post(url, body)
      const response = await lastValueFrom(abc$)
      return response
  }
  async editBusinessCaseBenefits( body) {
      var url = GlobalVariables.apiurl + "BusinessCaseBenefits"
      const abc$ = this.http.post(url, body)
      const response = await lastValueFrom(abc$)
      return response
  }
  async editBudgetPerformance(body) {
      var url = GlobalVariables.apiurl + "BudgetPerformance"
      const abc$ = this.http.post(url, body)
      const response = await lastValueFrom(abc$)
      return response
  }
  async editGeneralInfoWizzard(projectid, body, wizzard) {
      if(wizzard =="CloseOut"){
          wizzard = "ProjectCloseOut";
      }
    var url = GlobalVariables.apiurl + "GeneralInfo/" + projectid + "?wizard=" + wizzard
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
    console.log("inside delete api")
      var link = GlobalVariables.apiurl+"KeyAssumption/"+id
      const abc$ = this.http.delete(link)
      const response = await lastValueFrom(abc$)
      return response
   }
  async deleteKeyAssumptionByOption(id: string, optionId: string, projectId: string) {
      var link = GlobalVariables.apiurl + "BusinessCase/KeyAssumption/"+ projectId+ "/"  +optionId+"/" + id
      const abc$ = this.http.delete(link)
      const response = await lastValueFrom(abc$)
      return response
  }
  async deleteRiskIssueByOption(id: string, optionId: string, projectId: string) {
      var link = GlobalVariables.apiurl + "BusinessCase/RiskIssue/"+ projectId+ "/"  +optionId+"/" + id
      const abc$ = this.http.delete(link)
      const response = await lastValueFrom(abc$)
      return response
  }
  async deleteScheduleForOption(id: string, optionId: string, projectId: string) {
      var link = GlobalVariables.apiurl+"BusinessCase/Timeline/"+ projectId+ "/"  +optionId+"/" + id
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
  async addKeyAssumptionForOption(body){
      var link = GlobalVariables.apiurl+"BusinessCase/KeyAssumption"
      const abc$ = this.http.post(link,body)
      const response = await lastValueFrom(abc$)
      return response
  }
  async addSingleOperationalBenefit(body, optionId,projectId){
      var link = GlobalVariables.apiurl+"BusinessCaseBenefits/AddNew/"+ optionId + "/" + projectId
      const abc$ = this.http.post(link,body)
      const response = await lastValueFrom(abc$)
      return response
  }
  async addRiskIssueForOption(body) {
      var link = GlobalVariables.apiurl + "BusinessCase/RiskIssue"
      const abc$ = this.http.post(link, body)
      const response = await lastValueFrom(abc$)
      return response
  }
  async addTimelineForOption(body) {
      var link = GlobalVariables.apiurl + "BusinessCase/Timeline"
      const abc$ = this.http.post(link, body)
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
  async bulkEditTimelineForOption(body,optionId,projectId,){
      var link = GlobalVariables.apiurl+"BusinessCase/Timeline/BulkEdit/"+optionId + "/" + projectId;
      const abc$ = this.http.put(link,body)
      const response = await lastValueFrom(abc$)
      return response
  }
  async bulkEditKeyAssumptionsForOption(body,projectId){
      var link = GlobalVariables.apiurl+"BusinessCase/KeyAssumption/BulkEdit/" + projectId
      const abc$ = this.http.put(link,body)
      const response = await lastValueFrom(abc$)
      return response
  }
  async bulkEditBusinessCaseOperationalBenefits(body){
      var link = GlobalVariables.apiurl+"BusinessCaseBenefits"
      const abc$ = this.http.post(link,body)
      const response = await lastValueFrom(abc$)
      return response
  }
  async bulkEditRiskIssuesForOption(body,projectId){
      var link = GlobalVariables.apiurl+"BusinessCase/RiskIssue/BulkEdit/" + projectId
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
    var link = GlobalVariables.apiurl+"ProjectBaselineLogs/BulkEditProjectBaselineLog"
    const abc$ = this.http.put(link,body)
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
    async getStandardMilestoneSets(projectid: string){
        var userid = GlobalVariables.apiurl+"StandardMilestoneSet/GetTemplates/"+ projectid
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
    async deleteBusinessCaseOptionDetail(projectId: string, optionId:string,id: string) {
        var link = GlobalVariables.apiurl + "BusinessCaseBenefits/" + projectId + "/" + optionId + "/" + id;
        const abc$ = this.http.delete(link)
        const response = await lastValueFrom(abc$)
        return response
    }

  async updateCost(body,projectId){
    var link = GlobalVariables.apiurl+"TOPS/" + projectId
    const abc$ = this.http.put(link,body)
    const response = await lastValueFrom(abc$)
    return response
}

async updateBusinessCaseCost(body, projectId, optionid){
  var url = GlobalVariables.apiurl+"BusinessCaseCostFunding/BusinessCaseCost/"+optionid+"/" + projectId
  const abc$ = this.http.put(url,body)
  const response = await lastValueFrom(abc$)
  return response
}


async updateBusinessCaseFunding(body, projectId, optionid){
  var url = GlobalVariables.apiurl+"BusinessCaseCostFunding/BulkEditBusinessCaseFunding/"+optionid+"/" + projectId
  const abc$ = this.http.put(url,body)
  const response = await lastValueFrom(abc$)
  return response
}
  async BulkEditProjectCharter(projectid: string, data) {
    var url = GlobalVariables.apiurl + "ProjectCharter/" + projectid
    const abc$ = this.http.put(url, data)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getLessonLearnedbyProjectId(projectid) {
    var url = GlobalVariables.apiurl + "LessonsLearned/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }

  async bulkEditLessonLearned(body, projectid) {
    var url = GlobalVariables.apiurl + "LessonsLearned/" + projectid
    const abc$ = this.http.put(url, body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async editLessonLearnedTakeaway( projectid, takeaway) {
      var url = GlobalVariables.apiurl + "LessonsLearned/" + projectid + "?takeaways=" + takeaway
      const abc$ = this.http.patch(url, projectid)
      const response = await lastValueFrom(abc$)
      return response
  }
  async getTOPS(projectid: string) {
    var url = GlobalVariables.apiurl + "TOPS/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getFunding(projectid: string) {
    var url = GlobalVariables.apiurl + "Funding/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getCostFunding(projectid: string) {
    var url = GlobalVariables.apiurl + "CostFunding/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }

  async deleteFunding(id: string) {
    var link = GlobalVariables.apiurl + "Funding/" + id
    const abc$ = this.http.delete(link)
    const response = await lastValueFrom(abc$)
    return response
  }
    async deleteFundingBusinessCase(projectId: string, optionId: string,id: string) {
        var link = GlobalVariables.apiurl + "BusinessCaseCostFunding/BusinessCaseFunding/" +projectId + '/' + optionId + '/'+ id
        const abc$ = this.http.delete(link)
        const response = await lastValueFrom(abc$)
        return response
    }

  async getLocalAttributes(projectid: string) {
    var url = GlobalVariables.apiurl + "LocalAttributes/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }

  async editLocalAttributes(projectid, body) {
    var url = GlobalVariables.apiurl + "LocalAttributes/" + projectid
    const abc$ = this.http.put(url, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getBusinessCaseCostFunding(projectid, optionid) {
    var url = GlobalVariables.apiurl + "BusinessCaseCostFunding/"+optionid+"/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }

  async deleteBusinessCaseFunding(projectId: string,optionId: string,id: string) {
    var link = GlobalVariables.apiurl + "BusinessCaseCostFunding/BusinessCaseFunding/" +projectId+ "/"+optionId +"/" + id;
    const abc$ = this.http.delete(link)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getCAPSbyProjectID(projectid) {
    var url = GlobalVariables.apiurl + "CAPS/" + projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }

  async deleteWW(id: string) {
    var link = GlobalVariables.apiurl + "CAPS/WaterWaste/" + id;
    const abc$ = this.http.delete(link)
    const response = await lastValueFrom(abc$)
    return response
  }

  async addWW(body) {
    var link = GlobalVariables.apiurl + "CAPS/WaterWaste"
    const abc$ = this.http.post(link, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async deleteBiogenics(id: string) {
    var link = GlobalVariables.apiurl + "CAPS/Biogenics/" + id;
    const abc$ = this.http.delete(link)
    const response = await lastValueFrom(abc$)
    return response
  }

  async addBiogenics(body) {
    var link = GlobalVariables.apiurl + "CAPS/Biogenics"
    const abc$ = this.http.post(link, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  }

