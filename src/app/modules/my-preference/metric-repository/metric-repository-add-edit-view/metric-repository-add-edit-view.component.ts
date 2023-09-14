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
    metricRepository: any = {}
    portfolioOwnerList =[];
    categoryChanged: boolean = false;
    constructor(
        public myPreferenceApiService: MyPreferenceApiService,
        public myPreferenceService: MyPreferenceService,
        private msalService: MsalService,
        public fuseAlert: FuseConfirmationService,
    ){
        this.metricRepositoryForm.controls.category.valueChanges.subscribe(res => {
            this.categoryChanged = true;
        })
    }

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
            if (this.myPreferenceService.itemid != "new") {
                this.metricRepository = this.myPreferenceService.all
                this.metricRepositoryForm.patchValue({
                    globalLocal: this.metricRepository.metricID == "e7a9e055-1319-4a4f-b929-cd7777599e39" ? 'Global' : 'Local',
                    managingPortfolio: this.getPortfolioOwnerById(this.metricRepository.metricPortfolioID),
                    category: this.metricRepository.metricCategoryID,
                    metricName: this.metricRepository.metricName,
                    unit: this.metricRepository.metricUnit,
                    metricFormat: this.metricRepository.metricFormatID,
                    metricDescription: this.metricRepository.metricDescription,
                    metricUsage: this.metricRepository.metricUsage,
                }, { emitEvent: false })
                if(this.metricRepository.metricUsage>0){
                    this.metricRepositoryForm.controls.managingPortfolio.disable()
                }
            }
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
            if (this.categoryChanged) {
                var comfirmConfig: FuseConfirmationConfig = {
                    "title": "Category Changed",
                    "message": "All data generated for this local metric in projects has been based on the current category. If you change the category, the interpretation of the data may be different and the data entered in the projects may not be good. Do you want to proceed?”",
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
                            "show": true,
                        },
                    },
                    "dismissible": true
                }
                const alert = this.fuseAlert.open(comfirmConfig)
                alert.afterClosed().subscribe(close => {
                    if (close == 'confirmed') {
                        this.submitMethod()
                    }
                })
            }else{
                this.submitMethod()
            }
        }
    }
    submitMethod(): any {
        this.myPreferenceService.isFormChanged = false
        const metricRepository = this.metricRepositoryForm.getRawValue();
        if (this.myPreferenceService.itemid == "new") {
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
        }else {
            var mainObjUpdate = {
                metricID: this.metricRepository.metricID,
                metricPortfolioID: metricRepository.managingPortfolio.portfolioOwnerID,
                portfolioOwner: "",
                metricTypeID: "",
                metricCategoryID: metricRepository.category,
                metricName: metricRepository.metricName,
                metricUnit: metricRepository.unit,
                metricFormatID: metricRepository.metricFormat,
                metricDescription: metricRepository.metricDescription,
                helpText: this.metricRepository.helpText ? this.metricRepository.helpText : "",
                metricUsage: this.metricRepository.metricUsage,
                isMandatory: this.metricRepository.isMandatory,
            }
            this.myPreferenceApiService.editMetricRepository(this.metricRepository.metricID,mainObjUpdate).then(res => {
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
    getPortfolioOwnerById(portfolioId: string): any {
        return this.portfolioOwnerList.filter(x =>  x.portfolioOwnerID == portfolioId)[0];
    }
}
