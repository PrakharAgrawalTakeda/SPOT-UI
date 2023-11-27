import { Component } from '@angular/core';
import { PortfolioApiService } from '../../portfolio-api.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PortfolioCenterService } from '../../portfolio-center.service';
import { AuthService } from 'app/core/auth/auth.service';

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
  fTableEditStack = []
  hTableEditStack = []
  historicalForm = new FormArray([])
  forecastExcelForm = new FormArray([])
  showData = false
  showDataForecast = false
  forecastType = []
  columnNames = []
  col = []
  y0Label: string = '';
  y1Label: string = '';
  y2Label: string = '';
  y3Label: string = '';
  y4Label: string = '';
  forecastDB = []
  
  constructor(private portfoliService: PortfolioApiService, public fuseAlert: FuseConfirmationService, public PortfolioCenterService: PortfolioCenterService, private auth: AuthService) {
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
    this.ForecastForm.controls.ForecastType.valueChanges.subscribe((res: any) => {
      if (this.showContent) {
        console.log(res)
        if(this.ForecastForm.controls.DataType.value == "Forecast"){
          this.showData = false;
          this.showDataForecast = false;
          this.forecastExcel = this.ExcelData.filter(x => x.budgetData == res.lookUpName)
          this.forecastExcelForm.value.patchValue = []
          this.forecastExcelForm.controls = []
          for (var i of this.forecastExcel) {
            this.forecastExcelForm.push(new FormGroup({
              budgetGlobalID: new FormControl(i.budgetGlobalID),
              dateMasterID: new FormControl(i.dateMasterID),
              budgetDataID: new FormControl(i.budgetDataID),
              budgetDataIDY1: new FormControl(i.budgetDataIDY1),
              projectID: new FormControl(i.projectID),
              budgetDataTypeID: new FormControl(i.budgetDataTypeID),
              budgetData: new FormControl(i.budgetData),
              capitalBudgetID: new FormControl(i.capitalBudgetID),
              problemID: new FormControl(i.problemID),
              problemTitle: new FormControl(i.problemTitle),
              periodName: new FormControl(i.periodName),
              historicalActual: new FormControl(i.historicalActual),
              apr: new FormControl(i.apr),
              may: new FormControl(i.may),
              jun: new FormControl(i.jun),
              jul: new FormControl(i.jul),
              aug: new FormControl(i.aug),
              sep: new FormControl(i.sep),
              oct: new FormControl(i.oct),
              nov: new FormControl(i.nov),
              dec: new FormControl(i.dec),
              jan: new FormControl(i.jan),
              feb: new FormControl(i.feb),
              mar: new FormControl(i.Mar),
              y1_Apr: new FormControl(i.y1_Apr),
              y1_May: new FormControl(i.y1_May),
              y1_Jun: new FormControl(i.y1_Jun),
              y1_Jul: new FormControl(i.y1_Jul),
              y1_Aug: new FormControl(i.y1_Aug),
              y1_Sep: new FormControl(i.y1_Sep),
              y1_Oct: new FormControl(i.Y1_Oct),
              y1_Nov: new FormControl(i.y1_Nov),
              y1_Dec: new FormControl(i.y1_Dec),
              y1_Jan: new FormControl(i.y1_Jan),
              y1_Feb: new FormControl(i.y1_Feb),
              y1_Mar: new FormControl(i.y1_Mar),
              y2: new FormControl(i.y2),
              y3: new FormControl(i.y3),
              y4: new FormControl(i.y4),
              y5: new FormControl(i.y5),
              y1: new FormControl(i.Y1),
              annualTotal: new FormControl(i.annualTotal),
              cumulativeTotal: new FormControl(i.cumulativeTotal),
            }), { emitEvent: false })
        }
          this.showDataForecast = true;
        }
        else{
          this.showData = false;
          this.showDataForecast = false
          this.forecastExcelHistorical = this.ExcelData.filter(x => x.budgetDataType == res.lookUpName)
          this.historicalForm.value.patchValue = []
          this.historicalForm.controls = []
          for (var i of this.forecastExcelHistorical) {
            this.historicalForm.push(new FormGroup({
              budgetDataType: new FormControl(i.budgetDataType),
              budgetDataTypeID: new FormControl(i.budgetDataTypeID),
              budgetHistoricalActualID: new FormControl(i.budgetHistoricalActualID),
              capitalBudgetID: new FormControl(i.capitalBudgetID),
              problemID: new FormControl(i.problemID),
              problemTitle: new FormControl(i.problemTitle),
              projectID: new FormControl(i.projectID),
              historicalActualFY14: new FormControl(i.historicalActualFY14),
              historicalActualFY15: new FormControl(i.historicalActualFY15),
              historicalActualFY16: new FormControl(i.historicalActualFY16),
              historicalActualFY17: new FormControl(i.historicalActualFY17),
              historicalActualFY18: new FormControl(i.historicalActualFY18),
              historicalActualFY19: new FormControl(i.historicalActualFY19),
              historicalActualFY20: new FormControl(i.historicalActualFY20),
              historicalActualFY21: new FormControl(i.historicalActualFY21),
            }), { emitEvent: false })
        }
          this.showData = true;
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
      // this.LookupDataBudget = BudgetId
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
      // if(this.ForecastForm.controls.ProjectId.value != null){
      //   for(var i=0;i<this.ForecastForm.controls.ProjectId.value.length;i++){
      //     projectId = projectId + this.ForecastForm.controls.ProjectId.value[i].problemId + ','
      //   }
      // }
      projectId = this.ForecastForm.controls.ProjectId.value ? this.ForecastForm.controls.ProjectId.value : ''
      if(this.ForecastForm.controls.Reference.value != null){
        for(var i=0;i<this.ForecastForm.controls.Reference.value.length;i++){
          LBEPeriod = LBEPeriod + this.ForecastForm.controls.Reference.value[i].DateMasterId + ','
        }
      }
      // if(this.ForecastForm.controls.BudgetId.value != null){
      //   for(var i=0;i<this.ForecastForm.controls.BudgetId.value.length;i++){
      //     budgetId = budgetId + this.ForecastForm.controls.BudgetId.value[i].ID + ','
      //   }
      // }
      budgetId = this.ForecastForm.controls.BudgetId.value ? this.ForecastForm.controls.BudgetId.value : ''
      if(this.ForecastForm.controls.DataType.value == "Historical"){
        this.portfoliService.getHistoricalExcelData(projectId, budgetId).then((historicalData : any) => {
          this.showData = false
          this.showDataForecast = false
          console.log(historicalData)
          this.ExcelData = historicalData
          this.forecastExcelHistorical = historicalData.filter(x => x.budgetDataType == this.ForecastForm.controls.ForecastType.value.lookUpName)
          
          for (var i of this.forecastExcelHistorical) {
            this.historicalForm.push(new FormGroup({
              budgetDataType: new FormControl(i.budgetDataType),
              budgetDataTypeID: new FormControl(i.budgetDataTypeID),
              budgetHistoricalActualID: new FormControl(i.budgetHistoricalActualID),
              capitalBudgetID: new FormControl(i.capitalBudgetID),
              problemID: new FormControl(i.problemID),
              problemTitle: new FormControl(i.problemTitle),
              projectID: new FormControl(i.projectID),
              historicalActualFY14: new FormControl(i.historicalActualFY14),
              historicalActualFY15: new FormControl(i.historicalActualFY15),
              historicalActualFY16: new FormControl(i.historicalActualFY16),
              historicalActualFY17: new FormControl(i.historicalActualFY17),
              historicalActualFY18: new FormControl(i.historicalActualFY18),
              historicalActualFY19: new FormControl(i.historicalActualFY19),
              historicalActualFY20: new FormControl(i.historicalActualFY20),
              historicalActualFY21: new FormControl(i.historicalActualFY21),
            }), { emitEvent: false })
        }
          this.showData = true
        })
      }
      if(this.ForecastForm.controls.DataType.value == "Forecast"){
        this.portfoliService.getForecastExcelData(LBEPeriod, projectId, budgetId).then((LBE : any) => {
          this.showData = false
          this.showDataForecast = false
          console.log(LBE)
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
          for (var i of this.forecastExcel) {
            this.forecastExcelForm.push(new FormGroup({
              budgetGlobalID: new FormControl(i.budgetGlobalID),
              dateMasterID: new FormControl(i.dateMasterID),
              budgetDataID: new FormControl(i.budgetDataID),
              budgetDataIDY1: new FormControl(i.budgetDataIDY1),
              projectID: new FormControl(i.projectID),
              budgetDataTypeID: new FormControl(i.budgetDataTypeID),
              budgetData: new FormControl(i.budgetData),
              capitalBudgetID: new FormControl(i.capitalBudgetID),
              problemID: new FormControl(i.problemID),
              problemTitle: new FormControl(i.problemTitle),
              periodName: new FormControl(i.periodName),
              historicalActual: new FormControl(i.historicalActual),
              apr: new FormControl(i.apr),
              may: new FormControl(i.may),
              jun: new FormControl(i.jun),
              jul: new FormControl(i.jul),
              aug: new FormControl(i.aug),
              sep: new FormControl(i.sep),
              oct: new FormControl(i.oct),
              nov: new FormControl(i.nov),
              dec: new FormControl(i.dec),
              jan: new FormControl(i.jan),
              feb: new FormControl(i.feb),
              mar: new FormControl(i.Mar),
              y1_Apr: new FormControl(i.y1_Apr),
              y1_May: new FormControl(i.y1_May),
              y1_Jun: new FormControl(i.y1_Jun),
              y1_Jul: new FormControl(i.y1_Jul),
              y1_Aug: new FormControl(i.y1_Aug),
              y1_Sep: new FormControl(i.y1_Sep),
              y1_Oct: new FormControl(i.Y1_Oct),
              y1_Nov: new FormControl(i.y1_Nov),
              y1_Dec: new FormControl(i.y1_Dec),
              y1_Jan: new FormControl(i.y1_Jan),
              y1_Feb: new FormControl(i.y1_Feb),
              y1_Mar: new FormControl(i.y1_Mar),
              y2: new FormControl(i.y2),
              y3: new FormControl(i.y3),
              y4: new FormControl(i.y4),
              y5: new FormControl(i.y5),
              y1: new FormControl(i.Y1),
              annualTotal: new FormControl(i.annualTotal),
              cumulativeTotal: new FormControl(i.cumulativeTotal),
            }), { emitEvent: false })
        }
          this.showDataForecast = true
        })
      }
    }
  }
  fTableEditRow(rowIndex) {
    if (!this.fTableEditStack.includes(rowIndex)) {
        // if (this.forecastExcelHistorical[rowIndex].isopen) {
            this.fTableEditStack.push(rowIndex)
        // }
    }
  }
  hTableEditRow(rowIndex) {
    if (!this.hTableEditStack.includes(rowIndex)) {
        // if (this.forecastExcelHistorical[rowIndex].isopen) {
            this.hTableEditStack.push(rowIndex)
        // }
    }
  }
  onPaste(event: ClipboardEvent, rowIndex: number, field: string): void {
    event.preventDefault();
    const clipboardData = event.clipboardData || window['clipboardData'];
    const pastedData = clipboardData.getData('text').split('\t');
    for (let i = 0; i < pastedData.length; i++) {
        const roundedNumber = Math.round(Number(pastedData[i]));
        this.historicalForm.controls[rowIndex].value[field] = roundedNumber;
        this.historicalForm.controls[rowIndex].patchValue({
            [field]: roundedNumber
        });
        field = this.getNextField(field);
    }
    this.recalculateAnnualTotal(rowIndex)
    // this.formValue()
  }

  onPasteY1(event: ClipboardEvent, rowIndex: number, field: string): void {
    event.preventDefault();
    const clipboardData = event.clipboardData || window['clipboardData'];
    const pastedData = clipboardData.getData('text').split('\t');
    for (let i = 0; i < pastedData.length; i++) {
        const roundedNumber = Math.round(Number(pastedData[i]));
        this.forecastExcelForm.controls[rowIndex].value[field] = roundedNumber;
        this.forecastExcelForm.controls[rowIndex].patchValue({
            [field]: roundedNumber
        });
        field = this.getNextFieldY1(field);
    }
    this.recalculateAnnualTotalForecastY1(rowIndex)
    // this.formValue()
  }

  onPasteY2(event: ClipboardEvent, rowIndex: number, field: string): void {
    event.preventDefault();
    const clipboardData = event.clipboardData || window['clipboardData'];
    const pastedData = clipboardData.getData('text').split('\t');
    for (let i = 0; i < pastedData.length; i++) {
        const roundedNumber = Math.round(Number(pastedData[i]));
        this.forecastExcelForm.controls[rowIndex].value[field] = roundedNumber;
        this.forecastExcelForm.controls[rowIndex].patchValue({
            [field]: roundedNumber
        });
        field = this.getNextFieldY1(field);
    }
    this.recalculateAnnualTotalForecastY2(rowIndex)
    // this.formValue()
  }

  getNextField(field: string): string {
    switch (field) {
      case 'historicalActualFY14':
          return 'historicalActualFY15';
      case 'historicalActualFY15':
          return 'historicalActualFY16';
      case 'historicalActualFY16':
          return 'historicalActualFY17';
      case 'historicalActualFY17':
          return 'historicalActualFY18';
      case 'historicalActualFY18':
          return 'historicalActualFY19';
      case 'historicalActualFY19':
          return 'historicalActualFY20';
      case 'historicalActualFY20':
          return 'historicalActualFY21';
      case 'historicalActualFY21':
          return '';
      default:
          return '';
  }
  }

  getNextFieldY1(field: string): string {
    switch (field) {
      case 'apr':
        return 'may';
      case 'may':
        return 'jun';
      case 'jun':
        return 'jul';
      case 'jul':
        return 'aug';
      case 'aug':
        return 'sep';
      case 'sep':
        return 'oct';
      case 'oct':
        return 'nov';
      case 'nov':
        return 'dec';
      case 'dec':
        return 'jan';
      case 'jan':
        return 'feb';
      case 'feb':
        return 'mar';
      case 'mar':
        return '';
      default:
          return '';
  }
  }

  getNextFieldY2(field: string): string {
    switch (field) {
      case 'y1_Apr':
          return 'y1_May';
      case 'y1_May':
          return 'y1_Jun';
      case 'y1_Jun':
          return 'y1_Jul';
      case 'y1_Jul':
          return 'y1_Aug';
      case 'y1_Aug':
          return 'y1_Sep';
      case 'y1_Sep':
          return 'y1_Oct';
      case 'y1_Oct':
          return 'y1_Nov';
      case 'y1_Nov':
          return 'y1_Dec';
      case 'y1_Dec':
        return 'y1_Jan';
      case 'y1_Jan':
        return 'y1_Feb';
      case 'y1_Feb':
        return 'y1_Mar';
      case 'y1_Mar':
        return '';
      default:
          return '';
  }
  }

  recalculateAnnualTotal(index) {
    const isOpenEntry = this.historicalForm.controls[index];
    const newAnnualTotal =
            (isNaN(isOpenEntry.value.historicalActualFY14) ? 0 : isOpenEntry.value.historicalActualFY14) +
            (isNaN(isOpenEntry.value.historicalActualFY15) ? 0 : isOpenEntry.value.historicalActualFY15) +
            (isNaN(isOpenEntry.value.historicalActualFY16) ? 0 : isOpenEntry.value.historicalActualFY16) +
            (isNaN(isOpenEntry.value.historicalActualFY17) ? 0 : isOpenEntry.value.historicalActualFY17) +
            (isNaN(isOpenEntry.value.historicalActualFY18) ? 0 : isOpenEntry.value.historicalActualFY18) +
            (isNaN(isOpenEntry.value.historicalActualFY19) ? 0 : isOpenEntry.value.historicalActualFY19) +
            (isNaN(isOpenEntry.value.historicalActualFY20) ? 0 : isOpenEntry.value.historicalActualFY20) +
            (isNaN(isOpenEntry.value.historicalActualFY21) ? 0 : isOpenEntry.value.historicalActualFY21) ;
    isOpenEntry.patchValue({
      historicalActual: newAnnualTotal
    });
    this.forecastExcelHistorical[index].historicalActual = newAnnualTotal
    // this.forecastExcelHistorical.find(value => value.budgetHistoricalActualID === isOpenEntry.value.budgetHistoricalActualID).historicalActual = newAnnualTotal;
}

recalculateAnnualTotalForecastY1(index) {
  const isOpenEntry = this.forecastExcelForm.controls[index];
  const newAnnualTotal =
          (isNaN(isOpenEntry.value.apr) ? 0 : isOpenEntry.value.apr) +
          (isNaN(isOpenEntry.value.may) ? 0 : isOpenEntry.value.may) +
          (isNaN(isOpenEntry.value.jun) ? 0 : isOpenEntry.value.jun) +
          (isNaN(isOpenEntry.value.jul) ? 0 : isOpenEntry.value.jul) +
          (isNaN(isOpenEntry.value.aug) ? 0 : isOpenEntry.value.aug) +
          (isNaN(isOpenEntry.value.sep) ? 0 : isOpenEntry.value.sep) +
          (isNaN(isOpenEntry.value.oct) ? 0 : isOpenEntry.value.oct) +
          (isNaN(isOpenEntry.value.nov) ? 0 : isOpenEntry.value.nov) +
          (isNaN(isOpenEntry.value.dec) ? 0 : isOpenEntry.value.dec) +
          (isNaN(isOpenEntry.value.jan) ? 0 : isOpenEntry.value.jan) +
          (isNaN(isOpenEntry.value.feb) ? 0 : isOpenEntry.value.feb) +
          (isNaN(isOpenEntry.value.mar) ? 0 : isOpenEntry.value.mar) ;

  const newCummulativeTotal =
          (isNaN(isOpenEntry.value.y1) ? 0 : isOpenEntry.value.y1) +
          (isNaN(isOpenEntry.value.y2) ? 0 : isOpenEntry.value.y2) +
          (isNaN(isOpenEntry.value.y3) ? 0 : isOpenEntry.value.y3) +
          (isNaN(isOpenEntry.value.y4) ? 0 : isOpenEntry.value.y4) +
          (isNaN(newAnnualTotal) ? 0 : newAnnualTotal) +
          (isNaN(isOpenEntry.value.y5) ? 0 : isOpenEntry.value.y5) ;
  isOpenEntry.patchValue({
    annualTotal: newAnnualTotal,
    cumulativeTotal: newCummulativeTotal
  });
  this.forecastExcel[index].annualTotal = newAnnualTotal
  this.forecastExcel[index].cumulativeTotal = newCummulativeTotal
  // this.forecastExcelHistorical.find(value => value.budgetHistoricalActualID === isOpenEntry.value.budgetHistoricalActualID).historicalActual = newAnnualTotal;
}

recalculateAnnualTotalForecastY2(index) {
  const isOpenEntry = this.forecastExcelForm.controls[index];
  const newAnnualTotal =
          (isNaN(isOpenEntry.value.y1_Apr) ? 0 : isOpenEntry.value.y1_Apr) +
          (isNaN(isOpenEntry.value.y1_May) ? 0 : isOpenEntry.value.y1_May) +
          (isNaN(isOpenEntry.value.y1_Jun) ? 0 : isOpenEntry.value.y1_Jun) +
          (isNaN(isOpenEntry.value.y1_Jul) ? 0 : isOpenEntry.value.y1_Jul) +
          (isNaN(isOpenEntry.value.y1_Aug) ? 0 : isOpenEntry.value.y1_Aug) +
          (isNaN(isOpenEntry.value.y1_Sep) ? 0 : isOpenEntry.value.y1_Sep) +
          (isNaN(isOpenEntry.value.y1_Oct) ? 0 : isOpenEntry.value.y1_Oct) +
          (isNaN(isOpenEntry.value.y1_Nov) ? 0 : isOpenEntry.value.y1_Nov) +
          (isNaN(isOpenEntry.value.y1_Dec) ? 0 : isOpenEntry.value.y1_Dec) +
          (isNaN(isOpenEntry.value.y1_Jan) ? 0 : isOpenEntry.value.y1_Jan) +
          (isNaN(isOpenEntry.value.y1_Feb) ? 0 : isOpenEntry.value.y1_Feb) +
          (isNaN(isOpenEntry.value.y1_Mar) ? 0 : isOpenEntry.value.y1_Mar) ;

  const newCummulativeTotal =
          (isNaN(newAnnualTotal) ? 0 : newAnnualTotal) +
          (isNaN(isOpenEntry.value.y2) ? 0 : isOpenEntry.value.y2) +
          (isNaN(isOpenEntry.value.y3) ? 0 : isOpenEntry.value.y3) +
          (isNaN(isOpenEntry.value.y4) ? 0 : isOpenEntry.value.y4) +
          (isNaN(newAnnualTotal) ? 0 : newAnnualTotal) +
          (isNaN(isOpenEntry.value.y5) ? 0 : isOpenEntry.value.y5) ;
  isOpenEntry.patchValue({
    y1: newAnnualTotal,
    cumulativeTotal: newCummulativeTotal
  });
  this.forecastExcel[index].y1 = newAnnualTotal
  this.forecastExcel[index].cumulativeTotal = newCummulativeTotal
  // this.forecastExcelHistorical.find(value => value.budgetHistoricalActualID === isOpenEntry.value.budgetHistoricalActualID).historicalActual = newAnnualTotal;
}

SubmitData(){
  if(this.ForecastForm.controls.DataType.value == "Forecast"){
    var dataToSend = this.forecastExcelForm.getRawValue()
    this.portfoliService.putForecastExcelData(dataToSend).then((forecastData : any) => {
      this.showDataForecast = false
      this.getData()
      this.fTableEditStack = []
      this.PortfolioCenterService.successSave.next(true)
    })
  }
  else{
    var dataToSend = this.historicalForm.getRawValue()
    this.portfoliService.putHistoricalExcelData(dataToSend).then((historicalData : any) => {
      this.showData = false
      this.getData()
      this.hTableEditStack = []
      this.PortfolioCenterService.successSave.next(true)
    })
  }
}

}
