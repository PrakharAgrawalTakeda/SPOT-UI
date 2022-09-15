import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { GlobalVariables } from 'app/shared/global-variables';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authService: MsalService, private router:Router,private http:HttpClient) { }
  
  async lookupMaster(){
    var userid = GlobalVariables.apiurl+"LookUpMasters"
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async KPIMaster(){
    var userid = GlobalVariables.apiurl+"Kpimasters"
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
}
