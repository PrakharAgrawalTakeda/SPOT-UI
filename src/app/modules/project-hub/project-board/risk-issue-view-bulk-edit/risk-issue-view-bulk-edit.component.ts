import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {ProjectApiService} from "../../common/project-api.service";
import {SpotlightIndicatorsService} from "../../../../core/spotlight-indicators/spotlight-indicators.service";
import * as moment from "moment";

@Component({
    selector: 'app-risk-issue-view-bulk-edit',
    templateUrl: './risk-issue-view-bulk-edit.component.html',
    styleUrls: ['./risk-issue-view-bulk-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RisIssueViewBulkEditComponent implements OnInit {

    constructor(
        public projectHubService: ProjectHubService,
        public apiService: ProjectApiService,
        public indicator: SpotlightIndicatorsService,
        public fuseAlert: FuseConfirmationService
    ) {
        this.projectHubService.includeClosedItems.askNeed.subscribe(res => {
            if (this.viewContent) {
                if (this.toggleHelper) {
                    this.changeRiskIssue(res, true)
                }
            }
        })
    }
    viewContent: boolean = false
    toggleHelper: boolean = false
    riskIssueForm = new FormArray([])
    tableData: any = []
    localIncludedItems = new FormGroup({
        toggle: new FormControl(false)
    })
    riskIssueData: any = []
    dbRiskIssues: any = []
    links: any = []
    linksProblemCapture: any = []
    formValue: any = []
    riTableEditStack = []

    ngOnInit(): void {
        this.dataloader()
    }
    dataloader() {
        this.viewContent = false
        if (this.projectHubService.projectid) {
            this.apiService.getprojectviewdata(this.projectHubService.projectid).then((res: any) => {
                this.riskIssueData = res.riskIssueData
                if (res.riskIssueData.length > 0) {
                    for (var i of res.riskIssueData) {
                        this.dbRiskIssues.push({
                            askNeedUniqueId: i.askNeedUniqueId,
                            projectId: i.projectId,
                            askNeed1: i.askNeed1,
                            needFromId: i.needFromId,
                            needFromName: i.needFromName,
                            needByDate: i.needByDate ? moment(i.needByDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                            comments: i.comments,
                            logDate: i.logDate ? moment(i.logDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                            closeDate: i.closeDate ? moment(i.closeDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                            includeInReport: i.includeInReport,
                            indicator: i.indicator
                        })
                    }
                    this.dbRiskIssues = this.sortByDate(this.dbRiskIssues)
                }
                this.links = res.links
                this.linksProblemCapture = res.linksProblemCapture
                this.changeRiskIssue(this.projectHubService.includeClosedItems.riskIssue.value)
                this.tableData = this.sortByDate(this.tableData)
                console.log(this.tableData)
                this.tableData.length > 0 ? this.formIntializer() : ''
                this.viewContent = true
            })
        }
    }
    sortByDate(array: any): any {
        return array
    }

    addRI() {
        this.riskIssueForm.push(new FormGroup({

        }))
        var j = [{

        }]

    }
    toggleRiskIssue(event: any) {
        this.toggleHelper = true
        this.projectHubService.includeClosedItems.riskIssue.next(event.checked)
    }
    changeRiskIssue(event: any, initial: boolean = false) {

    }
    getRowClass = (row) => {
        return {
            'row-color1': row.closeDate != null,
        };
    };
    submitRI() {
        if (this.projectHubService.isFormChanged) {
        }
        else {
            this.projectHubService.toggleDrawerOpen('', '', [], '')
            this.projectHubService.successSave.next(true)
        }
    }
    formIntializer() {
        for (var x of this.tableData) {
            this.riskIssueForm.push(new FormGroup({

            }))
        }
        this.disabler()
    }
    disabler() {
        this.submitPrep()
        var formValue = this.formValue
        if (formValue.length > 0) {
            if (formValue.filter(x => x.includeInReport == true).length < 1) {
                for (var i of this.riskIssueForm.controls) {
                    i['controls']['includeInReport'].enable()
                }
            }
            else {
                for (var i of this.riskIssueForm.controls) {
                    if (i['controls']['includeInReport'].value != true) {
                        i['controls']['includeInReport'].disable()
                    }
                }
            }
        }
    }
    submitPrep() {
        this.formValue = []
        var formValue = this.riskIssueForm.getRawValue()
        if (!this.projectHubService.includeClosedItems.riskIssue.value) {
            this.formValue = this.dbRiskIssues.length > 0 ? this.dbRiskIssues.filter(x => x.closeDate != null) : []
        }
        for (var i of formValue) {
            this.formValue.push({

            })
        }
    }
    getlinkname(uid: string): string {
        let temp = this.links.find(x => x.linkItemId == uid)
        temp = this.linksProblemCapture.find(x => x.problemUniqueId == temp.childProjectId)
        if (temp) {
            return "This risk/Issue is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle
        }
        temp = this.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
        if (temp) {
            return "A link to this risk/Issue has been created in project(s): " + temp.problemId.toString() + " - " + temp.problemTitle
        }
    }
    riTableEditRow(rowIndex) {
        if (!this.riTableEditStack.includes(rowIndex)) {
            this.riTableEditStack.push(rowIndex)
        }
        this.disabler()
    }

    deleteRI(rowIndex: number) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want Delete this Record?",
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

            }
        )
    }
    islink(uid: string): boolean {
        return this.links.some(x => x.linkItemId == uid)
    }
}
