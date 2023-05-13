import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-shipping-bulk-edit',
  templateUrl: './shipping-bulk-edit.component.html',
  styleUrls: ['./shipping-bulk-edit.component.scss']
})
export class ShippingBulkEditComponent {
  environmentalSourceTypeId: any
  unitCost = ""
  viewContent = false
  shippingForm = new FormArray([])
  shippingTableEditStack = []
  editable: boolean = false
  projectViewDetails: any = {}
  shippingDb = []
  shippingFormValue = []
  submitObj = []
  Shipping = []
  ProjectData: any
  editShipping: boolean = true
  supplierDropDownValues = ["Csafe", "Envirotainer", "Standard", "VaQTech"]
  dropdownList: any;
  csafeDropDownValues = []
  envirotainerDropDownValues = []
  standardDropDownValues = []
  vaqtechDropDownValues = []
  solutionDropDownValues = []



  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService) {
    this.shippingForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.changeChecker()
        if (JSON.stringify(this.submitObj) == JSON.stringify(this.shippingDb)) {
          this.projecthubservice.isFormChanged = false
        }
        else {
          this.projecthubservice.isFormChanged = true
        }
      }
    })

  }

  getData(id){
    if(this.shippingForm.value[id].solutionName == "Csafe RKN"){
      this.shippingForm.value[id].co2intensityFactorValue = "3.240"
      return '1'
    }
    else if(this.shippingForm.value[id].solutionName == "Envirotainer e2" || this.shippingForm.value[id].solutionName == "Envirotainer e1"){
      this.shippingForm.value[id].co2intensityFactorValue = "3.130"
      return '2'
    }
    else if(this.shippingForm.value[id].solutionName == "Standard"){
      this.shippingForm.value[id].co2intensityFactorValue = "3.275"
      return '3'
    }
    else if(this.shippingForm.value[id].solutionName == "VaQTainer XLx"){
      this.shippingForm.value[id].co2intensityFactorValue = "3.600"
      return '4'
    }
    else{
      return '0'
    }
  }

  ngOnInit(): void {
    this.environmentalSourceTypeId == '0d69c0c1-ce34-4419-8555-32183d301d15'
    this.dataloader()
    
  }

  dataloader() {
    this.environmentalSourceTypeId == '0d69c0c1-ce34-4419-8555-32183d301d15'
    this.Shipping = this.projecthubservice.all[0]
    console.log(this.projecthubservice.all[0])
    console.log(this.projecthubservice.all[1])
    this.dropdownList = this.projecthubservice.all[1]
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

    for (var i of this.Shipping) {
      this.shippingDb.push({
        emenvironmentId: i.emenvironmentId,
        environmentalSourceTypeId: i.environmentalSourceTypeId,
        projectId: this.projecthubservice.projectid,
        shipmentDistance: i.shipmentDistance,
        shipmentWeight: i.shipmentWeight,
        shipmentFrequency: i.shipmentFrequency,
        environmentalSourceId: i.environmentalSourceId,
        affectedLocations: i.affectedLocations,
        affectedContainers: i.affectedContainers,
        embasisOfEstimate: i.embasisOfEstimate
      })

      this.shippingForm.push(new FormGroup({

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
    console.log(this.shippingForm)
    this.viewContent = true
  }


  addShipping() {
    var j = [{}]

    j = [{
        environmentalSourceId: '',
        environmentalSourceTypeId: '0d69c0c1-ce34-4419-8555-32183d301d15',
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
        affectedContainers: 0,
        embasisOfEstimate: ''
    }]
    this.shippingForm.push(new FormGroup({
      emenvironmentId: new FormControl(''),
      environmentalSourceTypeId: new FormControl('0d69c0c1-ce34-4419-8555-32183d301d15'),
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
      affectedContainers: new FormControl(0),
      embasisOfEstimate: new FormControl('')
    }))
    this.Shipping = [...this.Shipping, ...j]
    this.shippingTableEditStack.push(this.Shipping.length - 1)
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
    var formValue = this.shippingForm.getRawValue()
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

  shippingTableEditRow(row: number) {
    if (this.projecthubservice.roleControllerControl.projectHub.CAPS) {
      if (!this.shippingTableEditStack.includes(row)) {
        this.shippingTableEditStack.push(row)
      }
    }
  }

  deleteShipping(rowIndex: number) {
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
        this.Shipping.splice(rowIndex, 1)
        this.shippingForm.removeAt(rowIndex)
        if (this.shippingTableEditStack.includes(rowIndex)) {
          this.shippingTableEditStack.splice(this.shippingTableEditStack.indexOf(rowIndex), 1)
        }
        this.shippingTableEditStack = this.shippingTableEditStack.map(function (value) {
          return value > rowIndex ? value - 1 : value;
        })
        this.Shipping = [...this.Shipping]
      }
    }
    )
  }



  submitShipping() {
    this.submitPrep()
    if (this.shippingFormValue.filter(x => x.shippingSolutionSupplier == "").length > 0) {
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
    }
    else if (this.shippingFormValue.filter(x => x.solutionName == "").length > 0) {
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
    }
    else {
      console.log(this.shippingDb)
      this.projecthubservice.isFormChanged = false
      this.environmentalSourceTypeId == '0d69c0c1-ce34-4419-8555-32183d301d15'
      this.submitPrep()
      console.log("FINAL OBJECT", this.shippingDb)
      console.log(this.environmentalSourceTypeId)
      this.apiService.bulkeditD(this.shippingDb, this.projecthubservice.projectid, '0d69c0c1-ce34-4419-8555-32183d301d15').then(res => {

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
    obj.shippingSolutionSupplier === i.shippingSolutionSupplier &&
    obj.solutionName === i.solutionName
  );
  return filteredObjects.length > 0 ? filteredObjects[0].environmentalSourceId : null;
}

submitPrep() {
  this.shippingDb = [];
  this.shippingFormValue = [];
  const formValue = this.shippingForm.getRawValue();
  console.log("FORM VALUE",formValue);
  const allObjects = this.projecthubservice.all[1];
  for (const i of formValue) {
    const environmentalSourceId = this.getEnvironmentalSourceIds(i, allObjects);
    
    this.shippingDb.push({
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

    this.shippingFormValue.push({
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
