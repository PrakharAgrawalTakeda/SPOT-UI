import {Component} from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ProjectHubService} from "../../project-hub.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {RoleService} from "../../../../core/auth/role.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {Router} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-budget-forecast-bulk-edit',
    templateUrl: './budget-forecast-bulk-edit.component.html',
    styleUrls: ['./budget-forecast-bulk-edit.component.scss']
})
export class BudgetForecastBulkEditComponent {
    constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public authService: AuthService, public role: RoleService,
                public fuseAlert: FuseConfirmationService, private router: Router) {
        this.forecastsForm.valueChanges.subscribe(res => {
                this.formValue()
                if (JSON.stringify(this.forecastsDb) != JSON.stringify(this.forecastsSubmit)) {
                    this.projecthubservice.isFormChanged = true
                } else {
                    this.projecthubservice.isFormChanged = false
                }

        })
    }


    forecasts = []
    forecastsDb = []
    forecastsSubmit = []
    viewContent: boolean = false
    lookupdata: any[]
    fTableEditStack = []
    forecastsForm = new FormArray([])

    ngOnInit(): void {
        this.forecasts = this.projecthubservice.all
        console.log("Aaaaaaaa", this.forecasts);
        this.dataloader()
    }

    dataloader() {
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
                    }
                })
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
                    }))
                }
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
                })
            }
        } else {
            this.forecastsSubmit = []
        }
    }

    fTableEditRow(rowIndex) {
        if (!this.fTableEditStack.includes(rowIndex)) {
            if(this.forecasts[rowIndex].isopen){
                this.fTableEditStack.push(rowIndex)
            }
        }
    }

    submitForecasts() {
        if (JSON.stringify(this.forecastsDb) != JSON.stringify(this.forecastsSubmit)) {
            this.projecthubservice.isFormChanged = false
            this.apiService.bulkEditKeyAssumptionsForOption(this.forecastsSubmit, this.projecthubservice.projectid).then(res => {
                this.projecthubservice.submitbutton.next(true)
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
                this.projecthubservice.isNavChanged.next(true)
            })
        } else {
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
            this.projecthubservice.isNavChanged.next(true)
        }
    }
    isCellEditable(month: string): boolean {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const monthNumber = this.getMonthNumber(month);
        return currentMonth <= monthNumber;
    }
    getMonthNumber(month: string):  number {
        switch (month) {
            case 'jan':
                return 0;
            case 'feb':
                return 1;
            case 'mar':
                return 2;
            case 'apr':
                return 3;
            case 'may':
                return 4;
            case 'jun':
                return 5;
            case 'jul':
                return 6;
            case 'aug':
                return 7;
            case 'sep':
                return 8;
            case 'oct':
                return 9;
            case 'nov':
                return 10;
            case 'dec':
                return 11;
            default:
                return 12;
        }
    }
    getNgxDatatableNumberHeader(): any {
        return ' ngx-number-header';
    }

}
