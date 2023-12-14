import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-carbon-bulk-edit',
  templateUrl: './carbon-bulk-edit.component.html',
  styleUrls: ['./carbon-bulk-edit.component.scss'],
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
    if (this.projecthubservice.all[3][0] == false && (this.projecthubservice.all[1].projectData.energyCostImpactPerYear != "" && this.projecthubservice.all[1].projectData.energyCostImpactPerYear != null && this.projecthubservice.all[1].projectData.energyCostImpactPerYear != 0)) {
      this.editCarbonBiogenic = true
    }
    else if (this.projecthubservice.all[3][0] == true && (this.projecthubservice.all[1].projectData.energyCostImpactPerYear == "" || this.projecthubservice.all[1].projectData.energyCostImpactPerYear == null || this.projecthubservice.all[1].projectData.energyCostImpactPerYear == 0)) {
      this.editCarbonBiogenic = true
    }
    else if (this.projecthubservice.all[3][0] == true && (this.projecthubservice.all[1].projectData.energyCostImpactPerYear != "" && this.projecthubservice.all[1].projectData.energyCostImpactPerYear != null && this.projecthubservice.all[1].projectData.energyCostImpactPerYear != 0)) {
      this.editCarbonBiogenic = false
    }
      this.CAPSform.patchValue({
        impactRealizationDate: this.projecthubservice.all[1].projectData.emissionsImpactRealizationDate
      })
      this.ProjectData = this.projecthubservice.all[1].projectData
      this.envPortfolio = this.projecthubservice.all[1].envionmentPortfolio.portfolioOwnerId
    if (this.projecthubservice.all[1].localCurrency == null) {
      this.unitCost = "Unit Cost ()"
    }
    else {
      this.unitCost = "Unit Cost (" + this.projecthubservice.all[1].localCurrency.localCurrencyAbbreviation + ")"
    }
      // this.unitCost = "Unit Cost (" + this.projecthubservice.all[1].localCurrency.localCurrencyAbbreviation + ")"
      this.noCarbon = this.projecthubservice.all[2]
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
          localInputUoM: new FormControl(i.localInputUoM),
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
        unitCost: x.unitCost,
        localInputUoM: x.localInputUoM
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
    if (((this.carbonDb.filter(x => x.emunit != "" && x.emunit != null && x.emunit != 0).length > 0) || (this.projecthubservice.all[4])) && (this.CAPSform.value.impactRealizationDate == "" || this.CAPSform.value.impactRealizationDate == null)) {
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
      if (this.ProjectData.emissionsImpactRealizationDate != this.CAPSform.value.impactRealizationDate) {
        var formValue = this.CAPSform.getRawValue()
        var mainObj = this.ProjectData

        mainObj.emissionsImpactRealizationDate = formValue.impactRealizationDate == null ? null : moment(formValue.impactRealizationDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')

        this.apiService.editCAPSData(this.projecthubservice.projectid, mainObj).then(res => {
        this.apiService.bulkeditCarbon(this.carbonDb, this.projecthubservice.projectid).then(res => {
          this.projecthubservice.isFormChanged = false
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
          this.projecthubservice.isNavChanged.next(true)
          this.projecthubservice.successSave.next(true)
        
      })
        })
      }
      else{
        this.apiService.bulkeditCarbon(this.carbonDb, this.projecthubservice.projectid).then(res => {
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
    this.carbonDb = []
    var formValue = this.carbonForm.getRawValue()
    for (var i of formValue) {
      this.carbonDb.push({
        emdataUniqueId: i.emdataUniqueId == null || i.emdataUniqueId == "" ? "" : i.emdataUniqueId,
        projectId: this.projecthubservice.projectid,
        emsourceId: i.emsourceId,
        emunit: (i.emunit == "" || isNaN(i.emunit)) && i.emunit !== 0 ? null : i.emunit,
        unitCost: (i.unitCost == "" || isNaN(i.unitCost)) && i.unitCost !== 0 ? null : i.unitCost,
        emimpactTonsCo2year: (i.emimpactTonsCo2year == "" || isNaN(i.emimpactTonsCo2year)) && i.emimpactTonsCo2year !== 0 ? null : i.emimpactTonsCo2year,
        embasisOfEstimate : i.embasisOfEstimate,
        emportfolioOwnerId: this.envPortfolio
      })
    }

  }

  getNgxDatatableNumberHeader(): any {
    return ' ngx-number-header';
  }

}
