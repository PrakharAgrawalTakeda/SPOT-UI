import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { BehaviorSubject, Observable } from 'rxjs';

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
      title: 'Project Hub Menu',
      type: 'group',
      children: [
        {
          title: 'Project Board',
          type: 'basic',
          icon: 'heroicons_outline:clipboard-list',
          link: 'project-board'
        },
        {
          title: 'Assoiated Projects',
          type: 'basic',
          icon: 'heroicons_outline:link',
          link: 'associated-projects'
        },
        {
          title: 'General Info',
          type: 'basic',
          icon: 'heroicons_outline:pencil-alt',
          link: 'general-info'
        },
        {
          title: 'Project Proposal',
          type: 'basic',
          icon: 'mat_outline:insert_chart',
          link: 'project-proposal'
        },
        {
          title: 'Business Cases',
          type: 'basic',
          icon: 'heroicons_outline:presentation-chart-line',
          link: 'business-case'
        },
        {
          title: 'Budget',
          type: 'basic',
          icon: 'heroicons_outline:currency-dollar',
          link: 'budget'
        },
        {
          title: 'Project Team',
          type: 'basic',
          icon: 'heroicons_outline:user-group',
          link: 'project-team'
        },
        {
          title: 'CAPS',
          type: 'basic',
          icon: 'iconsmind:tree_4',
          link: 'caps'
        },
        {
          title: 'Documents',
          type: 'basic',
          icon: 'heroicons_outline:document-text',
          link: 'project-documents'
        },
        {
          type: 'spacer'
        },
        {
          type: 'spacer'
        },
        {
          type: 'spacer'
        },
        {
          title: 'Local Attributes',
          type: 'basic',
          icon: 'heroicons_outline:document-text',
          link: 'local-attributes'
        },
        {
          title: 'Reports',
          type: 'basic',
          icon: 'heroicons_outline:presentation-chart-bar',
          link: 'reports'
        },
        {
          title: 'Hub Settings',
          type: 'basic',
          icon: 'heroicons_outline:adjustments',
          link: 'hub-settings'
        }
      ]
    },
    {
      title: 'Wizards',
      type: 'group',
      children: [
        {
          title: 'Business Case',
          type: 'basic',
          icon: 'mat_outline:business_center',
          link: 'business-case'
        },
        {
          title: 'Project Charter',
          type: 'basic',
          icon: 'heroicons_outline:location-marker',
          link: 'project-charter'
        },

        {
          title: 'Close Out',
          type: 'basic',
          icon: 'heroicons_outline:location-marker',
          link: 'close-out'
        },
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
