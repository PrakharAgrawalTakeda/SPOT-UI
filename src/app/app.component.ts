import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AppService } from './app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfigService } from '@fuse/services/config';
import { environment } from 'environments/environment';
import { AppConfig } from './core/config/app.config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /**
     * Constructor
     */
    config: AppConfig;
    constructor(private authService: MsalService, private appService: AppService, private snack: MatSnackBar, private _fuseConfigService: FuseConfigService) {
        this._fuseConfigService.config$
            .subscribe((config: AppConfig) => {
                if (config?.theme != this.config?.theme) {
                    if (environment.environment == 'Local' || environment.environment == 'DEV') {
                        var theme: any = config.themes.find(x => x.id == 'theme-teal')?.id
                        this.config = config;
                        this._fuseConfigService.config = { theme } 
                    }
                    else if (environment.environment == 'QA') {
                        var theme: any = config.themes.find(x => x.id == 'theme-purple')?.id
                        this.config = config;
                        this._fuseConfigService.config = { theme }
                    }
                    else if (environment.environment == 'Training') {
                        var theme: any = config.themes.find(x => x.id == 'theme-rose')?.id
                        this.config = config;
                        this._fuseConfigService.config = { theme }
                    }
                    else if (environment.environment == 'PROD') {
                        var theme: any = config.themes.find(x => x.id == 'theme-brand')?.id
                        this.config = config;
                        this._fuseConfigService.config = { theme }
                    }
                    // Store the config
                   
                }
            });



        this.appService.errorSave.subscribe(res => {
            if (res == true) {
                this.snack.open("An Error has Occured, Please contact the SPOT Support Team by sending an e-mail to DL.SPOTSupport@takeda.com", "Dismiss", {
                    duration: 180000,
                    panelClass: ["bg-warn", "text-on-warn"]
                })
            }
        })
    }
}
