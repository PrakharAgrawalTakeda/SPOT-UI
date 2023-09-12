import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MyPreferenceService} from "../../my-preference.service";
import {MyPreferenceApiService} from "../../my-preference-api.service";
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'app-metric-repository-add-edit-view',
  templateUrl: './metric-repository-add-edit-view.component.html',
  styleUrls: ['./metric-repository-add-edit-view.component.scss']
})
export class MetricRepositoryAddEditViewComponent {
    portfolioOwnerList =[];
    constructor(
        public myPreferenceApiService: MyPreferenceApiService,
        public myPreferenceService: MyPreferenceService,
        private msalService: MsalService
    ){}

    metricRepositoryForm = new FormGroup({
        globalLocal: new FormControl("Local"),
        managingPortfolio: new FormControl(null),
        category: new FormControl(null),
        metricName: new FormControl(''),
        unit: new FormControl(''),
        metricFormat: new FormControl(null),
        metricDescription: new FormControl(''),
        metricUsage: new FormControl(0),

    })
    ngOnInit() {
        this.metricRepositoryForm.controls.globalLocal.disable()
        this.myPreferenceApiService.GetPortfolioOwnerForPreferences(this.msalService.instance.getActiveAccount().localAccountId).then((portfolioRes: any) => {
            this.portfolioOwnerList = portfolioRes;
        })
    }
    submitMetricRepository() {
        this.myPreferenceService.isFormChanged = false
        var metricRepository = this.metricRepositoryForm.getRawValue();
        var mainObj = {
            metricID: "",
            metricPortfolioID: "",
            portfolioOwner: metricRepository.managingPortfolio.portfolioOwnerID,
            metricTypeID: "",
            metricCategoryID: metricRepository.category,
            metricName: metricRepository.metricName,
            metricUnit: metricRepository.unit,
            metricFormatID: metricRepository.metricFormat,
            metricDescription: metricRepository.metricDescription,
            helpText: "",
            metricUsage: 0,
            isMandatory: true
        }
        var id = this.msalService.instance.getActiveAccount().localAccountId
        this.myPreferenceApiService.addMetricRepository(mainObj).then(res => {
            this.myPreferenceService.submitbutton.next(true)
            this.myPreferenceService.toggleDrawerOpen('', '', [], '')
        })
    }

    getCategory(): any {
        return this.myPreferenceService.lookUpMaster.filter(x => x.lookUpParentId == '999572a6-5aa8-4760-8082-c06774a17474').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }
    getMetricFormat(): any {
        return this.myPreferenceService.lookUpMaster.filter(x => x.lookUpParentId == 'cf63db57-e74a-46ca-855e-5f40fa2acf21').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }
}
