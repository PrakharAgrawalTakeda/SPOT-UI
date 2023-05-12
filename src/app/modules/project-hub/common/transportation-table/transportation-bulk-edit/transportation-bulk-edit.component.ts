import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';
import { AuthService } from 'app/core/auth/auth.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transportation-bulk-edit',
  templateUrl: './transportation-bulk-edit.component.html',
  styleUrls: ['./transportation-bulk-edit.component.scss']
})
export class TransportationBulkEditComponent {

  environmentalSourceTypeId: any
  unitCost = ""
  viewContent = false
  transportationForm = new FormArray([])
  transportationTableEditStack = []
  editable: boolean = false
  projectViewDetails: any = {}
  transportationDb = []
  transportationFormValue = []
  submitObj = []
  Transportation = []
  waterwasteValues: any
  ProjectData: any
  editTransportation: boolean = true
  modeDropDownValues = ["Air freight", "Courier", "Parcel/ Express", "Road freight", "Sea freight", "Train"]
  typeDropDrownValues = []
  fuelDropDrownValues = []
  uomDropDrownValues = []
  airTypeDropDownValues = []
  roadTypeDropDownValues = []
  courierTypeDropDownValues = []
  parcelTypeDropDownValues = []
  seaTypeDropDownValues = []
  trainTypeDropDownValues = []
  roadFuelDropDownValues = []
  roadFuelDropDownValues2 = []
  airFuelDropDownValues = []
  courierFuelDropDownValues = []
  parcelFuelDropDownValues = []
  seaFuelDropDownValues = []
  seaFuelDropDownValues2 = []
  trainFuelDropDownValues = []
  airDropDownValues1 = []
  airDropDownValues2 = []
  airDropDownValues3 = []
  airDropDownValues4 = []
  airDropDownValues5 = []
  airDropDownValues6 = []
  courierFuelDropDownValues1 = []
  courierFuelDropDownValues2 = []
  courierFuelDropDownValues3 = []
  courierFuelDropDownValues4 = []
  parcelFuelDropDownValues1 = []
  parcelFuelDropDownValues2 = []
  parcelFuelDropDownValues3 = []
  parcelFuelDropDownValues4 = []
  roadFuelDropDownValues1 = []
  roadFuelDropDownValuesb = []
  roadFuelDropDownValues3 = []
  roadFuelDropDownValues4 = []
  roadFuelDropDownValues5 = []
  roadFuelDropDownValues6 = []
  roadFuelDropDownValues7 = []
  roadFuelDropDownValues8 = []
  seaFuelDropDownValues1 = []
  seaFuelDropDownValuesb = []
  seaFuelDropDownValues3 = []
  seaFuelDropDownValues4 = []
  trainFuelDropDownValues1 = []
  trainFuelDropDownValues2 = []
  dropdownList: any;



  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService) {
    this.transportationForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.changeChecker()
        if (JSON.stringify(this.submitObj) == JSON.stringify(this.transportationDb)) {
          this.projecthubservice.isFormChanged = false
        }
        else {
          this.projecthubservice.isFormChanged = true
        }
      }
    })

  }

  getData(id){
    if(this.transportationForm.value[id].fuelType == "Standard" && this.transportationForm.value[id].transportationType == "Short haul (< 1000 km)" && this.transportationForm.value[id].transportationMode == "Air freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.920"
      return 'air1'
    }
    else if(this.transportationForm.value[id].fuelType == "Standard" && this.transportationForm.value[id].transportationType == "Medium haul (1000–3700 km)" && this.transportationForm.value[id].transportationMode == "Air freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.690"
      return 'air2'
    }
    else if(this.transportationForm.value[id].fuelType == "Standard" && this.transportationForm.value[id].transportationType == "Long haul (> 3700 km)" && this.transportationForm.value[id].transportationMode == "Air freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.680"
      return 'air3'
    }
    else if(this.transportationForm.value[id].fuelType == "SAF" && this.transportationForm.value[id].transportationType == "Short haul (< 1000 km)" && this.transportationForm.value[id].transportationMode == "Air freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.184"
      return 'air4'
    }
    else if(this.transportationForm.value[id].fuelType == "SAF" && this.transportationForm.value[id].transportationType == "Medium haul (1000–3700 km)" && this.transportationForm.value[id].transportationMode == "Air freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.138"
      return 'air5'
    }
    else if(this.transportationForm.value[id].fuelType == "SAF" && this.transportationForm.value[id].transportationType == "Long haul (> 3700 km)" && this.transportationForm.value[id].transportationMode == "Air freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.136"
      return 'air6'
    }
    //Courier
    else if(this.transportationForm.value[id].fuelType == "Standard" && this.transportationForm.value[id].transportationType == "Standard" && this.transportationForm.value[id].transportationMode == "Courier"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.708"
      return 'courier1'
    }
    else if(this.transportationForm.value[id].fuelType == "Standard" && this.transportationForm.value[id].transportationType == "Short haul (< 1000 km)" && this.transportationForm.value[id].transportationMode == "Courier"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.892"
      return 'courier2'
    }
    else if(this.transportationForm.value[id].fuelType == "Standard" && this.transportationForm.value[id].transportationType == "Medium haul (1000–3700 km)" && this.transportationForm.value[id].transportationMode == "Courier"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.708"
      return 'courier3'
    }
    else if(this.transportationForm.value[id].fuelType == "Standard" && this.transportationForm.value[id].transportationType == "Long haul (> 3700 km)" && this.transportationForm.value[id].transportationMode == "Courier"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.700"
      return 'courier4'
    }
    //Parcel/Express
    else if(this.transportationForm.value[id].fuelType == "Standard" && this.transportationForm.value[id].transportationType == "Standard" && this.transportationForm.value[id].transportationMode == "Parcel/ Express"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.708"
      return 'parcel1'
    }
    else if(this.transportationForm.value[id].fuelType == "Standard" && this.transportationForm.value[id].transportationType == "Short haul (< 1000 km)" && this.transportationForm.value[id].transportationMode == "Parcel/ Express"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.892"
      return 'parcel2'
    }
    else if(this.transportationForm.value[id].fuelType == "Standard" && this.transportationForm.value[id].transportationType == "Medium haul (1000–3700 km)" && this.transportationForm.value[id].transportationMode == "Parcel/ Express"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.708"
      return 'parcel3'
    }
    else if(this.transportationForm.value[id].fuelType == "Standard" && this.transportationForm.value[id].transportationType == "Long haul (> 3700 km)" && this.transportationForm.value[id].transportationMode == "Parcel/ Express"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.700"
      return 'parcel4'
    }
    //Road freight
    else if(this.transportationForm.value[id].fuelType == "Non Temp-controlled / Diesel, 5% biodiesel blend" && this.transportationForm.value[id].transportationType == "Ambient (truck load fill rate > 60%)" && this.transportationForm.value[id].transportationMode == "Road freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.078"
      return 'road1'
    }
    else if(this.transportationForm.value[id].fuelType == "Non Temp-controlled / Diesel, 5% biodiesel blend" && this.transportationForm.value[id].transportationType == "LTL / RDC - Ambient" && this.transportationForm.value[id].transportationMode == "Road freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.063"
      return 'road2'
    }
    else if(this.transportationForm.value[id].fuelType == "Temp-controlled / Diesel, 5% biodiesel blend" && this.transportationForm.value[id].transportationType == "LTL / RDC - Reefer" && this.transportationForm.value[id].transportationMode == "Road freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.071"
      return 'road3'
    }
    else if(this.transportationForm.value[id].fuelType == "Non Temp-controlled / Diesel, 5% biodiesel blend" && this.transportationForm.value[id].transportationType == "Partial Load Ambiant (Truck load fill rate <60%)" && this.transportationForm.value[id].transportationMode == "Road freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.137"
      return 'road4'
    }
    else if(this.transportationForm.value[id].fuelType == "Temp-controlled / Diesel, 5% biodiesel blend" && this.transportationForm.value[id].transportationType == "Partial Load Reefer (Truck load fill rate <60%)" && this.transportationForm.value[id].transportationMode == "Road freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.154"
      return 'road5'
    }
    else if(this.transportationForm.value[id].fuelType == "Temp-controlled / Diesel, 5% biodiesel blend" && this.transportationForm.value[id].transportationType == "Standard - Reefer (if truck load fill rate > 60%)" && this.transportationForm.value[id].transportationMode == "Road freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.087"
      return 'road6'
    }
    else if(this.transportationForm.value[id].fuelType == "Temp-controlled / Diesel, 5% biodiesel blend" && this.transportationForm.value[id].transportationType == "Van - Ambiant" && this.transportationForm.value[id].transportationMode == "Road freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.204"
      return 'road7'
    }
    else if(this.transportationForm.value[id].fuelType == "Temp-controlled / Diesel, 5% biodiesel blend" && this.transportationForm.value[id].transportationType == "Van - Reefer" && this.transportationForm.value[id].transportationMode == "Road freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.230"
      return 'road8'
    }
    //Sea freight
    else if(this.transportationForm.value[id].fuelType == "Deep Sea Cargo - Reefer" && this.transportationForm.value[id].transportationType == "Standard 20 Ft - Reefer" && this.transportationForm.value[id].transportationMode == "Sea freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.002"
      return 'sea1'
    }
    else if(this.transportationForm.value[id].fuelType == "Deep Sea Cargo - Ambiant" && this.transportationForm.value[id].transportationType == "Standard 20 ft - Ambiant" && this.transportationForm.value[id].transportationMode == "Sea freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.001"
      return 'sea2'
    }
    else if(this.transportationForm.value[id].fuelType == "Deep Sea Cargo - Reefer" && this.transportationForm.value[id].transportationType == "Standard 40 Ft - Reefer" && this.transportationForm.value[id].transportationMode == "Sea freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.003"
      return 'sea3'
    }
    else if(this.transportationForm.value[id].fuelType == "Deep Sea Cargo - Ambiant" && this.transportationForm.value[id].transportationType == "Standard 40 ft - Ambiant" && this.transportationForm.value[id].transportationMode == "Sea freight"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.002"
      return 'sea4'
    }
    //Train
    else if(this.transportationForm.value[id].fuelType == "Non Temp-controlled / Diesel" && this.transportationForm.value[id].transportationType == "Container train - Ambiant" && this.transportationForm.value[id].transportationMode == "Train"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.025"
      return 'train1'
    }
    else if(this.transportationForm.value[id].fuelType == "Non Temp-controlled / Diesel" && this.transportationForm.value[id].transportationType == "Container train - Reefer" && this.transportationForm.value[id].transportationMode == "Train"){
      this.transportationForm.value[id].co2intensityFactorValue = "0.028"
      return 'train2'
    }
    else{
      return '0'
    }
  }

  ngOnInit(): void {
    this.environmentalSourceTypeId == '1e123779-0e1e-4994-bec3-95924aa0e7e6'
    this.dataloader()
    
  }

  dataloader() {
    this.environmentalSourceTypeId == '1e123779-0e1e-4994-bec3-95924aa0e7e6'
    this.Transportation = this.projecthubservice.all[0]
    console.log(this.projecthubservice.all[0])
    console.log(this.projecthubservice.all[1])
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
    console.log(this.parcelTypeDropDownValues)
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
    for (var i of this.Transportation) {
      this.transportationDb.push(i)
      this.transportationForm.push(new FormGroup({

        emenvironmentId: new FormControl(i.emenvironmentId),
        environmentalSourceTypeId: new FormControl(i.environmentalSourceTypeId),
        projectId: new FormControl(this.projecthubservice.projectid),
        transportationMode: new FormControl(i.transportationMode),
        transportationType: new FormControl(i.transportationType),
        fuelType: new FormControl(i.fuelType),
        co2intensityFactorValue: new FormControl(i.co2intensityFactorValue),
        co2intensityFactorMeasure: new FormControl(i.co2intensityFactorMeasure),
        shipmentDistance: new FormControl(i.shipmentDistance),
        shipmentWeight: new FormControl(i.shipmentWeight),
        shipmentFrequency: new FormControl(i.shipmentFrequency),
        shippingSolutionSupplier: new FormControl(i.shippingSolutionSupplier),
        solutionName: new FormControl(i.solutionName),
        environmentalSourceId: new FormControl(i.environmentalSourceId),
        affectedLocations: new FormControl(i.affectedLocations),
        affectedContainers: new FormControl(i.affectedContainers),
        embasisOfEstimate: new FormControl(i.embasisOfEstimate)
      }))
    }
    console.log(this.transportationForm)
    this.viewContent = true
  }

  sortbyNameandType(array: any): any {
    return array.length > 1 ? array.sort((a, b) => {
      if (a.wwstream === "") {
        return -1;
      }
      if (b.wwstream == "") {
        return 1;
      }
      if (a.wwstream === b.wwstream) {
        return a.wwtype < b.wwtype ? -1 : (a.wwtype > b.wwtype) ? 1 : 0;
      } else {
        return a.wwstream < b.wwstream ? -1 : 1;
      }
    }) : array
  }


  addTransportation() {
    var j = [{}]

    j = [{
        environmentalSourceId: '',
        environmentalSourceTypeId: '1e123779-0e1e-4994-bec3-95924aa0e7e6',
        transportationMode:'',
        transportationType: '',
        fuelType: '',
        co2intensityFactorValue: '',
        co2intensityFactorMeasure: '',
        shippingSolutionSupplier: '',
        solutionName: '',
        emenvironmentId: '',
        projectId: '',
        shipmentDistance: 0,
        shipmentWeight: 0,
        shipmentFrequency: 0,
        affectedLocations: null,
        affectedContainers: null,
        embasisOfEstimate: ''
    }]
    this.transportationForm.push(new FormGroup({
      emenvironmentId: new FormControl(''),
      environmentalSourceTypeId: new FormControl('1e123779-0e1e-4994-bec3-95924aa0e7e6'),
      projectId: new FormControl(this.projecthubservice.projectid),
      transportationMode: new FormControl(''),
      transportationType: new FormControl(''),
      fuelType: new FormControl(''),
      co2intensityFactorValue: new FormControl(''),
      co2intensityFactorMeasure: new FormControl(''),
      shipmentDistance: new FormControl(0),
      shipmentWeight: new FormControl(0),
      shipmentFrequency: new FormControl(0),
        shippingSolutionSupplier: new FormControl(''),
        solutionName: new FormControl(''),
environmentalSourceId: new FormControl(''),
      affectedLocations: new FormControl(null),
      affectedContainers: new FormControl(null),
      embasisOfEstimate: new FormControl('')
    }))
    this.Transportation = [...this.Transportation, ...j]
    this.transportationTableEditStack.push(this.Transportation.length - 1)
    var div = document.getElementsByClassName('datatable-scroll')[0]
    setTimeout(() => {
      div.scroll({
        top: div.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  }

  changeChecker() {
    var formValue = this.transportationForm.getRawValue()
    formValue.length > 0 ? this.submitObj = formValue.map(x => {
      return {
        environmentalSourceId: x.environmentalSourceId,
        environmentalSourceTypeId: x.environmentalSourceTypeId,
        transportationMode:x.transportationMode,
        transportationType: x.transportationType,
        fuelType: x.fuelType,
        co2intensityFactorValue: x.co2intensityFactorValue,
        co2intensityFactorMeasure: x.co2intensityFactorMeasure,
        shippingSolutionSupplier: x.shippingSolutionSupplier,
        solutionName: x.solutionName,
        emenvironmentId: x.emenvironmentId,
        projectId: x.projectId,
        shipmentDistance: x.shipmentDistance,
        shipmentWeight: x.shipmentWeight,
        shipmentFrequency: x.shipmentFrequency,
        affectedLocations: x.affectedLocations,
        affectedContainers: x.affectedContainers,
        embasisOfEstimate: x.embasisOfEstimate
      }
    }) : this.submitObj = []
  }

  transportationTableEditRow(row: number) {
    if (this.projecthubservice.roleControllerControl.projectHub.CAPS) {
      if (!this.transportationTableEditStack.includes(row)) {
        this.transportationTableEditStack.push(row)
      }
    }
  }

  deleteTransportation(rowIndex: number) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Are you sure?",
      "message": "Are you sure you want Delete this Record?",
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
    const alert = this.fuseAlert.open(comfirmConfig)
    alert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.Transportation.splice(rowIndex, 1)
        this.transportationForm.removeAt(rowIndex)
        if (this.transportationTableEditStack.includes(rowIndex)) {
          this.transportationTableEditStack.splice(this.transportationTableEditStack.indexOf(rowIndex), 1)
        }
        this.transportationTableEditStack = this.transportationTableEditStack.map(function (value) {
          return value > rowIndex ? value - 1 : value;
        })
        this.Transportation = [...this.Transportation]
      }
    }
    )
  }



  submitTransportation() {
    this.submitPrep()
    if (this.transportationFormValue.filter(x => x.transportationMode == "").length > 0) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please select a value in Mode.",
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
    else if (this.transportationFormValue.filter(x => x.transportationType == "").length > 0) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please select a Type.",
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
    else if (this.transportationFormValue.filter(x => x.fuelType == "").length > 0) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please select a Fuel Type.",
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
      console.log(this.transportationDb)
      this.projecthubservice.isFormChanged = false
      this.environmentalSourceTypeId == '1e123779-0e1e-4994-bec3-95924aa0e7e6'
      this.submitPrep()
      console.log("FINAL OBJECT", this.transportationDb)
      console.log(this.environmentalSourceTypeId)
      this.apiService.bulkeditD(this.transportationDb, this.projecthubservice.projectid, '1e123779-0e1e-4994-bec3-95924aa0e7e6').then(res => {

        this.projecthubservice.isFormChanged = false
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.toggleDrawerOpen('', '', [], '')
        this.projecthubservice.isNavChanged.next(true)
        this.projecthubservice.successSave.next(true)

      })
    }
  }

getEnvironmentalSourceIds(i, allObjects) {
  const filteredObjects = allObjects.filter(obj => 
    obj.transportationMode === i.transportationMode &&
    obj.transportationType === i.transportationType &&
    obj.fuelType === i.fuelType
  );
  return filteredObjects.length > 0 ? filteredObjects[0].environmentalSourceId : null;
}

submitPrep() {
  this.transportationDb = [];
  this.transportationFormValue = [];
  const formValue = this.transportationForm.getRawValue();
  console.log("FORM VALUE",formValue);
  const allObjects = this.projecthubservice.all[1];
  for (const i of formValue) {
    const environmentalSourceId = this.getEnvironmentalSourceIds(i, allObjects);
    
    this.transportationDb.push({
      emenvironmentId: i.emenvironmentId,
      environmentalSourceTypeId: i.environmentalSourceTypeId,
      projectId: this.projecthubservice.projectid,
      shipmentDistance: i.shipmentDistance,
      shipmentWeight: i.shipmentWeight,
      shipmentFrequency: i.shipmentFrequency,
      environmentalSourceId: environmentalSourceId,
      affectedLocations: i.affectedLocations,
      affectedContainers: i.affectedContainers,
      embasisOfEstimate: i.embasisOfEstimate
    });

    this.transportationFormValue.push({
      emenvironmentId: i.emenvironmentId,
      environmentalSourceTypeId: i.environmentalSourceTypeId,
      projectId: this.projecthubservice.projectid,
      transportationMode: i.transportationMode,
      transportationType: i.transportationType,
      fuelType: i.fuelType,
      co2intensityFactorValue: i.co2intensityFactorValue,
      co2intensityFactorMeasure: i.co2intensityFactorMeasure,
      shipmentDistance: i.shipmentDistance,
      shipmentWeight: i.shipmentWeight,
      shipmentFrequency: i.shipmentFrequency,
      shippingSolutionSupplier: i.shippingSolutionSupplier,
      solutionName: i.solutionName,
      environmentalSourceId: environmentalSourceId,
      affectedLocations: i.affectedLocations,
      affectedContainers: i.affectedContainers,
      embasisOfEstimate: i.embasisOfEstimate
    });
  }
}

  
  getNgxDatatableNumberHeader(): any {
    return ' ngx-number-header';
  }
}
