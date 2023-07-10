import {Component, OnInit} from '@angular/core';
import {ProjectHubService} from "../project-hub.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {ProjectApiService} from "../common/project-api.service";
import {PortfolioApiService} from "../../portfolio-center/portfolio-api.service";
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

    constructor(public projectHubService: ProjectHubService,
                private _Activatedroute: ActivatedRoute,
                private portApiService: PortfolioApiService,
                private authService: AuthService,
                private apiService: ProjectApiService,) {
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

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader(): void {
        this.portApiService.getfilterlist().then(filterres => {
            this.filterCriteria = filterres;
        })
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.portApiService.getOnlyLocalCurrency(this.id).then(currency => {
            this.localCurrency = currency
        });
        this.authService.lookupMaster().then((lookup: any) => {
            this.lookUpData = lookup
            this.projectHubService.lookUpMaster = lookup
            this.apiService.getBudgetPageInfo(this.id).then((res: any) => {
                this.budgetPageInfo = res;
                this.fundingInformations = res.budgetIOs;
                this.opexField = !!res.budget.opExRequired;
                this.capexField = !!res.budget.capExRequired;
                this.generalInfoPatchValue(res)
                this.viewContent = true
            })
        })
        this.disabler()
    }

    disabler() {
        this.budgetForm.disable()
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
            totalApprovedCapex:  response.budget.totalApprovedCapex,
            totalApprovedOpex:   response.budget.totalApprovedOpEx,
            budgetCommentary:  response.budget.budgetComment,
        })
        if(response.budget.budgetOwner=="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC" || response.budget.budgetOwner==null){
            this.showAddNewButton = true;
        }

    }

    getLookUpName(id: string): string {
        return id && id != '' ?  this.lookUpData.find(x => x.lookUpId == id)?.lookUpName : ''
    }
    getPortfolioOwnerNameById(id: string): any {
        return this.filterCriteria.portfolioOwner.filter(x => x.isGmsbudgetOwner == true && x.portfolioOwnerId==id)[0]?.portfolioOwner || null;
    }
}
