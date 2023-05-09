import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-transportation-single-edit',
  templateUrl: './transportation-single-edit.component.html',
  styleUrls: ['./transportation-single-edit.component.scss']
})
export class TransportationSingleEditComponent {
  unitCost = ""
  formFieldHelpers: string[] = [''];
  id: string = ""
  lookupdata: any
  biogenics: any
  transportationData: any
  dropdownList: any
  biogenicsUpdated: any
  activeaccount: any
  impactRealizationDate: any

  TransportationForm = new FormGroup({
    emenvironmentId: new FormControl(),
    environmentalSourceTypeId: new FormControl(),
    projectId: new FormControl(),
    transportationMode: new FormControl(),
    transportationType: new FormControl(),
    fuelType: new FormControl(),
    environmentalSourceId: new FormControl(),
    co2intensityFactorValue: new FormControl(),
    co2intensityFactorMeasure: new FormControl(),
    shipmentDistance: new FormControl(),
    shipmentWeight: new FormControl(),
    shipmentFrequency: new FormControl(),
    affectedLocations: new FormControl(),
    affectedContainers: new FormControl(),
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
    this.transportationData = this.projecthubservice.all[0]
    this.dropdownList = this.projecthubservice.all[1]
    //this.impactRealizationDate = this.projecthubservice.all[2].projectData.emissionsImpactRealizationDate
    this.TransportationForm.patchValue({

      emenvironmentId: "",
      environmentalSourceTypeId: "1e123779-0e1e-4994-bec3-95924aa0e7e6",
      projectId: this.projecthubservice.projectid,
      environmentalSourceId: "",
      transportationMode: "",
      transportationType: "",
      fuelType: "",
      co2intensityFactorValue: "",
      co2intensityFactorMeasure: "",
      shipmentDistance: 0,
      shipmentWeight: 0,
      shipmentFrequency: 0,
      affectedLocations: null,
      affectedContainers: null,
      embasisOfEstimate: ""
    })
    this.TransportationForm.controls['co2intensityFactorMeasure'].disable()
    this.TransportationForm.controls['co2intensityFactorValue'].disable()
    this.projecthubservice.isFormChanged = false
    this.TransportationForm.valueChanges.subscribe(res => {
      this.projecthubservice.isFormChanged = true
    })
  }

  GetUniqueTransportationModes() {
    const uniqueModes = new Set();
    if (this.dropdownList) {
      this.dropdownList
        .filter(x => x.environmentalSourceTypeId === "1e123779-0e1e-4994-bec3-95924aa0e7e6")
        .forEach(x => uniqueModes.add(x.transportationMode));
    }
    return Array.from(uniqueModes);
  }

  GetUniqueTransportationTypes() {
    const uniqueTypes = new Set();
    if (this.dropdownList) {
      this.dropdownList
        .filter(x => x.environmentalSourceTypeId === "1e123779-0e1e-4994-bec3-95924aa0e7e6")
        .forEach(x => uniqueTypes.add(x.transportationType));
    }
    return Array.from(uniqueTypes);
  }

  GetUniqueFuel() {
    const uniqueFuel = new Set();
    if (this.dropdownList) {
      this.dropdownList
        .filter(x => x.environmentalSourceTypeId === "1e123779-0e1e-4994-bec3-95924aa0e7e6")
        .forEach(x => uniqueFuel.add(x.fuelType));
    }
    return Array.from(uniqueFuel);
  }



  submitTransportation() {
       this.projecthubservice.isFormChanged = false
      var formValue = this.TransportationForm.getRawValue()
       formValue.shipmentDistance = isNaN(formValue.shipmentDistance) ? null : formValue.shipmentDistance
       formValue.shipmentFrequency = isNaN(formValue.shipmentFrequency) ? null : formValue.shipmentFrequency
       formValue.shipmentWeight = isNaN(formValue.shipmentWeight) ? null : formValue.shipmentWeight
       if (formValue.transportationMode == "") {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Please select a value for Transportation Mode.",
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
      else if (formValue.transportationType == "") {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Please select a value for Transportation Type.",
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
      else if (formValue.fuelType == "") {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Please select a value for Fuel Type.",
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
  environmentalSourceTypeId: '1e123779-0e1e-4994-bec3-95924aa0e7e6',
  projectId: this.projecthubservice.projectid,
  environmentalSourceId: '',
  shipmentDistance: formValue.shipmentDistance,
  shipmentWeight: formValue.shipmentWeight,
  shipmentFrequency: formValue.shipmentFrequency,
  affectedLocations: null,
  affectedContainers: null,
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
