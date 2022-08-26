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
    id: string = ""
    panelOpenState = true;
    navigationAppearance: 'default' | 'dense' = 'dense';
    selectedProject: string = 'ACME Corp. Backend App';
    drawerOpened: boolean = true;
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
    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public indicator: SpotlightIndicatorsService, public projecthubservice: ProjectHubService, public _fuseNavigationService: FuseNavigationService, private titleService: Title) {
        this.projecthubservice.isNavChanged.subscribe(res => {
            if (res == true) {
                this.getdata()
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

        this.apiService.getproject(this.id).then((res) => {
            this.projectDetails = res
            this.titleService.setTitle(this.projectDetails.problemId + " - " + this.projectDetails.problemTitle)
            const mainNavComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
            mainNavComponent.navigation = this.newmainnav
            mainNavComponent.refresh()
            this.apiService.getHubSettings(this.id).then((response: any) => {
                //Budget
                this.projecthubservice.menuData[0].children[3].disabled = response.some(x => x.lookUpId == '24f44e4b-60cc-4af8-9c42-21c83ca8a1e3') ? !response.find(x => x.lookUpId == '24f44e4b-60cc-4af8-9c42-21c83ca8a1e3').hubValue : false
                //Documents
                this.projecthubservice.menuData[0].children[6].disabled = response.some(x => x.lookUpId == '9500d3fa-3eff-4179-a5d3-94100e92b644') ? !response.find(x => x.lookUpId == '9500d3fa-3eff-4179-a5d3-94100e92b644').hubValue : false
                //Teams
                this.projecthubservice.menuData[0].children[4].disabled = response.some(x => x.lookUpId == '6937fd4c-db74-4412-8749-108b0d356ed1') ? !response.find(x => x.lookUpId == '6937fd4c-db74-4412-8749-108b0d356ed1').hubValue : false
                if (this.projecthubservice.roleControllerControl.projectHub.hubSettings == false) {
                    this.projecthubservice.menuData[0].children[11].disabled = true
                }

                //nav refresh
                const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('projecthub-navigation');
                navComponent.refresh();
            })
            // 
        })
        this.apiService.getportfolioData(this.id).then((res) => {
            this.portfolioDetails = res
            console.log(this.portfolioDetails.phase)
        })
    }
    toggleSideNav() {
        this.drawerOpened = !this.drawerOpened
        if (this._Activatedroute.children[0].snapshot.routeConfig.path == 'project-board' || this._Activatedroute.children[0].snapshot.routeConfig.path == 'project-team') {
            this.projecthubservice.submitbutton.next(true)
        }
    }
    toggleNavigationAppearance(): void {
        this.navigationAppearance = (this.navigationAppearance === 'default' ? 'dense' : 'default');
    }
}
