import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ProjectHubService} from "../../../project-hub.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ProjectApiService} from "../../../common/project-api.service";
import {SpotlightIndicatorsService} from "../../../../../core/spotlight-indicators/spotlight-indicators.service";
import * as moment from "moment";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {AuthService} from "../../../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {Constants} from "../../../../../shared/constants";

@Component({
    selector: 'app-risk-issue-view-bulk-edit',
    templateUrl: './risk-issue-view-bulk-edit.component.html',
    styleUrls: ['./risk-issue-view-bulk-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RisIssueViewBulkEditComponent implements OnInit {
    @Input() viewElements: any = ["status", "dateInitiated", "type", "logDate", "ifThisHappens", "probability", "thisIsTheResult", "impact", "mitigation", "owner", "function", "dueDate", "closeDate", "includeInProjectDashboard",'isLink', 'indicator', 'includeClosedItems']
    constructor(
        public projectHubService: ProjectHubService,
        public apiService: ProjectApiService,
        public indicator: SpotlightIndicatorsService,
        public fuseAlert: FuseConfirmationService,
        public auth: AuthService,
        private router: Router
    ) {
        this.projectHubService.includeClosedItems.riskIssue.subscribe(res => {
            if (this.viewContent) {
                if (this.toggleHelper) {
                    this.changeRiskIssue(res, true)
                }
            }
        })
        this.riskIssueForm.valueChanges.subscribe(res => {
            if (this.viewContent) {
                this.submitPrep()
                this.formValue = this.sortByDate(this.formValue)
                this.dbRiskIssues = this.sortByDate(this.dbRiskIssues)
                if (JSON.stringify(this.formValue) != JSON.stringify(this.dbRiskIssues)) {
                    this.projectHubService.isFormChanged = true
                }
                else {
                    this.projectHubService.isFormChanged = false
                    console.log('CONGRATS')
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
    today = new Date();
    riskIssueData: any = []
    dbRiskIssues: any = []
    links: any = []
    linksProblemCapture: any = []
    formValue: any = []
    riTableEditStack = []
    isclosedriskissuetoggle: boolean = false;
    lookupdata: any = []
    ngOnInit(): void {
        this.getllookup()
    }
    dataloader() {
        this.viewContent = false
        if (this.projectHubService.projectid) {
            if (this.router.url.includes('option-2')) {
                this.apiService.getRiskIssuesByOption(this.projectHubService.projectid,Constants.OPTION_2_ID.toString()).then((res: any) => {
                    this.riskIssueData = res;
                    if (this.riskIssueData.length > 0) {
                        for (var i of this.riskIssueData) {
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
                        this.dbRiskIssues = this.sortByDate(this.dbRiskIssues)
                    }
                    this.links = res.links
                    this.linksProblemCapture = res.linksProblemCapture
                    this.tableData = this.riskIssueData;
                    this.tableData.length > 0 ? this.formIntializer() : ''
                    this.viewContent = true
                })
            }else{
                if (this.router.url.includes('option-3')) {
                    this.apiService.getRiskIssuesByOption(this.projectHubService.projectid,Constants.OPTION_3_ID.toString()).then((res: any) => {
                        this.riskIssueData = res;
                        if (this.riskIssueData.length > 0) {
                            for (var i of this.riskIssueData) {
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
                            this.dbRiskIssues = this.sortByDate(this.dbRiskIssues)
                        }
                        this.tableData = this.riskIssueData;
                        this.tableData.length > 0 ? this.formIntializer() : ''
                        this.viewContent = true
                    })
                }else{
                    this.apiService.getprojectviewdata(this.projectHubService.projectid).then((res: any) => {
                        this.riskIssueData = res.riskIssuesData;
                        if (res.riskIssuesData?.length > 0) {
                            for (var i of res.riskIssuesData) {
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
                            this.dbRiskIssues = this.sortByDate(this.dbRiskIssues)
                        }
                        this.links = res.links
                        this.linksProblemCapture = res.linksProblemCapture
                        this.changeRiskIssue(this.projectHubService.includeClosedItems.riskIssue.value)
                        this.tableData = this.sortByDate(this.tableData)
                        this.tableData.length > 0 ? this.formIntializer() : ''
                        this.viewContent = true
                    })
                }
            }

        }
    }
    viewElementChecker(element: string): boolean {
        return this.viewElements.some(x => x == element)
    }
    sortByDate(array: any): any {
        return array.length > 1 ? array.sort((a, b) => {
            if (a.dueDate === null) {
                return -1;
            }

            if (b.dueDate === null) {
                return 1;
            }

            if (a.dueDate === b.dueDate) {
                return 0;
            }

            return a.dueDate < b.dueDate ? -1 : 1;
        }) : array
    }

    addRI() {
        this.riskIssueForm.push(new FormGroup({
            owner: new FormControl(null),
            closeDate: new FormControl(""),
            dueDate: new FormControl(""),
            functionGroupId: new FormControl(""),
            ifHappens: new FormControl(""),
            impactId: new FormControl(""),
            includeInCharter: new FormControl(false),
            includeInReport: new FormControl(false),
            indicator: new FormControl(""),
            logDate: new FormControl(this.today),
            mitigation: new FormControl(""),
            postMitigationComments: new FormControl(""),
            postMitigationImpact: new FormControl(""),
            postMitigationProbability: new FormControl(""),
            probabilityId: new FormControl(""),
            projectId: new FormControl(this.projectHubService.projectid),
            riskIssueResult: new FormControl(""),
            riskIssueTypeId: new FormControl(""),
            riskIssueUniqueId: new FormControl(""),
        }))
        var j = [{
            closeDate: null,
            dueDate: null,
            functionGroupId: '',
            ifHappens: '',
            impactId: '',
            includeInCharter: false,
            includeInReport: false,
            indicator: '',
            logDate: this.today,
            mitigation: '',
            ownerId: '',
            ownerName: '',
            postMitigationComments: '',
            postMitigationImpact: '',
            postMitigationProbability: '',
            probabilityId: '',
            projectId: '',
            riskIssueResult: '',
            riskIssueTypeId: '',
            riskIssueUniqueId: '',
        }]
        this.disabler()
        this.tableData = [...this.tableData, ...j]
        this.riTableEditStack.push(this.tableData.length - 1)
        var div = document.getElementsByClassName('datatable-scroll')[0]
        setTimeout(() => {
            div.scroll({
                top: div.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }, 100);
    }
    toggleRiskIssue(event: any) {
        this.toggleHelper = true;
        this.projectHubService.includeClosedItems.riskIssue.next(event.checked)
    }
    changeRiskIssue(event: any, initial: boolean = false) {
        if (initial) {
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
            if (this.projectHubService.isFormChanged) {
                const riskIssueAlert = this.fuseAlert.open(comfirmConfig)
                riskIssueAlert.afterClosed().subscribe(close => {
                    if (close == 'confirmed') {
                        if (event == true) {
                            this.isclosedriskissuetoggle = true
                            this.tableData = this.riskIssueData
                        }
                        else {
                            this.isclosedriskissuetoggle = false
                            this.tableData = this.riskIssueData.filter(row => row.closeDate == null)
                        }
                        this.localIncludedItems.controls.toggle.patchValue(event)
                        this.localIncludedItems.controls.toggle.markAsPristine()
                        this.reset()
                        this.dataloader()
                    }
                    else {
                        this.localIncludedItems.controls.toggle.patchValue(!event)
                        this.localIncludedItems.controls.toggle.markAsPristine()
                        this.toggleHelper = false
                        this.projectHubService.includeClosedItems.riskIssue.next(!event)
                    }
                })
            }
            else {
                if (event == true) {
                    this.isclosedriskissuetoggle = true
                    this.tableData = this.riskIssueData
                }
                else {
                    this.isclosedriskissuetoggle = false
                    this.tableData = this.riskIssueData.filter(row => row.closeDate == null)
                }
                this.localIncludedItems.controls.toggle.patchValue(event)
                this.localIncludedItems.controls.toggle.markAsPristine()
                this.reset()
                this.dataloader()
            }
        }
        else {
            if (event == true) {
                this.isclosedriskissuetoggle = true
                this.tableData = this.riskIssueData
            }
            else {
                this.isclosedriskissuetoggle = false
                this.tableData = this.riskIssueData.filter(row => row.closeDate == null)
            }
            this.localIncludedItems.controls.toggle.patchValue(event)
            this.localIncludedItems.controls.toggle.markAsPristine()
        }
    }
    reset() {
        this.dbRiskIssues = []
        this.formValue = []
        this.riTableEditStack = []
        this.riskIssueForm.clear()
    }
    getRowClass = (row) => {
        return {
            'row-color1': row.closeDate != null,
        };
    };
    submitRI() {
        if (this.projectHubService.isFormChanged) {
            if (this.router.url.includes('option-2') || this.router.url.includes('option-3')) {
                this.submitPrepForOptions()
                this.projectHubService.isFormChanged = false
                this.apiService.bulkEditRiskIssuesForOption(this.formValue, this.projectHubService.projectid).then(res => {
                    this.projectHubService.submitbutton.next(true)
                    this.projectHubService.toggleDrawerOpen('', '', [], '')
                    this.projectHubService.isNavChanged.next(true)
                })
            }else{
                this.submitPrep()
                this.projectHubService.isFormChanged = false
                this.apiService.bulkeditRiskIssue(this.formValue, this.projectHubService.projectid).then(res => {
                        this.projectHubService.toggleDrawerOpen('', '', [], '')
                        this.projectHubService.submitbutton.next(true)
                        this.projectHubService.isNavChanged.next(true)
                        this.projectHubService.successSave.next(true)
                    }
                )
            }

        }
        else {
            this.projectHubService.toggleDrawerOpen('', '', [], '')
            this.projectHubService.successSave.next(true)
        }
    }
    formIntializer() {
        for (var x of this.tableData) {
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
        this.disabler()
    }
    disabler() {
        if (this.router.url.includes('option-3') || this.router.url.includes('option-2')){
            this.submitPrepForOptions()
        }else{
            this.submitPrep()
            var formValue = this.formValue
            if (formValue.length > 0) {
                if (formValue.filter(x => x.includeInReport == true).length < 3) {
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
                if (formValue.filter(x => x.includeInCharter == true).length < 5) {
                    for (var i of this.riskIssueForm.controls) {
                        i['controls']['includeInCharter'].enable()
                    }
                }
                else {
                    for (var i of this.riskIssueForm.controls) {
                        if (i['controls']['includeInCharter'].value != true) {
                            i['controls']['includeInCharter'].disable()
                        }
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
                ownerId: i.owner?.userAdid ? i.owner.userAdid : null,
                ownerName: i.owner?.userDisplayName ? i.owner.userDisplayName : null,
                probabilityId: i.probabilityId,
                impactId: i.impactId,
            })
        }
    }
    submitPrepForOptions() {
        this.formValue = []
        var formValue = this.riskIssueForm.getRawValue()
        if (!this.projectHubService.includeClosedItems.riskIssue.value) {
            this.formValue = this.dbRiskIssues.length > 0 ? this.dbRiskIssues.filter(x => x.closeDate != null) : []
        }
        if (this.router.url.includes('option-3')) {
            for (var i of formValue) {
                this.formValue.push({
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
                    ownerId: i.owner?.userAdid ? i.owner.userAdid : null,
                    ownerName: i.owner?.userDisplayName ? i.owner.userDisplayName : null,
                    probabilityId: i.probabilityId,
                    impactId: i.impactId,
                    businessOptionId: Constants.OPTION_3_ID.toString()
                })
            }
        }
        if (this.router.url.includes('option-2')) {
            for (var i of formValue) {
                this.formValue.push({
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
                    ownerId: i.owner?.userAdid ? i.owner.userAdid : null,
                    ownerName: i.owner?.userDisplayName ? i.owner.userDisplayName : null,
                    probabilityId: i.probabilityId,
                    impactId: i.impactId,
                    businessOptionId: Constants.OPTION_2_ID.toString()
                })
            }
        }

    }
    getlinkname(uid: string): string {
        var linkItemList = this.links.filter(x => x.linkItemId == uid)
        var returnString = ''
        if (linkItemList.some(x => x.parentProjectId == this.projectHubService.projectid)) {
            var childProject = this.linksProblemCapture.find(x => x.problemUniqueId == linkItemList.find(x => x.parentProjectId == this.projectHubService.projectid).childProjectId)
            if (childProject != null) {
                returnString = returnString + "This risk/issue is sourced (linked) from " + childProject.problemId.toString() + " - " + childProject.problemTitle
            }
        }
        if (linkItemList.some(x => x.childProjectId == this.projectHubService.projectid)) {
            var projectName = ''
            for (var linkItem of linkItemList.filter(x => x.childProjectId == this.projectHubService.projectid)) {
                var parentProject = this.linksProblemCapture.find(x => x.problemUniqueId == linkItem.parentProjectId)
                if (parentProject != null) {
                    projectName = projectName == '' ? projectName + parentProject.problemId.toString() + " - " + parentProject.problemTitle : projectName += " , " + parentProject.problemId.toString() + " - " + parentProject.problemTitle
                }
            }
            if (returnString != '') {
                returnString = returnString + '\n'
            }
            returnString = returnString + "A link to this risk/issue has been created in project(s): " + projectName
        }
        return returnString
    }
    getLinkType(projectId: string): string {
        return projectId == this.projectHubService.projectid ? 'mat_solid:link' : 'heroicons_outline:link'
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
            if (close == 'confirmed') {
                console.log(this.tableData)
                this.tableData.splice(rowIndex, 1)
                console.log(this.riskIssueForm.getRawValue())
                this.riskIssueForm.removeAt(rowIndex)
                if (this.riTableEditStack.includes(rowIndex)) {
                    this.riTableEditStack.splice(this.riTableEditStack.indexOf(rowIndex), 1)
                }
                this.riTableEditStack = this.riTableEditStack.map(function (value) {
                    return value > rowIndex ? value - 1 : value;
                })
                this.disabler()
                this.tableData = [...this.tableData]
            }
        }
        )
    }
    islink(uid: string): boolean {
        return this.links.some(x => x.linkItemId == uid)
    }
    getprobability(): any {
        return this.lookupdata.filter(x => x.lookUpParentId == '56b86714-15d8-45ef-ab5f-f50063254ceb').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }
    getLookUpName(id: string): string {
        return id && id != '' ? this.projectHubService.lookUpMaster.find(x => x.lookUpId == id).lookUpName : ''
    }

    getimpact(): any {
        return this.lookupdata.filter(x => x.lookUpParentId == '08434f33-9e4d-482c-b776-efe1c3cae12e').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }
    getFunctionOwner(): any {
        return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77").sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }
    getllookup() {
        this.auth.lookupMaster().then((resp: any) => {
            this.lookupdata = resp
            this.dataloader()
        })
    }
    getissuetype(): any {
        return this.lookupdata.filter(x => x.lookUpParentId == '6b4487a4-097d-43ee-890d-172c601cd09b').sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }
}
