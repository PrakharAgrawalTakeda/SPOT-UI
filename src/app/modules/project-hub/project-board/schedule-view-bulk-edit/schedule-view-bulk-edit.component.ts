import { Component, HostListener, OnDestroy, OnInit, ElementRef, ViewChild, ViewEncapsulation, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
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

@Component({
  selector: 'app-schedule-view-bulk-edit',
  templateUrl: './schedule-view-bulk-edit.component.html',
  styleUrls: ['./schedule-view-bulk-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
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
  //isclosed: boolean = false
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
  lookUpData: any = []
  filterCriteria: any = {}
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService,
    private portApiService: PortfolioApiService,
    private authService: AuthService, private _elementRef: ElementRef, private indicator: SpotlightIndicatorsService, private router: Router, private _Activatedroute: ActivatedRoute) {
    this.milestoneForm.valueChanges.subscribe(res => {
      console.log("Milestone form Value", this.milestoneForm.getRawValue())
    })
  }

  schedulebulkeditForm = new FormGroup({
    milestone: new FormControl(''),
    plannedFinish: new FormControl(''),
    baselineFinish: new FormControl(''),
    comments: new FormControl(''),
    completionDate: new FormControl(''),
    usersingle: new FormControl(''),
    usersingleid: new FormControl(''),
    function: new FormControl({}),
    //functionid: new FormControl(''),
    includeInReport: new FormControl('')
  })
  // ngOnChanges(changes: SimpleChanges): void {
  //  // console.log(changes)
  //   //this.scheduleData = this.projecthubservice.all
  //   //console.log(this.scheduleData)
  //   //if (this.isclosed == false) {
  //    // this.schedulengxdata = this.scheduleData.filter(x => x.completionDate == null)
  //   //}
  //   //else {
  //     //this.schedulengxdata = this.scheduleData
  //   //}

  // }
  ngOnInit(): void {
    this.dataloader()
    // this.scheduleData = this.projecthubservice.all
    // this.schedulengxdata = this.scheduleData
    // //.filter(x => x.completionDate == null)
    // console.log(this.scheduleData)
    // this.getllookup()
  }

  // getllookup() {
  //   this.auth.lookupMaster().then((resp: any) => {
  //     this.lookupdata = resp
  //       this.functionSets = this.lookupdata.filter(x => x.lookUpParentId == '0edea251-09b0-4323-80a0-9a6f90190c77')      
  //     this.dataloader()
  //     this.schedulebulkeditForm.controls.function.patchValue('')
  //   })
  // }

  getFunctionOwner(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
  }

  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getprojectviewdata(this.id).then((res: any) => {
      this.portApiService.getfilterlist().then(filterres => {
        this.authService.lookupMaster().then((lookup: any) => {
          console.log('LookUp Data', lookup)
          this.lookUpData = lookup
          console.log('Filter Criteria:', filterres)
          this.filterCriteria = filterres
          console.log("Milestone info:", res)
          this.scheduleData = res
          // if (this.projecthubservice.itemid != "new") {
          //   this.apiService.scheduleSingle(this.projecthubservice.itemid).then((res: any) => {
          //     this.schedule = res
          //     console.log(this.projecthubservice)
          //     console.log('res')
          //     console.log(res)
          // this.schedulebulkeditForm.patchValue({
          //   milestone: res.milestone,
          //   plannedFinish: res.plannedFinish,
          //   baselineFinish: res.baselineFinish,
          //   comments: res.comments,
          //   completionDate: res.completionDate,
          //   usersingle: res.responsiblePersonName,
          //   usersingleid: res.responsiblePersonId,
          //   //functionid: res.functionGroupId,
          //   includeInReport: res.includeInReport
          // })

          if (res.scheduleData.length != 0) {
            for (var i of res.scheduleData) {
              this.milestoneForm.push(new FormGroup({
                milestone: new FormControl(i.milestone),
                // qualityReferenceType: new FormControl(this.lookUpData.find(x => x.lookUpId == i.qualityReferenceTypeId)),
                plannedFinish: new FormControl(i.plannedFinish),
                baselineFinish: new FormControl(i.baselineFinish),
                function: new FormControl(this.lookUpData.find(x => x.lookUpId == i.functionGroupId)),
                completionDate: new FormControl(i.completionDate),
                comments: new FormControl(i.comments)
              }))
            }
          }
          console.log(this.milestoneForm.getRawValue())
        })
      })
    })


  }

  addMilestoneRecord() {
    this.milestoneForm.push(new FormGroup({
      milestone: new FormControl(''),
      //qualityReferenceType: new FormControl({}),
      plannedFinish: new FormControl(''),
      baselineFinish: new FormControl(''),
      function: new FormControl({}),
      completionDate: new FormControl({}),
      comments: new FormControl('')
    }))
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

  // updateValue(event, cell, rowIndex) {

  //   var val = event instanceof Date ? event :event.target.value;
  //   //this.schedulengxdata = this.scheduleData
  //   this.editing[rowIndex] = false;
  //   this.schedulengxdata[rowIndex][cell] = val;
  //   this.schedulengxdata = [...this.schedulengxdata];
  // }

  submitschedule() {
    //var formValue = this.milestoneForm.getRawValue()
    var mainObj = {
      scheduleUniqueId: this.scheduleData.scheduleData.scheduleUniqueId,
      projectId: this.scheduleData.scheduleData.projectId,
      milestone: this.milestoneForm.value.milestone,
      plannedFinish: moment(this.milestoneForm.value.plannedFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
      baselineFinish: moment(this.milestoneForm.value.baselineFinish).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
      functionGroupId: this.milestoneForm.value.function ? this.milestoneForm.value.function.lookUpId : null,
      comments: this.milestoneForm.value.comments,
      completionDate: moment(this.milestoneForm.value.completionDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
      includeInReport: this.milestoneForm.value.includeInReport,
      indicator: this.scheduleData.scheduleData.indicator,
      includeInCharter: this.scheduleData.scheduleData.includeInCharter,
      milestoneType: this.scheduleData.scheduleData.milestoneType,
      templateMilestoneId: this.scheduleData.scheduleData.templateMilestoneId,
      includeInCloseout: this.scheduleData.scheduleData.includeInCloseout,
      responsiblePersonId: this.milestoneForm.value.usersingleid,
      responsiblePersonName: this.milestoneForm.value.usersingle
    }
    console.log(mainObj)
  }

  reset() {
    this.router.navigate(['project-hub/' + this.id + '/project-board'])
  }

}
