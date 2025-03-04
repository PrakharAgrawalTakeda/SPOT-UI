import {Component, EventEmitter, Output} from '@angular/core';
import {EventType} from "@azure/msal-browser";
import {FormControl, FormGroup} from "@angular/forms";
import {ProjectApiService} from "../../project-api.service";
import {ProjectHubService} from "../../../project-hub.service";
import { FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {RoleService} from "../../../../../core/auth/role.service";
import {MsalService} from "@azure/msal-angular";
import {PortfolioApiService} from "../../../../portfolio-center/portfolio-api.service";
import * as moment from "moment/moment";

@Component({
    selector: 'app-project-requirements-edit',
    templateUrl: './project-requirements-edit.component.html',
    styleUrls: ['./project-requirements-edit.component.scss']
})
export class ProjectRequirementsEditComponent {
    @Output() eventName = new EventEmitter<EventType>();
    viewContent: boolean = false
    projectRequirements: any = {}
    lookupdata: any = [];
    local: any = [];
    localCurrency:any = [];
    projectRequirementsForm = new FormGroup({
        projectID: new FormControl(''),
        financialDoesApply: new FormControl(false),
        primaryProductID: new FormControl(''),
        primaryProductName: new FormControl(''),
        projectName: new FormControl(''),
        problemType: new FormControl(''),
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
        functionsRequiredId: new FormControl(''),
    })
    @Output() formValue = new EventEmitter<any>();

    constructor(private apiService: ProjectApiService,
                public projectHubService: ProjectHubService,
                public fuseAlert: FuseConfirmationService,
                public role: RoleService,
                private authService: MsalService,
                private portApiService: PortfolioApiService,) {

        this.projectRequirementsForm.valueChanges.subscribe(res => {
            if (this.viewContent) {
                this.projectHubService.isFormChanged = true
            }
        })
    }


    ngOnInit(): void {
        this.apiService.getProjectRequirements(this.projectHubService.projectid).then((res: any) => {
            let newShutdownRequired = null;
            let newRegulatoryApprovalNeeded = null;
            let newPlanFundingRequired = null;
            let newBudgetInPlan = null;
            if(res.shutdownRequired == "Yes"){
                newShutdownRequired = "0b52f476-5a54-4bbc-a2e6-da56016a36e0";
            }else if(res.shutdownRequired == "No") {
                newShutdownRequired = "17ac13d1-a591-4e4f-ba7b-00d72124b1c4";
            }

            if(res.regulatoryApprovalNeeded == "Yes"){
                newRegulatoryApprovalNeeded = "0b52f476-5a54-4bbc-a2e6-da56016a36e0";
            }else if(res.regulatoryApprovalNeeded == "No") {
                newRegulatoryApprovalNeeded = "17ac13d1-a591-4e4f-ba7b-00d72124b1c4";
            }
            if(res.planFundingRequired == "Yes"){
                newPlanFundingRequired = "0b52f476-5a54-4bbc-a2e6-da56016a36e0";
            }else if(res.planFundingRequired == "No") {
                newPlanFundingRequired = "17ac13d1-a591-4e4f-ba7b-00d72124b1c4";
            }
            if(res.budgetInPlan == "Yes"){
                newBudgetInPlan = "0b52f476-5a54-4bbc-a2e6-da56016a36e0";
            }else if(res.budgetInPlan == "No") {
                newBudgetInPlan = "17ac13d1-a591-4e4f-ba7b-00d72124b1c4";
            };
            this.projectRequirements = res
            this.projectRequirementsForm.patchValue({
                projectID: res.projectID,
                financialDoesApply: res.financialDoesApply,
                primaryProductID: res.primaryProductID,
                primaryProductName: res.primaryProductName,
                projectName: res.projectName,
                problemID: res.problemID,
                otherImpactedProducts: res.otherImpactedProducts,
                portfolioOwnerID: res.portfolioOwnerID,
                portfolioOwner: res.portfolioOwner,
                defaultOwningOrganizationID: res.defaultOwningOrganizationID,
                primaryKPI: res.primaryKPI,
                isGMSGQLTAnnualMustWin: res.isGMSGQLTAnnualMustWin,
                strategicYearID: res.strategicYearID,
                annualMustWinID: res.annualMustWinID,
                agilePrimaryWorkstream: res.agilePrimaryWorkstream,
                agileSecondaryWorkstream: res.agileSecondaryWorkstream,
                agileWave: res.agileWave,
                isAgile: res.isAgile,
                isPOBOS: res.isPOBOS,
                pobosCategory: res.pobosCategory,
                isSiteAssessment: res.isSiteAssessment,
                siteAssessmentCategory: res.siteAssessmentCategory,
                projectDescription: res.projectDescription,
                proposalStatement: res.proposalStatement,
                whynotgoforNextBestAlternative: res.whynotgoforNextBestAlternative,
                estimatedFTE: res.estimatedFTE,
                shutdownRequired: newShutdownRequired,
                regulatoryApprovalNeeded: newRegulatoryApprovalNeeded,
                totalCapExBaseCase: res.totalCapExBaseCase,
                totalNonFTEOpExBaseCase: res.totalNonFTEOpExBaseCase,
                planFundingRequired: newPlanFundingRequired,
                howMuch: res.howMuch,
                budgetInPlan: newBudgetInPlan,
                approvedDate: res.approvedDate,
                projectReviewed: res.projectReviewed,
                proposedExecutionStart: res.proposedExecutionStart,
                proposedExecutionEnd: res.proposedExecutionEnd,
                opU: res.opU,
                localCurrencyAbbreviation: res.localCurrencyAbbreviation,
                impactedProductsName: res.impactedProductsName,
                functionGroupID: res.functionGroupID,
                functionsRequiredId: res.functionsRequiredId,
                problemType: res.problemType
            })
            this.portApiService.getOnlyLocalCurrency(this.projectHubService.projectid).then(currency => {
                this.localCurrency = currency
                this.projectHubService.localCurrency = currency;
            });
            this.viewContent = true
        })

    }

    submitProjectRequirementsEdit() {
        this.projectHubService.isFormChanged = false
        const formValue = this.projectRequirementsForm.getRawValue();
        const mainObj = this.projectRequirements;
        mainObj.projectID = this.projectHubService.projectid
        mainObj.financialDoesApply = formValue.financialDoesApply
        mainObj.primaryProductID = formValue.primaryProductID
        mainObj.primaryProductName = formValue.primaryProductName
        mainObj.projectName = formValue.projectName
        mainObj.problemID = formValue.problemID
        mainObj.otherImpactedProducts = formValue.otherImpactedProducts
        mainObj.portfolioOwnerID = formValue.portfolioOwnerID
        mainObj.portfolioOwner = formValue.portfolioOwner
        mainObj.defaultOwningOrganizationID = formValue.defaultOwningOrganizationID
        mainObj.primaryKPI = formValue.primaryKPI
        mainObj.isGMSGQLTAnnualMustWin = formValue.isGMSGQLTAnnualMustWin
        mainObj.strategicYearID = formValue.strategicYearID
        mainObj.annualMustWinID = formValue.annualMustWinID
        mainObj.agilePrimaryWorkstream = formValue.agilePrimaryWorkstream
        mainObj.agileSecondaryWorkstream = formValue.agileSecondaryWorkstream
        mainObj.agileWave = formValue.agileWave
        mainObj.isAgile = formValue.isAgile
        mainObj.isPOBOS = formValue.isPOBOS
        mainObj.pobosCategory = formValue.pobosCategory
        mainObj.isSiteAssessment = formValue.isSiteAssessment
        mainObj.siteAssessmentCategory = formValue.siteAssessmentCategory
        mainObj.projectDescription = formValue.projectDescription
        mainObj.proposalStatement = formValue.proposalStatement
        mainObj.whynotgoforNextBestAlternative = formValue.whynotgoforNextBestAlternative
        mainObj.estimatedFTE = formValue.estimatedFTE
        mainObj.shutdownRequired = formValue.shutdownRequired
        mainObj.regulatoryApprovalNeeded = formValue.regulatoryApprovalNeeded
        mainObj.totalCapExBaseCase = formValue.totalCapExBaseCase
        mainObj.totalNonFTEOpExBaseCase = formValue.totalNonFTEOpExBaseCase
        mainObj.planFundingRequired = formValue.planFundingRequired
        mainObj.howMuch = formValue.howMuch
        mainObj.budgetInPlan = formValue.budgetInPlan
        mainObj.approvedDate = formValue.approvedDate
        mainObj.projectReviewed = formValue.projectReviewed
        mainObj.proposedExecutionStart = formValue.proposedExecutionStart ? moment(formValue.proposedExecutionStart).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null
        mainObj.proposedExecutionEnd =  formValue.proposedExecutionEnd ? moment(formValue.proposedExecutionEnd).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null
        mainObj.opU = formValue.opU
        mainObj.localCurrencyAbbreviation = formValue.localCurrencyAbbreviation
        mainObj.impactedProductsName = formValue.impactedProductsName
        mainObj.functionGroupID = formValue.functionGroupID
        mainObj.functionsRequiredId = formValue.functionsRequiredId
        mainObj.projectType = formValue.problemType
        this.apiService.editProjectRequirements(this.authService.instance.getActiveAccount().localAccountId, mainObj).then(res => {
            this.projectHubService.isNavChanged.next(true)
            this.projectHubService.submitbutton.next(true)
            this.projectHubService.successSave.next(true)
            this.projectHubService.toggleDrawerOpen('', '', [], '')
        })

    }
    getYesNo(): any {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == 'c58fb456-3901-4677-9ec5-f4eada7158e6')
    }
    getFunctionsRequired(): any {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '57955fe4-cede-4c81-8b00-d806193046d2')
    }
}
