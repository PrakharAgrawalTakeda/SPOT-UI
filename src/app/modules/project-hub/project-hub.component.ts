import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ProjectApiService } from './common/project-api.service';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';

@Component({
  selector: 'app-project-hub',
  templateUrl: './project-hub.component.html',
  styleUrls: ['./project-hub.component.scss']
})
export class ProjectHubComponent implements OnInit {
  drawerMode: 'over' | 'side' = 'side';
  projectDetails: any = {}
  id:string = ""
  selectedProject: string = 'ACME Corp. Backend App';
  menuData: FuseNavigationItem[] = [
    {
        title   : 'Actions',
        subtitle: 'Task, project & team',
        type    : 'group',
        children: [
            {
                title: 'Project View',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-list',
                link: 'project-view'
            },
            {
                title: 'Project team',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : 'project-team' 
            },
            {
                title: 'Create project',
                type : 'basic',
                icon : 'heroicons_outline:briefcase'
            },
            {
                title: 'Create user',
                type : 'basic',
                icon : 'heroicons_outline:user-add'
            },
            {
                title   : 'Assign user or team',
                subtitle: 'Assign to a task or a project',
                type    : 'basic',
                icon    : 'heroicons_outline:badge-check'
            }
        ]
    },
    {
        title   : 'Tasks',
        type    : 'group',
        children: [
            {
                title: 'All tasks',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-list',
                badge: {
                    title  : '49',
                    classes: 'px-2 bg-primary text-on-primary rounded-full'
                }
            },
            {
                title: 'Ongoing tasks',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-copy'
            },
            {
                title: 'Completed tasks',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check'
            },
            {
                title: 'Abandoned tasks',
                type : 'basic',
                icon : 'heroicons_outline:clipboard'
            },
            {
                title: 'Assigned to me',
                type : 'basic',
                icon : 'heroicons_outline:user'
            },
            {
                title: 'Assigned to my team',
                type : 'basic',
                icon : 'heroicons_outline:users'
            }
        ]
    },
    {
        title   : 'Settings',
        type    : 'group',
        children: [
            {
                title   : 'General',
                type    : 'collapsable',
                icon    : 'heroicons_outline:cog',
                children: [
                    {
                        title: 'Tasks',
                        type : 'basic'
                    },
                    {
                        title: 'Users',
                        type : 'basic'
                    },
                    {
                        title: 'Teams',
                        type : 'basic'
                    }
                ]
            },
            {
                title   : 'Account',
                type    : 'collapsable',
                icon    : 'heroicons_outline:user-circle',
                children: [
                    {
                        title: 'Personal',
                        type : 'basic'
                    },
                    {
                        title: 'Payment',
                        type : 'basic'
                    },
                    {
                        title: 'Security',
                        type : 'basic'
                    }
                ]
            }
        ]
    },
    {
        type: 'divider'
    }
];
  drawerOpened: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _fuseMediaWatcherService: FuseMediaWatcherService, private apiService: ProjectApiService,private _Activatedroute:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getproject(this.id).then((res) => {
      this.projectDetails = res
      console.log(this.id)
    })
    
  }


}
