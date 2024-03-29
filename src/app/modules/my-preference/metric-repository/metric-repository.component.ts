import { Component } from '@angular/core';
import {MyPreferenceApiService} from "../my-preference-api.service";
import {MyPreferenceService} from "../my-preference.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../@fuse/services/confirmation";
import {AuthService} from "../../../core/auth/auth.service";
import {PortfolioApiService} from "../../portfolio-center/portfolio-api.service";
import { MsalService } from "@azure/msal-angular";

@Component({
  selector: 'app-metric-repository',
  templateUrl: './metric-repository.component.html',
  styleUrls: ['./metric-repository.component.scss']
})
export class MetricRepositoryComponent {
    metricRepositoryData: any = []
    filterCriteria: any = {}
    milestoneAccess = false;
    checkAccessError = false;
    portfolioOwnerList: any;
    metricRepository: any;
    constructor(private apiService: MyPreferenceApiService,
                public myPreferenceService:MyPreferenceService,
                public fuseAlert: FuseConfirmationService,
                private authService: AuthService,
                private portApiService: PortfolioApiService,
                private msalService: MsalService,
                public myPreferenceApiService: MyPreferenceApiService) {
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
        if (this.checkAccessError == false) {
            this.checkMilestoneSetsAccess();
        }
        const promises = [
            this.authService.lookupMaster(),
            this.portApiService.getfilterlist(),
            this.apiService.getMetricRepository(),
            this.myPreferenceApiService.GetPortfolioOwnerForPreferences(this.msalService.instance.getActiveAccount().localAccountId)
        ];
        Promise.all(promises)
            .then((response: any[]) => {
                this.myPreferenceService.lookUpMaster = response[0]
                this.filterCriteria = response[1];
                this.metricRepositoryData = response[2]
                this.portfolioOwnerList = response[3]
                this.metricRepositoryData.forEach(element => {
                    if (element.metricTypeID == "e7a9e055-1319-4a4f-b929-cd7777599e39") {
                        element.metricTypeID = 'Global';
                    } else {
                        element.metricTypeID = 'Local';
                    }
                    element.metricPortfolioID = element.metricPortfolioID == "2eb536f8-bb88-4bd7-b4d5-4d1fb287059a" ? 'Global' : this.filterCriteria.portfolioOwner.filter(x => x.portfolioOwnerId==element.metricPortfolioID)[0]?.portfolioOwner
                    element.metricCategoryID = element.metricCategoryID && element.metricCategoryID.lookUpId != '' ? this.myPreferenceService.lookUpMaster.find(x => x.lookUpId == element.metricCategoryID)?.lookUpName : ''
                })
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    getPortfolioOwnerByName(portfolioId: string): any {
        return this.portfolioOwnerList.filter(x => x.portfolioOwner == portfolioId)[0];
    }

    checkMilestoneSetsAccess() {
        this.myPreferenceApiService.checkAccess(this.msalService.instance.getActiveAccount().localAccountId).then((res: any) => {
            if (res.HasAccess == true) {
                this.milestoneAccess = true;
            } else {
                this.milestoneAccess = false;
            }
        }).catch(err => {
            this.checkAccessError = true;
        }
        )
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
        return id && id.lookUpId != '' ? this.myPreferenceService.lookUpMaster.find(x => x.lookUpId == id)?.lookUpName : ''
    }
 
        isEditable(metric: any): boolean {
            // First, check if the metric is local
            const isLocalMetric = metric.metricTypeID !== 'Global';
            if (!isLocalMetric) return false;
        
            // Next, determine if the user is the portfolio owner for this metric
            const isUserPortfolioOwner = this.portfolioOwnerList.some(
                (portfolio) => portfolio.portfolioOwner == metric.portfolioOwner
            );
            return isUserPortfolioOwner;
        }

}
