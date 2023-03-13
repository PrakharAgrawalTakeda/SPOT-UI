import {
    Component,
    HostListener,
    OnDestroy,
    OnInit,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
    Input,
    ChangeDetectorRef,
    NgZone,
} from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';
import * as moment from 'moment';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from '../../common/project-api.service';
import { AuthService } from 'app/core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { MsalService } from '@azure/msal-angular';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {Constants} from "../../../../shared/constants";
import {GlobalBusinessCaseOptions} from "../../../../shared/global-business-case-options";

@Component({
    selector: 'app-schedule-view-bulk-edit',
    templateUrl: './schedule-view-bulk-edit.component.html',
    styleUrls: ['./schedule-view-bulk-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    // template: '<p>Viewport size: {{ width }} x {{ height }}</p>'
    // host: {
    //   '(window:resize)': 'onResize($event)'
    // }
})

export class ScheduleViewBulkEditComponent implements OnInit, OnDestroy {
    // width: number;
    // height: number;
    // private readonly viewportChange = this.viewportRuler
    //   .change(200)
    //   .subscribe(() => this.ngZone.run(() => this.setSize()));
    //@Input() scheduleData: any;
    @Input() schedulengxdata: any = [];
    @Input() baselineLogData: any;
    @Input() projectbaselinelogDetailsprev: any;
    @Input() projectbaselinelogDetailscurr: any;
    myFinalArray: any = []
    @Input() projectid: any;
    @Input() projectViewDetails: any;
    @Input() lookup: any
    @Input() editable: boolean
    @ViewChild('scheduleTable') scheduleTable: any;
    @ViewChild('target') private myScrollContainer: ElementRef;
    @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Baseline-Log' | 'Business-Case' = 'Normal'
    @Input() optionType: 'recommended-option' | 'option-2' | 'option-3' = 'recommended-option'
    editing = {};
    scheduleData: any = []
    ColumnMode = ColumnMode;
    today = new Date()
    variance: any;
    formFieldHelpers: string[] = [''];
    lookupdata: any = []
    schedule: any = {}
    item: any = {}
    functionSets: any = []
    milestoneTableEditStack: any = []
    milestoneForm = new FormArray([])
    id: string = ""
    teamMemberAdId: string = ""
    lookUpData: any = []
    filterCriteria: any = {}
    scheduleObj: any = []
    addObj: any = []
    viewContent: boolean = false
    viewBaseline: boolean = false
    viewBaselineLogs: boolean = false
    compareBaselineLogs: boolean = false
    viewStandardMilestonesSets: boolean = false
    roleMaster: any = {}
    baselineCount: any = {}
    baselinelogdetails: any = {}
    baselinelogdetailsprev: any = {}
    baselinelogdetailscurr: any = {}
    loglog: any = {}
    baselineLog: any = {}
    baselineLogObj: any = []
    scheduledataDB: any = {}
    scheduledataDb = []
    copyscheduledata = []
    milestonesSubmit = []
    flag: boolean = false
    detailsflag: boolean = false
    baselinechange: boolean = false
    plannedchange: boolean = false
    completionchange: boolean = false
    indicatorchange: boolean = false
    baselineLogForm = new FormArray([])
    baselinelogTableEditStack: any = []
    isclosed: boolean = false
    //schedulengxdata: any = []
    completed: any = []
    log: any = {}
    teamMemberRole: string = ""
    userlist: any = {}
    users: any = {}
    logflag: boolean = false
    logdetails: any = {}
    getRowClass = (row) => {
        return {
            'row-color1': row.completionDate != null && this.mode == 'Normal',
        };
    };
    milestoneName: any;
    true: any;
    value: any[];
    localIncludedItems = new FormGroup({
        toggle: new FormControl(false)
    })
    toggleHelper: boolean = false
    dbSchedule: any = []
    formValue: any = []
    scheduledatanew: any = []
    logloglog: any;
    logdetailsObj: any = []
    currObj: any = []
    prevObj: any = []
    newArray: any = []
    temp: any = []
    insertarray: any = []
    schedulecloseoutobj: any = []
    schedulecharterobj: any = []
    scheduleBusinessObj: any = []
    // onResize(event){
    //   event.window.innerWidth; // window width
    // }
    optionExecutions = new FormGroup({
        optionExecutionStart : new FormControl(""),
        optionExecutionEnd : new FormControl("")
    })
    optionInfoData: any = {}
    optionId: string = ''

    constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService,
        private portApiService: PortfolioApiService,
        private authService: AuthService, private _elementRef: ElementRef, private indicator: SpotlightIndicatorsService,
        private router: Router, private _Activatedroute: ActivatedRoute, public fuseAlert: FuseConfirmationService, private changeDetectorRef: ChangeDetectorRef,
        private msalService: MsalService, private readonly viewportRuler: ViewportRuler,
        private readonly ngZone: NgZone) {
        // this.scheduleData.scheduleData = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
        this.projecthubservice.includeClosedItems.schedule.subscribe(res => {
            if (this.viewContent == true) {
                if (this.toggleHelper == true) {
                    //this.scheduleData.scheduleData = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
                    this.changeschedule(res, true)
                }
            }
        })
        //this.setSize();
        this.milestoneForm.valueChanges.subscribe(res => {
            //debugger
            this.insertarray = []
            for (let control of this.milestoneForm.controls) {
                //debugger
                //this.scheduleData.scheduleData = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
                if (this.scheduleData.scheduleData.find(x => x.scheduleUniqueId == control['value']['scheduleUniqueId'])) {
                    // console.log( moment(this.scheduleData.scheduleData.find(x => x.scheduleUniqueId == control['value']['scheduleUniqueId']).baselineFinish.value).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'))
                    if (moment(control['controls']['baselineFinish'].value).format('YYYY-MM-DD[T]HH:mm:ss') != this.scheduleData.scheduleData.find(x => x.scheduleUniqueId == control['value']['scheduleUniqueId']).baselineFinish) {
                        this.insertArray(control['controls']['projectId'].value)
                    }
                }
            }
            if (this.viewContent == true && this.mode!="Business-Case") {
                //this.saveScheduleBulkEdit()
                if (JSON.stringify(this.scheduledataDb) != JSON.stringify(this.scheduleObj)) {
                    this.projecthubservice.isFormChanged = true
                } else {
                    this.projecthubservice.isFormChanged = false
                }
            }
        })
        //Baseline Log Form changes
        this.baselineLogForm.valueChanges.subscribe(res => {
            if (this.viewContent == false &&
                this.viewBaseline == false &&
                this.viewBaselineLogs == true) {
                if (JSON.stringify(this.baselineLogForm.getRawValue()) != JSON.stringify(this.baselineLogData)) {

                    this.projecthubservice.isFormChanged = true
                } else {
                    this.projecthubservice.isFormChanged = false
                }
            }
        })
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //   if (this.isclosed == false) {
    //     this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
    //     this.localIncludedItems.controls.toggle.patchValue(event)
    //     this.localIncludedItems.controls.toggle.markAsPristine()
    //     this.milestoneTableEditStack = []
    //     this.milestoneForm = new FormArray([])
    //     this.dataloader()
    //   }
    //   else {
    //     this.schedulengxdata = this.scheduleData.scheduleData
    //     this.localIncludedItems.controls.toggle.patchValue(event)
    //     this.localIncludedItems.controls.toggle.markAsPristine()
    //     this.milestoneTableEditStack = []
    //     this.milestoneForm = new FormArray([])
    //     this.dataloader()
    //   }
    // }
    ngOnInit(): void {
        this.dataloader()
    }
    insertArray(projectId: string): void {
        //debugger
        if (this.insertarray.length == 0) {
            this.insertarray.push(this._Activatedroute.parent.snapshot.paramMap.get("id"))
        }
        if (!this.insertarray.includes(projectId)) {
            this.insertarray.push(projectId)
        }
    }

    getFunctionOwner(): any {
        return this.projecthubservice.lookUpMaster.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
    }
    dataloader() {
        if (this.mode == 'Baseline-Log') {
            //this.BaselineLog()
            this.id = this._Activatedroute.parent.snapshot.paramMap.get("id")
            this.apiService.getProjectBaselineLogDetails(this.id).then((logDetails: any) => {
                this.apiService.getProjectBaselineLog(this.id).then((logs: any) => {
                    this.apiService.getprojectviewdata(this.id).then((res: any) => {

                        if (logDetails.length != 0) {
                            this.logdetails = logDetails
                        }
                        //debugger
                        if (logs.projectBaselineLog.length != 0 || logs.users != null) {
                            this.userlist = logs.users
                            this.getUserName(this.id)
                            this.baselinelogTableEditStack = []
                            this.baselineLogData = logs.projectBaselineLog.sort((a, b) => {
                                return a.baselineCount - b.baselineCount;
                            })
                            var count = 1
                            for (var i of this.baselineLogData) {
                                i.logId = count
                                count = count + 1
                                //Baseline Log Form changes
                                this.baselineLogForm.push(new FormGroup({
                                    baselineLogId: new FormControl(i.baselineLogId),
                                    includeInCloseout: new FormControl(i.includeInCloseout == null ? false : i.includeInCloseout),
                                    baselineComment: new FormControl(i.baselineComment == null ? '' : i.baselineComment),
                                    projectId: new FormControl(i.projectId),
                                    baselineCount: new FormControl(i.baselineCount),
                                    modifiedDate: new FormControl(i.modifiedDate),
                                    includeSlipChart: new FormControl(i.includeSlipChart),
                                    teamMemberAdId: new FormControl(i.teamMemberAdId)
                                }))
                            }
                            this.viewContent = false
                            this.viewBaseline = false
                            this.viewBaselineLogs = true
                        } else {
                            this.viewContent = false
                            this.viewBaseline = false
                            this.viewBaselineLogs = true
                        }
                        this.scheduleData = res

                        if (!this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineproject) {

                            if (this.roleMaster.securityGroupId == 'C9F323D4-EF97-4C2A-B748-11DB5B8589D0' && this.scheduleData.projectData.problemType == 'Standard Project / Program') {
                                this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit = true
                            }
                        }
                        if (this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit) {
                            if (this.scheduleData.projectData.problemType == 'Standard Project / Program' && this.projecthubservice.roleControllerControl.roleId == '9E695295-DC5F-44A8-95F1-A329CD475203') {

                                this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit = false
                            }
                            if (this.scheduleData.projectData.problemType == 'Standard Project / Program' && this.projecthubservice.roleControllerControl.roleId == 'F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F')
                            {
                                this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit = false
                            }
                        }
                        var justificationeditflag = true
                        this.apiService.getmembersbyproject(this.id).then((res: any) => {
                            if (!this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit) {


                            for(var i of res)
                            {

                                if(i.userId == this.msalService.instance.getActiveAccount().localAccountId)
                                {
                                    if(i.teamPermissionId = '3448BD5C-38F4-4B3C-BA4C-C99E659DC0B0')
                                    {
                                        justificationeditflag = false

                                    }
                                }

                            }
                        }
                        for (let control of this.baselineLogForm.controls) {
                            if (!this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit && this.projecthubservice.roleControllerControl.roleId == 'F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F'  &&  !justificationeditflag) {
                                control['controls']['baselineComment'].disable()
                            }
                            else if(!this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit && this.projecthubservice.roleControllerControl.roleId == '9E695295-DC5F-44A8-95F1-A329CD475203')
                            {
                                control['controls']['baselineComment'].disable()
                            }
                        }

                    })

                    })
                })
            })
            //             this.viewContent = false
            // this.viewBaseline = false
            // this.viewBaselineLogs = true
        } else {
            if (this.optionType == 'recommended-option') {
                this.optionId = GlobalBusinessCaseOptions.OPTION_1
            }
            else if (this.optionType == 'option-2') {
                this.optionId = GlobalBusinessCaseOptions.OPTION_2
            }
            else if (this.optionType == 'option-3') {
                this.optionId = GlobalBusinessCaseOptions.OPTION_3
            }
            this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
            this.apiService.getProjectBaselineLog(this.id).then((log: any) => {
                log.projectBaselineLog.sort((a, b) => {
                    return b.baselineCount - a.baselineCount;
                })
                this.apiService.getprojectTeams(this.id, this.msalService.instance.getActiveAccount().localAccountId).then((teamrole: any) => {
                    this.apiService.getProjectBaseline(this.id).then((count: any) => {
                        this.apiService.getprojectviewdata(this.id).then((res: any) => {
                            this.portApiService.getfilterlist().then(filterres => {
                                this.authService.lookupMaster().then((lookup: any) => {
                                    this.teamMemberRole = teamrole.roleId
                                    if (log.length != 0) {
                                        if (log.projectBaselineLog.length != 0) {
                                            this.log = log.projectBaselineLog[0]
                                        } else {
                                            this.log.projectBaselineLog = ''
                                        }
                                    } else {
                                        this.log = ''
                                    }
                                    //this.logloglog = log
                                    if (log.projectBaselineLog.length != 0 || log.users != null) {
                                        this.userlist = log.users
                                    }
                                    //debugger
                                    this.baselineCount = count
                                    this.projecthubservice.lookUpMaster = lookup
                                    this.filterCriteria = filterres
                                    this.scheduleData = res
                                    if (this.router.url.includes('option-2')) {
                                        this.apiService.getTimelineByOption(this.id, GlobalBusinessCaseOptions.OPTION_2.toString()).then((res: any) => {
                                            this.apiService.getBusinessCaseOptionInfoData(this.id, GlobalBusinessCaseOptions.OPTION_2).then((bcOptionInfo: any) => {
                                                this.schedulengxdata = res
                                                this.optionsDataLoader()
                                                this.optionExecutions.controls.optionExecutionEnd.patchValue(bcOptionInfo.executionEndDate)
                                                this.optionExecutions.controls.optionExecutionStart.patchValue(bcOptionInfo.executionStartDate)
                                                this.optionInfoData = bcOptionInfo;
                                            })
                                        })
                                    }else{
                                        if(this.router.url.includes('option-3')){
                                            this.apiService.getTimelineByOption(this.id, GlobalBusinessCaseOptions.OPTION_3).then((res: any) => {
                                                this.apiService.getBusinessCaseOptionInfoData(this.id, GlobalBusinessCaseOptions.OPTION_3.toString()).then((bcOptionInfo: any) => {
                                                    this.schedulengxdata = res
                                                    this.optionsDataLoader()
                                                    this.optionExecutions.controls.optionExecutionEnd.patchValue( bcOptionInfo.executionEndDate)
                                                    this.optionExecutions.controls.optionExecutionStart.patchValue( bcOptionInfo.executionStartDate)
                                                    this.optionInfoData= bcOptionInfo;
                                                })
                                            })
                                        }else{
                                            this.changeschedule(this.projecthubservice.includeClosedItems.schedule.value)
                                            if(this.router.url.includes('recommended-option')){
                                                this.apiService.getTimelineByOption(this.id, GlobalBusinessCaseOptions.OPTION_1).then((res: any) => {
                                                    this.apiService.getBusinessCaseOptionInfoData(this.id, GlobalBusinessCaseOptions.OPTION_1).then((bcOptionInfo: any) => {
                                                        this.schedulengxdata = res
                                                        this.optionsDataLoader()
                                                        this.optionExecutions.controls.optionExecutionEnd.patchValue( bcOptionInfo.executionEndDate)
                                                        this.optionExecutions.controls.optionExecutionStart.patchValue( bcOptionInfo.executionStartDate)
                                                        this.optionInfoData= bcOptionInfo;
                                                    })
                                                })
                                            }else{
                                                if (this.mode == 'Project-Close-Out') {
                                                    this.schedulengxdata = this.scheduleData.scheduleData
                                                    // this.schedulengxdata = this.sortbyBaselineCompletion(this.schedulengxdata)
                                                }
                                                if (this.mode == 'Project-Charter') {
                                                    this.schedulengxdata = this.scheduleData.scheduleData
                                                    //this.schedulengxdata = this.sortbyPlanned(this.schedulengxdata)
                                                }
                                                this.scheduledataDB = res.scheduleData
                                                //res.scheduleData = this.sortbyPlannedBaseline(res.scheduleData)
                                                if (res.scheduleData.length != 0) {
                                                    for (var i of res.scheduleData) {
                                                        i.includeInReport = i.projectId == this.id ? i.includeInReport : this.scheduleData.links.find(t => t.linkItemId == i.scheduleUniqueId).includeInReport
                                                        this.dbSchedule.push({
                                                            scheduleUniqueId: i.scheduleUniqueId,
                                                            projectId: i.projectId,
                                                            milestone: i.milestone,
                                                            plannedFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                                                            baselineFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                                                            responsiblePersonName: (i.responsiblePersonId == null || i.responsiblePersonId == '' ? {} : {
                                                                userAdid: i.responsiblePersonId,
                                                                userDisplayName: i.responsiblePersonName
                                                            }),
                                                            functionGroupId: i.functionGroupId,
                                                            completionDate: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                                                            comments: (i.comments),
                                                            includeInReport: (i.includeInReport),
                                                            includeInCharter: (i.includeInCharter),
                                                            includeInBusinessCase: (i.includeInBusinessCase),
                                                            milestoneType: (i.milestoneType),
                                                            templateMilestoneId: (i.templateMilestoneId),
                                                            includeInCloseout: (i.includeInCloseout),
                                                            responsiblePersonId: (i.responsiblePersonId),
                                                            indicator: (i.indicator)
                                                        })
                                                    }
                                                    this.scheduledataDb = this.schedulengxdata.map(x => {
                                                        i.includeInReport = i.projectId == this.id ? i.includeInReport : this.scheduleData.links.find(t => t.linkItemId == i.scheduleUniqueId).includeInReport
                                                        return {
                                                            "scheduleUniqueId": x.scheduleUniqueId,
                                                            "projectId": x.projectId,
                                                            "milestone": x.milestone,
                                                            "plannedFinish": moment(x.plannedFinish).format("YYYY-MM-DD HH:mm:ss"),
                                                            "baselineFinish": moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss"),
                                                            "responsiblePersonName": (x.responsiblePersonId == null || x.responsiblePersonId == '' ? {} : {
                                                                userAdid: x.responsiblePersonId,
                                                                userDisplayName: x.responsiblePersonName
                                                            }),
                                                            "functionGroupId": x.functionGroupId,
                                                            "function": (this.projecthubservice.lookUpMaster.find(y => y.lookUpId == x.functionGroupId)),
                                                            "completionDate": moment(x.completionDate).format("YYYY-MM-DD HH:mm:ss"),
                                                            "comments": x.comments,
                                                            "includeInReport": x.includeInReport,
                                                            "includeInCharter": x.includeInCharter,
                                                            "includeInBusinessCase": x.includeInBusinessCase,
                                                            "milestoneType": x.milestoneType,
                                                            "templateMilestoneId": x.templateMilestoneId,

                                                            "includeInCloseout": x.includeInCloseout,
                                                            "responsiblePersonId": x.responsiblePersonId,
                                                            "indicator": x.indicator
                                                        }
                                                    })
                                                    for (var i of this.schedulengxdata) {
                                                        this.milestoneName = i.milestone
                                                        this.milestoneForm.push(new FormGroup({
                                                            scheduleUniqueId: new FormControl(i.scheduleUniqueId),
                                                            projectId: new FormControl(i.projectId),
                                                            milestone: new FormControl(i.milestoneType > 0 ? i.milestoneType == 1 ? this.milestoneName.replace('Execution Start - ', '') : i.milestoneType == 2 ? this.milestoneName.replace('Execution End - ', '') : i.milestone : i.milestone),
                                                            plannedFinish: new FormControl(i.plannedFinish),
                                                            baselineFinish: new FormControl(i.baselineFinish),
                                                            responsiblePersonName: new FormControl(i.responsiblePersonId == null || i.responsiblePersonId == '' ? {} : {
                                                                userAdid: i.responsiblePersonId,
                                                                userDisplayName: i.responsiblePersonName
                                                            }),
                                                            functionGroupId: new FormControl(i.functionGroupId),
                                                            function: new FormControl(this.projecthubservice.lookUpMaster.find(x => x.lookUpId == i.functionGroupId)),
                                                            completionDate: new FormControl(i.completionDate),
                                                            comments: new FormControl(i.comments),
                                                            includeInReport: new FormControl(i.projectId == this.id ? i.includeInReport : this.scheduleData.links.find(t => t.linkItemId == i.scheduleUniqueId).includeInReport),
                                                            includeInCharter: new FormControl(i.includeInCharter),
                                                            includeInBusinessCase: new FormControl(i.includeInBusinessCase),
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
                                                    if (!this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineproject) {
                                                        if (this.roleMaster.securityGroupId == 'C9F323D4-EF97-4C2A-B748-11DB5B8589D0' && this.scheduleData.projectData.problemType == 'Standard Project / Program') {
                                                            this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit = true
                                                        }
                                                    }
                                                    if (this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit) {
                                                        if (this.scheduleData.projectData.problemType == 'Standard Project / Program' && this.projecthubservice.roleControllerControl.roleId == '9E695295-DC5F-44A8-95F1-A329CD475203') {
                                                            this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit = false
                                                        }
                                                    }
                                                    for (let control of this.milestoneForm.controls) {
                                                        if (!this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit) {
                                                            control['controls']['baselineFinish'].disable()
                                                        }
                                                    }
                                                }
                                                if (this.isclosed == false) {
                                                    this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
                                                    //this.schedulengxdata = this.sortbyPlannedBaseline(this.schedulengxdata)
                                                    //this.schedulengxdata = this.sortbyBaseline(this.schedulengxdata)
                                                    // this.schedulengxdata = this.sortbyCompletion(this.schedulengxdata)
                                                }
                                                this.disabler()
                                                //this.value = this.milestoneForm.getRawValue()
                                            }
                                        }
                                    }

                                    // if(this.isclosed == true)
                                    // {
                                    //   this.schedulengxdata = this.sortbyPlannedBaseline(this.schedulengxdata)
                                    // }
                                    this.viewContent = true
                                })
                            })
                        })
                    })
                })
            })
        }
    }
    toggleSchedule(event: any) {
        //this.scheduleData.scheduleData = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
        this.toggleHelper = true
        this.projecthubservice.includeClosedItems.schedule.next(event.checked)
    }
    changeschedule(event: any, initial: boolean = false) {
        //debugger
        //this.scheduleData.scheduleData = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
        for (var i of this.scheduleData.scheduleData) {
            for (let control of this.milestoneForm.controls.filter(x => x.value.scheduleUniqueId == i.scheduleUniqueId)) {
                if (i.milestoneType == 1) {
                    control['controls']['milestone'].patchValue('Execution Start - '.concat(control['controls']['milestone'].value))
                } else if (i.milestoneType == 2) {
                    control['controls']['milestone'].patchValue('Execution End - '.concat(control['controls']['milestone'].value))
                }
            }
        }
        this.value = this.milestoneForm.getRawValue()
        //this.scheduleData.scheduleData = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
        var baseline = this.scheduleData.scheduleData.filter(x => x.completionDate == null).map(x => {
            return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
        })
        var baseline2 = this.value.map(x => {
            return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
        })
        var planned = this.scheduleData.scheduleData.filter(x => x.completionDate == null).map(x => {
            return x.plannedFinish && x.plannedFinish != '' ? moment(x.plannedFinish).format("YYYY-MM-DD HH:mm:ss") : x.plannedFinish
        })
        var planned2 = this.value.map(x => {
            return x.plannedFinish && x.plannedFinish != '' ? moment(x.plannedFinish).format("YYYY-MM-DD HH:mm:ss") : x.plannedFinish
        })
        var completion = this.scheduleData.scheduleData.filter(x => x.completionDate == null).map(x => {
            return x.completionDate && x.completionDate != '' ? moment(x.completionDate).format("YYYY-MM-DD HH:mm:ss") : x.completionDate
        })
        var completion2 = this.value.map(x => {
            return x.completionDate && x.completionDate != '' ? moment(x.completionDate).format("YYYY-MM-DD HH:mm:ss") : x.completionDate
        })
        var comments = this.scheduleData.scheduleData.filter(x => x.completionDate == null).map(x => {
            return x.comments
        })
        var comments2 = this.value.map(x => {
            return x.comments
        })
        var includein = this.scheduleData.scheduleData.filter(x => x.completionDate == null).map(x => {
            return x.includeInReport
        })
        var includein2 = this.value.map(x => {
            return x.includeInReport
        })
        var functionowner = this.scheduleData.scheduleData.filter(x => x.completionDate == null).map(x => {
            return x.functionGroupId
        })
        var functionowner2 = this.value.map(x => {
            return x.functionGroupId
        })
        var milestone = this.scheduleData.scheduleData.filter(x => x.completionDate == null).map(x => {
            return x.milestone
        })
        var milestone2 = this.value.map(x => {
            return x.milestone
        })
        var responsible = this.scheduleData.scheduleData.filter(x => x.completionDate == null).map(x => {
            return x.responsiblePersonId
        })
        var responsible2 = this.value.map(x => {
            return x.responsiblePersonId
        })
        var baselineall = this.scheduleData.scheduleData.map(x => {
            return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
        })
        var baselineall2 = this.value.map(x => {
            return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
        })
        var plannedall = this.scheduleData.scheduleData.map(x => {
            return x.plannedFinish && x.plannedFinish != '' ? moment(x.plannedFinish).format("YYYY-MM-DD HH:mm:ss") : x.plannedFinish
        })
        var plannedall2 = this.value.map(x => {
            return x.plannedFinish && x.plannedFinish != '' ? moment(x.plannedFinish).format("YYYY-MM-DD HH:mm:ss") : x.plannedFinish
        })
        var completionall = this.scheduleData.scheduleData.map(x => {
            return x.completionDate && x.completionDate != '' ? moment(x.completionDate).format("YYYY-MM-DD HH:mm:ss") : x.completionDate
        })
        var completionall2 = this.value.map(x => {
            return x.completionDate && x.completionDate != '' ? moment(x.completionDate).format("YYYY-MM-DD HH:mm:ss") : x.completionDate
        })
        var commentsall = this.scheduleData.scheduleData.map(x => {
            return x.comments
        })
        var commentsall2 = this.value.map(x => {
            return x.comments
        })
        var includeinall = this.scheduleData.scheduleData.map(x => {
            return x.includeInReport
        })
        var includeinall2 = this.value.map(x => {
            return x.includeInReport
        })
        var functionownerall = this.scheduleData.scheduleData.map(x => {
            return x.functionGroupId
        })
        var functionownerall2 = this.value.map(x => {
            return x.functionGroupId
        })
        var milestoneall = this.scheduleData.scheduleData.map(x => {
            return x.milestone
        })
        var milestoneall2 = this.value.map(x => {
            return x.milestone
        })
        var responsibleall = this.scheduleData.scheduleData.map(x => {
            return x.responsiblePersonId
        })
        var responsibleall2 = this.value.map(x => {
            return x.responsiblePersonId
        })
        if (initial) {
            if (event == true) {
                if ((JSON.stringify(baseline) != JSON.stringify(baseline2) || JSON.stringify(planned) != JSON.stringify(planned2) || JSON.stringify(completion) != JSON.stringify(completion2) || JSON.stringify(comments) != JSON.stringify(comments2)
                    || JSON.stringify(includein) != JSON.stringify(includein2) || JSON.stringify(functionowner) != JSON.stringify(functionowner2) || JSON.stringify(milestone) != JSON.stringify(milestone2) || JSON.stringify(responsible) != JSON.stringify(responsible2))) {
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
                    const Alert = this.fuseAlert.open(comfirmConfig)
                    Alert.afterClosed().subscribe(close => {
                        if (close == 'confirmed') {
                            this.isclosed = true
                            this.schedulengxdata = this.scheduleData.scheduleData
                            // else {
                            //   this.isclosed = false
                            //   this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
                            // }
                            this.localIncludedItems.controls.toggle.patchValue(event)
                            this.localIncludedItems.controls.toggle.markAsPristine()
                            this.dbSchedule = []
                            this.formValue = []
                            this.milestoneTableEditStack = []
                            this.milestoneForm.clear()
                            this.dataloader()
                        } else {
                            this.localIncludedItems.controls.toggle.patchValue(!event)
                            this.localIncludedItems.controls.toggle.markAsPristine()
                            this.toggleHelper = false
                            this.projecthubservice.includeClosedItems.schedule.next(!event)
                        }
                    })
                } else {
                    this.isclosed = true
                    this.schedulengxdata = this.scheduleData.scheduleData
                    this.localIncludedItems.controls.toggle.patchValue(event)
                    this.localIncludedItems.controls.toggle.markAsPristine()
                    this.dbSchedule = []
                    this.formValue = []
                    this.milestoneTableEditStack = []
                    this.milestoneForm.clear()
                    this.dataloader()
                }
            } else if (event == false) {
                if ((JSON.stringify(baselineall) != JSON.stringify(baselineall2) || JSON.stringify(plannedall) != JSON.stringify(plannedall2) || JSON.stringify(completionall) != JSON.stringify(completionall2) || JSON.stringify(commentsall) != JSON.stringify(commentsall2)
                    || JSON.stringify(includeinall) != JSON.stringify(includeinall2) || JSON.stringify(functionownerall) != JSON.stringify(functionownerall2) || JSON.stringify(milestoneall) != JSON.stringify(milestoneall2) || JSON.stringify(responsibleall) != JSON.stringify(responsibleall2))) {
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
                    const Alert = this.fuseAlert.open(comfirmConfig)
                    Alert.afterClosed().subscribe(close => {
                        if (close == 'confirmed') {
                            this.isclosed = false
                            this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
                            //this.schedulengxdata = this.schedulengxdata
                            this.localIncludedItems.controls.toggle.patchValue(event)
                            this.localIncludedItems.controls.toggle.markAsPristine()
                            this.dbSchedule = []
                            this.formValue = []
                            this.milestoneTableEditStack = []
                            this.milestoneForm.clear()
                            this.dataloader()
                        } else {
                            this.localIncludedItems.controls.toggle.patchValue(!event)
                            this.localIncludedItems.controls.toggle.markAsPristine()
                            this.toggleHelper = false
                            this.projecthubservice.includeClosedItems.schedule.next(!event)
                        }
                    })
                } else {
                    this.isclosed = false
                    this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
                    //this.schedulengxdata = this.sortbyPlannedBaseline(this.schedulengxdata)
                    console.log(this.schedulengxdata)
                    this.localIncludedItems.controls.toggle.patchValue(event)
                    this.localIncludedItems.controls.toggle.markAsPristine()
                    this.dbSchedule = []
                    this.formValue = []
                    this.milestoneTableEditStack = []
                    this.milestoneForm.clear()
                    this.dataloader()
                }
            }
        } else {
            if (event == true) {
                this.isclosed = true
                this.schedulengxdata = this.scheduleData.scheduleData
            } else {
                this.isclosed = false
                this.schedulengxdata = this.scheduleData.scheduleData.filter(row => row.closeDate == null)
                //this.schedulengxdata = this.sortbyPlannedBaseline(this.schedulengxdata)
            }
            this.localIncludedItems.controls.toggle.patchValue(event)
            this.localIncludedItems.controls.toggle.markAsPristine()
        }
    }
    //   else if(event == false)
    //   {
    //     if ((JSON.stringify(baseline) == JSON.stringify(baseline2) || JSON.stringify(planned) == JSON.stringify(planned2) || JSON.stringify(completion) == JSON.stringify(completion2) || JSON.stringify(comments) == JSON.stringify(comments2)
    //     || JSON.stringify(includein) == JSON.stringify(includein2) || JSON.stringify(functionowner) == JSON.stringify(functionowner2) || JSON.stringify(milestone) == JSON.stringify(milestone2) || JSON.stringify(responsible) == JSON.stringify(responsible2))) {
    //           this.isclosed = false
    //           this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
    //         this.localIncludedItems.controls.toggle.patchValue(event)
    //         this.localIncludedItems.controls.toggle.markAsPristine()
    //         this.milestoneTableEditStack = []
    //         this.milestoneForm.clear()
    //         this.dataloader()
    //       }
    //   }

    //   else if ((JSON.stringify(baselineall) != JSON.stringify(baselineall2) || JSON.stringify(plannedall) != JSON.stringify(plannedall2) || JSON.stringify(completionall) != JSON.stringify(completionall2) || JSON.stringify(commentsall) != JSON.stringify(commentsall2)
    //     || JSON.stringify(includeinall) != JSON.stringify(includeinall2) || JSON.stringify(functionownerall) != JSON.stringify(functionownerall2) || JSON.stringify(milestoneall) != JSON.stringify(milestoneall2) || JSON.stringify(responsibleall) != JSON.stringify(responsibleall2))) {
    //     var comfirmConfig: FuseConfirmationConfig = {
    //       "title": "Are you sure?",
    //       "message": "Are you sure you want to show/hide closed items, all unsaved data will be lost. ",
    //       "icon": {
    //         "show": true,
    //         "name": "heroicons_outline:exclamation",
    //         "color": "warn"
    //       },
    //       "actions": {
    //         "confirm": {
    //           "show": true,
    //           "label": "OK",
    //           "color": "warn"
    //         },
    //         "cancel": {
    //           "show": true,
    //           "label": "Cancel"
    //         }
    //       },
    //       "dismissible": true
    //     }
    //     const Alert = this.fuseAlert.open(comfirmConfig)
    //     Alert.afterClosed().subscribe(close => {
    //       if (close == 'confirmed') {
    //         if (event == false) {
    //           this.isclosed = false
    //           this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
    //         }
    //         // else {
    //         //   this.isclosed = false
    //         //   this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
    //         // }
    //         this.localIncludedItems.controls.toggle.patchValue(event)
    //         this.localIncludedItems.controls.toggle.markAsPristine()
    //         this.milestoneTableEditStack = []
    //         this.milestoneForm.clear()
    //         this.dataloader()
    //       }
    //       else {
    //         this.localIncludedItems.controls.toggle.patchValue(!event)
    //         this.localIncludedItems.controls.toggle.markAsPristine()
    //         this.toggleHelper = false
    //         this.projecthubservice.includeClosedItems.askNeed.next(!event)
    //       }
    //     })
    //   }
    // }
    // else {
    //   debugger
    //   if (event == true) {
    //     this.isclosed = true
    //     this.schedulengxdata = this.scheduleData.scheduleData
    //   }
    //   else {
    //     this.isclosed = false
    //     this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
    //   }
    //   this.localIncludedItems.controls.toggle.patchValue(event)
    //   this.localIncludedItems.controls.toggle.markAsPristine()
    // this.milestoneTableEditStack = []
    // this.milestoneForm.clear()
    // this.dataloader()
    // }
    //   if (this.projecthubservice.isFormChanged) {

    //       // else {
    //       //   this.localIncludedItems.controls.toggle.patchValue(!event)
    //       //   this.localIncludedItems.controls.toggle.markAsPristine()
    //       //   this.toggleHelper = false
    //       //   this.projecthubservice.includeClosedItems.askNeed.next(!event)
    //       // }

    //   }
    //   else{
    //     if (event == true) {
    //       this.isclosed = true
    //       this.schedulengxdata = this.scheduleData.scheduleData
    //     }
    //     else {
    //       this.isclosed = false
    //       this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
    //     }
    //     this.localIncludedItems.controls.toggle.patchValue(event)
    //     this.localIncludedItems.controls.toggle.markAsPristine()
    //     this.milestoneTableEditStack = []
    //     this.milestoneForm.clear()
    //     this.dataloader()
    //   }
    // }
    // else {
    //   debugger
    //   if (event == true) {
    //     this.isclosed = true
    //     this.schedulengxdata = this.scheduleData.scheduleData
    //   }
    //   else {
    //     this.isclosed = false
    //     this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
    //   }
    //   this.localIncludedItems.controls.toggle.patchValue(event)
    //   this.localIncludedItems.controls.toggle.markAsPristine()
    //   // this.milestoneTableEditStack = []
    //   // this.milestoneForm.clear()
    //   // this.dataloader()
    // }

    // console.log(event)
    // console.log(this.value)
    // console.log(this.true)
    // console.log(this.scheduleData.scheduleData)
    //   console.log("Closed",this.isclosed)
    //   if (event == true && (JSON.stringify(baseline) != JSON.stringify(baseline2) || JSON.stringify(planned) != JSON.stringify(planned2) || JSON.stringify(completion) != JSON.stringify(completion2) || JSON.stringify(comments) != JSON.stringify(comments2)
    //   || JSON.stringify(includein) != JSON.stringify(includein2) || JSON.stringify(functionowner) != JSON.stringify(functionowner2) || JSON.stringify(milestone) != JSON.stringify(milestone2) || JSON.stringify(responsible) != JSON.stringify(responsible2))) {
    //     var comfirmConfig: FuseConfirmationConfig = {
    //       "title": "",
    //       "message": "Are you sure you want to show/hide closed items? All unsaved data will be lost.",
    //       "icon": {
    //         "show": true,
    //         "name": "heroicons_outline:exclamation",
    //         "color": "warn"
    //       },
    //       "actions": {
    //         "confirm": {
    //           "show": true,
    //           "label": "Ok",
    //           "color": "warn"
    //         },
    //         "cancel": {
    //           "show": true,
    //           "label": "Cancel"
    //         }
    //       },
    //       "dismissible": true
    //     }
    //     const Alert = this.fuseAlert.open(comfirmConfig)

    //     Alert.afterClosed().subscribe(close => {
    //       if (close == 'confirmed') {
    //         this.schedulengxdata = this.scheduleData.scheduleData
    //         this.isclosed = true
    //         this.localIncludedItems.controls.toggle.patchValue(event)
    //         this.localIncludedItems.controls.toggle.markAsPristine()
    //         this.milestoneTableEditStack = []
    //         this.milestoneForm = new FormArray([])
    //         this.dataloader()
    //       }
    //       else {
    //         this.localIncludedItems.controls.toggle.patchValue(!event)
    //         this.localIncludedItems.controls.toggle.markAsPristine()
    //         this.toggleHelper = false
    //         this.projecthubservice.includeClosedItems.askNeed.next(!event)
    //       }
    //     })


    //   }
    //   else  if (event == true && (JSON.stringify(baseline) == JSON.stringify(baseline2) || JSON.stringify(planned) == JSON.stringify(planned2) || JSON.stringify(completion) == JSON.stringify(completion2) || JSON.stringify(comments) == JSON.stringify(comments2)
    //   || JSON.stringify(includein) == JSON.stringify(includein2) || JSON.stringify(functionowner) == JSON.stringify(functionowner2) || JSON.stringify(milestone) == JSON.stringify(milestone2) || JSON.stringify(responsible) == JSON.stringify(responsible2))) {

    //         this.schedulengxdata = this.scheduleData.scheduleData
    //         this.isclosed = true
    //         this.localIncludedItems.controls.toggle.patchValue(event)
    //           this.localIncludedItems.controls.toggle.markAsPristine()
    //         this.milestoneTableEditStack = []
    //         this.milestoneForm = new FormArray([])
    //         this.dataloader()

    //   }
    //   else if (event == false && (JSON.stringify(baselineall) != JSON.stringify(baselineall2) || JSON.stringify(plannedall) != JSON.stringify(plannedall2) || JSON.stringify(completionall) != JSON.stringify(completionall2) || JSON.stringify(commentsall) != JSON.stringify(commentsall2)
    //   || JSON.stringify(includeinall) != JSON.stringify(includeinall2) || JSON.stringify(functionownerall) != JSON.stringify(functionownerall2) || JSON.stringify(milestoneall) != JSON.stringify(milestoneall2) || JSON.stringify(responsibleall) != JSON.stringify(responsibleall2))) {
    //     var comfirmConfig: FuseConfirmationConfig = {
    //       "title": "",
    //       "message": "Are you sure you want to show/hide closed items? All unsaved data will be lost.",
    //       "icon": {
    //         "show": true,
    //         "name": "heroicons_outline:exclamation",
    //         "color": "warn"
    //       },
    //       "actions": {
    //         "confirm": {
    //           "show": true,
    //           "label": "Ok",
    //           "color": "warn"
    //         },
    //         "cancel": {
    //           "show": true,
    //           "label": "Cancel"
    //         }
    //       },
    //       "dismissible": true
    //     }
    //     const Alert = this.fuseAlert.open(comfirmConfig)

    //     Alert.afterClosed().subscribe(close => {
    //       if (close == 'confirmed') {
    //     this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
    //     this.isclosed = false
    //     this.localIncludedItems.controls.toggle.patchValue(event)
    //     this.localIncludedItems.controls.toggle.markAsPristine()
    //     this.milestoneTableEditStack = []
    //     this.milestoneForm = new FormArray([])
    //     this.dataloader()
    //       }
    //       else {
    //         this.localIncludedItems.controls.toggle.patchValue(!event)
    //         this.localIncludedItems.controls.toggle.markAsPristine()
    //         this.toggleHelper = false
    //         this.projecthubservice.includeClosedItems.askNeed.next(!event)
    //       }
    //     })

    //   }
    //   else if (event == false && (JSON.stringify(baselineall) == JSON.stringify(baselineall2) || JSON.stringify(plannedall) == JSON.stringify(plannedall2) || JSON.stringify(completionall) == JSON.stringify(completionall2) || JSON.stringify(commentsall) == JSON.stringify(commentsall2)
    //   || JSON.stringify(includeinall) == JSON.stringify(includeinall2) || JSON.stringify(functionownerall) == JSON.stringify(functionownerall2) || JSON.stringify(milestoneall) == JSON.stringify(milestoneall2) || JSON.stringify(responsibleall) == JSON.stringify(responsibleall2))) {

    //     this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
    //     this.isclosed = false
    //     this.localIncludedItems.controls.toggle.patchValue(event)
    //     this.localIncludedItems.controls.toggle.markAsPristine()
    //     this.milestoneTableEditStack = []
    //     this.milestoneForm = new FormArray([])
    //     this.dataloader()
    //   }

    getLookupName(lookUpId: string): string {
        var lookup = this.projecthubservice.lookUpMaster.find(x => x.lookUpId == lookUpId)
        return lookup ? lookup.lookUpName : ""
    }

    addMilestoneRecord(el): void {
        // var div = document.getElementsByClassName('datatable-scroll')[0]
        // setTimeout(() => {
        //   div.scroll({
        //     top: div.scrollHeight,
        //     left: 0,
        //     behavior: 'smooth'
        //   });
        // }, 100);
        this.apiService.getprojectviewdata(this.id).then((res: any) => {
            this.milestoneForm.push(new FormGroup({
                scheduleUniqueId: new FormControl(''),
                projectId: new FormControl(this.id),
                milestone: new FormControl(''),
                plannedFinish: new FormControl(''),
                baselineFinish: new FormControl(''),
                responsiblePersonName: new FormControl(null),
                function: new FormControl(null),
                functionGroupId: new FormControl(null),
                completionDate: new FormControl(''),
                comments: new FormControl(''),
                includeInReport: new FormControl(false),
                includeInCharter: new FormControl(false),
                includeInBusinessCase: new FormControl(false),
                milestoneType: new FormControl(null),
                templateMilestoneId: new FormControl(''),
                includeInCloseout: new FormControl(false),
                responsiblePersonId: new FormControl(''),
                indicator: new FormControl('')
            }))
            for (let control of this.milestoneForm.controls) {
                if (!this.projecthubservice.roleControllerControl.projectHub.projectBoard.baselineedit) {
                    control['controls']['baselineFinish'].disable()
                }
            }
            // if (this.roleMaster.securityGroupId == '9E695295-DC5F-44A8-95F1-A329CD475203' && this.scheduleData.projectData.problemType == 'Standard Project / Program') {
            //   this.milestoneForm.controls['baselineFinish'].disable()
            // }
            // if (this.projecthubservice.all.filter(x => x.includeInReport == true).length >= 8) {
            //   this.milestoneForm.controls['includeInReport'].disable()
            // }

            var j = [{
                scheduleUniqueId: "new",
                baselineFinish: null,
                comments: null,
                completionDate: null,
                functionGroupId: null,
                includeInCharter: false,
                includeInBusinessCase: false,
                includeInCloseout: false,
                includeInReport: false,
                indicator: "Grey",
                milestone: '',
                milestoneType: null,
                plannedFinish: null,
                projectId: this.id,
                responsiblePersonId: null,
                responsiblePersonName: null,
                templateMilestoneId: null
            }]

            this.schedulengxdata = [...this.schedulengxdata, ...j]
            this.scheduleData.scheduleData = res.scheduleData
            this.milestoneTableEditRow(this.schedulengxdata.length - 1)
            var div = document.getElementsByClassName('datatable-scroll')[0]
            setTimeout(() => {
                div.scroll({
                    top: div.scrollHeight,
                    left: 0,
                    behavior: 'smooth'
                });
            }, 100);
        })
    }

    //let index = this.datarows.indexOf(this.selected[0])

    deleteSchedule(id: string, row: any, rowIndex: number) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Save Changes?",
            "message": "Are you sure you want to delete the milestone permanently? ",
            "icon": {
                "show": true,
                "name": "heroicons_outline:exclamation",
                "color": "warn"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "Save",
                    "color": "warn"
                },
                "cancel": {
                    "show": true,
                    "label": "Cancel"
                }
            },
            "dismissible": true
        }
        const Alert = this.fuseAlert.open(comfirmConfig)

        Alert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                this.milestoneForm.removeAt(rowIndex)
                this.schedulengxdata.splice(rowIndex, 1)
                if (this.milestoneTableEditStack.includes(rowIndex)) {
                    this.milestoneTableEditStack.splice(this.milestoneTableEditStack.indexOf(rowIndex), 1)
                }
                this.milestoneTableEditStack = this.milestoneTableEditStack.map(function (value) {
                    return value > rowIndex ? value - 1 : value;
                })
                this.schedulengxdata = [...this.schedulengxdata];
            }
        })
    }

    milestoneTableEditRow(row: number) {
        if (!this.milestoneTableEditStack.includes(row)) {
            this.milestoneTableEditStack.push(row)
        }
    }

    disabler2() {
        var baselineformValue = this.baselineLogForm.getRawValue()
        if (baselineformValue.length > 0) {



            //Include in close-out Schedule Baseline

            if (baselineformValue.filter(x => x.includeInCloseout == true).length < 10) {
                for (var i of this.baselineLogForm.controls) {
                    i['controls']['includeInCloseout'].enable()
                }
            } else {
                for (var i of this.baselineLogForm.controls) {
                    if (i['controls']['includeInCloseout'].value != true) {
                        i['controls']['includeInCloseout'].disable()
                    }
                }
            }
        }
    }

    disabler() {
        var formValue = this.milestoneForm.getRawValue()
        //var baselineformValue = this.baselineLogForm.getRawValue()
        if (formValue.length > 0) {
            //Include in business Case
            if (formValue.filter(x => x.includeInBusinessCase == true).length < 8) {
                for (var i of this.milestoneForm.controls) {
                    i['controls']['includeInBusinessCase']?.enable()
                }
            } else {
                for (var i of this.milestoneForm.controls) {
                    if (i['controls']['includeInBusinessCase'].value != true) {
                        i['controls']['includeInBusinessCase'].disable()
                    }
                }
            }
            //Include in close-out Milestone Variance


                if (formValue.filter(x => x.includeInCloseout == true).length < 20) {
                    for (var i of this.milestoneForm.controls) {
                        i['controls']['includeInCloseout'].enable()
                    }
                } else {
                    for (var i of this.milestoneForm.controls) {
                        if (i['controls']['includeInCloseout'].value != true) {
                            i['controls']['includeInCloseout'].disable()
                        }
                    }
                }

            //Include in Report
            if (formValue.filter(x => x.includeInReport == true).length < 8) {
                for (var i of this.milestoneForm.controls) {
                    i['controls']['includeInReport'].enable()
                }
            } else {
                for (var i of this.milestoneForm.controls) {
                    if (i['controls']['includeInReport'].value != true) {
                        i['controls']['includeInReport'].disable()
                    }
                }
            }
            //Include in Report
            if (formValue.filter(x => x.includeInCharter == true).length < 10) {
                for (var i of this.milestoneForm.controls) {
                    i['controls']['includeInCharter'].enable()
                }
            } else {
                for (var i of this.milestoneForm.controls) {
                    if (i['controls']['includeInCharter'].value != true) {
                        i['controls']['includeInCharter'].disable()
                    }
                }
            }
        }
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
            } else if (moment(this.today) < moment(row.plannedFinish)) {
                var Time2 = dateplanned.getTime() - datebaseline.getTime();
                var Days2 = Time2 / (1000 * 3600 * 24)
                var variance = Math.round(Days2)
                return variance.toString()
            }
        } else if (row.completionDate != null && row.baselineFinish != null && row.plannedFinish != null) {
            var Time3 = datecompletion.getTime() - datebaseline.getTime();
            var Days3 = Time3 / (1000 * 3600 * 24)
            var variance = Math.round(Days3)
            return variance.toString()
        } else {
            return "N/A"
        }
    }

    islink(uid: string): boolean {
        return this.scheduleData.links.some(x => x.linkItemId == uid)
    }

    getlinkname2(uid: string): string {
        let temp = this.scheduleData.links.find(x => x.linkItemId == uid)
        temp = this.scheduleData.linksProblemCapture.find(x => x.problemUniqueId == temp.childProjectId)
        if (temp) {
            return "This milestone is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle
        }
        temp = this.scheduleData.links.find(x => x.linkItemId == uid)
        temp = this.scheduleData.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
        if (temp) {
            return "A link to this milestone has been created in project(s): " + temp.problemId.toString() + " - " + temp.problemTitle
        }
    }

    getLinkType(projectId: string): string {
        return projectId == this.id ? 'mat_solid:link' : 'heroicons_outline:link'
    }

    getlinkname(uid: string): string {
        //debugger
        var linkItemList = this.scheduleData.links.filter(x => x.linkItemId == uid)
        var returnString = ''
        if (linkItemList.some(x => x.parentProjectId == this.id)) {
            var childProject = this.scheduleData.linksProblemCapture.find(x => x.problemUniqueId == linkItemList.find(x => x.parentProjectId == this.id).childProjectId)
            if (childProject != null) {
                returnString = returnString + "This milestone is sourced (linked) from " + childProject.problemId.toString() + " - " + childProject.problemTitle
            }
        }
        if (linkItemList.some(x => x.childProjectId == this.id)) {
            var projectName = ''
            for (var linkItem of linkItemList.filter(x => x.childProjectId == this.id)) {
                var parentProject = this.scheduleData.linksProblemCapture.find(x => x.problemUniqueId == linkItem.parentProjectId)
                if (parentProject != null) {
                    projectName = projectName == '' ? projectName + parentProject.problemId.toString() + " - " + parentProject.problemTitle : projectName += " , " + parentProject.problemId.toString() + " - " + parentProject.problemTitle
                }
            }
            if (returnString != '') {
                returnString = returnString + '\n'
            }
            returnString = returnString + "A link to this milestone has been created in project(s): " + projectName
        }
        return returnString
    }

    baselineForm = new FormGroup({
        baselineComment: new FormControl(''),
        counter: new FormControl(true)
    })

    submitjustification() {
        //debugger
        this.teamMemberAdId = this.msalService.instance.getActiveAccount().localAccountId
        //if (this.projecthubservice.itemid != "new") {
        for (var i = 0; i < this.insertarray.length; i++) {
            // debugger
            this.apiService.getProjectBaselineLog(this.insertarray[i]).then((res: any) => {
                this.baselineLog = res.projectBaselineLog.sort((a, b) => {
                    return a.baselineCount - b.baselineCount;
                })
                //})
                if (this.baselineLog.length > 0) {
                    this.baselineLogObj = this.baselineLog.sort((a, b) => {
                        return a.baselineCount - b.baselineCount;

                    })
                } else {
                    this.baselineLogObj = ''
                }
                //  debugger
                if (this.baselineLogObj == '' && this.baselineForm.value.counter == true) {
                    var justificationObjNew = {
                        baselineLogId: "new",
                        projectId: this.id,
                        baselineCount: 1,
                        teamMemberAdId: this.teamMemberAdId,
                        modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
                        baselineComment: (this.baselineForm.value.baselineComment == null || this.baselineForm.value.baselineComment == '') ? '' : this.baselineForm.value.baselineComment,
                        includeInCloseout: false,
                        includeSlipChart: false
                    }
                    var baselineObjNew = {
                        projectId: this.id,
                        baselineCount: 1,
                        teamMemberAdId: this.teamMemberAdId,
                        modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
                    }
                    this.apiService.editProjectBaseline(baselineObjNew).then((count: any) => {
                        this.apiService.addProjectBaselineLog(justificationObjNew).then(res => {
                            //this.viewContent = true
                            //this.viewBaseline = false
                            // this.projecthubservice.toggleDrawerOpen('', '', [], '')
                            this.projecthubservice.submitbutton.next(true)
                            this.projecthubservice.isNavChanged.next(true)
                            //this.saveScheduleBulkEdit()
                        })
                    })
                } else if (this.baselineLogObj == '' && this.baselineForm.value.counter == false) {
                    var justificationObjNewnocounter = {
                        baselineLogId: "new",
                        projectId: this.id,
                        baselineCount: 1,
                        teamMemberAdId: this.teamMemberAdId,
                        modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
                        baselineComment: (this.baselineForm.value.baselineComment == null || this.baselineForm.value.baselineComment == '') ? '' : this.baselineForm.value.baselineComment,
                        includeInCloseout: false,
                        includeSlipChart: false
                    }
                    this.apiService.addProjectBaselineLog(justificationObjNewnocounter).then(res => {
                        //this.viewContent = true
                        //this.viewBaseline = false
                        // this.projecthubservice.toggleDrawerOpen('', '', [], '')
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.isNavChanged.next(true)
                        // this.saveScheduleBulkEdit()
                    })
                } else if (this.baselineLogObj != '') {
                    if (this.baselineForm.value.counter == false) {
                        for (var i of this.baselineLogObj) {
                            var justjustificationObj = {
                                baselineLogId: "new",
                                projectId: i.projectId,
                                baselineCount: i.baselineCount,
                                teamMemberAdId: this.teamMemberAdId,
                                modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
                                baselineComment: (this.baselineForm.value.baselineComment == null || this.baselineForm.value.baselineComment == '') ? '' : this.baselineForm.value.baselineComment,
                                includeInCloseout: i.includeInCloseout,
                                includeSlipChart: i.includeSlipChart
                            }
                        }
                        this.apiService.addProjectBaselineLog(justjustificationObj).then(res => {
                            //this.viewContent = true
                            // this.viewBaseline = false
                            // this.projecthubservice.toggleDrawerOpen('', '', [], '')
                            this.projecthubservice.submitbutton.next(true)
                            this.projecthubservice.isNavChanged.next(true)
                            //this.saveScheduleBulkEdit()
                        })
                    } else if (this.baselineCount == null && this.baselineForm.value.counter == true || this.baselineCount == '' && this.baselineForm.value.counter == true) {
                        for (var i of this.baselineLogObj) {
                            var newbaselineObj = {
                                projectId: i.projectId,
                                baselineCount: 1,
                                teamMemberAdId: this.teamMemberAdId,
                                modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
                            }
                            var newjustificationObj = {
                                baselineLogId: "new",
                                projectId: i.projectId,
                                baselineCount: 1,
                                teamMemberAdId: this.teamMemberAdId,
                                modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
                                baselineComment: (this.baselineForm.value.baselineComment == null || this.baselineForm.value.baselineComment == '') ? '' : this.baselineForm.value.baselineComment,
                                includeInCloseout: i.includeInCloseout,
                                includeSlipChart: i.includeSlipChart
                            }
                        }
                        this.apiService.editProjectBaseline(newbaselineObj).then((count: any) => {
                            //this.viewContent = true
                            this.apiService.addProjectBaselineLog(newjustificationObj).then(res => {
                                //this.viewContent = true
                                //this.viewBaseline = false
                                // this.projecthubservice.toggleDrawerOpen('', '', [], '')
                                this.projecthubservice.submitbutton.next(true)
                                this.projecthubservice.isNavChanged.next(true)
                                //this.saveScheduleBulkEdit()
                            })
                        })
                    } else if (this.baselineForm.value.counter == true) {
                        for (var i of this.baselineLogObj) {
                            var justificationObj = {
                                baselineLogId: "new",
                                projectId: i.projectId,
                                baselineCount: i.baselineCount + 1,
                                teamMemberAdId: this.teamMemberAdId,
                                modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
                                baselineComment: (this.baselineForm.value.baselineComment == null || this.baselineForm.value.baselineComment == '') ? '' : this.baselineForm.value.baselineComment,
                                includeInCloseout: i.includeInCloseout,
                                includeSlipChart: i.includeSlipChart
                            }
                            var baselineObj = {
                                projectId: i.projectId,
                                baselineCount: this.baselineCount.baselineCount + 1,
                                teamMemberAdId: i.teamMemberAdId,
                                modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
                            }
                        }
                        this.apiService.editProjectBaseline(baselineObj).then((count: any) => {
                            //this.viewContent = true
                            this.apiService.addProjectBaselineLog(justificationObj).then(res => {
                                //this.viewContent = true
                                //this.viewBaseline = false
                                // this.projecthubservice.toggleDrawerOpen('', '', [], '')
                                this.projecthubservice.submitbutton.next(true)
                                this.projecthubservice.isNavChanged.next(true)
                                //this.saveScheduleBulkEdit()
                            })
                        })
                    }
                }
            })
        }
        this.projecthubservice.toggleDrawerOpen('', '', [], '')
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.isNavChanged.next(true)
    }
    cancelJustification() {
        this.viewBaseline = false
        this.projecthubservice.isBulkEdit = true
        //this.scheduleData.scheduleData = [...this.scheduleData.scheduleData]
    }
    sortByScheduleUniqeIDs(array: any): any {
        return array.length > 1 ? array.sort((a, b) => {
            if (a.scheduleUniqueId === null) {
                return -1;
            }
            if (b.scheduleUniqueId === null) {
                return 1;
            }
            if (a.scheduleUniqueId === b.scheduleUniqueId) {
                return 0;
            }
            return a.scheduleUniqueId < b.scheduleUniqueId ? -1 : 1;
        }) : array
    }

    sortbyPlannedBaseline(array: any): any {
        return array.length > 1 ? array.sort((a, b) => {
            if (a.plannedFinish === null) {
                return -1;
            }
            if (b.plannedFinish === null) {
                return 1;
            }
            if (a.plannedFinish === b.plannedFinish) {
                return a.baselineFinish < b.baselineFinish ? -1 : (a.baselineFinish > b.baselineFinish) ? 1 : 0;
            } else {
                return a.plannedFinish < b.plannedFinish ? -1 : 1;
            }
        }) : array
    }

    sortbyBaselineCompletion(array: any): any {
        return array.length > 1 ? array.sort((a, b) => {
            if (a.baselineFinish === null) {
                return -1;
            }
            if (b.baselineFinish === null) {
                return 1;
            }
            if (a.baselineFinish === b.baselineFinish) {
                return a.completionDate < b.completionDate ? -1 : (a.completionDate > b.completionDate) ? 1 : 0;
            } else {
                return a.baselineFinish < b.baselineFinish ? -1 : 1;
            }
        }) : array
    }

    sortbyPlanned(array: any): any {
        return array.length > 1 ? array.sort((a, b) => {
            if (a.plannedFinish === null) {
                return -1;
            }
            if (b.plannedFinish === null) {
                return 1;
            }
            if (a.plannedFinish === b.plannedFinish) {
                return 0;
            }
            return a.plannedFinish < a.plannedFinish ? -1 : 1;
        }) : array
    }

    // sortbyCompletion(array: any): any {
    //   return array.length > 1 ? array.sort((a, b) => {
    //     if (a.completionDate === null) {
    //       return -1;
    //     }
    //     if (b.completionDate === null) {
    //       return 1;
    //     }
    //     if (a.completionDate === b.completionDate) {
    //       return 0;
    //     }
    //     return a.completionDate < b.completionDate ? -1 : 1;
    //   }) : array
    // }


    saveScheduleBulkEdit() {
        //debugger
        this.apiService.getprojectviewdata(this.id).then((res: any) => {
            this.formValue = []
            this.scheduledatanew = []
            if (this.scheduleData.scheduleData.length != 0) {
                // if (JSON.stringify(this.dbSchedule) != JSON.stringify(formValue)) {
                this.projecthubservice.isFormChanged = false
                var formValue = this.milestoneForm.getRawValue()
                //this.scheduleObj = formValue
                if (!this.projecthubservice.includeClosedItems.schedule.value) {
                    var closeditems = this.scheduleData.scheduleData.length > 0 ? this.scheduleData.scheduleData.filter(x => x.completionDate != null) : []
                    for (var i of closeditems) {
                        this.formValue.push({
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
                            includeInBusinessCase: i.includeInBusinessCase,
                            milestoneType: i.milestoneType,
                            templateMilestoneId: i.templateMilestoneId,
                            includeInCloseout: i.includeInCloseout,
                            responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
                            indicator: i.indicator
                        })
                    }
                }
                for (var i of formValue) {
                    var milestoneName = i.milestone
                    if (i.milestoneType == 1) {
                        if (!i.milestone.includes('Execution Start')) {
                            milestoneName = 'Execution Start - '.concat(i.milestone)
                        }
                    }
                    if (i.milestoneType == 2) {
                        if (!i.milestone.includes('Execution End ')) {
                            milestoneName = 'Execution End - '.concat(i.milestone)
                        }
                    }
                    if ((i.milestoneType > 0 && i.milestone != '') || (i.milestoneType > 0 && i.milestone != null)) {
                        this.formValue.push({
                            scheduleUniqueId: i.scheduleUniqueId,
                            projectId: i.projectId,
                            milestone: milestoneName,
                            plannedFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                            baselineFinish: i.baselineFinish ? moment(i.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                            responsiblePersonName: i.responsiblePersonName ? i.responsiblePersonName.userDisplayName : null,
                            completionDate: i.completionDate ? moment(i.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                            comments: i.comments,
                            includeInReport: i.includeInReport,
                            functionGroupId: i.function == null ? null : i.function.lookUpId,
                            includeInCharter: i.includeInCharter,
                            includeInBusinessCase: i.includeInBusinessCase,
                            milestoneType: i.milestoneType,
                            templateMilestoneId: i.templateMilestoneId,
                            includeInCloseout: i.includeInCloseout,
                            responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
                            indicator: i.indicator
                        })
                    } else {
                        this.formValue.push({
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
                            includeInBusinessCase: i.includeInBusinessCase,
                            milestoneType: i.milestoneType,
                            templateMilestoneId: i.templateMilestoneId,
                            includeInCloseout: i.includeInCloseout,
                            responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
                            indicator: i.indicator
                        })
                    }
                }
                this.scheduleData.scheduleData = res.scheduleData
                // var sortedbaselines = this.sortByScheduleUniqeIDs(this.scheduleData.scheduleData)
                // var sortedbaselines2 = this.sortByScheduleUniqeIDs(this.formValue)
                // var baselines = sortedbaselines.map(x => {
                //     return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : x.baselineFinish
                // })
                // var baselines2 = sortedbaselines2.map(x => {
                //     return x.baselineFinish && x.baselineFinish != '' ? (x.baselineFinish) : x.baselineFinish
                // })
                // //debugger
                // if (baselines.length == baselines2.length && JSON.stringify(baselines) != JSON.stringify(baselines2)) {
                    this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
                        //  this.viewBaseline = true
                        //  this.viewBaselineLogs = true
                        //  this.compareBaselineLogs = false
                        //  this.projecthubservice.isBulkEdit = false
                        this.submitjustification()
                        //this.projecthubservice.submitbutton.next(true)
                    })
                // } else if (this.formValue.length < this.scheduleData.scheduleData.length) {
                //     this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
                //         this.projecthubservice.toggleDrawerOpen('', '', [], '')
                //         this.projecthubservice.submitbutton.next(true)
                //         this.projecthubservice.isNavChanged.next(true)
                //     })
                // } else {
                //     this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
                //         this.projecthubservice.toggleDrawerOpen('', '', [], '')
                //         this.projecthubservice.submitbutton.next(true)
                //         this.projecthubservice.isNavChanged.next(true)
                //     })
                // }
            }
            // }
            else {
                this.projecthubservice.isFormChanged = false
                var formValue = this.milestoneForm.getRawValue()
                //this.scheduleObj = formValue
                if (!this.projecthubservice.includeClosedItems.schedule.value) {
                    var closeditems = this.scheduleData.scheduleData.length > 0 ? this.scheduleData.scheduleData.filter(x => x.completionDate != null) : []
                    for (var i of closeditems) {
                        this.formValue.push({
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
                            includeInBusinessCase: i.includeInBusinessCase,
                            milestoneType: i.milestoneType,
                            templateMilestoneId: i.templateMilestoneId,
                            includeInCloseout: i.includeInCloseout,
                            responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
                            indicator: i.indicator
                        })
                    }
                }
                for (var i of formValue) {
                    if ((i.milestoneType > 0 && i.milestone != '') || (i.milestoneType > 0 && i.milestone != null)) {
                        this.formValue.push({
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
                            includeInBusinessCase: i.includeInBusinessCase,
                            milestoneType: i.milestoneType,
                            templateMilestoneId: i.templateMilestoneId,
                            includeInCloseout: i.includeInCloseout,
                            responsiblePersonId: Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userAdid,
                            indicator: i.indicator
                        })
                    } else {
                        this.formValue.push({
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
                            includeInBusinessCase: i.includeInBusinessCase,
                            milestoneType: i.milestoneType,
                            templateMilestoneId: i.templateMilestoneId,
                            includeInCloseout: i.includeInCloseout,
                            responsiblePersonId: Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userAdid,
                            indicator: i.indicator
                        })
                    }
                }
                this.scheduleData.scheduleData = res.scheduleData
                // var sortedbaselinedates = this.sortByScheduleUniqeIDs(this.scheduleData.scheduleData)
                // var sortedbaselinedates2 = this.sortByScheduleUniqeIDs(this.formValue)
                // var baselinedates = sortedbaselinedates.map(x => {
                //     return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : x.baselineFinish
                // })
                // var baselinedates2 = sortedbaselinedates2.map(x => {
                //     return x.baselineFinish && x.baselineFinish != '' ? (x.baselineFinish) : x.baselineFinish
                // })
                // if (baselinedates.length == baselinedates2.length && JSON.stringify(baselinedates) != JSON.stringify(baselinedates2)) {
                    this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
                        // this.viewBaseline = true
                        // this.viewBaselineLogs = true
                        // this.compareBaselineLogs = false
                        // this.projecthubservice.isBulkEdit = false
                        this.projecthubservice.isNavChanged.next(true)
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.successSave.next(true)
                        this.submitjustification()
                        //this.projecthubservice.submitbutton.next(true)
                    })
                // } else if (this.formValue.length < this.scheduleData.scheduleData.length) {
                //     this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
                //         this.projecthubservice.toggleDrawerOpen('', '', [], '')
                //         this.projecthubservice.submitbutton.next(true)
                //         this.projecthubservice.isNavChanged.next(true)
                //     })
                // } else {
                //     this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
                //         this.projecthubservice.toggleDrawerOpen('', '', [], '')
                //         this.projecthubservice.submitbutton.next(true)
                //         this.projecthubservice.isNavChanged.next(true)
                //     })
                // }
                // //   this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
                // //     var baselinedates = this.schedulengxdata.map(x => {
                // //       return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
                // //     })
                // //     var baselinedates2 = this.formValue.map(x => {
                // //       return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
                // //     })
                // //     if (JSON.stringify(baselinedates) != JSON.stringify(baselinedates2))
                // //     {
                // //       this.submitjustification()
                // //     }
                // //     this.projecthubservice.submitbutton.next(true)
                // //   })
            }
        })
    }

    getUserName(adid: string): string {
        if (this.userlist.length > 0) {
            var baselinesetby = this.userlist.find(x => x.userAdid == adid)
            return baselinesetby ? baselinesetby.userDisplayName : ""
        } else {
            return ""
        }
    }

    baselinelogTableEditRow(row: number) {
        if (!this.baselinelogTableEditStack.includes(row)) {
            this.baselinelogTableEditStack.push(row)
        }
    }

    cancelBaselineLogs() {
        //Baseline Log Form Changes
        // console.log("655", this.baselinelogTableEditStack)
        // this.logflag = false
        // for (let control of this.baselineLogForm.controls) {
        //   for (let i of this.baselineLogData.filter(x => x.baselineLogId == control['controls']['baselineLogId'].value)) {
        //     console.log("form", JSON.stringify(control['controls']['includeSlipChart'].value))
        //     console.log("db", JSON.stringify(i.includeSlipChart))
        //     console.log("flag", this.logflag)
        //     if (!this.logflag && (JSON.stringify(control['controls']['includeSlipChart'].value) != JSON.stringify(i.includeSlipChart))) {
        //       this.logflag = true
        //     }
        //     else if (this.logflag && (JSON.stringify(control['controls']['includeSlipChart'].value) == JSON.stringify(i.includeSlipChart))) {
        //     }
        //     else {
        //       this.logflag = false
        //     }
        //   }
        // }


        // if (this.logflag) {

        //   var comfirmConfig: FuseConfirmationConfig = {
        //     "title": "Are you sure you want to exit? ",
        //     "message": "All unsaved data will be lost.",
        //     "icon": {
        //       "show": true,
        //       "name": "heroicons_outline:exclamation",
        //       "color": "warn"
        //     },
        //     "actions": {
        //       "confirm": {
        //         "show": true,
        //         "label": "Ok",
        //         "color": "warn"
        //       },
        //       "cancel": {
        //         "show": true,
        //         "label": "Cancel"
        //       }
        //     },
        //     "dismissible": true
        //   }
        //   const scheduleAlert = this.fuseAlert.open(comfirmConfig)

        //   scheduleAlert.afterClosed().subscribe(close => {
        //     if (close == 'confirmed') {
        //       //this.baselinelogTableEditStack = []
        //       this.viewContent = true
        //       this.viewBaseline = false
        //     }
        //   })
        // }
        // else {
        //   //this.baselinelogTableEditStack = []
        this.viewContent = true
        this.viewBaseline = false
        // }
    }

    cancelBaselineLogDetails() {
        //this.viewContent = true
        this.compareBaselineLogs = false
        this.viewBaselineLogs = true
    }

    openStandardMilestonesSets(): void {
        this.viewStandardMilestonesSets = true;
    }

    BaselineLog() {
        //console.log("BASELINE LOG CALLED")
    }

    submitLog() {
        this.projecthubservice.isFormChanged = false
        var logformValue = this.baselineLogForm.getRawValue()
        if (logformValue.filter(x => x.includeInCloseout == true).length <= 10) {
            for (var i of logformValue) {
                this.baselineLogObj.push({
                    baselineLogId: i.baselineLogId,
                    includeInCloseout: i.includeInCloseout,
                    baselineComment: i.baselineComment,
                    projectId: i.projectId,
                    baselineCount: i.baselineCount,
                    modifiedDate: i.modifiedDate,
                    includeSlipChart: i.includeSlipChart,
                    teamMemberAdId: i.teamMemberAdId
                })
            }
            console.log(this.baselineLogObj)
            this.apiService.patchBaselineLogs(this.baselineLogObj).then(res => {
                //this.projecthubservice.isBulkEdit = true
                // this.viewContent = false
                // this.viewBaseline = false
                // this.viewBaselineLogs = false
                this.projecthubservice.isNavChanged.next(true)
                this.projecthubservice.submitbutton.next(true)
                this.projecthubservice.successSave.next(true)
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
                //this.projecthubservice.successSave.next(true)
                //this.projecthubservice.toggleDrawerOpen('', '', [], '')
                //this.projecthubservice.submitbutton.next(true)
            })
        } else {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "Only 10 baseline logs can be included in Close Out report",
                "message": "",
                "icon": {
                    "show": true,
                    "name": "heroicons_outline:exclamation",
                    "color": "warning"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "OK",
                        "color": "primary"
                    },
                    "cancel": {
                        "show": false,
                        "label": "Cancel"
                    }
                },
                "dismissible": true
            }
            const alert = this.fuseAlert.open(comfirmConfig)
            this.projecthubservice.isBulkEdit = true
        }
    }

    baselineLogs() {
        // this.baselineLogForm = new FormArray([])
        this.apiService.getProjectBaselineLogDetails(this.id).then((logDetails: any) => {
            this.apiService.getProjectBaselineLog(this.id).then((logs: any) => {
                if (logDetails.length != 0) {
                    this.logdetails = logDetails
                }
                //debugger
                if (logs.projectBaselineLog.length != 0 || logs.users != null) {
                    this.userlist = logs.users
                    this.getUserName(this.id)
                    this.baselinelogTableEditStack = []
                    this.baselineLogData = logs.projectBaselineLog.sort((a, b) => {
                        return a.baselineCount - b.baselineCount;
                    })
                    var count = 1
                    for (var i of this.baselineLogData) {
                        i.logId = count
                        count = count + 1
                        //Baseline Log Form changes
                        // this.baselineLogForm.push(new FormGroup({
                        //   baselineLogId: new FormControl(i.baselineLogId),
                        //   includeSlipChart: new FormControl(i.includeSlipChart == null ? false : i.includeSlipChart)
                        // }))
                    }
                    this.viewContent = false
                    this.viewBaseline = false
                    this.viewBaselineLogs = true
                } else {
                    this.viewContent = false
                    this.viewBaseline = false
                    this.viewBaselineLogs = true
                }
            })
        })
    }

    checklogDetails(baselinelogid: string): boolean {
        return this.logdetails && this.logdetails != '' && this.logdetails.length > 0 ? this.logdetails.some(x => x.baselineLogId == baselinelogid) : false
    }

    //Baseline Log Form Changes

    // submitslipchart() {
    //   console.log("780", this.baselinelogTableEditStack)
    //   this.projecthubservice.isFormChanged = false
    //   var logformValue = this.baselineLogForm.getRawValue()
    //   console.log(logformValue)
    //   for (var i of logformValue) {
    //     console.log(i)
    //     console.log(i.includeSlipChart)
    //     console.log(i.baselineLogId)
    //     this.baselineLogObj.push({
    //       baselineLogId: i.baselineLogId,
    //       includedInSlipChart: i.includeSlipChart
    //     })
    //   }
    //   console.log(this.baselineLogObj)
    //   this.apiService.patchBaselineLogs(this.baselineLogObj).then(res => {
    //     this.projecthubservice.isBulkEdit = true
    //     this.viewContent = true
    //     this.viewBaseline = false
    //     this.viewBaselineLogs = false

    //     this.projecthubservice.successSave.next(true)
    //     //this.projecthubservice.toggleDrawerOpen('', '', [], '')
    //     this.projecthubservice.submitbutton.next(true)

    //   })
    //   //this.baselinelogTableEditStack = []

    // }

    baselineProject() {
        this.apiService.getprojectviewdata(this.id).then((res: any) => {
            // for(var x of this.schedulengxdata)
            // {
            //   this.temp.push(x)
            // }
            for (var j of this.schedulengxdata) {
                if (!this.flag && (j.completionDate == null && j.plannedFinish != null && j.baselineFinish != j.plannedFinish) || !this.flag && (j.completionDate == '' && j.plannedFinish != null && j.baselineFinish != j.plannedFinish)) {
                    j.baselineFinish = j.plannedFinish
                    this.scheduleData.scheduleData = res.scheduleData
                    //j.baselineFinish.dirty()
                    this.flag = true
                } else if (this.flag && (j.completionDate == null && j.plannedFinish != null && j.baselineFinish != j.plannedFinish) || this.flag && (j.completionDate == '' && j.plannedFinish != null && j.baselineFinish != j.plannedFinish)) {
                    j.baselineFinish = j.plannedFinish
                    this.scheduleData.scheduleData = res.scheduleData
                    //j.baselineFinish.dirty()
                } else {
                    this.flag = false
                }
            }
            for (var i of this.milestoneForm.controls) {
                if (!this.flag && (i['controls']['completionDate'].value == null && i['controls']['plannedFinish'].value != null && i['controls']['baselineFinish'].value != i['controls']['plannedFinish'].value) ||
                    !this.flag && (i['controls']['completionDate'].value == '' && i['controls']['plannedFinish'].value != null && i['controls']['baselineFinish'].value != i['controls']['plannedFinish'].value)) {
                    i['controls']['baselineFinish'].patchValue(i['controls']['plannedFinish'].value)
                    //i['controls']['baselineFinish'].dirty()
                    this.flag = true
                } else if (this.flag && (i['controls']['completionDate'].value == null && i['controls']['plannedFinish'].value != null && i['controls']['baselineFinish'].value != i['controls']['plannedFinish'].value) ||
                    this.flag && (i['controls']['completionDate'].value == '' && i['controls']['plannedFinish'].value != null && i['controls']['baselineFinish'].value != i['controls']['plannedFinish'].value)) {
                    i['controls']['baselineFinish'].patchValue(i['controls']['plannedFinish'].value)
                    //i['controls']['baselineFinish'].dirty()
                } else {
                    this.flag = false
                }
            }
            this.schedulengxdata = [...this.schedulengxdata]
            //}
        })
    }

    baselineLogDetails(baselinelogid: string) {
        this.logdetailsObj = []
        this.prevObj = []
        this.currObj = []
        this.newArray = []
        var count = 1
        for (var i of this.logdetails) {
            i.logId = count
            count = count + 1
        }
        this.baselinelogdetails = this.baselineLogData.find(x => x.baselineLogId == baselinelogid)
        this.baselinelogdetailsprev = this.baselineLogData.find(x => x.logId == this.baselinelogdetails.logId - 1)
        this.baselinelogdetailscurr = this.baselineLogData.find(x => x.logId == this.baselinelogdetails.logId)
        this.projectbaselinelogDetailsprev = this.sortByScheduleUniqeIDs(this.logdetails.filter(x => x.baselineLogId == this.baselinelogdetailsprev.baselineLogId))
        this.projectbaselinelogDetailscurr = this.sortByScheduleUniqeIDs(this.logdetails.filter(x => x.baselineLogId == this.baselinelogdetailscurr.baselineLogId))
        for (var m = 0; m < this.projectbaselinelogDetailscurr.length; m++) {
            if (this.projectbaselinelogDetailsprev.some(y => y.scheduleUniqueId == this.projectbaselinelogDetailscurr[m].scheduleUniqueId)) {
                if (this.projectbaselinelogDetailsprev.find(x => x.scheduleUniqueId == this.projectbaselinelogDetailscurr[m].scheduleUniqueId).baselineFinish != this.projectbaselinelogDetailscurr[m].baselineFinish) {
                    this.projectbaselinelogDetailscurr[m].baselinechange = true
                }
                if (this.projectbaselinelogDetailsprev.find(x => x.scheduleUniqueId == this.projectbaselinelogDetailscurr[m].scheduleUniqueId).plannedFinish != this.projectbaselinelogDetailscurr[m].plannedFinish) {
                    this.projectbaselinelogDetailscurr[m].plannedchange = true
                }
                if (this.projectbaselinelogDetailsprev.find(x => x.scheduleUniqueId == this.projectbaselinelogDetailscurr[m].scheduleUniqueId).completionDate != this.projectbaselinelogDetailscurr[m].completionDate) {
                    this.projectbaselinelogDetailscurr[m].completionchange = true
                }

                if (this.projectbaselinelogDetailsprev.find(x => x.scheduleUniqueId == this.projectbaselinelogDetailscurr[m].scheduleUniqueId).indicator != this.projectbaselinelogDetailscurr[m].indicator) {
                    this.projectbaselinelogDetailscurr[m].indicatorchange = true
                }

            } else {
                if (this.projectbaselinelogDetailscurr[m].baselineFinish == '') {
                    this.projectbaselinelogDetailscurr[m].baselineFinish == ''
                    this.projectbaselinelogDetailscurr[m].baselinechange = false
                }
                else if (this.projectbaselinelogDetailscurr[m].baselineFinish == null) {
                    this.projectbaselinelogDetailscurr[m].baselineFinish == ''
                    this.projectbaselinelogDetailscurr[m].baselinechange = false
                }
                else
                {

                    this.projectbaselinelogDetailscurr[m].baselinechange = true
                }
                if (this.projectbaselinelogDetailscurr[m].plannedFinish == '') {
                    this.projectbaselinelogDetailscurr[m].plannedFinish == ''
                    this.projectbaselinelogDetailscurr[m].plannedchange = false
                }
                else if (this.projectbaselinelogDetailscurr[m].plannedFinish == null) {
                    this.projectbaselinelogDetailscurr[m].plannedFinish == ''
                    this.projectbaselinelogDetailscurr[m].plannedchange = false
                }
                else
                {

                    this.projectbaselinelogDetailscurr[m].plannedchange = true
                }
                if (this.projectbaselinelogDetailscurr[m].completionDate == '') {
                    this.projectbaselinelogDetailscurr[m].completionDate == ''
                    this.projectbaselinelogDetailscurr[m].completionchange = false
                }
                else if (this.projectbaselinelogDetailscurr[m].completionDate == null) {
                    this.projectbaselinelogDetailscurr[m].completionDate == ''
                    this.projectbaselinelogDetailscurr[m].completionchange = false
                }
                else
                {

                    this.projectbaselinelogDetailscurr[m].completionchange = true
                }
                //if (this.projectbaselinelogDetailscurr[m].indicator != '') {
                    this.projectbaselinelogDetailscurr[m].indicatorchange = true
                //}
            }
        }
        //}
        this.prevObj = this.projectbaselinelogDetailsprev.map(x => x.scheduleUniqueId)
        this.currObj = this.projectbaselinelogDetailscurr.map(x => x.scheduleUniqueId)
        this.myFinalArray = [...this.currObj, ...this.prevObj]
        var unique = this.myFinalArray.filter((v, i, a) => a.indexOf(v) === i);
        for (var k = 0; k < unique.length; k++) {
            // debugger
            this.logdetailsObj.push({
                milestone: this.projectbaselinelogDetailscurr.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x => x.scheduleUniqueId == unique[k]).milestone : this.projectbaselinelogDetailsprev.find(x => x.scheduleUniqueId == unique[k]).milestone,
                currplannedFinish: this.projectbaselinelogDetailscurr.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x => x.scheduleUniqueId == unique[k]).plannedFinish : 'empty',
                currbaselineFinish: this.projectbaselinelogDetailscurr.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x => x.scheduleUniqueId == unique[k]).baselineFinish : 'empty',
                currcompletionDate: this.projectbaselinelogDetailscurr.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x => x.scheduleUniqueId == unique[k]).completionDate : 'empty',
                currindicator: this.projectbaselinelogDetailscurr.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x => x.scheduleUniqueId == unique[k]).indicator : 'empty',
                prevplannedFinish: this.projectbaselinelogDetailsprev.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailsprev.find(x => x.scheduleUniqueId == unique[k]).plannedFinish : 'empty2',
                prevbaselineFinish: this.projectbaselinelogDetailsprev.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailsprev.find(x => x.scheduleUniqueId == unique[k]).baselineFinish : 'empty2',
                prevcompletionDate: this.projectbaselinelogDetailsprev.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailsprev.find(x => x.scheduleUniqueId == unique[k]).completionDate : 'empty2',
                previndicator: this.projectbaselinelogDetailsprev.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailsprev.find(x => x.scheduleUniqueId == unique[k]).indicator : 'empty2',
                baselinechange: this.projectbaselinelogDetailscurr.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x => x.scheduleUniqueId == unique[k]).baselinechange : '',
                plannedchange: this.projectbaselinelogDetailscurr.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x => x.scheduleUniqueId == unique[k]).plannedchange : '',
                completionchange: this.projectbaselinelogDetailscurr.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x => x.scheduleUniqueId == unique[k]).completionchange : '',
                indicatorchange: this.projectbaselinelogDetailscurr.some(x => x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x => x.scheduleUniqueId == unique[k]).indicatorchange : ''
            })
        }
        console.log(this.projectbaselinelogDetailscurr)
        this.viewContent = false
        this.viewBaseline = false
        this.viewBaselineLogs = false
        this.compareBaselineLogs = true
    }

    submitschedulecharter() {
        this.projecthubservice.isFormChanged = false
        var formValue = this.milestoneForm.getRawValue()
        if (formValue.filter(x => x.includeInCharter == true).length <= 10) {
            for (var i of formValue) {
                var milestoneName = i.milestone;
                var functionOwner = i.functionGroupId;
                if (i.milestoneType == 1) {
                    if (!i.milestone.includes('Execution Start')) {
                        milestoneName = 'Execution Start - '.concat(i.milestone)
                    }
                }
                if (i.milestoneType == 2) {
                    if (!i.milestone.includes('Execution End ')) {
                        milestoneName = 'Execution End - '.concat(i.milestone)
                    }
                }
                if ((i.milestoneType > 0 && i.milestone != '') || (i.milestoneType > 0 && i.milestone != null)) {
                    this.schedulecharterobj.push({
                        scheduleUniqueId: i.scheduleUniqueId,
                        projectId: i.projectId,
                        milestone: milestoneName,
                        plannedFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        baselineFinish: i.baselineFinish ? moment(i.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        responsiblePersonName: i.responsiblePersonName ? i.responsiblePersonName.userDisplayName : null,
                        completionDate: i.completionDate ? moment(i.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        comments: i.comments,
                        includeInReport: i.includeInReport,
                        functionGroupId: i.function == null ? null : i.function.lookUpId,
                        includeInCharter: i.includeInCharter,
                        includeInBusinessCase: i.includeInBusinessCase,
                        milestoneType: i.milestoneType,
                        templateMilestoneId: i.templateMilestoneId,
                        includeInCloseout: i.includeInCloseout
                    })
                } else {
                    this.schedulecharterobj.push({
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
                        includeInBusinessCase: i.includeInBusinessCase,
                        milestoneType: i.milestoneType,
                        templateMilestoneId: i.templateMilestoneId,
                        includeInCloseout: i.includeInCloseout,
                        responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
                        indicator: i.indicator
                    })
                }
            }
            this.apiService.bulkeditSchedule(this.schedulecharterobj, this.id).then(res => {
                this.projecthubservice.isNavChanged.next(true)
                this.projecthubservice.submitbutton.next(true)
                this.projecthubservice.successSave.next(true)
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
            })
        } else {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "Only 10 milestones can be included in Charter report",
                "message": "",
                "icon": {
                    "show": true,
                    "name": "heroicons_outline:exclamation",
                    "color": "warning"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "OK",
                        "color": "primary"
                    },
                    "cancel": {
                        "show": false,
                        "label": "Cancel"
                    }
                },
                "dismissible": true
            }
            const alert = this.fuseAlert.open(comfirmConfig)
            this.projecthubservice.isBulkEdit = true
        }
    }

    submitScheduleBusinessCase() {
        this.projecthubservice.isFormChanged = false
        this.formValueForOptions()
        this.apiService.bulkEditTimelineForOption(this.scheduleBusinessObj, this.id).then(res => {
            this.optionInfoData.executionEndDate = moment(this.optionExecutions.controls.optionExecutionEnd.value).format('YYYY-MM-DD[T]HH:mm:ss');
            this.optionInfoData.executionStartDate = moment(this.optionExecutions.controls.optionExecutionStart.value).format('YYYY-MM-DD[T]HH:mm:ss');
            this.optionInfoData.businessOptionId = this.optionInfoData.businessOptionId ? this.optionInfoData.businessOptionId : this.optionId
            if(this.router.url.includes('option-2') || this.router.url.includes('option-3')){
                this.apiService.updateBusinessCaseOptionInfoDetails(this.optionInfoData, this.id).then(secondRes => {
                    this.projecthubservice.submitbutton.next(true)
                    this.projecthubservice.toggleDrawerOpen('', '', [], '')
                    this.projecthubservice.isNavChanged.next(true)
                })
            }else{
                this.projecthubservice.submitbutton.next(true)
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
                this.projecthubservice.isNavChanged.next(true)
            }
        })
    }


    submitschedulecloseout() {
        this.projecthubservice.isFormChanged = false
        var formValue = this.milestoneForm.getRawValue()
        if (formValue.filter(x => x.includeInCloseout == true).length <= 20) {
            for (var i of formValue) {
                var milestoneName = i.milestone
                if (i.milestoneType == 1) {
                    if (!i.milestone.includes('Execution Start')) {
                        milestoneName = 'Execution Start - '.concat(i.milestone)
                    }
                }
                if (i.milestoneType == 2) {
                    if (!i.milestone.includes('Execution End ')) {
                        milestoneName = 'Execution End - '.concat(i.milestone)
                    }
                }
                if ((i.milestoneType > 0 && i.milestone != '') || (i.milestoneType > 0 && i.milestone != null)) {
                    this.schedulecloseoutobj.push({
                        scheduleUniqueId: i.scheduleUniqueId,
                        projectId: i.projectId,
                        milestone: milestoneName,
                        plannedFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        baselineFinish: i.baselineFinish ? moment(i.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        responsiblePersonName: i.responsiblePersonName ? i.responsiblePersonName.userDisplayName : null,
                        completionDate: i.completionDate ? moment(i.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        comments: i.comments,
                        includeInReport: i.includeInReport,
                        functionGroupId: i.function == null ? null : i.function.lookUpId,
                        includeInCharter: i.includeInCharter,
                        includeInBusinessCase: i.includeInBusinessCase,
                        milestoneType: i.milestoneType,
                        templateMilestoneId: i.templateMilestoneId,
                        includeInCloseout: i.includeInCloseout
                    })
                } else {
                    this.schedulecloseoutobj.push({
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
                        includeInBusinessCase: i.includeInBusinessCase,
                        milestoneType: i.milestoneType,
                        templateMilestoneId: i.templateMilestoneId,
                        includeInCloseout: i.includeInCloseout,
                        responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
                        indicator: i.indicator
                    })
                }
            }
            this.apiService.bulkeditSchedule(this.schedulecloseoutobj, this.id).then(res => {
                this.projecthubservice.isNavChanged.next(true)
                this.projecthubservice.submitbutton.next(true)
                this.projecthubservice.successSave.next(true)
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
            })
        } else {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "Only 20 milestones can be included in Close Out report",
                "message": "",
                "icon": {
                    "show": true,
                    "name": "heroicons_outline:exclamation",
                    "color": "warning"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "OK",
                        "color": "primary"
                    },
                    "cancel": {
                        "show": false,
                        "label": "Cancel"
                    }
                },
                "dismissible": true
            }
            const alert = this.fuseAlert.open(comfirmConfig)
            this.projecthubservice.isBulkEdit = true
        }
    }


    submitschedule() {
        // debugger
        var baselineFormValue = this.milestoneForm.getRawValue()
        console.log(baselineFormValue)
        // if(this.mode == 'Project-Close-Out')
        // {
        //   this.projecthubservice.includeClosedItems.schedule.value == true
        // }
        if (this.projecthubservice.includeClosedItems.schedule.value) {
            var baselinedates = this.scheduleData.scheduleData.map(x => {
                return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
            })
        } else {
            var baselinedates = this.scheduleData.scheduleData.filter(x => x.completionDate == null).map(x => {
                return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
            })
        }
        // var baselinedates4 = this.scheduleData.scheduleData.filter(x => x.completionDate == null && baselineFormValue.map(y => y.scheduleUniqueId == x.scheduleUniqueId)).map(x => {
        //     return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
        // })
        console.log(baselineFormValue.length)
        var baselinedates4 = []
        for (var controls of this.milestoneForm.controls) {
            if(this.scheduleData.scheduleData.some(x => x.scheduleUniqueId == controls['controls']['scheduleUniqueId'].value))
            baselinedates4.push(this.scheduleData.scheduleData.find(x => x.scheduleUniqueId == controls['controls']['scheduleUniqueId'].value).baselineFinish ?
                moment(this.scheduleData.scheduleData.find(x => x.scheduleUniqueId == controls['controls']['scheduleUniqueId'].value).baselineFinish).format("YYYY-MM-DD HH:mm:ss") : null


               /* .map(x => {
                    return x.baselineFinish ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
                })*/
            )
        }
        //  for(var control of this.milestoneForm.controls)
        //  {
        //    console.log("New Milestone scheduleUNIQUEID",control['controls']['scheduleUniqueId'].value)
        //    //debugger
        //    if(control['controls']['scheduleUniqueId'].value != '')
        //    {
        //     var baselinedates2 = baselineFormValue.map(x => {
        //       return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
        //     })
        //    }
        //    else {
        //    var baselinedates2 = baselineFormValue.filter(x => x.scheduleUniqueId != '').map(x => {
        //       return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
        //     })
        //   }
        // }
        for (var control of this.milestoneForm.controls) {
            if (control['controls']['scheduleUniqueId'].value != '') {
                var baselinedates3 = baselineFormValue.filter(x => x.scheduleUniqueId != '').map(x => {
                    return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
                })
            } else if(control['controls']['baselineFinish'].value != '') {
                var baselinedates2 = baselineFormValue.filter(x => x.scheduleUniqueId == '').map(x => {
                    return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
                })
            }
            // var baselinedates4 = baselineFormValue.map(x => {
            //   return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
            // })
        }

        // if(this.flag != true)
        // {
        // }
        // if(baselineFormValue.length < this.scheduleData.scheduleData.length)
        //    {
        //     this.saveScheduleBulkEdit()
        //    }
        console.log(baselinedates)
        console.log("DELETED MIESTONE", baselinedates4)
console.log("add new milestone baseline",baselinedates2)
console.log("other add new milestone baseline",baselinedates3)
console.log("NEW MILESTONE BASELINE DATE", JSON.stringify(baselinedates2))

        //standard milestones and no new milestone
        if (!this.flag && !baselinedates2 && baselinedates.length == baselinedates3.length && JSON.stringify(baselinedates) != JSON.stringify(baselinedates3)) {
            this.flag = true
            //this.insertArray(control['controls']['projectId'].value)
        }
        //standard milestones and new milestone not baselined
        if (!this.flag && !baselinedates2 && JSON.stringify(baselinedates2) == '' && baselinedates.length == baselinedates3.length && JSON.stringify(baselinedates) != JSON.stringify(baselinedates3)) {
            this.flag = true
            //this.insertArray(control['controls']['projectId'].value)
        }
        //new milestone baselined
        if (!this.flag && baselinedates2 && baselinedates.length == baselinedates3.length) {
            this.flag = true
        }
        //milestone deleted and other milestone baselined
        if (!this.flag && baselinedates.length > baselinedates3.length && JSON.stringify(baselinedates4) != JSON.stringify(baselinedates3)) {
            this.flag = true
        }
        // if (!this.flag && JSON.stringify(baselinedates2) != '' && baselinedates.length < baselinedates2.length && JSON.stringify(baselinedates) == JSON.stringify(baselinedates2)) {
        //     this.flag = false
        // }
        //     if(!this.flag && baselinedates.length < baselinedates3.length)
        // {
        //     this.flag = false
        //     this.
        // }
        if (this.flag && baselineFormValue.filter(x => x.includeInReport == true).length <= 8) {
            this.viewBaseline = true
            this.viewBaselineLogs = true
            this.compareBaselineLogs = false
            this.projecthubservice.isBulkEdit = false
            // this.saveScheduleBulkEdit()
        } else if (this.flag && baselineFormValue.filter(x => x.includeInReport == true).length > 8) {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "Only 8 milestones can be included in project dashboard",
                "message": "",
                "icon": {
                    "show": true,
                    "name": "heroicons_outline:exclamation",
                    "color": "warning"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "OK",
                        "color": "primary"
                    },
                    "cancel": {
                        "show": false,
                        "label": "Cancel"
                    }
                },
                "dismissible": true
            }
            const alert = this.fuseAlert.open(comfirmConfig)
            this.projecthubservice.isBulkEdit = true
        } else if (!this.flag && baselineFormValue.filter(x => x.includeInReport == true).length > 8) {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "Only 8 milestones can be included in project dashboard",
                "message": "",
                "icon": {
                    "show": true,
                    "name": "heroicons_outline:exclamation",
                    "color": "warning"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "OK",
                        "color": "primary"
                    },
                    "cancel": {
                        "show": false,
                        "label": "Cancel"
                    }
                },
                "dismissible": true
            }
            const alert = this.fuseAlert.open(comfirmConfig)
            this.projecthubservice.isBulkEdit = true
        } else {
            this.saveScheduleBulkEdit()
        }
    }
    //   @HostListener('window:resize', ['$event'])
    // onResize(event) {
    //   event.target.innerWidth;
    // }
    addStandardMilestonesToList(standardMilestones: any[]) {
        standardMilestones.forEach(x => {
            switch (x.milestoneType) {
                case 1: {
                    let index = 0;
                    let exists = false;
                    for (let control of this.milestoneForm.controls) {
                        if (control.value.milestoneType == x.milestoneType) {
                            control.patchValue({ milestone: x.milestone })
                            if (x.funtionalOwnerId && x.funtionalOwnerId != '') {
                                control.patchValue({ functionGroupId: x.funtionalOwnerId })
                                control.patchValue({ function: this.projecthubservice.lookUpMaster.find(y => y.lookUpId == x.funtionalOwnerId)})
                            }
                            if (!control.value.comments || control.value.comments == '') {
                                control.patchValue({ comments: x.comment })
                            }
                            if (control.value.includeInReport == false) {
                                control.patchValue({ includeInReport: x.includeInReport })
                            }
                            control.patchValue({ templateMilestoneId: x.milestoneTemplateId})
                            this.milestoneTableEditRow(index)
                            exists = true;
                        }
                        index++;
                    }
                    if (!exists) {
                        this.addStandardMilestoneToEditStack(x)
                    }
                    break;
                }
                case 2: {
                    let index = 0;
                    let exists = false;
                    for (let control of this.milestoneForm.controls) {
                        if (control.value.milestoneType == x.milestoneType) {
                            control.patchValue({ milestone: x.milestone })
                            if (x.funtionalOwnerId && x.funtionalOwnerId != '') {
                                control.patchValue({ functionGroupId: x.funtionalOwnerId })
                                control.patchValue({ function: this.projecthubservice.lookUpMaster.find(y => y.lookUpId == x.funtionalOwnerId)})
                            }
                            if (control.value.comments == '') {
                                control.patchValue({ comments: x.comment })
                            }
                            if (control.value.includeInReport == false) {
                                control.patchValue({ includeInReport: x.includeInReport })
                            }
                            control.patchValue({ templateMilestoneId: x.milestoneTemplateId})
                            this.milestoneTableEditRow(index)
                            exists = true;
                        }
                        index++;
                    }
                    if (!exists) {
                        this.addStandardMilestoneToEditStack(x)
                    }
                    break;
                }
                default: {
                    this.addStandardMilestoneToEditStack(x)
                    break;
                }
            }
            var div = document.getElementsByClassName('datatable-scroll')[0]
            setTimeout(() => {
                div.scroll({
                    top: div.scrollHeight,
                    left: 0,
                    behavior: 'smooth'
                });
            }, 100);
        })
        this.viewStandardMilestonesSets = false
    }

    addStandardMilestoneToEditStack(sM: any) {
        var formValue = this.milestoneForm.getRawValue()
        var limitPassed = false;
        if (formValue.length > 0) {
            if (formValue.filter(x => x.includeInReport == true).length >= 8) {
                limitPassed = true;
            }
        }
        this.milestoneForm.push(new FormGroup({
            scheduleUniqueId: new FormControl(''),
            projectId: new FormControl(this.id),
            milestone: new FormControl(sM.milestone),
            plannedFinish: new FormControl(''),
            baselineFinish: new FormControl(''),
            responsiblePersonName: new FormControl({}),
            function: new FormControl(this.projecthubservice.lookUpMaster.find(x => x.lookUpId == sM.funtionalOwnerId)),
            functionGroupId: new FormControl(sM.funtionalOwnerId),
            completionDate: new FormControl(''),
            comments: new FormControl(sM.comment),
            includeInReport: new FormControl(limitPassed == false ? sM.includeInReport : false),
            includeInCharter: new FormControl(false),
            includeInBusinessCase: new FormControl(false),
            milestoneType: new FormControl(sM.milestoneType),
            templateMilestoneId: new FormControl(sM.milestoneId),
            includeInCloseout: new FormControl(false),
            responsiblePersonId: new FormControl(''),
            indicator: new FormControl('')
        }))
        var j = [{
            scheduleUniqueId: "new",
            baselineFinish: null,
            comments: sM.comment,
            completionDate: null,
            functionGroupId: sM.funtionalOwnerId,
            includeInCharter: false,
            includeInBusinessCase: sM.includeInBusinessCase,
            includeInCloseout: false,
            includeInReport: limitPassed == false ? sM.includeInReport : false,
            indicator: "Grey",
            milestone: sM.milestone,
            milestoneType: sM.milestoneType,
            plannedFinish: null,
            projectId: this.id,
            responsiblePersonId: null,
            responsiblePersonName: null,
            templateMilestoneId: sM.milestoneTemplateId
        }]
        this.schedulengxdata = [...this.schedulengxdata, ...j]
        this.milestoneTableEditRow(this.schedulengxdata.length - 1)
        this.disabler();
    }
    optionsDataLoader() {
        if (this.schedulengxdata.length > 0) {
            this.scheduledataDB = this.schedulengxdata.map(x => {
                return {
                    "baselineFinish": x.baselineFinish,
                    "businessOptionId": x.businessOptionId,
                    "comments": x.comments,
                    "businessScheduleUniqueId": x.businessScheduleUniqueId,
                    "functionGroupId": x.functionGroupId,
                    "includeInBusinessCase": x.includeInBusinessCase,
                    "includeInCharter": x.includeInCharter,
                    "includeInCloseout": x.includeInCloseout,
                    "includeInReport": x.includeInReport,
                    "indicator": x.indicator,
                    "milestone": x.milestone,
                    "milestoneType": x.milestoneType,
                    "plannedFinish": x.plannedFinish,
                    "projectId": x.projectId,
                    "responsiblePersonName": x.responsiblePersonName,
                    "scheduleUniqueId": x.scheduleUniqueId,
                    "templateMilestoneId": x.templateMilestoneId,
                }
            })
            if (this.schedulengxdata != 0) {
                for (var i of this.schedulengxdata) {
                    i.includeInReport = i.projectId == this.id ? i.includeInReport : this.scheduleData.links.find(t => t.linkItemId == i.scheduleUniqueId).includeInReport
                    this.dbSchedule.push({
                        scheduleUniqueId: i.scheduleUniqueId,
                        projectId: i.projectId,
                        milestone: i.milestone,
                        plannedFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        baselineFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        responsiblePersonName: (i.responsiblePersonId == null || i.responsiblePersonId == '' ? {} : {
                            userAdid: i.responsiblePersonId,
                            userDisplayName: i.responsiblePersonName
                        }),
                        functionGroupId: i.functionGroupId,
                        completionDate: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        comments: (i.comments),
                        includeInReport: (i.includeInReport),
                        includeInCharter: (i.includeInCharter),
                        includeInBusinessCase: (i.includeInBusinessCase),
                        milestoneType: (i.milestoneType),
                        templateMilestoneId: (i.templateMilestoneId),
                        includeInCloseout: (i.includeInCloseout),
                        responsiblePersonId: (i.responsiblePersonId),
                        indicator: (i.indicator)
                    })
                }
                this.scheduledataDb = this.schedulengxdata.map(x => {
                    i.includeInReport = i.projectId == this.id ? i.includeInReport : this.scheduleData.links.find(t => t.linkItemId == i.scheduleUniqueId).includeInReport
                    return {
                        "scheduleUniqueId": x.scheduleUniqueId,
                        "projectId": x.projectId,
                        "milestone": x.milestone,
                        "plannedFinish": moment(x.plannedFinish).format("YYYY-MM-DD HH:mm:ss"),
                        "baselineFinish": moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss"),
                        "responsiblePersonName": (x.responsiblePersonId == null || x.responsiblePersonId == '' ? {} : {
                            userAdid: x.responsiblePersonId,
                            userDisplayName: x.responsiblePersonName
                        }),
                        "functionGroupId": x.functionGroupId,
                        "function": (this.projecthubservice.lookUpMaster.find(y => y.lookUpId == x.functionGroupId)),
                        "completionDate": moment(x.completionDate).format("YYYY-MM-DD HH:mm:ss"),
                        "comments": x.comments,
                        "includeInReport": x.includeInReport,
                        "includeInCharter": x.includeInCharter,
                        "includeInBusinessCase": x.includeInBusinessCase,
                        "milestoneType": x.milestoneType,
                        "templateMilestoneId": x.templateMilestoneId,

                        "includeInCloseout": x.includeInCloseout,
                        "responsiblePersonId": x.responsiblePersonId,
                        "indicator": x.indicator
                    }
                })
                for (var i of this.schedulengxdata) {
                    this.milestoneName = i.milestone
                    this.milestoneForm.push(new FormGroup({
                        scheduleUniqueId: new FormControl(i.scheduleUniqueId),
                        projectId: new FormControl(i.projectId),
                        milestone: new FormControl(i.milestoneType > 0 ? i.milestoneType == 1 ? this.milestoneName.replace('Execution Start - ', '') : i.milestoneType == 2 ? this.milestoneName.replace('Execution End - ', '') : i.milestone : i.milestone),
                        plannedFinish: new FormControl(i.plannedFinish),
                        baselineFinish: new FormControl(i.baselineFinish),
                        responsiblePersonName: new FormControl(i.responsiblePersonId == null || i.responsiblePersonId == '' ? {} : {
                            userAdid: i.responsiblePersonId,
                            userDisplayName: i.responsiblePersonName
                        }),
                        functionGroupId: new FormControl(i.functionGroupId),
                        function: new FormControl(this.projecthubservice.lookUpMaster.find(x => x.lookUpId == i.functionGroupId)),
                        completionDate: new FormControl(i.completionDate),
                        comments: new FormControl(i.comments),
                        includeInReport: new FormControl(i.projectId == this.id ? i.includeInReport : this.scheduleData.links.find(t => t.linkItemId == i.scheduleUniqueId).includeInReport),
                        includeInCharter: new FormControl(i.includeInCharter),
                        includeInBusinessCase: new FormControl(i.includeInBusinessCase),
                        milestoneType: new FormControl(i.milestoneType),
                        templateMilestoneId: new FormControl(i.templateMilestoneId),
                        includeInCloseout: new FormControl(i.includeInCloseout),
                        responsiblePersonId: new FormControl(i.responsiblePersonId),
                        indicator: new FormControl(i.indicator)
                    }))
                }
            }
        }
        this.disabler();
        this.viewContent = true;
    }
    formValueForOptions() {
        var form = this.milestoneForm.getRawValue()
        if (form.length > 0) {
            this.scheduleBusinessObj = []
            let optionId = "";
            if (this.router.url.includes('option-3')) {
                optionId= GlobalBusinessCaseOptions.OPTION_3
            }
            if (this.router.url.includes('option-2')) {
                optionId= GlobalBusinessCaseOptions.OPTION_2
            }
            if (this.router.url.includes('recommended-option')) {
                optionId=""
            }
            for (var i of form) {
                var milestoneName = i.milestone;
                if (i.milestoneType == 1) {
                    if (!i.milestone.includes('Execution Start')) {
                        milestoneName = 'Execution Start - '.concat(i.milestone)
                    }
                }
                if (i.milestoneType == 2) {
                    if (!i.milestone.includes('Execution End ')) {
                        milestoneName = 'Execution End - '.concat(i.milestone)
                    }
                }
                if ((i.milestoneType > 0 && i.milestone != '') || (i.milestoneType > 0 && i.milestone != null)) {
                    this.scheduleBusinessObj.push({
                        scheduleUniqueId: i.scheduleUniqueId,
                        projectId: i.projectId,
                        milestone: milestoneName,
                        plannedFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        baselineFinish: i.baselineFinish ? moment(i.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        responsiblePersonName: i.responsiblePersonName ? i.responsiblePersonName.userDisplayName : null,
                        completionDate: i.completionDate ? moment(i.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                        comments: i.comments,
                        includeInReport: i.includeInReport,
                        functionGroupId: i.function == null ? null : i.function.lookUpId,
                        includeInCharter: i.includeInCharter,
                        includeInBusinessCase: i.includeInBusinessCase,
                        milestoneType: i.milestoneType,
                        templateMilestoneId: i.templateMilestoneId,
                        includeInCloseout: i.includeInCloseout,
                        businessKeyAssumptionUniqueId:i.businessKeyAssumptionUniqueId,
                        businessOptionId: optionId
                    })
                } else {
                    this.scheduleBusinessObj.push({
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
                        includeInBusinessCase: i.includeInBusinessCase,
                        milestoneType: i.milestoneType,
                        templateMilestoneId: i.templateMilestoneId,
                        includeInCloseout: i.includeInCloseout,
                        responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
                        indicator: i.indicator,
                        businessKeyAssumptionUniqueId:i.businessKeyAssumptionUniqueId,
                        businessOptionId: optionId
                    })
                }
            }
        } else {
            this.scheduleBusinessObj = []
        }
    }

    @HostListener('unloaded')
    ngOnDestroy() {
        //this.viewportChange.unsubscribe();
    }
}
