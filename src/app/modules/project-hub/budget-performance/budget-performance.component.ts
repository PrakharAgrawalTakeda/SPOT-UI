import { Component } from '@angular/core';
import {ProjectHubService} from "../project-hub.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectApiService} from "../common/project-api.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-budget-performance',
  templateUrl: './budget-performance.component.html',
  styleUrls: ['./budget-performance.component.scss']
})
export class BudgetPerformanceComponent {
    id: string = "";
    viewContent = false;
    tfpColor: string;
    ytdValue: string;
    localCurrency : string  = "";
    budgetPerformanceForm = new FormGroup({
        totalApprovedCapex: new FormControl(''),
        currentCapex: new FormControl(''),
        preliminary: new FormControl(''),
        currentLtdCapex: new FormControl(''),
        tfpPercentage: new FormControl(''),
        tfpValue: new FormControl(''),
        planCapex: new FormControl(''),
        currentFiscalYearCapex: new FormControl(''),
        currentYtdCapex: new FormControl(''),
        preliminaryFiscal: new FormControl(''),
        ytdPercentage: new FormControl(''),
        ytdValue: new FormControl(''),

    })

    constructor(public projectHubService: ProjectHubService,
                private _Activatedroute: ActivatedRoute,
                private apiService: ProjectApiService,) {
    }
    ngOnInit(): void {
        this.dataloader()
    }
    dataloader(): void {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        const promises = [
            this.apiService.getBudgetPerformancePageInfo(this.id)
        ];
        Promise.all(promises)
            .then((response: any[]) => {
                this.budgetPerformancePatchValue(response[0])
                this.viewContent = true
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        this.disabler()
    }
    disabler() {
    }
    budgetPerformancePatchValue(response) {
        this.budgetPerformanceForm.patchValue({
            totalApprovedCapex: response.total.totalApprovedCapex,
            currentCapex: response.total.currentCapex,
            preliminary: response.total.preliminary,
            currentLtdCapex: response.total.currentLtdCapex,
            tfpPercentage: response.total.totalForecastPerformance,
            tfpValue: response.total.totalForecastPerformanceValue,
            planCapex: response.total.planCapex,
            currentFiscalYearCapex: response.total.currentFiscalYearCapex,
            currentYtdCapex: response.total.currentYtdCapex,
            preliminaryFiscal: response.total.preliminaryFiscal,
            ytdPercentage:  response.total.yearToDatePerformance,
            ytdValue: response.total.yearToDatePerformanceValue,
        })
        this.localCurrency = response.localCurrency
    }
}
