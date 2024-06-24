import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ProjectApiService } from './common/project-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from './project-hub.service';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from 'app/shared/constants';
import { IAppSetting } from 'app/shared/global-app-settings';
import { MsalService } from '@azure/msal-angular';
import { RoleService } from 'app/core/auth/role.service';
import moment from 'moment';
import { GlobalDetailedScheduleBetaUsers } from 'app/shared/global-detailed-schedule-beta-users';
@Component({
    selector: 'app-project-hub',
    templateUrl: './project-hub.component.html',
    styleUrls: ['./project-hub.component.scss']
})
export class ProjectHubComponent implements OnInit {
    @ViewChild('myDiv') myDiv: ElementRef;
    drawerMode: 'over' | 'side' = 'side';
    projectDetails: any = {}
    portfolioDetails: any = {}
    spotLightIndicator: any = {}
    id: string = ""
    panelOpenState = true;
    navigationAppearance: 'default' | 'dense' = 'dense';
    selectedProject: string = 'ACME Corp. Backend App';
    drawerOpened: boolean = true;
    dataQualityPercentage: number;
    projectType: string = '';
    dataQualityPercentageString: string = '';
    targetPercentage = Constants.QUALITY_TARGET_PERCENTAGE;
    lowerTargetPercentage = Constants.QUALITY_LOWER_TARGET_PERCENTAGE;
    phaseStatePermission: boolean = false;
    activeaccount: any
    newmainnav: any
    projectHubNavigation: any
    viewContent: boolean = false
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService,
        private apiService: ProjectApiService,
        private _Activatedroute: ActivatedRoute,
        public indicator: SpotlightIndicatorsService,
        public projecthubservice: ProjectHubService,
        public _fuseNavigationService: FuseNavigationService,
        private titleService: Title,
        private routes: Router,
        private snack: MatSnackBar, private msal: MsalService, public role: RoleService) {
        this.projecthubservice.isNavChanged.subscribe(res => {
            if (res == true) {
                this.getdata()
            }
        })
        this.projecthubservice.successSave.subscribe(res => {
            if (res == true) {
                this.snack.open("The information has been saved successfully", "", {
                    duration: 2000,
                    panelClass: ["bg-primary", "text-on-primary"]
                })
            }
        })
    }


    ngOnInit(): void {
        console.log("Project Hub Started")
        this.id = this._Activatedroute.snapshot.paramMap.get("id");
        this.activeaccount = this.msal.instance.getActiveAccount()
        this.projecthubservice.projectidInjector(this.id)
        this.phaseStatePermission = this.projecthubservice.roleControllerControl.projectHub.projectBoard.phaseState;
        if (this.role.roleMaster.securityGroupId == "F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F") {
            this.newmainnav = [
                {
                    id: 'portfolio-center',
                    title: 'Portfolio Center',
                    type: 'basic',
                    link: '/portfolio-center'
                },
                {
                    id: 'project-hub',
                    title: 'Project Hub',
                    type: 'basic',
                    link: '/project-hub'
                },
                {
                    id: 'resource-administration',
                    title: 'Resource Administration',
                    type: 'basic',
                    link: '/resource-administration',
                    externalLink: true,
                    target: '_blank',
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
        else if(this.role.roleMaster?.secondarySecurityGroupId?.some(x=>x?.toLowerCase() == '06CDEA21-EB7C-402B-9FB3-CBE507CEE364'.toLowerCase())) {
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
                    id: 'project-hub',
                    title: 'Project Hub',
                    type: 'basic',
                    link: '/project-hub'
                },
                {
                    id: 'resource-administration',
                    title: 'Resource Administration',
                    type: 'basic',
                    link: '/resource-administration',
                    externalLink: true,
                    target: '_blank',
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
                    id: 'project-hub',
                    title: 'Project Hub',
                    type: 'basic',
                    link: '/project-hub'
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
        console.log(this.projecthubservice.roleControllerControl)
        var appSetting = JSON.parse(localStorage.getItem('app-setting'))
        console.log("App Setting", appSetting)
        if (appSetting?.projectHubPanel == 'Locked') {
            this.navigationAppearance = 'default'
        }
        this.getdata()
    }

    getdata(): void {
        this.apiService.getProjectHubData(this.id).then((res: any) => {
            this.projectDetails = res.projectData
            if (this.projectDetails.isConfidential) {
                this.role.getCurrentRole(this.activeaccount.localAccountId).then((res: any) => {
                    if (!res.confidentialProjects?.some(x => x == this.projectDetails.problemUniqueId)) {
                        this.routes.navigate(['portfolio-center'])
                    }
                })
            }
            if (this.projectDetails.problemType == "Strategic Initiative / Program") {
                if(GlobalDetailedScheduleBetaUsers.users.includes(this.msal.instance.getActiveAccount()?.username)){
                    this.projectHubNavigation = this.projecthubservice.menuDataStratBeta
                }
                else{
                    this.projectHubNavigation = this.projecthubservice.menuDataStrat
                }
                this.projecthubservice.isStrategicIniative = true
            }
            else {
                if(GlobalDetailedScheduleBetaUsers.users.includes(this.msal.instance.getActiveAccount()?.username)){
                    this.projectHubNavigation = this.projecthubservice.menuDataBeta
                }
                else{
                    this.projectHubNavigation = this.projecthubservice.menuData
                }
                this.projecthubservice.isStrategicIniative = false
            }
            this.projecthubservice.hasChildren = res.hasChildren
            this.portfolioDetails = res.portfolioCeterData
            this.projecthubservice.projectState = this.portfolioDetails.projStatus;
            console.log(res.indicator)
            this.spotLightIndicator = res.indicators
            this.projectType = this.projectDetails.problemType;
            this.titleService.setTitle(this.projectDetails.problemId + " - " + this.projectDetails.problemTitle)
            this.projecthubservice.currentSpotId = this.projectDetails.problemId;
            this.projecthubservice.projectName = this.projectDetails.problemTitle;
            const mainNavComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
            mainNavComponent.navigation = this.newmainnav
            mainNavComponent.refresh()
            this.apiService.getHubSettings(this.id).then((response: any) => {
                if (this.projectDetails.problemType == "Strategic Initiative / Program") {
                    //Budget
                    this.projectHubNavigation[0].children[4].disabled = response.some(x => x.lookUpId == '24f44e4b-60cc-4af8-9c42-21c83ca8a1e3') ? !response.find(x => x.lookUpId == '24f44e4b-60cc-4af8-9c42-21c83ca8a1e3').hubValue : false
                    //Documents
                    this.projectHubNavigation[0].children[6].disabled = response.some(x => x.lookUpId == '9500d3fa-3eff-4179-a5d3-94100e92b644') ? !response.find(x => x.lookUpId == '9500d3fa-3eff-4179-a5d3-94100e92b644').hubValue : false
                    //Teams
                    this.projectHubNavigation[0].children[5].disabled = response.some(x => x.lookUpId == '6937fd4c-db74-4412-8749-108b0d356ed1') ? !response.find(x => x.lookUpId == '6937fd4c-db74-4412-8749-108b0d356ed1').hubValue : false
                    if (this.projecthubservice.roleControllerControl.projectHub.hubSettings == false) {
                        this.projectHubNavigation[0].children[11].disabled = true
                    }
                }
                else {
                    //Budget
                    this.projectHubNavigation[0].children[4].disabled = response.some(x => x.lookUpId == '24f44e4b-60cc-4af8-9c42-21c83ca8a1e3') ? !response.find(x => x.lookUpId == '24f44e4b-60cc-4af8-9c42-21c83ca8a1e3').hubValue : false
                    //Documents
                    this.projectHubNavigation[0].children[7].disabled = response.some(x => x.lookUpId == '9500d3fa-3eff-4179-a5d3-94100e92b644') ? !response.find(x => x.lookUpId == '9500d3fa-3eff-4179-a5d3-94100e92b644').hubValue : false
                    //Teams
                    this.projectHubNavigation[0].children[5].disabled = response.some(x => x.lookUpId == '6937fd4c-db74-4412-8749-108b0d356ed1') ? !response.find(x => x.lookUpId == '6937fd4c-db74-4412-8749-108b0d356ed1').hubValue : false
                    if (this.projecthubservice.roleControllerControl.projectHub.hubSettings == false) {
                        this.projectHubNavigation[0].children[12].disabled = true
                    }
                }
                //nav refresh
                const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('projecthub-navigation');
                navComponent.refresh();
            })
            //
            this.viewContent = true
        })
        this.apiService.getDataCompletenessPercent(this.id).then((res: any) => {
            this.dataQualityPercentage = res * 100;
            this.dataQualityPercentageString =
                (~~this.dataQualityPercentage).toString() + "%";
        })
    }
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            if (this.projecthubservice.drawerOpenedright) {
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
            }
        }
    }
    toggleSideNav() {
        this.drawerOpened = !this.drawerOpened
        if (this._Activatedroute.children[0].snapshot.routeConfig.path == 'project-board' ||
            this._Activatedroute.children[0].snapshot.routeConfig.path == 'project-team' ||
            this._Activatedroute.children[0].snapshot.routeConfig.path == 'general-info' ||
            this._Activatedroute.children[0].snapshot.routeConfig.path == 'value-creation' ||
            this._Activatedroute.children[0].snapshot.routeConfig.path == 'associated-projects' ||
            this._Activatedroute.children[0].snapshot.routeConfig.path == 'project-charter' ||
            this._Activatedroute.children[0].snapshot.routeConfig.path == 'close-out' ||
            this._Activatedroute.children[0].snapshot.routeConfig.path == 'project-proposal' ||
            this.routes.url.includes('option-info')) {
            this.projecthubservice.submitbutton.next(true)
        }
    }
    toggleNavigationAppearance(): void {
        this.navigationAppearance = (this.navigationAppearance === 'default' ? 'dense' : 'default');
        if (this.navigationAppearance == 'default') {
            var appSetting: IAppSetting = JSON.parse(localStorage.getItem('app-setting'))
            appSetting ? appSetting.projectHubPanel = 'Locked' : appSetting = {
                projectHubPanel: 'Locked'
            }
            localStorage.setItem('app-setting', JSON.stringify(appSetting))
        }
        else {
            var appSetting: IAppSetting = JSON.parse(localStorage.getItem('app-setting'))
            appSetting ? appSetting.projectHubPanel = 'Unlocked' : appSetting = {
                projectHubPanel: 'Unlocked'
            }
            localStorage.setItem('app-setting', JSON.stringify(appSetting))
        }
    }
    getStateClass(state: string): any {
        if (state == 'Active') {
            return 'font-bold text-primary';
        }
        return 'font-bold';
    }
    getPhaseClass(phase: string): any {
        var className = 'pointer-unselect';
        if (this.portfolioDetails.phase == phase) {
            className = 'pointer';
        }
        if (this.portfolioDetails.projStatus == 'Completed') {
            className = 'pointer-completed';
        }
        if ((this.portfolioDetails.projStatus == 'Hold' || this.portfolioDetails.projStatus == 'Cancelled') && this.portfolioDetails.phase == phase) {
            className = 'pointer-completed';
        }
        if (this.phaseStatePermission) {
            className = className + ' cursor-pointer'
        }
        return className;
    }
    getStartPhaseClass(): any {
        var className = 'pointer-start-unselect';
        if (this.portfolioDetails.projStatus == 'Completed') {
            className = 'pointer-start-completed';
        }
        if ((this.portfolioDetails.projStatus == 'Hold' || this.portfolioDetails.projStatus == 'Cancelled') && this.portfolioDetails.phase == 'Initiate') {
            className = 'pointer-start-completed';
        }
        if (this.portfolioDetails.projStatus == 'Active' && this.portfolioDetails.phase == 'Initiate') {
            className = 'pointer-start';
        }
        if (this.phaseStatePermission) {
            className = className + ' cursor-pointer'
        }
        return className;
    }
    getEndPhaseClass(): any {
        var className = 'pointer-last-unselect';
        if (this.portfolioDetails.projStatus == 'Completed') {
            className = 'pointer-last-completed';
        }
        if ((this.portfolioDetails.projStatus == 'Hold' || this.portfolioDetails.projStatus == 'Cancelled') && this.portfolioDetails.phase == 'Track') {
            className = 'pointer-last-completed';
        }
        if (this.portfolioDetails.projStatus == 'Active' && this.portfolioDetails.phase == 'Track') {
            className = 'pointer-last';
        }
        if (this.phaseStatePermission) {
            className = className + ' cursor-pointer'
        }
        return className;
    }
    getColor(percentage: number) {
        if (this.portfolioDetails.projStatus == 'Completed')
        {
            return '#000000'
        }
        if (this.portfolioDetails.phase == "Initiate" || this.portfolioDetails.projStatus == 'Cancelled' || this.portfolioDetails.projStatus == 'Hold') {
            this.dataQualityPercentageString = "N/A";
            return '#808080';
        } else {
            this.dataQualityPercentageString = (~~this.dataQualityPercentage).toString() + "%";
        }
        if (this.projectType == "SimpleProject" || percentage == null) {
            return '#4c9bcf';
        }
         else {
            if (percentage < this.lowerTargetPercentage) {
                return "red";
            }
            if (this.targetPercentage > percentage && percentage >= this.lowerTargetPercentage) {
                return "orange";
            }
            if (this.targetPercentage < percentage) {
                return "green";
            }
        }
    }
    openPhaseStateDrawer() {
        if (this.phaseStatePermission) {
            this.projecthubservice.toggleDrawerOpen('PhaseState', '', [], '', true, false);
        }
    }
    isCursorPointer() {
        if (this.phaseStatePermission) {
            return 'cursor-pointer';
        }
    }
}
