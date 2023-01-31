import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { from, lastValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MsalService } from '@azure/msal-angular';
import { GlobalVariables } from 'app/shared/global-variables';
import { Router } from '@angular/router';
import moment from 'moment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private msalService: MsalService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(request, next))

  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    var token = ''
    var scopes = {
      scopes: ["api://1457c97b-39c4-4789-9ac6-1c7a39211d9a/Api.Read"]
    }
    // if your getAuthToken() function declared as "async getAuthToken() {}"
    if (req.url.includes(GlobalVariables.apiurl)) {
      console.log("Token Last refreshed " + moment(new Date()).diff(moment(localStorage.getItem('token-initaited-time')), 'minutes')+ " mins ago")
     if (moment(new Date()).diff(moment(localStorage.getItem('token-initaited-time')), 'minutes') > 30) {
        await lastValueFrom(this.msalService.acquireTokenSilent(scopes)).then(res => {
          token = res.accessToken
          localStorage.setItem('token', res.accessToken)
          localStorage.setItem('token-initaited-time', moment(new Date()).toString())
        })
      }
      else{
        token = localStorage.getItem('token')
      }
    }
    const cloned = req.url.includes(GlobalVariables.apiurl) ? req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
    }) : req.clone()
    console.log(cloned)
    return await lastValueFrom(next.handle(cloned));
  }
}
