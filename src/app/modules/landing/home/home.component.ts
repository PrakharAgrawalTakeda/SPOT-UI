import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationResult } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent implements OnInit
{
    /**
     * Constructor
     */
     constructor(private authService: MsalService, private router:Router, private auth:AuthService) { }
    ngOnInit(): void {
        this.authService.instance.handleRedirectPromise().then(res =>{
            if(res != null && res.account != null){
                console.log(res.account)
                this.authService.instance.setActiveAccount(res.account)
                console.log("hello" + localStorage.getItem('spot-redirect'))
                if(localStorage.getItem('spot-redirect') != null){
                    var temp = localStorage.getItem('spot-redirect')
                    console.log("hey"+temp)
                    localStorage.removeItem('spot-redirect')
                    this.router.navigateByUrl(temp)
                }
                else{
                    this.router.navigateByUrl('portfolio-center')
                }
            }
        })
    }
    login(){
         this.authService.loginRedirect()
     }
     
}
