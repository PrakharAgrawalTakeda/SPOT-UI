import {Component, OnInit} from '@angular/core';
import {ProjectHubService} from "../../../project-hub.service";
import {ProjectApiService} from "../../../common/project-api.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-risk-issues-link',
    templateUrl: './risk-issues-link.component.html',
    styleUrls: ['./risk-issues-link.component.scss']
})
export class RiskIssuesLinkComponent implements OnInit {

    constructor(public projectHubService: ProjectHubService, public apiService: ProjectApiService, public fuseAlert: FuseConfirmationService) {
    }
    linkData: any = []
    linkDBData: any = []
    linkedRiskIssues: any = []
    viewContent: boolean = false
    toggleHelper: boolean = false
    localIncludedItems = new FormGroup({
        toggle: new FormControl(false)
    })

    ngOnInit(): void {
        this.dataloader()
    }
    dataloader() {
        this.linkData = []
        this.linkDBData = []
        this.linkedRiskIssues = []
        this.apiService.riskIssueGetLinkData(this.projectHubService.projectid).then(res => {
            console.log("Link Data:", res)
            this.linkDBData = [...this.sortByLevel(res)]
            if (!this.projectHubService.includeClosedItems.riskIssue.value) {
                this.linkData = this.sortByLevel(this.filterClosedItems(res))
            }
            else {
                this.linkData = this.sortByLevel(res)
            }
            for (var i in this.linkData) {
                this.linkedRiskIssues.push([])
            }
            console.log("Linked RiskIssues", this.linkData, this.linkDBData)
            this.localIncludedItems.controls.toggle.patchValue(this.projectHubService.includeClosedItems.riskIssue.value)
            this.projectHubService.isFormChanged = false
            this.viewContent = true
        })

    }
    toggleClosedItems($event) {
        if (this.viewContent) {
            if (this.projectHubService.isFormChanged) {
                var comfirmConfig: FuseConfirmationConfig = {
                    "title": "Are you sure?",
                    "message": "Are you sure you want to show/hide closed items, all unsaved data will be lost. ",
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
                            "show": true,
                            "label": "Cancel"
                        }
                    },
                    "dismissible": true
                }
                const riskIssueAlert = this.fuseAlert.open(comfirmConfig)
                riskIssueAlert.afterClosed().subscribe(close => {
                    if (close == 'confirmed') {
                        this.projectHubService.includeClosedItems.riskIssue.next($event.checked)
                        this.dataloader()
                    }
                    else {
                        this.toggleHelper = false
                        this.localIncludedItems.controls.toggle.patchValue(!$event.checked)
                    }
                })
            }
            else {
                this.projectHubService.includeClosedItems.riskIssue.next($event.checked)
                this.dataloader()
            }
        }
        this.localIncludedItems.controls.toggle.markAsPristine()
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
    filterClosedItems(array: any): any {
        var returnObject: any = []
        for (var item of array) {
            returnObject.push({
                projectUId: item.projectUId,
                projectId: item.projectId,
                projectName: item.projectName,
                level: item.level,
                riskIssues: item.riskIssues.length > 0 ? this.sortByNeedByDate(item.riskIssues.filter(x => x.closeDate == null)) : [],
                riskIssuesLink: item.riskIssuesLink,
                riskIssuesLinkProjectDetails: item.riskIssuesLinkProjectDetails
            })
        }
        return returnObject
    }
    sortByNeedByDate(array: any): any {
        return array.length > 1 ? array.sort((a, b) => {
            if (a.needByDate === null) {
                return -1;
            }

            if (b.needByDate === null) {
                return 1;
            }

            if (a.needByDate === b.needByDate) {
                return 0;
            }

            return a.needByDate < b.needByDate ? -1 : 1;
        }) : array
    }
    toggleRiskIssue(event: any) {
        this.linkedRiskIssues[event.tableIndex] = [...event.selected]
    }
    submitRILink() {
        this.projectHubService.isFormChanged = false
        var mainObj: any = []
        for (var index in this.linkedRiskIssues) {
            if (this.linkedRiskIssues[index].length > 0) {
                for (var item of this.linkedRiskIssues[index]) {
                    if (item != null) {
                        if (this.linkDBData[index].riskIssuesLink.some(x => x.parentProjectId == this.projectHubService.projectid && x.linkItemId == item.riskIssueUniqueId)) {
                            mainObj.push(this.linkDBData[index].riskIssuesLink.find(x => x.parentProjectId == this.projectHubService.projectid && x.linkItemId == item.riskIssueUniqueId))
                        }
                        else {

                            mainObj.push({
                                "programHubLinkUniqueId": "",
                                "parentProjectId": this.projectHubService.projectid,
                                "childProjectId": item.projectId,
                                "linkItemId": item.riskIssueUniqueId,
                                "scheduleLink": null,
                                "riskIssueLink": true,
                                "askNeedLink": null,
                                "includeInReport": false,
                                "includeInCharter": null,
                                "linkLevel": this.linkDBData[index].level + 1
                            })
                        }
                    }
                }
            }

            if (!this.projectHubService.includeClosedItems.riskIssue.value) {
                var temp = this.linkDBData[index].riskIssuesLink.filter(x => x.parentProjectId == this.projectHubService.projectid)
                if (temp.length > 0) {
                    for (var i of temp) {
                        if (this.linkDBData[index].riskIssues.find(x => x.riskIssueUniqueId == i.linkItemId)?.closeDate != null) {
                            mainObj.push(i)
                        }
                    }
                }
            }
        }
        this.apiService.bulkeditRiskIssueLinks(mainObj, this.projectHubService.projectid).then(res => {
            this.projectHubService.toggleDrawerOpen('', '', [], '')
            this.projectHubService.submitbutton.next(true)
            this.projectHubService.successSave.next(true)
        })
    }

}
