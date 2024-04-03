import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PortfolioCenterService } from '../../portfolio-center.service';
import { PortfolioApiService } from '../../portfolio-api.service';
import { BudgetService } from 'app/modules/project-hub/budget/budget.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';

@Component({
  selector: 'app-forecast-bulk-edit',
  templateUrl: './forecast-bulk-edit.component.html',
  styleUrls: ['./forecast-bulk-edit.component.scss']
})
export class ForecastBulkEditComponent {
  isFirstTimeReload = true;
  @Input() projectFunding: any;
  @Input() type: 'capex' | 'opex' = 'capex'
  ForecastBulkEdit: string = 'ForecastBulkEdit';
  ForecastBulkEditO: string = 'ForecastBulkEditO';
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
  projectFundingOpex: any;
  today = new Date();
  newmainnav: FuseNavigationItem[];
constructor(public PortfolioCenterService: PortfolioCenterService, public _fuseNavigationService: FuseNavigationService, private _Activatedroute: ActivatedRoute,private apiService: PortfolioApiService,public fuseAlert: FuseConfirmationService, public projecthubservice: ProjectHubService, private portfoliService: PortfolioApiService, public budgetService: BudgetService, private cdRef: ChangeDetectorRef)
{
//   this.PortfolioCenterService.refreshEditBookmarkComponent.subscribe(
//     () => {
//         if (this.isFirstTimeReload) {
//             this.isFirstTimeReload = false;
//         } else {
//             this.ngOnInit();
//         }
//     }
// );
  this.forecastsForm.valueChanges.subscribe(() => {
    this.formValue();
    this.projecthubservice.isFormChanged = JSON.stringify(this.forecastsDb) != JSON.stringify(this.forecastsSubmit);
    if(this.projecthubservice.isFormChanged){
        window.onbeforeunload = this.showConfirmationMessage;
    }
});
}

//  ngOnChanges() : void {
//   this.openEntry = this.forecastsForm.controls.find(control => control.get('isopen').value == 1)
// //   this.dataloader()
// //   debugger
// //   if(this.type == 'CapEx Forecast')
// //   {
// //     this.openEntry = this.projecthubservice.all.budgetForecasts.find(x => x.isopen === true && x.budgetData == "CapEx Forecast");
// //   }

//  }

  ngOnInit(): void {
    this.filterdata = JSON.parse(JSON.stringify(this.PortfolioCenterService.all))
    console.log(this.filterdata)
    this.dataloader()
  }

  dataloader()
  {
    console.log(this.type)
    this.portfoliService.getForecastData(this.filterdata).then((forecastData: any) => {
    this.portfoliService.getLocalCurrency().then(currency => {
      this.forecastData = forecastData
      console.log(this.forecastData)
      if(forecastData.forecastTableItems != null){
        this.CAPEXdata = forecastData.forecastTableItems["CapExForecast|OY"]
        this.OPEXdata = forecastData.forecastTableItems["OpExForecast|OY"]
        this.fundingRequests = forecastData.forecastTableItems["CapExForecast|OY"]

        if (forecastData.forecastProjectItems.CapExForecast != undefined){
          this.projectCAPEXdata = forecastData.forecastProjectItems.CapExForecast
          this.projectFunding = forecastData.forecastProjectItems.CapExForecast
          //this.type = 'CapEx Forecast'
        }
        if (forecastData.forecastProjectItems.OpExForecast != undefined) {
          this.projectOPEXdata = forecastData.forecastProjectItems.OpExForecast
          //this.projectFundingOpex = forecastData.forecastProjectItems.OpExForecast
          //this.type = 'OpEx Forecast'
        }
        if(this.type == 'opex')
        {
          this.projectFunding = forecastData.forecastProjectItems.OpExForecast
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
console.log(this.projectFunding)

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
  console.log(this.forecastsDb)
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
//this.type = this.projectFunding.find(x => x.isopen == 1).budgetData
      console.log(this.type)
this.showContent = true
    })
    })
    this.formValue()
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
  if(this.forecastsSubmit.length > 0)
  {
    const updatedProjectFunding = this.projectFunding.map((project, index) => {
      if (project.isopen === 1) {
        const control = this.forecastsForm.controls[index];

        const newAnnualTotal =
        (isNaN(control.value.apr) ? 0 : control.value.apr) +
        (isNaN(control.value.may) ? 0 : control.value.may) +
        (isNaN(control.value.jun) ? 0 : control.value.jun) +
        (isNaN(control.value.jul) ? 0 : control.value.jul) +
        (isNaN(control.value.aug) ? 0 : control.value.aug) +
        (isNaN(control.value.sep) ? 0 : control.value.sep) +
        (isNaN(control.value.oct) ? 0 : control.value.oct) +
        (isNaN(control.value.nov) ? 0 : control.value.nov) +
        (isNaN(control.value.dec) ? 0 : control.value.dec) +
        (isNaN(control.value.jan) ? 0 : control.value.jan) +
        (isNaN(control.value.feb) ? 0 : control.value.feb) +
        (isNaN(control.value.mar) ? 0 : control.value.mar);
        const newAnnualTotalY1 = 
        (isNaN(control.value.aprY1) ? 0 : control.value.aprY1) +
        (isNaN(control.value.mayY1) ? 0 : control.value.mayY1) +
        (isNaN(control.value.junY1) ? 0 : control.value.junY1) +
        (isNaN(control.value.julY1) ? 0 : control.value.julY1) +
        (isNaN(control.value.augY1) ? 0 : control.value.augY1) +
        (isNaN(control.value.sepY1) ? 0 : control.value.sepY1) +
        (isNaN(control.value.octY1) ? 0 : control.value.octY1) +
        (isNaN(control.value.novY1) ? 0 : control.value.novY1) +
        (isNaN(control.value.decY1) ? 0 : control.value.decY1) +
        (isNaN(control.value.janY1) ? 0 : control.value.janY1) +
        (isNaN(control.value.febY1) ? 0 : control.value.febY1) +
        (isNaN(control.value.marY1) ? 0 : control.value.marY1);

       
        control.patchValue({
          annualTotal: newAnnualTotal,
          annualTotalY1: newAnnualTotalY1,
        }, {emitEvent: false});

        // Return updated project object
        return {...project, annualTotal: newAnnualTotal, annualTotalY1: newAnnualTotalY1};
      }
      return project; // Return unchanged project if not open
    });

    // Update the state atomically
    this.projectFunding = updatedProjectFunding;
    this.cdRef.detectChanges();
    this.recalculateTotalCapex();
  }

//     this.forecastsForm.controls.forEach((control, index) => {
//       if (control.get('isopen').value == 1) {
//     //console.log(isOpenEntry)
//     const newAnnualTotal =
//         (isNaN(control.value.apr) ? 0 : control.value.apr) +
//         (isNaN(control.value.may) ? 0 : control.value.may) +
//         (isNaN(control.value.jun) ? 0 : control.value.jun) +
//         (isNaN(control.value.jul) ? 0 : control.value.jul) +
//         (isNaN(control.value.aug) ? 0 : control.value.aug) +
//         (isNaN(control.value.sep) ? 0 : control.value.sep) +
//         (isNaN(control.value.oct) ? 0 : control.value.oct) +
//         (isNaN(control.value.nov) ? 0 : control.value.nov) +
//         (isNaN(control.value.dec) ? 0 : control.value.dec) +
//         (isNaN(control.value.jan) ? 0 : control.value.jan) +
//         (isNaN(control.value.feb) ? 0 : control.value.feb) +
//         (isNaN(control.value.mar) ? 0 : control.value.mar);
//         const newAnnualTotalY1 = 
//         (isNaN(control.value.aprY1) ? 0 : control.value.aprY1) +
//         (isNaN(control.value.mayY1) ? 0 : control.value.mayY1) +
//         (isNaN(control.value.junY1) ? 0 : control.value.junY1) +
//         (isNaN(control.value.julY1) ? 0 : control.value.julY1) +
//         (isNaN(control.value.augY1) ? 0 : control.value.augY1) +
//         (isNaN(control.value.sepY1) ? 0 : control.value.sepY1) +
//         (isNaN(control.value.octY1) ? 0 : control.value.octY1) +
//         (isNaN(control.value.novY1) ? 0 : control.value.novY1) +
//         (isNaN(control.value.decY1) ? 0 : control.value.decY1) +
//         (isNaN(control.value.janY1) ? 0 : control.value.janY1) +
//         (isNaN(control.value.febY1) ? 0 : control.value.febY1) +
//         (isNaN(control.value.marY1) ? 0 : control.value.marY1);
//         control.patchValue({
//           annualTotal: newAnnualTotal,
//           annualTotalY1: newAnnualTotalY1
//       }, { emitEvent: false });
//       if (this.projectFunding[index] && this.projectFunding[index].isopen == 1) {
//         this.projectFunding[index] = { ...this.projectFunding[index], annualTotal: newAnnualTotal, annualTotalY1: newAnnualTotalY1 };
//       }
//   //});
//   console.log(this.projectFunding)

// }
//     })
//   this.cdRef.detectChanges();
//   this.recalculateTotalCapex();
//   }
  

}


recalculateTotalCapex() {
  if(this.forecastsSubmit.length > 0)
  {
    const updatedProjectFunding = this.projectFunding.map((project, index) => {
      // Check if the project is open
      if (project.isopen === 1) {
        const control = this.forecastsForm.controls[index];
    // Calculate the new total capex
    const newTotal = [
      control.value.annualTotal,
      control.value.historical,
      control.value.annualTotalY1,
      control.value.y2,
      control.value.y3,
      control.value.y4,
      control.value.y5
    ].reduce((total, value) => total + (isNaN(value) ? 0 : parseFloat(value)), 0);

    // Update the form control for cumulativeTotal
    control.patchValue({
      cumulativeTotal: newTotal
    }, { emitEvent: false });

    // Return a new object for the project with the updated cumulativeTotal
    return { ...project, cumulativeTotal: newTotal };
  }
  // For projects that are not open or don't need updating, return them unchanged
  return project;
});


this.projectFunding = updatedProjectFunding;
this.cdRef.detectChanges(); 
this.formValue(); 
}
}

formValue() {
  //this.recalculateAnnualTotal()
  //this.recalculateTotalCapex()
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
  //console.log(this.forecastsSubmit)
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
  if (JSON.stringify(this.forecastsDb) != JSON.stringify(this.forecastsSubmit)) {
    this.projecthubservice.isFormChanged = false

  const submitData = this.forecastsSubmit.map(item => {
    return {
      projectId: item.projectID, 
      budgetForecastData: {
        budgetDataId: item.budgetDataID,
        budgetGlobalId: item.budgetGlobalID,
        projectId: item.projectID,
        budgetDataTypeId: item.budgetDataTypeID,
        apr: item.apr,
        may: item.may,
        jun: item.jun,
        jul: item.jul,
        aug: item.aug,
        sep: item.sep,
        oct: item.oct,
        nov: item.nov,
        dec: item.dec,
        jan: item.jan,
        feb: item.feb,
        mar: item.mar,
        y1: item.annualTotalY1, 
        y2: item.y2,
        y3: item.y3,
        y4: item.y4,
        y5: item.y5,
        lastSubmitted: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
        submittedById: this._Activatedroute.parent.snapshot.paramMap.get("id"), 
        annualTotal: item.annualTotal,
        cumulativeTotal: item.cumulativeTotal,
        afpdeviationCodeId: null, 
        mtdpdeviationCodeId: null, 
        committedSpend: 0
      },
      budgetForecastDataY1: {
        budgetDataId: item.budgetDataIDY1,
        budgetGlobalId: item.budgetGlobalID, 
        projectId: item.projectID,
        budgetDataTypeId: item.budgetDataTypeID, 
        apr: item.aprY1,
        may: item.mayY1,
        jun: item.junY1,
        jul: item.julY1,
        aug: item.augY1,
        sep: item.sepY1,
        oct: item.octY1,
        nov: item.novY1,
        dec: item.decY1,
        jan: item.janY1,
        feb: item.febY1,
        mar: item.marY1
      }
    };
  });
  
  console.log(submitData);

  this.apiService.updateForecast(submitData).then(res => {
     this.PortfolioCenterService.isNavChanged.next(true)
     this.PortfolioCenterService.submitbutton.next(true)
     this.PortfolioCenterService.successSave.next(true)
    this.PortfolioCenterService.toggleForecastDrawerOpen('ForecastBulkEdit','',[],false)
    this.PortfolioCenterService.triggerRefresh();

})
} else {
this.PortfolioCenterService.submitbutton.next(true)
this.PortfolioCenterService.toggleForecastDrawerOpen('ForecastBulkEdit','',[],false)
this.PortfolioCenterService.toggleDrawerOpenSmall('BudgetSpendOpen', '',[],'')
this.PortfolioCenterService.isNavChanged.next(true)
}
  
}

showConfirmationMessage(event) {
  const confirmationMessage = 'Are you sure you want to exit? All unsaved data will be lost.';
  (event || window.event).returnValue = confirmationMessage;
  return confirmationMessage;
}

}
