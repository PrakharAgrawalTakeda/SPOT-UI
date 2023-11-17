import {Component, OnInit} from '@angular/core';
import {ProjectHubService} from "../project-hub.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {ProjectApiService} from "../common/project-api.service";
import {PortfolioApiService} from "../../portfolio-center/portfolio-api.service";
import { HttpClient } from '@angular/common/http';
import {MsalService} from "@azure/msal-angular";

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
    viewContent = false;
    id: string = "";
    lookUpData: any = []
    localCurrency:any = [];
    filterCriteria: any = {}
    opexField:boolean = false;
    capexField:boolean = false;
    budgetPageInfo:any = "";
    fundingInformations: any = [];
    showAddNewButton: boolean = false;
    tfpColor: string;
    afpColor: string;
    ydtpColor: string;
    mdtpColor: string;
    budgetForecasts: any;
    budgetForecastsY1Capex:any;
    budgetForecastsY1Opex:any;
    headerLabel: string = ""
    preliminaryExists: boolean = false;
    enableForecastButton: boolean = true;
    retryCount = 0;
    tfpDev: number;
    ytdPlanTotal: number = 0;
    ytdCurrentTotal: number = 0;
    ytdDev: number;
    mtdDev: number;
    afpDev: number;
    planActive: any;
    currentEntry: any;
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
    startingMonth: number;

    constructor(public projectHubService: ProjectHubService,
                private _Activatedroute: ActivatedRoute,
                private portApiService: PortfolioApiService,
                private authService: AuthService,
                private apiService: ProjectApiService,
                private msalService: MsalService,
                private http: HttpClient) {
        this.projectHubService.submitbutton.subscribe(res => {
            if (res == true) {
                this.dataloader()
            }
        })
    }

    budgetForm = new FormGroup({
        capexRequired: new FormControl(false),
        opexRequired: new FormControl(false),
        parentProgram: new FormControl(''),
        localCurrency: new FormControl(''),
        apisdate: new FormControl(''),
        budgetId: new FormControl(''),
        gmsBudgetowner: new FormControl(''),
        predefinedInvestmentId: new FormControl(''),
        where: new FormControl(''),
        why: new FormControl(''),
        fundingApprovalNeedDate: new FormControl(''),
        projectFundingStatus: new FormControl(''),
        totalApprovedCapex: new FormControl(0),
        totalApprovedOpex: new FormControl(0),
        budgetCommentary: new FormControl(''),
    })
    budgetForecastForm = new FormGroup({
        referenceCurrent: new FormControl(''),
        periodCurrent: new FormControl(''),
        lastSubmittedCurrent: new FormControl(''),
        submittedByCurrent: new FormControl(''),
        referencePreliminary: new FormControl(''),
        periodPreliminary: new FormControl(''),
        lastSubmittedPreliminary: new FormControl(''),
        submittedByPreliminary: new FormControl(''),
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
        committedSpend:  new FormControl(''),
    })

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader(): void {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        const promises = [
            this.portApiService.getfilterlist(),
            this.portApiService.getOnlyLocalCurrency(this.id),
            this.authService.lookupMaster(),
            this.apiService.getBudgetPageInfo(this.id)
        ];
        Promise.all(promises)
            .then((response: any[]) => {
                this.filterCriteria = response[0];
                this.localCurrency = response[1];
                this.lookUpData = response[2];
                this.projectHubService.lookUpMaster = response[2];
                this.budgetPageInfo =  response[3];
                this.fundingInformations =  response[3];
                this.opexField = !! response[3].budget.opExRequired;
                this.capexField = !!response[3].budget.capExRequired;
                this.budgetForecasts = response[3];
                this.budgetForecastsY1Capex = response[3].budgetForecastsY1.filter(x => x.budgetData == "CapEx Forecast");
                this.budgetForecastsY1Opex = response[3].budgetForecastsY1.filter(x => x.budgetData == "OpEx Forecast");
                this.forecastPatchGeneralForm(response[3].budgetForecasts.filter(x => x.budgetData == "CapEx Forecast"), response[3].budget);
                this.generalInfoPatchValue(response[3])
                this.forecastEditButtonEnabler();
                this.currentEntry = response[3].budgetForecasts.find(x => x.active == 'Current' && x.budgetData == "CapEx Forecast");
                this.planActive = response[3].budgetForecasts.find(x => x.active === 'Plan' || x.budgetData === 'CapEx Forecast');
                this.startingMonth=this.getStartingMonth()
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
                if(!this.aprEditable){
                    this.ytdPlanTotal +=  this.planActive.apr;
                    this.ytdCurrentTotal += this.currentEntry.apr;
                }
                if(!this.mayEditable){
                    this.ytdPlanTotal +=  this.planActive.may;
                    this.ytdCurrentTotal += this.currentEntry.may;
                }
                if(!this.junEditable){
                    this.ytdPlanTotal +=  this.planActive.jun;
                    this.ytdCurrentTotal += this.currentEntry.jun;
                }
                if(!this.julEditable){
                    this.ytdPlanTotal += this.planActive.jul;
                    this.ytdCurrentTotal += this.currentEntry.jul;
                }
                if(!this.augEditable){
                    this.ytdPlanTotal += this.planActive.aug;
                    this.ytdCurrentTotal += this.currentEntry.aug;
                }
                if(!this.sepEditable){
                    this.ytdPlanTotal += this.planActive.sep;
                    this.ytdCurrentTotal += this.currentEntry.sep;
                }
                if(!this.octEditable){
                    this.ytdPlanTotal += this.planActive.oct;
                    this.ytdCurrentTotal += this.currentEntry.oct;
                }
                if(!this.novEditable){
                    this.ytdPlanTotal += this.planActive.nov;
                    this.ytdCurrentTotal += this.currentEntry.nov;
                }
                if(!this.decEditable){
                    this.ytdPlanTotal += this.planActive.dec;
                    this.ytdCurrentTotal += this.currentEntry.dec;
                }
                if(!this.janEditable){
                    this.ytdPlanTotal += this.planActive.jan;
                    this.ytdCurrentTotal += this.currentEntry.jan;
                }
                if(!this.febEditable){
                    this.ytdPlanTotal += this.planActive.feb;
                    this.ytdCurrentTotal += this.currentEntry.feb;
                }
                if(!this.marEditable){
                    this.ytdPlanTotal += this.planActive.mar;
                    this.ytdCurrentTotal += this.currentEntry.mar;
                }
                this.recalculateTfp();
                this.recalculateYtdp();
                this.recalculateAFP();
                this.recalculateMtdp()
                this.viewContent = true
            })
            .catch((error) => {
                if (this.retryCount < 1) {
                    console.error('Error fetching data, retrying once:', error);
                    this.retryCount++;
                    this.dataloader();
                } else {
                    console.error('Error fetching data:', error);
                }
            });
        this.disabler()
    }

    disabler() {
        this.budgetForm.disable()
        this.budgetForecastForm.disable()
    }
    generalInfoPatchValue(response){
        let totalCapex = 0;
        let totalOpex=0;
        response.budgetIOs.forEach((x)=>{
            if(x.approvalStatus=='Approved'){
                totalCapex = totalCapex + x.localCarapprovedCapex
                totalOpex= totalOpex + x.localCarapprovedOpex
            }
        })
        this.budgetForm.patchValue({
            capexRequired: !!response.budget.capExRequired,
            opexRequired:  !!response.budget.opExRequired,
            parentProgram:  response.parentProgram,
            localCurrency:  this.localCurrency?.localCurrencyAbbreviation,
            apisdate:  response.budget.apisdate,
            budgetId:  response.budget.capitalBudgetId,
            gmsBudgetowner:  this.getPortfolioOwnerNameById(response.budget.budgetOwner),
            predefinedInvestmentId:  this.getLookUpName(response.budget.predefinedInvestmentId),
            where:  this.getLookUpName(response.budget.whereId),
            why:  this.getLookUpName(response.budget.whyId),
            fundingApprovalNeedDate:  response.budget.fundingApprovalNeedDate,
            projectFundingStatus:  this.getFundingStatus(response.budget.fundingStatusId),
            totalApprovedCapex:  response.budget.totalApprovedCapEx,
            totalApprovedOpex:   response.budget.totalApprovedOpEx,
            budgetCommentary:  response.budget.budgetComment,
        })
        if(response.budget.budgetOwner=="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC" || response.budget.budgetOwner==null){
            this.showAddNewButton = true;
        }
    }
    forecastPatchGeneralForm(forecast:any, budget:any){
        const currentMtdpDate = new Date(forecast.find(x => x.active == 'Current').financialMonthStartDate)
        if(forecast.find(x => x.active == 'Preliminary')){
            this.preliminaryExists = true;
            this.budgetForecastForm.patchValue({
                referencePreliminary: forecast.find(x => x.active == 'Preliminary')?.active ? forecast.find(x => x.active == 'Preliminary').active : "",
                periodPreliminary: forecast.find(x => x.active == 'Preliminary')?.periodName ? forecast.find(x => x.active == 'Preliminary').periodName : "" ,
                lastSubmittedPreliminary: forecast.find(x => x.active == 'Preliminary')?.lastSubmitted ? forecast.find(x => x.active == 'Preliminary').lastSubmitted: "",
                submittedByPreliminary: forecast.find(x => x.active == 'Preliminary')?.userName ? forecast.find(x => x.active == 'Preliminary').userName : "",
            })
        }
        const currentEntry = forecast.find(x => x.active === 'Current');
        const planActive = forecast.find(x => x.active === 'Plan');
        const totalCapexForecast =  currentEntry?.cumulativeTotal || 0;
        const totalApprovedCapEx = budget.totalApprovedCapEx || 0;
        const currentAnnualTotal = currentEntry?.annualTotal || 0;
        const planAnnualTotal = planActive?.annualTotal || 0;
        const currentHistorical = currentEntry?.historical || 0;
        const planHistorical = forecast.find(x => x.active === 'Plan')?.historical || 0;
        const currentMonthText = this.getMonthText(currentMtdpDate.getMonth());
        const planMonthText = this.getMonthText(currentMtdpDate.getMonth());
        const currentMonthValue = currentEntry && currentEntry[currentMonthText] || 0;
        const planMonthValue = planActive && planActive[planMonthText] || 1;
        let tfpDev: number;
        let ytdDev: number;
        let mtdDev: number;
        let afpDev: number;
        if (totalCapexForecast === 0 && totalApprovedCapEx === 0) {
            tfpDev = 0;
        } else if (totalCapexForecast > 0 && totalApprovedCapEx === 0) {
            tfpDev = 100;
        } else if (totalCapexForecast < 0 && totalApprovedCapEx === 0) {
            tfpDev = -100;
        } else {
            tfpDev =  totalCapexForecast / Math.abs(totalApprovedCapEx);
        }
        if (currentHistorical === 0 && planHistorical === 0) {
            ytdDev = 0;
        } else if (currentHistorical > 0 && planHistorical === 0) {
            ytdDev = 100;
        } else if (currentHistorical < 0 && planHistorical === 0) {
            ytdDev = -100;
        } else {
            ytdDev =  currentHistorical /  Math.abs(planHistorical);
        }
        if (currentMonthValue === 0 && planMonthValue === 0) {
            mtdDev = 0;
        } else if (currentMonthValue > 0 && planMonthValue === 0) {
            mtdDev = 100;
        } else if (currentMonthValue < 0 && planMonthValue === 0) {
            mtdDev = -100;
        } else {
            mtdDev =  currentMonthValue / Math.abs(planMonthValue);
        }
        if (currentAnnualTotal === 0 && planAnnualTotal === 0) {
            afpDev = 0;
        } else if (currentAnnualTotal > 0 && planAnnualTotal === 0) {
            afpDev = 100;
        } else if (currentAnnualTotal < 0 && planAnnualTotal === 0) {
            afpDev = -100;
        } else {
            afpDev = (planAnnualTotal - currentAnnualTotal) / Math.abs(planAnnualTotal);
        }
        this.budgetForecastForm.patchValue({
            referenceCurrent: forecast.find(x => x.active == 'Current').active,
            periodCurrent: forecast.find(x => x.active == 'Current').periodName,
            lastSubmittedCurrent: forecast.find(x => x.active == 'Current').lastSubmitted,
            submittedByCurrent: forecast.find(x => x.active == 'Current').userName,
            tfpPercentage: tfpDev,
            tfpValue: totalCapexForecast - totalApprovedCapEx,
            afpPercentage: afpDev,
            afpValue: currentAnnualTotal - planAnnualTotal,
            afpCodeId: this.getLookUpName(forecast.find(x => x.active == 'Current').afpDeviationCodeID),
            ytdpPercentage: ytdDev,
            ytdpValue: currentHistorical - planHistorical,
            mtdpPercentage: mtdDev,
            mtdpValue: currentEntry[this.getMonthText(currentMtdpDate.getMonth())] -  planActive[this.getMonthText(currentMtdpDate.getMonth())],
            mtdpCodeId: this.getLookUpName(currentEntry.mtdpDeviationCodeID),
            committedSpend: forecast.find(x => x.active == 'Current').committedSpend,
        })
        this.headerLabel = "Current " +  forecast.find(x => x.active == 'Current').periodName + " versus Plan " +forecast.find(x => x.active == 'Plan').periodName
        this.setTextColors();
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
        return id && id != '' ?  this.lookUpData.find(x => x.lookUpId == id)?.lookUpName : ''
    }
    getFundingStatus(id: string): string {
        if (this.budgetPageInfo.budgetIOs.length !== 0) {
            return id && id !== '' ? this.lookUpData.find(x => x.lookUpId === id)?.lookUpName : '';
        } else {
            let returnText = 'Not Initiated Future Spend FY ';
            const openEntry = this.budgetPageInfo.budgetForecasts.find(x => x.isopen === true && x.budgetData === 'CapEx Forecast');
            const years = [openEntry.annualTotal, openEntry.y1, openEntry.y2, openEntry.y3, openEntry.y4, openEntry.y5];
            let foundYear = null;
            for (let i = 0; i < years.length; i++) {
                if (years[i] !== 0) {
                    foundYear = i;
                    break;
                }
            }
            return foundYear !== null ? (returnText + `Y${foundYear}`) : (id && id !== '' ? this.lookUpData.find(x => x.lookUpId === id)?.lookUpName : '');
        }
    }
    getPortfolioOwnerNameById(id: string): any {
        return this.filterCriteria?.portfolioOwner?.filter(x => x.isGmsbudgetOwner == true && x.portfolioOwnerId==id)[0]?.portfolioOwner || null;
    }

    setTextColors(): void {
        const tfpPercentage =this.budgetForecastForm.controls.tfpPercentage.value;
        const afpPercentage = this.budgetForecastForm.controls.afpPercentage.value;
        const ydtpPercentage = this.budgetForecastForm.controls.ytdpPercentage.value;
        const mdtpPercentage = this.budgetForecastForm.controls.mtdpPercentage.value;
        if(this.fundingInformations.budget.totalApprovedCapEx == 0 || this.fundingInformations.budget.totalApprovedCapEx == null){
            this.tfpColor = 'gray';
            this.afpColor = 'gray';
            this.ydtpColor = 'gray';
            this.mdtpColor = 'gray';
        }else{
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
            if(afpPercentage >= 10 || afpPercentage <= -10){
                this.afpColor = 'red'
            }else {
                this.afpColor = 'green'
            }
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
            if(mdtpPercentage >=5 || mdtpPercentage <= -5){
                this.mdtpColor = 'red'
            }else{
                this.mdtpColor = 'green'
            }
        }
    }
    lbePeriodCalendar(){
        const url = 'https://app.powerbi.com/groups/me/apps/aa1c834f-34df-4d86-8e69-246dea19b28a/reports/3d0acf48-54a4-4520-92d4-4fbf3914eec5/ReportSectionbd22354a21346769a025';
        window.open(url, '_blank');
    }
    isAnyEntryOpen(): boolean {
        return this.budgetForecasts.budgetForecasts.filter(x => x.budgetData == "CapEx Forecast").some(entry => entry.isopen);
    }
    forecastEditButtonEnabler(){
        if(this.projectHubService.roleControllerControl.budgetAdmin){
            this.enableForecastButton = true;
        }else{
            if (this.isAnyEntryOpen()) {
                if(!this.projectHubService.roleControllerControl.projectTeam){
                    this.enableForecastButton = false;
                }
                // else{
                //     this.enableForecastButton = !(this.budgetForecastsY1Capex.some(entry => entry.isopen == 2) && this.projectHubService.roleControllerControl.projectManager);
                // }
            }else{
                this.enableForecastButton = false;
            }
        }
        if(this.projectHubService.projectState=='Cancelled'){
            this.enableForecastButton = false;
        }
    }
    recalculateTfp() {
        const totalCapexForecast = this.currentEntry?.cumulativeTotal || 0;
        const totalApprovedCapEx = this.budgetForecasts.budget.totalApprovedCapEx || 0;
        if (totalCapexForecast === 0 && totalApprovedCapEx === 0) {
            this.tfpDev = 0;
        } else if (totalCapexForecast > 0 && totalApprovedCapEx === 0) {
            this.tfpDev = 100;
        } else if (totalCapexForecast < 0 && totalApprovedCapEx === 0) {
            this.tfpDev = -100;
        }  else if (totalCapexForecast === 0 && totalApprovedCapEx != 0) {
            this.tfpDev = -100;
        }
        else {
            this.tfpDev =  (totalCapexForecast-totalApprovedCapEx)*100 / Math.abs(totalApprovedCapEx);
        }
        this.budgetForecastForm.patchValue({
            tfpPercentage:  this.tfpDev,
            tfpValue: totalCapexForecast - totalApprovedCapEx,
        });
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
        }else if (currentAnnualTotal === 0 && planAnnualTotal != 0) {
            this.afpDev = -100;
        }
        else {
            this.afpDev = (currentAnnualTotal - planAnnualTotal)*100 / Math.abs(planAnnualTotal);
        }
        this.budgetForecastForm.patchValue({
            afpPercentage: this.afpDev,
            afpValue: currentAnnualTotal - planAnnualTotal,
        });
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
            this.ytdDev = (this.ytdCurrentTotal - this.ytdPlanTotal)*100 / Math.abs(this.ytdPlanTotal);
        }
        this.budgetForecastForm.patchValue({
            ytdpPercentage: this.ytdDev,
            ytdpValue: this.ytdCurrentTotal - this.ytdPlanTotal,
        });
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
        }else if (currentMonthValue === 0 && planMonthValue != 0) {
            this.mtdDev = -100;
        }
        else {
            this.mtdDev =  (currentMonthValue-planMonthValue)*100 / Math.abs(planMonthValue);
        }
        this.budgetForecastForm.patchValue({
            mtdpPercentage:  this.mtdDev,
            mtdpValue:this.currentEntry[this.getMonthText(currentMtdpDate.getMonth())]- this.planActive[this.getMonthText(currentMtdpDate.getMonth())],
        });
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
        console.log("Aaaaaaaaaaaaaaaa",this.budgetForecasts.budgetForecasts)
        let project = this.budgetForecasts.budgetForecasts.find(x => x.active == 'Current' && x.budgetData == "CapEx Forecast");
        let monthPart = project.periodName.slice(-2);
        if(project.active == 'Current'){
            return parseInt(monthPart, 10)-3;
        }
        if(project.active == 'Preliminary'){
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
}
