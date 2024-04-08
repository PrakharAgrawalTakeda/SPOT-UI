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
        this.loadInitialData().then(() => {
            // Once loadInitialData completes, proceed to check user permissions
            this.checkUserPermissions().then(() => {
                // After permissions are checked, proceed to load metric repository data
                this.dataloader();
            });
        });
    }
    loadInitialData() {
        return Promise.all([
            this.authService.lookupMaster(),
            this.portApiService.getfilterlist(),
        ]).then(([lookupMaster, filterList]) => {
            this.myPreferenceService.lookUpMaster = lookupMaster;
            this.filterCriteria = filterList;
        })
    }

    checkUserPermissions() {
        return new Promise<void>((resolve, reject) => {
            const currentUserID = this.msalService.instance.getActiveAccount().localAccountId;
            //this.msalService.instance.getActiveAccount().localAccountId;
            if (!this.filterCriteria || !this.filterCriteria.portfolioOwner) {
                console.error("filterCriteria is not loaded");
                reject("filterCriteria is not loaded");
                return;
            }
            console.log(this.filterCriteria.portfolioOwner)
            const portfolioOwnerList = this.filterCriteria.portfolioOwner;
            this.userManagedPortfolios = portfolioOwnerList.filter(po => {
                // Split the pmoleadDelegateAdid field into an array of IDs
            const delegateAdids = po.pmoleadDelegateAdid ? po.pmoleadDelegateAdid.split(',') : [];
            // Check if currentUserID matches pmoleadAdid or is included in the delegateAdids array
            return po.pmoleadAdid == currentUserID || delegateAdids.includes(currentUserID);
        }).map(po => po.portfolioOwner);
            console.log(this.userManagedPortfolios)

            // visibility of Add New button
            this.showAddNewButton = this.userManagedPortfolios ? this.userManagedPortfolios.length > 0 : false;

            resolve();
        });
    }

    dataloader() {
        // Check if the user is a Portfolio Manager and update the variable --- requirement changed
        //this.isPortfolioManager = ["C9F323D4-EF97-4C2A-B748-11DB5B8589D0"].includes(this.role.roleMaster.securityGroupId);

        const promises = [
            this.apiService.getMetricRepository()
        ];
        Promise.all(promises)
            .then((response: any[]) => {
                let tempMetricRepositoryData = response[0];
                console.log(tempMetricRepositoryData)
                tempMetricRepositoryData.forEach(element => {
                    if (element.metricTypeID == "e7a9e055-1319-4a4f-b929-cd7777599e39") {
                        element.metricTypeID = 'Global';
                    } else {
                        element.metricTypeID = 'Local';
                    }
                    element.metricPortfolioID = element.metricPortfolioID == "2eb536f8-bb88-4bd7-b4d5-4d1fb287059a" ? 'Global' : this.filterCriteria.portfolioOwner.filter(x => x.portfolioOwnerId == element.metricPortfolioID)[0]?.portfolioOwner
                    element.metricCategoryID = element.metricCategoryID && element.metricCategoryID.lookUpId != '' ? this.myPreferenceService.lookUpMaster.find(x => x.lookUpId == element.metricCategoryID)?.lookUpName : ''
                })
                // Filter metrics based on user role and metric type
                this.metricRepositoryData = tempMetricRepositoryData.filter(metric => {
                    if (metric.metricTypeID == 'Global') {
                        return true; // Always include global metrics
                    } else {
                        // Include local metrics only if the user manages the portfolio
                        return this.userManagedPortfolios ? this.userManagedPortfolios.includes(metric.portfolioOwner) : '';
                    }
                });

                this.metricRepositoryData.forEach(element => {
                    const isUserAssociatedWithPortfolio = this.userManagedPortfolios.includes(element.portfolioOwner);
                    const isLocalMetric = element.metricTypeID != 'Global';

                    element.showEdit = isUserAssociatedWithPortfolio && isLocalMetric;
                    element.showDelete = isUserAssociatedWithPortfolio && isLocalMetric;
                })

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
