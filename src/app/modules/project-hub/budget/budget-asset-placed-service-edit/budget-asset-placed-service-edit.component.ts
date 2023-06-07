import { Component } from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import { FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {ProjectApiService} from "../../common/project-api.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-budget-asset-placed-service-edit',
  templateUrl: './budget-asset-placed-service-edit.component.html',
  styleUrls: ['./budget-asset-placed-service-edit.component.scss']
})
export class BudgetAssetPlacedServiceEditComponent {

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
    })

    ngOnInit(): void {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.apiService.getBudgetPageInfo(this.projectHubService.projectid).then((res: any) => {
            this.budgetInfo = res
            this.generalInfoPatchValue(res)
            this.viewContent = true
        })
    }

    submitBudgetInfo() {

    }
    generalInfoPatchValue(response) {
        this.budgetInfoForm.patchValue({
            assetPlaced: response.budget.definitiveCrapprovalDate,
        })
    }
}
