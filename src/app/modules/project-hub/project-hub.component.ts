import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ProjectApiService } from './common/project-api.service';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from './project-hub.service';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from 'app/shared/constants';
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
    newmainnav: any = [
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
            id: 'spot-documents',
            title: 'SPOT Resources',
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

        }
    ]
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService,
        private apiService: ProjectApiService,
        private _Activatedroute: ActivatedRoute,
        public indicator: SpotlightIndicatorsService,
        public projecthubservice: ProjectHubService,
        public _fuseNavigationService: FuseNavigationService,
        private titleService: Title,
        private snack: MatSnackBar) {
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
        this.projecthubservice.projectidInjector(this.id)
        console.log(this.projecthubservice.roleControllerControl)
        this.getdata()
    }

    getdata(): void {

        this.apiService.getProjectHubData(this.id).then((res: any) => {
            this.projectDetails = res.projectData
            this.portfolioDetails = res.portfolioCeterData
            console.log(res.indicator)
            this.spotLightIndicator = res.indicators
            this.projectType = this.projectDetails.problemType;
            this.titleService.setTitle(this.projectDetails.problemId + " - " + this.projectDetails.problemTitle)
            this.projecthubservice.currentSpotId = this.projectDetails.problemId;
            const mainNavComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
            mainNavComponent.navigation = this.newmainnav
            mainNavComponent.refresh()
            this.apiService.getHubSettings(this.id).then((response: any) => {
                //Budget
                this.projecthubservice.menuData[0].children[4].disabled = response.some(x => x.lookUpId == '24f44e4b-60cc-4af8-9c42-21c83ca8a1e3') ? !response.find(x => x.lookUpId == '24f44e4b-60cc-4af8-9c42-21c83ca8a1e3').hubValue : false
                //Documents
                this.projecthubservice.menuData[0].children[7].disabled = response.some(x => x.lookUpId == '9500d3fa-3eff-4179-a5d3-94100e92b644') ? !response.find(x => x.lookUpId == '9500d3fa-3eff-4179-a5d3-94100e92b644').hubValue : false
                //Teams
                this.projecthubservice.menuData[0].children[5].disabled = response.some(x => x.lookUpId == '6937fd4c-db74-4412-8749-108b0d356ed1') ? !response.find(x => x.lookUpId == '6937fd4c-db74-4412-8749-108b0d356ed1').hubValue : false
                if (this.projecthubservice.roleControllerControl.projectHub.hubSettings == false) {
                    this.projecthubservice.menuData[0].children[12].disabled = true
                }

                //nav refresh
                const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('projecthub-navigation');
                navComponent.refresh();
            })
            //
        })
        this.apiService.getDataCompletenessPercent(this.id).then((res: any) => {
            this.dataQualityPercentage = res * 100;
            if (this.portfolioDetails.phase == "Initiate") {
                this.dataQualityPercentageString = "N/A";
            } else {
                this.dataQualityPercentageString =
                    (~~this.dataQualityPercentage).toString();
            }
        })
    }
    toggleSideNav() {
        this.drawerOpened = !this.drawerOpened
        if (this._Activatedroute.children[0].snapshot.routeConfig.path == 'project-board' ||
            this._Activatedroute.children[0].snapshot.routeConfig.path == 'project-team' ||
            this._Activatedroute.children[0].snapshot.routeConfig.path == 'general-info' ||
            this._Activatedroute.children[0].snapshot.routeConfig.path == 'project-benefits') {
            this.projecthubservice.submitbutton.next(true)
        }
    }
    toggleNavigationAppearance(): void {
        this.navigationAppearance = (this.navigationAppearance === 'default' ? 'dense' : 'default');
    }
    getColor(percentage: number) {
        if (this.projectType == "Simple Project") {
            return '#4c9bcf';
        } else {
            if (percentage < this.lowerTargetPercentage) {
                return "red";
            }
            if (this.targetPercentage > percentage && percentage > this.lowerTargetPercentage) {
                return "orange";
            }
            if (this.targetPercentage < percentage) {
                return "green";
            }
        }
      }
}
