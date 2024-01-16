import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { RoleService } from 'app/core/auth/role.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import moment from 'moment';
import { Constants } from 'app/shared/constants';
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
  selector: 'app-caps-single-edit',
  templateUrl: './caps-single-edit.component.html',
  styleUrls: ['./caps-single-edit.component.scss'],
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
export class CapsSingleEditComponent implements OnInit {
viewType = 'SidePanel'
  formFieldHelpers: any
  filterCriteria : any = {}
  today = new Date("2036-03-31");
  viewContent = false
  showDefault= true
  CAPSdata : any
  energyCost: any
  waterCost: any
  wasteCost: any
  energyLabel: string = ""
  waterLabel:string = ""
  wasteLabel:string = ""
  CAPSform = new FormGroup({
    impactRealizationDate: new FormControl(''),
    EnergyCost: new FormControl(null),
    WaterCost: new FormControl(null),
    WasteCost: new FormControl(null)
  })

  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService, private authService: MsalService, public role: RoleService) {
      this.CAPSform.valueChanges.subscribe(res => {
        if (this.viewContent) {
          this.projectHubService.isFormChanged = true
        }
      })
    }
  ngOnInit(): void {
    this.apiService.getCAPSbyProjectID(this.projectHubService.projectid).then((res: any) => {
      this.apiService.getfilterlist().then(filter => {
        if (res.envionmentPortfolio.portfolioOwnerId == Constants.ENVIRONMENTAL_PORTFOLIO_ID.toString()){
          this.showDefault = false;
        }
        else{
            this.showDefault = true;
        }
        this.filterCriteria = filter
        this.CAPSdata = res
        this.CAPSform.patchValue({
          impactRealizationDate: res.projectData.emissionsImpactRealizationDate,
          EnergyCost: res.projectData.energyCostImpactPerYear,
          WaterCost: res.projectData.waterImpactCost,
          WasteCost: res.projectData.wasteImpactCost
        })
        this.energyCost = res.projectData.energyCostImpactPerYear
        this.waterCost = res.projectData.waterImpactCost
        this.wasteCost = res.projectData.wasteImpactCost

        if (this.projectHubService.all[0] == false || this.CAPSdata.projectData.noCarbonImpact == true){
          this.CAPSform.controls['EnergyCost'].disable()
        }
        if (this.projectHubService.all[1] == false || this.projectHubService.all[2] == false) {
          this.CAPSform.controls['WaterCost'].disable()
          this.CAPSform.controls['WasteCost'].disable()
        }
        this.energyLabel = "Energy Impact per Year (" + this.projectHubService.all[4] + ")"
        this.waterLabel = "Water Impact per Year (" + this.projectHubService.all[4] + ")"
        this.wasteLabel = "Total Waste Impact per Year (" + this.projectHubService.all[4] + ")"
        this.viewContent = true
      })
    })
  }

  getEnviornmentPortfolio(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isEmissionPortfolio == true)
  }
    
  submitCAPS(){
    var formValue = this.CAPSform.getRawValue()
    this.projectHubService.isFormChanged = false
    var formValue = this.CAPSform.getRawValue()
    var mainObj = this.CAPSdata.projectData
    if (this.projectHubService.all[3] && (this.CAPSform.value.impactRealizationDate == "" || this.CAPSform.value.impactRealizationDate == null)) {
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
    else{
      mainObj.emissionsImpactRealizationDate = formValue.impactRealizationDate == null ? null : moment(formValue.impactRealizationDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
      mainObj.energyCostImpactPerYear = formValue.EnergyCost
      mainObj.waterImpactCost = formValue.WaterCost
      mainObj.wasteImpactCost = formValue.WasteCost
      this.apiService.editCAPSData(this.projectHubService.projectid, mainObj).then(res => {
        this.projectHubService.isNavChanged.next(true)
        this.projectHubService.submitbutton.next(true)
        this.projectHubService.successSave.next(true)
        this.projectHubService.toggleDrawerOpen('', '', [], '')
      })
    }
  }
}

