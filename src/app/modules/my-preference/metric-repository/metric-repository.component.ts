import { Component } from '@angular/core';
import {MyPreferenceApiService} from "../my-preference-api.service";
import {MyPreferenceService} from "../my-preference.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../@fuse/services/confirmation";
import {AuthService} from "../../../core/auth/auth.service";
import {PortfolioApiService} from "../../portfolio-center/portfolio-api.service";

@Component({
  selector: 'app-metric-repository',
  templateUrl: './metric-repository.component.html',
  styleUrls: ['./metric-repository.component.scss']
})
export class MetricRepositoryComponent {
    metricRepositoryData: any = []
    filterCriteria: any = {}
    constructor(private apiService: MyPreferenceApiService,
                public myPreferenceService:MyPreferenceService,
                public fuseAlert: FuseConfirmationService,
                private authService: AuthService,
                private portApiService: PortfolioApiService) {
        this.myPreferenceService.submitbutton.subscribe(res => {
            if (res == true) {
                this.dataloader()
            }
        })
    }

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        const promises = [
            this.authService.lookupMaster(),
            this.portApiService.getfilterlist(),
            this.apiService.getMetricRepository()
        ];
        Promise.all(promises)
            .then((response: any[]) => {
                this.myPreferenceService.lookUpMaster = response[0]
                this.filterCriteria = response[1];
                this.metricRepositoryData = response[2]
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
            console.log(this.metricRepositoryData)
    }

    deleteMetricRepository(id: any) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Remove Metric Repository?",
            "message": "You intend to delete this metric from the metric repository. This action will remove the local metric information from all the projects where this local metric is assigned. Are you sure you want to proceed and implement the change?”",
            "icon": {
                "show": true,
                "name": "heroicons_outline:exclamation",
                "color": "warn"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "Remove",
                    "color": "warn"
                },
                "cancel": {
                    "show": true,
                    "label": "Cancel"
                }
            },
            "dismissible": true
        }
        const alert = this.fuseAlert.open(comfirmConfig)
        alert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                this.apiService.deleteMetricRepository(id).then(res => {
                    this.myPreferenceService.submitbutton.next(true)
                })
            }
        })
    }
    getLookUpName(id: any): any {
        return id && id.lookUpId != '' ? this.myPreferenceService.lookUpMaster.find(x => x.lookUpId == id).lookUpName : ''
    }
    getPortfolioOwnerNameById(id: string): any {
        if(id=="2eb536f8-bb88-4bd7-b4d5-4d1fb287059a"){
            return "Global"
        }
        return this.filterCriteria.portfolioOwner.filter(x => x.portfolioOwnerId==id)[0]?.portfolioOwner;
    }
    getGlobalLocal(id: string): any {
        if(id=="e7a9e055-1319-4a4f-b929-cd7777599e39"){
            return "Global"
        }else{
            return "Local"
        }
    }
    isEditable(row: any): boolean {
        return row.metricTypeID != "e7a9e055-1319-4a4f-b929-cd7777599e39";
    }
}
