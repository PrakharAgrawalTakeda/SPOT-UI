import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectHubService } from '../../project-hub.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthService } from '../../../../core/auth/auth.service'
import * as moment from 'moment';
import { ProjectApiService } from '../../common/project-api.service';
import { Router } from "@angular/router";
import { GlobalBusinessCaseOptions } from "../../../../shared/global-business-case-options";
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-schedule-view-edit',
  templateUrl: './schedule-view-edit.component.html',
  styleUrls: ['./schedule-view-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class ScheduleViewEditComponent implements OnInit {
  @Input() viewElements: any = ['milestone', 'plannedFinish', 'baselineFinish', 'responsiblePerson', 'functionOwner', 'comments', 'completionDate', 'includeInReport']
  formFieldHelpers: string[] = [''];
  lookupdata: any = []
  schedule: any = {}
  today = new Date();
  item: any = {}
  functionSets: any = []
  milestoneMsReasonCodeDropDown: any = []
  milestoneName: any;
  canSubmit: boolean = true
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService,
    public auth: AuthService, private _elementRef: ElementRef, private router: Router,public fuseAlert: FuseConfirmationService) {
    //this.scheduleForm.controls.function.valueChanges.subscribe(res => (console.log(res)))
  }


  scheduleForm = new FormGroup({
    milestone: new FormControl(''),
    plannedFinish: new FormControl(''),
    baselineFinish: new FormControl(''),
    comments: new FormControl(''),
    completionDate: new FormControl(''),
    usersingle: new FormControl(''),
    usersingleid: new FormControl(''),
    function: new FormControl(null),
    includeInCharter: new FormControl(false),
    includeInReport: new FormControl(false),
    includeInBusinessCase: new FormControl(false),
    missedMsreasonCode: new FormControl(null)
  })
  ngOnInit(): void {
    this.getllookup()
  }
  isReasonRequiredPassed() {
    var formValue = this.scheduleForm.getRawValue()
    if (formValue.completionDate) {
      if (formValue.missedMsreasonCode && Object.keys(formValue.missedMsreasonCode).length > 0) {
        return true
      }
      else {
        if (formValue.baselineFinish) {
          if (moment(formValue.baselineFinish).diff(moment(formValue.completionDate), "days") >= 0) {
            return true
          }
          return false
        }
        else {
          return true
        }
      }
    }
    return true
  }
  dataloader() {
    if (this.projecthubservice.itemid != "new") {
      this.apiService.scheduleSingle(this.projecthubservice.itemid).then((res: any) => {
        console.log(this.projecthubservice.itemid)
        this.schedule = res
        console.log(this.projecthubservice)
        console.log('res')
        console.log(res)
        this.milestoneName = res.milestone
        this.scheduleForm.patchValue({
          milestone: (res.milestoneType > 0 ? res.milestoneType == 1 ? this.milestoneName.replace('Execution Start - ', '') : res.milestoneType == 2 ? this.milestoneName.replace('Execution End - ', '') : res.milestone : res.milestone),
          plannedFinish: res.plannedFinish,
          baselineFinish: res.baselineFinish,
          comments: res.comments,
          completionDate: res.completionDate,
          usersingle: res.responsiblePersonName,
          usersingleid: res.responsiblePersonId,
          includeInCharter: res.includeInCharter,
          includeInReport: res.includeInReport,
          includeInBusinessCase: res.includeInBusinessCase,
          missedMsreasonCode: res.missedMsreasonCode ? this.lookupdata.find(x => x.lookUpId == res.missedMsreasonCode) : null
        })
        this.scheduleForm.controls['baselineFinish'].disable()
        //this.scheduleForm.controls['plannedFinish'].disable()

        if (this.schedule.functionGroupId != "") {
          this.scheduleForm.controls.function.patchValue(this.lookupdata.find(x => x.lookUpId == res.functionGroupId))
        }

        if (this.projecthubservice.all.length > 0) {
          if (this.projecthubservice.all.filter(x => x.includeInReport == true).length >= 8) {
            if (this.scheduleForm.value.includeInReport != true) {
              this.scheduleForm.controls['includeInReport'].disable()
            }
          }
          if (this.projecthubservice.all.filter(x => x.includeInBusinessCase == true).length >= 8) {
            if (this.scheduleForm.value.includeInBusinessCase != true) {
              this.scheduleForm.controls['includeInBusinessCase'].disable()
            }
          }
          if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length >= 10) {
            if (this.scheduleForm.value.includeInCharter != true) {
              this.scheduleForm.controls['includeInCharter'].disable()
            }
          }
        }
        this.projecthubservice.isFormChanged = false
      })
    }
    else {
      this.scheduleForm.patchValue({
        milestone: "",
        plannedFinish: null,
        baselineFinish: null,
        comments: "",
        completionDate: null,
        usersingle: "",
        usersingleid: "",
        includeInCharter: false,
        includeInReport: false,
        includeInBusinessCase: false,
        missedMsreasonCode: null
      })
      this.scheduleForm.controls['baselineFinish'].disable()
      //this.scheduleForm.controls['plannedFinish'].disable()


      if (this.projecthubservice.all.length == 0) {
        console.log(this.projecthubservice.all)
      }
      else {
        if (this.projecthubservice.all.filter(x => x.includeInReport == true).length >= 8) {
          this.scheduleForm.controls['includeInReport'].disable()
        }
        if (this.projecthubservice.all.filter(x => x.includeInBusinessCase == true).length >= 8) {
          this.scheduleForm.controls['includeInBusinessCase'].disable()
        }
        if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length >= 10) {
          this.scheduleForm.controls['includeInCharter'].disable()
        }
      }
      this.projecthubservice.isFormChanged = false
    }
    this.scheduleForm.valueChanges.subscribe(res => {
      this.projecthubservice.isFormChanged = true
    })
  }

  getllookup() {
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
      this.functionSets = this.lookupdata.filter(x => x.lookUpParentId == '0edea251-09b0-4323-80a0-9a6f90190c77')
      this.milestoneMsReasonCodeDropDown = this.lookupdata.filter(x => x.lookUpParentId == '95eb6b0c-73dc-42c2-bb01-a2486c98fab6')
      this.dataloader()
      this.scheduleForm.controls.function.patchValue('')
      this.projecthubservice.isFormChanged = false
    })
  }
  viewElementChecker(element: string): boolean {
    return this.viewElements.some(x => x == element)
  }
  submitScheduleHandler() {
    if (this.isReasonRequiredPassed()) {
      this.submitschedule()
    }
    else {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Missed Milestone Reason Code is Required for Milestones when Completion Date is Greater than Baseline Finish Date",
        "message": "",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warning"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Ok",
            "color": "primary"
          },
          "cancel": {
            "show": false,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const scheduleAlert = this.fuseAlert.open(comfirmConfig)
    }
  }
  submitschedule() {
    if(this.canSubmit)
    {
      this.canSubmit = false
      this.projecthubservice.isFormChanged = false

      if (this.scheduleForm.valid) {
        if (this.projecthubservice.itemid == "new") {
          var mainObjnew = {
            scheduleUniqueId: "new",
            projectId: this.projecthubservice.projectid,
            milestone: (this.schedule.milestoneType > 0 ? (this.schedule.milestoneType == 1 ? 'Execution Start - '.concat(this.scheduleForm.value.milestone) : (this.schedule.milestoneType == 2 ? 'Execution End - '.concat(this.scheduleForm.value.milestone) : this.scheduleForm.value.milestone)) : this.scheduleForm.value.milestone),
            plannedFinish: moment(this.scheduleForm.value.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
            baselineFinish: this.scheduleForm.controls.baselineFinish.value ? moment(this.scheduleForm.value.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null,
            functionGroupId: this.scheduleForm.value.function ? this.scheduleForm.value.function.lookUpId : null,
            comments: this.scheduleForm.value.comments,
            completionDate: moment(this.scheduleForm.value.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
            includeInReport: this.scheduleForm.value.includeInReport,
            includeInBusinessCase: this.scheduleForm.value.includeInBusinessCase,
            indicator: "Grey",
            includeInCharter: this.scheduleForm.value.includeInCharter,
            milestoneType: this.schedule.milestoneType,
            templateMilestoneId: this.schedule.templateMilestoneId,
            includeInCloseout: this.schedule.includeInCloseout,
            responsiblePersonId: this.scheduleForm.value.usersingleid,
            responsiblePersonName: this.scheduleForm.value.usersingle,
            businessOptionId: "",
            missedMsreasonCode: this.scheduleForm.value.missedMsreasonCode ? this.scheduleForm.value.missedMsreasonCode.lookUpId : null
          }
          //Function when null
          if (this.scheduleForm.controls['function'].value == "") {
            mainObjnew.functionGroupId = null
          }
          if (this.scheduleForm.controls['includeInReport'].disabled) {
            mainObjnew.includeInReport = false
          }
          if (this.scheduleForm.controls['includeInBusinessCase'].disabled) {
            mainObjnew.includeInBusinessCase = false
          }
          if (this.scheduleForm.controls['includeInCharter'].disabled) {
            mainObjnew.includeInBusinessCase = false
          }
  
          // //Planned Finish
          if (mainObjnew.plannedFinish == "Invalid date") {
            mainObjnew.plannedFinish = null
          }
          //Completion
          if (mainObjnew.completionDate == "Invalid date") {
            mainObjnew.completionDate = null
          }
  
          //Baseline
          if (mainObjnew.baselineFinish == "Invalid date") {
            mainObjnew.baselineFinish = null
          }
          if (this.router.url.includes('option-2')) {
            mainObjnew.businessOptionId = GlobalBusinessCaseOptions.OPTION_2;
            this.apiService.addTimelineForOption(mainObjnew).then(res => {
              this.projecthubservice.submitbutton.next(true)
              this.projecthubservice.toggleDrawerOpen('', '', [], '')
              this.canSubmit = true
            })
          } else {
            if (this.router.url.includes('option-3')) {
              mainObjnew.businessOptionId = GlobalBusinessCaseOptions.OPTION_3;
              this.apiService.addTimelineForOption(mainObjnew).then(res => {
                this.projecthubservice.submitbutton.next(true)
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
                this.canSubmit = true
              })
            } else {
              if (this.router.url.includes('recommended-option')) {
                mainObjnew.businessOptionId = "";
                this.apiService.addTimelineForOption(mainObjnew).then(res => {
                  this.projecthubservice.submitbutton.next(true)
                  this.projecthubservice.toggleDrawerOpen('', '', [], '')
                  this.canSubmit = true
                })
              } else {
                this.apiService.addSchedule(mainObjnew).then(() => {
                  this.projecthubservice.toggleDrawerOpen('', '', [], '')
                  this.projecthubservice.submitbutton.next(true)
                  this.projecthubservice.isNavChanged.next(true)
                  this.canSubmit = true
                })
              }
  
            }
          }
        }
        else {
          console.log(this.scheduleForm.controls.baselineFinish.value)
          var mainObj = {
            scheduleUniqueId: this.schedule.scheduleUniqueId,
            projectId: this.schedule.projectId,
            milestone: (this.schedule.milestoneType > 0 ? (this.schedule.milestoneType == 1 ? 'Execution Start - '.concat(this.scheduleForm.value.milestone) : (this.schedule.milestoneType == 2 ? 'Execution End - '.concat(this.scheduleForm.value.milestone) : this.scheduleForm.value.milestone)) : this.scheduleForm.value.milestone),
            plannedFinish: moment(this.scheduleForm.value.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
            baselineFinish: moment(this.schedule.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
            functionGroupId: this.scheduleForm.value.function ? this.scheduleForm.value.function.lookUpId : null,
            comments: this.scheduleForm.value.comments,
            completionDate: moment(this.scheduleForm.value.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
            includeInReport: this.scheduleForm.value.includeInReport,
            includeInBusinessCase: this.scheduleForm.value.includeInBusinessCase,
            indicator: this.schedule.indicator,
            includeInCharter: this.scheduleForm.value.includeInCharter,
            milestoneType: this.schedule.milestoneType,
            templateMilestoneId: this.schedule.templateMilestoneId,
            includeInCloseout: this.schedule.includeInCloseout,
            responsiblePersonId: this.scheduleForm.value.usersingleid,
            responsiblePersonName: this.scheduleForm.value.usersingle,
            missedMsreasonCode: this.scheduleForm.value.missedMsreasonCode ? this.scheduleForm.value.missedMsreasonCode.lookUpId : null
          }
          //Function when null
          // console.log(this.scheduleForm.controls.baselineFinish.value)
          // console.log(mainObj.baselineFinish)
          if (this.scheduleForm.controls['function'].value == "") {
            mainObj.functionGroupId = null
          }
  
          //Planned Finish
          if (mainObj.plannedFinish == "Invalid date") {
            mainObj.plannedFinish = null
          }
  
          //Completion
          if (mainObj.completionDate == "Invalid date") {
            mainObj.completionDate = null
          }
          //console.log(this.schedule.baselineFinish)
          //Baseline
          if (mainObj.baselineFinish == "Invalid date") {
            mainObj.baselineFinish = null
          }
          // if (mainObj.baselineFinish == moment(this.today).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')) {
          //   mainObj.baselineFinish = null
          // }
  
          console.log("final object")
          console.log(mainObj)
          this.apiService.editSchedule(this.projecthubservice.projectid, mainObj).then(res => {
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.isNavChanged.next(true)
            this.canSubmit = true
          })
        }
      }
    }
    
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
  }

}
