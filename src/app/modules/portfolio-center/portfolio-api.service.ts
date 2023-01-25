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
    var options = {
      "headers": {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc0NTU4MDg2LCJuYmYiOjE2NzQ1NTgwODYsImV4cCI6MTY3NDU2Mjg0NSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQW1heS9FT21hQWpsL25ObEdwU1N1NlZoRlF2czZqL3N1QU5mQ3JGUGtNcWJLNFNiNjlaRG9kQk5xaTRYa1Q2YksiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjI3LjU0LjE4NS4xMDEiLCJuYW1lIjoiV2FnbGF3YWxhLCBaZW5hYiAoZXh0KSIsIm9pZCI6IjgxOTViMDhiLWNhZjYtNDExOS04NWI0LTQyYWU4ZDdmOWU5NyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMjQzNDA5NzI3LTE5MzIwNzY1MjItNDA3NjUyMjc1MS04NDE1MzIiLCJyaCI6IjAuQVJBQU9fYjlWeUotbzBXRDNOTndBeFk2cm52SlZ4VEVPWWxIbXNZY2Vqa2hIWm9RQU5RLiIsInNjcCI6IkFwaS5SZWFkIiwic3ViIjoidHkxbEdaOXpTRHFaOG5BY194TjVSVldMRm1MSEFtTzVDNm5Xdm5GeVppZyIsInRpZCI6IjU3ZmRmNjNiLTdlMjItNDVhMy04M2RjLWQzNzAwMzE2M2FhZSIsInVuaXF1ZV9uYW1lIjoiemVuYWIud2FnbGF3YWxhQHRha2VkYS5jb20iLCJ1cG4iOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInV0aSI6IjZBRzZfeHljRDBpTXRxNFE2OGdNQUEiLCJ2ZXIiOiIxLjAifQ.XgwUBoyybbSCwcy9lq9U6L5XnG8UHFkNga2fX6JQXK7tV8awixiGNEG22gkneE6f4D4UeJFEtyQpG9paRotVVVrT2EWFCNR7JlictsZ9jKUUHgbznFfNKC8Sj_BsPVKZwPaEsEZ5iQoKeeKEDqZvBS8XurzI-619LXK8zWQV-2yg3xrmSdOkRc5Zhf8F8MF2Snz77Ga5bXyDaVZLzyFvx8wplVIEH0omnyX_6fKkPiYqm-DSfgH0nCbTb1leBKf0DO19enE34JpcoVYuI1iakSpxREhg74Kjfbp07aVdaw9wU6PYijmEdrMWB0BQjCU9hx2X3z1cDXHMmum3tGzVrw"
      }
    }
    var userid = "https://localhost:7288/api/Projects/CreateProject"
    // var userid = GlobalVariables.apiurl + "ProjectTeams/CreateProject"
    const abc$ = this.http.post(userid, body, options)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getTemplateInfo(body) {
    body.CopyUserID = "321be4b0-6338-4ed4-b40d-b9fdf9b4c489";
    var options = {
      "headers": {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc0NTU4MDg2LCJuYmYiOjE2NzQ1NTgwODYsImV4cCI6MTY3NDU2Mjg0NSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQW1heS9FT21hQWpsL25ObEdwU1N1NlZoRlF2czZqL3N1QU5mQ3JGUGtNcWJLNFNiNjlaRG9kQk5xaTRYa1Q2YksiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjI3LjU0LjE4NS4xMDEiLCJuYW1lIjoiV2FnbGF3YWxhLCBaZW5hYiAoZXh0KSIsIm9pZCI6IjgxOTViMDhiLWNhZjYtNDExOS04NWI0LTQyYWU4ZDdmOWU5NyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMjQzNDA5NzI3LTE5MzIwNzY1MjItNDA3NjUyMjc1MS04NDE1MzIiLCJyaCI6IjAuQVJBQU9fYjlWeUotbzBXRDNOTndBeFk2cm52SlZ4VEVPWWxIbXNZY2Vqa2hIWm9RQU5RLiIsInNjcCI6IkFwaS5SZWFkIiwic3ViIjoidHkxbEdaOXpTRHFaOG5BY194TjVSVldMRm1MSEFtTzVDNm5Xdm5GeVppZyIsInRpZCI6IjU3ZmRmNjNiLTdlMjItNDVhMy04M2RjLWQzNzAwMzE2M2FhZSIsInVuaXF1ZV9uYW1lIjoiemVuYWIud2FnbGF3YWxhQHRha2VkYS5jb20iLCJ1cG4iOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInV0aSI6IjZBRzZfeHljRDBpTXRxNFE2OGdNQUEiLCJ2ZXIiOiIxLjAifQ.XgwUBoyybbSCwcy9lq9U6L5XnG8UHFkNga2fX6JQXK7tV8awixiGNEG22gkneE6f4D4UeJFEtyQpG9paRotVVVrT2EWFCNR7JlictsZ9jKUUHgbznFfNKC8Sj_BsPVKZwPaEsEZ5iQoKeeKEDqZvBS8XurzI-619LXK8zWQV-2yg3xrmSdOkRc5Zhf8F8MF2Snz77Ga5bXyDaVZLzyFvx8wplVIEH0omnyX_6fKkPiYqm-DSfgH0nCbTb1leBKf0DO19enE34JpcoVYuI1iakSpxREhg74Kjfbp07aVdaw9wU6PYijmEdrMWB0BQjCU9hx2X3z1cDXHMmum3tGzVrw"
      }
    }
    var userid = "https://localhost:7288/api/ProjectTeams/GetProjectTemplateInfoById"
    const abc$ = this.http.post(userid, body, options)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getQuality(projectid) {
    var options = {
      "headers": {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc0NTU4MDg2LCJuYmYiOjE2NzQ1NTgwODYsImV4cCI6MTY3NDU2Mjg0NSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQW1heS9FT21hQWpsL25ObEdwU1N1NlZoRlF2czZqL3N1QU5mQ3JGUGtNcWJLNFNiNjlaRG9kQk5xaTRYa1Q2YksiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjI3LjU0LjE4NS4xMDEiLCJuYW1lIjoiV2FnbGF3YWxhLCBaZW5hYiAoZXh0KSIsIm9pZCI6IjgxOTViMDhiLWNhZjYtNDExOS04NWI0LTQyYWU4ZDdmOWU5NyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMjQzNDA5NzI3LTE5MzIwNzY1MjItNDA3NjUyMjc1MS04NDE1MzIiLCJyaCI6IjAuQVJBQU9fYjlWeUotbzBXRDNOTndBeFk2cm52SlZ4VEVPWWxIbXNZY2Vqa2hIWm9RQU5RLiIsInNjcCI6IkFwaS5SZWFkIiwic3ViIjoidHkxbEdaOXpTRHFaOG5BY194TjVSVldMRm1MSEFtTzVDNm5Xdm5GeVppZyIsInRpZCI6IjU3ZmRmNjNiLTdlMjItNDVhMy04M2RjLWQzNzAwMzE2M2FhZSIsInVuaXF1ZV9uYW1lIjoiemVuYWIud2FnbGF3YWxhQHRha2VkYS5jb20iLCJ1cG4iOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInV0aSI6IjZBRzZfeHljRDBpTXRxNFE2OGdNQUEiLCJ2ZXIiOiIxLjAifQ.XgwUBoyybbSCwcy9lq9U6L5XnG8UHFkNga2fX6JQXK7tV8awixiGNEG22gkneE6f4D4UeJFEtyQpG9paRotVVVrT2EWFCNR7JlictsZ9jKUUHgbznFfNKC8Sj_BsPVKZwPaEsEZ5iQoKeeKEDqZvBS8XurzI-619LXK8zWQV-2yg3xrmSdOkRc5Zhf8F8MF2Snz77Ga5bXyDaVZLzyFvx8wplVIEH0omnyX_6fKkPiYqm-DSfgH0nCbTb1leBKf0DO19enE34JpcoVYuI1iakSpxREhg74Kjfbp07aVdaw9wU6PYijmEdrMWB0BQjCU9hx2X3z1cDXHMmum3tGzVrw"
      }
    }
    var userid = "https://localhost:7288/api/QualityReference/GetQualityReferenceByProjectId/" + projectid
    const abc$ = this.http.get(userid, options)
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
