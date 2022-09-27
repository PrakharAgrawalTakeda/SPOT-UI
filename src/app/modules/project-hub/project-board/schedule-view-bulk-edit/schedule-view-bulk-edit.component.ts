import { Component, HostListener, OnDestroy, OnInit, ElementRef, ViewChild, ViewEncapsulation, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment';
import { startWith, map } from 'rxjs';

import { FuseAlertService } from '@fuse/components/alert';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from '../../common/project-api.service';
import { AuthService } from 'app/core/auth/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-schedule-view-bulk-edit',
  templateUrl: './schedule-view-bulk-edit.component.html',
  styleUrls: ['./schedule-view-bulk-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ScheduleViewBulkEditComponent implements OnInit {
  @Input() scheduleData: any;
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @Input() editable: boolean
  @ViewChild('scheduleTable') scheduleTable: any;
  editing = {};
  ColumnMode = ColumnMode;
  schedulengxdata: any = []
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
  roleMaster: any = {}
  baselineCount: any = {}
  baselineLog: any = {}
  baselineLogObj: any = {};
  scheduledataDB: any = {}
  scheduledataDb = []
  milestonesSubmit = []
  flag: boolean = false
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService,
    private portApiService: PortfolioApiService,
    private authService: AuthService, private _elementRef: ElementRef, private indicator: SpotlightIndicatorsService,
    private router: Router, private _Activatedroute: ActivatedRoute, public fuseAlert: FuseConfirmationService, private changeDetectorRef: ChangeDetectorRef,
    private msalService: MsalService) {
    this.milestoneForm.valueChanges.subscribe(res => {
      console.log("Milestone form Value", this.milestoneForm.getRawValue())
      console.log("Milstone Schedule Data Array", this.scheduleData.scheduleData)
      if (this.viewContent == true) {
        //this.saveScheduleBulkEdit()
        console.log("DB", this.scheduledataDb)
        console.log("SUB", this.scheduleObj)
        if (JSON.stringify(this.scheduledataDb) != JSON.stringify(this.scheduleObj)) {
          this.projecthubservice.isFormChanged = true
        }
        else {
          this.projecthubservice.isFormChanged = false
        }
      }
    })

  }

  ngOnInit(): void {
    this.dataloader()

  }



  getFunctionOwner(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
  }



  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getProjectBaseline(this.id).then((count: any) => {
      this.apiService.getprojectviewdata(this.id).then((res: any) => {
        this.portApiService.getfilterlist().then(filterres => {
          this.authService.lookupMaster().then((lookup: any) => {
            this.baselineCount = count
            console.log(this.baselineCount)
            console.log('LookUp Data', lookup)
            this.lookUpData = lookup
            console.log('Filter Criteria:', filterres)
            this.filterCriteria = filterres
            console.log("Milestone info:", res)
            this.scheduleData = res
            this.scheduledataDB = res.scheduleData
            console.log(this.id)
            if (res.scheduleData.length != 0) {
              this.scheduledataDb = this.scheduleData.scheduleData.map(x => {
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
              for (var i of res.scheduleData) {
                console.log(res.scheduleData)
                this.milestoneForm.push(new FormGroup({
                  scheduleUniqueId: new FormControl(i.scheduleUniqueId),
                  projectId: new FormControl(i.projectId),
                  milestone: new FormControl(i.milestone),
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
                console.log(this.milestoneForm.controls.filter(x=> x.value.completionDate != null))
                  if(this.milestoneForm.controls.filter(x=> x.value.completionDate != null))
                  {
                    for(let control of this.milestoneForm.controls.filter(x=> x.value.completionDate != null))
                    {
                      console.log(control)
                      console.log(control['controls']['baselineFinish'])
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

            console.log('MilestoneForm:', this.milestoneForm.getRawValue())
            this.viewContent = true
          })
        })
      })
    })

  }

  getLookupName(lookUpId: string): string {

    var lookup = this.lookUpData.find(x => x.lookUpId == lookUpId)

    return lookup ? lookup.lookUpName : ""

  }


  // formValue() {
  //   var form = this.milestoneForm.getRawValue()
  //   if (form.length > 0) {
  //     this.milestonesSubmit = []
  //     for (var i of form) {
  //       this.milestonesSubmit.push({
  //         "scheduleUniqueId": i.scheduleUniqueId,
  //         "projectId": i.projectId,
  //         "milestone": i.milestone,
  //         "plannedFinish": i.plannedFinish ? moment(i.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
  //         "baselineFinish": i.baselineFinish ? moment(i.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
  //         "responsiblePersonName": Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userDisplayName,
  //         "completionDate": i.completionDate ? moment(i.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
  //         "comments": i.comments,
  //         "includeInReport": i.includeInReport,
  //         "functionGroupId": i.function == null ? null : i.function.lookUpId,
  //         "includeInCharter": i.includeInCharter,
  //         "milestoneType": i.milestoneType,
  //         "templateMilestoneId": i.templateMilestoneId,
  //         "includeInCloseout": i.includeInCloseout,
  //         "responsiblePersonId": Object.keys(i.responsiblePersonName).length == 0 ? null : i.responsiblePersonName.userAdid,
  //         "indicator": i.indicator
          
  //       })
  //     }
  //   }
  //   else {
  //     this.milestonesSubmit = []
  //   }
  // }

  addMilestoneRecord() {

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
      baselineFinish: '',
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

    this.scheduleData.scheduleData = [...this.scheduleData.scheduleData, ...j]
    console.log(this.scheduleData.scheduleData)
    console.log(this.milestoneTableEditStack)
    this.milestoneTableEditRow(this.scheduleData.scheduleData.length - 1)
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
      "message": "Are you sure you want to save the changes permanently? ",
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
    const scheduleAlert = this.fuseAlert.open(comfirmConfig)

    scheduleAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {

    this.milestoneForm.removeAt(rowIndex)
    this.scheduleData.scheduleData.splice(rowIndex, 1)
    if (this.milestoneTableEditStack.includes(rowIndex)) {

      this.milestoneTableEditStack.splice(this.milestoneTableEditStack.indexOf(rowIndex), 1)

    }

    this.milestoneTableEditStack = this.milestoneTableEditStack.map(function (value) {

      return value > rowIndex ? value - 1 : value;

    })
    this.scheduleData.scheduleData = [...this.scheduleData.scheduleData];


  }
})
  }

  milestoneTableEditRow(row: number) {
    if (!this.milestoneTableEditStack.includes(row)) {
      this.milestoneTableEditStack.push(row)
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
  getlinkname(uid: string): string {
    let temp = this.scheduleData.links.find(x => x.linkItemId == uid)
    temp = this.scheduleData.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
    return "This milestone is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle

  }

  baselineForm = new FormGroup({
    baselineComment: new FormControl(''),
    counter: new FormControl()
  })



  submitjustification() {
    if(this.baselineForm.value.baselineComment.length <= 0)
    {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Please add a justification",
      "message": "",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warning"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Okay",
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
    this.viewBaseline = true
  }
  else{
    console.log(this.projecthubservice)
    this.teamMemberAdId = this.msalService.instance.getActiveAccount().localAccountId
    //if (this.projecthubservice.itemid != "new") {
    this.apiService.getProjectBaselineLog(this.id).then((res: any) => {
      this.baselineLog = res.sort((a, b) => {
        return b.baselineCount - a.baselineCount;
      })
      console.log(this.baselineLog)
      this.baselineLogObj = this.baselineLog.find(x => x.projectId == this.id)
      console.log(this.baselineLogObj)
      if (this.baselineLog.length == 0) {
        var justificationObjNew = {
          baselineLogId: "new",
          projectId: this.id,
          baselineCount: 1,
          teamMemberAdId: this.teamMemberAdId,
          modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          baselineComment: this.baselineForm.value.baselineComment,
          includeInCloseout: false,
          includeSlipChart: false
        }
        console.log(justificationObjNew)
        
      
        this.apiService.addProjectBaselineLog(justificationObjNew).then(res => {
          this.viewContent = true
          this.viewBaseline = false

          this.projecthubservice.submitbutton.next(true)
          this.saveScheduleBulkEdit()
        })
       

      }

      else {
        if (this.baselineForm.value.counter == false) {
          var justificationObj = {
            baselineLogId: "new",
            projectId: this.baselineLogObj.projectId,
            baselineCount: this.baselineLogObj.baselineCount,
            teamMemberAdId: this.baselineLogObj.teamMemberAdId,
            modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
            baselineComment: this.baselineForm.value.baselineComment,
            includeInCloseout: this.baselineLogObj.includeInCloseout,
            includeSlipChart: this.baselineLogObj.includeSlipChart
          }
          console.log(justificationObj)
          this.apiService.addProjectBaselineLog(justificationObj).then(res => {
            this.viewContent = true
            this.viewBaseline = false

            this.projecthubservice.submitbutton.next(true)
            this.saveScheduleBulkEdit()
          })
        }
        else {
          var justificationObj = {
            baselineLogId: "new",
            projectId: this.baselineLogObj.projectId,
            baselineCount: this.baselineLogObj.baselineCount + 1,
            teamMemberAdId: this.baselineLogObj.teamMemberAdId,
            modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
            baselineComment: this.baselineForm.value.baselineComment,
            includeInCloseout: this.baselineLogObj.includeInCloseout,
            includeSlipChart: this.baselineLogObj.includeSlipChart
          }
          var baselineObj = {
            projectId: this.baselineLogObj.projectId,
            baselineCount: this.baselineCount.baselineCount + 1,
            teamMemberAdId: this.baselineLogObj.teamMemberAdId,
            modifiedDate: moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
          }
          console.log(justificationObj)
          console.log(baselineObj)
          this.apiService.editProjectBaseline(baselineObj).then((count: any) => {
            //this.viewContent = true

            this.apiService.addProjectBaselineLog(justificationObj).then(res => {
              this.viewContent = true
              //this.viewBaseline = false

              this.projecthubservice.submitbutton.next(true)
              this.saveScheduleBulkEdit()
            })
          })
        }
      }
    })

  }
}

  cancelJustification() {
    this.viewBaseline = false
    this.projecthubservice.isBulkEdit = true
    //this.scheduleData.scheduleData = [...this.scheduleData.scheduleData]
  }

  saveScheduleBulkEdit() {
    //this.formValue()
    if (JSON.stringify(this.scheduledataDb) != JSON.stringify(this.scheduleObj)) {
      console.log(this.scheduleObj)
      this.projecthubservice.isFormChanged = false
      //this.formValue()
    // var comfirmConfig: FuseConfirmationConfig = {
    //   "title": "Save Changes?",
    //   "message": "Are you sure you want to save the changes permanently? ",
    //   "icon": {
    //     "show": true,
    //     "name": "heroicons_outline:exclamation",
    //     "color": "warn"
    //   },
    //   "actions": {
    //     "confirm": {
    //       "show": true,
    //       "label": "Save",
    //       "color": "warn"
    //     },
    //     "cancel": {
    //       "show": true,
    //       "label": "Cancel"
    //     }
    //   },
    //   "dismissible": true
    // }
    // const scheduleAlert = this.fuseAlert.open(comfirmConfig)

    // scheduleAlert.afterClosed().subscribe(close => {
    //   if (close == 'confirmed') {
        var formValue = this.milestoneForm.getRawValue()
        console.log(formValue)

        for (var i of formValue) {
          console.log(i)
          this.scheduleObj.push({
            scheduleUniqueId: i.scheduleUniqueId,
            projectId: i.projectId,
            milestone: i.milestone,
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
        console.log(this.scheduleObj)
        this.apiService.bulkeditSchedule(this.scheduleObj, this.id).then(res => {
          //this.projecthubservice.isBulkEdit = false
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
          this.projecthubservice.submitbutton.next(true)
        })
      }
      }
  //   })
  // }

  baselineProject() {
    for (var i of this.milestoneForm.controls) {
      console.log(i['controls']['completionDate'].value)
     // i['controls']['baselineFinish'].patchValue(i['controls']['plannedFinish'].value)
       if(i['controls']['completionDate'].value == null || i['controls']['completionDate'].value == '')
       {
         i['controls']['baselineFinish'].patchValue(i['controls']['plannedFinish'].value)
       }
      
    }
    for (var j of this.scheduleData.scheduleData) {
      console.log(j.completionDate)
      //j.baselineFinish = j.plannedFinish
       if(j.completionDate == null || j.completionDate == '')
       {
         j.baselineFinish = j.plannedFinish
       }

    }
    this.flag = true
    this.scheduleData.scheduleData = [...this.scheduleData.scheduleData]
    console.log(this.milestoneForm)
  }
  debugger
  submitschedule() {
  
    var baselineFormValue = this.milestoneForm.getRawValue()
    // if (baselineFormValue.filter(x => x.includeInReport == true).length > 8)
    //  {
    //   var comfirmConfig: FuseConfirmationConfig = {
    //     "title": "Only 8 milestones can be included in project dashboard",
    //     "message": "",
    //     "icon": {
    //       "show": true,
    //       "name": "heroicons_outline:exclamation",
    //       "color": "warning"
    //     },
    //     "actions": {
    //       "confirm": {
    //         "show": true,
    //         "label": "Okay",
    //         "color": "primary"
    //       },
    //       "cancel": {
    //         "show": false,
    //         "label": "Cancel"
    //       }
    //     },
    //     "dismissible": true
    //   }
    //   const alert = this.fuseAlert.open(comfirmConfig)
    //   this.projecthubservice.isBulkEdit = true
    // }
    // else
    // {
      var baselinedates = this.scheduleData.scheduleData.map(x => {
        return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
      })
      var baselinedates2 = baselineFormValue.map(x => {
        return x.baselineFinish && x.baselineFinish != '' ? moment(x.baselineFinish).format("YYYY-MM-DD HH:mm:ss") : x.baselineFinish
      })
  
      if (!this.flag && JSON.stringify(baselinedates) != JSON.stringify(baselinedates2)) {
        this.flag = true
      }
    //}

    console.log(baselinedates)
    console.log(baselinedates2)
    console.log(this.flag)
    if (this.flag && baselineFormValue.filter(x => x.includeInReport == true).length < 8) {
      this.viewBaseline = true
      this.projecthubservice.isBulkEdit = false
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
        "label": "Okay",
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
        "label": "Okay",
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


  // cancelschedule() {
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
  //         "label": "Yes",
  //         "color": "warn"
  //       },
  //       "cancel": {
  //         "show": true,
  //         "label": "No"
  //       }
  //     },
  //     "dismissible": true
  //   }
  //   const scheduleAlert = this.fuseAlert.open(comfirmConfig)

  //   scheduleAlert.afterClosed().subscribe(close => {
  //     if (close == 'confirmed') {
  //       this.projecthubservice.toggleDrawerOpen('', '', [], '')
  //     }
  //   })
  // }

  @HostListener('unloaded')
  ngOnDestroy(): void {
  }
}
