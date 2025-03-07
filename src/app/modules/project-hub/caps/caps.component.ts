import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'app/shared/constants';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { toLower } from 'lodash';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-caps',
  templateUrl: './caps.component.html',
  styleUrls: ['./caps.component.scss']
})
export class CapsComponent implements OnInit, OnDestroy {
  @Input() callLocation: 'Normal' | 'Project-Charter' | 'Business-Case' = 'Normal'
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
  carbonngx: any = []
  Biogenicsngx: any = []
  Transportationngx: any
  Warehousingngx: any
  Shippingngx: any
  WaterWastengx: any = []
  WaterWasteParam: any
  DateRequired: boolean = false
  carbonUnitData: boolean = false
  biogenicUnitData: boolean = false
  wwUnitData: boolean = false
  costEdit: any = []
  NoCarbonForm = new FormGroup({
    NoCarbonImpact: new FormControl(false)
  })
  gdlList: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private router: Router, public fuseAlert: FuseConfirmationService, private _Activatedroute: ActivatedRoute, private apiService: ProjectApiService, public projectHubService: ProjectHubService) { 
    this.projectHubService.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
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
                mainObj.energyCostImpactPerYear = null
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
              else{
                this.NoCarbonForm.patchValue({ NoCarbonImpact: false })
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
    console.log(this.editable)
    if(this.callLocation == 'Business-Case'){
      this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id")
    }
    else{
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    }
    this.apiService.getCAPSbyProjectID(this.id).then((res: any) => {

      console.log(res)
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
      else{
        this.editableEnv = true
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
        enviornmentalPortfolio: res.envionmentPortfolio == null || res.envionmentPortfolio == "" ? "" : res.envionmentPortfolio.portfolioOwner,
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
        var carbonCurrency = res.carbonPortfolioData
        var carbonngx = []
        if (carbonParam != null && carbonData != null) {
          carbonParam.forEach(function (arrayItem) {
            var data = []
            var param = []
            var currency = []
            data = carbonData.filter(x => toLower(x.emsourceId) == toLower(arrayItem.emsourceId))
            param = carbonParam.filter(x => toLower(x.emsourceId) == toLower(arrayItem.emsourceId))
            currency = carbonCurrency.filter(x => toLower(x.emsourceId) == toLower(arrayItem.emsourceId))
            var carbonObject = {
              ...data[0],
              ...param[0],
              ...currency[0]
            }
            carbonngx.push(carbonObject)
          })
          this.carbonngx = carbonngx
          console.log(this.carbonngx)
        }
        this.Biogenicsngx = res.biogenicsData
        
        //water waste data
        // if (this.editable == false) {
        //   this.WaterWastengx = null
        // }
        // else {
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
        // }
        this.carbonUnitData = false
        this.biogenicUnitData = false
        this.wwUnitData = false
        this.DateRequired = false
        if ((this.carbonngx.filter(x => x.emunit != "" && x.emunit != null && x.emunit != 0).length > 0)){
          this.carbonUnitData = true
        }
        if ((this.Biogenicsngx.filter(x => x.biogenicUnit != "" && x.biogenicUnit != null && x.biogenicUnit != 0).length > 0)) {
          this.biogenicUnitData = true
        }
        if ((this.WaterWastengx.filter(x => x.emwwunit != "" && x.emwwunit != null && x.emwwunit != 0).length > 0)) {
          this.wwUnitData = true
        }
        if (this.carbonUnitData || this.biogenicUnitData || this.wwUnitData){
          this.DateRequired = true
        }
        this.costEdit = []
        this.Biogenicsngx.filter(x => x.biogenicUnitCost != "" && x.biogenicUnitCost != null && x.biogenicUnitCost != 0).length > 0 || this.carbonngx.filter(x => x.unitCost != "" && x.unitCost != null && x.unitCost != 0).length > 0 ? this.costEdit.push(false) : this.costEdit.push(true)
        this.WaterWastengx.filter(x => x.wwstream == "Water" && x.emwwunitCost != "" && x.emwwunitCost != null && x.emwwunitCost != 0).length > 0 ? this.costEdit.push(false) : this.costEdit.push(true)
        this.WaterWastengx.filter(x => x.wwstream == "Waste" && x.emwwunitCost != "" && x.emwwunitCost != null && x.emwwunitCost != 0).length > 0 ? this.costEdit.push(false) : this.costEdit.push(true)
        this.costEdit.push(this.DateRequired)
        this.costEdit.push(this.currencyLabel)
        this.WaterWasteParam = res.waterWasteParameter

        
    }
    else{

      //Transportation, Warehousing, Shipping API call
      this.gdlList = res.gldDropDownList
      console.log("TRANSPORTATION", res.transportationData)
      var transportationData = res.transportationData
      var Transportationngx = []
      if (transportationData != null && this.gdlList != null) {
        for (var i = 0; i < transportationData.length; i++) {
          var data = []
          data = this.gdlList.filter(x => x.environmentalSourceId == transportationData[i].environmentalSourceId)
          var transportationObject = {
            ...data[0],
            ...transportationData[i]
          }
          console.log(transportationObject)
          Transportationngx.push(transportationObject)
        }
        this.Transportationngx = Transportationngx
      }
      else{
        Transportationngx = []
        this.Transportationngx = []
      }
      console.log("WAREHOUSING", res.warehouseData)
      var warehousingData = res.warehouseData
      var Warehousingngx = []
      if (warehousingData != null && this.gdlList != null) {
        for (var i = 0; i < warehousingData.length; i++) {
          var data = []
          data = this.gdlList.filter(x => x.environmentalSourceId == warehousingData[i].environmentalSourceId)
          var warehouseObject = {
            ...data[0],
            ...warehousingData[i]
          }
          Warehousingngx.push(warehouseObject)
        }
        this.Warehousingngx = Warehousingngx
      }
      else{
        Warehousingngx = []
        this.Warehousingngx = []
      }
      console.log("SHIPPING", res.shippingData)
      var shippingData = res.shippingData
      var Shippingngx = []
      if (shippingData != null && this.gdlList != null) {
        for (var i = 0; i < shippingData.length; i++) {
          var data = []
          data = this.gdlList.filter(x => x.environmentalSourceId == shippingData[i].environmentalSourceId)
          var shippingObject = {
            ...data[0],
            ...shippingData[i]
          }
          Shippingngx.push(shippingObject)
        }
        this.Shippingngx = Shippingngx
      }
      else{
        Shippingngx = []
        this.Shippingngx = []
      }
    }
      this.noCarbonImpact = res.projectData.noCarbonImpact
      this.NoCarbonForm.patchValue({ NoCarbonImpact: res.projectData.noCarbonImpact })
      this.viewContent = true
      this.CAPSform.disable()
    })
  }

  openCAPS() {
    var message = "";
    if(this.callLocation == 'Business-Case'){
      message = "The details can be edited only in the Environmental Impact (CAPS) page. Do you want to leave the Business Case Recommended Options page and switch to the Environmental Impact (CAPS) page?"
    }
    else if(this.callLocation == "Project-Charter"){
      message = "The details can be edited only in the Environmental Impact (CAPS) page. Do you want to leave the Project Charter page and switch to the Environmental Impact (CAPS) page?"
    }
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Are you sure?",
      "message": message,
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Go to Environmental Impact (CAPS)",
          // "color": "warn"
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
        this.router.navigate([`./project-hub/` + this.id + `/caps`]);
      }
    }
    )
    
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  caps() {
    window.open(
        'https://mytakeda.sharepoint.com/:b:/r/sites/NEWEnergyProgram/CAPS%20Global%20Documents/CAPS%20Playbook/CAPS%20Site%20Guidance%20Playbook%20v.20240202.pdf?csf=1&web=1&e=oNDTfF'
    );
}
}
