import { Component } from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../core/auth/auth.service";

@Component({
  selector: 'app-budget-general-edit',
  templateUrl: './budget-general-edit.component.html',
  styleUrls: ['./budget-general-edit.component.scss']
})
export class BudgetGeneralEditComponent {
    viewContent: boolean = false;
    showMessage: boolean = false;
    local: any = [];
    lookupdata: any = [];
    budgetInfoForm = new FormGroup({
        testform: new FormControl('')
    })
    constructor (public projectHubService: ProjectHubService,
                 public auth: AuthService){

    }
    ngOnInit(): void {
        this.getllookup()

    }

    getllookup() {
        this.auth.lookupMaster().then((resp: any) => {
            this.lookupdata = resp
            this.viewContent = true
        })
    }
    getYesNo(): any {
        return this.lookupdata.filter(x => x.lookUpParentId == 'c58fb456-3901-4677-9ec5-f4eada7158e6')
    }
    getPredifinedInvestment(): any {
        return this.lookupdata.filter(x => x.lookUpParentId == '3bfab1e2-2711-482b-8674-e697219e9f3e')
    }
    getWhereLookup(): any {
        return this.lookupdata.filter(x => x.lookUpParentId == '6491dc30-2c0d-434f-bc10-7650d1a23c5c')
    }
    getWhyLookup(): any {
        return this.lookupdata.filter(x => x.lookUpParentId == '927293cb-d4ca-4f31-8af6-c33c9e4792d1')
    }
    submitBudgetInfo() {}
}
