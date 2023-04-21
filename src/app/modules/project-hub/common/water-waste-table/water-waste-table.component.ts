import { Component, Input } from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-water-waste-table',
  templateUrl: './water-waste-table.component.html',
  styleUrls: ['./water-waste-table.component.scss']
})
export class WaterWasteTableComponent {
  id: string = ""
  viewContent: boolean = false
  WaterWastengx: any = []
  unitCost = ""
  waterWasteBulkEditData:any = []
  @Input() Editable: boolean = false
  @Input() data: any
  @Input() ProjectData: any
  @Input() WaterWasteParam: any
  @Input() editCost: boolean
  sortDir = ""
  sortDirCost = ""
  lookupdata: any
  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService) {
    this.projecthubservice.submitbutton.subscribe(res => {
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
      if (this.ProjectData.localCurrency == null){
          this.unitCost = "Unit Cost ()"
        }
        else{
        this.unitCost = "Unit Cost (" + this.ProjectData.localCurrency.localCurrencyAbbreviation + ")"
        }
        if(this.Editable == false){
          this.WaterWastengx = null
        }
        else{
          this.WaterWastengx = this.data
      }
        this.waterWasteBulkEditData=[]
        this.waterWasteBulkEditData.push(this.WaterWastengx)
      this.waterWasteBulkEditData.push(this.ProjectData)
      if (this.ProjectData.localCurrency == null) {
          this.waterWasteBulkEditData.push("")
        }
        else {
        this.waterWasteBulkEditData.push(this.ProjectData.localCurrency.localCurrencyAbbreviation)
        }
      this.waterWasteBulkEditData.push(this.WaterWasteParam)
      this.waterWasteBulkEditData.push(this.editCost)
        this.viewContent = true
    })
  }

  getLookupName(lookUpId: string): string {
    return lookUpId && lookUpId != '' ? this.lookupdata.find(x => x.lookUpId == lookUpId).lookUpName : ''
  }

  deleteWW(id: string) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Operational Performance?",
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
    const WWAlert = this.fuseAlert.open(comfirmConfig)

    WWAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.apiService.deleteWW(id).then(res => {
            this.projecthubservice.submitbutton.next(true)
        })
      }
    })
  }

  sortasc() {
    if (this.sortDir == "" || this.sortDir == "desc") {
      return this.sortDir = "asc"
    }
    else if (this.sortDir == "asc") {
      return this.sortDir = "desc"
    }
  }

  sortascCost() {
    if (this.sortDirCost == "" || this.sortDirCost == "desc") {
      return this.sortDirCost = "asc"
    }
    else if (this.sortDirCost == "asc") {
      return this.sortDirCost = "desc"
    }
  }

}
