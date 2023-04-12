import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'app/shared/constants';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';

@Component({
  selector: 'app-caps',
  templateUrl: './caps.component.html',
  styleUrls: ['./caps.component.scss']
})
export class CapsComponent implements OnInit {
  viewContent = false
  id=""
  editable= false
  editableEnv = true
  showDefault= true
  currencyLabel = ""
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
  constructor(private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService, public projectHubService: ProjectHubService) { 
    this.projectHubService.submitbutton.subscribe(res => {
      if (res == true) {
        this.ngOnInit()
      }
    })
  }

  ngOnInit(): void {
    if (this.projectHubService.roleControllerControl.projectHub.CAPS) {
      this.editable = true
    }
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getCAPSbyProjectID(this.id).then((res: any) => {
      if (res.localCurrency == null){
        this.currencyLabel = ""
      }
      else{
          this.currencyLabel = res.localCurrency.localCurrencyAbbreviation
      }
      if (res.envionmentPortfolio == "" || res.envionmentPortfolio == null) {
        this.editableEnv = false
      }
      if (this.editableEnv == true){
      if (res.envionmentPortfolio.portfolioOwnerId == Constants.ENVIRONMENTAL_PORTFOLIO_ID.toString()){
        this.showDefault = false;
      }
      else{
          this.showDefault = true;
      }
    }
      this.CAPSform.patchValue({
        isCapsProject: res.projectData.isCapsProject,
        enviornmentalPortfolio: res.envionmentPortfolio.portfolioOwner,
        impactRealizationDate: res.projectData.emissionsImpactRealizationDate,
        EmissionsImpact: res.projectData.calculatedEmissionsImpact,
        EnergyImpact: res.projectData.energyImpact,
        WaterImpact: res.projectData.waterImpactUnits,
        TotalWasteImpact: res.projectData.wasteImpactUnits,
        LandfilledWasteImpact: res.projectData.wasteLandfillImpactUnits,
        EnergyCost: res.projectData.energyCostImpactPerYear,
        WaterCost: res.projectData.waterImpactCost,
        WasteCost: res.projectData.wasteImpactCost
      })
    })
    this.viewContent = true
    this.CAPSform.disable()
  }

}
