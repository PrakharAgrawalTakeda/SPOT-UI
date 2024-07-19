import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectHubService } from "../../../project-hub.service";
import { ProjectApiService } from "../../../common/project-api.service";
import { FuseConfirmationConfig, FuseConfirmationService } from "../../../../../../@fuse/services/confirmation";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-standard-milestone-sets',
    templateUrl: './standard-milestone-sets.component.html',
    styleUrls: ['./standard-milestone-sets.component.scss']
})
export class StandardMilestoneSetsComponent implements OnInit {
    @Output() standardMilestonesAdded = new EventEmitter<any[]>();
    @Input() loadContent: boolean = false;
    @Input() lookup: any
    @Input() mode: 'CAPEX' | 'Normal' = 'Normal'
    standardMilestoneData: any = []
    standardMilestoneDBData: any = []
    standarMilestoneAdded: any = []
    viewContent: boolean = false
    id: string = ""
    standardCAPEXMilestoneData: any;
    result: Object;
    standarCAPEXMilestoneAdded: any = []
    canSubmit: boolean = true
    constructor(public projectHubService: ProjectHubService, public apiService: ProjectApiService,
        public fuseAlert: FuseConfirmationService,
        private _Activatedroute: ActivatedRoute,
        private router: Router) {
    }

    ngOnChanges() {
        if (this.loadContent) {
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
        this.standardCAPEXMilestoneData = []
        this.standarCAPEXMilestoneAdded = []
        this.apiService.getStandardMilestoneSets(this.id).then(res => {
            console.log(res)
            this.standardMilestoneDBData = [...this.sortByLevel(res)]
            this.standardMilestoneData = this.sortByLevel(res)

            let milestoneArray = []
            if (this.mode == 'CAPEX') {
                this.standardCAPEXMilestoneData = this.standardMilestoneData.filter(x => x.milestoneTemplateId == "7D7E9D69-3201-4063-8713-45C7FFEB1250");
                console.log(this.standardCAPEXMilestoneData)
                for (var i in this.standardCAPEXMilestoneData) {
                    this.standarCAPEXMilestoneAdded.push([])
                }
            }
            if (this.router.url.includes('business-case')) {
                this.standardMilestoneData.forEach((set, setIndex) => {
                    milestoneArray = set.templateDetails;
                    this.standardMilestoneData[setIndex].templateDetails = milestoneArray.filter((element) => {
                        return element.milestoneType === null || element.milestoneType === 0;
                    });
                })
            }

            for (var i in this.standardMilestoneData) {
                this.standarMilestoneAdded.push([])
            }


            this.projectHubService.isFormChanged = false
            this.viewContent = true
        })

    }
    submitStandardMilestoneSets() {
        if (this.canSubmit) {

            this.canSubmit = false
            var returnedMilestones: any = []
            this.standarMilestoneAdded.forEach(x => {
                x.map(y => {
                    returnedMilestones.push(y);
                })
            })
            var startMilestonesCount = 0;
            var endMilestonesCount = 0;
            returnedMilestones.forEach(x => {
                if (x.milestoneType == 1) {
                    startMilestonesCount++
                }
                if (x.milestoneType == 2) {
                    endMilestonesCount++
                }
            })
            if (startMilestonesCount > 1) {
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
                        },
                        "cancel": {
                            "show": false,
                        }

                    },
                    "dismissible": true
                }
                this.fuseAlert.open(limitConfig)
            } else {
                if (endMilestonesCount > 1) {
                    var limitConfig: FuseConfirmationConfig = {
                        "message": "The Execution End milestone has been selected multiple times from different Milestone Sets. Please limit your selection to include it only once.",
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
                            },
                            "cancel": {
                                "show": false,
                            }
                        },
                        "dismissible": true
                    }
                    this.fuseAlert.open(limitConfig)
                }
                else if (this.mode == 'CAPEX') {
                    //         var comfirmConfig: FuseConfirmationConfig = {
                    //         "title": "Note",
                    //         "message": "The selected standard milestones have been added to your project. Please visit the Schedule page and update the milestones accordingly!",
                    //     "icon": {
                    //         "show": true,
                    //         "name": "heroicons_outline:exclamation",
                    //         "color": "primary"
                    //     },
                    //     "actions": {
                    //         "confirm": {
                    //             "show": true,
                    //             "label": "OK",
                    //             "color": "primary"
                    //         },
                    //         "cancel": {
                    //             "show": false,
                    //         }
                    //     },
                    //     "dismissible": true
                    // }
                    //         const askNeedAlert = this.fuseAlert.open(comfirmConfig)
                    //         askNeedAlert.afterClosed().subscribe(res => {
                    //             if (res == 'confirmed') {
                    this.standardMilestonesAdded.emit(returnedMilestones);
                    this.canSubmit = true
                    //             }
                    //         })
                }
                else {
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
                            this.canSubmit = true
                        }
                    })
                }
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

    cancelSMS() {
        var confirmConfig: FuseConfirmationConfig = {
            title: 'Are you sure you want to exit?',
            message: 'All unsaved data will be lost.',
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Okay',
                    color: 'warn',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: true,
        };
        const alert = this.fuseAlert.open(confirmConfig);
        alert.afterClosed().subscribe((close) => {
            if (close == 'confirmed') {
                this.projectHubService.toggleDrawerOpen('', '',[],'',true)
            }
        });
    }
}
