import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from '../../project-hub.service';
import * as moment from 'moment';

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
  constructor(public projecthubservice: ProjectHubService, private indicator: SpotlightIndicatorsService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.scheduleData = this.projectViewDetails.scheduleData
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

  calculateVariance(row: any): string{
    if(row.completionDate == null && row.baselineFinish != null && row.plannedFinish !=null)
    {
    if(moment(this.today) > moment(row.plannedFinish))
    {
      var variance = 1 +  moment(this.today).diff(moment(row.baselineFinish),'days')
      return variance.toString()
    }
    else if(moment(this.today) < moment(row.plannedFinish))
    {
      var variance = 1 + moment(row.plannedFinish).diff(moment(row.baselineFinish),'days')
      return variance.toString()
    }
  }
  else if(row.completionDate != null && row.baselineFinish != null && row.plannedFinish !=null)
  {
    var variance = 1 + moment(row.completionDate).diff(moment(row.baselineFinish),'days')
      return variance.toString()
  }
    else
    {
      return "N/A"
    }
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
