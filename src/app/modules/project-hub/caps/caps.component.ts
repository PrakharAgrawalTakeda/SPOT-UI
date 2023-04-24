import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'app/shared/constants';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';

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
  noCarbonImpact: boolean
  CAPSdata: any
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
  carbonngx: any
  Biogenicsngx: any
  WaterWastengx: any
  WaterWasteParam: any
  DateRequired: boolean = false
  costEdit: any = []
  NoCarbonForm = new FormGroup({
    NoCarbonImpact: new FormControl(false)
  })
  constructor(public fuseAlert: FuseConfirmationService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService, public projectHubService: ProjectHubService) { 
    this.projectHubService.submitbutton.subscribe(res => {
      if (res == true) {
        this.viewContent = false
        this.ngOnInit()
      }
    })
    this.NoCarbonForm.controls.NoCarbonImpact.valueChanges.subscribe(res => {
      if (this.viewContent) {
        console.log(res)
        if (this.CAPSdata.projectData.noCarbonImpact != res){
          if(res == true){
            var comfirmConfig: FuseConfirmationConfig = {
              "title": "Are you sure?",
              "message": "Changing the No Carbon Impact will delete all data from Carbon and Biogenics table. Do you want to proceed ?",
              "icon": {
                "show": true,
                "name": "heroicons_outline:exclamation",
                "color": "warn"
              },
              "actions": {
                "confirm": {
                  "show": true,
                  "label": "Okay",
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
                var mainObj = this.CAPSdata.projectData
                mainObj.NoCarbonImpact = res
                this.apiService.editGeneralInfo(this.id, mainObj).then(res1 => {

                  //carbon data
                  var carbonDb = []
                  var formValue = this.carbonngx
                  for (var i of formValue) {
                    carbonDb.push({
                      emdataUniqueId: i.emdataUniqueId,
                      projectId: i.projectId,
                      emsourceId: i.emsourceId,
                      emunit: null,
                      unitCost: null,
                      emimpactTonsCo2year: i.emimpactTonsCo2year == "" || isNaN(i.emimpactTonsCo2year) ? null : i.emimpactTonsCo2year,
                      embasisOfEstimate: "",
                      emportfolioOwnerId: i.emportfolioOwnerId
                    })
                  }

                  //biogenics data
                    var biogenicsDb = []
                    for (var i of this.Biogenicsngx) {
                      biogenicsDb.push({
                        biogenicDataId: i.biogenicDataId,
                        projectId: i.projectId,
                        biogenicMasterUniqueId: i.biogenicMasterUniqueId,
                        biogenicEmissionFactor: null,
                        biogenicUnit: null,
                        standardUoM: i.standardUoM,
                        biogenicUnitCost: null,
                        biogenicBasisOfEstimate: ""
                      })
                    }
                    this.apiService.bulkeditCarbon(carbonDb, this.id).then(res => {
                      this.apiService.bulkeditBiogenics(biogenicsDb, this.id).then(res => {
                      this.projectHubService.all.push(res)
                      this.projectHubService.submitbutton.next(true)
                      this.projectHubService.successSave.next(true)
                    })
                  })
                // }
                })
              }
            })
          }
          else{
            var mainObj = this.CAPSdata.projectData
            mainObj.NoCarbonImpact = res
              this.apiService.editGeneralInfo(this.id, mainObj).then(res1 => {
              this.projectHubService.all.push(res)
              this.projectHubService.submitbutton.next(true)
              this.projectHubService.successSave.next(true)
            })
          }
        }
    }
    })
  }

  ngOnInit(): void {
    if (this.projectHubService.roleControllerControl.projectHub.CAPS) {
      this.editable = true
    }
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getCAPSbyProjectID(this.id).then((res: any) => {
      this.CAPSdata = res
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

      if (this.showDefault == true){
        //carbon data
        var carbonParam = res.carbonParameters
        var carbonData = res.carbonData
        var carbonngx = []
        if (carbonParam != null && carbonData != null) {
          carbonParam.forEach(function (arrayItem) {
            var data = []
            var param = []
            data = carbonData.filter(x => x.emsourceId == arrayItem.emsourceId)
            param = carbonParam.filter(x => x.emsourceId == arrayItem.emsourceId)
            var carbonObject = {
              ...data[0],
              ...param[0]
            }
            carbonngx.push(carbonObject)
          })
          this.carbonngx = carbonngx
        }
        this.Biogenicsngx = res.biogenicsData
        
        //water waste data
        if (this.editable == false) {
          this.WaterWastengx = null
        }
        else {
          var wwParam = res.waterWasteParameter
          var wwData = res.waterWasteData
          var WaterWastengx = []
          if (wwParam != null && wwData != null) {
            for (var i = 0; i < wwData.length; i++) {
              var data = []
              data = wwParam.filter(x => x.wwsourceMasterUniqueId == wwData[i].wwsourceMasterUniqueId)
              var wwObject = {
                ...data[0],
                ...wwData[i]
              }
              WaterWastengx.push(wwObject)
            }
            this.WaterWastengx = WaterWastengx
          }
        }
        if (((this.carbonngx.filter(x => x.emunit != "" && x.emunit != null && x.emunit != 0).length > 0) || (this.Biogenicsngx.filter(x => x.biogenicUnit != "" && x.biogenicUnit != null && x.biogenicUnit != 0).length > 0) || (this.WaterWastengx.filter(x => x.emwwunit != "" && x.emwwunit != null && x.emwwunit != 0).length > 0))) {
          this.DateRequired = true
        }
        this.costEdit = []
        this.Biogenicsngx.filter(x => x.biogenicUnitCost != "" && x.biogenicUnitCost != null && x.biogenicUnitCost != 0).length > 0 || this.carbonngx.filter(x => x.unitCost != "" && x.unitCost != null && x.unitCost != 0).length > 0 ? this.costEdit.push(false) : this.costEdit.push(true)
        this.WaterWastengx.filter(x => x.wwstream == "Water" && x.emwwunitCost != "" && x.emwwunitCost != null && x.emwwunitCost != 0).length > 0 ? this.costEdit.push(false) : this.costEdit.push(true)
        this.WaterWastengx.filter(x => x.wwstream == "Waste" && x.emwwunitCost != "" && x.emwwunitCost != null && x.emwwunitCost != 0).length > 0 ? this.costEdit.push(false) : this.costEdit.push(true)
        this.costEdit.push(this.DateRequired)
        this.WaterWasteParam = res.waterWasteParameter

        
    }
    else{

      //Transportation, Warehousing, Shipping API call
    }
      this.noCarbonImpact = res.projectData.noCarbonImpact
      this.NoCarbonForm.patchValue({ NoCarbonImpact: res.projectData.noCarbonImpact })
      this.viewContent = true
      this.CAPSform.disable()
    })
  }

}
