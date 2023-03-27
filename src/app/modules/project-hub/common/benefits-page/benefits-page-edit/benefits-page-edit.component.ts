import {ApplicationRef, Component, Input} from '@angular/core';
import {ProjectApiService} from "../../project-api.service";
import {ProjectHubService} from "../../../project-hub.service";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {RoleService} from "../../../../../core/auth/role.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalBusinessCaseOptions} from "../../../../../shared/global-business-case-options";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-benefits-page-edit',
  templateUrl: './benefits-page-edit.component.html',
  styleUrls: ['./benefits-page-edit.component.scss']
})
export class BenefitsPageEditComponent {
    viewContent:boolean = false;
    benefits: any = {}
    id: string = ""
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private apiService: ProjectApiService,
                public projectHubService: ProjectHubService,
                public fuseAlert: FuseConfirmationService,
                public role: RoleService,
                private router: Router,
                private _Activatedroute: ActivatedRoute,){
    }
    benefitsInfoForm = new FormGroup({
        projectId: new FormControl(''),
        optionId: new FormControl(''),
        strategicAlignment: new FormControl(''),
        strategicAlignmentJustification: new FormControl(''),
        npvBaseCase: new FormControl(''),
        npvHighCase: new FormControl(''),
        npvRationale: new FormControl(''),
        operationalBenefits: new FormControl(''),
    })
    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        if(this.router.url.includes('option-3')){
            this.apiService.getBusinessCaseBenefits(this.id, GlobalBusinessCaseOptions.OPTION_3).then((res: any) => {
                this.benefits = res
                this.benefitsInfoPatchValue(res)
                this.viewContent = true
            })
        }
        if(this.router.url.includes('option-2')){
            this.apiService.getBusinessCaseBenefits(this.id, GlobalBusinessCaseOptions.OPTION_2).then((res: any) => {
                this.benefits = res
                this.benefitsInfoPatchValue(res)
                this.viewContent = true
            })
        }
        if(this.router.url.includes('recommended-option')){
            this.apiService.getBusinessCaseBenefits(this.id, GlobalBusinessCaseOptions.OPTION_1).then((res: any) => {
                this.benefits = res
                this.benefitsInfoPatchValue(res)
                this.viewContent = true
            })
        }
    }
    benefitsInfoPatchValue(response) {
        this.benefitsInfoForm.patchValue({
            projectId: response.projectId,
            optionId: response.optionId,
            strategicAlignment: response.strategicAlignment,
            strategicAlignmentJustification: response.strategicAlignmentJustification,
            npvBaseCase: response.npvBaseCase,
            npvHighCase: response.npvHighCase,
            npvRationale: response.npvRationale,
            operationalBenefits: response.operationalBenefits,
        })
    }
    submitBenefitsEdit() {
        this.projectHubService.isFormChanged = false
        const formValue = this.benefitsInfoForm.getRawValue();
        const mainObj = this.benefits;
        mainObj.projectId = formValue.projectId
        mainObj.optionId = formValue.optionId
        mainObj.strategicAlignment = formValue.strategicAlignment
        mainObj.strategicAlignmentJustification = formValue.strategicAlignmentJustification
        mainObj.npvBaseCase = formValue.npvBaseCase
        mainObj.npvHighCase = formValue.npvHighCase
        mainObj.npvRationale = formValue.npvRationale
        mainObj.operationalBenefits = formValue.operationalBenefits
        this.apiService.editBusinessCaseBenefits(mainObj).then(res => {
            this.projectHubService.isNavChanged.next(true)
            this.projectHubService.submitbutton.next(true)
            this.projectHubService.successSave.next(true)
            this.projectHubService.toggleDrawerOpen('', '', [], '')
        })

    }
}
