import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProjectHubService} from "../../project-hub.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../../core/auth/role.service";
import {ProjectApiService} from "../../common/project-api.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";

@Component({
  selector: 'app-budget-funding-add-view',
  templateUrl: './budget-funding-add-view.component.html',
  styleUrls: ['./budget-funding-add-view.component.scss']
})
export class BudgetFundingAddViewComponent {
    fundingRequestForm = new FormGroup({
        fundingRequestId: new FormControl(''),
        approvalCurrency: new FormControl(null),
        capexAmount: new FormControl(''),
        opexAmount: new FormControl(''),
    })
    formInital: boolean = false
    id: string = ''
    budgetInfo: any;
    localCurrency:any = [];
    constructor(public projecthubservice: ProjectHubService, public auth: AuthService,private _Activatedroute: ActivatedRoute, public role: RoleService,
                private apiService: ProjectApiService, public fuseAlert: FuseConfirmationService, private portfoliService: PortfolioApiService) {
        this.fundingRequestForm.valueChanges.subscribe(res => {
                if (this.formInital == true) {
                    this.projecthubservice.isFormChanged = true
                }
            }
        )
    }

    ngOnInit(): void {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.budgetInfo = this.projecthubservice.all;
        this.fundingRequestForm.valueChanges.subscribe(res => {
            this.projecthubservice.isFormChanged = true
        })
        this.portfoliService.getLocalCurrency().then(currency => {
            this.localCurrency = currency
        })
    }

    submitFundingInformation() {
        this.projecthubservice.isFormChanged = false
        var fundingRequest = this.fundingRequestForm.getRawValue();
        if(fundingRequest.fundingRequestId=="" || fundingRequest.approvalCurrency==null) {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "Please fill the mandatory fields",
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
        }else{
            if(this.budgetInfo.budgetIOs.some(obj => obj.budgetIo1 === fundingRequest.fundingRequestId)){
                var comfirmConfig: FuseConfirmationConfig = {
                    "title": "The Funding Request ID you have entered does already exist and cannot be added a second time. Please change or remove it",
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
                        "cancel": {
                            "show": false,
                            "label": "Cancel"
                        }
                    },
                    "dismissible": true
                }
                this.fuseAlert.open(comfirmConfig)
            }else{
                var mainObj = {
                    budgetIoid:null,
                    projectId: this.id,
                    budgetIo1: fundingRequest.fundingRequestId,
                    carapprovedCapex: null,
                    carapprovedOpex: null,
                    ammendedCar:"",
                    localCarapprovedCapex: fundingRequest.capexAmount,
                    localCarapprovedOpex: fundingRequest.opexAmount,
                    localCurrencyId: fundingRequest.approvalCurrency,
                    approvalStatus:"",
                    approvalCurrency: "",
                    keep: true,
                }
                this.budgetInfo.budgetIOs  = this.budgetInfo.budgetIOs.filter((item) => item.keep);
                this.budgetInfo.budgetIOs.push(mainObj);
                this.apiService.updateBudgetPageInfo(this.id,this.budgetInfo).then(res => {
                    this.projecthubservice.submitbutton.next(true)
                    this.projecthubservice.toggleDrawerOpen('', '', [], '')
                })
            }

        }


    }
}
