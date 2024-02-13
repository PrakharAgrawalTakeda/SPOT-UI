import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../../project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-shipping-single-edit',
  templateUrl: './shipping-single-edit.component.html',
  styleUrls: ['./shipping-single-edit.component.scss']
})
export class ShippingSingleEditComponent {
  unitCost = ""
  formFieldHelpers: string[] = [''];
  id: string = ""
  lookupdata: any
  biogenics: any
  shippingData: any
  dropdownList: any
  biogenicsUpdated: any
  activeaccount: any
  impactRealizationDate: any
  supplierDropDownValues = ["Csafe", "Envirotainer", "Standard", "VaQTech"]
  csafeDropDownValues = []
  envirotainerDropDownValues = []
  standardDropDownValues = []
  vaqtechDropDownValues = []
  canSubmit: boolean = true
  ShippingForm = new FormGroup({
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
    embasisOfEstimate: new FormControl(),
    solutionName: new FormControl(),
    shippingSolutionSupplier: new FormControl()
  })
  allowNegativeShipment = true;
  allowNegativeLocations = true;
  constructor(public fuseAlert: FuseConfirmationService, private authService: MsalService, private apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public auth: AuthService) { 
    this.ShippingForm.controls.solutionName.valueChanges.subscribe(res => {
      if(res == "Csafe RKN"){
        this.ShippingForm.patchValue({ co2intensityFactorMeasure : "kg CO2e per container-km", co2intensityFactorValue : "3.240"})
      }
      else if(res == "Envirotainer e2" || res == "Envirotainer e1"){
        this.ShippingForm.patchValue({ co2intensityFactorMeasure : "kg CO2e per container-km", co2intensityFactorValue : "3.130"})
      }
      else if(res == "Standard"){
        this.ShippingForm.patchValue({ co2intensityFactorMeasure : "kg CO2e per container-km", co2intensityFactorValue : "3.275"})
      }
      else if(res == "VaQTainer XLx"){
        this.ShippingForm.patchValue({ co2intensityFactorMeasure : "kg CO2e per container-km", co2intensityFactorValue : "3.600"})
      }
    })
    this.ShippingForm.controls.shipmentDistance.valueChanges.subscribe(res => {
      if (res < 0) {
          this.allowNegativeLocations = false;
      } else {
          this.allowNegativeLocations = true;
      }
  });
  
  this.ShippingForm.controls.affectedContainers.valueChanges.subscribe(res => {
      if (res < 0) {
          this.allowNegativeShipment = false;
      } else {
          this.allowNegativeShipment = true;
      }
  });
  }

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
    this.shippingData = this.projecthubservice.all[0]
    this.dropdownList = this.projecthubservice.all[1]
    console.log(this.projecthubservice)
    var csafe = this.projecthubservice.all[1].filter(x => x.shippingSolutionSupplier == 'Csafe')
    for (var j = 0; j < csafe.length; j++) {
      this.csafeDropDownValues.push(csafe[j].solutionName)
    }
    this.csafeDropDownValues.sort()
    var envirotainer = this.projecthubservice.all[1].filter(x => x.shippingSolutionSupplier == 'Envirotainer')
    for (var j = 0; j < envirotainer.length; j++) {
      this.envirotainerDropDownValues.push(envirotainer[j].solutionName)
    }
    this.envirotainerDropDownValues.sort()
    var standard = this.projecthubservice.all[1].filter(x => x.shippingSolutionSupplier == 'Standard')
    for (var j = 0; j < standard.length; j++) {
      this.standardDropDownValues.push(standard[j].solutionName)
    }
    this.standardDropDownValues.sort()
    var vaQTech = this.projecthubservice.all[1].filter(x => x.shippingSolutionSupplier == 'VaQTech')
    for (var j = 0; j < vaQTech.length; j++) {
      this.vaqtechDropDownValues.push(vaQTech[j].solutionName)
    }
    this.vaqtechDropDownValues.sort()

    this.ShippingForm.patchValue({

      emenvironmentId: "",
      environmentalSourceTypeId: "0d69c0c1-ce34-4419-8555-32183d301d15",
      projectId: this.projecthubservice.projectid,
      environmentalSourceId: null,
      transportationMode: "",
      transportationType: "",
      fuelType: "",
      co2intensityFactorValue: "",
      co2intensityFactorMeasure: "",
      shipmentDistance: 0,
      shipmentWeight: 0,
      shipmentFrequency: 0,
      affectedLocations: null,
      affectedContainers: 0,
      embasisOfEstimate: "",
      solutionName: "",
    shippingSolutionSupplier: ""
    })
    this.ShippingForm.controls['co2intensityFactorMeasure'].disable()
    this.ShippingForm.controls['co2intensityFactorValue'].disable()
    this.projecthubservice.isFormChanged = false
    this.ShippingForm.valueChanges.subscribe(res => {
      this.projecthubservice.isFormChanged = true
    })
  }

  submitShipping() {
    if(this.canSubmit)
    {
      this.canSubmit = false
    this.projecthubservice.isFormChanged = false
    var formValue = this.ShippingForm.getRawValue()
    formValue.shipmentDistance = isNaN(formValue.shipmentDistance) ? null : formValue.shipmentDistance
    formValue.affectedContainers = isNaN(formValue.affectedContainers) ? null : formValue.affectedContainers
    if (formValue.shippingSolutionSupplier == "") {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "In order to save the Shipping Solution information it is required to select Solution Supplier and Solution Name!",
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
      this.canSubmit = true
    }
    else if (formValue.solutionName == "") {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "In order to save the Shipping Solution information it is required to select Solution Supplier and Solution Name!",
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
      this.canSubmit = true
    }
    
    else {
      console.log(this.projecthubservice.all[1]
        .filter(x => x.shippingSolutionSupplier == formValue.shippingSolutionSupplier && x.solutionName == formValue.solutionName)
        .map(obj => obj.environmentalSourceId))
      var environmentalSourceId = this.projecthubservice.all[1]
        .filter(x => x.shippingSolutionSupplier == formValue.shippingSolutionSupplier && x.solutionName == formValue.solutionName)
        .map(obj => obj.environmentalSourceId)[0].toString()

      var mainObj: any = {
        emenvironmentId: '',
        environmentalSourceTypeId: '0d69c0c1-ce34-4419-8555-32183d301d15',
        projectId: this.projecthubservice.projectid,
        environmentalSourceId: environmentalSourceId,
        shipmentDistance: formValue.shipmentDistance == null || formValue.shipmentDistance == 0 ? 0 : formValue.shipmentDistance,
        shipmentWeight: null,
        shipmentFrequency: null,
        affectedLocations: null,
        affectedContainers: formValue.affectedContainers == null || formValue.affectedContainers == 0 ? 0 : formValue.affectedContainers,
        embasisOfEstimate: formValue.embasisOfEstimate
      }
      console.log(mainObj)
      this.apiService.addDistribution(mainObj).then(res => {
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.successSave.next(true)
        this.projecthubservice.toggleDrawerOpen('', '', [], '')
        this.canSubmit = true
      })
    }
  }
}
}
