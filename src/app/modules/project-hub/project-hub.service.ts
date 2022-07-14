import { Injectable } from '@angular/core';
import { FuseAlertService } from '@fuse/components/alert';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectApiService } from './common/project-api.service';
import { AskNeedViewEditComponent } from './project-view/ask-need-view-edit/ask-need-view-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectHubService {
  drawerOpenedright: boolean = false;
  itemid: string = "new"
  itemtype: string = ""
  item: any = {}
  all: any = []
  projectid: string = ""
  submitbutton = new BehaviorSubject<boolean>(false)
  isNavChanged = new BehaviorSubject<boolean>(false)
  isFormChanged: boolean = false
  alert: FuseConfirmationConfig = {
    "title": "Are you sure you want to exit?",
    "message": "All unsaved data will be lost.",
    "icon": {
      "show": true,
      "name": "heroicons_outline:exclamation",
      "color": "warn"
    },
    "actions": {
      "confirm": {
        "show": true,
        "label": "Ok",
        "color": "warn"
      },
      "cancel": {
        "show": true,
        "label": "Cancel"
      }
    },
    "dismissible": true
  }
  menuData: FuseNavigationItem[] = [
    {
        id: 'project-info',
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
                id: 'budget',
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
  constructor(private fusealert: FuseConfirmationService) { }

  toggleDrawerOpen(itemtype: string, itemid: string, all: any, pid: string): void {
    console.log(this.isFormChanged)
    if (this.drawerOpenedright == true && this.isFormChanged == true) {
      const alertopener = this.fusealert.open(this.alert)
      alertopener.afterClosed().subscribe(res => {
        if (res == 'confirmed') {
          console.log("hello idiot")
          this.item = {}
          this.itemtype = ""
          this.itemid = ""
          this.all = []
          this.projectid = ""
          this.isFormChanged = false
          this.drawerOpenedright = !this.drawerOpenedright
        }
      })
    }
    else {
      console.log("this is shady")
      this.itemid = itemid
      this.itemtype = itemtype
      this.all = all
      this.projectid = pid
      this.drawerOpenedright = !this.drawerOpenedright
    }

  }
  drawerOpenedChanged(event: any): void {

    if (this.drawerOpenedright != event) {
      if (event == false) {
        this.drawerOpenedright = event
        if (this.isFormChanged == true) {
          console.log(this.isFormChanged)
          this.alertopener()
        }
        else {
          this.item = {}
          this.itemtype = ""
          this.itemid = ""
          this.all = []
          this.projectid = ""
          this.isFormChanged = false
        }

      }
    }
  }

  alertopener() {
    const alertopener = this.fusealert.open(this.alert)
    this.isFormChanged = false
    alertopener.afterClosed().subscribe(res => {
      if (res != 'confirmed') {
        this.toggleDrawerOpen(this.itemtype, this.itemid, this.all, this.projectid)
        this.isFormChanged = true
      }
      else {
        this.item = {}
        this.itemtype = ""
        this.itemid = ""
        this.all = []
        this.projectid = ""
        this.isFormChanged = false
      }
    })
  }
}
