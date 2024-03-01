import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from '../../project-hub.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common'
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../project-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'app/core/auth/auth.service';
import {Constants} from "../../../../shared/constants";
import {GlobalBusinessCaseOptions} from "../../../../shared/global-business-case-options";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit, OnChanges, OnDestroy {
  //@Input() scheduleData: any;
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() baselineLog: any = {}
  @Input() lookup: any
  @Input() editable: boolean
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Baseline-Log' |'Business-Case' = 'Normal'
  @ViewChild('scheduleTable') scheduleTable: any;
  timelineEditOption: 'TimelineEditOptionO1' | 'TimelineEditOptionO2' | 'TimelineEditOptionO3'
  getRowClass = (row) => {
    return {
      'row-color1': row.completionDate != null && this.mode == 'Normal',
    };
  };
  schedulengxdata: any = []
  isclosed: boolean = false
  today = new Date()
  variance: any;
  baselineCount: any = {}
  id: string = ""
  localIncludedItems = new FormGroup({
    toggle: new FormControl(false)
  })
  milestoneForm = new FormArray([])
  scheduleData: any = []
  lookUpData: any = []
  baselinelogTableEditStack: any = []
  optionExecutions = new FormGroup({
      optionExecutionStart : new FormControl(""),
      optionExecutionEnd : new FormControl("")
  })
  optionType: string = ''
  private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(public projecthubservice: ProjectHubService,
    private authService: AuthService,
    private indicator: SpotlightIndicatorsService,
    private apiService: ProjectApiService,
    private router: Router,
    public fuseAlert: FuseConfirmationService,
    private _Activatedroute: ActivatedRoute) {
    this.projecthubservice.includeClosedItems.schedule.subscribe(res => {
      this.changeschedule(res)
      console.log(res)
    })
    this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res=>{
        if (this.optionType=='option-2'){
            this.apiService.getBusinessCaseOptionInfoData(this.id, Constants.OPTION_2_ID.toString()).then((bcOptionInfo: any) => {
                this.optionExecutions.controls.optionExecutionEnd.patchValue(bcOptionInfo.executionEndDate)
                this.optionExecutions.controls.optionExecutionStart.patchValue(bcOptionInfo.executionStartDate)
            })
        }
        if (this.optionType=='option-3'){
            this.apiService.getBusinessCaseOptionInfoData(this.id, Constants.OPTION_3_ID.toString()).then((bcOptionInfo: any) => {
                this.optionExecutions.controls.optionExecutionEnd.patchValue(bcOptionInfo.executionEndDate)
                this.optionExecutions.controls.optionExecutionStart.patchValue(bcOptionInfo.executionStartDate)
            })
        }
    })

  }
  ngOnChanges(changes: SimpleChanges): void {
      if(this.mode=='Business-Case'){
          this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id")
          if (this.router.url.includes('recommended-option')){
              this.apiService.getTimelineByOption(this.id ,GlobalBusinessCaseOptions.OPTION_1).then((res) => {
                  this.schedulengxdata = res
              })
          }
          if (this.router.url.includes('option-2')){
              this.apiService.getTimelineByOption(this.id ,GlobalBusinessCaseOptions.OPTION_2).then((res) => {
                  this.schedulengxdata = res
              })
          }
          if (this.router.url.includes('option-3')){
              this.apiService.getTimelineByOption(this.id ,GlobalBusinessCaseOptions.OPTION_3).then((res) => {
                  this.schedulengxdata = res
              })
          }
      }
      // if(this.mode == 'Project-Charter') 
      // {
      //   this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id")
      //   for (var i of this.scheduleData) {
      //       i.variance = this.calculateVariance(i)
      //   }
      //   if (this.isclosed == false && this.mode == 'Project-Charter') {
      //       this.schedulengxdata = this.scheduleData.filter(x => x.completionDate == null)
      //   }
      //   else if(this.isclosed == true && this.mode == 'Project-Charter'){
      //       this.schedulengxdata = this.scheduleData
      //   }
      //   else if(this.isclosed == true && this.mode == 'Project-Charter'){
      //       this.schedulengxdata = this.scheduleData
      //   }
      //   else{
      //       this.schedulengxdata = this.scheduleData
      //   }
    //}
    else{
          this.scheduleData = this.projectViewDetails.scheduleData
          for (var i of this.scheduleData) {
              i.variance = this.calculateVariance(i)
          }
          if (this.isclosed == false && this.mode == 'Normal') {
              this.schedulengxdata = this.scheduleData.filter(x => x.completionDate == null)
          }
          else if(this.isclosed == true && this.mode == 'Normal'){
              this.schedulengxdata = this.scheduleData
          }
          else if(this.isclosed == true && this.mode == 'Normal'){
              this.schedulengxdata = this.scheduleData
          }
          else{
              this.schedulengxdata = this.scheduleData
          }
      }
    //this.localIncludedItems.controls.toggle.patchValue(event)
    //this.localIncludedItems.controls.toggle.markAsPristine()
  }

  baselinelogTableEditRow(row: number) {
    if (!this.baselinelogTableEditStack.includes(row)) {
      this.baselinelogTableEditStack.push(row)
    }
  }
  ngOnInit(): void {
    this.authService.lookupMaster().then((lookup: any) => {
      this.lookUpData = lookup
    })
    if(this.mode == 'Normal')
    {
        this.schedulengxdata = this.projectViewDetails.scheduleData.filter(x => x.completionDate == null)
    }else{
        if(this.mode == 'Project-Close-Out')
        {
            this.schedulengxdata = this.scheduleData
        }
        if(this.mode == 'Project-Charter')
        {
            this.schedulengxdata = this.scheduleData
        }
        if(this.mode == 'Business-Case')
        {
            this.optionExecutions.disable()
            if (this.router.url.includes('recommended-option')){
                this.timelineEditOption = 'TimelineEditOptionO1'
                this.schedulengxdata = this.projectViewDetails.scheduleData
                this.optionType = 'recommended-option'
            }
            if (this.router.url.includes('option-2')){
                this.timelineEditOption = 'TimelineEditOptionO2'
                this.optionType = 'option-2'
                this.apiService.getTimelineByOption(this.id,Constants.OPTION_2_ID.toString()).then((res) => {
                    this.schedulengxdata = res
                })
                this.apiService.getBusinessCaseOptionInfoData(this.id, Constants.OPTION_2_ID.toString()).then((bcOptionInfo: any) => {
                    this.optionExecutions.controls.optionExecutionEnd.patchValue(bcOptionInfo.executionEndDate)
                    this.optionExecutions.controls.optionExecutionStart.patchValue(bcOptionInfo.executionStartDate)
                })
            }
            if (this.router.url.includes('option-3')){
                this.timelineEditOption = 'TimelineEditOptionO3'
                this.optionType = 'option-3'
                this.apiService.getTimelineByOption(this.id,Constants.OPTION_3_ID.toString()).then((res) => {
                    this.schedulengxdata = res
                })
                this.apiService.getBusinessCaseOptionInfoData(this.id, Constants.OPTION_3_ID.toString()).then((bcOptionInfo: any) => {
                    this.optionExecutions.controls.optionExecutionEnd.patchValue(bcOptionInfo.executionEndDate)
                    this.optionExecutions.controls.optionExecutionStart.patchValue(bcOptionInfo.executionStartDate)
                })
            }
        }
    }
    this.scheduleData = this.projectViewDetails.scheduleData
    for (var i of this.scheduleData) {
      i.includeInReport = i.projectId == this.projectid ? i.includeInReport : this.projectViewDetails.links.find(t => t.linkItemId == i.scheduleUniqueId).includeInReport
    }
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    for (var i of this.scheduleData) {
    this.milestoneForm.push(new FormGroup({
         comment: new FormControl(i.comments == null ? false : i.comments),
         includeInReport: new FormControl(i.includeInReport == null ? false : i.includeInReport)
       }))
      }
  }

  // getCount() {

  //   return this.baselineCount.baselineCount
  // }

  getLookupName(lookUpId: string): string {

    var lookup = this.lookUpData.find(x => x.lookUpId == lookUpId)

    return lookup ? lookup.lookUpName : ""

  }

  toggleSchedule(event: any) {
    this.projecthubservice.includeClosedItems.schedule.next(event.checked)
  }

  submitvariance()
  {

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
  deleteSchedule(id: string) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Milestone?",
      "message": "Are you sure you want to remove this milestone permanently? ",
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
    const scheduleAlert = this.fuseAlert.open(comfirmConfig)

    scheduleAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.apiService.deleteSchedule(this.projectid, id).then(res => {
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.isNavChanged.next(true)
        })
      }
    })

  }
    deleteScheduleForOption(id: string) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Remove Milestone?",
            "message": "Are you sure you want to remove this record permanently? ",
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
        const scheduleAlert = this.fuseAlert.open(comfirmConfig)

        scheduleAlert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                if (this.router.url.includes('recommended-option')){
                    this.apiService.deleteScheduleForOption(id,GlobalBusinessCaseOptions.OPTION_1,  this.projectid).then(res => {
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.isNavChanged.next(true)
                    })
                }
                if (this.router.url.includes('option-2')){
                    this.apiService.deleteScheduleForOption(id,GlobalBusinessCaseOptions.OPTION_2,  this.projectid).then(res => {
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.isNavChanged.next(true)
                    })
                }
                if (this.router.url.includes('option-3')){
                    this.apiService.deleteScheduleForOption(id,GlobalBusinessCaseOptions.OPTION_3,  this.projectid).then(res => {
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.isNavChanged.next(true)
                    })
                }

            }
        })

    }
  changeschedule(event: any) {

    // console.log(this.scheduleData)
    if (event == true) {
      this.schedulengxdata = this.scheduleData
      this.isclosed = true
      // console.log(this.schedulengxdata)

    }
    else {
      this.schedulengxdata = this.scheduleData.filter(x => x.completionDate == null)
      this.isclosed = false
      // console.log(this.schedulengxdata)
    }
    this.localIncludedItems.controls.toggle.patchValue(event)
    this.localIncludedItems.controls.toggle.markAsPristine()
  }

  islink(uid: string): boolean {
    return this.projectViewDetails.links.some(x => x.linkItemId == uid)
  }

  getLinkType(projectId: string): string {
    return projectId == this.projectid ? 'mat_solid:link' : 'heroicons_outline:link'
  }
  getlinkname2(uid: string): string {
    let temp = this.projectViewDetails.links.find(x => x.linkItemId == uid)
    // console.log(this.projectViewDetails.links)
    // console.log(this.projectViewDetails.linksProblemCapture)
    // console.log(this.projectViewDetails.scheduleData)

    temp = this.projectViewDetails.linksProblemCapture.find(x => x.problemUniqueId == temp.childProjectId)
    if (temp) {
      return "This milestone is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle
    }
    temp = this.projectViewDetails.links.find(x => x.linkItemId == uid)
    temp = this.projectViewDetails.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
    if (temp) {
      return "A link to this milestone has been created in project(s): " + temp.problemId.toString() + " - " + temp.problemTitle
    }

  }

  getlinkname(uid: string): string {
    var linkItemList = this.projectViewDetails.links.filter(x => x.linkItemId == uid)
    var returnString = ''
    if (linkItemList.some(x => x.parentProjectId == this.projectid)) {
      var childProject = this.projectViewDetails.linksProblemCapture.find(x => x.problemUniqueId == linkItemList.find(x => x.parentProjectId == this.projectid).childProjectId)
      if (childProject != null) {
        returnString = returnString + "This milestone is sourced (linked) from " + childProject.problemId.toString() + " - " + childProject.problemTitle
      }
    }
    if (linkItemList.some(x => x.childProjectId == this.projectid)) {
      var projectName = ''
      for (var linkItem of linkItemList.filter(x => x.childProjectId == this.projectid)) {
        var parentProject = this.projectViewDetails.linksProblemCapture.find(x => x.problemUniqueId == linkItem.parentProjectId)
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
  onDetailToggle(event: any) {
    // console.log(event)
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  toggleExpandRow(row) {
    // console.log('Toggled Expand Row!', this.scheduleTable);
    this.scheduleTable.rowDetail.toggleExpandRow(row);
  }
}
