import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MsalService } from '@azure/msal-angular';
import { GlobalVariables } from 'app/shared/global-variables';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private msalService: MsalService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes(GlobalVariables.apiurl)) {
      const token = localStorage.getItem('token')
      if (token != null) {
        const cloned = request.clone({
          headers: request.headers.set("Authorization", "Bearer " + token)
        })
        console.log(cloned)
        return next.handle(cloned);
      }
      else{
        this.router.navigateByUrl('')
      }
    }
   

    return next.handle(request);
  }
}
