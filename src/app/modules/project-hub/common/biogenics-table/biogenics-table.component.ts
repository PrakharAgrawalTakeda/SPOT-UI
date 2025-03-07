import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-biogenics-table',
  templateUrl: './biogenics-table.component.html',
  styleUrls: ['./biogenics-table.component.scss']
})
export class BiogenicsTableComponent implements OnInit, OnDestroy {
  id: string = ""
  viewContent:boolean = false
  Biogenicsngx: any = []
  unitCost = ""
  noCarbonImpact: boolean = false
  biogenicsBulkEditData: any = []
  @Input() Editable: boolean = false
  @Input() data: any
  @Input() ProjectData: any
  @Input() editCost: any
  @Input() DateMandatory: boolean
  sortDir = ""
  lookupdata: any
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
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
        if(this.Editable == false){
          this.Biogenicsngx = null
        }
        else{
          this.Biogenicsngx = this.data
          console.log(this.Biogenicsngx)
        }
        if (this.ProjectData.localCurrency == null) {
          this.unitCost = "Unit Cost ()"
        }
        else {
          this.unitCost = "Unit Cost (" + this.ProjectData.localCurrency.localCurrencyAbbreviation + ")"
        }
        this.noCarbonImpact = this.ProjectData.projectData.noCarbonImpact
        this.biogenicsBulkEditData=[]
        this.biogenicsBulkEditData.push(this.Biogenicsngx)
        this.biogenicsBulkEditData.push(this.noCarbonImpact)
        this.biogenicsBulkEditData.push(this.ProjectData)
        this.biogenicsBulkEditData.push(this.editCost)
        this.biogenicsBulkEditData.push(this.DateMandatory)
        if (this.noCarbonImpact == true) {
          for (var i of this.Biogenicsngx) {
            i.biogenicEmissionFactor = null
            i.biogenicUnit = null,
              i.biogenicUnitCost = null,
              i.biogenicBasisOfEstimate = ""
          }
        }
        this.viewContent = true
    })
  }

  getLookUpName(id: any): any {
    return id && id.lookUpId != '' ? this.lookupdata.find(x => x.lookUpId == id).lookUpName : ''
  }

  deleteBiogenics(id: string) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Biogenic?",
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
    const BiogenicsAlert = this.fuseAlert.open(comfirmConfig)

    BiogenicsAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.apiService.deleteBiogenics(id).then(res => {
          this.projecthubservice.submitbutton.next(true)
        })
      }
    })
  }

  sortasc(){
    if (this.sortDir == "" || this.sortDir == "desc"){
      return this.sortDir = "asc"
    }
    else if(this.sortDir == "asc"){
      return this.sortDir = "desc"
    }
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
