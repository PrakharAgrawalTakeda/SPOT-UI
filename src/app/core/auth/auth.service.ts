import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authService: MsalService, private router:Router,private http:HttpClient) { }
  
  async lookupMaster(){
    var userid = "https://spot4api-dev.azurewebsites.net/api/LookUpMasters"
    const abc$ = this.http.get(userid)
    const response = await lastValueFrom(abc$)
    return response
  }
}
