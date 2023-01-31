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
    //     "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc1MTQxNzEwLCJuYmYiOjE2NzUxNDE3MTAsImV4cCI6MTY3NTE0NjAwMCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQWg4dmYxeThHdTBhZHBVb1hQdFVib0JWNExzbGdrNVp3SXJVL3oyNUJZZTFPSjBsUzV0dHdUWm9pV3RxTUJCMEciLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjI3LjU0LjE4NS4xMDEiLCJuYW1lIjoiV2FnbGF3YWxhLCBaZW5hYiAoZXh0KSIsIm9pZCI6IjgxOTViMDhiLWNhZjYtNDExOS04NWI0LTQyYWU4ZDdmOWU5NyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMjQzNDA5NzI3LTE5MzIwNzY1MjItNDA3NjUyMjc1MS04NDE1MzIiLCJyaCI6IjAuQVJBQU9fYjlWeUotbzBXRDNOTndBeFk2cm52SlZ4VEVPWWxIbXNZY2Vqa2hIWm9RQU5RLiIsInNjcCI6IkFwaS5SZWFkIiwic3ViIjoidHkxbEdaOXpTRHFaOG5BY194TjVSVldMRm1MSEFtTzVDNm5Xdm5GeVppZyIsInRpZCI6IjU3ZmRmNjNiLTdlMjItNDVhMy04M2RjLWQzNzAwMzE2M2FhZSIsInVuaXF1ZV9uYW1lIjoiemVuYWIud2FnbGF3YWxhQHRha2VkYS5jb20iLCJ1cG4iOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInV0aSI6Ilp6SnVnaDhvNzBtLXlVSnRqcElEQUEiLCJ2ZXIiOiIxLjAifQ.EOZBnaWAOSzCRp1P0pD1GHaSA4DIPcjUQNPGhCnz84KDgORoK2Nfd_Y17oGnkXFNXSwIwXTJoJYn4FwhhuXtaJTURRgixewfiUE7CZOwE_NIynEyVuksHrtfPGHDPrd1NH8WYVbuEtH3mFfbTdYnuPrm66zcOgonexVjX-Y9rJsdFwAQ_gEHoMFv6hFNxpiYJCwMsK7EWhPjpeybOlVxPtg9YHjbKlzBRLI1DF83TN3vm04AJqDfdmPbFd4jFHDtuBoLW7KfY-eNpHLxeA-o-v22cu80EeJktq0HGmgsIcm3p2GIeC-1z8FWyAn3neCFlPwDZ0Iwn5GQLOWxC39bjw"
    //   }
    // }
    // var userid = "https://localhost:7288/api/Projects/CreateProject"
    var userid = GlobalVariables.apiurl + "Projects/CreateProject"
    const abc$ = this.http.post(userid, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getTemplateInfo(body) {
    // body.CopyUserID = "321be4b0-6338-4ed4-b40d-b9fdf9b4c489";
    // var options = {
    //   "headers": {
    //     "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc1MTQxNzEwLCJuYmYiOjE2NzUxNDE3MTAsImV4cCI6MTY3NTE0NjAwMCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQWg4dmYxeThHdTBhZHBVb1hQdFVib0JWNExzbGdrNVp3SXJVL3oyNUJZZTFPSjBsUzV0dHdUWm9pV3RxTUJCMEciLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjI3LjU0LjE4NS4xMDEiLCJuYW1lIjoiV2FnbGF3YWxhLCBaZW5hYiAoZXh0KSIsIm9pZCI6IjgxOTViMDhiLWNhZjYtNDExOS04NWI0LTQyYWU4ZDdmOWU5NyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMjQzNDA5NzI3LTE5MzIwNzY1MjItNDA3NjUyMjc1MS04NDE1MzIiLCJyaCI6IjAuQVJBQU9fYjlWeUotbzBXRDNOTndBeFk2cm52SlZ4VEVPWWxIbXNZY2Vqa2hIWm9RQU5RLiIsInNjcCI6IkFwaS5SZWFkIiwic3ViIjoidHkxbEdaOXpTRHFaOG5BY194TjVSVldMRm1MSEFtTzVDNm5Xdm5GeVppZyIsInRpZCI6IjU3ZmRmNjNiLTdlMjItNDVhMy04M2RjLWQzNzAwMzE2M2FhZSIsInVuaXF1ZV9uYW1lIjoiemVuYWIud2FnbGF3YWxhQHRha2VkYS5jb20iLCJ1cG4iOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInV0aSI6Ilp6SnVnaDhvNzBtLXlVSnRqcElEQUEiLCJ2ZXIiOiIxLjAifQ.EOZBnaWAOSzCRp1P0pD1GHaSA4DIPcjUQNPGhCnz84KDgORoK2Nfd_Y17oGnkXFNXSwIwXTJoJYn4FwhhuXtaJTURRgixewfiUE7CZOwE_NIynEyVuksHrtfPGHDPrd1NH8WYVbuEtH3mFfbTdYnuPrm66zcOgonexVjX-Y9rJsdFwAQ_gEHoMFv6hFNxpiYJCwMsK7EWhPjpeybOlVxPtg9YHjbKlzBRLI1DF83TN3vm04AJqDfdmPbFd4jFHDtuBoLW7KfY-eNpHLxeA-o-v22cu80EeJktq0HGmgsIcm3p2GIeC-1z8FWyAn3neCFlPwDZ0Iwn5GQLOWxC39bjw"
    //   }
    // }
    // var userid = "https://localhost:7288/api/ProjectTeams/GetProjectTemplateInfoById"
    var userid = GlobalVariables.apiurl + "Projects/GetProjectTemplateInfoById"
    const abc$ = this.http.post(userid, body)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getQuality(projectid) {
    // var options = {
    //   "headers": {
    //     "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc1MDcwMDgxLCJuYmYiOjE2NzUwNzAwODEsImV4cCI6MTY3NTA3NDA4MiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQVBERUovZUVaTHk1UW0wL3hDdmkxUkx6cmdTZmhUTmFVeUF3UXEyWnJPYnhSQnJ6ZzhhYTlmOGUySDMza0I1aGEiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjI3LjU0LjE4NS4xMDEiLCJuYW1lIjoiV2FnbGF3YWxhLCBaZW5hYiAoZXh0KSIsIm9pZCI6IjgxOTViMDhiLWNhZjYtNDExOS04NWI0LTQyYWU4ZDdmOWU5NyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMjQzNDA5NzI3LTE5MzIwNzY1MjItNDA3NjUyMjc1MS04NDE1MzIiLCJyaCI6IjAuQVJBQU9fYjlWeUotbzBXRDNOTndBeFk2cm52SlZ4VEVPWWxIbXNZY2Vqa2hIWm9RQU5RLiIsInNjcCI6IkFwaS5SZWFkIiwic3ViIjoidHkxbEdaOXpTRHFaOG5BY194TjVSVldMRm1MSEFtTzVDNm5Xdm5GeVppZyIsInRpZCI6IjU3ZmRmNjNiLTdlMjItNDVhMy04M2RjLWQzNzAwMzE2M2FhZSIsInVuaXF1ZV9uYW1lIjoiemVuYWIud2FnbGF3YWxhQHRha2VkYS5jb20iLCJ1cG4iOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInV0aSI6InRKNUpnOEttWWt5a1ByMUZYc3NvQUEiLCJ2ZXIiOiIxLjAifQ.ek1GqTmtYer_DdRJTHyqE_hhU-TGvcdgozeecSrOslccbG2AlhVvzNI2c_1NVY1RqGl9wkPJfLr7xXhS7ZsLNIku10CKuzluK9ipGlStnlLS4shboBhh9kiD-hYZDEdwPLZ6EVfKq3pQsNR2XZ07OkMgZB4NbZqvs_09EHBhswnW5-x3WdYcQ-TJzY8q44jyqXZ4fcvgpyMLnlqRKkICMo2bh2yXNFkXYAQ7WVl3PR3Ur_HkYcvIN70HoKATIEOE4EekgSoLT6ltWwMATVM9f9_0QAbkyNXhHnNz6EU0aQcTULIfJUh_8Pj-_OhMG_-ghVa_0k_SBZ29R79LoNAElg"
    //   }
    // }
    // var userid = "https://localhost:7288/api/QualityReference/GetQualityReferenceByProjectId/" + projectid
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
}
