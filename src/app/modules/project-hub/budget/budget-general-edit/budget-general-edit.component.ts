import { Component } from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../core/auth/auth.service";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectApiService} from "../../common/project-api.service";

@Component({
  selector: 'app-budget-general-edit',
  templateUrl: './budget-general-edit.component.html',
  styleUrls: ['./budget-general-edit.component.scss']
})
export class BudgetGeneralEditComponent {
    viewContent: boolean = false;
    showMessage: boolean = false;
    local: any = [];
    lookupdata: any = [];
    id: string = "";
    localCurrency:any = [];
    budgetInfo: any = {}
    filterCriteria: any = {}
    isBudgetAdmin: boolean = true;
    isBudgetOwnerEditable: boolean = false;
    showBudgetIdButton: boolean = false;
    budgetInfoForm = new FormGroup({
        capexRequired: new FormControl(''),
        opexRequired: new FormControl(''),
        parentProgram: new FormControl(''),
        localCurrency: new FormControl(''),
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
                 private _Activatedroute: ActivatedRoute,
                 private apiService: ProjectApiService){
        this.budgetInfoForm.controls.localCurrency.disable();
        this.budgetInfoForm.controls.parentProgram.disable()
        if(this.budgetInfoForm.controls.capexRequired.value =="0b52f476-5a54-4bbc-a2e6-da56016a36e0"){
            this.budgetInfoForm.controls.capexRequired.disable()
        }
        this.budgetInfoForm.controls.budgetId.disable()
        if(!this.isBudgetOwnerEditable){
            this.budgetInfoForm.controls.gmsBudgetowner.disable()
        }
        this.budgetInfoForm.valueChanges.subscribe(res => {
            if(this.budgetInfoForm.controls.capexRequired.value =="0b52f476-5a54-4bbc-a2e6-da56016a36e0"){
                //Before clicking submit
                if(this.budgetInfoForm.controls.gmsBudgetowner.value.portfolioOwnerId=="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC" && !this.isBudgetAdmin){
                    this.budgetInfoForm.controls.budgetId.enable({emitEvent : false})
                    this.showBudgetIdButton = false;
                }else{
                    this.showBudgetIdButton = true;
                }
                if(this.isBudgetAdmin && this.budgetInfoForm.controls.gmsBudgetowner.value.portfolioOwnerId!="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC"){
                    this.budgetInfoForm.controls.budgetId.enable({emitEvent : false})
                    this.showBudgetIdButton = true;
                }
            }else{
                this.showBudgetIdButton = false;
                if(this.budgetInfoForm.controls.gmsBudgetowner.value?.portfolioOwnerId=="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC"){
                    this.budgetInfoForm.controls.budgetId.setValue('',{emitEvent : false})
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
        this.portApiService.getOnlyLocalCurrency(this.id).then(currency => {
            this.localCurrency = currency
            this.budgetInfoForm.patchValue({
                localCurrency:  this.localCurrency.localCurrencyAbbreviation,
            })
        });

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

    submitBudgetInfo() {}

    disabler() {

    }
    generalInfoPatchValue(response){
        this.getPortfolioOwnerNameById(response.budget.budgetOwner)
        this.budgetInfoForm.patchValue({
            capexRequired: response.budget.capExRequired ? response.budget.capExRequired : "17ac13d1-a591-4e4f-ba7b-00d72124b1c4" ,
            opexRequired:  response.budget.opExRequired ? response.budget.opExRequired : "17ac13d1-a591-4e4f-ba7b-00d72124b1c4" ,
            parentProgram:  response.parentProgram,
            localCurrency:  this.localCurrency.localCurrencyAbbreviation,
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
    }
    getPortfolioOwnerNameById(id: string): any {
        return this.filterCriteria.portfolioOwner.filter(x => x.isGmsbudgetOwner == true && x.portfolioOwnerId==id)[0];
    }
    getPortfolioOwner(): any {
        return this.filterCriteria.portfolioOwner.filter(x => x.isGmsbudgetOwner == true)
    }
}
