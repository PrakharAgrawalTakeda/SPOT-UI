import {Component, Input, OnInit} from '@angular/core';
import {ProjectHubService} from "../../../project-hub.service";
import {ProjectApiService} from "../../../common/project-api.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {ActivatedRoute} from "@angular/router";
import { Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'app-standard-milestone-sets',
    templateUrl: './standard-milestone-sets.component.html',
    styleUrls: ['./standard-milestone-sets.component.scss']
})
export class StandardMilestoneSetsComponent implements OnInit {
    @Output() standardMilestonesAdded = new EventEmitter<any[]>();
    @Input() loadContent: boolean = false;
    standardMilestoneData: any = []
    standardMilestoneDBData: any = []
    standarMilestoneAdded: any = []
    viewContent: boolean = false
    id: string = ""
    constructor(public projectHubService: ProjectHubService,  public apiService: ProjectApiService, public fuseAlert: FuseConfirmationService,
                private _Activatedroute: ActivatedRoute) {
    }

    ngOnChanges() {
        if(this.loadContent){
            this.dataloader()
        }
    }
    ngOnInit(): void {

    }
    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.standardMilestoneData = []
        this.standardMilestoneDBData = []
        this.standarMilestoneAdded = []
        this.apiService.getStandardMilestoneSets(this.id).then(res => {
            this.standardMilestoneDBData = [...this.sortByLevel(res)]
            this.standardMilestoneData = this.sortByLevel(res)
            for (var i in this.standardMilestoneData) {
                this.standarMilestoneAdded.push([])
            }
            this.projectHubService.isFormChanged = false
            this.viewContent = true
        })
    }
    submitStandardMilestoneSets() {
        var returnedMilestones: any = []
        this.standarMilestoneAdded.forEach(x => {
            x.map(y=> {
                returnedMilestones.push(y);
            })
        })
        var startMilestonesCount =0;
        var endMilestonesCount =0;
        returnedMilestones.forEach(x=>{
            if(x.milestoneType ==1){
                startMilestonesCount++
            }
            if(x.milestoneType ==2){
                endMilestonesCount++
            }
        })
        if(startMilestonesCount>1){
            var limitConfig: FuseConfirmationConfig = {
                "message": "The Execution Start milestone has been selected multiple times from different Milestone Sets. Please limit your selection to include it only once",
                "icon": {
                    "show": true,
                    "name": "heroicons_outline:exclamation",
                    "color": "warn"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "OK",
                        "color": "warn"
                    }
                },
                "dismissible": true
            }
            this.fuseAlert.open(limitConfig)
        }else{
            if(startMilestonesCount>1) {
                var limitConfig: FuseConfirmationConfig = {
                    "message": "The Execution Start milestone has been selected multiple times from different Milestone Sets. Please limit your selection to include it only once",
                    "icon": {
                        "show": true,
                        "name": "heroicons_outline:exclamation",
                        "color": "warn"
                    },
                    "actions": {
                        "confirm": {
                            "show": true,
                            "label": "OK",
                            "color": "warn"
                        }
                    },
                    "dismissible": true
                }
                this.fuseAlert.open(limitConfig)
            }else {
                var comfirmConfig: FuseConfirmationConfig = {
                    "message": "The selected milestones will be added to your project’s existing milestones. Do you want to proceed? ",
                    "icon": {
                        "show": true,
                        "name": "heroicons_outline:exclamation",
                        "color": "warning"
                    },
                    "actions": {
                        "confirm": {
                            "show": true,
                            "label": "Yes",
                            "color": "primary"
                        },
                        "cancel": {
                            "show": true,
                            "label": "Cancel"
                        }
                    },
                    "dismissible": true
                }
                const askNeedAlert = this.fuseAlert.open(comfirmConfig)
                askNeedAlert.afterClosed().subscribe(res => {
                    if (res == 'confirmed') {
                        this.standardMilestonesAdded.emit(returnedMilestones);
                    }
                })
            }
        }


    }
    toggleSchedule(event: any) {
        this.standarMilestoneAdded[event.tableIndex] = [...event.selected]
    }
    sortByLevel(array: any): any {
        return array.length > 1 ? array.sort((a, b) => {
            if (a.level === null) {
                return -1;
            }
            if (b.level === null) {
                return 1;
            }
            if (a.level === b.level) {
                return 0;
            }
            return a.level < b.level ? -1 : 1;
        }) : array
    }
    addStandardMilestonesToBulkEditList() {

    }
}
