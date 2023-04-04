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
  showDefault= true
  filterCriteria:any
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
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getproject(this.id).then((res: any) => {
      this.apiService.getfilterlist().then(filter => {
        this.apiService.getGeneralInfoData(this.id).then((response: any) => {
          this.currencyLabel = response.localCurrencyAbbreviation
        this.filterCriteria = filter
        var emissionPortfolio = this.filterCriteria.portfolioOwner.filter(x => x.isEmissionPortfolio == true)
        if (res.emissionPortfolioId == Constants.ENVIRONMENTAL_PORTFOLIO_ID.toString()){
        this.showDefault = false;
      }
      else{
          this.showDefault = true;
      }
        res.emissionPortfolioId = emissionPortfolio.filter(x => x.portfolioOwnerId == res.emissionPortfolioId)[0].portfolioOwner
      this.CAPSform.patchValue({
        isCapsProject: res.isCapsProject,
        enviornmentalPortfolio: res.emissionPortfolioId,
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
        })
      })
    })
    this.editable = true
    this.viewContent = true
    this.CAPSform.disable()
  }

}
