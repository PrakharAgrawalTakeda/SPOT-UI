import {Component, Input} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import { FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {ProjectApiService} from "../../common/project-api.service";
import {FormControl, FormGroup} from "@angular/forms";

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
    }

    viewContent: boolean = false;
    local: any = [];
    lookupdata: any = [];
    id: string = "";
    localCurrency: any = [];
    budgetInfo: any = {}
    required: boolean = false;
    budgetInfoForm = new FormGroup({
        assetPlaced: new FormControl(''),
        opexRequired: new FormControl(false),
    })

    ngOnInit(): void {
        if(this.mode=='Asset-In-Service'){
            this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
            this.apiService.getBudgetPageInfo(this.projectHubService.projectid).then((res: any) => {
                this.budgetInfo = res
                this.budgetInfoForm.patchValue({
                    assetPlaced: res.budget.definitiveCrapprovalDate,
                })
                this.viewContent = true
            })
        }
        else{
            this.budgetInfoForm.patchValue({
                opexRequired: this.projectHubService.all,
            })
            this.viewContent = true
        }

    }

    submitBudgetInfo() {

    }
}
