import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ProjectHubService} from "../../project-hub.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {RoleService} from "../../../../core/auth/role.service";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-budget-forecast-bulk-edit',
    templateUrl: './budget-forecast-bulk-edit.component.html',
    styleUrls: ['./budget-forecast-bulk-edit.component.scss']
})
export class BudgetForecastBulkEditComponent {
    @Input() mode: 'Capex' | 'Opex' = 'Capex';
    constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public authService: AuthService, public role: RoleService,
                public fuseAlert: FuseConfirmationService, private _Activatedroute: ActivatedRoute,private cdRef: ChangeDetectorRef) {
        this.forecastsForm.valueChanges.subscribe(res => {
                this.formValue()
                this.projecthubservice.isFormChanged = JSON.stringify(this.forecastsDb) != JSON.stringify(this.forecastsSubmit);
        })
    }

    id: string = "";
    forecasts = []
    forecastsY1 = []
    extraEntries = [];
    extraEntriesY1 = [];
    forecastsDb = []
    forecastsY1Db = []
    forecastsSubmit = []
    forecastsY1Submit = []
    viewContent: boolean = false
    lookupdata: any[]
    fTableEditStack = []
    fy1TableEditStack = []
    csTableEditStack = []
    forecastsForm = new FormArray([])
    forecastsY1Form = new FormArray([])
    csForm = new FormArray([])
    committedSpend: number = 0;
    csTable = []

    ngOnInit(): void {
        if(this.mode=="Capex"){
            for (const obj of this.projecthubservice.all.budgetForecasts) {
                if (obj.budgetData === "CapEx Forecast") {
                    this.forecasts.push(obj);
                } else if (obj.budgetData === "OpEx Forecast") {
                    this.extraEntries.push(obj);
                }
            }
            this.csTable.push(this.projecthubservice.all.budgetForecasts.find(x => x.isopen=== true))
            for (const obj of this.projecthubservice.all.budgetForecastsY1) {
                if (obj.budgetData === "CapEx Forecast") {
                    this.forecastsY1.push(obj);
                } else if (obj.budgetData === "OpEx Forecast") {
                    this.extraEntriesY1.push(obj);
                }
            }
        }else{
            for (const obj of this.projecthubservice.all.budgetForecasts) {
                if (obj.budgetData === "OpEx Forecast") {
                    this.forecasts.push(obj);
                } else if (obj.budgetData === "CapEx Forecast") {
                    this.extraEntries.push(obj);
                }
            }
            this.csTable.push(this.projecthubservice.all.budgetForecasts.find(x => x.isopen=== true))
            for (const obj of this.projecthubservice.all.budgetForecastsY1) {
                if (obj.budgetData === "OpEx Forecast") {
                    this.forecastsY1.push(obj);
                } else if (obj.budgetData === "CapEx Forecast") {
                    this.extraEntriesY1.push(obj);
                }
            }
        }
        this.dataloader()
    }

    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
            if (this.forecasts.length > 0) {
                this.forecastsDb = this.forecasts.map(x => {
                    return {
                        "active": x.active,
                        "localCurrencyAbbreviation": x.localCurrencyAbbreviation,
                        "historical": x.historical,
                        "apr": x.apr,
                        "may": x.may,
                        "jun": x.jun,
                        "jul": x.jul,
                        "aug": x.aug,
                        "sep": x.jun,
                        "oct": x.oct,
                        "nov": x.nov,
                        "dec": x.dec,
                        "jan": x.jan,
                        "feb": x.feb,
                        "mar": x.mar,
                        "annualTotal": x.annualTotal,
                        "y1": x.y1,
                        "y2": x.y2,
                        "y3": x.y3,
                        "y4": x.y4,
                        "y5": x.y5,
                        "cumulativeTotal": x.cumulativeTotal,
                        "isOpen": x.isopen,
                        "activeID": x.activeID,
                        "activeOrder": x.activeOrder,
                        "actualMonths": x.actualMonths,
                        "afpDeviationCodeID": x.afpDeviationCodeID,
                        "budgetData": x.budgetData,
                        "budgetDataID": x.budgetDataID,
                        "budgetDataTypeID": x.budgetDataTypeID,
                        'budgetGlobalID': x.budgetGlobalID,
                        "committedSpend": x.committedSpend,
                        "dateMasterID": x.dateMasterID,
                        "financialMonthStartDate": x.financialMonthStartDate,
                        "label": x.label,
                        "labelID": x.labelID,
                        "lastSubmitted": x.lastSubmitted,
                        "mtdpDeviationCodeID": x.mtdpDeviationCodeID,
                        "periodName": x.periodName,
                        "projectID": x.projectID,
                        "submittedByID": x.submittedByID,
                        "userName": x.userName,
                    }
                })
                if (this.forecastsY1.length > 0) {
                    this.forecastsY1Db = this.forecastsY1.map(x => {
                        return {
                            'budgetGlobalID': x.budgetGlobalID,
                            "dateMasterID": x.dateMasterID,
                            "localCurrencyAbbreviation": x.localCurrencyAbbreviation,
                            "financialMonthStartDate": x.financialMonthStartDate,
                            "label": x.label,
                            "labelID": x.labelID,
                            "active": x.active,
                            "activeID": x.activeID,
                            "isOpen": x.isopen,
                            "budgetData": x.budgetData,
                            "budgetDataID": x.budgetDataID,
                            "budgetDataTypeID": x.budgetDataTypeID,
                            "projectID": x.projectID,
                            "apr": x.apr,
                            "may": x.may,
                            "jun": x.jun,
                            "jul": x.jul,
                            "aug": x.aug,
                            "sep": x.jun,
                            "oct": x.oct,
                            "nov": x.nov,
                            "dec": x.dec,
                            "jan": x.jan,
                            "feb": x.feb,
                            "mar": x.mar,
                        }
                    })
                }
                for (var i of this.forecasts) {
                    this.forecastsForm.push(new FormGroup({
                        active: new FormControl(i.active),
                        localCurrencyAbbreviation: new FormControl(i.localCurrencyAbbreviation),
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
                        y1: new FormControl(i.y1),
                        y2: new FormControl(i.y2),
                        y3: new FormControl(i.y3),
                        y4: new FormControl(i.y4),
                        y5: new FormControl(i.y5),
                        cumulativeTotal: new FormControl(i.cumulativeTotal),
                        isopen: new FormControl(i.isopen),
                        activeID: new FormControl(i.activeID),
                        activeOrder:  new FormControl(i.activeOrder),
                        actualMonths: new FormControl(i.actualMonths),
                        afpDeviationCodeID:  new FormControl(i.afpDeviationCodeID),
                        budgetData: new FormControl(i.budgetData),
                        budgetDataID: new FormControl(i.budgetDataID),
                        budgetDataTypeID: new FormControl(i.budgetDataTypeID),
                        budgetGlobalID: new FormControl(i.budgetGlobalID),
                        committedSpend: new FormControl(i.committedSpend),
                        dateMasterID: new FormControl(i.dateMasterID),
                        financialMonthStartDate: new FormControl(i.financialMonthStartDate),
                        label: new FormControl(i.label),
                        labelID: new FormControl(i.labelID),
                        lastSubmitted: new FormControl(i.lastSubmitted),
                        mtdpDeviationCodeID: new FormControl(i.mtdpDeviationCodeID),
                        periodNam: new FormControl(i.periodNam),
                        projectID: new FormControl(i.projectID),
                        submittedByID: new FormControl(i.submittedByID),
                        userNae: new FormControl(i.userNam),
                    }))
                }
                for (var i of this.forecastsY1) {
                    this.forecastsY1Form.push(new FormGroup({
                        active: new FormControl(i.active),
                        localCurrencyAbbreviation: new FormControl(i.localCurrencyAbbreviation),
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
                        budgetGlobalID: new FormControl(i.budgetGlobalID),
                        dateMasterID: new FormControl(i.dateMasterID),
                        financialMonthStartDate: new FormControl(i.financialMonthStartDate),
                        label: new FormControl(i.label),
                        labelID: new FormControl(i.labelID),
                        activeID: new FormControl(i.activeID),
                        isOpen: new FormControl(i.isOpen),
                        budgetData: new FormControl(i.budgetData),
                        budgetDataID: new FormControl(i.budgetDataID),
                        budgetDataTypeID: new FormControl(i.budgetDataTypeID),
                        projectID: new FormControl(i.projectID),
                    }))
                }
                this.csForm.push(new FormGroup({
                    committedSpend: new FormControl(this.forecastsForm.controls.find(control => control.get('isopen').value === true).value.committedSpend),
                }))
            }
    }

    formValue() {
        var form = this.forecastsForm.getRawValue()
        if (form.length > 0) {
            this.forecastsSubmit = []
            for (var i of form) {
                this.forecastsSubmit.push({
                    "active": i.active,
                    "localCurrencyAbbreviation": i.localCurrencyAbbreviation,
                    "historical": i.historical,
                    "apr": i.apr,
                    "may": i.may,
                    "jun": i.jun,
                    "jul": i.jul,
                    "aug": i.aug,
                    "sep": i.jun,
                    "oct": i.oct,
                    "nov": i.nov,
                    "dec": i.dec,
                    "jan": i.jan,
                    "feb": i.feb,
                    "mar": i.mar,
                    "annualTotal": i.annualTotal,
                    "y1": i.y1,
                    "y2": i.y2,
                    "y3": i.y3,
                    "y4": i.y4,
                    "y5": i.y5,
                    "cumulativeTotal": i.cumulativeTotal,
                    "isopen": i.isopen,
                    "activeID": i.activeID,
                    "activeOrder": i.activeOrder,
                    "actualMonths": i.actualMonths,
                    "afpDeviationCodeID": i.afpDeviationCodeID,
                    "budgetData": i.budgetData,
                    "budgetDataID": i.budgetDataID,
                    "budgetDataTypeID": i.budgetDataTypeID,
                    'budgetGlobalID': i.budgetGlobalID,
                    "committedSpend": i.committedSpend,
                    "dateMasterID": i.dateMasterID,
                    "financialMonthStartDate": i.financialMonthStartDate,
                    "label": i.label,
                    "labelID": i.labelID,
                    "lastSubmitted": i.lastSubmitted,
                    "mtdpDeviationCodeID": i.mtdpDeviationCodeID,
                    "periodName": i.periodName,
                    "projectID": i.projectID,
                    "submittedByID": i.submittedByID,
                    "userName": i.userName,

                })
            }
        } else {
            this.forecastsSubmit = []
        }
        var formY1 = this.forecastsY1Form.getRawValue()
        if (formY1.length > 0) {
            this.forecastsY1Submit = []
            for (var i of formY1) {
                this.forecastsY1Submit.push({
                    'budgetGlobalID': i.budgetGlobalID,
                    "dateMasterID": i.dateMasterID,
                    "localCurrencyAbbreviation": i.localCurrencyAbbreviation,
                    "financialMonthStartDate": i.financialMonthStartDate,
                    "label": i.label,
                    "labelID": i.labelID,
                    "active": i.active,
                    "activeID": i.activeID,
                    "isOpen": i.isopen,
                    "budgetData": i.budgetData,
                    "budgetDataID": i.budgetDataID,
                    "budgetDataTypeID": i.budgetDataTypeID,
                    "projectID": i.projectID,
                    "apr": i.apr,
                    "may": i.may,
                    "jun": i.jun,
                    "jul": i.jul,
                    "aug": i.aug,
                    "sep": i.jun,
                    "oct": i.oct,
                    "nov": i.nov,
                    "dec": i.dec,
                    "jan": i.jan,
                    "feb": i.feb,
                    "mar": i.mar,
                })
            }
        } else {
            this.forecastsY1Submit = []
        }
    }

    fTableEditRow(rowIndex) {
        if (!this.fTableEditStack.includes(rowIndex)) {
            if(this.forecasts[rowIndex].isopen){
                this.fTableEditStack.push(rowIndex)
            }
        }
    }
    csTableEditRow(rowIndex) {
        if (!this.csTableEditStack.includes(rowIndex)) {
            this.csTableEditStack.push(rowIndex)
        }
    }
    fy1TableEditRow(rowIndex) {
        if (!this.fy1TableEditStack.includes(rowIndex)) {
            if(this.forecastsY1[rowIndex].isopen){
                this.fy1TableEditStack.push(rowIndex)
            }
        }
    }

    submitForecasts() {
        if (JSON.stringify(this.forecastsDb) != JSON.stringify(this.forecastsSubmit)) {
            this.projecthubservice.isFormChanged = false
            const mainObj = this.projecthubservice.all;
            mainObj.budgetForecasts = this.forecastsSubmit;
            mainObj.budgetForecastsY1 = this.forecastsY1Submit;
            mainObj.budgetForecasts.find(x => x.isopen === true).committedSpend = this.csForm.value[0].committedSpend;
            this.extraEntries.forEach(x => {
                mainObj.budgetForecasts.push(x);
            });
            this.extraEntriesY1.forEach(x => {
                mainObj.budgetForecastsY1.push(x);
            });
            this.apiService.updateBudgetPageInfo(this.id,  mainObj).then(res => {
                this.projecthubservice.isNavChanged.next(true)
                this.projecthubservice.submitbutton.next(true)
                this.projecthubservice.successSave.next(true)
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
            })

        } else {
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
            this.projecthubservice.isNavChanged.next(true)
        }
    }
    isCellEditable(month: string): boolean {
        const currentDate = new Date();
        const startingMonth = this.getStartingMonth()-3;
        const monthNumber = this.getMonthNumber(month);
        return startingMonth <= monthNumber;
    }
    getStartingMonth():  number {
        let monthPart  = this.forecasts.find(x => x.active === 'Current').periodName.slice(-2);
        return parseInt(monthPart, 10);
    }
    getMonthNumber(month: string):  number {
        switch (month) {
            case 'jan':
                return 9;
            case 'feb':
                return 10;
            case 'mar':
                return 11;
            case 'apr':
                return 0;
            case 'may':
                return 1;
            case 'jun':
                return 2;
            case 'jul':
                return 3;
            case 'aug':
                return 4;
            case 'sep':
                return 5;
            case 'oct':
                return 6;
            case 'nov':
                return 7;
            case 'dec':
                return 8;
            default:
                return 12;
        }
    }
    getNgxDatatableNumberHeader(): any {
        return ' ngx-number-header';
    }
    recalculateAnnualTotal() {
        const isOpenEntry = this.forecastsForm.controls.find(control => control.get('isopen').value === true);
        const newAnnualTotal = isOpenEntry.value.apr + isOpenEntry.value.may + isOpenEntry.value.jun + isOpenEntry.value.jul + isOpenEntry.value.aug + isOpenEntry.value.sep + isOpenEntry.value.oct + isOpenEntry.value.nov + isOpenEntry.value.dec + isOpenEntry.value.jan + isOpenEntry.value.feb + isOpenEntry.value.mar;
        isOpenEntry.patchValue({
            annualTotal: newAnnualTotal
        });
        this.forecasts.find(value => value.isopen === true).annualTotal = newAnnualTotal;
        this.recalculateTotalCapex()
    }
    recalculateY1() {
        const isOpenEntry = this.forecastsY1Form.controls[0]
        const newAnnualTotal = isOpenEntry.value.apr + isOpenEntry.value.may + isOpenEntry.value.jun + isOpenEntry.value.jul + isOpenEntry.value.aug + isOpenEntry.value.sep + isOpenEntry.value.oct + isOpenEntry.value.nov + isOpenEntry.value.dec + isOpenEntry.value.jan + isOpenEntry.value.feb + isOpenEntry.value.mar;
        // Create a copy of this.forecasts with the updated y1 value
        this.forecasts = this.forecasts.map(forecast => {
            if (forecast.isopen === true) {
                return {...forecast, y1: newAnnualTotal};
            } else {
                return forecast;
            }
        });
        this.forecastsForm.controls.find(control => control.get('isopen').value === true).patchValue({
            y1: newAnnualTotal
        });
        this.cdRef.detectChanges();
        this.recalculateTotalCapex();
    }
    recalculateTotalCapex() {
        const isOpenEntry = this.forecastsForm.controls.find(control => control.get('isopen').value === true);
        const newTotal = isOpenEntry.value.annualTotal + isOpenEntry.value.y1 + isOpenEntry.value.y2 + isOpenEntry.value.y3 + isOpenEntry.value.y4 + isOpenEntry.value.y5;
        isOpenEntry.patchValue({
            cumulativeTotal: newTotal
        });
        const isOpenForecast = this.forecasts.find(value => value.isopen === true);
        if (isOpenForecast) {
            isOpenForecast.cumulativeTotal = newTotal;
            this.forecasts = this.forecasts.map(forecast => {
                if (forecast.isopen === true) {
                    return isOpenForecast;
                } else {
                    return forecast;
                }
            });
            this.cdRef.detectChanges();
        }
    }

}
