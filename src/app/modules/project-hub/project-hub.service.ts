import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { RoleService } from 'app/core/auth/role.service';
import { RoleController } from 'app/shared/role-controller';
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
  lookUpMaster: any = []
  kpiMasters: any = []
  projectid: string = ""
  hasChildren: boolean = false
  submitbutton = new BehaviorSubject<boolean>(false)
  isNavChanged = new BehaviorSubject<boolean>(false)
  isFormChanged: boolean = false
  includeClosedItems = {
    askNeed: new BehaviorSubject<boolean>(false),
    riskIssue: new BehaviorSubject<boolean>(false),
    schedule: new BehaviorSubject<boolean>(false)
  }
  successSave = new BehaviorSubject<boolean>(false)
  isBulkEdit: boolean = false
  fuseDrawerLarge: boolean = false
  roleControllerControl: RoleController = new RoleController;
  removedIds: any[];
  projectChildren: any[];
  projects: any[];
  currentSpotId: string;


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
          title: 'Associated Projects',
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
          title: 'Project Benefits',
          type: 'basic',
          icon: 'feather:target',
          link: 'project-benefits'
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
          icon: 'mat_outline:edit_attributes',
          link: 'local-attributes'
        },
        {
          title: 'Hub Settings',
          type: 'basic',
          icon: 'heroicons_outline:adjustments',
          link: 'hub-settings'
        },
        {
          type: 'spacer'
        },
      ]
    },
    {
      title: 'Wizards',
      type: 'group',
      children: [
        {
          title: 'Project Proposal',
          type: 'basic',
          icon: 'heroicons_outline:light-bulb',
          link: 'project-proposal'
        },
        {
          title: 'Business Case',
          type: 'collapsable',
          icon: 'heroicons_outline:briefcase',
          children: [
            {
              title: 'Recommended Option',
              type: 'basic',
              link: 'business-case'
            },
            {
              title: 'Option 2',
              type: 'basic',
            },
            {
              title: 'Option 3',
              type: 'basic',
            }
          ]
        },
        {
          title: 'Project Charter',
          type: 'collapsable',
          icon: 'heroicons_outline:clipboard-check',
          link: 'project-charter',
          children: [
            {
              title: 'General Info',
              type: 'basic',
              link: 'project-charter/project-charter-general-info'
            },
            {
              title: 'Schedule',
              type: 'basic',
              link: 'project-charter/project-charter-schedule'
            },
            {
              title: 'Project Team',
              type: 'basic',
              link: 'project-charter/project-charter-project-teams'
            },
            {
              title: 'Risks / Assumptions',
              type: 'basic',
              link: 'project-charter/project-charter-risk-assumption'
            }
          ]
        },
        {
          title: 'Project Dashboards',
          type: 'collapsable',
          icon: 'heroicons_outline:presentation-chart-line',
          children: [
            {
              title: 'Performance',
              type: 'basic',

            },
            {
              title: 'Budget',
              type: 'basic',
            },
            {
              title: 'GMSGQ Product Team',
              type: 'basic',
            }
          ]
        },
        {
          title: 'Close Out Report',
          type: 'basic',
          icon: 'heroicons_outline:flag',
          link: 'close-out'
        },
      ]
    },


    {
      type: 'divider'
    }
  ];
  constructor(private fusealert: FuseConfirmationService, private roleController: RoleService, private msalService: MsalService) {
    console.log("Project Service Started")
  }
  projectidInjector(projectid: string) {
    this.projectid = projectid
    this.getroles()
  }
  getroles() {
    this.roleControllerControl = this.roleController.getRolesbyProjectData(this.projectid)
  }
  toggleDrawerOpen(itemtype: string, itemid: string, all: any, pid: string, isBulkEdit: boolean = false,fuseDrawerLarge: boolean = false): void {
    console.log(itemtype)
    if (this.drawerOpenedright == true && this.isFormChanged == true) {
      const alertopener = this.fusealert.open(this.alert)
      alertopener.afterClosed().subscribe(res => {
        if (res == 'confirmed') {
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
      this.itemid = itemid
      this.itemtype = itemtype
      this.all = all
      this.projectid = pid
      this.drawerOpenedright = !this.drawerOpenedright
    }
    this.isBulkEdit = isBulkEdit
    this.fuseDrawerLarge = fuseDrawerLarge
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
          this.isBulkEdit = false
        }

      }
    }
  }

  alertopener() {
    const alertopener = this.fusealert.open(this.alert)
    this.isFormChanged = false
    alertopener.afterClosed().subscribe(res => {
      if (res != 'confirmed') {
        this.toggleDrawerOpen(this.itemtype, this.itemid, this.all, this.projectid,this.isBulkEdit)
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
