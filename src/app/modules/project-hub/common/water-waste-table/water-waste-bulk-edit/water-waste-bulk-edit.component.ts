import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-water-waste-bulk-edit',
  templateUrl: './water-waste-bulk-edit.component.html',
  styleUrls: ['./water-waste-bulk-edit.component.scss']
})
export class WaterWasteBulkEditComponent {
  unitCost = ""
  viewContent = false
  waterWasteForm = new FormArray([])
  waterWasteTableEditStack = []
  editable: boolean = false
  projectViewDetails: any = {}
  waterWasteDb = []
  submitObj = []
  WaterWaste = []
  waterwasteValues: any
  CAPSform = new FormGroup({
    impactRealizationDate: new FormControl('')
  })
  waterWasteDropDrownValues = ["Water", "Waste"]
  typeDropDrownValues = []
  waterTypeDropDrownValues = []
  wasteTypeDropDrownValues = []

  constructor(public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService,
    public auth: AuthService, public fuseAlert: FuseConfirmationService) {
    this.waterWasteForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.changeChecker()
        if (JSON.stringify(this.submitObj) == JSON.stringify(this.waterWasteDb)) {
          this.projecthubservice.isFormChanged = false
        }
        else {
          this.projecthubservice.isFormChanged = true
        }
      }
    })
    this.CAPSform.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projecthubservice.isFormChanged = true
      }
    })
  }

  getData(id){
    console.log(id)
    console.log(this.waterWasteForm)
    if (this.waterWasteForm.value[id].wwstream == "Water"){
      this.waterWasteForm.value[id].standardUoM = "m3"
      return '1'
    }
    else if (this.waterWasteForm.value[id].wwstream == "Waste"){
      this.waterWasteForm.value[id].standardUoM = "kg"
      return '2'
    }
    else{
      return '0'
    }
  }

  ngOnInit(): void {
    this.dataloader()
  }

  dataloader() {
    this.CAPSform.patchValue({
      impactRealizationDate: this.projecthubservice.all[1]
    })
    this.WaterWaste = this.projecthubservice.all[0]
    this.waterwasteValues = this.projecthubservice.all[3]
    var waterValues = this.projecthubservice.all[3].filter(x => x.wwstream == "Water")
    for(var j=0;j<waterValues.length;j++){
      this.waterTypeDropDrownValues.push(waterValues[j].wwtype)
    }
    var wasteValues = this.projecthubservice.all[3].filter(x => x.wwstream == "Waste")
    for (var j = 0; j < wasteValues.length; j++) {
      this.wasteTypeDropDrownValues.push(wasteValues[j].wwtype)
    }
    this.unitCost = "Unit Cost (" + this.projecthubservice.all[2] + ")"
    for (var i of this.WaterWaste) {
      this.waterWasteDb.push(i)
      this.waterWasteForm.push(new FormGroup({
        emdataWwid: new FormControl(i.emdataWwid),
        projectId: new FormControl(this.projecthubservice.projectid),
        wwstream: new FormControl(i.wwstream),
        emwwunit: new FormControl(i.emwwunit),
        emwwunitCost: new FormControl(i.emwwunitCost),
        standardUoM: new FormControl(i.standardUoM),
        embasisOfEstimate: new FormControl(i.embasisOfEstimate),
        wwtype: new FormControl(i.wwtype)
      }))
    }
    this.viewContent = true
  }

  addWaterWaste() {
    var j = [{}]
    j = [{
      emdataWwid: '',
      projectId: '',
      wwstream: '',
      emwwunit: '',
      emwwunitCost: '',
      standardUoM: '',
      embasisOfEstimate: '',
      wwtype: '',
    }]
    this.waterWasteForm.push(new FormGroup({
      emdataWwid: new FormControl(''),
      projectId: new FormControl(this.projecthubservice.projectid),
      wwstream: new FormControl(''),
      emwwunit: new FormControl(''),
      emwwunitCost: new FormControl(''),
      standardUoM: new FormControl(''),
      embasisOfEstimate: new FormControl(''),
      wwtype: new FormControl('')
    }))
    this.WaterWaste = [...this.WaterWaste, ...j]
    this.waterWasteTableEditStack.push(this.WaterWaste.length - 1)
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
    var formValue = this.waterWasteForm.getRawValue()
    formValue.length > 0 ? this.submitObj = formValue.map(x => {
      return {
        emdataWwid: x.emdataWwid,
        projectId: x.projectId,
        wwstream: x.wwstream,
        wwtype: x.wwtype,
        emwwunit: x.emwwunit,
        emwwunitCost: x.emwwunitCost,
        standardUoM: x.standardUoM,
        embasisOfEstimate: x.embasisOfEstimate
      }
    }) : this.submitObj = []
  }

  waterWasteTableEditRow(row: number) {
    if (this.projecthubservice.roleControllerControl.projectHub.CAPS) {
      if (!this.waterWasteTableEditStack.includes(row)) {
        this.waterWasteTableEditStack.push(row)
      }
    }
  }

  deleteWaterWaste(rowIndex: number) {
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
        this.WaterWaste.splice(rowIndex, 1)
        this.waterWasteForm.removeAt(rowIndex)
        if (this.waterWasteTableEditStack.includes(rowIndex)) {
          this.waterWasteTableEditStack.splice(this.waterWasteTableEditStack.indexOf(rowIndex), 1)
        }
        this.waterWasteTableEditStack = this.waterWasteTableEditStack.map(function (value) {
          return value > rowIndex ? value - 1 : value;
        })
        this.WaterWaste = [...this.WaterWaste]
      }
    }
    )
  }

  submitWaterWaste() {

  }
}
