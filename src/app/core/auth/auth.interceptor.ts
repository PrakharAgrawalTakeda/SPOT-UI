import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, from, lastValueFrom, Observable, throwError, timeout } from 'rxjs';
import { AuthService } from './auth.service';
import { MsalService } from '@azure/msal-angular';
import { GlobalVariables } from 'app/shared/global-variables';
import { Router } from '@angular/router';
import moment from 'moment';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { AppService } from 'app/app.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  TIMEOUT_DURATION = 1800000; // 10 seconds, for example
  exceptionList = ['ProjectHubData/PhaseState']
  constructor(private authService: AuthService, private msalService: MsalService, private router: Router, private appSerice:AppService) { }

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
      await lastValueFrom(this.msalService.acquireTokenSilent(scopes)).then(res => {
        token = res.accessToken
      }).catch(err => {
        if (err.errorCode === '700084' || // Specific error code
          (err.errorMessage && err.errorMessage.includes('AADSTS700084'))) { // Error message contains specific text
          console.error('Token grant error:', err.errorMessage);
          this.msalService.instance.setActiveAccount(null)
          localStorage.setItem('spot-redirect', this.router.url);
          this.router.navigate(['/']); // Redirect to the root page or login page
          return; // Exit the function
        }
      })
    }
    const cloned = req.url.includes(GlobalVariables.apiurl) ? req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
    }) : req.clone()
    console.log(cloned)
    return await lastValueFrom(
      next.handle(cloned).pipe(
        timeout(this.TIMEOUT_DURATION), // apply the timeout
        catchError(error => {
          // handle timeout or other request errors
          if (error.name === 'TimeoutError') {
            // handle timeout specific actions
            console.error('Request timed out:', req.url);
            location.reload()
            // navigate to a timeout page, for example
          } 
          else if(error.status == 401){
            if(cloned.url.includes(GlobalVariables.apiurl)){
              location.reload()
            }
          }
          else {
            // handle other types of errors
            console.error('Request error:', error);
            if(cloned.url.includes(GlobalVariables.apiurl) && cloned.method != 'GET' && !this.exceptionList.some(x=>cloned.url.includes(x))){
              this.appSerice.errorSave.next(true)
            }
          }
          // rethrow the error
          return throwError(error);
        })
      )
    );
  }
}
