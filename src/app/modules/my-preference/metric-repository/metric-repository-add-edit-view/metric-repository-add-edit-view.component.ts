import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MyPreferenceService} from "../../my-preference.service";
import {MyPreferenceApiService} from "../../my-preference-api.service";
import {MsalService} from "@azure/msal-angular";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";

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
        private msalService: MsalService,
        public fuseAlert: FuseConfirmationService,
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
        var fieldsMissing = 0;
        if(this.metricRepositoryForm.get('managingPortfolio').value==null){
            fieldsMissing ++;
        }
        if(this.metricRepositoryForm.get('category').value==null){
            fieldsMissing ++;
        }
        if(this.metricRepositoryForm.get('metricName').value==null || this.metricRepositoryForm.get('metricName').value==""){
            fieldsMissing ++;
        }
        if(this.metricRepositoryForm.get('unit').value==null || this.metricRepositoryForm.get('unit').value==""){
            fieldsMissing ++;
        }
        if(this.metricRepositoryForm.get('metricFormat').value==null || this.metricRepositoryForm.get('metricFormat').value==null){
            fieldsMissing ++;
        }
        if (fieldsMissing>0) {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "Required fields missing",
                "message": "Please fill all the required fields.",
                "icon": {
                    "show": true,
                    "name": "heroicons_outline:exclamation",
                    "color": "warning"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "Okay",
                        "color": "primary"
                    },
                    "cancel": {
                        "show": false,
                    },
                },
                "dismissible": true
            }
            const alert = this.fuseAlert.open(comfirmConfig)
        }else{
            this.myPreferenceService.isFormChanged = false
            var metricRepository = this.metricRepositoryForm.getRawValue();
            var mainObj = {
                metricID: "",
                metricPortfolioID:  metricRepository.managingPortfolio.portfolioOwnerID,
                portfolioOwner: "",
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
