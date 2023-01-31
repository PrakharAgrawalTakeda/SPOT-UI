import { HttpClient } from '@angular/common/http';
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
  async createProject(body) {
    // var options = {
    //   "headers": {
    //     "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc1MTQ0MTIyLCJuYmYiOjE2NzUxNDQxMjIsImV4cCI6MTY3NTE0OTYxMCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQVJVMWt5bTh5ckpXV0FnUTQ5VDNKT28rWVk1NzRYK0dGS3F2MWNkV1g1RzZRajlYWHZhY294K1FhelpwcDljVmoiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjI3LjU0LjE4NS4xMDEiLCJuYW1lIjoiV2FnbGF3YWxhLCBaZW5hYiAoZXh0KSIsIm9pZCI6IjgxOTViMDhiLWNhZjYtNDExOS04NWI0LTQyYWU4ZDdmOWU5NyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMjQzNDA5NzI3LTE5MzIwNzY1MjItNDA3NjUyMjc1MS04NDE1MzIiLCJyaCI6IjAuQVJBQU9fYjlWeUotbzBXRDNOTndBeFk2cm52SlZ4VEVPWWxIbXNZY2Vqa2hIWm9RQU5RLiIsInNjcCI6IkFwaS5SZWFkIiwic3ViIjoidHkxbEdaOXpTRHFaOG5BY194TjVSVldMRm1MSEFtTzVDNm5Xdm5GeVppZyIsInRpZCI6IjU3ZmRmNjNiLTdlMjItNDVhMy04M2RjLWQzNzAwMzE2M2FhZSIsInVuaXF1ZV9uYW1lIjoiemVuYWIud2FnbGF3YWxhQHRha2VkYS5jb20iLCJ1cG4iOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInV0aSI6IlhRT2l4akZOS0VTQ3hPelEzWnBWQUEiLCJ2ZXIiOiIxLjAifQ.e8UoKoCNb-bJkEHnhyPXRLVnnYjW_BmX1i7LAOKc_GwGFUxFjslNSl0xR21Ms1hI6IyCkfP7wqZY6o_NFJ0-gLG4IpgmkehljYv56cTw6w0kwJ3Wyll2IHjTb1fii-lD_WdHKwdBAfkV3_7dqbjnZUJ_yGycL5nBexP45LJ9BrOIG0sX_j2BlUjanHqSEpu8XWpAX2icfWPNwW3m4STPIyDMHOoHvAyQJNAe7jBMra5f7y_YYdnw4HGEauVY4nMD3J7KlV83gnmQbEgoTYVU2nbWoApS39fiWc1Z00oqP0VQmB8UzNrusUZMyhU2LqhKgtrk9DkMABdL8KAQar4sQQ"
    //   }
    // }
    // var userid = "https://localhost:7288/api/Projects/CreateProject"
    var userid = GlobalVariables.apiurl + "Projects/CreateProject"
    const abc$ = this.http.post(userid, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getTemplateInfo(body) {
    var userid = GlobalVariables.apiurl + "Projects/GetProjectTemplateInfoById"
    const abc$ = this.http.post(userid, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getQuality(projectid) {
    var userid = GlobalVariables.apiurl + "QualityReference/GetQualityReferenceByProjectId/" + projectid
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
}
