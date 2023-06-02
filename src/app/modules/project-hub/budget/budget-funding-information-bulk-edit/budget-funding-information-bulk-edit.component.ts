import {Component, Input} from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ProjectHubService} from "../../project-hub.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {RoleService} from "../../../../core/auth/role.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {Router} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {GlobalBusinessCaseOptions} from "../../../../shared/global-business-case-options";

@Component({
    selector: 'app-budget-funding-information-bulk-edit',
    templateUrl: './budget-funding-information-bulk-edit.component.html',
    styleUrls: ['./budget-funding-information-bulk-edit.component.scss']
})
export class BudgetFundingInformationBulkEditComponent {
    constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public authService: AuthService, public role: RoleService,
                public fuseAlert: FuseConfirmationService, private router: Router) {
        this.fundingRequestForm.valueChanges.subscribe(res => {
            if (this.viewContent == true) {
                this.formValue()
                if (JSON.stringify(this.fundingRequestsDb) != JSON.stringify(this.fundingRequestsSubmit)) {
                    this.projecthubservice.isFormChanged = true
                } else {
                    this.projecthubservice.isFormChanged = false
                }
            }
        })
    }

    fundingRequests = []
    fundingRequestsDb = []
    fundingRequestsSubmit = []
    viewContent: boolean = false
    lookupdata: any[]
    frTableEditStack = []
    fundingRequestForm = new FormArray([])

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.apiService.getKeyAssumptionsByOption(this.projecthubservice.projectid, GlobalBusinessCaseOptions.OPTION_1).then((res: any) => {
            this.fundingRequests = res
            if (this.fundingRequests.length > 0) {
                this.fundingRequestsDb = this.fundingRequests.map(x => {
                    return {
                        "fundingRequestId": x.fundingRequestId,
                        "approvalCurrency": x.approvalCurrency,
                        "CAPEXAmount": x.CAPEXAmount,
                        "OPEXAmount": x.opexAmount,
                        "amendedCAR": x.amendedCAR,
                        "fundingStatus": x.fundingStatus,
                    }
                })
                for (var i of this.fundingRequests) {
                    this.fundingRequestForm.push(new FormGroup({
                        fundingRequestId: new FormControl(i.fundingRequestId),
                        approvalCurrency: new FormControl(i.approvalCurrency),
                        CAPEXAmount: new FormControl(i.CAPEXAmount),
                        OPEXAmount: new FormControl(i.OPEXAmount),
                        amendedCAR: new FormControl(i.amendedCAR),
                        fundingStatus: new FormControl(i.fundingStatus),
                    }))
                }
            }
            this.disabler();
            this.viewContent = true;
        })
    }

    disabler() {
        var formValue = this.fundingRequestForm.getRawValue()
        if (formValue.length > 0) {
        }
    }

    formValue() {
        var form = this.fundingRequestForm.getRawValue()
        if (form.length > 0) {
            this.fundingRequestsSubmit = []
            for (var i of form) {
                this.fundingRequestsSubmit.push({
                    "fundingRequestId": i.fundingRequestId,
                    "approvalCurrency": i.approvalCurrency,
                    "CAPEXAmount": i.CAPEXAmount,
                    "OPEXAmount": i.OPEXAmount,
                    "amendedCAR": i.amendedCAR,
                    "fundingStatus": i.fundingStatus,

                })
            }
        } else {
            this.fundingRequestsSubmit = []
        }
    }

    addFR() {
        var j = [{}]
        j = [{
            fundingRequestId: '',
            approvalCurrency: '',
            OPEXAmount: '',
            CAPEXAmount: '',
            amendedCAR: '',
            fundingStatus: '',
        }]
        this.fundingRequestForm.push(new FormGroup({
            fundingRequestId: new FormControl(''),
            approvalCurrency: new FormControl(''),
            CAPEXAmount: new FormControl(''),
            OPEXAmount: new FormControl(''),
            amendedCAR: new FormControl(''),
            fundingStatus: new FormControl(''),
        }))
        this.disabler()
        this.fundingRequests = [...this.fundingRequests, ...j]
        this.frTableEditStack.push(this.fundingRequests.length - 1)
        var div = document.getElementsByClassName('datatable-scroll')[0]
        setTimeout(() => {
            div.scroll({
                top: div.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }, 100);

    }

    frTableEditRow(rowIndex) {
        if (!this.frTableEditStack.includes(rowIndex)) {
            this.frTableEditStack.push(rowIndex)
        }
        this.disabler()
    }

    deleteFR(rowIndex: number) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to delete this record?",
            "icon": {
                "show": true,
                "name": "heroicons_outline:exclamation",
                "color": "warn"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "Remove",
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
                    this.fundingRequests.splice(rowIndex, 1)
                    this.fundingRequestForm.removeAt(rowIndex)
                    if (this.frTableEditStack.includes(rowIndex)) {
                        this.frTableEditStack.splice(this.frTableEditStack.indexOf(rowIndex), 1)
                    }
                    this.frTableEditStack = this.frTableEditStack.map(function (value) {
                        return value > rowIndex ? value - 1 : value;
                    })
                    this.disabler()
                    this.fundingRequests = [...this.fundingRequests]
                }
            }
        )
    }

    submitFundingRequests() {
        if (JSON.stringify(this.fundingRequestsDb) != JSON.stringify(this.fundingRequestsSubmit)) {
            this.projecthubservice.isFormChanged = false
            this.formValue()
            this.apiService.bulkEditKeyAssumptions(this.fundingRequestsSubmit, this.projecthubservice.projectid).then(res => {
                this.projecthubservice.submitbutton.next(true)
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
                this.projecthubservice.isNavChanged.next(true)
            })

        } else {
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
            this.projecthubservice.isNavChanged.next(true)
        }
    }
}
