import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';
import moment from 'moment';
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
  selector: 'app-carbon-bulk-edit',
  templateUrl: './carbon-bulk-edit.component.html',
  styleUrls: ['./carbon-bulk-edit.component.scss']
})
export class CarbonBulkEditComponent {
  today = new Date("2036-03-31");
  viewContent: boolean = false
  carbonForm = new FormArray([])
  carbonTableEditStack = []
  editable: boolean = false
  projectViewDetails: any = {}
  carbonDb = []
  submitObj = []
  unitCost = ""
  Carbon  = []
  envPortfolio: any
  ProjectData: any
  noCarbon: boolean = false
  editCarbonBiogenic: boolean = true
  CAPSform = new FormGroup({
    impactRealizationDate: new FormControl(''),
  })

  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService,
    public fuseAlert: FuseConfirmationService, private _Activatedroute: ActivatedRoute, private router: Router) {
    this.carbonForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.changeChecker()
        if (JSON.stringify(this.submitObj) == JSON.stringify(this.carbonDb)) {
          this.projecthubservice.isFormChanged = false
        }
        else {
          this.projecthubservice.isFormChanged = true
        }
      }
    })

  }

  ngOnInit(): void {
    this.dataloader()
  }

  dataloader() {
    if (this.projecthubservice.all[5][0] == false && (this.projecthubservice.all[2].energyCostImpactPerYear != "" && this.projecthubservice.all[2].energyCostImpactPerYear != null && this.projecthubservice.all[2].energyCostImpactPerYear != 0)) {
      this.editCarbonBiogenic = true
    }
    else if (this.projecthubservice.all[5][0] == true && (this.projecthubservice.all[2].energyCostImpactPerYear == "" || this.projecthubservice.all[2].energyCostImpactPerYear == null || this.projecthubservice.all[2].energyCostImpactPerYear == 0)) {
      this.editCarbonBiogenic = true
    }
    else if (this.projecthubservice.all[5][0]  == true && (this.projecthubservice.all[2].energyCostImpactPerYear != "" && this.projecthubservice.all[2].energyCostImpactPerYear != null && this.projecthubservice.all[2].energyCostImpactPerYear != 0)) {
      this.editCarbonBiogenic = false
    }
      this.CAPSform.patchValue({
        impactRealizationDate: this.projecthubservice.all[2].emissionsImpactRealizationDate
      })
      this.ProjectData = this.projecthubservice.all[2]
      this.envPortfolio = this.projecthubservice.all[4]
      this.unitCost = "Unit Cost (" + this.projecthubservice.all[3] + ")"
      this.noCarbon = this.projecthubservice.all[1]
      this.Carbon = this.projecthubservice.all[0]
      for (var i of this.Carbon) {
        this.carbonDb.push(i)
        this.carbonForm.push(new FormGroup({
          emsourceMasterUniqueId: new FormControl(i.emsourceMasterUniqueId),
          emsourceId: new FormControl(i.emsourceId),
          emsourceName: new FormControl(i.emsourceName),
          standardUoM: new FormControl(i.standardUoM),
          emdataUniqueId: new FormControl(i.emdataUniqueId),
          projectId: new FormControl(this.projecthubservice.projectid),
          emportfolioOwnerId: new FormControl(i.emportfolioOwnerId),
          emunit: new FormControl(i.emunit),
          emimpactTonsCo2year: new FormControl(i.emimpactTonsCo2year),
          embasisOfEstimate: new FormControl(i.embasisOfEstimate),
          unitCost: new FormControl(i.unitCost)
        }))
      }
      this.viewContent = true
  }

  changeChecker() {
    var formValue = this.carbonForm.getRawValue()
    formValue.length > 0 ? this.submitObj = formValue.map(x => {
      return {
        emsourceMasterUniqueId: x.emsourceMasterUniqueId,
        projectId: x.projectId,
        emsourceId: x.emsourceId,
        emsourceName: x.emsourceName,
        standardUoM: x.standardUoM,
        emdataUniqueId: x.emdataUniqueId,
        emportfolioOwnerId: x.emportfolioOwnerId,
        emunit: x.emunit,
        emimpactTonsCo2year: x.emimpactTonsCo2year,
        embasisOfEstimate: x.embasisOfEstimate,
        unitCost: x.unitCost
      }
    }) : this.submitObj = []
  }

  carbonTableEditRow(row: number) {
    if (this.projecthubservice.roleControllerControl.projectHub.CAPS && !this.noCarbon) {
      if (!this.carbonTableEditStack.includes(row)) {
        this.carbonTableEditStack.push(row)
      }
    }
  }

  submitCarbon() {
    this.submitPrep()
    if ((this.carbonDb.filter(x => x.emunit != "" && x.emunit != null && x.emunit != 0).length > 0) && (this.CAPSform.value.impactRealizationDate == "" || this.CAPSform.value.impactRealizationDate == null)) {
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
      console.log(this.carbonDb)
      this.projecthubservice.isFormChanged = false
      this.apiService.bulkeditCarbon(this.carbonDb, this.projecthubservice.projectid).then(res => {
        if (this.ProjectData.emissionsImpactRealizationDate != this.CAPSform.value.impactRealizationDate) {
          var formValue = this.CAPSform.getRawValue()
          var mainObj = this.ProjectData

          mainObj.emissionsImpactRealizationDate = formValue.impactRealizationDate == null ? null : moment(formValue.impactRealizationDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')

          this.apiService.editGeneralInfo(this.projecthubservice.projectid, mainObj).then(res => {
            this.projecthubservice.isFormChanged = false
            this.projecthubservice.isNavChanged.next(true)
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.successSave.next(true)
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
          })
        }
        else {
          this.projecthubservice.isFormChanged = false
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
          this.projecthubservice.isNavChanged.next(true)
          this.projecthubservice.successSave.next(true)
        }
      })
    }
  }

  submitPrep() {
    this.carbonDb = []
    var formValue = this.carbonForm.getRawValue()
    for (var i of formValue) {
      this.carbonDb.push({
        emdataUniqueId: i.emdataUniqueId == null || i.emdataUniqueId == "" ? "" : i.emdataUniqueId,
        projectId: this.projecthubservice.projectid,
        emsourceId: i.emsourceId,
        emunit: i.emunit == "" || isNaN(i.emunit) ? null : i.emunit,
        unitCost: i.unitCost == "" || isNaN(i.unitCost) ? null : i.unitCost,
        emimpactTonsCo2year: i.emimpactTonsCo2year == "" || isNaN(i.emimpactTonsCo2year) ? null : i.emimpactTonsCo2year,
        embasisOfEstimate : i.embasisOfEstimate,
        emportfolioOwnerId: this.envPortfolio
      })
    }

  }

}
