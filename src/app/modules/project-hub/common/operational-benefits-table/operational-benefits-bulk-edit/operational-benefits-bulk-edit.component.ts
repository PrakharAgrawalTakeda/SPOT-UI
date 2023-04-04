import {Component} from '@angular/core';
import {GlobalBusinessCaseOptions} from "../../../../../shared/global-business-case-options";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ProjectApiService} from "../../project-api.service";
import {ProjectHubService} from "../../../project-hub.service";
import {AuthService} from "../../../../../core/auth/auth.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-operational-benefits-bulk-edit',
    templateUrl: './operational-benefits-bulk-edit.component.html',
    styleUrls: ['./operational-benefits-bulk-edit.component.scss']
})
export class OperationalBenefitsBulkEditComponent {
    constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public authService: AuthService, private _ActivatedRoute: ActivatedRoute,
                public fuseAlert: FuseConfirmationService, private router: Router) {
        this.operationalBenefitsForm.valueChanges.subscribe(res => {
            if (this.viewContent == true) {
                this.formValue()
                if (JSON.stringify(this.operationalBenefitsDb) != JSON.stringify(this.operationalBenefitsSubmit)) {
                    this.projecthubservice.isFormChanged = true
                } else {
                    this.projecthubservice.isFormChanged = false
                }
            }
        })
    }

    viewContent: boolean = false
    id: string = ""
    operationalBenefits = []
    operationalBenefitsDb = []
    operationalBenefitsForm = new FormArray([])
    obTableEditStack = []
    operationalBenefitsSubmit = []
    benefitsSubmit: any;

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.id = this._ActivatedRoute.parent.snapshot.paramMap.get("id");
        if (this.router.url.includes('recommended-option')) {
            this.apiService.getBusinessCaseBenefits(this.id, GlobalBusinessCaseOptions.OPTION_1).then((res: any) => {
                this.benefitsSubmit = res;
                this.operationalBenefits = res.operationalBenefits;
                if (this.operationalBenefits.length > 0) {
                    this.operationalBenefitsDb = this.operationalBenefits.map(x => {
                        return {
                            "id": x.id,
                            "metric": x.metric,
                            "currentState": x.currentState,
                            "targetPerformance": x.targetPerformance,
                            "includeInBusinessCase": x.includeInBusinessCase,
                        }
                    })
                    for (var i of this.operationalBenefits) {
                        this.operationalBenefitsForm.push(new FormGroup({
                            id: new FormControl(i.id),
                            metric: new FormControl(i.metric),
                            currentState: new FormControl(i.currentState),
                            targetPerformance: new FormControl(i.targetPerformance),
                            includeInBusinessCase: new FormControl(i.includeInBusinessCase),
                        }))
                    }
                }
                this.disabler();
                this.viewContent = true;
            })
        } else if (this.router.url.includes('option-2')) {
            this.apiService.getBusinessCaseBenefits(this.id, GlobalBusinessCaseOptions.OPTION_2).then((res: any) => {
                this.benefitsSubmit = res;
                if (res.operationalBenefits) {
                    this.operationalBenefits = res.operationalBenefits;
                } else {
                    this.operationalBenefits = []
                }
                if (this.operationalBenefits.length > 0) {
                    this.operationalBenefitsDb = this.operationalBenefits.map(x => {
                        return {
                            "id": x.id,
                            "metric": x.metric,
                            "currentState": x.currentState,
                            "targetPerformance": x.targetPerformance,
                            "includeInBusinessCase": x.includeInBusinessCase,
                        }
                    })
                    for (var i of this.operationalBenefits) {
                        this.operationalBenefitsForm.push(new FormGroup({
                            id: new FormControl(i.id),
                            metric: new FormControl(i.metric),
                            currentState: new FormControl(i.currentState),
                            targetPerformance: new FormControl(i.targetPerformance),
                            includeInBusinessCase: new FormControl(i.includeInBusinessCase),
                        }))
                    }
                }
                this.disabler();
                this.viewContent = true;
            })
        } else if (this.router.url.includes('option-3')) {
            this.apiService.getBusinessCaseBenefits(this.id, GlobalBusinessCaseOptions.OPTION_3).then((res: any) => {
                this.benefitsSubmit = res;
                if (res.operationalBenefits) {
                    this.operationalBenefits = res.operationalBenefits;
                } else {
                    this.operationalBenefits = []
                }
                if (this.operationalBenefits.length > 0) {
                    this.operationalBenefitsDb = this.operationalBenefits.map(x => {
                        return {
                            "id": x.id,
                            "metric": x.metric,
                            "currentState": x.currentState,
                            "targetPerformance": x.targetPerformance,
                            "includeInBusinessCase": x.includeInBusinessCase,
                        }
                    })
                    for (var i of this.operationalBenefits) {
                        this.operationalBenefitsForm.push(new FormGroup({
                            id: new FormControl(i.id),
                            metric: new FormControl(i.metric),
                            currentState: new FormControl(i.currentState),
                            targetPerformance: new FormControl(i.targetPerformance),
                            includeInBusinessCase: new FormControl(i.includeInBusinessCase),
                        }))
                    }
                }
                this.disabler();
                this.viewContent = true;
            })
        }

    }

    disabler() {
        var formValue = this.operationalBenefitsForm.getRawValue()
        if (formValue.length > 0) {
            if (formValue.filter(x => x.includeInBusinessCase == true).length < 3) {
                for (var i of this.operationalBenefitsForm.controls) {
                    i['controls']['includeInBusinessCase'].enable()
                }
            } else {
                for (var i of this.operationalBenefitsForm.controls) {
                    if (i['controls']['includeInBusinessCase'].value != true) {
                        i['controls']['includeInBusinessCase'].disable()
                    }
                }
            }
        }
    }

    addOperationalBenefit() {
        this.operationalBenefitsForm.push(new FormGroup({
            id: new FormControl(''),
            metric: new FormControl(''),
            currentState: new FormControl(''),
            targetPerformance: new FormControl(''),
            includeInBusinessCase: new FormControl(false),
        }))
        var j = [{
            id: '',
            metric: '',
            currentState: '',
            targetPerformance: false,
            includeInBusinessCase: false,
        }]
        this.disabler()
        this.operationalBenefits = [...this.operationalBenefits, ...j]
        this.obTableEditStack.push(this.operationalBenefits.length - 1)
        var div = document.getElementsByClassName('datatable-scroll')[0]
        setTimeout(() => {
            div.scroll({
                top: div.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }, 100);
    }

    obTableEditRow(rowIndex) {
        if (!this.obTableEditStack.includes(rowIndex)) {
            this.obTableEditStack.push(rowIndex)
        }
        this.disabler()
    }

    deleteOB(rowIndex: number) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want Delete this Record?",
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
                    this.operationalBenefits.splice(rowIndex, 1)
                    this.operationalBenefitsForm.removeAt(rowIndex)
                    if (this.obTableEditStack.includes(rowIndex)) {
                        this.obTableEditStack.splice(this.obTableEditStack.indexOf(rowIndex), 1)
                    }
                    this.obTableEditStack = this.obTableEditStack.map(function (value) {
                        return value > rowIndex ? value - 1 : value;
                    })
                    this.disabler()
                    this.operationalBenefits = [...this.operationalBenefits]
                }
            }
        )
    }

    submitOperationalBenefits() {
        if (this.projecthubservice.isFormChanged) {
            this.projecthubservice.isFormChanged = false
            this.formValue()
            if (this.router.url.includes('option-2')) {
                this.benefitsSubmit.optionId = GlobalBusinessCaseOptions.OPTION_2;
            }
            if (this.router.url.includes('option-3')) {
                this.benefitsSubmit.optionId = GlobalBusinessCaseOptions.OPTION_3;
            }
            if (this.router.url.includes('recommended-option')) {
                this.benefitsSubmit.optionId = GlobalBusinessCaseOptions.OPTION_1;
            }
            this.benefitsSubmit.operationalBenefits = this.operationalBenefitsSubmit;
            this.apiService.bulkEditBusinessCaseOperationalBenefits(this.benefitsSubmit).then(res => {
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
    formValue() {
        var form = this.operationalBenefitsForm.getRawValue()
        if (form.length > 0) {
            this.operationalBenefitsSubmit = []
            for (var i of form) {
                this.operationalBenefitsSubmit.push({
                    "id": i.id,
                    "metric": i.metric,
                    "currentState": i.currentState,
                    "targetPerformance": i.targetPerformance,
                    "includeInBusinessCase": i.includeInBusinessCase,
                })
            }
        } else {
            this.operationalBenefitsSubmit = []
        }
    }
}

