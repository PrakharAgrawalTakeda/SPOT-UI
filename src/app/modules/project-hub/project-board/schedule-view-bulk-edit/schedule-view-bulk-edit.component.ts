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
import {ProjectHubService} from '../../project-hub.service';
import * as moment from 'moment';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {SpotlightIndicatorsService} from 'app/core/spotlight-indicators/spotlight-indicators.service';
import {ProjectApiService} from '../../common/project-api.service';
import {AuthService} from 'app/core/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators, FormGroup, FormControl, FormArray} from '@angular/forms';
import {PortfolioApiService} from 'app/modules/portfolio-center/portfolio-api.service';
import {FuseConfirmationConfig, FuseConfirmationService} from '@fuse/services/confirmation';
import {MsalService} from '@azure/msal-angular';
import {ViewportRuler} from '@angular/cdk/scrolling';

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
  @Input() schedulengxdata: any;
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
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Baseline-Log'  | 'Business-Case' = 'Normal'
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
  insertarray : any = []
  schedulecloseoutobj: any = []
  schedulecharterobj: any = []
  // onResize(event){
  //   event.window.innerWidth; // window width
  // }

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
          console.log("contructor")
          console.log("LINE !#&", this.scheduleData.scheduleData)
          this.changeschedule(res, true)

        }
      }
    })
    //this.setSize();
    this.milestoneForm.valueChanges.subscribe(res => {
      //debugger
      this.insertarray = []
      for(let control of this.milestoneForm.controls)
      {
        //debugger
        this.scheduleData.scheduleData = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
        if(this.scheduleData.scheduleData.find(x => x.scheduleUniqueId == control['value']['scheduleUniqueId']))
        {

       
        console.log(this.milestoneForm.getRawValue())
        console.log(control['controls']['baselineFinish'].value)
        console.log(this.scheduleData.scheduleData)
        console.log(control['value']['scheduleUniqueId'])
        console.log(this.scheduleData.scheduleData.find(x => x.scheduleUniqueId == control['value']['scheduleUniqueId']).baselineFinish)
        console.log(moment(control['controls']['baselineFinish'].value).format('YYYY-MM-DD[T]HH:mm:ss'))
       // console.log( moment(this.scheduleData.scheduleData.find(x => x.scheduleUniqueId == control['value']['scheduleUniqueId']).baselineFinish.value).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'))
        if(moment(control['controls']['baselineFinish'].value).format('YYYY-MM-DD[T]HH:mm:ss') != this.scheduleData.scheduleData.find(x => x.scheduleUniqueId == control['value']['scheduleUniqueId']).baselineFinish)
        {
          this.insertArray(control['controls']['projectId'].value)
        }
      }
      }
      console.log("Milestone form Value", this.milestoneForm.getRawValue())
      console.log("Milstone Schedule Data Array", this.scheduleData.scheduleData)
      if (this.viewContent == true) {
        //this.saveScheduleBulkEdit()
        console.log("DB", this.scheduledataDb)
        console.log("SUB", this.scheduleObj)
        if (JSON.stringify(this.scheduledataDb) != JSON.stringify(this.scheduleObj)) {
          this.projecthubservice.isFormChanged = true

                } else {
                    this.projecthubservice.isFormChanged = false
                }
            }
        })
        //Baseline Log Form changes
        this.baselineLogForm.valueChanges.subscribe(res => {
            if (this.viewContent == false) {
                //this.saveScheduleBulkEdit()
                console.log("DB", this.baselineLogForm)
                console.log("SUB", this.baselineLogObj)
                for (let control of this.baselineLogObj) {
                    for (let i of this.baselineLogData.filter(x => x.baselineLogId == control.includedInSlipChart)) {
                        if (JSON.stringify(control.includedInSlipChart) != JSON.stringify(i.includeSlipChart)) {

                            this.projecthubservice.isFormChanged = true
                        } else {
                            this.projecthubservice.isFormChanged = false
                        }
                    }
                }
            }
        })

    }

    // ngOnChanges(changes: SimpleChanges): void {
    //   console.log(changes)
    //   console.log("Closed",this.isclosed)
    //   console.log(this.scheduleData.scheduleData)
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
      console.log(this.insertarray)
  }

  getFunctionOwner(): any {
      return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
  }
  dataloader() {
    console.log("MODE")
    if(this.mode == 'Baseline-Log')
                  {
                    //this.BaselineLog()
                    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id")
                    this.apiService.getProjectBaselineLogDetails(this.id).then((logDetails: any) => {
                     this.apiService.getProjectBaselineLog(this.id).then((logs: any) => {
                       console.log("Log Details", logDetails)
                                   if(logDetails.length != 0)
                                   {
                                     this.logdetails = logDetails
                                   }
                       console.log("Logs", logs)
                       console.log("Users List", this.userlist)
                       console.log(logs.projectBaselineLog.length)
                       //debugger
                       if (logs.projectBaselineLog.length != 0 || logs.users != null) {
                         this.userlist = logs.users
                 
                         this.getUserName(this.id)
                         this.baselinelogTableEditStack = []
                         console.log(this.baselineLogForm.getRawValue())
                 
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
                           console.log(this.baselineLogData)
                         }
                         this.viewContent = false
                         this.viewBaseline = false
                         this.viewBaselineLogs = true
                       }
                       else {
                         this.viewContent = false
                         this.viewBaseline = false
                         this.viewBaselineLogs = true
                       }
                 
                 
                 
                 
                     })
                     })
        //             this.viewContent = false
        // this.viewBaseline = false
        // this.viewBaselineLogs = true
        
                  }
                  else{

                 
//debugger
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
                console.log(log)
                if (log.length != 0) {
                  if (log.projectBaselineLog.length != 0) {
                    this.log = log.projectBaselineLog[0]

                    console.log(this.log)
                  }
                  else {
                    this.log.projectBaselineLog = ''
                    console.log(this.log)
                  }
                }
                else {
                  this.log = ''
                  console.log(this.log)
                }
                //this.logloglog = log
                if (log.projectBaselineLog.length != 0 || log.users != null) {
                  this.userlist = log.users
                }
                console.log("Users List", this.userlist)

                //debugger


                  this.baselineCount = count
                  console.log("Baseline Count", this.baselineCount)
                  console.log('LookUp Data', lookup)
                  this.lookUpData = lookup
                  console.log('Filter Criteria:', filterres)
                  this.filterCriteria = filterres
                  console.log("Milestone info:", res)
                  this.scheduleData = this.sortbyPlannedBaseline(res)
                  console.log(this.isclosed)
                  console.log(this.scheduleData.scheduleData)
                  this.changeschedule(this.projecthubservice.includeClosedItems.schedule.value)
                  if (this.isclosed == false) {
                    this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
                    console.log(this.schedulengxdata)
                    this.schedulengxdata = this.sortbyPlannedBaseline(this.schedulengxdata)
                    console.log(this.schedulengxdata)
                     //this.schedulengxdata = this.sortbyBaseline(this.schedulengxdata)
                    // console.log(this.schedulengxdata)
                    // this.schedulengxdata = this.sortbyCompletion(this.schedulengxdata)
                    // console.log("ngx", this.schedulengxdata)
                  }

                  if(this.isclosed == true)
                  {
                    this.schedulengxdata = this.sortbyPlannedBaseline(this.schedulengxdata)
                  }

                  if(this.mode == 'Project-Close-Out')
                  {
                    this.schedulengxdata = this.scheduleData.scheduleData
                    this.schedulengxdata = this.sortbyBaselineCompletion(this.schedulengxdata)
                  }
                  if(this.mode == 'Project-Charter')
                  {
                    this.schedulengxdata = this.scheduleData.scheduleData
                    this.schedulengxdata = this.sortbyPlanned(this.schedulengxdata)
                  }
                  this.scheduledataDB = this.sortbyPlannedBaseline(res.scheduleData)
                  console.log(this.scheduledataDB)
                  console.log(this.projecthubservice.includeClosedItems.schedule.value)
                  res.scheduleData = this.sortbyPlannedBaseline(res.scheduleData)

                if (res.scheduleData.length != 0) {
                  for (var i of res.scheduleData) {
                    console.log(this.id)
                    i.includeInReport = i.projectId == this.id ? i.includeInReport : this.scheduleData.links.find(t => t.linkItemId == i.scheduleUniqueId).includeInReport

                    this.dbSchedule.push({
                      scheduleUniqueId: i.scheduleUniqueId,
                      projectId: i.projectId,
                      milestone: i.milestone,
                      plannedFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                      baselineFinish: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                      responsiblePersonName: (i.responsiblePersonId == null || i.responsiblePersonId == '' ? {} : { userAdid: i.responsiblePersonId, userDisplayName: i.responsiblePersonName }),
                      functionGroupId: i.functionGroupId,
                      completionDate: i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
                      comments: (i.comments),
                      includeInReport: (i.includeInReport),
                      includeInCharter: (i.includeInCharter),
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
                  for (var i of this.sortbyPlannedBaseline(this.schedulengxdata)) {
                    console.log(this.schedulengxdata)
                    this.milestoneName = i.milestone
                    console.log(this.milestoneName)
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
                      includeInReport: new FormControl(i.projectId == this.id ? i.includeInReport : this.scheduleData.links.find(t => t.linkItemId == i.scheduleUniqueId).includeInReport),
                      includeInCharter: new FormControl(i.includeInCharter),
                      milestoneType: new FormControl(i.milestoneType),
                      templateMilestoneId: new FormControl(i.templateMilestoneId),
                      includeInCloseout: new FormControl(i.includeInCloseout),
                      responsiblePersonId: new FormControl(i.responsiblePersonId),
                      indicator: new FormControl(i.indicator)
                    }))
                    console.log(this.milestoneForm.controls.filter(x => x.value.completionDate != null))
                    if (this.milestoneForm.controls.filter(x => x.value.completionDate != null)) {
                      for (let control of this.milestoneForm.controls.filter(x => x.value.completionDate != null)) {
                        console.log(control)
                        console.log(control['controls']['baselineFinish'])
                        control['controls']['baselineFinish'].disable()
                      }
                    }

                  }

                  console.log(this.projecthubservice.roleControllerControl.roleId)
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
                //this.value = this.milestoneForm.getRawValue()
                console.log('MilestoneForm:', this.milestoneForm.getRawValue())
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
    this.scheduleData.scheduleData = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
    this.toggleHelper = true
    this.projecthubservice.includeClosedItems.schedule.next(event.checked)
  }

  changeschedule(event: any, initial: boolean = false) {
    //debugger
    console.log("Change Shedule", this.scheduleData.scheduleData)
    this.scheduleData.scheduleData = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
    for (var i of this.scheduleData.scheduleData) {

      for (let control of this.milestoneForm.controls.filter(x => x.value.scheduleUniqueId == i.scheduleUniqueId)) {
        console.log(control['controls']['milestone'])

        if (i.milestoneType == 1) {
          control['controls']['milestone'].patchValue('Execution Start - '.concat(control['controls']['milestone'].value))
          console.log(control['controls']['milestone'])

        }
        else if (i.milestoneType == 2) {
          control['controls']['milestone'].patchValue('Execution End - '.concat(control['controls']['milestone'].value))
          console.log(control['controls']['milestone'])

        }

      }
    }


    this.value = this.milestoneForm.getRawValue()
    this.scheduleData.scheduleData = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
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
    console.log(this.scheduleData.scheduleData)
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
              this.schedulengxdata = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
              // else {
              //   this.isclosed = false
              //   this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
              // }
              console.log(this.schedulengxdata)
              this.localIncludedItems.controls.toggle.patchValue(event)
              this.localIncludedItems.controls.toggle.markAsPristine()
              this.dbSchedule = []
              this.formValue = []
              this.milestoneTableEditStack = []
              this.milestoneForm.clear()
              this.dataloader()
            }
            else {
              this.localIncludedItems.controls.toggle.patchValue(!event)
              this.localIncludedItems.controls.toggle.markAsPristine()
              this.toggleHelper = false
              this.projecthubservice.includeClosedItems.schedule.next(!event)
            }
          })
        }

        else {
          this.isclosed = true
          this.schedulengxdata = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
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

      else if (event == false) {
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
              this.schedulengxdata = this.sortbyPlannedBaseline(this.schedulengxdata)
              console.log(this.schedulengxdata)
              this.localIncludedItems.controls.toggle.patchValue(event)
              this.localIncludedItems.controls.toggle.markAsPristine()
              this.dbSchedule = []
              this.formValue = []
              this.milestoneTableEditStack = []
              this.milestoneForm.clear()
              this.dataloader()
            }
            else {
              this.localIncludedItems.controls.toggle.patchValue(!event)
              this.localIncludedItems.controls.toggle.markAsPristine()
              this.toggleHelper = false
              this.projecthubservice.includeClosedItems.schedule.next(!event)
            }
          })
        }
        else {
          this.isclosed = false
          this.schedulengxdata = this.scheduleData.scheduleData.filter(x => x.completionDate == null)
          this.schedulengxdata = this.sortbyPlannedBaseline(this.schedulengxdata)
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
    }
    else {
      if (event == true) {
        this.isclosed = true
        this.schedulengxdata = this.sortbyPlannedBaseline(this.scheduleData.scheduleData)
      }
      else {
        this.isclosed = false
        this.schedulengxdata = this.scheduleData.scheduleData.filter(row => row.closeDate == null)
        this.schedulengxdata = this.sortbyPlannedBaseline(this.schedulengxdata)
        console.log(this.schedulengxdata)
        console.log(this.scheduleData.scheduleData)
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

    var lookup = this.lookUpData.find(x => x.lookUpId == lookUpId)

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
        responsiblePersonName: new FormControl({}),
        function: new FormControl({}),
        functionGroupId: new FormControl({}),
        completionDate: new FormControl(''),
        comments: new FormControl(''),
        includeInReport: new FormControl(false),
        includeInCharter: new FormControl(false),
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
    console.log(this.scheduleData.scheduleData)
    console.log(this.milestoneTableEditStack)
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
    console.log(row)
    console.log(rowIndex)
    console.log(this.scheduleData)
    console.log(this.milestoneForm)
    console.log(this.milestoneTableEditStack)




    console.log(this.scheduleData)
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


    openStandardMilestonesSets(): void {
        this.projecthubservice.toggleDrawerOpen('', '', [], '')
        this.projecthubservice.toggleDrawerOpen('StandardMilestoneSets', '', '', '', false, true);
    }

    
    milestoneTableEditRow(row: number) {
        if (!this.milestoneTableEditStack.includes(row)) {
            this.milestoneTableEditStack.push(row)
        }
    }

    disabler() {
        var formValue = this.milestoneForm.getRawValue()
        if (formValue.length > 0) {
            //Include in business Case
            if (formValue.filter(x => x.includeInBusinessCase == true).length < 8) {
                for (var i of this.milestoneForm.controls) {
                    i['controls']['includeInBusinessCase'].enable()
                }
            } else {
                for (var i of this.milestoneForm.controls) {
                    if (i['controls']['includeInBusinessCase'].value != true) {
                        i['controls']['includeInBusinessCase'].disable()
                    }
                }
            }
            //Include in close-out
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
      console.log(this.teamMemberAdId)
      console.log(this.id)
  
      //if (this.projecthubservice.itemid != "new") {
  
  for(var i=0; i<this.insertarray.length; i++)
  {
   // debugger
    this.apiService.getProjectBaselineLog(this.insertarray[i]).then((res: any) => {
  
      this.baselineLog = res.projectBaselineLog.sort((a, b) => {
        return a.baselineCount - b.baselineCount;
  
      })
      //})
  
      console.log(this.baselineLog)
      if (this.baselineLog.length > 0) {
        this.baselineLogObj = this.baselineLog.sort((a, b) => {
          return a.baselineCount - b.baselineCount;
  
        })
      }
      else {
        this.baselineLogObj = ''
      }
      console.log(this.baselineLogObj)
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
        console.log(justificationObjNew)
  
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
  
  
      }
  
      else if (this.baselineLogObj == '' && this.baselineForm.value.counter == false) {
  
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
        console.log(justificationObjNewnocounter)
  
        this.apiService.addProjectBaselineLog(justificationObjNewnocounter).then(res => {
          //this.viewContent = true
          //this.viewBaseline = false
          // this.projecthubservice.toggleDrawerOpen('', '', [], '')
           this.projecthubservice.submitbutton.next(true)
           this.projecthubservice.isNavChanged.next(true)
         // this.saveScheduleBulkEdit()
        })
  
      }
  
      else if (this.baselineLogObj != '') {
        //console.log(this.baselineForm.value.counter)
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
  
          console.log(justificationObj)
          this.apiService.addProjectBaselineLog(justjustificationObj).then(res => {
            //this.viewContent = true
            // this.viewBaseline = false
            // this.projecthubservice.toggleDrawerOpen('', '', [], '')
             this.projecthubservice.submitbutton.next(true)
             this.projecthubservice.isNavChanged.next(true)
            //this.saveScheduleBulkEdit()
          })
        }
  
        else if (this.baselineCount == null && this.baselineForm.value.counter == true || this.baselineCount == '' && this.baselineForm.value.counter == true) {
          for (var i of this.baselineLogObj) {
            var newbaselineObj = {
              projectId: i.projectId,
              baselineCount: 1,
              teamMemberAdId: this.teamMemberAdId,
              modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
            }
            console.log(newbaselineObj)
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
  
          console.log(newjustificationObj)
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
        }
  
  
        else if (this.baselineForm.value.counter == true) {
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
  
  
          console.log(justificationObj)
          console.log(baselineObj)
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
        // if (a.plannedFinish === null) {
  
        //         return -1;
        
        //       }
        
        
        
        //       if (b.plannedFinish === null) {
        
        //         return 1;
        
        //       }
        
        
        
              if (a.plannedFinish === b.plannedFinish) {
        
                return a.baselineFinish < b.baselineFinish ? -1 : (a.baselineFinish > b.baselineFinish) ? 1 : 0;
        
              }
              else{
                return a.plannedFinish < b.plannedFinish ? -1 : 1;
            
              }
        
        
        
             
        
            }) : array
  
    }
  
    sortbyBaselineCompletion(array: any): any {
      return array.length > 1 ? array.sort((a, b) => {
        // if (a.plannedFinish === null) {
  
        //         return -1;
        
        //       }
        
        
        
        //       if (b.plannedFinish === null) {
        
        //         return 1;
        
        //       }
        
        
        
        if (a.baselineFinish === b.baselineFinish) {
        
          return a.completionDate < b.completionDate ? -1 : (a.completionDate > b.completionDate) ? 1 : 0;
  
        }
        else{
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
  
        console.log(this.scheduleObj)
        this.projecthubservice.isFormChanged = false
  
        var formValue = this.milestoneForm.getRawValue()
        console.log(formValue)
        //this.scheduleObj = formValue
        console.log(this.dbSchedule)
        if (!this.projecthubservice.includeClosedItems.schedule.value) {
          
          var closeditems = this.scheduleData.scheduleData.length > 0 ? this.scheduleData.scheduleData.filter(x => x.completionDate != null) : []
  
          console.log(this.formValue)
          for(var i of closeditems)
          {
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
              milestoneType: i.milestoneType,
              templateMilestoneId: i.templateMilestoneId,
              includeInCloseout: i.includeInCloseout,
              responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
              indicator: i.indicator
            })
          }
        }
  
        for (var i of formValue) {
          console.log(i)
          if ((i.milestoneType > 0 && i.milestone != '') || (i.milestoneType > 0 && i.milestone != null)) {
            this.formValue.push({
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
              milestoneType: i.milestoneType,
              templateMilestoneId: i.templateMilestoneId,
              includeInCloseout: i.includeInCloseout,
              responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
              indicator: i.indicator
            })
          }
        }
        console.log(this.formValue)
        console.log(this.scheduleData.scheduleData)
        this.scheduleData.scheduleData = res.scheduleData
         var sortedbaselines = this.sortByScheduleUniqeIDs(this.scheduleData.scheduleData)
         var sortedbaselines2 = this.sortByScheduleUniqeIDs(this.formValue)
        var baselines = sortedbaselines.map(x => {
          return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : x.baselineFinish
        })
        var baselines2 = sortedbaselines2.map(x => {
          return x.baselineFinish && x.baselineFinish != '' ? (x.baselineFinish) : x.baselineFinish
        })
  //debugger
        if (baselines.length == baselines2.length && JSON.stringify(baselines) != JSON.stringify(baselines2))
        {
          this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
          
            //  this.viewBaseline = true
            //  this.viewBaselineLogs = true
            //  this.compareBaselineLogs = false
            //  this.projecthubservice.isBulkEdit = false
  
  console.log(this.formValue)
  this.submitjustification() 
            //this.projecthubservice.submitbutton.next(true)
          })
          
  
        }
        else if(this.formValue.length < this.scheduleData.scheduleData.length)
        {
          this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.isNavChanged.next(true)
          })
        }
        else
        {
          console.log("CHANGED PLANNED FINISH", this.formValue)
          this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.isNavChanged.next(true)
          })
        }
  
      }
      // }
      else {
        this.projecthubservice.isFormChanged = false
  
        var formValue = this.milestoneForm.getRawValue()
        console.log(formValue)
        //this.scheduleObj = formValue
        console.log(formValue)
        if (!this.projecthubservice.includeClosedItems.schedule.value) {
          
          var closeditems = this.scheduleData.scheduleData.length > 0 ? this.scheduleData.scheduleData.filter(x => x.completionDate != null) : []
  
          console.log(this.formValue)
          for(var i of closeditems)
          {
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
              milestoneType: i.milestoneType,
              templateMilestoneId: i.templateMilestoneId,
              includeInCloseout: i.includeInCloseout,
              responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
              indicator: i.indicator
            })
          }
        }
  
  
        for (var i of formValue) {
          console.log(i.function)
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
              milestoneType: i.milestoneType,
              templateMilestoneId: i.templateMilestoneId,
              includeInCloseout: i.includeInCloseout,
              responsiblePersonId: Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userAdid,
              indicator: i.indicator
            })
          }
          else {
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
              milestoneType: i.milestoneType,
              templateMilestoneId: i.templateMilestoneId,
              includeInCloseout: i.includeInCloseout,
              responsiblePersonId: Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userAdid,
              indicator: i.indicator
            })
          }
        }
        console.log(this.formValue)
        this.scheduleData.scheduleData = res.scheduleData
        var sortedbaselinedates = this.sortByScheduleUniqeIDs(this.scheduleData.scheduleData)
        var sortedbaselinedates2 = this.sortByScheduleUniqeIDs(this.formValue)
        var baselinedates = sortedbaselinedates.map(x => {
          return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : x.baselineFinish
        })
        var baselinedates2 = sortedbaselinedates2.map(x => {
          return x.baselineFinish && x.baselineFinish != '' ? (x.baselineFinish) : x.baselineFinish
        })
  
        if (baselinedates.length == baselinedates2.length && JSON.stringify(baselinedates) != JSON.stringify(baselinedates2))
        {
          this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
          
            // this.viewBaseline = true
            // this.viewBaselineLogs = true
            // this.compareBaselineLogs = false
            // this.projecthubservice.isBulkEdit = false
  
  
            this.submitjustification()
            //this.projecthubservice.submitbutton.next(true)
          })
          
  
        }
        else if(this.formValue.length < this.scheduleData.scheduleData.length)
        {
          this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.isNavChanged.next(true)
          })
        }
        else
        {
          console.log("CHANGED PLANNED FINISH", this.formValue)
          this.apiService.bulkeditSchedule(this.formValue, this.id).then(res => {
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.isNavChanged.next(true)
          })
        }
  
  
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
       console.log(res.scheduleData)
      })
      console.log(this.scheduleData.scheduleData)
    }
  
    getUserName(adid: string): string {
      if (this.userlist.length > 0) {
        var baselinesetby = this.userlist.find(x => x.userAdid == adid)
        return baselinesetby ? baselinesetby.userDisplayName : ""
      }
      else {
        return ""
      }
    }
  
    baselinelogTableEditRow(row: number) {
      if (!this.baselinelogTableEditStack.includes(row)) {
        this.baselinelogTableEditStack.push(row)
      }
      console.log("456", this.baselinelogTableEditStack)
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
  
    BaselineLog() {
      //console.log("BASELINE LOG CALLED")
  
      
    }

    submitLog()
    {
      
      this.projecthubservice.isFormChanged = false
      var logformValue = this.baselineLogForm.getRawValue()
      console.log(logformValue)
      if (logformValue.filter(x => x.includeInCloseout == true).length <= 10) {
      for (var i of logformValue) {
        console.log(i)
        console.log(i.includeInCloseout)
        console.log(i.baselineLogId)
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
    }
    else
    {
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
      console.log(this.baselineLogForm.getRawValue())
      this.apiService.getProjectBaselineLogDetails(this.id).then((logDetails: any) => {
        this.apiService.getProjectBaselineLog(this.id).then((logs: any) => {
          console.log("Log Details", logDetails)
          if (logDetails.length != 0) {
            this.logdetails = logDetails
          }
          console.log("Logs", logs)
          console.log("Users List", this.userlist)
          console.log(logs.projectBaselineLog.length)
          //debugger
          if (logs.projectBaselineLog.length != 0 || logs.users != null) {
            this.userlist = logs.users
  
            this.getUserName(this.id)
            this.baselinelogTableEditStack = []
            console.log(this.baselineLogForm.getRawValue())
  
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
              console.log(this.baselineLogData)
            }
            this.viewContent = false
            this.viewBaseline = false
            this.viewBaselineLogs = true
          }
          else {
            this.viewContent = false
            this.viewBaseline = false
            this.viewBaselineLogs = true
          }
  
  
  
  
        })
      })
  
  
    }
  
    checklogDetails(baselinelogid: string) : boolean {
      //console.log(baselinelogid)
     // console.log(this.logdetails)
      return  this.logdetails && this.logdetails != '' && this.logdetails.length > 0  ? this.logdetails.some(x=> x.baselineLogId == baselinelogid) : false
      //return
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

    console.log(this.schedulengxdata)
    console.log(this.scheduledataDB)

    console.log(this.flag)
    this.apiService.getprojectviewdata(this.id).then((res: any) => {
      console.log(res)
      // for(var x of this.schedulengxdata)
      // {
      //   this.temp.push(x)
      // }
      for (var j of this.schedulengxdata) {

        if (!this.flag && (j.completionDate == null && j.plannedFinish != null && j.baselineFinish != j.plannedFinish) || !this.flag && (j.completionDate == '' && j.plannedFinish != null && j.baselineFinish != j.plannedFinish)) {

          j.baselineFinish = j.plannedFinish

          this.scheduleData.scheduleData = res.scheduleData

          //console.log(j.baselineFinish = j.plannedFinish)
          //j.baselineFinish.dirty()
          console.log(this.scheduleData.scheduleData)

          this.flag = true
        }
        else if (this.flag && (j.completionDate == null && j.plannedFinish != null && j.baselineFinish != j.plannedFinish) || this.flag && (j.completionDate == '' && j.plannedFinish != null && j.baselineFinish != j.plannedFinish)) {
          j.baselineFinish = j.plannedFinish
          this.scheduleData.scheduleData = res.scheduleData
          //j.baselineFinish.dirty()
        }
        else {
          this.flag = false
        }

      }
      for (var i of this.milestoneForm.controls) {
        if (!this.flag && (i['controls']['completionDate'].value == null && i['controls']['plannedFinish'].value != null && i['controls']['baselineFinish'].value != i['controls']['plannedFinish'].value) ||
          !this.flag && (i['controls']['completionDate'].value == '' && i['controls']['plannedFinish'].value != null && i['controls']['baselineFinish'].value != i['controls']['plannedFinish'].value)) {
          i['controls']['baselineFinish'].patchValue(i['controls']['plannedFinish'].value)
          //i['controls']['baselineFinish'].dirty()
          this.flag = true

        }
        else if (this.flag && (i['controls']['completionDate'].value == null && i['controls']['plannedFinish'].value != null && i['controls']['baselineFinish'].value != i['controls']['plannedFinish'].value) ||
          this.flag && (i['controls']['completionDate'].value == '' && i['controls']['plannedFinish'].value != null && i['controls']['baselineFinish'].value != i['controls']['plannedFinish'].value)) {
          i['controls']['baselineFinish'].patchValue(i['controls']['plannedFinish'].value)
          //i['controls']['baselineFinish'].dirty()
        }
        else {
          this.flag = false
        }

      }
      console.log("Inside BaselineProject", this.scheduleData.scheduleData)



      console.log(this.scheduleData.scheduleData)
 
      this.schedulengxdata = [...this.schedulengxdata]
      console.log(this.schedulengxdata)
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

    console.log(baselinelogid)
    console.log(this.logdetails)
    this.baselinelogdetails = this.baselineLogData.find(x => x.baselineLogId == baselinelogid)


    this.baselinelogdetailsprev = this.baselineLogData.find(x => x.logId == this.baselinelogdetails.logId - 1)
    this.baselinelogdetailscurr = this.baselineLogData.find(x => x.logId == this.baselinelogdetails.logId)
    console.log(this.baselinelogdetails.logId)


    this.projectbaselinelogDetailsprev = this.sortByScheduleUniqeIDs(this.logdetails.filter(x => x.baselineLogId == this.baselinelogdetailsprev.baselineLogId))
    this.projectbaselinelogDetailscurr = this.sortByScheduleUniqeIDs(this.logdetails.filter(x => x.baselineLogId == this.baselinelogdetailscurr.baselineLogId))
    console.log("PREVIOUS", this.projectbaselinelogDetailsprev)
    console.log("CURRENT", this.projectbaselinelogDetailscurr)
    console.log(this.prevObj)
    console.log(this.currObj)


    console.log(this.projectbaselinelogDetailscurr)



for(var m = 0; m<this.projectbaselinelogDetailscurr.length; m++)
{
    if(this.projectbaselinelogDetailsprev.some(y=>y.scheduleUniqueId == this.projectbaselinelogDetailscurr[m].scheduleUniqueId))
{
    if(this.projectbaselinelogDetailsprev.find(x=>x.scheduleUniqueId == this.projectbaselinelogDetailscurr[m].scheduleUniqueId).baselineFinish != this.projectbaselinelogDetailscurr[m].baselineFinish)
    {
      this.projectbaselinelogDetailscurr[m].baselinechange = true
    }
    if(this.projectbaselinelogDetailsprev.find(x=>x.scheduleUniqueId == this.projectbaselinelogDetailscurr[m].scheduleUniqueId).plannedFinish != this.projectbaselinelogDetailscurr[m].plannedFinish)
    {
      this.projectbaselinelogDetailscurr[m].plannedchange = true
    }
    if(this.projectbaselinelogDetailsprev.find(x=>x.scheduleUniqueId == this.projectbaselinelogDetailscurr[m].scheduleUniqueId).completionDate != this.projectbaselinelogDetailscurr[m].completionDate)
    {
      this.projectbaselinelogDetailscurr[m].completionchange = true
    }

    if(this.projectbaselinelogDetailsprev.find(x=>x.scheduleUniqueId == this.projectbaselinelogDetailscurr[m].scheduleUniqueId).indicator != this.projectbaselinelogDetailscurr[m].indicator)
    {
      this.projectbaselinelogDetailscurr[m].indicatorchange = true
    }

  }

else{
  if( this.projectbaselinelogDetailscurr[m].baselineFinish != '')
  {
    this.projectbaselinelogDetailscurr[m].baselinechange = true
  }
   if( this.projectbaselinelogDetailscurr[m].plannedFinish != '')
  {
    this.projectbaselinelogDetailscurr[m].plannedchange = true
  }
   if( this.projectbaselinelogDetailscurr[m].completionDate != '')
  {
    this.projectbaselinelogDetailscurr[m].completionchange = true
  }
   if( this.projectbaselinelogDetailscurr[m].indicator != '')
  {
    this.projectbaselinelogDetailscurr[m].indicatorchange = true
  }
}
}
//}

    console.log(this.projectbaselinelogDetailscurr)


   
    this.prevObj = this.projectbaselinelogDetailsprev.map(x => x.scheduleUniqueId)
    this.currObj = this.projectbaselinelogDetailscurr.map(x => x.scheduleUniqueId)

    console.log(this.prevObj)
    console.log(this.currObj)
    //console.log(this.newArray)
    this.myFinalArray = [...this.currObj, ...this.prevObj]
    var unique = this.myFinalArray.filter((v, i, a) => a.indexOf(v) === i);

    for(var k=0; k<unique.length; k++)
    {
      console.log(i)
     // debugger
      this.logdetailsObj.push({

          milestone: this.projectbaselinelogDetailscurr.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x=>x.scheduleUniqueId == unique[k]).milestone : this.projectbaselinelogDetailsprev.find(x=>x.scheduleUniqueId == unique[k]).milestone,
          currplannedFinish: this.projectbaselinelogDetailscurr.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x=>x.scheduleUniqueId == unique[k]).plannedFinish  : 'empty',
          currbaselineFinish: this.projectbaselinelogDetailscurr.some(x=>x.scheduleUniqueId ==unique[k]) ? this.projectbaselinelogDetailscurr.find(x=>x.scheduleUniqueId == unique[k]).baselineFinish : 'empty',
          currcompletionDate: this.projectbaselinelogDetailscurr.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x=>x.scheduleUniqueId == unique[k]).completionDate : 'empty',
          currindicator: this.projectbaselinelogDetailscurr.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x=>x.scheduleUniqueId == unique[k]).indicator : 'empty',
          prevplannedFinish: this.projectbaselinelogDetailsprev.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailsprev.find(x=>x.scheduleUniqueId == unique[k]).plannedFinish : 'empty',
          prevbaselineFinish: this.projectbaselinelogDetailsprev.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailsprev.find(x=>x.scheduleUniqueId == unique[k]).baselineFinish : 'empty',
          prevcompletionDate: this.projectbaselinelogDetailsprev.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailsprev.find(x=>x.scheduleUniqueId == unique[k]).completionDate : 'empty',
          previndicator: this.projectbaselinelogDetailsprev.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailsprev.find(x=>x.scheduleUniqueId == unique[k]).indicator : 'empty',
          baselinechange: this.projectbaselinelogDetailscurr.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x=>x.scheduleUniqueId == unique[k]).baselinechange  : '',
          plannedchange: this.projectbaselinelogDetailscurr.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x=>x.scheduleUniqueId == unique[k]).plannedchange  : '',
          completionchange: this.projectbaselinelogDetailscurr.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x=>x.scheduleUniqueId == unique[k]).completionchange  : '',
          indicatorchange: this.projectbaselinelogDetailscurr.some(x=>x.scheduleUniqueId == unique[k]) ? this.projectbaselinelogDetailscurr.find(x=>x.scheduleUniqueId == unique[k]).indicatorchange  : ''
      })

    }


    console.log(this.logdetails)
    console.log(this.baselinelogdetailsprev)
    console.log(this.baselinelogdetailscurr)
    console.log("PREVIOUS", this.projectbaselinelogDetailsprev)
    console.log("CURRENT", this.projectbaselinelogDetailscurr)
    console.log(this.myFinalArray)
    console.log("Final Object", this.logdetailsObj)
    console.log("Unique ARRAY", unique)

    this.viewContent = false
    this.viewBaseline = false
    this.viewBaselineLogs = false
    this.compareBaselineLogs = true


  }

  submitschedulecharter() {
    this.projecthubservice.isFormChanged = false
    var formValue = this.milestoneForm.getRawValue()
    console.log(formValue)
    if (formValue.filter(x => x.includeInCharter == true).length <= 10) {
    for (var i of formValue) {
      console.log(i)
      if ((i.milestoneType > 0 && i.milestone != '') || (i.milestoneType > 0 && i.milestone != null)) {
        this.schedulecharterobj.push({
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
          includeInCloseout: i.includeInCloseout
        })
       }
       else {
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
          milestoneType: i.milestoneType,
          templateMilestoneId: i.templateMilestoneId,
          includeInCloseout: i.includeInCloseout,
          responsiblePersonId: i.responsiblePersonName ? i.responsiblePersonName.userAdid : null,
          indicator: i.indicator
        })
      }
    }
    console.log(formValue.filter(x => x.includeInCharter == true).length)
    
      
      this.apiService.bulkeditSchedule(this.schedulecharterobj, this.id).then(res => {
          this.projecthubservice.isNavChanged.next(true)
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.successSave.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
    
    console.log(this.schedulecharterobj)
      })
      
    }
    
    else
    {
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

  submitschedulecloseout() {
    this.projecthubservice.isFormChanged = false
var formValue = this.milestoneForm.getRawValue()
if (formValue.filter(x => x.includeInCloseout == true).length <= 20) {
for (var i of formValue) {
  console.log(i)
  if ((i.milestoneType > 0 && i.milestone != '') || (i.milestoneType > 0 && i.milestone != null)) {
    this.schedulecloseoutobj.push({
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
      includeInCloseout: i.includeInCloseout
    })
   }
   else {
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

console.log(this.schedulecloseoutobj)
  })
  
}

else
{
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
console.log(this.scheduleData.scheduleData)
// if(this.mode == 'Project-Close-Out')
// {
//   this.projecthubservice.includeClosedItems.schedule.value == true
// }

if(this.projecthubservice.includeClosedItems.schedule.value)
{
  var baselinedates = this.scheduleData.scheduleData.map(x => {
    return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
  })
}
else{
  var baselinedates = this.scheduleData.scheduleData.filter(x => x.completionDate == null).map(x => {
    return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
  })
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
      console.log("New Milestone scheduleUNIQUEID",control['controls']['scheduleUniqueId'].value)
      if (control['controls']['scheduleUniqueId'].value != '') {
        var baselinedates3 = baselineFormValue.map(x => {
          return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
        })
      }
      else {
        var baselinedates2 = baselineFormValue.filter(x => x.scheduleUniqueId == '').map(x => {
          return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
        })
      }
      // var baselinedates3 = baselineFormValue.map(x => {
      //   return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
      // })
    }

    console.log(this.flag)
    console.log(baselinedates)
    //console.log(baselinedates2)
    console.log(baselinedates3)
    // if(this.flag != true)
    // {

    // }
    // if(baselineFormValue.length < this.scheduleData.scheduleData.length)
    //    {
    //     this.saveScheduleBulkEdit()
    //    }


    if (!this.flag && !baselinedates2 && baselinedates.length == baselinedates3.length && JSON.stringify(baselinedates) != JSON.stringify(baselinedates3)) {
      this.flag = true
      //this.insertArray(control['controls']['projectId'].value)
    }
    if(!this.flag && baselinedates2 && baselinedates.length < baselinedates2.length && JSON.stringify(baselinedates) != JSON.stringify(baselinedates3)) {
      this.flag = true
    }
    if(!this.flag && baselinedates2 && baselinedates.length < baselinedates2.length && JSON.stringify(baselinedates) == JSON.stringify(baselinedates3)) {
      this.flag = false
    }

    //     if(!this.flag && baselinedates.length < baselinedates3.length)
    // {
    //     this.flag = false
    //     this.
    // }


    console.log(baselinedates)
    console.log(baselinedates2)
    console.log(baselinedates3)
    console.log(this.flag)
    if (this.flag && baselineFormValue.filter(x => x.includeInReport == true).length <= 8) {
      this.viewBaseline = true
      this.viewBaselineLogs = true
      this.compareBaselineLogs = false
      this.projecthubservice.isBulkEdit = false

      console.log("hello")
     // this.saveScheduleBulkEdit()
    }

    else if (this.flag && baselineFormValue.filter(x => x.includeInReport == true).length > 8) {
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
    }

    else if (!this.flag && baselineFormValue.filter(x => x.includeInReport == true).length > 8) {
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
    }
    else {

      this.saveScheduleBulkEdit()
    }

  }
  //   @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   event.target.innerWidth;
  // }

  @HostListener('unloaded')
  ngOnDestroy() {
    //this.viewportChange.unsubscribe();
  }
}
