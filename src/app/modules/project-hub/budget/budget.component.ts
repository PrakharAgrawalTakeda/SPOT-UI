import {Component, OnInit} from '@angular/core';
import {ProjectHubService} from "../project-hub.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {ProjectApiService} from "../common/project-api.service";
import {PortfolioApiService} from "../../portfolio-center/portfolio-api.service";
import { HttpClient } from '@angular/common/http';

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
    retryCount = 0;

    constructor(public projectHubService: ProjectHubService,
                private _Activatedroute: ActivatedRoute,
                private portApiService: PortfolioApiService,
                private authService: AuthService,
                private apiService: ProjectApiService,
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
        const planMtdpDate = new Date(forecast.find(x => x.active == 'Plan').financialMonthStartDate)
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

}
