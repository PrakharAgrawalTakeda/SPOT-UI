import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  constructor(private http:HttpClient, private authService: MsalService) {}

  async getprojectNames(){
    var userid = "https://localhost:44304/api/Projects/GetbyUser/"+ this.authService.instance.getActiveAccount().localAccountId
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async getprojects(){
    var userid = "https://localhost:44304/api/PortfolioCenterData/GetbyUser/"+ this.authService.instance.getActiveAccount().localAccountId
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }

}
