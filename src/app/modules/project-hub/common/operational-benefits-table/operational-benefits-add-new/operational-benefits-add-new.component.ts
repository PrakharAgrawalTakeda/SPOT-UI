import { Component } from '@angular/core';
import {ProjectHubService} from "../../../project-hub.service";
import {AuthService} from "../../../../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../../../core/auth/role.service";
import {ProjectApiService} from "../../project-api.service";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {FormControl, FormGroup} from "@angular/forms";
import {GlobalBusinessCaseOptions} from "../../../../../shared/global-business-case-options";

@Component({
  selector: 'app-operational-benefits-add-new',
  templateUrl: './operational-benefits-add-new.component.html',
  styleUrls: ['./operational-benefits-add-new.component.scss']
})
export class OperationalBenefitsAddNewComponent {
    operationalBenefitForm = new FormGroup({
        id: new FormControl(''),
        metric: new FormControl(''),
        currentState: new FormControl(''),
        targetPerformance: new FormControl(''),
        includeInBusinessCase: new FormControl(false)
    })
    formInital: boolean = false
    id: string = ''
    constructor(public projecthubservice: ProjectHubService, public auth: AuthService,private _Activatedroute: ActivatedRoute, public role: RoleService,
                private apiService: ProjectApiService, public fuseAlert: FuseConfirmationService, private router: Router) {
        this.operationalBenefitForm.valueChanges.subscribe(res => {
                if (this.formInital == true) {
                    this.projecthubservice.isFormChanged = true
                }
            }
        )
    }

    ngOnInit(): void {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        if (this.projecthubservice.all.length > 0) {
            if (this.projecthubservice.all.filter(x => x.includeInBusinessCase == true).length >= 3) {
                if (this.operationalBenefitForm.value.includeInBusinessCase != true) {
                    this.operationalBenefitForm.controls['includeInBusinessCase'].disable()
                }
            }
        }
        this.operationalBenefitForm.valueChanges.subscribe(res => {
            this.projecthubservice.isFormChanged = true
        })
    }
    submitOperationalBenefit() {
        this.projecthubservice.isFormChanged = false
        var operationalBenefit = this.operationalBenefitForm.getRawValue();
        var mainObj = {
            id: "",
            metric: operationalBenefit.metric,
            currentState: operationalBenefit.currentState,
            targetPerformance: operationalBenefit.targetPerformance,
            includeInBusinessCase: operationalBenefit.includeInBusinessCase
        }
            if (this.router.url.includes('option-2')) {
                this.apiService.addSingleOperationalBenefit(mainObj,GlobalBusinessCaseOptions.OPTION_2,this.id ).then(res => {
                    this.projecthubservice.submitbutton.next(true)
                    this.projecthubservice.toggleDrawerOpen('', '', [], '')
                })
            }else{
                if (this.router.url.includes('option-3')) {
                    this.apiService.addSingleOperationalBenefit(mainObj, GlobalBusinessCaseOptions.OPTION_3, this.id).then(res => {
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.toggleDrawerOpen('', '', [], '')
                    })
                }else{
                    if (this.router.url.includes('recommended-option')) {
                        this.apiService.addSingleOperationalBenefit(mainObj,  GlobalBusinessCaseOptions.OPTION_1, this.id).then(res => {
                            this.projecthubservice.submitbutton.next(true)
                            this.projecthubservice.toggleDrawerOpen('', '', [], '')
                        })
                    }
                }
            }
        }
}
