import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationResult } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { lookupMaster } from 'app/shared/lookup-global';
import { Title } from '@angular/platform-browser';
import moment from 'moment';
import { IAppSetting } from 'app/shared/global-app-settings';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent implements OnInit {
    /**
     * Constructor
     */
    constructor(private authService: MsalService, private router: Router, private auth: AuthService, private titleService: Title) { }
    ngOnInit(): void {
        this.titleService.setTitle("SPOT");

        // Check if the user is already logged in
        const currentAccount = this.authService.instance.getActiveAccount();

        if (currentAccount) {
            // If user is already logged in
            this.handlePostLoginActions();
        } else {
            // Handle the MSAL response
            this.authService.instance.handleRedirectPromise().then(res => {
                if (res != null && res.account != null) {
                    this.authService.instance.setActiveAccount(res.account);
                    this.handlePostLoginActions();
                } else {
                    // Redirect to login page
                    this.login();
                }
            });
        }
    }

    lookup() {
        this.auth.lookupMaster().then((res: any) => {
            for (let i of res) {
                lookupMaster.lookup.set(i.lookUpId, i.lookUpName)
            }
        })
    }
    handlePostLoginActions(): void {
        if (!localStorage.getItem('app-setting')) {
            const appSetting: IAppSetting = {
                projectHubPanel: 'Unlocked'
            };
            localStorage.setItem('app-setting', JSON.stringify(appSetting));
        }

        if (localStorage.getItem('spot-redirect') != null) {
            const temp = localStorage.getItem('spot-redirect');
            console.log("Redirecting to: " + temp);
            localStorage.removeItem('spot-redirect');
            this.lookup();
            this.router.navigateByUrl(temp);
        } else {
            this.lookup();
            this.router.navigateByUrl('portfolio-center');
        }
    }
    login() {
        var scopes = {
            scopes: ["api://1457c97b-39c4-4789-9ac6-1c7a39211d9a/Api.Read"]
        }
        this.authService.loginRedirect(scopes)
    }

}
