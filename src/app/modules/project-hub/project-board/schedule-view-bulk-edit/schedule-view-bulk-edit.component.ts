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
   
  // rows = [
  //   {
  //     "name":"Annappa",
  //     "gender":"Male",
  //     "joindate":"2017-03-20T09:17:39.118Z"
      
  //   },
  //   {
  //     "name":"Pavan",
  //     "gender":"Male",
  //     "joindate":"2017-03-15T23:47:18.465Z"
      
  //   },
  //   {
  //     "name":"Madhu",
  //     "gender":"Female",
  //     "joindate":"2017-03-15T23:44:08.283Z"
      
  //   },
  //   {
  //     "name":"Rajnish",
  //     "gender":"Male",
  //     "joindate":"2017-03-15T18:51:29.101Z"
  //   },
  //   {
  //     "name":"Manish",
  //     "gender":"Female",
  //     "joindate":"2017-03-15T18:51:29.101Z"
  //   }
  // ];
  constructor(public projecthubservice: ProjectHubService, private indicator: SpotlightIndicatorsService) {

  }
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

  // changeschedule(event: any) {
  //   console.log(event)
  //   if (event.checked == true) {
  //     this.schedulengxdata = this.scheduleData
  //     this.isclosed = true
  //     console.log(this.schedulengxdata)

  //   }
  //   else {
  //     this.schedulengxdata = this.scheduleData.filter(x => x.completionDate == null)
  //     this.isclosed = false
  //     console.log(this.schedulengxdata)
  //   }
  // }
  // islink(uid: string): boolean {
  //   return this.projectViewDetails.links.some(x => x.linkItemId == uid)
  // }
  // getlinkname(uid: string): string {
  //   let temp = this.projectViewDetails.links.find(x => x.linkItemId == uid)
  //   temp = this.projectViewDetails.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
  //   return "This milestone is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle

  // }
  // onDetailToggle(event: any) {
  //   console.log(event)
  // }
  // toggleExpandRow(row) {
  //   console.log('Toggled Expand Row!', this.scheduleTable);
  //   this.scheduleTable.rowDetail.toggleExpandRow(row);
  // }
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
