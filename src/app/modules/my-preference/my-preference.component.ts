import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyPreferenceService } from "./my-preference.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { MyPreferenceApiService } from "./my-preference-api.service";
import { MsalService } from "@azure/msal-angular";
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import moment from 'moment';
import { RoleService } from 'app/core/auth/role.service';
@Component({
    selector: 'app-my-preference',
    templateUrl: './my-preference.component.html',
    styleUrls: ['./my-preference.component.scss']
})
export class MyPreferenceComponent implements OnInit {
    milestoneAccess = false;
    checkAccessError = false;
    activeaccount: any;
    newmainnav: any = [];
    constructor(private _Activatedroute: ActivatedRoute,
        private router: Router,
        public myPreferenceService: MyPreferenceService,
        public myPreferenceApiService: MyPreferenceApiService,
        private msalService: MsalService,
        private titleService: Title, private snack: MatSnackBar, private _fuseNavigationService: FuseNavigationService, public role: RoleService) {
        // this.myPreferenceService.successSave.subscribe(res => {
        //     if (res == true) {
        //         this.snack.open("The information has been saved successfully", "", {
        //             duration: 2000,
        //             panelClass: ["bg-primary", "text-on-primary"]
        //         })
        //     }
        // })
        // this.myPreferenceService.successSave.subscribe(res => {
        //     if (res == true) {
        //         this.snack.open("The information has been saved successfully", "", {
        //             duration: 2000,
        //             panelClass: ["bg-primary", "text-on-primary"]
        //         })
        //     }
        // })
        const mainNavComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
        this.activeaccount = this.msalService.instance.getActiveAccount();
        if (this.role.roleMaster.securityGroupId == "F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F") {
            this.newmainnav = [
                {
                    id: 'portfolio-center',
                    title: 'Portfolio Center',
                    type: 'basic',
                    link: '/portfolio-center'
                },
                {
                    id: 'spot-documents',
                    title: 'SPOT Supporting Documents',
                    type: 'basic',
                    externalLink: true,
                    link: 'https://mytakeda.sharepoint.com/sites/PMT-SPOT/SitePages/home.aspx',
                    target: '_blank'
                },
                {
                    id: 'report-navigator',
                    title: 'Report Navigator',
                    type: 'basic',
                    link: 'https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/e6c7feb2-8dca-49ea-9eff-9596f519c64e/ReportSectiona2d604c32b4ad7a54177?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae',
                    externalLink: true,
                    target: "_blank"

                },
                {
                    id: 'spot-support',
                    title: 'Need Help or Propose a Change',
                    type: 'basic',
                    link: 'mailto:DL.SPOTSupport@takeda.com?Subject=SPOT Support Request ' + this.activeaccount.name + ' (Logged on ' + moment().format('llll') + ')',
                    externalLink: true,
                    target: "_blank"
                }
            ]
        }
        else {
            this.newmainnav = [
                {
                    id: 'portfolio-center',
                    title: 'Portfolio Center',
                    type: 'basic',
                    link: '/portfolio-center'
                },
                {
                    // id: 'create-project',
                    title: 'Create Project',
                    type: 'collapsable',
                    link: '/create-project',
                    children: [
                        {
                            title: 'Create a Standard/Simple Project/Program',
                            type: 'basic',
                            link: '/create-project/create-new-project'
                        },
                        {
                            title: 'Create a Strategic Initiative/Program',
                            type: 'basic',
                            link: '/create-project/create-strategic-initiative-project'
                        },
                        {
                            title: 'Copy an existing Project',
                            type: 'basic',
                            link: '/create-project/copy-project'
                        }
                    ],
                },
                {
                    id: 'spot-documents',
                    title: 'SPOT Supporting Documents',
                    type: 'basic',
                    externalLink: true,
                    link: 'https://mytakeda.sharepoint.com/sites/PMT-SPOT/SitePages/home.aspx',
                    target: '_blank'
                },
                {
                    id: 'report-navigator',
                    title: 'Report Navigator',
                    type: 'basic',
                    link: 'https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/e6c7feb2-8dca-49ea-9eff-9596f519c64e/ReportSectiona2d604c32b4ad7a54177?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae',
                    externalLink: true,
                    target: "_blank"

                },
                {
                    id: 'spot-support',
                    title: 'Need Help or Propose a Change',
                    type: 'basic',
                    link: 'mailto:DL.SPOTSupport@takeda.com?Subject=SPOT Support Request ' + this.activeaccount.name + ' (Logged on ' + moment().format('llll') + ')',
                    externalLink: true,
                    target: "_blank"

                }
            ]
        }
        mainNavComponent.navigation = this.newmainnav
        mainNavComponent.refresh()
        this.myPreferenceService.successSave.subscribe(res => {
            if (res == true) {
                this.snack.open("The information has been saved successfully", "", {
                    duration: 2000,
                    panelClass: ["bg-primary", "text-on-primary"]
                })
            }
        })
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
        this.titleService.setTitle("My Preferences")
        this.checkMilestoneSetsAccess();
        this.viewContent = true
        if (this.checkAccessError == false) {
            this.checkMilestoneSetsAccess();
        }
    }

    isNavActive(link: string): boolean {
        return this.router.url.includes(link)
    }

    checkMilestoneSetsAccess() {
        this.myPreferenceApiService.checkAccess(this.msalService.instance.getActiveAccount().localAccountId).then((res: any) => {
            if (res.HasAccess == true) {
                this.milestoneAccess = true;
            } else {
                this.milestoneAccess = false;
            }
            this.reloadName()
        }).catch(err => {
            this.checkAccessError = true;
        }
        )
    }
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            if (this.myPreferenceService.drawerOpenedright) {
                this.myPreferenceService.toggleDrawerOpen('', '', [], '')
            }
        }
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
                    title: 'e-mail Notifications',
                    link: 'my-preference/email-notifications'
                }
            ]
        }
        if (this.milestoneAccess) {
            this.navItem.children.push({
                title: 'Milestone Sets',
                link: 'my-preference/milestone-sets'
            })
        }
        this.navItem.children.push({
            title: 'Metric Repository',
            link: 'my-preference/metric-repository'
        })

    }
}
