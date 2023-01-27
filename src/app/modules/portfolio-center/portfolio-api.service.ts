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
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc0NjQ4NzU2LCJuYmYiOjE2NzQ2NDg3NTYsImV4cCI6MTY3NDY1NDE0NSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQUJYamJXc25LYnZqcFBkdW01VUJtaFhRQjc3aEY1alU0c1IzTGlzVG9HSUs0cm8zYmpvNHdhRHVsNVFwQUplU3EiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjEyMi4xNzkuMTA3LjIzMSIsIm5hbWUiOiJXYWdsYXdhbGEsIFplbmFiIChleHQpIiwib2lkIjoiODE5NWIwOGItY2FmNi00MTE5LTg1YjQtNDJhZThkN2Y5ZTk3Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIyNDM0MDk3MjctMTkzMjA3NjUyMi00MDc2NTIyNzUxLTg0MTUzMiIsInJoIjoiMC5BUkFBT19iOVZ5Si1vMFdEM05Od0F4WTZybnZKVnhURU9ZbEhtc1ljZWpraEhab1FBTlEuIiwic2NwIjoiQXBpLlJlYWQiLCJzdWIiOiJ0eTFsR1o5elNEcVo4bkFjX3hONVJWV0xGbUxIQW1PNUM2bld2bkZ5WmlnIiwidGlkIjoiNTdmZGY2M2ItN2UyMi00NWEzLTgzZGMtZDM3MDAzMTYzYWFlIiwidW5pcXVlX25hbWUiOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInVwbiI6InplbmFiLndhZ2xhd2FsYUB0YWtlZGEuY29tIiwidXRpIjoiUEEyMWI3OEFtMGFhb1lIQzg2c2xBQSIsInZlciI6IjEuMCJ9.B1mBn20dci7Koqp1CNnuZiOZeUZ5vWQlYej8oKf1EiR0JEkdXmobZcBeGpt1skifvUse4IAmZn6EN4jj-H4A6nNt0gcKvAZ3ZUa7SSuJ1ARy7LTTcux2wgLf04IPhHqP-uybSPi3xy5yG3W1XTziLamQoLwOU941ljxgdKdophpM1Z8vLWalrk04NO4wgZZMvZ3iw-bsZ73D-gbhvFpkCV6GTC6DgyqCRccDbSebOCYhJlLpc9cXIhh04K33emY4Kbo5PdJt5eZfkxlUc7KDHKcKiSCay3SUSX-8cr2Xm92nPrO_nvYAjjLMQmGFozfyrpOCFchs5QLlp99JlDSVOg"
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
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc0NjQ4NzU2LCJuYmYiOjE2NzQ2NDg3NTYsImV4cCI6MTY3NDY1NDE0NSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQUJYamJXc25LYnZqcFBkdW01VUJtaFhRQjc3aEY1alU0c1IzTGlzVG9HSUs0cm8zYmpvNHdhRHVsNVFwQUplU3EiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjEyMi4xNzkuMTA3LjIzMSIsIm5hbWUiOiJXYWdsYXdhbGEsIFplbmFiIChleHQpIiwib2lkIjoiODE5NWIwOGItY2FmNi00MTE5LTg1YjQtNDJhZThkN2Y5ZTk3Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIyNDM0MDk3MjctMTkzMjA3NjUyMi00MDc2NTIyNzUxLTg0MTUzMiIsInJoIjoiMC5BUkFBT19iOVZ5Si1vMFdEM05Od0F4WTZybnZKVnhURU9ZbEhtc1ljZWpraEhab1FBTlEuIiwic2NwIjoiQXBpLlJlYWQiLCJzdWIiOiJ0eTFsR1o5elNEcVo4bkFjX3hONVJWV0xGbUxIQW1PNUM2bld2bkZ5WmlnIiwidGlkIjoiNTdmZGY2M2ItN2UyMi00NWEzLTgzZGMtZDM3MDAzMTYzYWFlIiwidW5pcXVlX25hbWUiOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInVwbiI6InplbmFiLndhZ2xhd2FsYUB0YWtlZGEuY29tIiwidXRpIjoiUEEyMWI3OEFtMGFhb1lIQzg2c2xBQSIsInZlciI6IjEuMCJ9.B1mBn20dci7Koqp1CNnuZiOZeUZ5vWQlYej8oKf1EiR0JEkdXmobZcBeGpt1skifvUse4IAmZn6EN4jj-H4A6nNt0gcKvAZ3ZUa7SSuJ1ARy7LTTcux2wgLf04IPhHqP-uybSPi3xy5yG3W1XTziLamQoLwOU941ljxgdKdophpM1Z8vLWalrk04NO4wgZZMvZ3iw-bsZ73D-gbhvFpkCV6GTC6DgyqCRccDbSebOCYhJlLpc9cXIhh04K33emY4Kbo5PdJt5eZfkxlUc7KDHKcKiSCay3SUSX-8cr2Xm92nPrO_nvYAjjLMQmGFozfyrpOCFchs5QLlp99JlDSVOg"
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
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJhcGk6Ly8xNDU3Yzk3Yi0zOWM0LTQ3ODktOWFjNi0xYzdhMzkyMTFkOWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2ZkZjYzYi03ZTIyLTQ1YTMtODNkYy1kMzcwMDMxNjNhYWUvIiwiaWF0IjoxNjc0NjQ4NzU2LCJuYmYiOjE2NzQ2NDg3NTYsImV4cCI6MTY3NDY1NDE0NSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQUJYamJXc25LYnZqcFBkdW01VUJtaFhRQjc3aEY1alU0c1IzTGlzVG9HSUs0cm8zYmpvNHdhRHVsNVFwQUplU3EiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcGlkIjoiMTQ1N2M5N2ItMzljNC00Nzg5LTlhYzYtMWM3YTM5MjExZDlhIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI4MDYxMTMzMC1lM2ZjLTQ5MTYtOThiZC1jZWNhM2ZhNTM3YTkiLCJmYW1pbHlfbmFtZSI6IldhZ2xhd2FsYSIsImdpdmVuX25hbWUiOiJaZW5hYiIsImlwYWRkciI6IjEyMi4xNzkuMTA3LjIzMSIsIm5hbWUiOiJXYWdsYXdhbGEsIFplbmFiIChleHQpIiwib2lkIjoiODE5NWIwOGItY2FmNi00MTE5LTg1YjQtNDJhZThkN2Y5ZTk3Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIyNDM0MDk3MjctMTkzMjA3NjUyMi00MDc2NTIyNzUxLTg0MTUzMiIsInJoIjoiMC5BUkFBT19iOVZ5Si1vMFdEM05Od0F4WTZybnZKVnhURU9ZbEhtc1ljZWpraEhab1FBTlEuIiwic2NwIjoiQXBpLlJlYWQiLCJzdWIiOiJ0eTFsR1o5elNEcVo4bkFjX3hONVJWV0xGbUxIQW1PNUM2bld2bkZ5WmlnIiwidGlkIjoiNTdmZGY2M2ItN2UyMi00NWEzLTgzZGMtZDM3MDAzMTYzYWFlIiwidW5pcXVlX25hbWUiOiJ6ZW5hYi53YWdsYXdhbGFAdGFrZWRhLmNvbSIsInVwbiI6InplbmFiLndhZ2xhd2FsYUB0YWtlZGEuY29tIiwidXRpIjoiUEEyMWI3OEFtMGFhb1lIQzg2c2xBQSIsInZlciI6IjEuMCJ9.B1mBn20dci7Koqp1CNnuZiOZeUZ5vWQlYej8oKf1EiR0JEkdXmobZcBeGpt1skifvUse4IAmZn6EN4jj-H4A6nNt0gcKvAZ3ZUa7SSuJ1ARy7LTTcux2wgLf04IPhHqP-uybSPi3xy5yG3W1XTziLamQoLwOU941ljxgdKdophpM1Z8vLWalrk04NO4wgZZMvZ3iw-bsZ73D-gbhvFpkCV6GTC6DgyqCRccDbSebOCYhJlLpc9cXIhh04K33emY4Kbo5PdJt5eZfkxlUc7KDHKcKiSCay3SUSX-8cr2Xm92nPrO_nvYAjjLMQmGFozfyrpOCFchs5QLlp99JlDSVOg"
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
