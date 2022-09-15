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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private msalService: MsalService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var scopes = {
      scopes: ["api://1457c97b-39c4-4789-9ac6-1c7a39211d9a/Api.Read"]
    }
    if (this.authService.accessToken != "") {
      const cloned = request.clone({
        headers: request.headers.set("Authorization", "Bearer "+this.authService.accessToken)
      })
      console.log(cloned)
      return next.handle(cloned);
    }

    return next.handle(request);
  }
}
