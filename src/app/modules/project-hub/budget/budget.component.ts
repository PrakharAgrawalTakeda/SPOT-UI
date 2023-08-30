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
    headerLabel: string = ""
    preliminaryExists: boolean = false;

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
                this.generalInfoPatchValue(response[3])
                this.budgetForecasts = response[3];
                this.forecastPatchGeneralForm(response[3].budgetForecasts.filter(x => x.budgetData == "CapEx Forecast"), response[3].budget);
                this.viewContent = true
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
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
            projectFundingStatus:  this.getLookUpName(response.budget.fundingStatusId),
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
        this.budgetForecastForm.patchValue({
            referenceCurrent: forecast.find(x => x.active == 'Current').active,
            periodCurrent: forecast.find(x => x.active == 'Current').periodName,
            lastSubmittedCurrent: forecast.find(x => x.active == 'Current').lastSubmitted,
            submittedByCurrent: forecast.find(x => x.active == 'Current').userName,
            tfpPercentage:  Number((forecast.find(x => x.active == 'Plan').cumulativeTotal / (budget.totalApprovedCapEx ? budget.totalApprovedCapEx : 1)).toFixed(2)),
            tfpValue: forecast.find(x => x.active == 'Plan').cumulativeTotal - (budget.totalApprovedCapEx ? budget.totalApprovedCapEx : 0),
            afpPercentage: Number((forecast.find(x => x.active == 'Current').annualTotal/forecast.find(x => x.active == 'Plan').annualTotal).toFixed(2)),
            afpValue: forecast.find(x => x.active == 'Current').annualTotal - forecast.find(x => x.active == 'Plan').annualTotal,
            afpCodeId: this.getLookUpName(forecast.find(x => x.active == 'Current').afpDeviationCodeID),
            ytdpPercentage: Number((forecast.find(x => x.active == 'Current').historical / forecast.find(x => x.active == 'Plan').historical).toFixed(2)),
            ytdpValue: forecast.find(x => x.active == 'Current').historical - forecast.find(x => x.active == 'Plan').historical,
            mtdpPercentage: Number((forecast.find(x => x.active == 'Current')[this.getMonthText(currentMtdpDate.getMonth())] /  forecast.find(x => x.active == 'Plan')[this.getMonthText(planMtdpDate.getMonth())]).toFixed(2)),
            mtdpValue: forecast.find(x => x.active == 'Current')[this.getMonthText(currentMtdpDate.getMonth())] -  forecast.find(x => x.active == 'Plan')[this.getMonthText(planMtdpDate.getMonth())],
            mtdpCodeId: this.getLookUpName(forecast.find(x => x.active == 'Current').mtdpDeviationCodeID),
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
    getPortfolioOwnerNameById(id: string): any {
        return this.filterCriteria?.portfolioOwner?.filter(x => x.isGmsbudgetOwner == true && x.portfolioOwnerId==id)[0]?.portfolioOwner || null;
    }
    getAfdDeviationCodes(): any {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '6929db50-f72b-4ecc-9a15-7ca598f8323d')
    }
    getMtdpDeviationCodes(): any {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '1391c70a-088d-435a-9bdf-c4ed6d88c09d')
    }
    setTextColors(): void {
        const tfpPercentage =this.budgetForecastForm.controls.tfpPercentage.value;
        const afpPercentage = this.budgetForecastForm.controls.afpPercentage.value;
        const ydtpPercentage = this.budgetForecastForm.controls.ytdpPercentage.value;
        const mdtpPercentage = this.budgetForecastForm.controls.mtdpPercentage.value;
        if(tfpPercentage >= 5){
            this.tfpColor = 'green'
        }else{
            this.tfpColor = 'red'
        }
        if(afpPercentage >= 10 || afpPercentage <= -10){
            this.afpColor = 'red'
        }else {
            this.afpColor = 'green'
        }
        if(ydtpPercentage >= 10 || afpPercentage <= -10){
            this.ydtpColor = 'red'
        }else{
            this.ydtpColor = 'green'
        }
        if(mdtpPercentage >=5 || mdtpPercentage <= -5){
            this.mdtpColor = 'red'
        }else{
            this.mdtpColor = 'green'
        }
    }

}
