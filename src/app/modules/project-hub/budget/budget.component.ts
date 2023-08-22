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
    forecastData: any;
    forecastY1Data: any;
    forecastGeneralData :any;
    tfpColor: string;
    afpColor: string;
    ydtpColor: string;
    mdtpColor: string;

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
        reference: new FormControl(''),
        period: new FormControl(''),
        lastSubmitted: new FormControl(''),
        submittedBy: new FormControl(''),
        headerLabel: new FormControl(''),
        tfpPercentage: new FormControl(''),
        tfpValue: new FormControl(''),
        afpPercentage: new FormControl(''),
        afpValue: new FormControl(''),
        afpCodeId: new FormControl(''),
        ytdpPercentage: new FormControl(''),
        ytdpValue: new FormControl(''),
        mtdpPercentage:new FormControl(''),
        mtdpValue:new FormControl(''),
        mtdpCodeId: new FormControl(''),
    })

    ngOnInit(): void {
        this.http.get('assets/budget-data.json').subscribe(data => {
            this.forecastData = data;
        });
        this.http.get('assets/budget-data2.json').subscribe(data => {
            this.forecastY1Data = data;
        });
        this.http.get('assets/budget-data3.json').subscribe(data => {
            this.forecastGeneralData = data;
            this.forecastPatchGeneralForm(data);
        });
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
    forecastPatchGeneralForm(response){
        this.budgetForecastForm.patchValue({
            reference: "",
            period: response.getProjectBudgetByIDResult.ForecastPeriod,
            lastSubmitted: response.getProjectBudgetByIDResult.LastSubmitted,
            submittedBy: response.getProjectBudgetByIDResult.SubmittedBy,
            tfpPercentage: response.getProjectBudgetByIDResult.TotalForecastPerformance,
            tfpValue: response.getProjectBudgetByIDResult.TotalForecastPerformanceValue,
            afpPercentage: response.getProjectBudgetByIDResult.AnnualForecastPerformance,
            afpValue: response.getProjectBudgetByIDResult.AnnualForecastPerformanceValue,
            afpCodeId: response.getProjectBudgetByIDResult.AFPDeviationCodeID,
            ytdpPercentage: response.getProjectBudgetByIDResult.YearToDatePerformance,
            ytdpValue: response.getProjectBudgetByIDResult.YearToDatePerformanceValue,
            mtdpPercentage:response.getProjectBudgetByIDResult.MonthToDatePerformance,
            mtdpValue:response.getProjectBudgetByIDResult.MonthToDatePerformanceValue,
            mtdpCodeId: response.getProjectBudgetByIDResult.MTDPeviationCodeID,
            headerLabel: "",
        })
        this.setTextColors();
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
        const tfpPercentage = parseFloat(this.budgetForecastForm.controls.tfpPercentage.value);
        const afpPercentage = parseFloat(this.budgetForecastForm.controls.afpPercentage.value);
        const ydtpPercentage = parseFloat(this.budgetForecastForm.controls.ytdpPercentage.value);
        const mdtpPercentage = parseFloat(this.budgetForecastForm.controls.mtdpPercentage.value);
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
