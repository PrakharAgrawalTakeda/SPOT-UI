import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project-charter',
  templateUrl: './project-charter.component.html',
  styleUrls: ['./project-charter.component.scss']
})
export class ProjectCharterComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
      private projectHubService: ProjectHubService,
      private apiService: ProjectApiService,
      private _Activatedroute: ActivatedRoute,
      private _fuseNavigationService: FuseNavigationService,
      public fuseAlert: FuseConfirmationService,
      private router: Router) {
    this.projectHubService.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (res == true) {
        this.dataloader()
      }
    })
    this.router.events.subscribe(res => {
      if (this.viewContent) {
        this.navItem = null
        this.reloadName()
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
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getReportInfoData(this.id).then(res => {
      console.log("Report Info", res)
      this.reportInfoData = res
      this.reloadName()
      this.viewContent = true
    })
  }
  isNavActive(link: string): boolean {
    return this.router.url.includes(link)
  }
  reloadName() {
    const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('projecthub-navigation');
    this.navItem = this._fuseNavigationService.getItem('project-charter', navComponent.navigation)
  }

  generatePC() {
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
        this.apiService.generateReports(this.id, 'Project Charter').then(res => {
            this.projectHubService.submitbutton.next(true)
        })
      }
    })
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
