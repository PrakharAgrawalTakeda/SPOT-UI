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
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjczNDQyNDA4LCJuYmYiOjE2NzM0NDI0MDgsImV4cCI6MTY3MzQ0Nzk5NywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQWE1eGxFd3Vma3VzYnh2dGltcWIyVkJlems5Q3ZTRi9SdTJGL0FQZEhaOUFqR2FyakUrYTcxZ2txdm1BclBld1YiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjEwMy43My4xODEuMTgiLCJuYW1lIjoiV2FnbGF3YWxhLCBaZW5hYiAoZXh0KSIsIm9pZCI6IjgxOTViMDhiLWNhZjYtNDExOS04NWI0LTQyYWU4ZDdmOWU5NyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMjQzNDA5NzI3LTE5MzIwNzY1MjItNDA3NjUyMjc1MS04NDE1MzIiLCJyaCI6IjAuQVJBQU9fYjlWeUotbzBXRDNOTndBeFk2cm52SlZ4VEVPWWxIbXNZY2Vqa2hIWm9RQU5RLiIsInNjcCI6IkFwaS5SZWFkIiwic3ViIjoidHkxbEdaOXpTRHFaOG5BY194TjVSVldMRm1MSEFtTzVDNm5Xdm5GeVppZyIsInRpZCI6IjU3ZmRmNjNiLTdlMjItNDVhMy04M2RjLWQzNzAwMzE2M2FhZSIsInVuaXF1ZV9uYW1lIjoiemVuYWIud2FnbGF3YWxhQHRha2VkYS5jb20iLCJ1cG4iOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInV0aSI6IkJvdGhTUG4tVEVhR1p4V0ZmZzR2QVEiLCJ2ZXIiOiIxLjAifQ.dyr6x4TuUFKSbtvwKqhJdfALGBF4IqrZjjVc8MLlF8bVTupbA2JRvRRZCyylZQTfNWAOvbZyTfYaWr1Rmizfd98B_WK0jzI-Z4qbsd-jc5uYMMvyeh3yMRFJj1J44hjEQkJ9hm6FBIdqYQQyr9V3_-laBa9vKElG6hQFVvwP6IvTs993ObEYwPQwyWtYDiUh3wq07HfbE0U2P66fi6ZloPcB271D27p2JPIyIiK1EjZ5SyZ9xPXYbs9N-IUiBMBo8zCdiRWmCuUIAtRlMwzmy6UuZOjXS-GrGri8Mqauh3gmsGnuptHnZlJ7KPFzPN9IPBHLoFJXcI6Snk7IRw6etQ"
      }
    }
    var userid = "https://localhost:7288/api/ProjectTeams/CreateProject"
    // var userid = GlobalVariables.apiurl + "ProjectTeams/CreateProject"
    const abc$ = this.http.post(userid, body, options)
    const response = await lastValueFrom(abc$)
    return response
  }

  async getTemplateInfo(body) {
    body.CopyUserID = "321be4b0-6338-4ed4-b40d-b9fdf9b4c489";
    var options = {
      "headers": {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjcyOTA5Mjg1LCJuYmYiOjE2NzI5MDkyODUsImV4cCI6MTY3MjkxMzM0MiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQUp6K0RaOTBsZWpkVHpyb1htMzVnOWhpZ1cyYnVXZmlYTlpoSVMvRVIwMVBGVTVIYTVobDh1YkpQY1NETXY2T0siLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJBbWV0YSIsImdpdmVuX25hbWUiOiJOaXRpbiIsImlwYWRkciI6IjE4Mi42OC4xOTUuNDMiLCJuYW1lIjoiQW1ldGEsIE5pdGluIChleHQpIiwib2lkIjoiN2I2YWRlMzgtZDM0Yy00ZWY2LThjOTAtNGI4ZDM5N2FkNmZlIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIyNDM0MDk3MjctMTkzMjA3NjUyMi00MDc2NTIyNzUxLTg0NTkwMCIsInJoIjoiMC5BUkFBT19iOVZ5Si1vMFdEM05Od0F4WTZybnZKVnhURU9ZbEhtc1ljZWpraEhab1FBRGcuIiwic2NwIjoiQXBpLlJlYWQiLCJzdWIiOiJ5X2F1aVR6aHJGMEpiT0pYVDVreXd2cThqajkwcUlCV3k1Y2ZrOFRXSy00IiwidGlkIjoiNTdmZGY2M2ItN2UyMi00NWEzLTgzZGMtZDM3MDAzMTYzYWFlIiwidW5pcXVlX25hbWUiOiJuaXRpbi5hbWV0YUB0YWtlZGEuY29tIiwidXBuIjoibml0aW4uYW1ldGFAdGFrZWRhLmNvbSIsInV0aSI6InpELUFrVzhVQkV5b1pQU3pmcVBmQUEiLCJ2ZXIiOiIxLjAifQ.dekzWg3Pe1DzfvKBg40I0UoTPFpCabWtOJrex1KYRWYiby1qQYCBaoWuDlbwAHg1YrVe0xIB2B8-kWw3e5kxPx9lVGOXA960dO_1m0l7oIhJeCUcYnOssCz7jtOMvdi85n8X2e0-TVLiLbyrA2D7qB4NsjaG6Gz4hPpA4wmaGu-fb8n1RJHfoebTz-8iNCkbB3rnH-fboUt3lODdSBdpfQO8yF1UVk0Op_zG65NtoXdp-fuw3C5NAUEoEyQqkCkPUy-khjfdvlg_8IvNmQ0pQ57iv3ZvOlbxfHyEYygH6HMy9cMzjXqPAZQ-gG6MfyZRKglsaTJayWLjCMYhGbbCyg"
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
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjcyOTA5Mjg1LCJuYmYiOjE2NzI5MDkyODUsImV4cCI6MTY3MjkxMzM0MiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQUp6K0RaOTBsZWpkVHpyb1htMzVnOWhpZ1cyYnVXZmlYTlpoSVMvRVIwMVBGVTVIYTVobDh1YkpQY1NETXY2T0siLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJBbWV0YSIsImdpdmVuX25hbWUiOiJOaXRpbiIsImlwYWRkciI6IjE4Mi42OC4xOTUuNDMiLCJuYW1lIjoiQW1ldGEsIE5pdGluIChleHQpIiwib2lkIjoiN2I2YWRlMzgtZDM0Yy00ZWY2LThjOTAtNGI4ZDM5N2FkNmZlIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIyNDM0MDk3MjctMTkzMjA3NjUyMi00MDc2NTIyNzUxLTg0NTkwMCIsInJoIjoiMC5BUkFBT19iOVZ5Si1vMFdEM05Od0F4WTZybnZKVnhURU9ZbEhtc1ljZWpraEhab1FBRGcuIiwic2NwIjoiQXBpLlJlYWQiLCJzdWIiOiJ5X2F1aVR6aHJGMEpiT0pYVDVreXd2cThqajkwcUlCV3k1Y2ZrOFRXSy00IiwidGlkIjoiNTdmZGY2M2ItN2UyMi00NWEzLTgzZGMtZDM3MDAzMTYzYWFlIiwidW5pcXVlX25hbWUiOiJuaXRpbi5hbWV0YUB0YWtlZGEuY29tIiwidXBuIjoibml0aW4uYW1ldGFAdGFrZWRhLmNvbSIsInV0aSI6InpELUFrVzhVQkV5b1pQU3pmcVBmQUEiLCJ2ZXIiOiIxLjAifQ.dekzWg3Pe1DzfvKBg40I0UoTPFpCabWtOJrex1KYRWYiby1qQYCBaoWuDlbwAHg1YrVe0xIB2B8-kWw3e5kxPx9lVGOXA960dO_1m0l7oIhJeCUcYnOssCz7jtOMvdi85n8X2e0-TVLiLbyrA2D7qB4NsjaG6Gz4hPpA4wmaGu-fb8n1RJHfoebTz-8iNCkbB3rnH-fboUt3lODdSBdpfQO8yF1UVk0Op_zG65NtoXdp-fuw3C5NAUEoEyQqkCkPUy-khjfdvlg_8IvNmQ0pQ57iv3ZvOlbxfHyEYygH6HMy9cMzjXqPAZQ-gG6MfyZRKglsaTJayWLjCMYhGbbCyg"
      }
    }
    var userid = "https://localhost:7288/api/QualityReference/" + projectid
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
