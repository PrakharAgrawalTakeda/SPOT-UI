import { Component, Input } from '@angular/core';
import { ProjectHubService } from "../../project-hub.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../core/auth/auth.service";
import { PortfolioApiService } from "../../../portfolio-center/portfolio-api.service";
import { ActivatedRoute } from "@angular/router";
import { ProjectApiService } from "../../common/project-api.service";
import { FuseConfirmationConfig, FuseConfirmationService } from "../../../../../@fuse/services/confirmation";
import { MsalService } from "@azure/msal-angular";
import * as moment from "moment";
import { SharedService } from 'app/shared.service';

@Component({
    selector: 'app-budget-general-edit',
    templateUrl: './budget-general-edit.component.html',
    styleUrls: ['./budget-general-edit.component.scss']
})
export class BudgetGeneralEditComponent {
    @Input() mode: 'CAPEX' | 'Normal' = 'Normal'
    viewContent: boolean = false;
    local: any = [];
    id: string = "";
    localCurrency: any = [];
    budgetInfo: any = {}
    filterCriteria: any = {}
    isBudgetAdmin: boolean = false;
    showBudgetIdButton: boolean = false;
    required: boolean = false;
    gmsBudgetOwnerList: any = [];
    budgetInfoForm = new FormGroup({
        capexRequired: new FormControl(false),
        assetPlaced: new FormControl(''),
        budgetId: new FormControl(''),
        gmsBudgetowner: new FormControl(null),
        predefinedInvestmentId: new FormControl(null),
        where: new FormControl(''),
        why: new FormControl(''),
        //fundingApprovalNeedDate: new FormControl(''),
        projectFundingStatus: new FormControl(''),
        totalApprovedCapex: new FormControl(''),
        totalApprovedOpex: new FormControl(''),
    })
    viewStandardMilestonesSets: boolean = false;
    lookUpData: any = [];
    standardMilestoneData: any = []
    standardMilestoneDBData: any = []
    standarMilestoneAdded: any = []
    standardCAPEXMilestoneData: any;
    standarCAPEXMilestoneAdded: any = []
    formValue: {
        capexRequired: boolean; assetPlaced: string; budgetId: string; gmsBudgetowner: any; predefinedInvestmentId: any; where: string; why: string;
        //fundingApprovalNeedDate: string; 
        projectFundingStatus: string; totalApprovedCapex: string; totalApprovedOpex: string;
    };
    mainObj: any;
    constructor(public projectHubService: ProjectHubService,
        private portApiService: PortfolioApiService,
        public auth: AuthService,
        private msalService: MsalService,
        private _Activatedroute: ActivatedRoute,
        public fuseAlert: FuseConfirmationService,
        private apiService: ProjectApiService,
        private sharedService: SharedService) {

        this.budgetInfoForm.controls.budgetId.valueChanges.subscribe(res => {
            this.budgetId.updateValueAndValidity({ emitEvent: false })
        })
        this.budgetInfoForm.controls.predefinedInvestmentId.valueChanges.subscribe(res => {
            this.predefinedInvestmentId.updateValueAndValidity({ emitEvent: false })
        })
        this.budgetInfoForm.controls.gmsBudgetowner.valueChanges.subscribe(res => {
            this.gmsBudgetowner.updateValueAndValidity({ emitEvent: false })
        })
        this.budgetInfoForm.controls.where.valueChanges.subscribe(res => {
            this.where.updateValueAndValidity({ emitEvent: false })
        })
        this.budgetInfoForm.controls.why.valueChanges.subscribe(res => {
            this.why.updateValueAndValidity({ emitEvent: false })
        })
        this.budgetInfoForm.valueChanges.subscribe(res => {
            //debugger
            this.projectHubService.isFormChanged = true
            this.predefinedInvestmentId.updateValueAndValidity({ emitEvent: false })
            this.why.updateValueAndValidity({ emitEvent: false })
            this.where.updateValueAndValidity({ emitEvent: false })
            this.gmsBudgetowner.updateValueAndValidity({ emitEvent: false })
            this.budgetId.updateValueAndValidity({ emitEvent: false })
        })
        this.capexRequired.valueChanges.subscribe(res => {
            // Choosing Yes
            if (this.budgetInfoForm.controls.capexRequired.value == true) {
                this.mode = 'CAPEX'
                if (!this.isBudgetAdmin) {
                    this.capexRequired.disable({ emitEvent: false });
                }
                this.required = true;
                this.budgetId.setValidators(Validators.required)
                this.predefinedInvestmentId.setValidators(Validators.required)
                this.gmsBudgetowner.setValidators(Validators.required)
                this.where.setValidators(Validators.required)
                this.why.setValidators(Validators.required)
                this.gmsBudgetOwnerBasicSetup()
                if (this.isBudgetAdmin) {
                    if (this.budgetId.disabled) {
                        this.budgetId.enable({ emitEvent: false })
                    }
                    this.showBudgetIdButton = true;
                } else {
                    if (this.gmsBudgetowner.value && this.gmsBudgetowner.value?.portfolioOwnerId != "3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC") {
                        if (this.budgetId.enabled) {
                            this.budgetId.disable({ emitEvent: false })
                        }
                        this.showBudgetIdButton = true;
                    } else {
                        this.showBudgetIdButton = false;
                        if (this.budgetId.disabled) {
                            this.budgetId.enable({ emitEvent: false })
                        }
                    }
                }


                if (!this.gmsBudgetowner.value || this.gmsBudgetowner.value?.portfolioOwnerId == "3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC") {
                    this.showBudgetIdButton = false;
                }
                // if(!this.gmsBudgetowner.value || this.gmsBudgetowner.value?.portfolioOwnerId=="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC"){
                //     this.budgetId.enable({emitEvent : false})
                //     this.predefinedInvestmentId.enable({emitEvent : false})
                //     this.where.enable({emitEvent : false})
                //     this.why.enable({emitEvent : false})
                //     if(!this.isBudgetAdmin){
                //         this.showBudgetIdButton = false;
                //     }else{
                //         this.budgetInfoForm.controls.budgetId.enable({emitEvent : false})
                //         this.showBudgetIdButton = false;
                //     }
                // }else{
                //     if(!this.isBudgetAdmin){
                //         if(this.capexRequired.disabled){
                //             this.showBudgetIdButton = true;
                //             if(!this.gmsBudgetowner.value.gmsbudgetOwnerDropDownValue){
                //                 this.gmsBudgetowner.disable();
                //             }
                //             this.budgetInfoForm.controls.budgetId.disable({emitEvent : false})
                //         }else{
                //             this.budgetInfoForm.controls.budgetId.disable({emitEvent : false})
                //             this.showBudgetIdButton = true;
                //         }
                //     }else{
                //         this.budgetInfoForm.controls.budgetId.enable({emitEvent : false})
                //         this.showBudgetIdButton = true;
                //     }
                // }
            } else {
                this.budgetInfoForm.controls.budgetId.disable()
                this.required = false;
                this.showBudgetIdButton = false;
                // this.budgetInfoForm.controls.budgetId.setValue('',{emitEvent : false})
                if (this.budgetInfoForm.controls.gmsBudgetowner.value?.portfolioOwnerId == "3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC") {
                    this.budgetInfoForm.controls.budgetId.disable({ emitEvent: false })
                }
            }
        })
    }
    ngOnInit(): void {
        this.dataloader();
    }
    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.filterCriteria = this.projectHubService.all
        this.apiService.getBudgetPageInfo(this.projectHubService.projectid).then((res: any) => {
            this.budgetInfo = res
            console.log("RES", this.budgetInfo)
            this.generalInfoPatchValue(res)
            if (this.capexRequired.value == true) {
                this.required = true;
                if (this.isBudgetAdmin) {
                    if (this.budgetId.disabled) {
                        this.budgetId.enable({ emitEvent: false })
                    }
                    if (this.gmsBudgetowner.disabled) {
                        this.gmsBudgetowner.enable({ emitEvent: false })
                    }
                }
                else if (this.projectHubService.roleControllerControl.generalInfo.porfolioOwner || this.projectHubService.roleControllerControl.projectManager) {
                    if (this.gmsBudgetowner.disabled) {
                        this.gmsBudgetowner.enable({ emitEvent: false })
                    }
                }


                else {
                    if (this.budgetId.enabled) {
                        this.budgetId.disable({ emitEvent: false })
                    }
                    if (this.gmsBudgetowner.enabled) {
                        this.gmsBudgetowner.disable({ emitEvent: false })
                    }
                }
            } else {
                this.required = false;
                this.budgetId.disable()
                this.gmsBudgetOwnerBasicSetup()
            }
            if (this.capexRequired.value == true && !this.isBudgetAdmin) {
                this.capexRequired.disable({ emitEvent: false })
            }
            // if( !this.isBudgetAdmin && this.gmsBudgetowner.value?.portfolioOwnerId=="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC"){
            //     this.budgetId.disable()
            // }
            // if(this.capexRequired.value ==true && !this.isBudgetAdmin){
            //     this.capexRequired.disable({emitEvent : false})
            //     this.gmsBudgetowner.disable();
            // }
            // if(!this.gmsBudgetowner.value.gmsbudgetOwnerDropDownValue ){
            //     if(!this.capexRequired.value && !this.isBudgetAdmin){
            //         this.gmsBudgetowner.disable()
            //     }
            // }
            // if(this.capexRequired.value == true && (!this.gmsBudgetowner.value || this.gmsBudgetowner.value?.portfolioOwnerId=="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC")){
            //     this.showBudgetIdButton = false;
            // }
            // if(this.isBudgetAdmin && (this.capexRequired.value==false || this.capexRequired.value==null)){
            //     this.budgetId.disable()
            // }
            this.projectHubService.isFormChanged = false
            this.gmsBudgetOwnerBasicSetup();

            this.viewContent = true
        })
        this.isBudgetAdmin = this.projectHubService.roleControllerControl.budgetAdmin;
    }
    gmsBudgetOwnerBasicSetup() {
        this.gmsBudgetOwnerList = this.filterCriteria.portfolioOwner.filter(x => x.isGmsbudgetOwner == true)
        if (this.isBudgetAdmin == true || this.projectHubService.roleControllerControl.generalInfo.porfolioOwner || this.projectHubService.roleControllerControl.projectManager) {
            this.gmsBudgetOwnerList = this.filterCriteria.portfolioOwner.filter(x => x.isGmsbudgetOwner == true)
            if (this.gmsBudgetowner.disabled) {
                this.gmsBudgetowner.enable({ emitEvent: false })
            }
        } else {
            if (this.gmsBudgetowner.value.gmsbudgetOwnerEditable) {
                if (this.gmsBudgetowner.disabled) {
                    this.gmsBudgetowner.enable({ emitEvent: false })
                }
                this.gmsBudgetOwnerList = this.filterCriteria.portfolioOwner.filter(x => x.gmsbudgetOwnerDropDownValue == true)
            } else {
                if (this.gmsBudgetowner.enabled) {
                    this.gmsBudgetowner.disable({ emitEvent: false })
                }
            }
        }
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
    sortByLevel(array: any): any {
        return array.length > 1 ? array.sort((a, b) => {
            if (a.level === null) {
                return -1;
            }
            if (b.level === null) {
                return 1;
            }
            if (a.level === b.level) {
                return 0;
            }
            return a.level < b.level ? -1 : 1;
        }) : array
    }

    openStandardMilestonesSets(): void {
        if (this.budgetInfoForm.controls.capexRequired.value == true && (this.budgetInfo.budget.capExRequired == false || this.budgetInfo.budget.capExRequired == null)) {
            this.viewStandardMilestonesSets = true;
            this.projectHubService.isBulkEdit = true
            const formValue = this.budgetInfoForm.getRawValue();
            const location = this.mode
            this.sharedService.setBudgetFormData(formValue);
            this.sharedService.setLocation(location);
        }
    }
    cancelBudgetInfo() {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "The changes applied to the CAPEX Required section and the Milestones will not be saved. Do you want to proceed?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Okay",
                "color": "warn"
              },
              "cancel": {
                "show": true,
                "label": "Cancel"
              }
            },
            "dismissible": true
          }
          const alert = this.fuseAlert.open(comfirmConfig)
          alert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                this.projectHubService.toggleDrawerOpen('', '',[],'',true)
            }
          })
    }
    toggleSchedule(event: any) {
        this.standarCAPEXMilestoneAdded[event.tableIndex] = [...event.selected]
    }
    async submitBudgetInfo() {
        console.log(this.mode)
        let isPrefixValid: boolean = true;
        if (this.budgetId.value
            && this.budgetId.dirty
            && this.isBudgetAdmin == false) {
            try {
                isPrefixValid = await this.checkPrefix(this.budgetId.value);
            } catch (error) {
                var errorConfig: FuseConfirmationConfig = {
                    "title": "An error has occured",
                    "message": "Please try again",
                    "icon": {
                        "show": true,
                        "name": "heroicons_outline:exclamation",
                        "color": "warning"
                    },
                    "actions": {
                        "confirm": {
                            "show": true,
                            "label": "Okay",
                            "color": "primary"
                        },
                        "cancel": {
                            "show": false,
                        },
                    },
                    "dismissible": true
                }
                this.fuseAlert.open(errorConfig)
            }
        }

        if (!isPrefixValid && this.budgetId.status === "VALID") {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "The Capital Budget ID with existing prefix abbreviations is not allowed.",
                "message": "Please change or remove it",
                "icon": {
                    "show": true,
                    "name": "heroicons_outline:exclamation",
                    "color": "warning"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "Okay",
                        "color": "primary"
                    },
                    "cancel": {
                        "show": false,
                    },
                },
                "dismissible": true
            }
            const alert = this.fuseAlert.open(comfirmConfig)
        } else {
            if (this.required) {
                var fieldsMissing = 0;
                var missingFields = [];
                if (this.budgetId.value == null || this.budgetId.value == "") {
                    fieldsMissing++;
                    missingFields.push("Budget ID")
                }
                if (!this.predefinedInvestmentId.value || Object.keys(this.predefinedInvestmentId.value).length == 0) {
                    fieldsMissing++;
                    missingFields.push("Global/Regional Predefined Investment")
                }
                if (this.gmsBudgetowner.invalid || Object.keys(this.gmsBudgetowner.value).length == 0) {
                    fieldsMissing++;
                    missingFields.push("GMS Budget Owner")
                }
                if (this.where.invalid || this.where.value == "") {
                    fieldsMissing++;
                    missingFields.push("Where")
                }
                if (this.why.invalid || this.why.value == "") {
                    fieldsMissing++;
                    missingFields.push("Why")
                }
                // if(this.fundingApprovalNeedDate.invalid || this.fundingApprovalNeedDate.value == null ){
                //     fieldsMissing ++;
                //     missingFields.push("Funding Approval Need Date")
                // }
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
                if (fieldsMissing != 0) {
                    const riskIssueAlert = this.fuseAlert.open(comfirmConfig)
                    riskIssueAlert.afterClosed().subscribe(close => {
                        if (close == 'confirmed') {
                        }
                    })
                } else {
                    if (this.mode == 'CAPEX') {
                        this.openStandardMilestonesSets()
                    }
                    else {
                        this.submitInfo()
                    }
                }
            }
            else {
                if (this.mode == 'CAPEX') {
                    this.openStandardMilestonesSets()
                }
                else {
                    this.submitInfo()
                }
            }
        }
    }
    submitInfo() {
        const formData = this.sharedService.getBudgetFormData();
        const location = this.sharedService.getLocation();
        if (location == 'CAPEX' && this.mode == 'CAPEX') {

            this.projectHubService.isFormChanged = false
            const formValue = formData;
            const mainObj = this.prepareDataforSubmit(formValue)
            this.apiService.updateBudgetPageInfo(this.id, mainObj).then(res => {
                // this.projectHubService.isNavChanged.next(true)
                // this.projectHubService.submitbutton.next(true)
                // this.projectHubService.successSave.next(true)
                // this.projectHubService.toggleDrawerOpen('', '', [], '')
            }).catch(err => {
                if (err.status == 400) {
                    var comfirmConfig: FuseConfirmationConfig = {
                        "title": "This budget ID is used by another project. Please select another one",
                        "message": "",
                        "icon": {
                            "show": true,
                            "name": "heroicons_outline:exclamation",
                            "color": "warning"
                        },
                        "actions": {
                            "confirm": {
                                "show": true,
                                "label": "Okay",
                                "color": "primary"
                            },
                        },
                        "dismissible": true
                    }
                    const alert = this.fuseAlert.open(comfirmConfig)
                }
            })
        }
        else {
            this.projectHubService.isFormChanged = false
            const formValue = this.budgetInfoForm.getRawValue();
            const mainObj = this.prepareDataforSubmit(formValue)
            this.apiService.updateBudgetPageInfo(this.id, mainObj).then(res => {
                this.projectHubService.isNavChanged.next(true)
                this.projectHubService.submitbutton.next(true)
                this.projectHubService.successSave.next(true)
                this.projectHubService.toggleDrawerOpen('', '', [], '')
            }).catch(err => {
                if (err.status == 400) {
                    var comfirmConfig: FuseConfirmationConfig = {
                        "title": "This budget ID is used by another project. Please select another one",
                        "message": "",
                        "icon": {
                            "show": true,
                            "name": "heroicons_outline:exclamation",
                            "color": "warning"
                        },
                        "actions": {
                            "confirm": {
                                "show": true,
                                "label": "Okay",
                                "color": "primary"
                            },
                        },
                        "dismissible": true
                    }
                    const alert = this.fuseAlert.open(comfirmConfig)
                }
            })
        }


    }
    prepareDataforSubmit(formValue): any {
        const mainObj = this.budgetInfo;
        mainObj.budget.capitalBudgetId = formValue.budgetId
        mainObj.budget.projectId = this.id;
        mainObj.budget.definitiveCrapprovalDate = formValue.assetPlaced
        mainObj.budget.budgetOwner = formValue.gmsBudgetowner.portfolioOwnerId
        mainObj.budget.predefinedInvestmentId = formValue.predefinedInvestmentId?.lookUpId
        mainObj.budget.whereId = formValue.where
        mainObj.budget.whyId = formValue.why
        //mainObj.budget.fundingApprovalNeedDate = formValue.fundingApprovalNeedDate ? moment(formValue.fundingApprovalNeedDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null;
        mainObj.budget.capExRequired = formValue.capexRequired
        mainObj.budget.projectFundingStatus = formValue.projectFundingStatus
        mainObj.budget.totalApprovedCapEx = formValue.totalApprovedCapex
        mainObj.budget.totalApprovedOpEx = formValue.totalApprovedOpex
        console.log(mainObj)
        return mainObj;
    }
    getMissingFieldsString(fields): string {
        return fields.join(', ')
    }
    disabler() {

    }
    generalInfoPatchValue(response) {
        this.budgetInfoForm.patchValue({
            capexRequired: response.budget.capExRequired,
            assetPlaced: response.budget.definitiveCrapprovalDate,
            budgetId: response.budget.capitalBudgetId,
            gmsBudgetowner: this.getPortfolioOwnerNameById(response.budget.budgetOwner) || "",
            predefinedInvestmentId: this.getLookup(response.budget.predefinedInvestmentId),
            where: response.budget.whereId,
            why: response.budget.whyId,
            //fundingApprovalNeedDate:  response.budget.fundingApprovalNeedDate,
            projectFundingStatus: response.budget.fundingStatusId,
            totalApprovedCapex: response.budget.totalApprovedCapExFxconv,
            totalApprovedOpex: response.budget.totalApprovedOpExFxconv,
        }, { emitEvent: false })
    }
    getPortfolioOwnerNameById(id: string): any {
        return this.filterCriteria.portfolioOwner.filter(x => x.isGmsbudgetOwner == true && x.portfolioOwnerId == id)[0];
    }
    requestBudgetId(): any {
        this.apiService.getNewBudgetId(this.projectHubService.projectid, this.gmsBudgetowner.value.portfolioOwnerId).then((res: any) => {
            this.budgetInfoForm.patchValue({
                budgetId: res.BudgetId,
            })
            this.showBudgetIdButton = false;
            this.budgetId.disable();
        })
    }
    async checkPrefix(budgetId: string) {
        try {
            const response: any = await this.apiService.checkBudgetIdPrefix(budgetId.toUpperCase());
            return !!(response && response.IsBudgetIdValid);
        } catch (error) {
            console.error("Error:", error);
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
    // get fundingApprovalNeedDate() {
    //     return this.budgetInfoForm.get('fundingApprovalNeedDate');
    // }
    getLookup(key) {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpId == key)[0]
    }


}
