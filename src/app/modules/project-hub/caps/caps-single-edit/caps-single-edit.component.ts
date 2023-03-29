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
  filterCriteria : any = {}
  today = new Date("2036-03-31");
  viewContent = false
  CAPSdata : any
  CAPSform = new FormGroup({
    isCapsProject: new FormControl(false),
    enviornmentalPortfolio: new FormControl(null),
    impactRealizationDate: new FormControl(''),
    EmissionsImpact: new FormControl(''),
    EnergyImpact: new FormControl(''),
    WaterImpact: new FormControl(''),
    TotalWasteImpact: new FormControl(''),
    LandfilledWasteImpact: new FormControl(''),
    EnergyCost: new FormControl(''),
    WaterCost: new FormControl(''),
    WasteCost: new FormControl('')
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
    this.apiService.getproject(this.projectHubService.projectid).then((res: any) => {
      this.apiService.getfilterlist().then(filter => {
        this.filterCriteria = filter
        var emissionPortfolio = this.filterCriteria.portfolioOwner.filter(x => x.portfolioOwnerId == res.emissionPortfolioId)
        this.CAPSdata = res
        this.CAPSform.patchValue({
          isCapsProject: res.isCapsProject,
          enviornmentalPortfolio: emissionPortfolio[0],
          impactRealizationDate: res.emissionsImpactRealizationDate,
          EmissionsImpact: res.calculatedEmissionsImpact,
          EnergyImpact: res.energyImpact,
          WaterImpact: res.waterImpactUnits,
          TotalWasteImpact: res.wasteImpactUnits,
          LandfilledWasteImpact: res.wasteLandfillImpactUnits,
          EnergyCost: res.energyCostImpactPerYear,
          WaterCost: res.waterImpactCost,
          WasteCost: res.wasteImpactCost
        })
        this.viewContent = true
      })
    })
  }

  getEnviornmentPortfolio(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isEmissionPortfolio == true)
    // return "";
  }
    
  submitCAPS(){
    var formValue = this.CAPSform.getRawValue()
    this.projectHubService.isFormChanged = false
    var formValue = this.CAPSform.getRawValue()
    var mainObj = this.CAPSdata
    mainObj.isCapsProject= formValue.isCapsProject
    mainObj.enviornmentalPortfolio = Object.keys(formValue.enviornmentalPortfolio).length > 0 ? formValue.enviornmentalPortfolio.portfolioOwnerId : ''
    mainObj.impactRealizationDate = moment(formValue.impactRealizationDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
    
    // mainObj.EmissionsImpact: formValue.calculatedEmissionsImpact
    // mainObj.EnergyImpact: formValue.energyImpact
    // mainObj.WaterImpact: res.waterImpactUnits
    // mainObj.TotalWasteImpact: res.wasteImpactUnits
    // mainObj.LandfilledWasteImpact: res.wasteLandfillImpactUnits
    // mainObj.EnergyCost: res.energyCostImpactPerYear
    // mainObj.WaterCost: res.waterImpactCost
    // mainObj.WasteCost: res.wasteImpactCost
    this.apiService.editGeneralInfo(this.projectHubService.projectid, mainObj).then(res => {
      this.projectHubService.isNavChanged.next(true)
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }
}

