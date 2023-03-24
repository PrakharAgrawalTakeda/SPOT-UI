import {Component, Input, OnInit} from '@angular/core';
import {ProjectApiService} from "../project-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectHubService} from "../../project-hub.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {Constants} from "../../../../shared/constants";
import {GlobalBusinessCaseOptions} from "../../../../shared/global-business-case-options";

@Component({
    selector: 'app-key-assumptions-table',
    templateUrl: './key-assumptions-table.component.html',
    styleUrls: ['./key-assumptions-table.component.scss']
})
export class KeyAssumptionsTableComponent implements OnInit {
    @Input() callLocation:  'Normal'  | 'Project-Charter' | 'Business-Case'  = 'Normal'
    @Input() editable: boolean
    keyAssumptions: any = []
    id: string = ''
    isGrid: boolean = false
    optionId: string = ''
    keyAssumptionsViewEditType: string = "KeyAssumptions";
    keyAssumptionsBulkEditType: string = "KeyAssumptionsBulkEdit";
    constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService
    ,public fuseAlert: FuseConfirmationService, private router: Router) {
        this.projecthubservice.submitbutton.subscribe(res => {
            if (res == true) {
                this.dataloader()
            }
        })
    }

    ngOnInit(): void {
        this.dataloader()
    }
    dataloader(){
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        if(this.callLocation == 'Project-Charter'){
            this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
            this.keyAssumptionsViewEditType = "ProjectCharterKeyAssumptionAddSingle"
            this.keyAssumptionsBulkEditType = "ProjectCharterKeyAssumptionBulkEdit"
            this.apiService.getKeyAssumptionsByProject(this.id).then((res) => {
                this.keyAssumptions = res
            })
        }
        if(this.callLocation == 'Business-Case'){
            this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id")
            this.keyAssumptionsViewEditType = "BusinessCaseKeyAssumptionAddSingle"
            this.keyAssumptionsBulkEditType = "BusinessCaseKeyAssumptionBulkEdit"
            if (this.router.url.includes('recommended-option')) {
                this.optionId = GlobalBusinessCaseOptions.OPTION_1
                this.apiService.getKeyAssumptionsByProject(this.id).then((res) => {
                    this.keyAssumptions = res
                })
            }
            if (this.router.url.includes('option-2')) {
                this.optionId = GlobalBusinessCaseOptions.OPTION_2
                this.apiService.getKeyAssumptionsByOption(this.id,Constants.OPTION_2_ID.toString()).then((res) => {
                    this.keyAssumptions = res
                })
            }
            if (this.router.url.includes('option-3')) {
                this.optionId = GlobalBusinessCaseOptions.OPTION_3
                this.apiService.getKeyAssumptionsByOption(this.id,Constants.OPTION_3_ID.toString()).then((res) => {
                    this.keyAssumptions = res
                })
            }
        }
    }
    deleteKeyAssumption(id: string) {
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
        const keyAsumptioneAlert = this.fuseAlert.open(comfirmConfig)
        keyAsumptioneAlert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                if (this.callLocation == 'Business-Case') {
                    this.apiService.deleteKeyAssumptionByOption(id, this.optionId, this.id).then((res) => {
                        this.projecthubservice.submitbutton.next(true)
                    })
                }
                if (this.callLocation == "Project-Charter") {
                    this.apiService.deleteKeyAssumption(id).then(res => {
                         this.projecthubservice.submitbutton.next(true)
                    })
                }
            }
        })
    }
}
