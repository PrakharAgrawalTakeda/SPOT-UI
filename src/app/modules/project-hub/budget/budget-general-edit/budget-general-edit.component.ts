import { Component } from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/auth/auth.service";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectApiService} from "../../common/project-api.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {RoleService} from "../../../../core/auth/role.service";
import {MsalService} from "@azure/msal-angular";
import {map} from "rxjs";

@Component({
  selector: 'app-budget-general-edit',
  templateUrl: './budget-general-edit.component.html',
  styleUrls: ['./budget-general-edit.component.scss']
})
export class BudgetGeneralEditComponent {
    viewContent: boolean = false;
    local: any = [];
    lookupdata: any = [];
    id: string = "";
    localCurrency:any = [];
    budgetInfo: any = {}
    filterCriteria: any = {}
    isBudgetAdmin: boolean = false;
    isBudgetOwnerEditable: boolean = false;
    showBudgetIdButton: boolean = false;
    required:boolean = false;
    budgetInfoForm = new FormGroup({
        capexRequired: new FormControl(false),
        assetPlaced: new FormControl(''),
        budgetId: new FormControl(''),
        gmsBudgetowner: new FormControl(null),
        predefinedInvestmentId: new FormControl(''),
        where: new FormControl(''),
        why: new FormControl(''),
        fundingApprovalNeedDate: new FormControl(''),
        projectFundingStatus: new FormControl(''),
        totalApprovedCapex: new FormControl(''),
        totalApprovedOpex: new FormControl(''),
        budgetCommentary: new FormControl(''),
    })
    constructor (public projectHubService: ProjectHubService,
                 private portApiService: PortfolioApiService,
                 public auth: AuthService,
                 private msalService: MsalService,
                 private _Activatedroute: ActivatedRoute,
                 public fuseAlert: FuseConfirmationService,
                 private apiService: ProjectApiService,
                 private roleService: RoleService){
        if(this.capexRequired.value ==true){
            this.capexRequired.disable()
        }
        this.budgetInfoForm.controls.budgetId.disable()
        this.budgetInfoForm.controls.budgetId.valueChanges.subscribe(res => {
            this.budgetId.updateValueAndValidity({emitEvent : false})
        })
        this.budgetInfoForm.controls.predefinedInvestmentId.valueChanges.subscribe(res => {
            this.predefinedInvestmentId.updateValueAndValidity({emitEvent : false})
        })
        this.budgetInfoForm.controls.gmsBudgetowner.valueChanges.subscribe(res => {
            this.gmsBudgetowner.updateValueAndValidity({emitEvent : false})
        })
        this.budgetInfoForm.controls.where.valueChanges.subscribe(res => {
            this.where.updateValueAndValidity({emitEvent : false})
        })
        this.budgetInfoForm.controls.why.valueChanges.subscribe(res => {
            this.why.updateValueAndValidity({emitEvent : false})
        })
        this.budgetInfoForm.valueChanges.subscribe(res => {
            this.predefinedInvestmentId.updateValueAndValidity({emitEvent : false})
            this.why.updateValueAndValidity({emitEvent : false})
            this.where.updateValueAndValidity({emitEvent : false})
            this.gmsBudgetowner.updateValueAndValidity({emitEvent : false})
            this.budgetId.updateValueAndValidity({emitEvent : false})
        })
        this.capexRequired.valueChanges.subscribe(res => {
            // Choosing Yes
            if(this.budgetInfoForm.controls.capexRequired.value ==true){
                this.required = true;
                this.budgetId.setValidators(Validators.required)
                this.predefinedInvestmentId.setValidators(Validators.required)
                this.gmsBudgetowner.setValidators(Validators.required)
                this.where.setValidators(Validators.required)
                this.why.setValidators(Validators.required)
                if(this.budgetInfoForm.controls.gmsBudgetowner.value?.portfolioOwnerId=="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC"){
                    this.budgetInfoForm.controls.budgetId.enable({emitEvent : false})
                    this.budgetInfoForm.controls.predefinedInvestmentId.enable({emitEvent : false})
                    this.budgetInfoForm.controls.where.enable({emitEvent : false})
                    this.budgetInfoForm.controls.why.enable({emitEvent : false})
                    if(!this.isBudgetAdmin){
                        this.budgetInfoForm.controls.budgetId.disable({emitEvent : false})
                        this.showBudgetIdButton = false;
                    }else{
                        this.budgetInfoForm.controls.budgetId.enable({emitEvent : false})
                        this.showBudgetIdButton = true;
                    }
                }else{
                    if(!this.isBudgetAdmin){
                        this.budgetInfoForm.controls.budgetId.disable({emitEvent : false})
                        this.showBudgetIdButton = true;
                    }else{
                        this.budgetInfoForm.controls.budgetId.enable({emitEvent : false})
                        this.showBudgetIdButton = true;
                    }
                }
            }else{
                this.required = false;
                this.budgetId.clearValidators()
                this.predefinedInvestmentId.clearValidators()
                this.gmsBudgetowner.clearValidators()
                this.where.clearValidators()
                this.why.clearValidators()
                this.showBudgetIdButton = false;
                this.budgetInfoForm.controls.budgetId.setValue('',{emitEvent : false})
                if(this.budgetInfoForm.controls.gmsBudgetowner.value?.portfolioOwnerId=="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC"){
                    this.budgetInfoForm.controls.budgetId.disable({emitEvent : false})
                }
            }
        })
    }
    ngOnInit(): void {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.apiService.getBudgetPageInfo(this.projectHubService.projectid).then((res: any) => {
            this.budgetInfo = res
            this.filterCriteria = this.projectHubService.all
            this.generalInfoPatchValue(res)
            this.viewContent = true
        })
        this.roleService.getCurrentRole(this.msalService.instance.getActiveAccount().localAccountId).then((res: any) => {
            this.isBudgetAdmin = !!res.secondarySecurityGroupId.includes("500ee862-3878-43d9-9378-53feb1832cef");
        })

    }

    getYesNo(): any {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == 'c58fb456-3901-4677-9ec5-f4eada7158e6')
    }
    getPredifinedInvestment(): any {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '3bfab1e2-2711-482b-8674-e697219e9f3e')
    }
    getWhereLookup(): any {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '6491dc30-2c0d-434f-bc10-7650d1a23c5c')
    }
    getWhyLookup(): any {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '927293cb-d4ca-4f31-8af6-c33c9e4792d1')
    }

    submitBudgetInfo() {
        if (this.required) {
            var fieldsMissing = 0;
            var missingFields = [];
            if(this.budgetId.invalid){
                fieldsMissing ++;
                missingFields.push("Budget ID")
            }
            if(Object.keys(this.predefinedInvestmentId.value).length === 0){
                fieldsMissing ++;
                missingFields.push("Global/Regional Predefined Investment")
            }
            // if(this.gmsBudgetowner.value.portfolioOwnerId=="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC"){
            //     fieldsMissing ++;
            //     missingFields.push("GMS Budget Owner")
            // }
            if(this.where.invalid){
                fieldsMissing ++;
                missingFields.push("Where")
            }
            if(this.why.invalid){
                fieldsMissing ++;
                missingFields.push("Why")
            }
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "The following fields are required",
                "message": this.getMissingFieldsString(missingFields),
                "icon": {
                    "show": true,
                    "name": "heroicons_outline:exclamation",
                    "color": "warn"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "OK",
                        "color": "warn"
                    },
                    "cancel": {
                        "show": true,
                        "label": "Cancel"
                    }
                },
                "dismissible": true
            }
            if(fieldsMissing!=0){
                const riskIssueAlert = this.fuseAlert.open(comfirmConfig)
                riskIssueAlert.afterClosed().subscribe(close => {
                    if (close == 'confirmed') {
                    }
                })
            }else{

            }
        }
    }
    getMissingFieldsString(fields) : string {
        return fields.join(', ')
    }
    disabler() {

    }
    generalInfoPatchValue(response){
        this.getPortfolioOwnerNameById(response.budget.budgetOwner)
        this.budgetInfoForm.patchValue({
            capexRequired: response.budget.capExRequired,
            assetPlaced:  response.budget.definitiveCrapprovalDate,
            budgetId:  response.budget.capitalBudgetId,
            gmsBudgetowner:  this.getPortfolioOwnerNameById(response.budget.budgetOwner),
            predefinedInvestmentId:  response.budget.predefinedInvestmentId,
            where:  response.budget.whereId,
            why:  response.budget.whyId,
            fundingApprovalNeedDate:  response.budget.fundingApprovalNeedDate,
            projectFundingStatus:  response.budget.fundingStatusId,
            totalApprovedCapex:  response.budget.totalApprovedCapExFxconv,
            totalApprovedOpex:  response.budget.totalApprovedOpExFxconv,
            budgetCommentary:  response.budget.budgetComment,
        })
        if(!this.gmsBudgetowner.value.gmsbudgetOwnerEditable){
            this.gmsBudgetowner.disable()
        }
    }
    getPortfolioOwnerNameById(id: string): any {
        return this.filterCriteria.portfolioOwner.filter(x => x.isGmsbudgetOwner == true && x.portfolioOwnerId==id)[0];
    }
    getPortfolioOwner(): any {
        return this.filterCriteria.portfolioOwner.filter(x => x.isGmsbudgetOwner == true)
    }
    requestBudgetId(): any {
        this.apiService.getNewBudgetId(this.projectHubService.projectid).then((res: any) => {
            this.budgetInfoForm.patchValue({
                budgetId:  res.BudgetId,
            })
            this.showBudgetIdButton = false;
            this.budgetId.disable();
        })
    }
    getGmsBudgetOwner(): any {
        if(this.isBudgetAdmin){
            return this.filterCriteria.portfolioOwner.filter(x => x.isGmsbudgetOwner == true)
        }else{
            if(!this.gmsBudgetowner.invalid){
                return this.filterCriteria.portfolioOwner.filter(x => x.isGmsbudgetOwner == true && x.gmsbudgetOwnerEditable)
            }else{
                return this.filterCriteria.portfolioOwner.filter(x => x.isGmsbudgetOwner == true)
            }
        }

    }
    get budgetId() {
        return this.budgetInfoForm.get('budgetId');
    }
    get predefinedInvestmentId() {
        return this.budgetInfoForm.get('predefinedInvestmentId');
    }
    get gmsBudgetowner() {
        return this.budgetInfoForm.get('gmsBudgetowner');
    }
    get where() {
        return this.budgetInfoForm.get('where');
    }
    get why() {
        return this.budgetInfoForm.get('why');
    }
    get capexRequired() {
        return this.budgetInfoForm.get('capexRequired');
    }


}
