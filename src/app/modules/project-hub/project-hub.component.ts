import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ProjectApiService } from './common/project-api.service';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from './project-hub.service';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
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
    selectedProject: string = 'ACME Corp. Backend App';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public indicator: SpotlightIndicatorsService, public projecthubservice: ProjectHubService, public _fuseNavigationService: FuseNavigationService) {
        this.projecthubservice.isNavChanged.subscribe(res => {
            if (res == true) {
                this.getdata()
            }
        })
    }

    ngOnInit(): void {
        this.id = this._Activatedroute.snapshot.paramMap.get("id");
        this.getdata()
    }

    getdata(): void {
        this.apiService.getproject(this.id).then((res) => {
            this.projectDetails = res
            this.apiService.getHubSettings(this.id).then((response: any) => {
                this.projecthubservice.menuData[0].children[2].disabled = response.some(x => x.lookUpId == '24f44e4b-60cc-4af8-9c42-21c83ca8a1e3') ? !response.find(x => x.lookUpId == '24f44e4b-60cc-4af8-9c42-21c83ca8a1e3').hubValue : false
                this.projecthubservice.menuData[0].children[3].disabled = response.some(x => x.lookUpId == '9500d3fa-3eff-4179-a5d3-94100e92b644') ? !response.find(x => x.lookUpId == '9500d3fa-3eff-4179-a5d3-94100e92b644').hubValue : false
                this.projecthubservice.menuData[0].children[4].disabled = response.some(x => x.lookUpId == '6937fd4c-db74-4412-8749-108b0d356ed1') ? !response.find(x => x.lookUpId == '6937fd4c-db74-4412-8749-108b0d356ed1').hubValue : false
                
                
                //nav refresh
                const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('projecthub-navigation');
                navComponent.refresh();
            })
            // 
        })
        this.apiService.getportfolioData(this.id).then((res) => {
            this.portfolioDetails = res
            console.log(res)
        })
    }

}
