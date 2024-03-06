import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectHubService} from "../../project-hub/project-hub.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../@fuse/services/confirmation";
import {MyPreferenceApiService} from "../my-preference-api.service";
import {MsalService} from "@azure/msal-angular";
import {MyPreferenceService} from "../my-preference.service";
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-milestone-sets',
    templateUrl: './milestone-sets.component.html',
    styleUrls: ['./milestone-sets.component.scss']
})
export class MilestoneSetsComponent implements OnInit, OnDestroy {
    userId: string = ''
    miestoneSetsData: any = []
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private apiService: MyPreferenceApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService
        , public fuseAlert: FuseConfirmationService,  private msalService: MsalService, public myPreferenceService:MyPreferenceService ) {
        this.myPreferenceService.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
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
            "title": "Remove Standard Milestone Set?",
            "message": "Are you sure you want to delete the Standard Milestone Set permanently?",
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
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
      }

}
