import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-warehousing-bulk-edit',
  templateUrl: './warehousing-bulk-edit.component.html',
  styleUrls: ['./warehousing-bulk-edit.component.scss']
})
export class WarehousingBulkEditComponent {
  environmentalSourceTypeId: any
  unitCost = ""
  viewContent = false
  warehousingForm = new FormArray([])
  warehousingTableEditStack = []
  editable: boolean = false
  projectViewDetails: any = {}
  warehousingDb = []
  warehousingFormValue = []
  submitObj = []
  Warehousing = []
  ProjectData: any
  editWarehousing: boolean = true
  dropdownList: any;

  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService) {
      this.warehousingForm.valueChanges.subscribe((res) => {
        if (this.viewContent) {
          this.changeChecker();
          if (JSON.stringify(this.submitObj) == JSON.stringify(this.warehousingDb)) {
            this.projecthubservice.isFormChanged = false;
          } else {
            this.projecthubservice.isFormChanged = true;
          }
        }
      });

      
      


  }

  ngOnInit(): void {
    this.environmentalSourceTypeId == 'af83f434-2e3d-42fc-b506-f93ce2f74503'
    this.dataloader()
    
  }

  dataloader() {
    this.environmentalSourceTypeId == 'af83f434-2e3d-42fc-b506-f93ce2f74503'
    this.Warehousing = this.projecthubservice.all[0]
    console.log(typeof this.projecthubservice.all[0])
    console.log(this.projecthubservice.all[0])
    console.log(this.projecthubservice.all[1])
    this.dropdownList = this.projecthubservice.all[1]
   if(this.Warehousing)
   {
    for (var i of this.Warehousing) {
      this.warehousingDb.push({
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

      this.warehousingForm.push(new FormGroup({

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
   }

    console.log(this.warehousingForm)
    this.viewContent = true
  }


  addWarehousing() {
    var j = [{}]

    j = [{
        environmentalSourceId: '',
        environmentalSourceTypeId: 'af83f434-2e3d-42fc-b506-f93ce2f74503',
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
        affectedLocations: 0,
        affectedContainers: null,
        embasisOfEstimate: ''
    }]
    this.warehousingForm.push(new FormGroup({
      emenvironmentId: new FormControl(''),
      environmentalSourceTypeId: new FormControl('af83f434-2e3d-42fc-b506-f93ce2f74503'),
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
      affectedLocations: new FormControl(0),
      affectedContainers: new FormControl(null),
      embasisOfEstimate: new FormControl('')
    }))
    if (!this.Warehousing) {
      this.Warehousing = [];
    }
    this.Warehousing = [...this.Warehousing, ...j]
    this.warehousingTableEditStack.push(this.Warehousing.length - 1)
    var div = document.getElementsByClassName('datatable-scroll')[0]
    setTimeout(() => {
      if(div)
    {
      div.scroll({
        top: div.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
      
    }, 100);
  }

  changeChecker() {
    var formValue = this.warehousingForm.getRawValue()
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

  warehousingTableEditRow(row: number) {
    if (this.projecthubservice.roleControllerControl.projectHub.CAPS) {
      if (!this.warehousingTableEditStack.includes(row)) {
        this.warehousingTableEditStack.push(row)
      }
    }
  }

  deleteWarehousing(rowIndex: number) {
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
        this.Warehousing.splice(rowIndex, 1)
        this.warehousingForm.removeAt(rowIndex)
        if (this.warehousingTableEditStack.includes(rowIndex)) {
          this.warehousingTableEditStack.splice(this.warehousingTableEditStack.indexOf(rowIndex), 1)
        }
        this.warehousingTableEditStack = this.warehousingTableEditStack.map(function (value) {
          return value > rowIndex ? value - 1 : value;
        })
        this.Warehousing = [...this.Warehousing]
      }
    }
    )
  }



  submitWarehousing() {
    this.submitPrep()
    if (this.warehousingFormValue.filter(x => x.shipmentWeight == "").length > 0) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please select a value in Shipment Weight.",
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
      console.log(this.warehousingDb)
      this.projecthubservice.isFormChanged = false
      this.environmentalSourceTypeId == 'af83f434-2e3d-42fc-b506-f93ce2f74503'
      this.submitPrep()
      console.log("FINAL OBJECT", this.warehousingDb)
      console.log(this.environmentalSourceTypeId)
      this.apiService.bulkeditD(this.warehousingDb, this.projecthubservice.projectid, 'af83f434-2e3d-42fc-b506-f93ce2f74503').then(res => {

        this.projecthubservice.isFormChanged = false
          this.projecthubservice.isNavChanged.next(true)
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.successSave.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')

      })
    }
  }


submitPrep() {
  this.warehousingDb = [];
  this.warehousingFormValue = [];
  const formValue = this.warehousingForm.getRawValue();
  console.log("FORM VALUE",formValue);
  const allObjects = this.projecthubservice.all[1];
  for (const i of formValue) {
    
    this.warehousingDb.push({
      emenvironmentId: i.emenvironmentId,
      environmentalSourceTypeId: i.environmentalSourceTypeId,
      projectId: this.projecthubservice.projectid,
      shipmentDistance: i.shipmentDistance,
      shipmentWeight: i.shipmentWeight,
      shipmentFrequency: i.shipmentFrequency,
      environmentalSourceId: 'C9268310-E160-4624-B242-42F6745A7B13',
      affectedLocations: i.affectedLocations,
      affectedContainers: i.affectedContainers,
      embasisOfEstimate: i.embasisOfEstimate
    });

    this.warehousingFormValue.push({
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
      environmentalSourceId: 'C9268310-E160-4624-B242-42F6745A7B13',
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
