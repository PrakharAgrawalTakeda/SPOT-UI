import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AppService } from './app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(private authService: MsalService, private appService: AppService,private snack: MatSnackBar)
    {
        this.appService.errorSave.subscribe(res => {
            if (res == true) {
                this.snack.open("An Error has Occured, Please contact the SPOT Support Team by sending an e-mail to DL.SPOTSupport@takeda.com", "", {
                    duration: 3000,
                    panelClass: ["bg-warn", "text-on-warn"]
                })
            }
        })
    }
}
