import { Component } from '@angular/core';
import {MyPreferenceApiService} from "../my-preference-api.service";
import {MyPreferenceService} from "../my-preference.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../@fuse/services/confirmation";

@Component({
  selector: 'app-metric-repository',
  templateUrl: './metric-repository.component.html',
  styleUrls: ['./metric-repository.component.scss']
})
export class MetricRepositoryComponent {
    metricRepositoryData: any = []
    constructor(private apiService: MyPreferenceApiService, public myPreferenceService:MyPreferenceService,public fuseAlert: FuseConfirmationService ) {
    }

    deleteMetricRepository(id: string) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Remove Metric Repository?",
            "message": "Are you sure you want to delete this record?",
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
                // this.apiService.deleteMilestone(id).then(res => {
                //     this.myPreferenceService.submitbutton.next(true)
                // })
            }
        })
    }

}
