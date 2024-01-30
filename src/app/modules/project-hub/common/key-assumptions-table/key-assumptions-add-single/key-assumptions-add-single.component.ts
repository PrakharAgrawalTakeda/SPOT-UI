import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ProjectHubService } from "../../../project-hub.service";
import { AuthService } from "../../../../../core/auth/auth.service";
import { RoleService } from "../../../../../core/auth/role.service";
import { ProjectApiService } from "../../project-api.service";
import { FuseConfirmationService } from "../../../../../../@fuse/services/confirmation";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalBusinessCaseOptions } from "../../../../../shared/global-business-case-options";

@Component({
    selector: 'app-key-assumptions-add-single',
    templateUrl: './key-assumptions-add-single.component.html',
    styleUrls: ['./key-assumptions-add-single.component.scss']
})
export class KeyAssumptionsAddSingleComponent implements OnInit {
    @Input() viewElements: any = ["keyAssumption", "whyIsThisAssumptionValid"];
    @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Baseline-Log' | 'Business-Case' = 'Normal'
    keyAssumptionForm = new FormGroup({
        keyAssumptionName: new FormControl(''),
        assumptionRationale: new FormControl(''),
        includeInCharter: new FormControl(false),
        includeInBusinessCase: new FormControl(false),
    })
    formInital: boolean = false
    id: string = ''
    canSubmit: boolean = true
    constructor(public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute, public role: RoleService,
        private apiService: ProjectApiService, public fuseAlert: FuseConfirmationService, private router: Router) {
        this.keyAssumptionForm.valueChanges.subscribe(res => {
            if (this.formInital == true) {
                this.projecthubservice.isFormChanged = true
            }
        }
        )
    }

    ngOnInit(): void {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        if (this.projecthubservice.all.length > 0) {
            if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length >= 5) {
                if (this.keyAssumptionForm.value.includeInCharter != true) {
                    this.keyAssumptionForm.controls['includeInCharter'].disable()
                }
            }
            if (this.projecthubservice.all.filter(x => x.includeInBusinessCase == true).length >= 4) {
                if (this.keyAssumptionForm.value.includeInBusinessCase != true) {
                    this.keyAssumptionForm.controls['includeInBusinessCase'].disable()
                }
            }
        }
        this.keyAssumptionForm.valueChanges.subscribe(res => {
            this.projecthubservice.isFormChanged = true
        })
    }

    submitKeyAssumption() {
        if (this.canSubmit) {
            this.canSubmit = false
            this.projecthubservice.isFormChanged = false
            var keyAssumption = this.keyAssumptionForm.getRawValue();
            var mainObj = {
                keyAssumptionUniqueId: "",
                projectId: this.id,
                keyAssumption: keyAssumption.keyAssumptionName,
                assumptionRationale: keyAssumption.assumptionRationale,
                includeInCharter: keyAssumption.includeInCharter,
                includeInBusinessCase: keyAssumption.includeInBusinessCase,
            }
            var optionObj = {
                keyAssumptionUniqueId: "",
                projectId: this.id,
                keyAssumption: keyAssumption.keyAssumptionName,
                assumptionRationale: keyAssumption.assumptionRationale,
                includeInBusinessCase: keyAssumption.includeInBusinessCase,
                includeInCharter: keyAssumption.includeInCharter,
                businessKeyAssumptionUniqueId: "",
                businessOptionId: ""
            }
            if (this.mode == "Business-Case") {
                if (this.router.url.includes('option-2')) {
                    optionObj.businessOptionId = GlobalBusinessCaseOptions.OPTION_2;
                    this.apiService.addKeyAssumptionForOption(optionObj).then(res => {
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.toggleDrawerOpen('', '', [], '')
                        this.canSubmit = true
                    })
                } else {
                    if (this.router.url.includes('option-3')) {
                        optionObj.businessOptionId = GlobalBusinessCaseOptions.OPTION_3;
                        this.apiService.addKeyAssumptionForOption(optionObj).then(res => {
                            this.projecthubservice.submitbutton.next(true)
                            this.projecthubservice.toggleDrawerOpen('', '', [], '')
                            this.canSubmit = true
                        })
                    } else {
                        if (this.router.url.includes('recommended-option')) {
                            optionObj.businessOptionId = GlobalBusinessCaseOptions.OPTION_1;
                            this.apiService.addKeyAssumptionForOption(optionObj).then(res => {
                                this.projecthubservice.submitbutton.next(true)
                                this.projecthubservice.toggleDrawerOpen('', '', [], '')
                                this.canSubmit = true
                            })
                        }
                    }
                }
            } else {
                this.apiService.addKeyAssumption(mainObj).then(res => {
                    if (this.mode == 'Project-Charter') {
                        this.apiService.updateReportDates(this.projecthubservice.projectid, "ModifiedDate").then(secondRes => {
                            this.projecthubservice.submitbutton.next(true)
                            this.projecthubservice.toggleDrawerOpen('', '', [], '')
                            this.canSubmit = true
                        })
                    } else {
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.toggleDrawerOpen('', '', [], '')
                        this.canSubmit = true
                    }

                })
            }
        }




    }
    viewElementChecker(element: string): boolean {
        return this.viewElements.some(x => x == element)
    }
}
