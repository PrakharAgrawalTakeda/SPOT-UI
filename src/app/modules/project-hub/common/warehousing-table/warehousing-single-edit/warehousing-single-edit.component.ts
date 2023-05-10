import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../../project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-warehousing-single-edit',
  templateUrl: './warehousing-single-edit.component.html',
  styleUrls: ['./warehousing-single-edit.component.scss']
})
export class WarehousingSingleEditComponent {
  unitCost = ""
  formFieldHelpers: string[] = [''];
  id: string = ""
  lookupdata: any
  biogenics: any
  warehousingData: any
  dropdownList: any
  biogenicsUpdated: any
  activeaccount: any
  impactRealizationDate: any

  WarehousingForm = new FormGroup({
    emenvironmentId: new FormControl(),
    environmentalSourceTypeId: new FormControl(),
    projectId: new FormControl(),
    environmentalSourceId: new FormControl(),
    co2intensityFactorValue: new FormControl(),
    co2intensityFactorMeasure: new FormControl(),
    shipmentWeight: new FormControl(),
    affectedLocations: new FormControl(),
    embasisOfEstimate: new FormControl()
  })

  constructor(public fuseAlert: FuseConfirmationService, private authService: MsalService, private apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public auth: AuthService) { }

  ngOnInit(): void {
    this.getllookup()
  }

  getllookup() {
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
      this.dataloader()
    })
  }

  dataloader() {
    this.warehousingData = this.projecthubservice.all[0]
    console.log(this.projecthubservice.all[0])
    this.dropdownList = this.projecthubservice.all[1]
    //this.impactRealizationDate = this.projecthubservice.all[2].projectData.emissionsImpactRealizationDate
    this.WarehousingForm.patchValue({

      emenvironmentId: "",
      environmentalSourceTypeId: "af83f434-2e3d-42fc-b506-f93ce2f74503",
      projectId: this.projecthubservice.projectid,
      environmentalSourceId: "",
      co2intensityFactorValue: "11.7",
      co2intensityFactorMeasure: "kg CO2e/t",
      shipmentWeight: 0,
      affectedLocations: null,
      embasisOfEstimate: ""
    })
    this.WarehousingForm.controls['co2intensityFactorMeasure'].disable()
    this.WarehousingForm.controls['co2intensityFactorValue'].disable()
    this.projecthubservice.isFormChanged = false
    this.WarehousingForm.valueChanges.subscribe(res => {
      this.projecthubservice.isFormChanged = true
    })
  }



  submitWarehousing() {
       this.projecthubservice.isFormChanged = false
      var formValue = this.WarehousingForm.getRawValue()
       formValue.affectedLocations = isNaN(formValue.affectedLocations) ? null : formValue.affectedLocations
       if (formValue.shipmentWeight == "") {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "In order to save the Warehousing information it is required to enter a Shipment Weight (kg)!",
          "message": "",
          "icon": {
            "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "warning"
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
        const alert = this.fuseAlert.open(comfirmConfig)
      }
      
      else {
        var mainObj: any = {
          emenvironmentId: '',
  environmentalSourceTypeId: 'af83f434-2e3d-42fc-b506-f93ce2f74503',
  projectId: this.projecthubservice.projectid,
  environmentalSourceId: 'C9268310-E160-4624-B242-42F6745A7B13',
  shipmentWeight: formValue.shipmentWeight,
  affectedLocations: formValue.affectedLocations,
  embasisOfEstimate: formValue.embasisOfEstimate
        }
        this.apiService.addDistribution(mainObj).then(res => {
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.successSave.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
        })
      }
  }
}
