import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class MsalGuard implements CanActivate {
  constructor(private authService: MsalService, private auth:AuthService,private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //console.log(state)
      console.log(this.authService.instance.getActiveAccount())
    if(this.authService.instance.getActiveAccount() == null){
        localStorage.setItem('spot-redirect', state.url);
        this.router.navigateByUrl('')
        return false
    }
      return true;
  }
  
}
