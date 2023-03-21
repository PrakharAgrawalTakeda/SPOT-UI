import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import { FormControl, FormGroup} from "@angular/forms";
import {ProjectApiService} from "../project-api.service";
import {ActivatedRoute} from "@angular/router";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {ProjectHubService} from "../../project-hub.service";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";

@Component({
    selector: 'app-project-requirements',
    templateUrl: './project-requirements.component.html',
    styleUrls: ['./project-requirements.component.scss']
})
export class ProjectRequirementsComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    viewContent: boolean = false
    lookUpData: any = []
    id: string = ""
    projectRequirementsData: any = {}
    projectRequirementsForm = new FormGroup({
        projectID: new FormControl(''),
        financialDoesApply: new FormControl(false),
        primaryProductID: new FormControl(''),
        primaryProductName: new FormControl(''),
        projectName: new FormControl(''),
        problemID: new FormControl(''),
        otherImpactedProducts: new FormControl(''),
        portfolioOwnerID: new FormControl(''),
        portfolioOwner: new FormControl(''),
        defaultOwningOrganizationID: new FormControl(''),
        primaryKPI: new FormControl(''),
        isGMSGQLTAnnualMustWin: new FormControl(false),
        strategicYearID: new FormControl(''),
        annualMustWinID: new FormControl(''),
        agilePrimaryWorkstream: new FormControl(''),
        agileSecondaryWorkstream: new FormControl(''),
        agileWave: new FormControl(''),
        isAgile: new FormControl(false),
        isPOBOS: new FormControl(false),
        pobosCategory: new FormControl(''),
        isSiteAssessment: new FormControl(false),
        siteAssessmentCategory: new FormControl(''),
        projectDescription: new FormControl(''),
        proposalStatement: new FormControl(''),
        whynotgoforNextBestAlternative: new FormControl(''),
        estimatedFTE: new FormControl(''),
        shutdownRequired: new FormControl(''),
        regulatoryApprovalNeeded: new FormControl(''),
        totalCapExBaseCase: new FormControl(''),
        totalNonFTEOpExBaseCase: new FormControl(''),
        planFundingRequired: new FormControl(''),
        howMuch: new FormControl(''),
        budgetInPlan: new FormControl(''),
        approvedDate: new FormControl(''),
        projectReviewed: new FormControl(''),
        proposedExecutionStart: new FormControl(''),
        proposedExecutionEnd: new FormControl(''),
        opU: new FormControl(''),
        localCurrencyAbbreviation: new FormControl(''),
        impactedProductsName: new FormControl(''),
        functionGroupID: new FormControl(''),
    })
    formFieldHelpers: any

    constructor(private apiService: ProjectApiService,
                private _Activatedroute: ActivatedRoute,
                private portApiService: PortfolioApiService,
                private authService: AuthService,
                private projectHubService: ProjectHubService,
                public fuseAlert: FuseConfirmationService) {

        this.projectHubService.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            if (this.viewContent == true) {
                this.dataloader()
            }
        })
    }

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader(): void {
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
            this.authService.lookupMaster().then((lookup: any) => {
                this.authService.KPIMaster().then((kpi: any) => {
                    this.lookUpData = lookup
                    this.projectHubService.lookUpMaster = lookup
                    this.projectHubService.kpiMasters = kpi
                    this.apiService.getProjectRequirements(this.id).then((res: any) => {
                        this.projectRequirementsData = res
                        this.projectRequirementsPatchValue(res)
                        this.viewContent = true
                    })
                })
            })
        this.disabler()
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    disabler() {
        this.projectRequirementsForm.disable()
    }
    getLookUpName(id: string): string {
        return id && id != '' ? this.lookUpData.find(x => x.lookUpId == id).lookUpName : ''
    }
    projectRequirementsPatchValue(response) {
        this.projectRequirementsForm.patchValue({
            projectID: response.projectID,
            financialDoesApply: response.financialDoesApply,
            primaryProductID: response.primaryProductID,
            primaryProductName: response.primaryProductName,
            projectName: response.projectName,
            problemID: response.problemID,
            otherImpactedProducts: response.otherImpactedProducts,
            portfolioOwnerID: response.portfolioOwnerID,
            portfolioOwner: response.portfolioOwner,
            defaultOwningOrganizationID: response.defaultOwningOrganizationID,
            primaryKPI: response.primaryKPI,
            isGMSGQLTAnnualMustWin: response.isGMSGQLTAnnualMustWin,
            strategicYearID: response.strategicYearID,
            annualMustWinID: response.annualMustWinID,
            agilePrimaryWorkstream: response.agilePrimaryWorkstream,
            agileSecondaryWorkstream: response.agileSecondaryWorkstream,
            agileWave: response.agileWave,
            isAgile: response.isAgile,
            isPOBOS: response.isPOBOS,
            pobosCategory: response.pobosCategory,
            isSiteAssessment: response.isSiteAssessment,
            siteAssessmentCategory: response.siteAssessmentCategory,
            projectDescription: response.projectDescription,
            proposalStatement: response.proposalStatement,
            whynotgoforNextBestAlternative: response.whynotgoforNextBestAlternative,
            estimatedFTE: response.estimatedFTE,
            shutdownRequired: response.shutdownRequired,
            regulatoryApprovalNeeded: response.regulatoryApprovalNeeded,
            totalCapExBaseCase: response.totalCapExBaseCase,
            totalNonFTEOpExBaseCase: response.totalNonFTEOpExBaseCase,
            planFundingRequired: response.planFundingRequired,
            howMuch: response.howMuch,
            budgetInPlan: response.budgetInPlan,
            approvedDate: response.approvedDate,
            projectReviewed: response.projectReviewed,
            proposedExecutionStart: response.proposedExecutionStart,
            proposedExecutionEnd: response.proposedExecutionEnd,
            opU: response.opU,
            localCurrencyAbbreviation: response.localCurrencyAbbreviation,
            impactedProductsName: response.impactedProductsName,
            functionGroupID: response.functionGroupID,
        })
    }
}
