import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-biogenics-table',
  templateUrl: './biogenics-table.component.html',
  styleUrls: ['./biogenics-table.component.scss']
})
export class BiogenicsTableComponent {
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
        if(this.Editable == false){
          this.Biogenicsngx = null
        }
        else{
          this.Biogenicsngx = this.data
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
        if (this.ProjectData.localCurrency == null) {
          this.biogenicsBulkEditData.push("")
        }
        else {
          this.biogenicsBulkEditData.push(this.ProjectData.localCurrency.localCurrencyAbbreviation)
        }

      this.biogenicsBulkEditData.push(this.editCost)
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
    const BiogenicsAlert = this.fuseAlert.open(comfirmConfig)

    BiogenicsAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.apiService.deleteBiogenics(id).then(res => {
          this.projecthubservice.submitbutton.next(true)
        })
      }
    })
  }
}
