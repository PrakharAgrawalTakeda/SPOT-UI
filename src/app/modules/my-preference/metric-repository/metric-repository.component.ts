import { ChangeDetectorRef, Component } from '@angular/core';
import { MyPreferenceApiService } from "../my-preference-api.service";
import { MyPreferenceService } from "../my-preference.service";
import { FuseConfirmationConfig, FuseConfirmationService } from "../../../../@fuse/services/confirmation";
import { AuthService } from "../../../core/auth/auth.service";
import { PortfolioApiService } from "../../portfolio-center/portfolio-api.service";
import { MsalService } from "@azure/msal-angular";
import { RoleService } from 'app/core/auth/role.service';

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
    showAddNewButton: any;
    showEditDeleteButtons: any;
    userManagedPortfolios: any;
    isPortfolioManager: boolean = false;

    constructor(private apiService: MyPreferenceApiService,
        public myPreferenceService: MyPreferenceService,
        public fuseAlert: FuseConfirmationService,
        private authService: AuthService,
        private portApiService: PortfolioApiService,
        private msalService: MsalService,
        public myPreferenceApiService: MyPreferenceApiService, private changeDetectorRef: ChangeDetectorRef, public role: RoleService) {
        this.myPreferenceService.submitbutton.subscribe(res => {
            if (res == true) {
                this.dataloader()
            }
        })
    }

    ngOnInit(): void {
        this.dataloader()
    }
    checkUserPermissions() {
        const currentUserID = this.msalService.instance.getActiveAccount().localAccountId;
        console.log(currentUserID)
        const portfolioOwnerList = this.filterCriteria.portfolioOwner;
        const isPortfolioManager = ["C9F323D4-EF97-4C2A-B748-11DB5B8589D0"].includes(this.role.roleMaster.securityGroupId);
        this.userManagedPortfolios = portfolioOwnerList.filter(po =>
            po.pmoleadDelegateAdid == currentUserID || po.pmoleadAdid == currentUserID
        ).map(po => po.portfolioOwner);
        console.log(this.userManagedPortfolios)
        this.metricRepositoryData = this.metricRepositoryData.map(metric => ({
            ...metric,
            showEdit: isPortfolioManager && this.userManagedPortfolios.includes(metric.portfolioOwner) && metric.metricTypeID != 'Global',
            showDelete: isPortfolioManager && this.userManagedPortfolios.includes(metric.portfolioOwner) && metric.metricTypeID != 'Global'
        }));
        console.log(this.metricRepositoryData.filter(po => po.portfolioOwner == 'Site-Lessines'))
    }
    dataloader() {
        // Check if the user is a Portfolio Manager and update the variable
        this.isPortfolioManager = ["C9F323D4-EF97-4C2A-B748-11DB5B8589D0"].includes(this.role.roleMaster.securityGroupId);

        const promises = [
            this.authService.lookupMaster(),
            this.portApiService.getfilterlist(),
            this.apiService.getMetricRepository()
        ];
        Promise.all(promises)
            .then((response: any[]) => {
                this.myPreferenceService.lookUpMaster = response[0]
                this.filterCriteria = response[1];
                console.log("FILTER LIST", this.filterCriteria.portfolioOwner)
                this.metricRepositoryData = response[2]
                console.log(this.metricRepositoryData)
                this.metricRepositoryData.forEach(element => {
                    if (element.metricTypeID == "e7a9e055-1319-4a4f-b929-cd7777599e39") {
                        element.metricTypeID = 'Global';
                    } else {
                        element.metricTypeID = 'Local';
                    }
                    element.metricPortfolioID = element.metricPortfolioID == "2eb536f8-bb88-4bd7-b4d5-4d1fb287059a" ? 'Global' : this.filterCriteria.portfolioOwner.filter(x => x.portfolioOwnerId == element.metricPortfolioID)[0]?.portfolioOwner
                    element.metricCategoryID = element.metricCategoryID && element.metricCategoryID.lookUpId != '' ? this.myPreferenceService.lookUpMaster.find(x => x.lookUpId == element.metricCategoryID)?.lookUpName : ''
                })
                this.checkUserPermissions()
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    getPortfolioOwnerByName(portfolioId: string): any {
        return this.portfolioOwnerList.filter(x => x.portfolioOwner == portfolioId)[0];
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
        return metric.showEdit || metric.showDelete && metric.metricTypeID != "Global";
    }


}
