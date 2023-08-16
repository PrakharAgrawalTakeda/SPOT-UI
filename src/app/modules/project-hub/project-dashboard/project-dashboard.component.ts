import { Component } from '@angular/core';
import { ProjectHubService } from '../project-hub.service';
import { ProjectApiService } from '../common/project-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent {
  constructor(private projectHubService: ProjectHubService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, private _fuseNavigationService: FuseNavigationService, public fuseAlert: FuseConfirmationService, private router: Router) { 
    this.projectHubService.submitbutton.subscribe(res=>{
      if(res == true){
        this.dataloader()
      }
    })
    this.router.events.subscribe(res => {
      if (this.viewContent) {
        this.navItem = null
        //this.reloadName()
      }
    })
  }
  id: string = ''
  viewContent: boolean = false
  reportInfoData: any = {}
  navItem: any
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getProjectDashboard(this.id).then(res => {
      console.log("Report Info", res)
      this.reportInfoData = res
      //this.reloadName()
      this.viewContent = true
    })
  }
  isNavActive(link: string): boolean {
    return this.router.url.includes(link)
  }

  generateBD() {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "The selected report will be processed and distributed by e-Mail and may take a few minutes. Please check your inbox.",
      "message": "",
      "icon": {
        "show": true,
        "name": "heroicons_outline:check",
        "color": "success"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Okay",
          "color": "primary"
        },
        "cancel": {
          "show": false,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const generateAlert = this.fuseAlert.open(comfirmConfig)

    generateAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        console.log("API CALL HERE")
      }
    })
  } 

  generatePD() {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "The selected report will be processed and distributed by e-Mail and may take a few minutes. Please check your inbox.",
      "message": "",
      "icon": {
        "show": true,
        "name": "heroicons_outline:check",
        "color": "success"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Okay",
          "color": "primary"
        },
        "cancel": {
          "show": false,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const generateAlert = this.fuseAlert.open(comfirmConfig)

    generateAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        console.log("API CALL HERE")
      }
    })
  } 

  generatePTD() {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "The selected report will be processed and distributed by e-Mail and may take a few minutes. Please check your inbox.",
      "message": "",
      "icon": {
        "show": true,
        "name": "heroicons_outline:check",
        "color": "success"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Okay",
          "color": "primary"
        },
        "cancel": {
          "show": false,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const generateAlert = this.fuseAlert.open(comfirmConfig)

    generateAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        console.log("API CALL HERE")
      }
    })
  } 
}
