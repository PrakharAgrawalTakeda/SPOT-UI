import { Component } from '@angular/core';
import { PortfolioApiService } from '../../portfolio-api.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { FormControl, FormGroup } from '@angular/forms';
import { PortfolioCenterService } from '../../portfolio-center.service';

@Component({
  selector: 'app-forecast-excel-update',
  templateUrl: './forecast-excel-update.component.html',
  styleUrls: ['./forecast-excel-update.component.scss']
})
export class ForecastExcelUpdateComponent {
  LookupDataLBE:any = []
  LookupDataBudget:any = []
  ForecastForm = new FormGroup({
    Reference: new FormControl(null),
    DataType: new FormControl(null),
    ProjectId: new FormControl(null),
    BudgetId: new FormControl(null),
  })
  Type = ['Forecast', 'Historical']
  forecastExcel:any = {}
  showContent = false
  
  constructor(private portfoliService: PortfolioApiService, public fuseAlert: FuseConfirmationService, public PortfolioCenterService: PortfolioCenterService) {
    this.ForecastForm.valueChanges.subscribe(res => {
      if (this.showContent) {
      this.PortfolioCenterService.isFormChanged = true
      }
    })
    this.ForecastForm.controls.DataType.valueChanges.subscribe(res => {
      if (this.showContent) {
        if(res == "Historical"){
          this.ForecastForm.controls.Reference.disable();
        }
        else if(res == "Forecast"){
          this.ForecastForm.controls.Reference.enable();
        }
      }
    })
  }
  ngOnInit(): void {
    this.dataloader()
  }

  dataloader() {
    this.portfoliService.getLBEData().then((LBE : any) => {
    this.portfoliService.getBudgetId().then((BudgetId : any) => {
      this.LookupDataLBE = LBE
      this.LookupDataBudget = BudgetId
      this.showContent = true
    })
  })
  }
  
  getData(){
    var mandatory = true
    if(this.ForecastForm.controls.DataType.value == "Historical" && (this.ForecastForm.controls.ProjectId.value == null && (this.ForecastForm.controls.BudgetId.value == null || this.ForecastForm.controls.BudgetId.value == ""))){
      mandatory = false
    }
    else if(this.ForecastForm.controls.DataType.value == "Historical" && (this.ForecastForm.controls.ProjectId.value.length == 0 && (this.ForecastForm.controls.BudgetId.value == null || this.ForecastForm.controls.BudgetId.value == ""))){
      mandatory = false
    }
    else if(this.ForecastForm.controls.DataType.value == null || this.ForecastForm.controls.Reference.value == null || (this.ForecastForm.controls.ProjectId.value == null && (this.ForecastForm.controls.BudgetId.value == null || this.ForecastForm.controls.BudgetId.value == ""))){
      mandatory = false
    }
    else if(this.ForecastForm.controls.DataType.value.length == 0 || this.ForecastForm.controls.Reference.value.length == 0 || (this.ForecastForm.controls.ProjectId.value.length == 0 && (this.ForecastForm.controls.BudgetId.value == null || this.ForecastForm.controls.BudgetId.value == ""))){
      mandatory = false
    }
    if(!mandatory){
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "To get information, following fields are required: Reference, Data For and Project Ids or Budget Ids",
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
          }
        },
        "dismissible": true
      };
      this.fuseAlert.open(comfirmConfig);
    }
    else{
      if(this.ForecastForm.controls.DataType.value == "Historical"){
        // this.portfoliService.getHistoricalExcelData().then((LBE : any) => {
        // })
      }
    }
  }
}
