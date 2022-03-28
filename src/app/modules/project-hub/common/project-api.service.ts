import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(private http:HttpClient, private authService: MsalService) {}
  async getproject(projectid){
    var url = "https://localhost:44304/api/Projects/"+ projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getprojectviewdata(projectid){
    var url = "https://localhost:44304/api/ProjectHubData/ProjectView/"+ projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getmembersbyproject(projectid){
    var url = "https://localhost:44304/api/ProjectHubData/ProjectTeam/"+ projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getportfolioData(projectid){
    var url = "https://localhost:44304/api/PortfolioCenterData/"+ projectid
    const abc$ = this.http.get(url)
    const response = await lastValueFrom(abc$)
    return response
  }
}
