import {Component, Input, OnInit} from '@angular/core';
import {ProjectApiService} from "../project-api.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectHubService} from "../../project-hub.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";

@Component({
    selector: 'app-key-assumptions-table',
    templateUrl: './key-assumptions-table.component.html',
    styleUrls: ['./key-assumptions-table.component.scss']
})
export class KeyAssumptionsTableComponent implements OnInit {
    @Input() callLocation:  'Normal'  | 'Project-Charter'  = 'Normal'
    @Input() editable: boolean
    keyAssumptions: any = []
    id: string = ''
    isGrid: boolean = false
    constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService
    ,public fuseAlert: FuseConfirmationService) {
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
        if(this.callLocation != 'Normal'){
            this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
        }
        this.apiService.getKeyAssumptionsByProject(this.id).then((res) => {
            this.keyAssumptions = res
        })
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
                this.apiService.deleteKeyAssumption(id).then(res => {
                    this.projecthubservice.submitbutton.next(true)
                })
            }
        })
    }
}
