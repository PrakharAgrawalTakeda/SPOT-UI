import {Component, Input} from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectHubService} from "../../project-hub.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
@Component({
    selector: 'app-budget-funding-information-table',
    templateUrl: './budget-funding-information-table.component.html',
    styleUrls: ['./budget-funding-information-table.component.scss']
})
export class BudgetFundingInformationTableComponent {
    fundingRequests: any = []
    id: string = ''

    constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService
        , public fuseAlert: FuseConfirmationService, private router: Router) {
        this.projecthubservice.submitbutton.subscribe(res => {
            if (res == true) {
                this.dataloader()
            }
        })
    }

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.apiService.getKeyAssumptionsByProject(this.id).then((res) => {
            this.fundingRequests = res
        })
    }

    deleteFundingRequest(id: string) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Remove Funding Request?",
            "message": "Are you sure you want to delete this record? ",
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
        const fundingRequestAlert = this.fuseAlert.open(comfirmConfig)
        fundingRequestAlert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                this.apiService.deleteKeyAssumption(id).then(res => {
                    this.projecthubservice.submitbutton.next(true)
                })
            }
        })
    }
}
