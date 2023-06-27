import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectHubService } from '../../project-hub.service';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-transportation-table',
  templateUrl: './transportation-table.component.html',
  styleUrls: ['./transportation-table.component.scss']
})
export class TransportationTableComponent {
  id: string = ""
  viewContent: boolean = false
  Transportationngx: any = []
  transportationBulkEditData: any = []
  @Input() Editable: boolean = false
  @Input() ProjectData: any
  @Input() editCost: any
  @Input() data: any
  @Input() GDLList: any
  lookupdata: any
  editable= false
  sortDir = ""
  gdlList: any;
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
    if (this.projecthubservice.roleControllerControl.projectHub.CAPS) {
      this.editable = true
    }
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      //this.apiService.getCAPSbyProjectID(this.id).then((res: any) => {
        if (this.Editable == false) {
          this.Transportationngx = null
        }
        else {
          this.Transportationngx = this.data
          this.gdlList = this.GDLList
          console.log(this.Transportationngx)
        }
        this.transportationBulkEditData.push(this.Transportationngx)
        this.transportationBulkEditData.push(this.gdlList)
        //this.transportationBulkEditData.push(res.projectData.emissionsImpactRealizationDate)
        this.viewContent = true
      })
    //})
  }

  getLookUpName(id: any): any {
    return id && id.lookUpId != '' ? this.lookupdata.find(x => x.lookUpId == id).lookUpName : ''
  }

  deleteDistribution(id: string) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Transportation Record?",
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
    const TransportationAlert = this.fuseAlert.open(comfirmConfig)

    TransportationAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.apiService.deleteDistribution(id).then(res => {
          this.projecthubservice.submitbutton.next(true)
        })
      }
    })
  }
}
