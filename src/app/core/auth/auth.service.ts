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
  accessToken: string = ''
  constructor(private authService: MsalService, private router: Router, private http: HttpClient) {
    if (this.authService.instance.getActiveAccount() != null) {
      var scopes = {
        scopes: ["api://1457c97b-39c4-4789-9ac6-1c7a39211d9a/Api.Read"]
      }
      this.authService.instance.acquireTokenSilent(scopes).then(response => {
        this.accessToken = response.accessToken
      })
    }
  }

  async lookupMaster() {
    var userid = GlobalVariables.apiurl + "LookUpMasters"
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
  async KPIMaster() {
    var userid = GlobalVariables.apiurl + "Kpimasters"
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
}
