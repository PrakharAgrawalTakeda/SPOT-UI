import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})

export class MsalGuard implements CanActivate {
  constructor(private authService: MsalService, private auth: AuthService, private router: Router, private roleService: RoleService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.authService.instance.getActiveAccount())


    if (this.authService.instance.getActiveAccount() == null) {
      localStorage.setItem('spot-redirect', state.url);
      this.router.navigateByUrl('')
      return false
    }
    return this.roleChecker()

  }

  roleChecker() {
    return this.roleService.getCurrentRoleRequest(this.authService.instance.getActiveAccount().localAccountId).pipe(
      map(res => {
        this.roleService.roleMaster = res
        console.log(this.roleService.roleMaster)
        return true
      })
    )
  }
}
