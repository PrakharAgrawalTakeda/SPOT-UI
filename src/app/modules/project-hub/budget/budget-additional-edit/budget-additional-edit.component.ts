import {Component, Input} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import { FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {ProjectApiService} from "../../common/project-api.service";
import {FormControl, FormGroup} from "@angular/forms";
import * as moment from "moment";
import {NoopAnimationPlayer, ɵAnimationGroupPlayer} from "@angular/animations";

@Component({
  selector: 'app-budget-additional-edit',
  templateUrl: './budget-additional-edit.component.html',
  styleUrls: ['./budget-additional-edit.component.scss']
})
export class BudgetAdditionalEditComponent {
    @Input() mode: 'Asset-In-Service' | 'OPEX' | 'Budget-Commentary' | 'Deviation' = 'OPEX'
    constructor(public projectHubService: ProjectHubService,
                private portApiService: PortfolioApiService,
                public auth: AuthService,
                private _Activatedroute: ActivatedRoute,
                public fuseAlert: FuseConfirmationService,
                private apiService: ProjectApiService) {
        this.budgetInfoForm.valueChanges.subscribe(res => {
               this.projectHubService.isFormChanged = true
            }
        )
    }

    viewContent: boolean = false;
    local: any = [];
    lookupdata: any = [];
    id: string = "";
    localCurrency: any = [];
    budgetInfo: any = {}
    required: boolean = false;
    budgetInfoForm = new FormGroup({
        apisdate: new FormControl(''),
        opexRequired: new FormControl(false),
        budgetCommentary: new FormControl(''),
        afpDeviationCode: new FormControl(null),
        mtdpDeviationCode: new FormControl(null),
    })

    ngOnInit(): void {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.budgetInfo = this.projectHubService.all;
        switch (this.mode) {
            case 'Asset-In-Service':
                this.budgetInfoForm.patchValue({
                    apisdate: this.budgetInfo.budget.apisdate,
                })
                this.viewContent = true;
                break;
            case 'OPEX':
                this.budgetInfoForm.patchValue({
                    opexRequired: this.budgetInfo.budget.opExRequired,
                })
                this.viewContent = true
                break;
            case 'Budget-Commentary':
                this.budgetInfoForm.patchValue({
                    budgetCommentary: this.budgetInfo.budget.budgetComment,
                })
                this.viewContent = true
                break;
            case 'Deviation':
                this.budgetInfoForm.patchValue({
                    afpDeviationCode: null,
                    mtdpDeviationCode: null
                })
                this.viewContent = true
                break;

        }
        this.projectHubService.isFormChanged = false

    }
    prepareDataforSubmit(formValue): any {
        const mainObj = this.budgetInfo;
        switch (this.mode) {
            case 'Asset-In-Service':
                mainObj.budget.apisdate = formValue.apisdate ? moment(formValue.apisdate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null;
                break;
            case 'OPEX':
                mainObj.budget.opexRequired = formValue.opexRequired;
                break;
            case 'Budget-Commentary':
                mainObj.budget.budgetComment = formValue.budgetCommentary;
                break;
            case 'Deviation':
                mainObj.budgetForecasts.find(x => x.isopen === true && x.budgetData== "CapEx Forecast").afpDeviationCodeID = formValue.afpDeviationCode.lookUpId;
                mainObj.budgetForecasts.find(x => x.isopen === true && x.budgetData== "CapEx Forecast").mtdpDeviationCodeID =  formValue.mtdpDeviationCode.lookUpId;
                break;
        }
        return mainObj;
    }

    submitBudgetInfo() {
        this.projectHubService.isFormChanged = false
        const formValue = this.budgetInfoForm.getRawValue();
        const mainObj =this.prepareDataforSubmit(formValue)
        this.apiService.updateBudgetPageInfo(this.id, mainObj).then(res => {
            this.projectHubService.isNavChanged.next(true)
            this.projectHubService.submitbutton.next(true)
            this.projectHubService.successSave.next(true)
            this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
    }


}
