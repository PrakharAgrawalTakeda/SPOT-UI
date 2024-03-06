import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from '../../project-hub.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../project-api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-shipping-table',
  templateUrl: './shipping-table.component.html',
  styleUrls: ['./shipping-table.component.scss']
})
export class ShippingTableComponent implements OnInit,OnDestroy {
  id: string = ""
  viewContent: boolean = false
  Shippingngx: any = []
  shippingBulkEditData: any = []
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
          this.Shippingngx = null
        }
        else {
          this.Shippingngx = this.data
          this.gdlList = this.GDLList
          console.log(this.Shippingngx)
        }
        this.shippingBulkEditData.push(this.Shippingngx)
        this.shippingBulkEditData.push(this.gdlList)
        //this.shippingBulkEditData.push(res.projectData.emissionsImpactRealizationDate)
        this.viewContent = true
      //})
    })
  }

  deleteDistribution(id: string) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Shipping Record?",
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
    const ShippingAlert = this.fuseAlert.open(comfirmConfig)

    ShippingAlert.afterClosed().subscribe(close => {
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
