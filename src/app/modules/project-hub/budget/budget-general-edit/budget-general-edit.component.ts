import { Component } from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-budget-general-edit',
  templateUrl: './budget-general-edit.component.html',
  styleUrls: ['./budget-general-edit.component.scss']
})
export class BudgetGeneralEditComponent {
    viewContent: boolean = false;
    showMessage: boolean = false;
    local: any = [];
    budgetInfoForm = new FormGroup({
        testform: new FormControl('')
    })
    constructor (public projectHubService: ProjectHubService){

    }
    ngOnInit(): void {
        this.viewContent = true
    }
    getYesNo(): any {
        return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == 'c58fb456-3901-4677-9ec5-f4eada7158e6')
    }
    submitBudgetInfo() {}
}
