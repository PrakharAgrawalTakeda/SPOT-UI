import {Component, Input} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import { FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {ProjectApiService} from "../../common/project-api.service";
import {FormControl, FormGroup} from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: 'app-budget-additional-edit',
  templateUrl: './budget-additional-edit.component.html',
  styleUrls: ['./budget-additional-edit.component.scss']
})
export class BudgetAdditionalEditComponent {
    @Input() mode: 'Asset-In-Service' | 'OPEX'  = 'OPEX'
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
    })

    ngOnInit(): void {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.budgetInfo = this.projectHubService.all;
        if(this.mode=='Asset-In-Service'){
            this.budgetInfoForm.patchValue({
                apisdate: this.budgetInfo.budget.apisdate,
            })
            this.viewContent = true
        }
        else{
            this.budgetInfoForm.patchValue({
                opexRequired: this.budgetInfo.budget.opExRequired,
            })
            this.viewContent = true
        }
        this.projectHubService.isFormChanged = false

    }
    prepareDataforSubmit(formValue): any {
        const mainObj = this.budgetInfo;
        if(this.mode=='Asset-In-Service'){
            mainObj.budget.apisdate = formValue.apisdate ? moment(formValue.apisdate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null;
        }else{
            mainObj.budget.opexRequired = formValue.opexRequired;
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
