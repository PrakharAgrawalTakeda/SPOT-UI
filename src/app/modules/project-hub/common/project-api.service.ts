import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { GlobalVariables } from 'app/shared/global-variables';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(private http:HttpClient, private authService: MsalService) {}
  async getproject(projectid){
    var url = GlobalVariables.apiurl+"Projects/"+ projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getprojectviewdata(projectid){
    var url = GlobalVariables.apiurl+"ProjectHubData/ProjectView/"+ projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getmembersbyproject(projectid){
    var url = GlobalVariables.apiurl+"ProjectHubData/ProjectTeam/"+ projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getportfolioData(projectid){
    var url = GlobalVariables.apiurl+"PortfolioCenterData/"+ projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
}
