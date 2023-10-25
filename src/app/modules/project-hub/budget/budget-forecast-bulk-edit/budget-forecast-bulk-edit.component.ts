import {ChangeDetectorRef, Component, HostListener, Input} from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ProjectHubService} from "../../project-hub.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {RoleService} from "../../../../core/auth/role.service";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";

@Component({
    selector: 'app-budget-forecast-bulk-edit',
    templateUrl: './budget-forecast-bulk-edit.component.html',
    styleUrls: ['./budget-forecast-bulk-edit.component.scss']
})
export class BudgetForecastBulkEditComponent {
    @Input() mode: 'Capex' | 'Opex' = 'Capex';

    constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public authService: AuthService, public role: RoleService,
                public fuseAlert: FuseConfirmationService, private _Activatedroute: ActivatedRoute, private cdRef: ChangeDetectorRef,private portApiService: PortfolioApiService,) {
        this.forecastsForm.valueChanges.subscribe(res => {
            this.formValue()
            this.projecthubservice.isFormChanged = JSON.stringify(this.forecastsDb) != JSON.stringify(this.forecastsSubmit);
            this.recalculateTfp();
            this.recalculateYtdp();
            this.recalculateAFP();
            this.recalculateMtdp()
            if(this.projecthubservice.isFormChanged){
                window.onbeforeunload = this.showConfirmationMessage;
            }
        })
        this.forecastsY1Form.valueChanges.subscribe(res => {
            this.formValue()
            this.projecthubservice.isFormChanged = JSON.stringify(this.forecastsY1Db) != JSON.stringify(this.forecastsY1Submit);
            if(this.projecthubservice.isFormChanged){
                window.onbeforeunload = this.showConfirmationMessage;
            }
        })
    }
    budgetForecastForm = new FormGroup({
        tfpPercentage: new FormControl(0),
        tfpValue: new FormControl(0),
        afpPercentage: new FormControl(0),
        afpValue: new FormControl(0),
        afpCodeId: new FormControl(''),
        ytdpPercentage: new FormControl(0),
        ytdpValue: new FormControl(0),
        mtdpPercentage:new FormControl(0),
        mtdpValue:new FormControl(0),
        mtdpCodeId: new FormControl(''),
        afpDeviationCode: new FormControl(null),
        mtdpDeviationCode: new FormControl(null),
        committedSpend: new FormControl(0)
    })
    localCurrency:any = [];
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
    committedSpend: number = 0;
    csTable = []
    aprEditable: boolean = true;
    mayEditable: boolean = true;
    junEditable: boolean = true;
    julEditable: boolean = true;
    augEditable: boolean = true;
    sepEditable: boolean = true;
    octEditable: boolean = true;
    novEditable: boolean = true;
    decEditable: boolean = true;
    janEditable: boolean = true;
    febEditable: boolean = true;
    marEditable: boolean = true;
    tfpColor: string;
    afpColor: string;
    ydtpColor: string;
    mdtpColor: string;
    y0Label: string = '';
    y1Label: string = '';
    y2Label: string = '';
    y3Label: string = '';
    y4Label: string = '';
    y5Label: string = '';
    year1Value = 0;
    headerLabel: string = "";
    currentEntry: any;
    firstPreliminary: string = "";
    startingMonth: number;

    ngOnChanges(): void {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        if (this.mode == "Capex") {
            this.currentEntry = this.projecthubservice.all.budgetForecasts.find(x => x.active == 'Current' && x.budgetData == "CapEx Forecast");
            this.portApiService.getOnlyLocalCurrency(this.id).then(res => {
                this.localCurrency = res;
            })
            for (const obj of this.projecthubservice.all.budgetForecasts) {
                if (obj.budgetData === "CapEx Forecast") {
                    this.forecasts.push(obj);
                } else if (obj.budgetData === "OpEx Forecast") {
                    this.extraEntries.push(obj);
                }
            }
            this.csTable.push(this.projecthubservice.all.budgetForecasts.find(x => x.isopen === true))
            for (const obj of this.projecthubservice.all.budgetForecastsY1) {
                if (obj.budgetData === "CapEx Forecast") {
                    if(obj.active=='Current'){
                        obj.annualTotal = this.forecasts.find(x => x.active == 'Current').y1;
                    }
                    if(obj.active=='Preliminary'){
                        obj.annualTotal = this.forecasts.find(x => x.active == 'Preliminary').y1;
                    }
                    this.forecastsY1.push(obj);

                } else if (obj.budgetData === "OpEx Forecast") {
                    this.extraEntriesY1.push(obj);
                }
            }
        } else {
            this.currentEntry = this.projecthubservice.all.budgetForecasts.find(x => x.active == 'Current' && x.budgetData == "OpEx Forecast");
            for (const obj of this.projecthubservice.all.budgetForecasts) {
                if (obj.budgetData === "OpEx Forecast") {
                    this.forecasts.push(obj);
                } else if (obj.budgetData === "CapEx Forecast") {
                    this.extraEntries.push(obj);
                }
            }
            this.csTable.push(this.projecthubservice.all.budgetForecasts.find(x => x.isopen === true))
            for (const obj of this.projecthubservice.all.budgetForecastsY1) {
                if (obj.budgetData === "OpEx Forecast") {
                    obj.annualTotal = this.forecasts.find(x => x.active === 'Current').y1;
                    this.forecastsY1.push(obj);
                } else if (obj.budgetData === "CapEx Forecast") {
                    this.extraEntriesY1.push(obj);
                }
            }
        }
        this.startingMonth=this.getStartingMonth()
        let year = new Date(this.forecasts.find(x => x.active == 'Current').financialMonthStartDate).getFullYear();
        let year2 = year+1;
        let year3 = year+2;
        let year4 = year+3;
        let year5 = year+4;
        let year6 = year+5;
        this.y0Label= 'FY' + year;
        this.y1Label= 'FY' + year2;
        this.y2Label= 'FY' + year3;
        this.y3Label= 'FY' + year4;
        this.y4Label= 'FY' + year5;
        this.y5Label= 'FY' + year6 + '+';
        this.aprEditable = this.isCellEditable('apr')
        this.mayEditable = this.isCellEditable('may')
        this.junEditable = this.isCellEditable('jun')
        this.julEditable = this.isCellEditable('jul')
        this.augEditable = this.isCellEditable('aug')
        this.sepEditable = this.isCellEditable('sep')
        this.octEditable = this.isCellEditable('oct')
        this.novEditable = this.isCellEditable('nov')
        this.decEditable = this.isCellEditable('dec')
        this.janEditable = this.isCellEditable('jan')
        this.febEditable = this.isCellEditable('feb')
        this.marEditable = this.isCellEditable('mar')
        this.setTextColors();
        this.dataloader()
    }

    dataloader() {
        this.forecastPatchGeneralForm(this.projecthubservice.all.budgetForecasts.filter(x => x.budgetData == "CapEx Forecast"), this.projecthubservice.all.budget);
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
                        "annualTotal": x.annualTotal,
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
                    activeOrder: new FormControl(i.activeOrder),
                    actualMonths: new FormControl(i.actualMonths),
                    afpDeviationCodeID: new FormControl(i.afpDeviationCodeID),
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
                    userName: new FormControl(i.userName),
                }), { emitEvent: false })
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

                }),{ emitEvent: false })
            }
        }
        this.formValue();
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
                    "sep": i.sep,
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
                    "sep": i.sep,
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
            if (this.forecasts[rowIndex].isopen) {
                this.fTableEditStack.push(rowIndex)
            }
        }
    }

    fy1TableEditRow(rowIndex) {
        if (!this.fy1TableEditStack.includes(rowIndex)) {
            if (this.forecastsY1[rowIndex].isopen) {
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
            mainObj.budgetForecasts.find(x => x.isopen === true).committedSpend = this.budgetForecastForm.controls.committedSpend.value;
            this.extraEntries.forEach(x => {
                mainObj.budgetForecasts.push(x);
            });
            this.extraEntriesY1.forEach(x => {
                mainObj.budgetForecastsY1.push(x);
            });
            const formValue = this.budgetForecastForm.getRawValue();
            if(this.mode=='Capex'){
                mainObj.budgetForecasts.find(x => x.isopen === true && x.budgetData== "CapEx Forecast").afpDeviationCodeID = formValue.afpDeviationCode ? formValue.afpDeviationCode.lookUpId : "";
                mainObj.budgetForecasts.find(x => x.isopen === true && x.budgetData== "CapEx Forecast").mtdpDeviationCodeID =  formValue.mtdpDeviationCode ? formValue.mtdpDeviationCode.lookUpId : "";
            }
            this.apiService.updateBudgetPageInfo(this.id, mainObj).then(res => {
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
        let startingMonth = this.startingMonth;
        if(startingMonth == -1){
            startingMonth = 11;
        }
        if(startingMonth == -2){
            startingMonth = 10;
        }
        if(startingMonth == -3){
            startingMonth = 9;
        }
        if(startingMonth == 0){
            startingMonth = 12;
        }
        const monthNumber = this.getMonthNumber(month);
        return startingMonth <= monthNumber;
    }

    getStartingMonth(): number {
        let project = this.forecasts.find(x => x.isopen === true);
        let monthPart = project.periodName.slice(-2);
        if(project.active == 'Current'){
            return parseInt(monthPart, 10)-3;
        }
        if(project.active == 'Preliminary'){
            this.firstPreliminary = this.getMonthText((parseInt(monthPart, 10)));
            return parseInt(monthPart, 10)-4;
        }
    }

    getMonthNumber(month: string): number {
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
        return ' ngx-number-header-center';
    }

    recalculateAnnualTotal() {
        const isOpenEntry = this.forecastsForm.controls.find(control => control.get('isopen').value === true);
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
        isOpenEntry.patchValue({
            annualTotal: newAnnualTotal
        });
        this.forecasts.find(value => value.isopen === true).annualTotal = newAnnualTotal;
        this.recalculateTotalCapex()
    }

    recalculateY1() {
        const isOpenEntry = this.forecastsY1Form.controls[0]
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
        this.forecastsY1.find(x => x.active == 'Current').annualTotal = newAnnualTotal;
        this.year1Value = newAnnualTotal;
        this.cdRef.detectChanges();
        this.recalculateTotalCapex();
    }

    recalculateTotalCapex() {
        const isOpenEntry = this.forecastsForm.controls.find(control => control.get('isopen').value === true);
        const newTotal =
            (isNaN(isOpenEntry.value.annualTotal) ? 0 : isOpenEntry.value.annualTotal) +
            (isNaN(isOpenEntry.value.y1) ? 0 : isOpenEntry.value.y1) +
            (isNaN(isOpenEntry.value.y2) ? 0 : isOpenEntry.value.y2) +
            (isNaN(isOpenEntry.value.y3) ? 0 : isOpenEntry.value.y3) +
            (isNaN(isOpenEntry.value.y4) ? 0 : isOpenEntry.value.y4) +
            (isNaN(isOpenEntry.value.y5) ? 0 : isOpenEntry.value.y5);
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
    recalculateTfp() {
        const totalCapexForecast = this.currentEntry?.cumulativeTotal || 0;
        const totalApprovedCapEx = this.projecthubservice.all.budget.totalApprovedCapEx || 0;
        this.budgetForecastForm.patchValue({
            tfpPercentage:  Number((totalCapexForecast / (totalApprovedCapEx != 0 ? totalApprovedCapEx : 1)).toFixed(2)),
            tfpValue: totalCapexForecast - totalApprovedCapEx,
        });
    }
    recalculateAFP() {
        const planActive = this.forecasts.find(x => x.active === 'Plan' || x.budgetData === 'CapEx Forecast') || 0;
        const currentAnnualTotal = this.currentEntry?.annualTotal || 0;
        const planAnnualTotal = planActive?.annualTotal || 0;
        this.budgetForecastForm.patchValue({
            afpPercentage: Number((currentAnnualTotal / (planAnnualTotal != 0 ? planAnnualTotal : 1)).toFixed(2)),
            afpValue: currentAnnualTotal - planAnnualTotal,
        });
    }
    recalculateYtdp() {
        const currentHistorical = this.currentEntry?.historical || 0;
        const planHistorical = this.forecasts.find(x => x.active === 'Plan')?.historical || 0;
        this.budgetForecastForm.patchValue({
            ytdpPercentage: Number((currentHistorical / (planHistorical != 0 ? planHistorical : 1)).toFixed(2)),
            ytdpValue: currentHistorical - planHistorical,
        });
    }
    recalculateMtdp() {
        const planMtdpDate = new Date(this.forecasts.find(x => x.active == 'Plan').financialMonthStartDate)
        const currentMtdpDate = new Date(this.forecasts.find(x => x.active == 'Current').financialMonthStartDate)
        const planActive = this.forecasts.find(x => x.active === 'Plan' || x.budgetData === 'CapEx Forecast') || 0;
        this.budgetForecastForm.patchValue({
            mtdpValue: this.currentEntry[this.getMonthText(currentMtdpDate.getMonth())] -  planActive[this.getMonthText(planMtdpDate.getMonth())],
            mtdpCodeId: this.getLookUpName(this.currentEntry.mtdpDeviationCodeID),
        });
    }
    onPaste(event: ClipboardEvent, rowIndex: number, field: string): void {
        event.preventDefault();
        const clipboardData = event.clipboardData || window['clipboardData'];
        const pastedData = clipboardData.getData('text').split('\t');
        for (let i = 0; i < pastedData.length; i++) {
            const roundedNumber = Math.round(Number(pastedData[i]));
            this.forecastsForm.controls[rowIndex].value[field] = roundedNumber;
            this.forecastsForm.controls[rowIndex].patchValue({
                [field]: roundedNumber
            });
            field = this.getNextField(field);
        }
        this.recalculateAnnualTotal()
        this.formValue()
    }
    onPasteY1(event: ClipboardEvent, rowIndex: number, field: string): void {
        event.preventDefault();
        const clipboardData = event.clipboardData || window['clipboardData'];
        const pastedData = clipboardData.getData('text').split('\t');
        for (let i = 0; i < pastedData.length; i++) {
            const roundedNumber = Math.round(Number(pastedData[i]));
            this.forecastsY1Form.controls[rowIndex].value[field] = roundedNumber;
            this.forecastsY1Form.controls[rowIndex].patchValue({
                [field]: roundedNumber
            });
            field = this.getNextField(field);
        }
        this.recalculateY1()
        this.formValue()
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
    setTextColors(): void {
        const tfpPercentage =this.budgetForecastForm.controls.tfpPercentage.value;
        const afpPercentage = this.budgetForecastForm.controls.afpPercentage.value;
        const ydtpPercentage = this.budgetForecastForm.controls.ytdpPercentage.value;
        const mdtpPercentage = this.budgetForecastForm.controls.mtdpPercentage.value;
        if(tfpPercentage >= 5){
            this.tfpColor = 'green'
        }else{
            if(afpPercentage == 0){
                this.afpColor = 'gray'
            }else{
                this.tfpColor = 'red'
            }
            this.tfpColor = 'red'
        }
        if(afpPercentage >= 10 || afpPercentage <= -10){
            this.afpColor = 'red'
        }else {
            if(afpPercentage == 0){
                this.afpColor = 'gray'
            }else{
                this.afpColor = 'green'
            }

        }
        if(ydtpPercentage >= 10 || afpPercentage <= -10){
            this.ydtpColor = 'red'
        }else{
            if(ydtpPercentage == 0){
                this.ydtpColor = 'gray'
            }else{
                this.ydtpColor = 'green'
            }

        }
        if(mdtpPercentage >=5 || mdtpPercentage <= -5){
            this.mdtpColor = 'red'
        }else{
            if(mdtpPercentage == 0){
                this.mdtpColor = 'gray'
            }else{
                this.mdtpColor = 'green'
            }
        }
    }
    getAfdDeviationCodes(): any {
        return this.projecthubservice.lookUpMaster.filter(x => x.lookUpParentId == '6929db50-f72b-4ecc-9a15-7ca598f8323d')
    }
    getMtdpDeviationCodes(): any {
        return this.projecthubservice.lookUpMaster.filter(x => x.lookUpParentId == '1391c70a-088d-435a-9bdf-c4ed6d88c09d')
    }
    forecastPatchGeneralForm(forecast:any, budget:any){
        const currentMtdpDate = new Date(this.currentEntry.financialMonthStartDate)
        const planMtdpDate = new Date(forecast.find(x => x.active == 'Plan').financialMonthStartDate)
        const planActive = forecast.find(x => x.active === 'Plan');
        const totalCapexForecast = this.currentEntry?.cumulativeTotal || 0;
        const totalApprovedCapEx = budget.totalApprovedCapEx || 0;
        const currentAnnualTotal = this.currentEntry?.annualTotal || 0;
        const planAnnualTotal = planActive?.annualTotal || 0;
        const currentHistorical = this.currentEntry?.historical || 0;
        const planHistorical = forecast.find(x => x.active === 'Plan')?.historical || 0;
        this.budgetForecastForm.patchValue({
            tfpPercentage:  Number((totalCapexForecast / (totalApprovedCapEx != 0 ? totalApprovedCapEx : 1)).toFixed(2)),
            tfpValue: totalCapexForecast - totalApprovedCapEx,
            afpPercentage: Number((currentAnnualTotal / (planAnnualTotal != 0 ? planAnnualTotal : 1)).toFixed(2)),
            afpValue: currentAnnualTotal - planAnnualTotal,
            afpCodeId: this.getLookUpName(forecast.find(x => x.active == 'Current').afpDeviationCodeID),
            ytdpPercentage: Number((currentHistorical / (planHistorical != 0 ? planHistorical : 1)).toFixed(2)),
            ytdpValue: currentHistorical - planHistorical,
            mtdpValue: this.currentEntry[this.getMonthText(currentMtdpDate.getMonth())] -  planActive[this.getMonthText(planMtdpDate.getMonth())],
            mtdpCodeId: this.getLookUpName(this.currentEntry.mtdpDeviationCodeID),
            committedSpend: this.forecasts.find(x => x.isopen == true).committedSpend
        })
        this.setTextColors();
        this.headerLabel = "Current " +  forecast.find(x => x.active == 'Current').periodName + " versus Plan " +forecast.find(x => x.active == 'Plan').periodName
    }
    getMonthText(month: number): string {
        switch (month) {
            case 1:
                return 'jan';
            case 2:
                return 'feb';
            case 3:
                return 'mar';
            case 4:
                return 'apr';
            case 5:
                return 'may';
            case 6:
                return 'jun';
            case 7:
                return 'jul';
            case 8:
                return 'aug';
            case 9:
                return 'sep';
            case 10:
                return 'oct';
            case 11:
                return 'nov';
            case 0:
                return 'dec';
            default:
                return '';
        }
    }
    getLookUpName(id: string): string {
        return id && id != '' ?  this.projecthubservice.lookUpMaster.find(x => x.lookUpId == id)?.lookUpName : ''
    }
    getRowStyle(month:string,isEditable:boolean, row:any){
        if(!isEditable || !row.isopen){
            return 'closed'
        }
        if(this.firstPreliminary==month){
            return 'blue-text'
        }
    }
    showConfirmationMessage(event) {
        const confirmationMessage = 'Are you sure you want to exit? All unsaved data will be lost.';
        (event || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }
}
