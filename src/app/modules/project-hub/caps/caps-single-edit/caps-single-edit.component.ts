import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { RoleService } from 'app/core/auth/role.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
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
  selector: 'app-caps-single-edit',
  templateUrl: './caps-single-edit.component.html',
  styleUrls: ['./caps-single-edit.component.scss']
})
export class CapsSingleEditComponent implements OnInit {
viewType = 'SidePanel'
  formFieldHelpers: any
  filterCriteria : any = {}
  today = new Date("2036-03-31");
  viewContent = false
  CAPSdata : any
  energyCost: any
  waterCost: any
  wasteCost: any
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

        if (this.projectHubService.all[0] == false){
          this.CAPSform.controls['EnergyCost'].disable()
        }
        if (this.projectHubService.all[1] == false || this.projectHubService.all[2] == false) {
          this.CAPSform.controls['WaterCost'].disable()
          this.CAPSform.controls['WasteCost'].disable()
        }
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
    
    mainObj.emissionsImpactRealizationDate = formValue.impactRealizationDate == null ? null : moment(formValue.impactRealizationDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
    mainObj.energyCostImpactPerYear = formValue.EnergyCost
    mainObj.waterImpactCost = formValue.WaterCost
    mainObj.wasteImpactCost = formValue.WasteCost
    this.apiService.editGeneralInfo(this.projectHubService.projectid, mainObj).then(res => {
      this.projectHubService.isNavChanged.next(true)
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }
}

