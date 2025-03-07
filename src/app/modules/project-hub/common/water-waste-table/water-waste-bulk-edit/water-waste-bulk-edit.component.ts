import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';
import moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-water-waste-bulk-edit',
  templateUrl: './water-waste-bulk-edit.component.html',
  styleUrls: ['./water-waste-bulk-edit.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class WaterWasteBulkEditComponent {
  unitCost = ""
  viewContent = false
  waterWasteForm = new FormArray([])
  waterWasteTableEditStack = []
  editable: boolean = false
  projectViewDetails: any = {}
  waterWasteDb = []
  waterwasteFormValue = []
  submitObj = []
  WaterWaste = []
  waterwasteValues: any
  ProjectData: any
  editWaterWaste: boolean = true
  CAPSform = new FormGroup({
    impactRealizationDate: new FormControl('')
  })
  waterWasteDropDrownValues = ["Waste", "Water"]
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

  getData(id) {
    if (this.waterWasteForm.value[id].wwstream == "Water") {
      this.waterWasteForm.value[id].standardUoM = "m3"
      return '1'
    }
    else if (this.waterWasteForm.value[id].wwstream == "Waste") {
      this.waterWasteForm.value[id].standardUoM = "kg"
      return '2'
    }
    else {
      return '0'
    }
  }

  ngOnInit(): void {
    this.dataloader()
  }

  dataloader() {
    if (this.projecthubservice.all[4][1] == true && (this.projecthubservice.all[1].projectData.waterImpactCost != "" && this.projecthubservice.all[1].projectData.waterImpactCost != null && this.projecthubservice.all[1].projectData.waterImpactCost != 0)) {
      this.editWaterWaste = false
    }
    else if (this.projecthubservice.all[4][2] == true && (this.projecthubservice.all[1].projectData.wasteImpactCost != "" && this.projecthubservice.all[1].projectData.wasteImpactCost != null && this.projecthubservice.all[1].projectData.wasteImpactCost != 0)) {
      this.editWaterWaste = false
    }
    this.CAPSform.patchValue({
      impactRealizationDate: this.projecthubservice.all[1].projectData.emissionsImpactRealizationDate
    })
    this.ProjectData = this.projecthubservice.all[1]
    this.WaterWaste = this.projecthubservice.all[0]
    this.WaterWaste = this.sortbyNameandType(this.WaterWaste)
    this.waterwasteValues = this.projecthubservice.all[3]
    console.log(this.WaterWaste)
    console.log(this.waterwasteValues)
    console.log(this.ProjectData)
    var waterValues = this.projecthubservice.all[3].filter(x => x.wwstream == "Water")
    for (var j = 0; j < waterValues.length; j++) {
      this.waterTypeDropDrownValues.push(waterValues[j].wwtype)
    }
    this.waterTypeDropDrownValues.sort()
    var wasteValues = this.projecthubservice.all[3].filter(x => x.wwstream == "Waste")
    for (var j = 0; j < wasteValues.length; j++) {
      this.wasteTypeDropDrownValues.push(wasteValues[j].wwtype)
    }
    this.wasteTypeDropDrownValues.sort()
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
    setTimeout(() => {
      this.viewContent = true
    }, 400);
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
      "message": "Are you sure you want to delete this record?",
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
    this.submitPrep()
    if (this.waterwasteFormValue.filter(x => x.wwstream == "").length > 0) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please select a value in Water/Waste.",
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
    else if (this.waterwasteFormValue.filter(x => x.wwtype == "").length > 0) {
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
    else if (((this.waterWasteDb.filter(x => x.emwwunit != "" && x.emwwunit != null && x.emwwunit != 0).length > 0) || (this.projecthubservice.all[5])) && (this.CAPSform.value.impactRealizationDate == "" || this.CAPSform.value.impactRealizationDate == null)) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Please enter a value for Impact Realization Date.",
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
      console.log(this.waterWasteDb)
      this.projecthubservice.isFormChanged = false
      this.submitPrep()
      if (this.ProjectData.projectData.emissionsImpactRealizationDate != this.CAPSform.value.impactRealizationDate) {
        var formValue = this.CAPSform.getRawValue()
        var mainObj = this.ProjectData.projectData

        mainObj.emissionsImpactRealizationDate = formValue.impactRealizationDate == null ? null : moment(formValue.impactRealizationDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')

        this.apiService.editCAPSData(this.projecthubservice.projectid, mainObj).then(res => {
          this.apiService.bulkeditWW(this.waterWasteDb, this.projecthubservice.projectid).then(res => {
            this.projecthubservice.isFormChanged = false
            this.projecthubservice.isNavChanged.next(true)
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.successSave.next(true)
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
          })
        })
      }
      else {
        this.apiService.bulkeditWW(this.waterWasteDb, this.projecthubservice.projectid).then(res => {
          this.projecthubservice.isFormChanged = false
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
          this.projecthubservice.isNavChanged.next(true)
          this.projecthubservice.successSave.next(true)
        })

      }
    }
  }

  submitPrep() {
    this.waterWasteDb = []
    this.waterwasteFormValue = []
    var formValue = this.waterWasteForm.getRawValue()
    for (var i of formValue) {
      var id = i.wwstream == "" || i.wwtype == "" ? "" : this.waterwasteValues.filter(x => x.wwstream == i.wwstream && x.wwtype == i.wwtype)[0].wwsourceMasterUniqueId;
      this.waterWasteDb.push({
        emdataWwid: i.emdataWwid,
        projectId: this.projecthubservice.projectid,
        wwsourceMasterUniqueId: id,
        emwwunit: i.emwwunit == "" && i.emwwunit !== 0 ? null : i.emwwunit,
        emwwunitCost: i.emwwunitCost == "" && i.emwwunitCost !== 0 ? null : i.emwwunitCost,
        embasisOfEstimate: i.embasisOfEstimate
      })
      this.waterwasteFormValue.push({
        emdataWwid: i.emdataWwid,
        projectId: this.projecthubservice.projectid,
        wwsourceMasterUniqueId: id,
        emwwunit: i.emwwunit,
        emwwunitCost: i.emwwunitCost,
        embasisOfEstimate: i.embasisOfEstimate,
        wwtype: i.wwtype,
        wwstream: i.wwstream
      })
    }

  }

  getNgxDatatableNumberHeader(): any {
    return ' ngx-number-header';
  }
}
