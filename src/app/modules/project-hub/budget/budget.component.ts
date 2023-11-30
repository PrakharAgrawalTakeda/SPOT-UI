import {Component, OnInit} from '@angular/core';
import {ProjectHubService} from "../project-hub.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {ProjectApiService} from "../common/project-api.service";
import {PortfolioApiService} from "../../portfolio-center/portfolio-api.service";
import {BudgetService} from "./budget.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../@fuse/services/confirmation";

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
    viewContent = false;

    filterCriteria: any = {}
    opexField:boolean = false;
    capexField:boolean = false;
    showAddNewButton: boolean = false;
    headerLabel: string = ""
    preliminaryExists: boolean = false;
    enableForecastButton: boolean = true;
    retryCount = 0;

    constructor(public projectHubService: ProjectHubService,
                private _Activatedroute: ActivatedRoute,
                private portApiService: PortfolioApiService,
                private authService: AuthService,
                private apiService: ProjectApiService,
                public budgetService: BudgetService,
                public fuseAlert: FuseConfirmationService) {
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
        afpCodeId: new FormControl(''),
        mtdpCodeId: new FormControl(''),
        committedSpend:  new FormControl(''),
    })

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader(): void {
        this.budgetService.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        const promises = [
            this.portApiService.getfilterlist(),
            this.portApiService.getOnlyLocalCurrency(this.budgetService.id),
            this.authService.lookupMaster(),
            this.apiService.getBudgetPageInfo(this.budgetService.id)
        ];
        Promise.all(promises)
            .then((response: any[]) => {
                this.filterCriteria = response[0];
                this.budgetService.localCurrency = response[1];
                this.projectHubService.lookUpMaster = response[2];
                this.opexField = !! response[3].budget.opExRequired;
                this.capexField = !!response[3].budget.capExRequired;
                this.budgetService.budgetPageInfo = response[3];
                this.budgetService.budgetForecastsY1Capex = response[3].budgetForecastsY1.filter(x => x.budgetData == "CapEx Forecast");
                this.budgetService.budgetForecastsY1Opex = response[3].budgetForecastsY1.filter(x => x.budgetData == "OpEx Forecast");
                this.budgetService.currentEntry = response[3].budgetForecasts.find(x => x.active == 'Current' && x.budgetData == "CapEx Forecast");
                this.budgetService.planActive = response[3].budgetForecasts.find(x => x.active === 'Plan' || x.budgetData === 'CapEx Forecast');
                this.forecastPatchGeneralForm(response[3].budgetForecasts.filter(x => x.budgetData == "CapEx Forecast"));
                this.generalInfoPatchValue(response[3])
                this.budgetService.forecastEditButtonEnabler();
                this.budgetService.startingMonth=this.budgetService.getStartingMonth();
                this.budgetService.checkIsCellEditable();
                this.budgetService.calculateForecast();
                this.budgetService.setTextColors();
                this.budgetService.openEntriesExist = response[3].budgetForecasts.some(item => item.budgetData === 'CapEx Forecast' && item.isopen === true);
                if(this.budgetService.openEntriesExist){
                    this.budgetService.openEntry = response[3].budgetForecasts.find(x => x.isopen == true);
                }
                this.budgetService.setLabels();
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
            localCurrency:  this.budgetService.localCurrency?.localCurrencyAbbreviation,
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
    forecastPatchGeneralForm(forecast:any){
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
            afpCodeId: this.getLookUpName(forecast.find(x => x.active == 'Current').afpDeviationCodeID),
            mtdpCodeId: this.getLookUpName( this.budgetService.currentEntry.mtdpDeviationCodeID),
            committedSpend: forecast.find(x => x.active == 'Current').committedSpend,
        })
        this.budgetService.headerLabel = "Current " +  forecast.find(x => x.active == 'Current').periodName + " versus Plan " +forecast.find(x => x.active == 'Plan').periodName
    }


    getLookUpName(id: string): string {
        return id && id != '' ?  this.projectHubService.lookUpMaster.find(x => x.lookUpId == id)?.lookUpName : ''
    }
    getFundingStatus(id: string): string {
        if (this.budgetService.budgetPageInfo.budgetIOs.length !== 0) {
            return id && id !== '' ? this.projectHubService.lookUpMaster.find(x => x.lookUpId === id)?.lookUpName : '';
        } else {
            let returnText = 'Not Initiated Future Spend FY ';
            const openEntry =  this.budgetService.budgetPageInfo.budgetForecasts.find(x => x.isopen === true && x.budgetData === 'CapEx Forecast');
            let foundYear = null;
            if(openEntry) {
                const years = [openEntry.annualTotal, openEntry.y1, openEntry.y2, openEntry.y3, openEntry.y4, openEntry.y5];
                for (let i = 0; i < years.length; i++) {
                    if (years[i] !== 0) {
                        foundYear = i;
                        break;
                    }
                }
            }
            return foundYear !== null ? (returnText + `Y${foundYear}`) : (id && id !== '' ? this.projectHubService.lookUpMaster.find(x => x.lookUpId === id)?.lookUpName : '');
        }
    }
    getPortfolioOwnerNameById(id: string): any {
        return this.filterCriteria?.portfolioOwner?.filter(x => x.isGmsbudgetOwner == true && x.portfolioOwnerId==id)[0]?.portfolioOwner || null;
    }

    lbePeriodCalendar(){
        const url = 'https://app.powerbi.com/groups/me/apps/aa1c834f-34df-4d86-8e69-246dea19b28a/reports/3d0acf48-54a4-4520-92d4-4fbf3914eec5/ReportSectionbd22354a21346769a025';
        window.open(url, '_blank');
    }
}
