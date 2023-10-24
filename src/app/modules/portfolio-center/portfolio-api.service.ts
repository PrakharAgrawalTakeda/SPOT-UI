import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { GlobalVariables } from 'app/shared/global-variables';
import { map } from 'lodash';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioApiService {

  constructor(private http:HttpClient, private authService: MsalService) {}

  async getprojectNames(){
    var userid = GlobalVariables.apiurl+"Projects/GetbyUser/"+ this.authService.instance.getActiveAccount().localAccountId
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getprojects(){
    var userid = GlobalVariables.apiurl+"PortfolioCenterData/GetbyUser/"+ this.authService.instance.getActiveAccount().localAccountId
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getportfoliodata(body){
    var userid = GlobalVariables.apiurl+"PortfolioCenter"
    const abc$ = this.http.post(userid,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async Filters(body){
    var userid = GlobalVariables.apiurl+"FilterProjects/Filters"
    const abc$ = this.http.post(userid,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async FiltersByPage(body, from, count) {
    var userid = GlobalVariables.apiurl + "FilterProjects/PageFilters" + "?from=" + from + "&count=" + count
    const abc$ = this.http.post(userid, body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async MainFilters(body){
    var userid = GlobalVariables.apiurl+"FilterProjects/MainFilters"
    const abc$ = this.http.post(userid,body)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getfilterlist(){
    var userid = GlobalVariables.apiurl+"FilterProjects/FilterCriteria"
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }


  async BulkEditQualityReference(projectid: string, body: any) {
    var userid = GlobalVariables.apiurl + "/QualityReference/BulkEditQualityRef" + projectid
    const abc$ = this.http.put(userid, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getLocalCurrency() {
    var userid = GlobalVariables.apiurl + "Budget/GetLocalCurrency";
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getOnlyLocalCurrency(projectId) {
      var userid = GlobalVariables.apiurl + "Budget/GetOnlyLocalCurrency/" + projectId;
      const abc$ = this.http.get(userid)
      const response = await lastValueFrom(abc$)
      return response
  }

  async getLocalAttributes(portfolioOwners: string, executionScope: string) {
    var url = GlobalVariables.apiurl + "LocalAttributes/ByOwners" + "?portfolioOwners=" + portfolioOwners + "&executionScopes=" + executionScope
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }

  getCapitalPhase() {
    var url = GlobalVariables.apiurl + "ProjectHubData/CapitalPhase"
    const abc$ = this.http.get(url)
    const response = lastValueFrom(abc$)
    return response
  }
  getForecastData(body) {
    var userid = GlobalVariables.apiurl + "PortfolioCenter/GetForecastBulkEditData"
    const abc$ = this.http.post(userid, body)
    const response = lastValueFrom(abc$)
    return response
  }

  async bulkGenerateReports(body, userid) {
    var link = GlobalVariables.apiurl + "Report/BulkGenerateReports/" + userid
    const abc$ = this.http.put(link, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  getLBEData() {
    var url = GlobalVariables.apiurl + "Budget/GetLBEPeriods"
    const abc$ = this.http.get(url)
    const response = lastValueFrom(abc$)
    return response
  }

  getBudgetId() {
    var url = GlobalVariables.apiurl + "Budget/GetBudgetIds"
    const abc$ = this.http.get(url)
    const response = lastValueFrom(abc$)
    return response
  }

  getForecastExcelData(LBEPeriod, projectId, budgetId) {
    var url = GlobalVariables.apiurl + "Budget/GetExcelForecastData" + "?LBEPeriodUId=" + LBEPeriod + "&ProjectIds="+ projectId + "&BudgetIds="+ budgetId
    const abc$ = this.http.get(url)
    const response = lastValueFrom(abc$)
    return response
  }
  
  getHistoricalExcelData(budgetId, projectId) {
    var url = GlobalVariables.apiurl + "Budget/GetExcelUpdateData/Historical" + "?ProjectIds="+ projectId + "&BudgetIds="+ budgetId
    const abc$ = this.http.get(url)
    const response = lastValueFrom(abc$)
    return response
  } 

}
