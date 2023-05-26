import {Component, OnInit} from '@angular/core';
import {ProjectHubService} from "../project-hub.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-budget',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
    viewContent = false;

    constructor(public projectHubService: ProjectHubService) {
    }

    budgetForm = new FormGroup({
        parentProgram: new FormControl(''),
    })
    ngOnInit(): void {
        this.viewContent = true;
        this.disabler()

    }
    disabler() {
        this.budgetForm.disable()
    }

}
