import {Component, Input} from '@angular/core';
import {ProjectApiService} from "../project-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectHubService} from "../../project-hub.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";

@Component({
  selector: 'app-operational-benefits-table',
  templateUrl: './operational-benefits-table.component.html',
  styleUrls: ['./operational-benefits-table.component.scss']
})
export class OperationalBenefitsTableComponent {
    @Input() optionId;
    @Input() lookup: any;
    @Input() benefitsData: any;
    @Input() editable: boolean
    id: string = ""

    constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projectHubService: ProjectHubService
        ,public fuseAlert: FuseConfirmationService, private router: Router) {
    }
    ngOnInit(): void {
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    }

    deleteOperationalBenefit(id: string) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Remove Operational Benefit?",
            "message": "Are you sure you want to remove this record permanently? ",
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
        const keyAsumptioneAlert = this.fuseAlert.open(comfirmConfig)
        keyAsumptioneAlert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                this.apiService.deleteBusinessCaseOptionDetail(this.id,this.optionId,id).then(res => {
                    this.projectHubService.submitbutton.next(true)
                })
            }
        })
    }
}
