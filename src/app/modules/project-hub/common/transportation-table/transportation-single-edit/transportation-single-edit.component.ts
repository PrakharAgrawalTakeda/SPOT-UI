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
  modeDropDownValues = ["Air freight", "Courier", "Parcel/ Express", "Road freight", "Sea freight", "Train"]
  typeDropDrownValues = []
  airTypeDropDownValues = []
  roadTypeDropDownValues = []
  courierTypeDropDownValues = []
  parcelTypeDropDownValues = []
  seaTypeDropDownValues = []
  trainTypeDropDownValues = []

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
  roadFuelDropDownValues = []
  roadFuelDropDownValues2 = []
  airFuelDropDownValues = []
  courierFuelDropDownValues = []
  parcelFuelDropDownValues = []
  seaFuelDropDownValues = []
  seaFuelDropDownValues2 = []
  trainFuelDropDownValues = []


  allowNegativeWeight = true;
  allowNegativeFrequency = true;
  allowNegativeDistance = true;
  

  constructor(public fuseAlert: FuseConfirmationService, private authService: MsalService, private apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, public auth: AuthService) {

    
    this.TransportationForm.controls.shipmentDistance.valueChanges.subscribe(res => {
      if (res < 0) {
        this.allowNegativeWeight = false;
        this.allowNegativeFrequency = false;
      } else {
        if (this.TransportationForm.controls.shipmentWeight.value < 0) {
          this.allowNegativeWeight = true;
          this.allowNegativeFrequency = false;
        } else if (this.TransportationForm.controls.shipmentFrequency.value < 0) {
          this.allowNegativeWeight = false;
          this.allowNegativeFrequency = true;
        } else if (this.TransportationForm.controls.shipmentWeight.value > 0){
          this.allowNegativeWeight = false;
          this.allowNegativeFrequency = true;
        }
        else if (this.TransportationForm.controls.shipmentFrequency.value > 0){
          this.allowNegativeWeight = true;
          this.allowNegativeFrequency = false;
        }
      }
    });
    
    this.TransportationForm.controls.shipmentWeight.valueChanges.subscribe(res => {
      if (res < 0) {
        this.allowNegativeDistance = false;
        this.allowNegativeFrequency = false;
      }
      else{
        if (this.TransportationForm.controls.shipmentFrequency.value < 0) {
          this.allowNegativeDistance = false;
      }
      else if (this.TransportationForm.controls.shipmentFrequency.value > 0) {
        this.allowNegativeDistance = true;
      }
      else if (this.TransportationForm.controls.shipmentDistance.value < 0) {
        this.allowNegativeFrequency = false;
    }
    else if (this.TransportationForm.controls.shipmentDistance.value > 0) {
      this.allowNegativeFrequency = true;
    }
      }
    });
    
    this.TransportationForm.controls.shipmentFrequency.valueChanges.subscribe(res => {
      if (res < 0) {
        this.allowNegativeDistance = false;
        this.allowNegativeWeight = false;
      }
      else{
        if (this.TransportationForm.controls.shipmentWeight.value < 0) {
          this.allowNegativeDistance = false;
        } else if (this.TransportationForm.controls.shipmentWeight.value > 0){
          this.allowNegativeDistance = true;
        }
        else if (this.TransportationForm.controls.shipmentDistance.value < 0) {
          this.allowNegativeWeight = false;
        } else if (this.TransportationForm.controls.shipmentDistance.value > 0){
          this.allowNegativeWeight = true;
        }
      }
    });
    

    

    
    this.TransportationForm.controls.fuelType.valueChanges.subscribe(res => {
      //Air freight
      if(res == "Standard" && this.TransportationForm.controls.transportationType.value == "Short haul (< 1000 km)" && this.TransportationForm.controls.transportationMode.value == "Air freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.920"})
      }
      else if(res == "Standard" && this.TransportationForm.controls.transportationType.value == "Medium haul (1000–3700 km)" && this.TransportationForm.controls.transportationMode.value == "Air freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.690"})
      }
      else if(res == "Standard" && this.TransportationForm.controls.transportationType.value == "Long haul (> 3700 km)" && this.TransportationForm.controls.transportationMode.value == "Air freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.680"})
      }
      else if(res == "SAF" && this.TransportationForm.controls.transportationType.value == "Short haul (< 1000 km)" && this.TransportationForm.controls.transportationMode.value == "Air freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.184"})
      }
      else if(res == "SAF" && this.TransportationForm.controls.transportationType.value == "Medium haul (1000–3700 km)" && this.TransportationForm.controls.transportationMode.value == "Air freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.138"})
      }
      else if(res == "SAF" && this.TransportationForm.controls.transportationType.value == "Long haul (> 3700 km)" && this.TransportationForm.controls.transportationMode.value == "Air freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.136"})
      }
      //Courier
      else if(res == "Standard" && this.TransportationForm.controls.transportationType.value == "Standard" && this.TransportationForm.controls.transportationMode.value == "Courier"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.708"})
      }
      else if(res == "Standard" && this.TransportationForm.controls.transportationType.value == "Short haul (< 1000 km)" && this.TransportationForm.controls.transportationMode.value == "Courier"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.892"})
      }
      else if(res == "Standard" && this.TransportationForm.controls.transportationType.value == "Medium haul (1000–3700 km)" && this.TransportationForm.controls.transportationMode.value == "Courier"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.708"})
      }
      else if(res == "Standard" && this.TransportationForm.controls.transportationType.value == "Long haul (> 3700 km)" && this.TransportationForm.controls.transportationMode.value == "Courier"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.700"})
      }
      //Parcel/Express
      else if(res == "Standard" && this.TransportationForm.controls.transportationType.value == "Standard" && this.TransportationForm.controls.transportationMode.value == "Parcel/ Express"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.708"})
      }
      else if(res == "Standard" && this.TransportationForm.controls.transportationType.value == "Short haul (< 1000 km)" && this.TransportationForm.controls.transportationMode.value == "Parcel/ Express"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.892"})
      }
      else if(res == "Standard" && this.TransportationForm.controls.transportationType.value == "Medium haul (1000–3700 km)" && this.TransportationForm.controls.transportationMode.value == "Parcel/ Express"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.708"})
      }
      else if(res == "Standard" && this.TransportationForm.controls.transportationType.value == "Long haul (> 3700 km)" && this.TransportationForm.controls.transportationMode.value == "Parcel/ Express"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.700"})
      }
      //Road freight
      else if(res == "Non Temp-controlled / Diesel, 5% biodiesel blend" && this.TransportationForm.controls.transportationType.value == "Ambient (truck load fill rate > 60%)" && this.TransportationForm.controls.transportationMode.value == "Road freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.078"})
      }
      else if(res == "Non Temp-controlled / Diesel, 5% biodiesel blend" && this.TransportationForm.controls.transportationType.value == "LTL / RDC - Ambient" && this.TransportationForm.controls.transportationMode.value == "Road freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.063"})
      }
      else if(res == "Temp-controlled / Diesel, 5% biodiesel blend" && this.TransportationForm.controls.transportationType.value == "LTL / RDC - Reefer" && this.TransportationForm.controls.transportationMode.value == "Road freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.071"})
      }
      else if(res == "Non Temp-controlled / Diesel, 5% biodiesel blend" && this.TransportationForm.controls.transportationType.value == "Partial Load Ambiant (Truck load fill rate <60%)" && this.TransportationForm.controls.transportationMode.value == "Road freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.137"})
      }
      else if(res == "Temp-controlled / Diesel, 5% biodiesel blend" && this.TransportationForm.controls.transportationType.value == "Partial Load Reefer (Truck load fill rate <60%)" && this.TransportationForm.controls.transportationMode.value == "Road freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.154"})
      }
      else if(res == "Temp-controlled / Diesel, 5% biodiesel blend" && this.TransportationForm.controls.transportationType.value == "Standard - Reefer (if truck load fill rate > 60%)" && this.TransportationForm.controls.transportationMode.value == "Road freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.087"})
      }
      else if(res == "Temp-controlled / Diesel, 5% biodiesel blend" && this.TransportationForm.controls.transportationType.value == "Van - Ambiant" && this.TransportationForm.controls.transportationMode.value == "Road freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.204"})
      }
      else if(res == "Temp-controlled / Diesel, 5% biodiesel blend" && this.TransportationForm.controls.transportationType.value == "Van - Reefer" && this.TransportationForm.controls.transportationMode.value == "Road freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.230"})
      }
      //Sea freight
      else if(res == "Deep Sea Cargo - Reefer" && this.TransportationForm.controls.transportationType.value == "Standard 20 Ft - Reefer" && this.TransportationForm.controls.transportationMode.value == "Sea freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.002"})
      }
      else if(res == "Deep Sea Cargo - Ambiant" && this.TransportationForm.controls.transportationType.value == "Standard 20 ft - Ambiant" && this.TransportationForm.controls.transportationMode.value == "Sea freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.001"})
      }
      else if(res == "Deep Sea Cargo - Reefer" && this.TransportationForm.controls.transportationType.value == "Standard 40 Ft - Reefer" && this.TransportationForm.controls.transportationMode.value == "Sea freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.003"})
      }
      else if(res == "Deep Sea Cargo - Ambiant" && this.TransportationForm.controls.transportationType.value == "Standard 40 ft - Ambiant" && this.TransportationForm.controls.transportationMode.value == "Sea freight"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.002"})
      }
      //Train
      else if(res == "Non Temp-controlled / Diesel" && this.TransportationForm.controls.transportationType.value == "Container train - Ambiant" && this.TransportationForm.controls.transportationMode.value == "Train"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.025"})
      }
      else if(res == "Non Temp-controlled / Diesel" && this.TransportationForm.controls.transportationType.value == "Container train - Reefer" && this.TransportationForm.controls.transportationMode.value == "Train"){
        this.TransportationForm.patchValue({ co2intensityFactorMeasure : "kg CO2e/t-km", co2intensityFactorValue : "0.028"})
      }
    })
    
    
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
    this.transportationData = this.projecthubservice.all[0]
    this.dropdownList = this.projecthubservice.all[1]
    var roadFreight = this.projecthubservice.all[1].filter(x => x.transportationMode == "Road freight")
    for (var j = 0; j < roadFreight.length; j++) {
      this.roadTypeDropDownValues.push(roadFreight[j].transportationType)
    }
    this.roadTypeDropDownValues.sort()
    var airFreight = this.projecthubservice.all[1].filter(x => x.transportationMode == "Air freight")
    console.log(airFreight)
    var uniqueAirTypes = new Set()
    var uniqueFuelTypes3 = new Set()
    for (var j = 0; j < airFreight.length; j++) {
      this.airTypeDropDownValues.push(airFreight[j].transportationType)
      uniqueAirTypes.add(airFreight[j].transportationType)
      uniqueFuelTypes3.add(airFreight[j].fuelType)
    }
    this.airFuelDropDownValues = Array.from(uniqueFuelTypes3)
    this.airTypeDropDownValues = Array.from(uniqueAirTypes)
    this.airTypeDropDownValues.sort()
    this.airFuelDropDownValues.sort()
    var seaFreight = this.projecthubservice.all[1].filter(x => x.transportationMode == "Sea freight")
    for (var j = 0; j < seaFreight.length; j++) {
      this.seaTypeDropDownValues.push(seaFreight[j].transportationType)
    }
    this.seaTypeDropDownValues.sort()
    var parcel = this.projecthubservice.all[1].filter(x => x.transportationMode == "Parcel/ Express")
    var uniqueFuelTypes2 = new Set()
    for (var j = 0; j < parcel.length; j++) {
      this.parcelTypeDropDownValues.push(parcel[j].transportationType)
      uniqueFuelTypes2.add(parcel[j].fuelType)
    }
    this.parcelFuelDropDownValues = Array.from(uniqueFuelTypes2)
    this.parcelTypeDropDownValues.sort()
    this.parcelFuelDropDownValues.sort()
    var trainFreight = this.projecthubservice.all[1].filter(x => x.transportationMode == "Train")
    var uniqueFuelTypes4 = new Set()
    for (var j = 0; j < trainFreight.length; j++) {
      this.trainTypeDropDownValues.push(trainFreight[j].transportationType)
      uniqueFuelTypes4.add(trainFreight[j].fuelType)
    }
    this.trainFuelDropDownValues = Array.from(uniqueFuelTypes4)
    this.trainTypeDropDownValues.sort()
    this.trainFuelDropDownValues.sort()
    var courierFreight = this.projecthubservice.all[1].filter(x => x.transportationMode == "Courier")
    var uniqueFuelTypes = new Set()
    for (var j = 0; j < courierFreight.length; j++) {
      this.courierTypeDropDownValues.push(courierFreight[j].transportationType)
      uniqueFuelTypes.add(courierFreight[j].fuelType)
    }
    this.courierFuelDropDownValues = Array.from(uniqueFuelTypes)
    this.courierTypeDropDownValues.sort()
    this.courierFuelDropDownValues.sort()

    var roadFuel = this.projecthubservice.all[1].filter(x => x.transportationMode == "Road freight" && (x.transportationType == "Ambient (truck load fill rate > 60%)" || x.transportationType == "LTL / RDC - Ambient"
      || x.transportationType == "Partial Load Ambiant (Truck load fill rate <60%)"))
    var uniqueFuelTypes5 = new Set()
    for (var j = 0; j < roadFuel.length; j++) {
      uniqueFuelTypes5.add(roadFuel[j].fuelType)
    }
    this.roadFuelDropDownValues = Array.from(uniqueFuelTypes5)
    this.roadFuelDropDownValues.sort()
    var roadFuel2 = this.projecthubservice.all[1].filter(x => x.transportationMode == "Road freight" && (x.transportationType == "LTL / RDC - Reefer" || x.transportationType == "Partial Load Reefer (Truck load fill rate <60%)"
      || x.transportationType == "Standard - Reefer (if truck load fill rate > 60%)" || x.transportationType == "Van - Ambiant" || x.transportationType == "Van - Reefer"))
    var uniqueFuelTypes6 = new Set()
    for (var j = 0; j < roadFuel2.length; j++) {
      uniqueFuelTypes6.add(roadFuel2[j].fuelType)
    }
    this.roadFuelDropDownValues2 = Array.from(uniqueFuelTypes6)
    this.roadFuelDropDownValues2.sort()

    var seaFuel = this.projecthubservice.all[1].filter(x => x.transportationMode == "Sea freight" && (x.transportationType == "Standard 20 Ft - Reefer" || x.transportationType == "Standard 40 Ft - Reefer"))
    var uniqueFuelTypes7 = new Set()
    for (var j = 0; j < seaFuel.length; j++) {
      uniqueFuelTypes7.add(seaFuel[j].fuelType)
    }
    this.seaFuelDropDownValues = Array.from(uniqueFuelTypes7)
    this.seaFuelDropDownValues.sort()
    var seaFuel2 = this.projecthubservice.all[1].filter(x => x.transportationMode == "Sea freight" && (x.transportationType == "Standard 20 Ft - Ambiant" || x.transportationType == "Standard 40 Ft - Ambiant"))
    var uniqueFuelTypes8 = new Set()
    for (var j = 0; j < seaFuel2.length; j++) {
      uniqueFuelTypes8.add(seaFuel2[j].fuelType)
    }
    this.seaFuelDropDownValues2 = Array.from(uniqueFuelTypes8)
    this.seaFuelDropDownValues2.sort()

    this.TransportationForm.patchValue({

      emenvironmentId: "",
      environmentalSourceTypeId: "1e123779-0e1e-4994-bec3-95924aa0e7e6",
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

  // GetUniqueTransportationModes() {
  //   const uniqueModes = new Set();
  //   if (this.dropdownList) {
  //     this.dropdownList
  //       .filter(x => x.environmentalSourceTypeId === "1e123779-0e1e-4994-bec3-95924aa0e7e6")
  //       .forEach(x => uniqueModes.add(x.transportationMode));
  //   }
  //   return Array.from(uniqueModes);
  // }

  // GetUniqueTransportationTypes() {
  //   const uniqueTypes = new Set();
  //   if (this.dropdownList) {
  //     this.dropdownList
  //       .filter(x => x.environmentalSourceTypeId === "1e123779-0e1e-4994-bec3-95924aa0e7e6")
  //       .forEach(x => uniqueTypes.add(x.transportationType));
  //   }
  //   return Array.from(uniqueTypes);
  // }

  // GetUniqueFuel() {
  //   const uniqueFuel = new Set();
  //   if (this.dropdownList) {
  //     this.dropdownList
  //       .filter(x => x.environmentalSourceTypeId === "1e123779-0e1e-4994-bec3-95924aa0e7e6")
  //       .forEach(x => uniqueFuel.add(x.fuelType));
  //   }
  //   return Array.from(uniqueFuel);
  // }



  submitTransportation() {
    this.projecthubservice.isFormChanged = false
    var formValue = this.TransportationForm.getRawValue()
    formValue.shipmentDistance = isNaN(formValue.shipmentDistance) ? null : formValue.shipmentDistance
    formValue.shipmentFrequency = isNaN(formValue.shipmentFrequency) ? null : formValue.shipmentFrequency
    formValue.shipmentWeight = isNaN(formValue.shipmentWeight) ? null : formValue.shipmentWeight
    if (formValue.transportationMode == "") {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "In order to save the Transportation information it is required to select Mode, Type and Fuel categories!",
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
        "title": "In order to save the Transportation information it is required to select Mode, Type and Fuel categories!",
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
        "title": "In order to save the Transportation information it is required to select Mode, Type and Fuel categories!",
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
      var environmentalSourceId = this.projecthubservice.all[1]
        .filter(x => x.transportationMode == formValue.transportationMode && x.transportationType == formValue.transportationType && x.fuelType == formValue.fuelType)
        .map(obj => obj.environmentalSourceId)[0].toString()

      var mainObj: any = {
        emenvironmentId: '',
        environmentalSourceTypeId: '1e123779-0e1e-4994-bec3-95924aa0e7e6',
        projectId: this.projecthubservice.projectid,
        environmentalSourceId: environmentalSourceId,
        shipmentDistance: formValue.shipmentDistance,
        shipmentWeight: formValue.shipmentWeight,
        shipmentFrequency: formValue.shipmentFrequency,
        affectedLocations: null,
        affectedContainers: null,
        embasisOfEstimate: formValue.embasisOfEstimate
      }
      console.log(mainObj)
      this.apiService.addDistribution(mainObj).then(res => {
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.successSave.next(true)
        this.projecthubservice.toggleDrawerOpen('', '', [], '')
      })
    }
  }
}
