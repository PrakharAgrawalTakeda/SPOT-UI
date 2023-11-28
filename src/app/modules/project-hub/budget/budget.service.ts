import {Injectable} from '@angular/core';
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../@fuse/services/confirmation";
import {ProjectHubService} from "../project-hub.service";

@Injectable({
    providedIn: 'root'
})
export class BudgetService {

    budgetPageInfo: any;
    budgetForecastsY1Capex: any;
    budgetForecastsY1Opex: any;
    startingMonth: number;
    currentEntry: any;
    openEntry: any;
    id: string = "";
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
    tfpValue: number = 0;
    afpValue: number = 0;
    ytdpValue: number = 0;
    mtdpValue: number = 0;
    ytdPlanTotal: number = 0;
    ytdCurrentTotal: number = 0;
    planActive: any;
    tfpDev: number;
    ytdDev: number;
    mtdDev: number;
    afpDev: number;
    localCurrency: any = [];
    tfpColor: string;
    afpColor: string;
    ydtpColor: string;
    mdtpColor: string;
    y1Label: string = '';
    y2Label: string = '';
    y3Label: string = '';
    y4Label: string = '';
    y5Label: string = '';
    y0Label: string = '';
    enableForecastButton: boolean = true;
    firstPreliminary: string = "";
    headerLabel: string = "";

    constructor(public projectHubService: ProjectHubService, public fuseAlert: FuseConfirmationService) {
        console.log("Budget Service Started")
    }

    checkIsCellEditable() {
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
    }

    calculateForecast() {
        this.ytdPlanTotal=0;
        this.ytdCurrentTotal=0;
        if (!this.aprEditable) {
            this.ytdPlanTotal += this.planActive.apr;
            this.ytdCurrentTotal += this.currentEntry.apr;
        }
        if (!this.mayEditable) {
            this.ytdPlanTotal += this.planActive.may;
            this.ytdCurrentTotal += this.currentEntry.may;
        }
        if (!this.junEditable) {
            this.ytdPlanTotal += this.planActive.jun;
            this.ytdCurrentTotal += this.currentEntry.jun;
        }
        if (!this.julEditable) {
            this.ytdPlanTotal += this.planActive.jul;
            this.ytdCurrentTotal += this.currentEntry.jul;
        }
        if (!this.augEditable) {
            this.ytdPlanTotal += this.planActive.aug;
            this.ytdCurrentTotal += this.currentEntry.aug;
        }
        if (!this.sepEditable) {
            this.ytdPlanTotal += this.planActive.sep;
            this.ytdCurrentTotal += this.currentEntry.sep;
        }
        if (!this.octEditable) {
            this.ytdPlanTotal += this.planActive.oct;
            this.ytdCurrentTotal += this.currentEntry.oct;
        }
        if (!this.novEditable) {
            this.ytdPlanTotal += this.planActive.nov;
            this.ytdCurrentTotal += this.currentEntry.nov;
        }
        if (!this.decEditable) {
            this.ytdPlanTotal += this.planActive.dec;
            this.ytdCurrentTotal += this.currentEntry.dec;
        }
        if (!this.janEditable) {
            this.ytdPlanTotal += this.planActive.jan;
            this.ytdCurrentTotal += this.currentEntry.jan;
        }
        if (!this.febEditable) {
            this.ytdPlanTotal += this.planActive.feb;
            this.ytdCurrentTotal += this.currentEntry.feb;
        }
        if (!this.marEditable) {
            this.ytdPlanTotal += this.planActive.mar;
            this.ytdCurrentTotal += this.currentEntry.mar;
        }
        this.recalculateTfp();
        this.recalculateAFP();
        this.recalculateYtdp();
        this.recalculateMtdp();

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

    getStartingMonth(): number {
        let project: any;
        if (this.budgetPageInfo.budgetForecasts.find(x => x.active == 'Preliminary' && x.budgetData == "CapEx Forecast")) {
            project = this.budgetPageInfo.budgetForecasts.find(x => x.active == 'Preliminary' && x.budgetData == "CapEx Forecast");
        } else {
            project = this.budgetPageInfo.budgetForecasts.find(x => x.active == 'Current' && x.budgetData == "CapEx Forecast");
        }
        let monthPart = project.periodName.slice(-2);
        if (project.active == 'Current') {
            return parseInt(monthPart, 10) - 3;
        }
        if (project.active == 'Preliminary') {
            this.firstPreliminary = this.getMonthText((parseInt(monthPart, 10)));
            return parseInt(monthPart, 10) - 4;
        }
    }

    isCellEditable(month: string): boolean {
        let startingMonth = this.startingMonth;
        if (startingMonth == -1) {
            startingMonth = 11;
        }
        if (startingMonth == -2) {
            startingMonth = 10;
        }
        if (startingMonth == -3) {
            startingMonth = 9;
        }
        // if(startingMonth == 0){
        //     startingMonth = 12;
        // }
        // // startingMonth = 0;
        const monthNumber = this.getMonthNumber(month);
        return startingMonth <= monthNumber;
    }

    recalculateTfp() {
        const totalCapexForecast = this.currentEntry?.cumulativeTotal || 0;
        const totalApprovedCapEx = this.budgetPageInfo.budget.totalApprovedCapEx || 0;
        if (totalCapexForecast === 0 && totalApprovedCapEx === 0) {
            this.tfpDev = 0;
        } else if (totalCapexForecast > 0 && totalApprovedCapEx === 0) {
            this.tfpDev = 100;
        } else if (totalCapexForecast < 0 && totalApprovedCapEx === 0) {
            this.tfpDev = -100;
        } else if (totalCapexForecast === 0 && totalApprovedCapEx != 0) {
            this.tfpDev = -100;
        } else {
            this.tfpDev = (totalCapexForecast - totalApprovedCapEx) * 100 / Math.abs(totalApprovedCapEx);
        }
        this.tfpValue = (this.currentEntry.cumulativeTotal || 0) - (this.budgetPageInfo.budget.totalApprovedCapEx || 0)
    }

    recalculateAFP() {
        const currentAnnualTotal = this.currentEntry?.annualTotal || 0;
        const planAnnualTotal = this.planActive?.annualTotal || 0;
        if (currentAnnualTotal === 0 && planAnnualTotal === 0) {
            this.afpDev = 0;
        } else if (currentAnnualTotal > 0 && planAnnualTotal === 0) {
            this.afpDev = 100;
        } else if (currentAnnualTotal < 0 && planAnnualTotal === 0) {
            this.afpDev = -100;
        } else if (currentAnnualTotal === 0 && planAnnualTotal != 0) {
            this.afpDev = -100;
        } else {
            this.afpDev = (currentAnnualTotal - planAnnualTotal) * 100 / Math.abs(planAnnualTotal);
        }
        this.afpValue = currentAnnualTotal - planAnnualTotal
    }

    recalculateYtdp() {
        if (this.ytdCurrentTotal === 0 && this.ytdPlanTotal === 0) {
            this.ytdDev = 0;
        } else if (this.ytdCurrentTotal > 0 && this.ytdPlanTotal === 0) {
            this.ytdDev = 100;
        } else if (this.ytdCurrentTotal < 0 && this.ytdPlanTotal === 0) {
            this.ytdDev = -100;
        } else if (this.ytdCurrentTotal === 0 && this.ytdPlanTotal != 0) {
            this.ytdDev = -100;
        } else {
            this.ytdDev = (this.ytdCurrentTotal - this.ytdPlanTotal) * 100 / Math.abs(this.ytdPlanTotal);
        }
        this.ytdpValue = this.ytdCurrentTotal - this.ytdPlanTotal
    }

    recalculateMtdp() {
        const currentMtdpDate = new Date(this.currentEntry.financialMonthStartDate)
        const currentMonthText = this.getMonthText(currentMtdpDate.getMonth());
        const planMonthText = this.getMonthText(currentMtdpDate.getMonth());
        const currentMonthValue = this.currentEntry && this.currentEntry[currentMonthText] || 0;
        const planMonthValue = this.planActive && this.planActive[planMonthText] || 0;
        if (currentMonthValue === 0 && planMonthValue === 0) {
            this.mtdDev = 0;
        } else if (currentMonthValue > 0 && planMonthValue === 0) {
            this.mtdDev = 100;
        } else if (currentMonthValue < 0 && planMonthValue === 0) {
            this.mtdDev = -100;
        } else if (currentMonthValue === 0 && planMonthValue != 0) {
            this.mtdDev = -100;
        } else {
            this.mtdDev = (currentMonthValue - planMonthValue) * 100 / Math.abs(planMonthValue);
        }
        this.mtdpValue = this.currentEntry[this.getMonthText(currentMtdpDate.getMonth())] - this.planActive[this.getMonthText(currentMtdpDate.getMonth())]
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

    setTextColors(): void {
        this.setTfpColor();
        this.setAfpColor();
        this.setYdtpColor();
        this.setMdtpColor();
    }

    setTfpColor(): void {
        const tfpPercentage = this.tfpDev;
        if (this.budgetPageInfo.budget.totalApprovedCapEx == 0 || this.budgetPageInfo.budget.totalApprovedCapEx == null) {
            this.tfpColor = 'gray';
        } else {
            switch (true) {
                case tfpPercentage === 0:
                    this.tfpColor = 'gray';
                    break;
                case tfpPercentage < 5:
                    this.tfpColor = 'green';
                    break;
                case tfpPercentage >= 5 && tfpPercentage < 10:
                    this.tfpColor = 'orange';
                    break;
                case tfpPercentage >= 10:
                    this.tfpColor = 'red';
                    break;
                default:
                    break;
            }
        }
    }

    setAfpColor(): void {
        const afpPercentage = this.afpDev;
        if (afpPercentage >= 10 || afpPercentage <= -10) {
            this.afpColor = 'red';
        } else {
            this.afpColor = 'green';
        }
    }

    setYdtpColor(): void {
        const ydtpPercentage = this.ytdDev;
        switch (true) {
            case ydtpPercentage >= 10 || ydtpPercentage <= -10:
                this.ydtpColor = 'red';
                break;
            case (ydtpPercentage > -10 && ydtpPercentage <= -5) || (ydtpPercentage >= 5 && ydtpPercentage < 10):
                this.ydtpColor = 'orange';
                break;
            case ydtpPercentage === 0:
                this.ydtpColor = 'gray';
                break;
            case ydtpPercentage > -5 && ydtpPercentage < 5:
                this.ydtpColor = 'green';
                break;
            default:
                break;
        }
    }

    setMdtpColor(): void {
        const mdtpPercentage = this.mtdDev;
        if (mdtpPercentage >= 5 || mdtpPercentage <= -5) {
            this.mdtpColor = 'red';
        } else {
            this.mdtpColor = 'green';
        }
    }

    isAnyEntryOpen(): boolean {
        return this.budgetPageInfo.budgetForecasts.filter(x => x.budgetData == "CapEx Forecast").some(entry => entry.isopen);
    }

    getAfdDeviationCodes(): any {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '6929db50-f72b-4ecc-9a15-7ca598f8323d')
    }

    getMtdpDeviationCodes(): any {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '1391c70a-088d-435a-9bdf-c4ed6d88c09d')
    }

    setLabels() {
        let year = new Date(this.openEntry.financialMonthStartDate).getFullYear();
        let year2 = year + 1;
        let year3 = year + 2;
        let year4 = year + 3;
        let year5 = year + 4;
        let year6 = year + 5;
        this.y0Label = 'FY' + year;
        this.y1Label = 'FY' + year2;
        this.y2Label = 'FY' + year3;
        this.y3Label = 'FY' + year4;
        this.y4Label = 'FY' + year5;
        this.y5Label = 'FY' + year6 + '+';
    }

    forecastEditButtonEnabler() {
        if (this.projectHubService.roleControllerControl.budgetAdmin) {
            this.enableForecastButton = true;
        } else {
            if (this.isAnyEntryOpen()) {
                if (!this.projectHubService.roleControllerControl.projectTeam) {
                    this.enableForecastButton = false;
                }
            } else {
                this.enableForecastButton = false;
            }
        }
    }

    forecastEditButtonClick() {
        if (this.projectHubService.projectState == 'Cancelled') {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "",
                "message": "It is not possible to edit forecast information to a project which is in cancelled state.",
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
                        "label": "Cancel"
                    }
                },
                "dismissible": true
            }
            this.fuseAlert.open(comfirmConfig)
        } else {
            this.projectHubService.toggleDrawerOpen('BudgetForecastCapexBulkEdit', '', this.budgetPageInfo, this.id, true)
        }
    }
}
