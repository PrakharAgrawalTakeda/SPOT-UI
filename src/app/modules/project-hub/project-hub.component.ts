import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ProjectApiService } from './common/project-api.service';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';

@Component({
  selector: 'app-project-hub',
  templateUrl: './project-hub.component.html',
  styleUrls: ['./project-hub.component.scss']
})
export class ProjectHubComponent implements OnInit {
  drawerMode: 'over' | 'side' = 'side';
  projectDetails: any = {}
  portfolioDetails: any = {}
  id:string = ""
  panelOpenState = true;
  selectedProject: string = 'ACME Corp. Backend App';
  menuData: FuseNavigationItem[] = [
    {
        title   : 'Project Information',
        subtitle: 'Information subtitle',
        type    : 'group',
        children: [
            {
                title: 'Project View',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-list',
                link: 'project-view'
            },
            {
                title: 'Assoiated Projects',
                type : 'basic',
                icon : 'heroicons_outline:link',
                link : 'associated-projects' 
            },
            {
                title: 'Budget',
                type : 'basic',
                icon : 'heroicons_outline:currency-dollar',
                link : 'budget' 
            },
            {
                title: 'Project Documents',
                type : 'basic',
                icon : 'heroicons_outline:document-text',
                link : 'project-documents' 
            },
            {
                title: 'Project team',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : 'project-team' 
            }
        ]
    },
    {
        title   : 'Project Details and Forms',
        type    : 'group',
        children: [
            {
                title: 'General Info',
                type : 'basic',
                icon : 'heroicons_outline:pencil-alt',
                link : 'general-info'
            },
            {
                title: 'TOPS',
                type : 'basic',
                icon : 'mat_outline:business_center',
                link : 'tops'
            },
            {
                title: 'CAPS',
                type : 'basic',
                icon : 'iconsmind:tree_4',
                link : 'caps'
            },
            {
                title: 'Reports',
                type : 'basic',
                icon : 'heroicons_outline:presentation-chart-bar',
                link : 'reports'
            },
            {
                title: 'Local Attributes',
                type : 'basic',
                icon : 'heroicons_outline:location-marker',
                link : 'local-attributes'
            },
            {
                title: 'Hub Settings',
                type : 'basic',
                icon : 'heroicons_outline:adjustments',
                link : 'hub-settings'
            }
        ]
    },
    
   
    {
        type: 'divider'
    }
];
  drawerOpened: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _fuseMediaWatcherService: FuseMediaWatcherService, private apiService: ProjectApiService,private _Activatedroute:ActivatedRoute,public indicator: SpotlightIndicatorsService) { }
  
  ngOnInit(): void {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getproject(this.id).then((res) => {
      this.projectDetails = res
      console.log(res)
    })
    this.apiService.getportfolioData(this.id).then((res) => {
        this.portfolioDetails = res
        console.log(res)
      })
    
    
  }


}
