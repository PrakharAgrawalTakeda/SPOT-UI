import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../project-api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-warehousing-table',
  templateUrl: './warehousing-table.component.html',
  styleUrls: ['./warehousing-table.component.scss']
})
export class WarehousingTableComponent implements OnInit, OnDestroy {
  id: string = ""
  viewContent: boolean = false
  Warehousingngx: any = []
  warehousingBulkEditData: any = []
  @Input() Editable: boolean = false
  @Input() ProjectData: any
  @Input() editCost: any
  @Input() data: any
  @Input() GDLList: any
  lookupdata: any
  sortDir = ""
  editable= false
  gdlList: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService) {
    this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (res == true) {
        this.dataloader()
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    if (this.projecthubservice.roleControllerControl.projectHub.CAPS) {
      this.editable = true
    }
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      //this.apiService.getCAPSbyProjectID(this.id).then((res: any) => {
        if (this.Editable == false) {
          this.Warehousingngx = null
        }
        else {
          this.Warehousingngx = this.data
          this.gdlList = this.GDLList
          console.log(this.Warehousingngx)
        }
        this.warehousingBulkEditData.push(this.Warehousingngx)
        this.warehousingBulkEditData.push(this.gdlList)
        //this.warehousingBulkEditData.push(res.projectData.emissionsImpactRealizationDate)
        this.viewContent = true
      //})
    })
  }

  getLookUpName(id: any): any {
    return id && id.lookUpId != '' ? this.lookupdata.find(x => x.lookUpId == id).lookUpName : ''
  }

  deleteDistribution(id: string) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Warehousing Record?",
      "message": "Are you sure you want to remove this record permanently? ",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Remove",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const WarehousingAlert = this.fuseAlert.open(comfirmConfig)

    WarehousingAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.apiService.deleteDistribution(id).then(res => {
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.successSave.next(true)
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
