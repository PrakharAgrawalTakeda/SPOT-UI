import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PortfolioCenterService } from '../../portfolio-center.service';
import { PortfolioApiService } from '../../portfolio-api.service';
import { BudgetService } from 'app/modules/project-hub/budget/budget.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forecast-bulk-edit',
  templateUrl: './forecast-bulk-edit.component.html',
  styleUrls: ['./forecast-bulk-edit.component.scss']
})
export class ForecastBulkEditComponent {
  @Input() projectFunding: any;
  ForecastBulkEdit: string = 'ForecastBulkEdit';
  forecastData: any;
  projectCAPEXdata: any;
  //projectFunding:any = []
  projectOPEXdata: any;
  showContent = false
  yearLabel: any = []
  localCurrency: any = [];
  filterdata: any;
  CAPEXdata = []
  OPEXdata = []
  fundingRequests: any = []
  fTableEditStack = []
  editable: boolean = true;
  forecastsForm = new FormArray([])
  forecastsDb = []
  openEntry: any;
  year1Value = 1;
  forecastsSubmit = []
constructor(public PortfolioCenterService: PortfolioCenterService, private portfoliService: PortfolioApiService, public budgetService: BudgetService, private cdRef: ChangeDetectorRef)
{
  
}

  ngOnInit(): void {
    this.filterdata = JSON.parse(JSON.stringify(this.PortfolioCenterService.all))
    //console.log(projectFunding)
    console.log(this.filterdata)
    this.dataloader()
  }

  dataloader()
  {
    this.portfoliService.getForecastData(this.filterdata).then((forecastData: any) => {
    this.portfoliService.getLocalCurrency().then(currency => {
      this.forecastData = forecastData
      if(forecastData.forecastTableItems != null){
        this.CAPEXdata = forecastData.forecastTableItems["CapExForecast|OY"]
        this.OPEXdata = forecastData.forecastTableItems["OpExForecast|OY"]
        this.fundingRequests = forecastData.forecastTableItems["CapExForecast|OY"]
        if (forecastData.forecastProjectItems.CapExForecast != undefined){
          this.projectCAPEXdata = forecastData.forecastProjectItems.CapExForecast
          this.projectFunding = forecastData.forecastProjectItems.CapExForecast
        }
        if (forecastData.forecastProjectItems.OpExForecast != undefined) {
          this.projectOPEXdata = forecastData.forecastProjectItems.OpExForecast
        }
        
        this.projectFunding.sort((a, b) => {
          return (a.problemID < b.problemID ? -1 : a.problemID == b.problemID ? 0 : 1);
        })
        this.yearLabel.currentYear = forecastData.yearLabels.FY
        this.yearLabel.NextYear = forecastData.yearLabels["FY+1"]
        this.yearLabel.Y1 = forecastData.yearLabels["FY+2"]
        this.yearLabel.Y2 = forecastData.yearLabels["FY+3"]
        this.yearLabel.Y3 = forecastData.yearLabels["FY+4"]
        this.yearLabel.Y4 = forecastData.yearLabels["5+"]
        this.localCurrency = currency
      }
      this.forecastsDb = this.projectFunding.map(x => {
        return {
        "budgetGlobalID": x.budgetGlobalID,
        "dateMasterID": x.dateMasterID,
        "financialMonthStartDate": x.financialMonthStartDate,
        "active": x.active,
        "activeID": x.activeID,
        "periodName": x.periodName,
        "isopen": x.isopen,
        "budgetDataTypeID": x.budgetDataTypeID,
        "budgetData": x.budgetData,
        "budgetDataID": x.budgetDataID,
        "capitalBudgetID": x.capitalBudgetID,
        "projectID": x.projectID,
        "historical": x.historical,
        "apr": x.apr,
        "may": x.may,
        "jun": x.jun,
        "jul": x.jul,
        "aug": x.aug,
        "sep": x.sep,
        "oct": x.oct,
        "nov": x.nov,
        "dec": x.dec,
        "jan": x.jan,
        "feb": x.feb,
        "mar": x.mar,
        "annualTotal": x.annualTotal,
        "budgetDataIDY1": x.budgetDataIDY1,
        "janY1": x.janY1,
        "febY1": x.febY1,
        "marY1": x.marY1,
        "aprY1": x.aprY1,
        "mayY1": x.mayY1,
        "junY1": x.junY1,
        "julY1": x.julY1,
        "augY1": x.augY1,
        "sepY1": x.sepY1,
        "octY1": x.octY1,
        "novY1": x.novY1,
        "decY1": x.decY1,
        "annualTotalY1": x.annualTotalY1,
        "y2": x.y2,
        "y3": x.y3,
        "y4": x.y4,
        "y5": x.y5,
        "cumulativeTotal": x.cumulativeTotal,
        "lastSubmitted": x.lastSubmitted,
        "actualMonths": x.actualMonths,
        "projectName": x.projectName,
        "problemID": x.problemID,
        "localCurrencyAbbreviation": x.localCurrencyAbbreviation,
        "oyAbbreviation": x.oyAbbreviation,
        "submittedForPeriod": x.submittedForPeriod,
        "pm": x.pm,
        "submittedBy": x.submittedBy,
        "submittedByName": x.submittedByName,
        "isCapexRequired": x.isCapexRequired,
        "isOpexRequired": x.isOpexRequired
    }
  })
  this.year1Value = this.projectFunding.find(x => x.isopen == 1).annualTotalY1;
  for (var i of this.projectFunding) {
    this.forecastsForm.push(new FormGroup({
      budgetGlobalID: new FormControl(i.budgetGlobalID),
      dateMasterID: new FormControl(i.dateMasterID),
      financialMonthStartDate: new FormControl(i.financialMonthStartDate),
      active: new FormControl(i.active),
      activeID: new FormControl(i.activeID),
      periodName: new FormControl(i.periodName),
      isopen: new FormControl(i.isopen),
      budgetDataTypeID: new FormControl(i.budgetDataTypeID),
      budgetData: new FormControl(i.budgetData),
      budgetDataID: new FormControl(i.budgetDataID),
      capitalBudgetID: new FormControl(i.capitalBudgetID),
      projectID: new FormControl(i.projectID),
      historical: new FormControl(i.historical),
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
      mar: new FormControl(i.mar),
      annualTotal: new FormControl(i.annualTotal),
      budgetDataIDY1: new FormControl(i.budgetDataIDY1),
      janY1: new FormControl(i.janY1),
      febY1: new FormControl(i.febY1),
      marY1: new FormControl(i.marY1),
      aprY1: new FormControl(i.aprY1),
      mayY1: new FormControl(i.mayY1),
      junY1: new FormControl(i.junY1),
      julY1: new FormControl(i.julY1),
      augY1: new FormControl(i.augY1),
      sepY1: new FormControl(i.sepY1),
      octY1: new FormControl(i.octY1),
      novY1: new FormControl(i.novY1),
      decY1: new FormControl(i.decY1),
      annualTotalY1: new FormControl(i.annualTotalY1),
      y2: new FormControl(i.y2),
      y3: new FormControl(i.y3),
      y4: new FormControl(i.y4),
      y5: new FormControl(i.y5),
      cumulativeTotal: new FormControl(i.cumulativeTotal),
      lastSubmitted: new FormControl(i.lastSubmitted),
      actualMonths: new FormControl(i.actualMonths),
      projectName: new FormControl(i.projectName),
      problemID: new FormControl(i.problemID),
      localCurrencyAbbreviation: new FormControl(i.localCurrencyAbbreviation),
      oyAbbreviation: new FormControl(i.oyAbbreviation),
      submittedForPeriod: new FormControl(i.submittedForPeriod),
      pm: new FormControl(i.pm),
      submittedBy: new FormControl(i.submittedBy),
      submittedByName: new FormControl(i.submittedByName),
      isCapexRequired: new FormControl(i.isCapexRequired),
      isOpexRequired: new FormControl(i.isOpexRequired)
    }), { emitEvent: false })
}
      console.log(this.projectFunding)
this.showContent = true
    })
    })
  }

  fTableEditRow(rowIndex) {
    if (!this.fTableEditStack.includes(rowIndex) && this.editable) {
        if (this.projectFunding[rowIndex].isopen) {
            this.fTableEditStack.push(rowIndex)
        }
    }
}

getRowStyle(month:string,isEditable:boolean, row:any){
  if(!isEditable || !row.isopen){
      return 'closed'
  }
  if(this.budgetService.firstPreliminary==month){
      return 'blue-text'
  }
}

onPaste(event: ClipboardEvent, rowIndex: number, field: string): void {
  event.preventDefault();
  const clipboardData = event.clipboardData || window['clipboardData'];
  const pastedData = clipboardData.getData('text').split('\t');
  for (let i = 0; i < pastedData.length; i++) {
      let cleanedValue = pastedData[i].replace(/,/g, '');
      const roundedNumber = Math.round(cleanedValue);
      this.forecastsForm.controls[rowIndex].value[field] = roundedNumber;
      this.forecastsForm.controls[rowIndex].patchValue({
          [field]: roundedNumber
      });
      field = this.getNextField(field);
  }
  this.recalculateAnnualTotal()
  this.formValue()
}

recalculateAnnualTotal() {
  const isOpenEntry = this.forecastsForm.controls.find(control => control.get('isopen').value == 1);
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
      (isNaN(isOpenEntry.value.mar) ? 0 : isOpenEntry.value.mar);
      const newAnnualTotalY1 = 
      (isNaN(isOpenEntry.value.aprY1) ? 0 : isOpenEntry.value.aprY1) +
      (isNaN(isOpenEntry.value.mayY1) ? 0 : isOpenEntry.value.mayY1) +
      (isNaN(isOpenEntry.value.junY1) ? 0 : isOpenEntry.value.junY1) +
      (isNaN(isOpenEntry.value.julY1) ? 0 : isOpenEntry.value.julY1) +
      (isNaN(isOpenEntry.value.augY1) ? 0 : isOpenEntry.value.augY1) +
      (isNaN(isOpenEntry.value.sepY1) ? 0 : isOpenEntry.value.sepY1) +
      (isNaN(isOpenEntry.value.octY1) ? 0 : isOpenEntry.value.octY1) +
      (isNaN(isOpenEntry.value.novY1) ? 0 : isOpenEntry.value.novY1) +
      (isNaN(isOpenEntry.value.decY1) ? 0 : isOpenEntry.value.decY1) +
      (isNaN(isOpenEntry.value.janY1) ? 0 : isOpenEntry.value.janY1) +
      (isNaN(isOpenEntry.value.febY1) ? 0 : isOpenEntry.value.febY1) +
      (isNaN(isOpenEntry.value.marY1) ? 0 : isOpenEntry.value.marY1);
      isOpenEntry.patchValue({
        annualTotal: newAnnualTotal
    });
    this.projectFunding.find(value => value.isopen === true).annualTotal = newAnnualTotal;
    //this.recalculateTotalCapex()
  this.projectFunding = this.projectFunding.map(forecast => {
    if (forecast.isopen == 1) {
        return {...forecast, annualTotalY1: newAnnualTotalY1};
    } else {
        return forecast;
    }
});
if(this.projectFunding.budgetData=='CapEx Forecast'){
    if(this.projectFunding.find(x => x.active == 'Preliminary')){
        this.projectFunding.find(x => x.active == 'Preliminary').annualTotalY1 = newAnnualTotalY1;
        this.projectFunding.find(x => x.active == 'Preliminary').annualTotal = newAnnualTotal;
        this.year1Value =newAnnualTotalY1;
        this.forecastsForm.controls.find(control => control.get('budgetData').value == "CapEx Forecast" && control.get('active').value=="Preliminary").patchValue({
          annualTotalY1: newAnnualTotalY1
        }, {emitEvent : false});
    }else{
        this.projectFunding.find(x => x.active == 'Current').annualTotalY1 = newAnnualTotalY1;
        this.projectFunding.find(x => x.active == 'Current').annualTotal = newAnnualTotal;
        this.year1Value =newAnnualTotalY1;
        this.forecastsForm.controls.find(control => control.get('budgetData').value == "CapEx Forecast" && control.get('active').value=="Current").patchValue({
          annualTotalY1: newAnnualTotalY1
        } );
    }
}else {
    if(this.projectFunding.find(x => x.active == 'Preliminary')){
        this.projectFunding.find(x => x.active == 'Preliminary').annualTotalY1 = newAnnualTotalY1;
        this.projectFunding.find(x => x.active == 'Preliminary').annualTotal = newAnnualTotal;
        this.year1Value =newAnnualTotalY1;
        this.forecastsForm.controls.find(control => control.get('budgetData').value == "OpEx Forecast" && control.get('active').value=="Preliminary").patchValue({
          annualTotalY1: newAnnualTotalY1
        }, {emitEvent : false});
    }else{
        this.projectFunding.find(x => x.active == 'Current').annualTotalY1 = newAnnualTotalY1;
        this.projectFunding.find(x => x.active == 'Current').annualTotal = newAnnualTotal;
        this.year1Value =newAnnualTotalY1;
        this.forecastsForm.controls.find(control => control.get('budgetData').value == "OpEx Forecast" && control.get('active').value=="Current").patchValue({
          annualTotalY1: newAnnualTotalY1
        }, {emitEvent : false});
    }
}

this.cdRef.detectChanges();
this.recalculateTotalCapex();

}

recalculateTotalCapex() {
  const isOpenEntry = this.forecastsForm.controls.find(control => control.get('isopen').value == 1);
  const newTotal =
      (isNaN(isOpenEntry.value.annualTotal) ? 0 : isOpenEntry.value.annualTotal) +
      (isNaN(isOpenEntry.value.historical) ? 0 : isOpenEntry.value.historical) +
      (isNaN(isOpenEntry.value.y1) ? 0 : isOpenEntry.value.y1) +
      (isNaN(isOpenEntry.value.y2) ? 0 : isOpenEntry.value.y2) +
      (isNaN(isOpenEntry.value.y3) ? 0 : isOpenEntry.value.y3) +
      (isNaN(isOpenEntry.value.y4) ? 0 : isOpenEntry.value.y4) +
      (isNaN(isOpenEntry.value.y5) ? 0 : isOpenEntry.value.y5);
  isOpenEntry.patchValue({
      cumulativeTotal: newTotal
  });
  const isOpenForecast = this.projectFunding.find(value => value.isopen == 1);
  if (isOpenForecast) {
      this.openEntry.cumulativeTotal = newTotal;
      this.projectFunding = this.projectFunding.map(forecast => {
          if (forecast.isopen == 1) {
              return this.openEntry;
          } else {
              return forecast;
          }
      });
      this.cdRef.detectChanges();
  }
  this.budgetService.setTextColors();
  this.formValue()
}

formValue() {
  var form = this.forecastsForm.getRawValue()
  if (form.length > 0) {
      this.forecastsSubmit = []
      for (var i of form) {
          this.forecastsSubmit.push({
            "budgetGlobalID": i.budgetGlobalID,
            "dateMasterID": i.dateMasterID,
            "financialMonthStartDate": i.financialMonthStartDate,
            "active": i.active,
            "activeID": i.activeID,
            "periodName": i.periodName,
            "isopen": i.isopen,
            "budgetDataTypeID": i.budgetDataTypeID,
            "budgetData": i.budgetData,
            "budgetDataID": i.budgetDataID,
            "capitalBudgetID": i.capitalBudgetID,
            "projectID": i.projectID,
            "historical": i.historical,
            "apr": i.apr,
            "may": i.may,
            "jun": i.jun,
            "jul": i.jul,
            "aug": i.aug,
            "sep": i.sep,
            "oct": i.oct,
            "nov": i.nov,
            "dec": i.dec,
            "jan": i.jan,
            "feb": i.feb,
            "mar": i.mar,
            "annualTotal": i.annualTotal,
            "budgetDataIDY1": i.budgetDataIDY1,
            "janY1": i.janY1,
            "febY1": i.febY1,
            "marY1": i.marY1,
            "aprY1": i.aprY1,
            "mayY1": i.mayY1,
            "junY1": i.junY1,
            "julY1": i.julY1,
            "augY1": i.augY1,
            "sepY1": i.sepY1,
            "octY1": i.octY1,
            "novY1": i.novY1,
            "decY1": i.decY1,
            "annualTotalY1": i.annualTotalY1,
            "y2": i.y2,
            "y3": i.y3,
            "y4": i.y4,
            "y5": i.y5,
            "cumulativeTotal": i.cumulativeTotal,
            "lastSubmitted": i.lastSubmitted,
            "actualMonths": i.actualMonths,
            "projectName": i.projectName,
            "problemID": i.problemID,
            "localCurrencyAbbreviation": i.localCurrencyAbbreviation,
            "oyAbbreviation": i.oyAbbreviation,
            "submittedForPeriod": i.submittedForPeriod,
            "pm": i.pm,
            "submittedBy": i.submittedBy,
            "submittedByName": i.submittedByName,
            "isCapexRequired": i.isCapexRequired,
            "isOpexRequired": i.isOpexRequired 
          })
      }
  } else {
      this.forecastsSubmit = []
  }
}

getNextField(field: string): string {
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
      case 'y2':
          return 'y3';
      case 'y3':
          return 'y4';
      case 'y4':
          return 'y5';
      case 'mar':
          return '';
      default:
          return '';
  }
}

submitForecasts() {

}

}
