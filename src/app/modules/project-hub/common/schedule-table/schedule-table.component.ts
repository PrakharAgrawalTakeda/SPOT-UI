import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from '../../project-hub.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common'
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../project-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit, OnChanges {
  @Input() scheduleData: any;
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @Input() editable: boolean
  @ViewChild('scheduleTable') scheduleTable: any;
  getRowClass = (row) => {
    return {
      'row-color1': row.completionDate != null,
    };
  };
  schedulengxdata: any = []
  isclosed: boolean = false
  today = new Date()
  variance: any;
  baselineCount: any = {}
  id: string = ""
  constructor(public projecthubservice: ProjectHubService, 
    private indicator: SpotlightIndicatorsService,
    private apiService: ProjectApiService,
    public fuseAlert: FuseConfirmationService,
    private _Activatedroute: ActivatedRoute) { }



  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getProjectBaseline(this.id).then((count:any) => {
      this.baselineCount = count
      console.log(this.baselineCount)
      })
    this.scheduleData = this.projectViewDetails.scheduleData
    for (var i of this.scheduleData) {
      i.variance = this.calculateVariance(i)
    }
    console.log(this.scheduleData)
    if (this.isclosed == false) {
      this.schedulengxdata = this.scheduleData.filter(x => x.completionDate == null)
    }
    else {
      this.schedulengxdata = this.scheduleData
    }

  }
  ngOnInit(): void {
    this.scheduleData = this.projectViewDetails.scheduleData
    this.schedulengxdata = this.scheduleData.filter(x => x.completionDate == null)
    
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
        this.apiService.deleteSchedule(id).then(res => {
          this.projecthubservice.submitbutton.next(true)
        })
      }
    })

  }
  changeschedule(event: any) {
    console.log(event)
    if (event.checked == true) {
      this.schedulengxdata = this.scheduleData
      this.isclosed = true
      console.log(this.schedulengxdata)

    }
    else {
      this.schedulengxdata = this.scheduleData.filter(x => x.completionDate == null)
      this.isclosed = false
      console.log(this.schedulengxdata)
    }
  }
  islink(uid: string): boolean {
    return this.projectViewDetails.links.some(x => x.linkItemId == uid)
  }
  getlinkname(uid: string): string {
    let temp = this.projectViewDetails.links.find(x => x.linkItemId == uid)
    temp = this.projectViewDetails.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
    return "This milestone is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle

  }
  onDetailToggle(event: any) {
    console.log(event)
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', this.scheduleTable);
    this.scheduleTable.rowDetail.toggleExpandRow(row);
  }
}
