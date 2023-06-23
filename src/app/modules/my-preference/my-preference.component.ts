import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MyPreferenceService} from "./my-preference.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Title} from '@angular/platform-browser';
import {MyPreferenceApiService} from "./my-preference-api.service";
import {MsalService} from "@azure/msal-angular";

@Component({
    selector: 'app-my-preference',
    templateUrl: './my-preference.component.html',
    styleUrls: ['./my-preference.component.scss']
})
export class MyPreferenceComponent implements OnInit {
    milestoneAccess = false;
    checkAccessError = false;
    addedProjects: any[] = [];

    constructor(private _Activatedroute: ActivatedRoute,
                private router: Router,
                public myPreferenceService: MyPreferenceService,
                public myPreferenceApiService: MyPreferenceApiService,
                private msalService: MsalService,
                private titleService: Title,) {
        // this.myPreferenceService.successSave.subscribe(res => {
        //     if (res == true) {
        //         this.snack.open("The information has been saved successfully", "", {
        //             duration: 2000,
        //             panelClass: ["bg-primary", "text-on-primary"]
        //         })
        //     }
        // })
        this.router.events.subscribe(res => {

            if (this.viewContent) {
                this.navItem = null
                this.reloadName()
            }
        })
    }

    id: string = ''
    viewContent: boolean = false
    navItem: any

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.titleService.setTitle("Standard Milestones Edit")
        this.checkMilestoneSetsAccess();
        this.viewContent = true
        if(this.checkAccessError==false){
            this.checkMilestoneSetsAccess();
        }
    }

    isNavActive(link: string): boolean {
        return this.router.url.includes(link)
    }

    checkMilestoneSetsAccess() {
        this.myPreferenceApiService.checkAccess(this.msalService.instance.getActiveAccount().localAccountId).then((res: any) => {
            if(res.HasAccess == true){
                this.milestoneAccess=true;
            }else{
                this.milestoneAccess=false;
            }
            this.reloadName()
        }).catch(err => {
            this.checkAccessError = true;}
        )
    }

    reloadName() {
        this.navItem = {
            title: 'My Preferences',
            children: [
                {
                    title: 'Settings',
                    link: 'my-preference/settings'
                },
                {
                    title: 'Email Notifications',
                    link: 'my-preference/email-notifications'
                }
            ]
        }
        if(this.milestoneAccess){
            this.navItem.children.push({
                title: 'Milestone Sets',
                link: 'my-preference/milestone-sets'
            })
        }

    }
}
