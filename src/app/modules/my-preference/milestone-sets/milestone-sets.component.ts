import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectHubService} from "../../project-hub/project-hub.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../@fuse/services/confirmation";
import {MyPreferenceApiService} from "../my-preference-api.service";
import {MsalService} from "@azure/msal-angular";
import {MyPreferenceService} from "../my-preference.service";

@Component({
    selector: 'app-milestone-sets',
    templateUrl: './milestone-sets.component.html',
    styleUrls: ['./milestone-sets.component.scss']
})
export class MilestoneSetsComponent {
    userId: string = ''
    miestoneSetsData: any = []

    constructor(private apiService: MyPreferenceApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService
        , public fuseAlert: FuseConfirmationService,  private msalService: MsalService, public myPreferenceService:MyPreferenceService ) {
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
        this.userId = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.apiService.getMasterStandardMilestoneSets(this.msalService.instance.getActiveAccount().localAccountId).then((res) => {
            this.miestoneSetsData = res
        })
    }

    deleteMilestoneSet(id: string) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Remove Key Assumption?",
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
        const milestoneSetDeleteAlert = this.fuseAlert.open(comfirmConfig)
        milestoneSetDeleteAlert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                this.apiService.deleteMilestone(id).then(res => {
                    this.myPreferenceService.submitbutton.next(true)
                })
            }
        })
    }


}
