import { Component, HostListener, OnDestroy, OnInit, ElementRef, ViewChild, ViewEncapsulation, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

@Component({
  selector: 'app-schedule-view-bulk-edit',
  templateUrl: './schedule-view-bulk-edit.component.html',
  styleUrls: ['./schedule-view-bulk-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScheduleViewBulkEditComponent implements OnInit, OnChanges {
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
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _elementRef: ElementRef, private indicator: SpotlightIndicatorsService) {

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
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.scheduleData = this.projecthubservice.all
    console.log(this.scheduleData)
    //if (this.isclosed == false) {
     // this.schedulengxdata = this.scheduleData.filter(x => x.completionDate == null)
    //}
    //else {
      this.schedulengxdata = this.scheduleData
    //}

  }
  ngOnInit(): void {
    this.scheduleData = this.projecthubservice.all
    this.schedulengxdata = this.scheduleData
    //.filter(x => x.completionDate == null)
    console.log(this.scheduleData)
    this.getllookup()
  }

  getllookup() {
    this.auth.lookupMaster().then((resp: any) => {
      this.lookupdata = resp
        this.functionSets = this.lookupdata.filter(x => x.lookUpParentId == '0edea251-09b0-4323-80a0-9a6f90190c77')      
      //this.dataloader()
      this.schedulebulkeditForm.controls.function.patchValue('')
    })
  }

  dataloader() {
    if (this.projecthubservice.itemid != "new") {
      this.apiService.scheduleSingle(this.projecthubservice.itemid).then((res: any) => {
        this.schedule = res
        console.log(this.projecthubservice)
        console.log('res')
        console.log(res)
        this.schedulebulkeditForm.patchValue({
          milestone: res.milestone,
          plannedFinish: res.plannedFinish,
          baselineFinish: res.baselineFinish,
          comments: res.comments,
          completionDate: res.completionDate,
          usersingle: res.responsiblePersonName,
          usersingleid: res.responsiblePersonId,
          //functionid: res.functionGroupId,
          includeInReport: res.includeInReport
        })
        this.schedulebulkeditForm.controls['baselineFinish'].disable()

        if(this.schedule.functionGroupId != "")
        {
          this.schedulebulkeditForm.controls.function.patchValue(this.lookupdata.find(x => x.lookUpId == res.functionGroupId))
        }

        if (this.projecthubservice.all != []) {
          if (this.projecthubservice.all.filter(x => x.includeInReport == true).length >= 8) {
            if (this.schedulebulkeditForm.value.includeInReport != true) {
              this.schedulebulkeditForm.controls['includeInReport'].disable()
            }
          }
        }
        this.projecthubservice.isFormChanged = false
      })
    }
    else {
      this.schedulebulkeditForm.patchValue({
        milestone: "",
        plannedFinish: null,
        baselineFinish: null,
        comments: "",
        completionDate: null,
        usersingle: "",
        usersingleid: "",
        //functionid: "",
        includeInReport: false
      })
      this.schedulebulkeditForm.controls['baselineFinish'].disable()

     
      if (this.projecthubservice.all.length == 0) {
        console.log(this.projecthubservice.all)
      }
      else {
        if (this.projecthubservice.all.filter(x => x.includeInReport == true).length >= 8) {
          this.schedulebulkeditForm.controls['includeInReport'].disable()
        }
      }
      this.projecthubservice.isFormChanged = false
    }
    this.schedulebulkeditForm.valueChanges.subscribe(res => {
      this.projecthubservice.isFormChanged = true
    })
  }

  calculateVariance(row: any): string{
    if(row.completionDate == null && row.baselineFinish != null && row.plannedFinish !=null)
    {
    if(moment(this.today) > moment(row.plannedFinish))
    {
      var variance = moment(this.today).diff(moment(row.baselineFinish),'days')
      return variance.toString()
    }
    else if(moment(this.today) < moment(row.plannedFinish))
    {
      var variance = moment(row.plannedFinish).diff(moment(row.baselineFinish),'days')
      return variance.toString()
    }
  }
  else if(row.completionDate != null && row.baselineFinish != null && row.plannedFinish !=null)
  {
    var variance = moment(row.completionDate).diff(moment(row.baselineFinish),'days')
      return variance.toString()
  }
    else
    {
      return "N/A"
    }
  }

  updateValue(event, cell, rowIndex) {
    
    var val = event instanceof Date ? event :event.target.value;
    //this.schedulengxdata = this.scheduleData
    this.editing[rowIndex] = false;
    this.schedulengxdata[rowIndex][cell] = val;
    this.schedulengxdata = [...this.schedulengxdata];
  }

  submitschedule(){

  }

}
