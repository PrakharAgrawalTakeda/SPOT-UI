import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProjectHubService} from "../../project-hub.service";
import {ActivatedRoute} from "@angular/router";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import {ProjectApiService} from "../../common/project-api.service";
import {GlobalBusinessCaseOptions} from "../../../../shared/global-business-case-options";
import {Constants} from "../../../../shared/constants";

@Component({
    selector: 'app-close-out-budget-performance',
    templateUrl: './close-out-budget-performance.component.html',
    styleUrls: ['./close-out-budget-performance.component.scss']
})
export class CloseOutBudgetPerformanceComponent implements OnInit {
    viewContent: boolean = false
    financialRequirements: any = []
    id: string = ''
    benefitsInfoForm = new FormGroup({
        projectId: new FormControl(''),
        budgetCommentary: new FormControl(''),
        finalRequirementsValue: new FormControl([]),
        selectedFields: new FormControl([]),
    })

    constructor(public projectHubService: ProjectHubService,
                private _Activatedroute: ActivatedRoute,
                private portApiService: PortfolioApiService,
                public apiService: ProjectApiService,) {
    }

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
        this.apiService.getBudgetPerformanceById(this.id).then((res) => {
            this.financialRequirements = res
            this.viewContent = true;
        })

    }

}
