import { Component, ElementRef, ViewChild } from '@angular/core';
import { PortfolioApiService } from '../../portfolio-api.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PortfolioCenterService } from '../../portfolio-center.service';
import { AuthService } from 'app/core/auth/auth.service';
import { SheetDescriptor, SpreadsheetChangeEvent, SpreadsheetComponent } from '@progress/kendo-angular-spreadsheet';
import '@progress/kendo-ui';
declare var kendo: any;

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
    ForecastType: new FormControl(null)
  })
  Type = ['Forecast', 'Historical']
  forecastExcelHistorical:any = {}
  forecastExcel:any = {}
  ExcelData:any = {}
  showContent = false
  showData = false
  showDataForecast = false
  showDataForecastOpex = false
  showDataOpex = false
  forecastType = []
  columnNames = []
  col = []
  y0Label: string = '';
  y1Label: string = '';
  y2Label: string = '';
  y3Label: string = '';
  y4Label: string = '';
  forecastDB = []
  finalDatatoSheet: SheetDescriptor[];
  finalDatatoSheetHistorical: SheetDescriptor[];

@ViewChild('spreadsheet') el: ElementRef;
@ViewChild('Forecastspreadsheet') forecastElement: ElementRef;
  constructor(private portfoliService: PortfolioApiService, public fuseAlert: FuseConfirmationService, public PortfolioCenterService: PortfolioCenterService, private auth: AuthService) {
    this.ForecastForm.valueChanges.subscribe(res => {
      if (this.showContent) {
      this.PortfolioCenterService.isFormChanged = true
      }
    })
    this.ForecastForm.controls.DataType.valueChanges.subscribe(res => {
      if (this.showContent) {
        if(res == "Historical"){
          this.ForecastForm.value.Reference = null
          this.ForecastForm.controls.Reference.disable();
        }
        else if(res == "Forecast"){
          this.ForecastForm.controls.Reference.enable();
        }
      }
    })
    this.ForecastForm.controls.ForecastType.valueChanges.subscribe((res: any) => {
      if (this.showContent) {
        if(this.ForecastForm.controls.DataType.value == "Forecast"){
          this.showData = false;
          this.showDataForecast = false;
          this.showDataForecastOpex = false;
          this.forecastExcel = this.ExcelData.filter(x => x.budgetData == res.lookUpName)
          this.finalDatatoSheet = []
        var firstrow={
          height: 30,
          cells: [
          {
              value: "Budget Data Type", background: "rgb(144,164,174)", textAlign: "left", color: "white", fontSize: 18
          }
          ]
        }
        var secondrow = {
          cells: [
            {
            value: "Budget Data", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Capital Budget ID", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Problem ID", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Project Name", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Period Name", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Historical Actual", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Apr", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "May", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Jun", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Jul", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Aug", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Sep", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Oct", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Nov", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Dec", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Jan", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Feb", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Mar", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "AprY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "MayY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "JunY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "JulY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "AugY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "SepY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "OctY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "NovY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "DecY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "JanY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "FebY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "MarY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: this.y1Label, bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: this.y2Label, bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: this.y3Label, bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: this.y4Label, bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: this.y0Label, bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Annual Total", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Cummulative Total", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            }
            ]
        }
        var finaldata = []
        finaldata.push(firstrow)
        finaldata.push(secondrow)
        var rowData
        var z=3
        for (var i of this.forecastExcel) {
          var formula = '=SUM(G' + z + ':R' + z + ')'
          var formula1 = '=SUM(S' + z + ':AD' + z + ')'
          var formula2 = '=SUM(G' + z + ':AD' + z + ')'
          rowData={cells: [
            { value: i.budgetData, textAlign: "center"},
            { value: i.capitalBudgetID, textAlign: "right"},
            { value: i.problemID, textAlign: "center"},
            { value: i.problemTitle, textAlign: "right"},
            { value: i.periodName, textAlign: "right"},
            { value: i.historicalActual, textAlign: "right"},
            { value: i.apr, textAlign: "center"},
            { value: i.may, textAlign: "center"},
            { value: i.jun, textAlign: "center"},
            { value: i.jul, textAlign: "center"},
            { value: i.aug, textAlign: "center"},
            { value: i.sep, textAlign: "center"},
            { value: i.oct, textAlign: "center"},
            { value: i.nov, textAlign: "center"},
            { value: i.dec, textAlign: "center"},
            { value: i.jan, textAlign: "center"},
            { value: i.feb, textAlign: "center"},
            { value: i.mar, textAlign: "center"},
            { value: i.y1_Apr, textAlign: "center"},
            { value: i.y1_May, textAlign: "center"},
            { value: i.y1_Jun, textAlign: "center"},
            { value: i.y1_Jul, textAlign: "center"},
            { value: i.y1_Aug, textAlign: "center"},
            { value: i.y1_Sep, textAlign: "center"},
            { value: i.y1_Oct, textAlign: "center"},
            { value: i.y1_nov, textAlign: "center"},
            { value: i.y1_Dec, textAlign: "center"},
            { value: i.y1_Jan, textAlign: "center"},
            { value: i.y1_Feb, textAlign: "center"},
            { value: i.y1_Mar, textAlign: "center"},
            { value: i.y2, textAlign: "center"},
            { value: i.y3, textAlign: "center"},
            { value: i.y4, textAlign: "center"},
            { value: i.y5, textAlign: "center"},
            { value: i.y1, textAlign: "center", formula: formula1},
            { value: i.annualTotal, textAlign: "center", formula: formula},
            { value: i.cumulativeTotal, textAlign: "center", formula: formula2}
            ]
          }
          finaldata.push(rowData)
          z++;
        }
        this.finalDatatoSheet = [{
          name: "Budget",
          mergedCells: ["A1:AK1"],
          columns: [
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 }
        ],
        rows: finaldata
        }]
        if(res.lookUpName == "OpEx Forecast"){
          this.showDataForecastOpex = true;
        }
        else{
          this.showDataForecast = true;
        }
        }
        else{
          this.showData = false;
          this.showDataForecast = false
          this.forecastExcelHistorical = this.ExcelData.filter(x => x.budgetDataType == res.lookUpName)
          this.finalDatatoSheetHistorical = []
        var firstrow={
          height: 30,
          cells: [
          {
              value: "Budget Data Type", background: "rgb(144,164,174)", textAlign: "left", color: "white", fontSize: 18
          }
          ]
        }
        var secondrowhis = {
          cells: [
            {
            value: "problemTitle", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: 'Budget Data Type', bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Problem Id", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Capital Budget Id", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "Historical Actual", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "historicalActualFY14", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "historicalActualFY15", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "historicalActualFY16", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "historicalActualFY17", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "historicalActualFY18", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "historicalActualFY19", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "historicalActualFY20", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            },
            {
            value: "historicalActualFY21", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
            }
            ]
        }
        var finaldata = []
        finaldata.push(firstrow)
        finaldata.push(secondrowhis)
        var rowData
        var z=3
        for (var i of this.forecastExcelHistorical) {
          var formula = '=SUM(F' + z + ':J' + z + ')'
          rowData={cells: [
            { value: i.budgetDataType, textAlign: "center"},
            { value: i.capitalBudgetID, textAlign: "center"},
            { value: i.problemID, textAlign: "center"},
            { value: i.problemTitle, textAlign: "center"},
            { value: i.historicalActual, textAlign: "center", formula: formula},
            { value: i.historicalActualFY14, textAlign: "right"},
            { value: i.historicalActualFY15, textAlign: "center"},
            { value: i.historicalActualFY16, textAlign: "right"},
            { value: i.historicalActualFY17, textAlign: "right"},
            { value: i.historicalActualFY18, textAlign: "right"},
            { value: i.historicalActualFY19, textAlign: "center"},
            { value: i.historicalActualFY20, textAlign: "center"},
            { value: i.historicalActualFY21, textAlign: "center"}
            ]
          }
          finaldata.push(rowData)
          z++;
        }
        this.finalDatatoSheetHistorical = [{
          name: "Budget",
          mergedCells: ["A1:M1"],
          columns: [
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 },
            { width: 150 }
        ],
        rows: finaldata
        }]
        if(res.lookUpName == "OpEx Forecast"){
          this.showDataOpex = true;
        }
        else{
          this.showData = true;
        }
        }
      }
    })
  }
  ngOnInit(): void {
    this.dataloader()
  }

  dataloader() {
    this.auth.lookupMaster().then((lookup: any) => {
    this.portfoliService.getLBEData().then((LBE : any) => {
    this.portfoliService.getBudgetId().then((BudgetId : any) => {
      this.forecastType = lookup.filter(x => x.lookUpParentId == 'bc786c6a-8f23-4161-9f2a-67e1897295c7')
      if (this.ForecastForm.controls.ForecastType.value == null) {
        this.ForecastForm.patchValue({
          ForecastType: this.forecastType.filter(x => x.lookUpId == 'ec313be6-353d-413b-9805-b7519f2ede18')[0]
        })
      }
      this.LookupDataLBE = LBE
      for(var i=0;i<BudgetId.length;i++){
        this.LookupDataBudget.push({ID:BudgetId[i]})
      }
      
      this.showContent = true
    })
  })
})
  }

  getData(){
    var mandatory = true
    if(this.ForecastForm.controls.DataType.value == "Historical"){
    if(this.ForecastForm.controls.ProjectId.value == null && (this.ForecastForm.controls.BudgetId.value == null || this.ForecastForm.controls.BudgetId.value == "")){
      mandatory = false
    }
    else if(this.ForecastForm.controls.ProjectId.value?.length == 0 && (this.ForecastForm.controls.BudgetId.value == null || this.ForecastForm.controls.BudgetId.value == "")){
      mandatory = false
    }
  }
    else if(this.ForecastForm.controls.DataType.value == null || this.ForecastForm.controls.Reference.value == null || (this.ForecastForm.controls.ProjectId.value == null && (this.ForecastForm.controls.BudgetId.value == null || this.ForecastForm.controls.BudgetId.value == ""))){
      mandatory = false
    }
    else if(this.ForecastForm.controls.DataType.value.length == 0 || this.ForecastForm.controls.Reference.value?.length == 0 || (this.ForecastForm.controls.ProjectId.value?.length == 0 && (this.ForecastForm.controls.BudgetId.value == null || this.ForecastForm.controls.BudgetId.value == ""))){
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
      var projectId = ""
      var budgetId = ""
      var LBEPeriod = ""
      projectId = this.ForecastForm.controls.ProjectId.value ? this.ForecastForm.controls.ProjectId.value : ''
      if(this.ForecastForm.controls.Reference.value != null){
        for(var i=0;i<this.ForecastForm.controls.Reference.value.length;i++){
          LBEPeriod = LBEPeriod + this.ForecastForm.controls.Reference.value[i].DateMasterId + ','
        }
      }
      budgetId = this.ForecastForm.controls.BudgetId.value ? this.ForecastForm.controls.BudgetId.value : ''
      if(this.ForecastForm.controls.DataType.value == "Historical"){
        this.portfoliService.getHistoricalExcelData(projectId, budgetId).then((historicalData : any) => {
          this.showData = false
          this.showDataForecast = false
          this.ExcelData = historicalData
          this.forecastExcelHistorical = historicalData.filter(x => x.budgetDataType == this.ForecastForm.controls.ForecastType.value.lookUpName)

          this.showData = true
          var firstrow={
            height: 30,
            cells: [
            {
                value: "Budget Data Type", background: "rgb(144,164,174)", textAlign: "left", color: "white", fontSize: 18
            }
            ]
          }
          var secondrow = {
            cells: [
              {
              value: "problemTitle", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: 'Budget Data Type', bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Problem Id", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Capital Budget Id", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Historical Actual", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "historicalActualFY14", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "historicalActualFY15", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "historicalActualFY16", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "historicalActualFY17", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "historicalActualFY18", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "historicalActualFY19", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "historicalActualFY20", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "historicalActualFY21", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              }
              ]
          }
          var finaldata = []
          finaldata.push(firstrow)
          finaldata.push(secondrow)
          var rowData
          var z=3
          for (var i of this.forecastExcelHistorical) {
            var formula = '=SUM(F' + z + ':J' + z + ')'
            rowData={cells: [
              { value: i.budgetDataType, textAlign: "center"},
              { value: i.capitalBudgetID, textAlign: "center"},
              { value: i.problemID, textAlign: "center"},
              { value: i.problemTitle, textAlign: "center"},
              { value: i.historicalActual, textAlign: "center", formula: formula},
              { value: i.historicalActualFY14, textAlign: "right"},
              { value: i.historicalActualFY15, textAlign: "center"},
              { value: i.historicalActualFY16, textAlign: "right"},
              { value: i.historicalActualFY17, textAlign: "right"},
              { value: i.historicalActualFY18, textAlign: "right"},
              { value: i.historicalActualFY19, textAlign: "center"},
              { value: i.historicalActualFY20, textAlign: "center"},
              { value: i.historicalActualFY21, textAlign: "center"}
              ]
            }
            finaldata.push(rowData)
            z++;
          }
          this.finalDatatoSheetHistorical = [{
            name: "Budget",
            mergedCells: ["A1:M1"],
            columns: [
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 }
          ],
          rows: finaldata
          }]
        })
      }
      if(this.ForecastForm.controls.DataType.value == "Forecast"){
        this.portfoliService.getForecastExcelData(LBEPeriod, projectId, budgetId).then((LBE : any) => {
          this.showData = false
          this.showDataForecast = false
          this.ExcelData = LBE
          const d = new Date();
          let year = d.getFullYear();
          let year2 = year+1;
          let year3 = year+2;
          let year4 = year+3;
          let year5 = year+4;
          let year6 = year+5;
          this.y0Label= 'FY' + year2;
          this.y1Label= 'FY' + year3;
          this.y2Label= 'FY' + year4;
          this.y3Label= 'FY' + year5;
          this.y4Label= 'FY' + year6 + '+';

          this.forecastExcel = LBE.filter(x => x.budgetData == this.ForecastForm.controls.ForecastType.value.lookUpName)
          
          this.showDataForecast = true
          var firstrow={
            height: 30,
            cells: [
            {
                value: "Budget Data Type", background: "rgb(144,164,174)", textAlign: "left", color: "white", fontSize: 18
            }
            ]
          }
          var secondrow = {
            cells: [
              {
              value: "Budget Data", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Capital Budget ID", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Problem ID", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Project Name", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Period Name", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Historical Actual", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Apr", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "May", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Jun", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Jul", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Aug", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Sep", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Oct", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Nov", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Dec", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Jan", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Feb", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Mar", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "AprY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "MayY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "JunY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "JulY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "AugY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "SepY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "OctY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "NovY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "DecY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "JanY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "FebY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "MarY1", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: this.y1Label, bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: this.y2Label, bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: this.y3Label, bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: this.y4Label, bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: this.y0Label, bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Annual Total", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              },
              {
              value: "Cummulative Total", bold: true, background: "rgb(236,239,241)", color: "black", textAlign: "center"
              }
              ]
          }
          var finaldata = []
          finaldata.push(firstrow)
          finaldata.push(secondrow)
          var rowData
          var z=3
          for (var i of this.forecastExcel) {
            var formula = '=SUM(G' + z + ':R' + z + ')'
            var formula1 = '=SUM(S' + z + ':AD' + z + ')'
            var formula2 = '=SUM(G' + z + ':AD' + z + ')'
            rowData={cells: [
              { value: i.budgetData, textAlign: "center"},
              { value: i.capitalBudgetID, textAlign: "right"},
              { value: i.problemID, textAlign: "center"},
              { value: i.problemTitle, textAlign: "right"},
              { value: i.periodName, textAlign: "right"},
              { value: i.historicalActual, textAlign: "right"},
              { value: i.apr, textAlign: "center"},
              { value: i.may, textAlign: "center"},
              { value: i.jun, textAlign: "center"},
              { value: i.jul, textAlign: "center"},
              { value: i.aug, textAlign: "center"},
              { value: i.sep, textAlign: "center"},
              { value: i.oct, textAlign: "center"},
              { value: i.nov, textAlign: "center"},
              { value: i.dec, textAlign: "center"},
              { value: i.jan, textAlign: "center"},
              { value: i.feb, textAlign: "center"},
              { value: i.mar, textAlign: "center"},
              { value: i.y1_Apr, textAlign: "center"},
              { value: i.y1_May, textAlign: "center"},
              { value: i.y1_Jun, textAlign: "center"},
              { value: i.y1_Jul, textAlign: "center"},
              { value: i.y1_Aug, textAlign: "center"},
              { value: i.y1_Sep, textAlign: "center"},
              { value: i.y1_Oct, textAlign: "center"},
              { value: i.y1_nov, textAlign: "center"},
              { value: i.y1_Dec, textAlign: "center"},
              { value: i.y1_Jan, textAlign: "center"},
              { value: i.y1_Feb, textAlign: "center"},
              { value: i.y1_Mar, textAlign: "center"},
              { value: i.y2, textAlign: "center"},
              { value: i.y3, textAlign: "center"},
              { value: i.y4, textAlign: "center"},
              { value: i.y5, textAlign: "center"},
              { value: i.y1, textAlign: "center", formula: formula1},
              { value: i.annualTotal, textAlign: "center", formula: formula},
              { value: i.cumulativeTotal, textAlign: "center", formula: formula2}
              ]
            }
            finaldata.push(rowData)
            z++;
          }
          this.finalDatatoSheet = [{
            name: "Budget",
            mergedCells: ["A1:AK1"],
            columns: [
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 },
              { width: 150 }
          ],
          rows: finaldata
          }]
        })
      }
    }
  }

SubmitData(){
    if(this.ForecastForm.controls.DataType.value == "Forecast"){
      var data:any = this.forecastElement
  var jsonData
  data.spreadsheetWidget.saveJSON().then((data) => {
    jsonData = data.sheets[0].rows;
      var i=2;
      this.forecastExcel.forEach(element=>{
        element.annualTotal = jsonData[i].cells[35].value
        element.apr = jsonData[i].cells[6].value
        element.aug= jsonData[i].cells[10].value
        element.budgetData = jsonData[i].cells[0].value
        element.capitalBudgetID = jsonData[i].cells[1].value
        element.cumulativeTotal = jsonData[i].cells[36].value
        element.dec = jsonData[i].cells[14].value
        element.feb = jsonData[i].cells[16].value
        element.historicalActual = jsonData[i].cells[5].value
        element.jan = jsonData[i].cells[15].value
        element.jul = jsonData[i].cells[9].value
        element.jun = jsonData[i].cells[8].value
        element.mar = jsonData[i].cells[17].value
        element.may = jsonData[i].cells[7].value
        element.nov = jsonData[i].cells[13].value
        element.oct = jsonData[i].cells[12].value
        element.sep = jsonData[i].cells[11].value
        element.y1 = jsonData[i].cells[34].value
        element.y1_Apr = jsonData[i].cells[18].value
        element.y1_Aug = jsonData[i].cells[22].value
        element.y1_Dec = jsonData[i].cells[26].value
        element.y1_Feb = jsonData[i].cells[28].value
        element.y1_Jan = jsonData[i].cells[27].value
        element.y1_Jul = jsonData[i].cells[21].value
        element.y1_Jun = jsonData[i].cells[20].value
        element.y1_Mar = jsonData[i].cells[29].value
        element.y1_May = jsonData[i].cells[19].value
        element.y1_Nov = jsonData[i].cells[25].value
        element.y1_Oct = jsonData[i].cells[24].value
        element.y1_Sep = jsonData[i].cells[23].value
        element.y2 = jsonData[i].cells[30].value
        element.y3 = jsonData[i].cells[31].value
        element.y4 = jsonData[i].cells[32].value
        element.y5 = jsonData[i].cells[33].value
        i++
      })
      var dataToSend = this.forecastExcel
      this.portfoliService.putForecastExcelData(dataToSend).then((forecastData : any) => {
        this.showDataForecast = false
        this.getData()
        this.PortfolioCenterService.successSave.next(true)
      })
    })
    }
    else{
      var data:any = this.el
      var jsonData
      data.spreadsheetWidget.saveJSON().then((data) => {
      jsonData = data.sheets[0].rows;
      var i=2
      this.forecastExcelHistorical.forEach(element=>{
        element.budgetDataType = jsonData[i].cells[0].value
        element.historicalActual = jsonData[i].cells[4].value
        element.historicalActualFY14 = jsonData[i].cells[5].value
        element.historicalActualFY15 = jsonData[i].cells[6].value
        element.historicalActualFY16 = jsonData[i].cells[7].value
        element.historicalActualFY17 = jsonData[i].cells[8].value
        element.historicalActualFY18 = jsonData[i].cells[9].value
        element.historicalActualFY19 = jsonData[i].cells[10].value
        element.historicalActualFY20 = jsonData[i].cells[11].value
        element.historicalActualFY21 = jsonData[i].cells[12].value
        i++
      })
      var dataToSend = this.forecastExcelHistorical
      this.portfoliService.putHistoricalExcelData(dataToSend).then((historicalData : any) => {
        this.showData = false
        this.getData()
        this.PortfolioCenterService.successSave.next(true)
      })
    })
    }
}

}
