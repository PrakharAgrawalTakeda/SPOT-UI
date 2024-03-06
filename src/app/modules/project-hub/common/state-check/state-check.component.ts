import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProjectHubService } from "../../project-hub.service";
import { FuseConfirmationConfig, FuseConfirmationService } from "../../../../../@fuse/services/confirmation";
import { ActivatedRoute } from "@angular/router";
import { ProjectApiService } from "../project-api.service";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import * as moment from "moment";
import { AuthService } from "../../../../core/auth/auth.service";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: 'app-state-check',
    templateUrl: './state-check.component.html',
    styleUrls: ['./state-check.component.scss']
})
export class StateCheckComponent implements OnInit {
    scheduleFormValue: any = []
    constructor(
        public projectHubService: ProjectHubService,
        public fuseAlert: FuseConfirmationService,
        private _Activatedroute: ActivatedRoute,
        public apiService: ProjectApiService,
        public auth: AuthService
    ) {
        this.checkNumber.subscribe(res => {
            if (res == 3) {
                this.apiService.postPhaseState(this.projectHubService.all)
                this.projectHubService.isNavChanged.next(true)
                this.projectHubService.toggleDrawerOpen('', '', [], '')
            }
        })
    }
    checkNumber = new BehaviorSubject<number>(0)
    id: string = "";
    rows = [];
    scheduleData: any = []
    askNeedData: any = []
    riskIssuesData: any = []
    scheduleNgxData = [];
    riskIssuesNgxData = [];
    askNeedsNgxData = [];
    scheduledataDb = []
    dbRiskIssues: any = []
    dbAskNeeds: any = []
    viewContent: boolean = false
    milestoneTableEditStack: any = []
    milestoneForm = new FormArray([])
    today = new Date()
    lookUpData: any = []
    milestoneName: any;
    anTableEditStack = []
    riTableEditStack = [];
    riskIssueForm = new FormArray([])
    askNeedForm = new FormArray([])
    showMilestoneTable: boolean = false;
    showRiskIssueTable: boolean = false;
    showAskNeedsTable: boolean = false;

    getRowClass = (row) => {
        return {
            'row-color1': row.completionDate != null,
        };
    };
    ngOnChanges(changes: SimpleChanges) {

    }
    ngOnInit(): void {
        this.getllookup()
        this.apiService.getGeneralInfoData(this.id).then((res: any) => {
            if (!res.portfolioOwner) {
                var comfirmConfig: FuseConfirmationConfig = {
                    "message": "The project has no Portfolio Owner assigned. In order to change the project state to completed, please assign a portfolio owner- alternatively ask your Portfolio Manager for assistance. The project state has not been changed!",
                    "icon": {
                        "show": true,
                        "name": "heroicons_outline:exclamation",
                        "color": "warn"
                    },
                    "actions": {
                        "confirm": {
                            "show": true,
                            "label": "OK",
                            "color": "primary"
                        },
                        "cancel": {
                            "show": false,
                        }
                    },
                    "dismissible": true
                }
                const alert = this.fuseAlert.open(comfirmConfig)
                alert.afterClosed().subscribe(close => {
                    this.projectHubService.toggleDrawerOpen('', '', [], '')
                })
            }
        })
    }
    getllookup() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.auth.lookupMaster().then((resp: any) => {
            this.lookUpData = resp
            this.dataloader()
        })
    }

    dataloader() {
        this.apiService.getIncompleteItems(this.id).then((res: any) => {
            this.apiService.getprojectviewdata(this.id).then((response: any) => {

                this.askNeedData = response.askNeedData
                this.riskIssuesData = response.riskIssuesData
                this.scheduleData = response.scheduleData
                this.scheduleNgxData = res.milestones;
                this.riskIssuesNgxData = res.riskIssues;
                this.askNeedsNgxData = res.askNeeds;
                if (this.scheduleNgxData.length > 0) {
                    this.showMilestoneTable = true;
                }
                if (this.riskIssuesNgxData.length > 0) {
                    this.showRiskIssueTable = true;
                }
                if (this.askNeedsNgxData.length > 0) {
                    this.showAskNeedsTable = true;
                }
                this.scheduledataDb = this.scheduleNgxData.map(x => {
                    return {
                        "scheduleUniqueId": x.scheduleUniqueId,
                        "projectId": x.projectId,
                        "milestone": x.milestone,
                        "plannedFinish": moment(x.plannedFinish).format("YYYY-MM-DD HH:mm:ss"),
                        "baselineFinish": moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss"),
                        "responsiblePersonName": (x.responsiblePersonId == null || x.responsiblePersonId == '' ? {} : { userAdid: x.responsiblePersonId, userDisplayName: x.responsiblePersonName }),
                        "functionGroupId": x.functionGroupId,
                        "function": (this.lookUpData.find(y => y.lookUpId == x.functionGroupId)),
                        "completionDate": moment(x.completionDate).format("YYYY-MM-DD HH:mm:ss"),
                        "comments": x.comments,
                        "includeInReport": x.includeInReport,
                        "includeInCharter": x.includeInCharter,
                        "milestoneType": x.milestoneType,
                        "templateMilestoneId": x.templateMilestoneId,
                        "includeInCloseout": x.includeInCloseout,
                        "responsiblePersonId": x.responsiblePersonId,
                        "indicator": x.indicator
                    }
                })
                for (var i of this.scheduleNgxData) {
                    this.milestoneName = i.milestone
                    this.milestoneForm.push(new FormGroup({
                        scheduleUniqueId: new FormControl(i.scheduleUniqueId),
                        projectId: new FormControl(i.projectId),
                        milestone: new FormControl(i.milestoneType > 0 ? i.milestoneType == 1 ? this.milestoneName.replace('Execution Start - ', '') : i.milestoneType == 2 ? this.milestoneName.replace('Execution End - ', '') : i.milestone : i.milestone),
                        plannedFinish: new FormControl(i.plannedFinish),
                        baselineFinish: new FormControl(i.baselineFinish),
                        responsiblePersonName: new FormControl(i.responsiblePersonId == null || i.responsiblePersonId == '' ? {} : { userAdid: i.responsiblePersonId, userDisplayName: i.responsiblePersonName }),
                        functionGroupId: new FormControl(i.functionGroupId),
                        function: new FormControl(this.lookUpData.find(x => x.lookUpId == i.functionGroupId)),
                        completionDate: new FormControl(i.completionDate),
                        comments: new FormControl(i.comments),
                        includeInReport: new FormControl(i.includeInReport),
                        includeInCharter: new FormControl(i.includeInCharter),
                        milestoneType: new FormControl(i.milestoneType),
                        templateMilestoneId: new FormControl(i.templateMilestoneId),
                        includeInCloseout: new FormControl(i.includeInCloseout),
                        responsiblePersonId: new FormControl(i.responsiblePersonId),
                        indicator: new FormControl(i.indicator)
                    }))
                    if (this.milestoneForm.controls.filter(x => x.value.completionDate != null)) {
                        for (let control of this.milestoneForm.controls.filter(x => x.value.completionDate != null)) {
                            control['controls']['baselineFinish'].disable()
                        }
                    }
                }
                if (res.riskIssues?.length > 0) {
                    for (var i of res.riskIssues) {
                        this.dbRiskIssues.push({
                            closeDate: i.closeDate ? moment(i.closeDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                            dueDate: i.dueDate ? moment(i.dueDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                            functionGroupId: i.functionGroupId,
                            ifHappens: i.ifHappens,
                            impactId: i.impactId,
                            includeInCharter: i.includeInCharter,
                            includeInReport: i.includeInReport,
                            indicator: i.indicator,
                            logDate: i.logDate ? moment(i.logDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                            mitigation: i.mitigation,
                            ownerId: i.ownerId,
                            ownerName: i.ownerName,
                            postMitigationComments: i.postMitigationComments,
                            postMitigationImpact: i.postMitigationImpact,
                            postMitigationProbability: i.postMitigationProbability,
                            probabilityId: i.probabilityId,
                            projectId: i.projectId,
                            riskIssueResult: i.riskIssueResult,
                            riskIssueTypeId: i.riskIssueTypeId,
                            riskIssueUniqueId: i.riskIssueUniqueId,
                        })
                    }
                }
                this.riskIssuesNgxData.length > 0 ? this.riFormIntializer() : ''
                if (res.askNeeds.length > 0) {
                    for (var i of res.askNeeds) {
                        this.dbAskNeeds.push({
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
                    this.dbAskNeeds = this.sortByNeedByDate(this.dbAskNeeds)
                }
                this.askNeedsNgxData.length > 0 ? this.anFormIntializer() : ''
            })
        })
        this.viewContent = true
    }
    calculateVariance(row: any): string {
        var datetoday = new Date(moment(this.today).format('L'))
        var datebaseline = new Date(moment(row.baselineFinish).format('L'))
        var dateplanned = new Date(moment(row.plannedFinish).format('L'))
        var datecompletion = new Date(moment(row.completionDate).format('L'))
        if (row.completionDate == null && row.baselineFinish != null && row.plannedFinish != null) {
            if (moment(this.today) > moment(row.plannedFinish)) {
                var Time1 = datetoday.getTime() - datebaseline.getTime();
                var Days1 = Time1 / (1000 * 3600 * 24)
                var variance = Math.round(Days1)
                return variance.toString()
            }
            else if (moment(this.today) < moment(row.plannedFinish)) {
                var Time2 = dateplanned.getTime() - datebaseline.getTime();
                var Days2 = Time2 / (1000 * 3600 * 24)
                var variance = Math.round(Days2)
                return variance.toString()
            }
        }
        else if (row.completionDate != null && row.baselineFinish != null && row.plannedFinish != null) {
            var Time3 = datecompletion.getTime() - datebaseline.getTime();
            var Days3 = Time3 / (1000 * 3600 * 24)
            var variance = Math.round(Days3)
            return variance.toString()
        }
        else {
            return "N/A"
        }
    }
    milestoneTableEditRow(row: number) {
        if (!this.milestoneTableEditStack.includes(row)) {
            this.milestoneTableEditStack.push(row)
        }
    }
    getLookUpName(lookUpId: string): string {
        var lookup = this.lookUpData.find(x => x.lookUpId == lookUpId)
        return lookup ? lookup.lookUpName : ""
    }
    getFunctionOwner(): any {
        return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
    }
    riTableEditRow(rowIndex) {
        if (!this.riTableEditStack.includes(rowIndex)) {
            this.riTableEditStack.push(rowIndex)
        }
        this.riDisabler()
    }
    anTableEditRow(rowIndex) {
        if (!this.anTableEditStack.includes(rowIndex)) {
            this.anTableEditStack.push(rowIndex)
        }
        this.anDisabler()
    }
    getissuetype(): any {
        return this.lookUpData.filter(x => x.lookUpParentId == '6b4487a4-097d-43ee-890d-172c601cd09b').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }
    getimpact(): any {
        return this.lookUpData.filter(x => x.lookUpParentId == '08434f33-9e4d-482c-b776-efe1c3cae12e').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }
    getProbability(): any {
        return this.lookUpData.filter(x => x.lookUpParentId == '56b86714-15d8-45ef-ab5f-f50063254ceb').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }
    riFormIntializer() {
        for (var x of this.riskIssuesNgxData) {
            this.riskIssueForm.push(new FormGroup({
                owner: new FormControl(x.ownerId ? {
                    userAdid: x.ownerId,
                    userDisplayName: x.ownerName
                } : {}),
                closeDate: new FormControl(x.closeDate),
                dueDate: new FormControl(x.dueDate),
                functionGroupId: new FormControl(x.functionGroupId),
                ifHappens: new FormControl(x.ifHappens),
                impactId: new FormControl(x.impactId),
                includeInCharter: new FormControl(x.includeInCharter),
                includeInReport: new FormControl(x.includeInReport),
                indicator: new FormControl(x.indicator),
                logDate: new FormControl(x.logDate),
                mitigation: new FormControl(x.mitigation),
                postMitigationComments: new FormControl(x.postMitigationComments),
                postMitigationImpact: new FormControl(x.postMitigationImpact),
                postMitigationProbability: new FormControl(x.postMitigationProbability),
                probabilityId: new FormControl(x.probabilityId),
                projectId: new FormControl(x.projectId),
                riskIssueResult: new FormControl(x.riskIssueResult),
                riskIssueTypeId: new FormControl(x.riskIssueTypeId),
                riskIssueUniqueId: new FormControl(x.riskIssueUniqueId),
            }))
        }
        this.riDisabler()
    }
    anFormIntializer() {
        for (var x of this.askNeedsNgxData) {
            this.askNeedForm.push(new FormGroup({
                askNeedUniqueId: new FormControl(x.askNeedUniqueId),
                projectId: new FormControl(x.projectId),
                askNeed1: new FormControl(x.askNeed1),
                needFrom: new FormControl(x.needFromId ? {
                    userAdid: x.needFromId,
                    userDisplayName: x.needFromName
                } : {}),
                needByDate: new FormControl(x.needByDate),
                comments: new FormControl(x.comments),
                logDate: new FormControl(x.logDate),
                closeDate: new FormControl(x.closeDate),
                includeInReport: new FormControl(x.includeInReport),
                indicator: new FormControl(x.indicator)
            }))
        }
        this.anDisabler()
    }
    riDisabler() {
        this.submitPrepRiskIssues()
        var formValue = this.dbRiskIssues
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
    anDisabler() {
        this.submitPrepAskNeeds()
        var formValue = this.dbAskNeeds
        if (formValue.length > 0) {
            if (formValue.filter(x => x.includeInReport == true).length < 1) {
                for (var i of this.askNeedForm.controls) {
                    i['controls']['includeInReport'].enable()
                }
            }
            else {
                for (var i of this.askNeedForm.controls) {
                    if (i['controls']['includeInReport'].value != true) {
                        i['controls']['includeInReport'].disable()
                    }
                }
            }
        }
    }
    submitPrepRiskIssues() {
        this.dbRiskIssues = []
        var formValue = this.riskIssueForm.getRawValue()
        if (!this.projectHubService.includeClosedItems.riskIssue.value) {
            this.dbRiskIssues = this.riskIssuesData.length > 0 ? this.riskIssuesData.filter(x => x.closeDate != null) : []
        }
        for (var i of formValue) {
            this.dbRiskIssues.push({
                closeDate: i.closeDate ? moment(i.closeDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                dueDate: i.dueDate ? moment(i.dueDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                functionGroupId: i.functionGroupId,
                ifHappens: i.ifHappens,
                includeInCharter: i.includeInCharter,
                includeInReport: i.includeInReport,
                indicator: i.indicator,
                logDate: i.logDate ? moment(i.logDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                mitigation: i.mitigation,
                postMitigationComments: i.postMitigationComments,
                postMitigationImpact: i.postMitigationImpact,
                postMitigationProbability: i.postMitigationProbability,
                projectId: i.projectId,
                riskIssueResult: i.riskIssueResult,
                riskIssueTypeId: i.riskIssueTypeId,
                riskIssueUniqueId: i.riskIssueUniqueId,
                ownerId: Object.keys(i.owner).length > 0 ? i.owner.userAdid : null,
                ownerName: Object.keys(i.owner).length > 0 ? i.owner.userDisplayName : null,
                probabilityId: i.probabilityId,
                impactId: i.impactId,
            })
        }
    }
    submitPrepAskNeeds() {
        this.dbAskNeeds = []
        var formValue = this.askNeedForm.getRawValue()
        if (!this.projectHubService.includeClosedItems.askNeed.value) {
            this.dbAskNeeds = this.askNeedData.length > 0 ? this.askNeedData.filter(x => x.closeDate != null) : []
        }
        for (var i of formValue) {
            this.dbAskNeeds.push({
                askNeedUniqueId: i.askNeedUniqueId,
                projectId: i.projectId,
                askNeed1: i.askNeed1,
                needFromId: Object.keys(i.needFrom).length > 0 ? i.needFrom.userAdid : null,
                needFromName: Object.keys(i.needFrom).length > 0 ? i.needFrom.userDisplayName : null,
                needByDate: i.needByDate ? moment(i.needByDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                comments: i.comments,
                logDate: i.logDate ? moment(i.logDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                closeDate: i.closeDate ? moment(i.closeDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                includeInReport: i.includeInReport,
                indicator: i.indicator
            })
        }
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

    onSubmit() {
        var milestonePass = true;
        var riskIssuesPass = true;
        var askNeedsPass = true;
        this.milestoneForm.controls.forEach(milestone => {
            if (milestone.value.completionDate == null)
                milestonePass = false;
        });
        this.riskIssueForm.controls.forEach(riskIssue => {
            if (riskIssue.value.closeDate == null)
                riskIssuesPass = false;
        });
        this.askNeedForm.controls.forEach(askNeed => {
            if (askNeed.value.closeDate == null)
                askNeedsPass = false;
        });
        var message = "Please enter values for ";
        if (!milestonePass) {
            message = message + "Completion Date for all the rows in the Incomplete Milestone Grid"
            if (!riskIssuesPass || !askNeedsPass) {
                message = message + ", ";
            }
        }
        if (!riskIssuesPass && !askNeedsPass) {
            message = message + "Close Date for all the rows in Risk/Issue Grid and Ask/Need Grid";
        } else {
            if (!riskIssuesPass) {
                message = message + "Close Date for all the rows in Risk/Issue Grid";
            }
            if (!askNeedsPass) {
                message = message + "Close Date for all the rows in  Ask/Need Grid";
            }
        }
        var comfirmConfig: FuseConfirmationConfig = {
            "message": message,
            "icon": {
                "show": true,
                "name": "heroicons_outline:exclamation",
                "color": "primary"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "OK",
                    "color": "primary"
                },
                "cancel": {
                    "show": false,
                }
            },
            "dismissible": true
        }
        const delay = ms => new Promise(res => setTimeout(res, ms));
        if (!riskIssuesPass || !askNeedsPass || !milestonePass) {
            this.fuseAlert.open(comfirmConfig)
        } else {
            if (this.showMilestoneTable) {
                this.saveScheduleBulkEdit()
            } else {
                this.checkNumber.next(this.checkNumber.value + 1)
            }
            if (this.showRiskIssueTable) {
                this.submitRI();
            } else {
                this.checkNumber.next(this.checkNumber.value + 1)
            }
            if (this.showAskNeedsTable) {
                this.submitAN();
            } else {
                this.checkNumber.next(this.checkNumber.value + 1)
            }
        }

    }
    saveScheduleBulkEdit() {
        if (this.scheduleData.length != 0) {
            var formValue = this.milestoneForm.getRawValue()
            if (!this.projectHubService.includeClosedItems.schedule.value) {
                this.scheduleFormValue = this.scheduleData.length > 0 ? this.scheduleData.filter(x => x.completionDate != null) : []
            }
            for (var i of formValue) {
                if ((i.milestoneType > 0 && i.milestone != '') || (i.milestoneType > 0 && i.milestone != null)) {
                    this.scheduleFormValue.push({
                        scheduleUniqueId: i.scheduleUniqueId,
                        projectId: i.projectId,
                        milestone: (i.milestoneType > 0 ? (i.milestoneType == 1 ? 'Execution Start - '.concat(i.milestone) : (i.milestoneType == 2 ? 'Execution End - '.concat(i.milestone) : i.milestone)) : i.milestone),
                        plannedFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        baselineFinish: i.baselineFinish ? moment(i.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        responsiblePersonName: i.responsiblePersonName ? i.responsiblePersonName.userDisplayName : null,
                        completionDate: i.completionDate ? moment(i.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        comments: i.comments,
                        includeInReport: i.includeInReport,
                        functionGroupId: i.function == null ? null : i.function.lookUpId,
                        includeInCharter: i.includeInCharter,
                        milestoneType: i.milestoneType,
                        templateMilestoneId: i.templateMilestoneId,
                        includeInCloseout: i.includeInCloseout,
                        responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
                        indicator: i.indicator
                    })
                }
                else {
                    this.scheduleFormValue.push({
                        scheduleUniqueId: i.scheduleUniqueId,
                        projectId: i.projectId,
                        milestone: (i.milestone),
                        plannedFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        baselineFinish: i.baselineFinish ? moment(i.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        responsiblePersonName: i.responsiblePersonName ? i.responsiblePersonName.userDisplayName : null,
                        completionDate: i.completionDate ? moment(i.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        comments: i.comments,
                        includeInReport: i.includeInReport,
                        functionGroupId: i.function == null ? null : i.function.lookUpId,
                        includeInCharter: i.includeInCharter,
                        milestoneType: i.milestoneType,
                        templateMilestoneId: i.templateMilestoneId,
                        includeInCloseout: i.includeInCloseout,
                        responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
                        indicator: i.indicator
                    })
                }
            }
            this.apiService.bulkeditSchedule(this.scheduleFormValue, this.id).then(res => {
                this.checkNumber.next(this.checkNumber.value + 1)
                this.projectHubService.submitbutton.next(true)
                this.projectHubService.isNavChanged.next(true)
            })
        }
        else {
            var formValue = this.milestoneForm.getRawValue()
            if (!this.projectHubService.includeClosedItems.schedule.value) {
                this.scheduleFormValue = this.scheduleData > 0 ? this.scheduleData.filter(x => x.completionDate != null) : []
            }


            for (var i of formValue) {
                if ((i.milestoneType > 0 && i.milestone != '') || (i.milestoneType > 0 && i.milestone != null)) {
                    this.scheduleFormValue.push({
                        scheduleUniqueId: i.scheduleUniqueId,
                        projectId: i.projectId,
                        milestone: (i.milestoneType > 0 ? (i.milestoneType == 1 ? 'Execution Start - '.concat(i.milestone) : (i.milestoneType == 2 ? 'Execution End - '.concat(i.milestone) : i.milestone)) : i.milestone),
                        plannedFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        baselineFinish: i.baselineFinish ? moment(i.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        responsiblePersonName: Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userDisplayName,
                        completionDate: i.completionDate ? moment(i.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        comments: i.comments,
                        includeInReport: i.includeInReport,
                        functionGroupId: i.function == null ? null : i.function.lookUpId,
                        includeInCharter: i.includeInCharter,
                        milestoneType: i.milestoneType,
                        templateMilestoneId: i.templateMilestoneId,
                        includeInCloseout: i.includeInCloseout,
                        responsiblePersonId: Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userAdid,
                        indicator: i.indicator
                    })
                }
                else {
                    this.scheduleFormValue.push({
                        scheduleUniqueId: i.scheduleUniqueId,
                        projectId: i.projectId,
                        milestone: (i.milestone),
                        plannedFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        baselineFinish: i.baselineFinish ? moment(i.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        responsiblePersonName: Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userDisplayName,
                        completionDate: i.completionDate ? moment(i.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        comments: i.comments,
                        includeInReport: i.includeInReport,
                        functionGroupId: i.function == null ? null : i.function.lookUpId,
                        includeInCharter: i.includeInCharter,
                        milestoneType: i.milestoneType,
                        templateMilestoneId: i.templateMilestoneId,
                        includeInCloseout: i.includeInCloseout,
                        responsiblePersonId: Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userAdid,
                        indicator: i.indicator
                    })
                }
            }
            this.apiService.bulkeditSchedule(this.scheduleFormValue, this.id).then(res => {
                this.checkNumber.next(this.checkNumber.value + 1)
                this.projectHubService.submitbutton.next(true)
                this.projectHubService.isNavChanged.next(true)
            })
        }
    }
    submitRI() {
        this.submitPrepRiskIssues()
        this.apiService.bulkeditRiskIssue(this.dbRiskIssues, this.id).then(res => {
            this.checkNumber.next(this.checkNumber.value + 1)
            this.projectHubService.submitbutton.next(true)
            this.projectHubService.successSave.next(true)
            this.projectHubService.isNavChanged.next(true)
        }
        )
    }
    submitAN() {
        this.submitPrepAskNeeds()
        this.apiService.bulkeditAskNeeds(this.dbAskNeeds, this.id).then(res => {
            this.checkNumber.next(this.checkNumber.value + 1)
            this.projectHubService.submitbutton.next(true)
            this.projectHubService.successSave.next(true)
            this.projectHubService.isNavChanged.next(true)
        }
        )
    }


}
