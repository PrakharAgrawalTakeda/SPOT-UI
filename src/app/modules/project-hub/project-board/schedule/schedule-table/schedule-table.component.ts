import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { SelectionType } from '@swimlane/ngx-datatable';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import moment from 'moment';


@Component({
  selector: 'schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class SchedulesTableComponent implements OnInit {
  @Input() tableData: any = []
  @Input() scheduleData: any = []
  @Input() projectId: string = ''
  @Input() parentProjectId: string = ''
  @Input() mode: 'Normal' | 'Link' = 'Normal'
  @Input() links: any = []
  @Input() linksProblemCapture: any = []
  @Input() tableIndex: number = 0
  @Output() toggleChange = new EventEmitter();
  selected = [];
  SelectionType = SelectionType;
  today = new Date()
  getRowClass = (row) => {
    console.log(row)
    return {
      'row-color1': row.completionDate != null,
    };
  };
  @ViewChild('scheduleTable') table: any;
  constructor(public projectHubService: ProjectHubService, public apiService: ProjectApiService, public indicator: SpotlightIndicatorsService
    , public fuseAlert: FuseConfirmationService) { }

  ngOnInit(): void {
    console.log(this.tableData)
    if (this.mode == 'Link') {
      this.dataloaderLink()
    }
  }

  calculateVariance(array: any) :any {
    for(var item of array)
    {
      var datetoday = new Date(moment(this.today).format('L'))
      var datebaseline = new Date(moment(item.baselineFinish).format('L'))
      var dateplanned = new Date(moment(item.plannedFinish).format('L'))
      var datecompletion = new Date(moment(item.completionDate).format('L'))
  
  
  
      if (item.completionDate == null && item.baselineFinish != null && item.plannedFinish != null) {
        if (moment(this.today) > moment(item.plannedFinish)) {
          var Time1 = datetoday.getTime() - datebaseline.getTime();
          var Days1 = Time1 / (1000 * 3600 * 24)
  
          var variance = Math.round(Days1)
          item.variance = variance
  
  
        }
        else if (moment(this.today) < moment(item.plannedFinish)) {
          var Time2 = dateplanned.getTime() - datebaseline.getTime();
          var Days2 = Time2 / (1000 * 3600 * 24)
          var variance = Math.round(Days2)
          return variance.toString()
        }
      }
      else if (item.completionDate != null && item.baselineFinish != null && item.plannedFinish != null) {
        var Time3 = datecompletion.getTime() - datebaseline.getTime();
        var Days3 = Time3 / (1000 * 3600 * 24)
        var variance = Math.round(Days3)
        item.variance = variance
      }
      else {
        item.variance = "N/A"
      }
      console.log(item.variance)
    }
    
    return array
  }
  dataloaderLink() {
    var temp = []
    for (var item of this.links) {
      if (item.parentProjectId == this.parentProjectId && item.childProjectId == this.projectId) {
        temp.push(this.scheduleData.find(x => x.scheduleUniqueId == item.linkItemId))
      }
    }
    if (temp.length > 0) {
      this.selected.push(...temp.filter(x => x != null))
      this.toggleChange.emit({
        tableIndex: this.tableIndex,
        selected: temp
      })
    }

    this.scheduleData = [...this.calculateVariance(this.scheduleData)]
  }
  islink(uid: string): boolean {
    return this.links.some(x => x.linkItemId == uid)
  }
  getlinkname2(uid: string): string {
    var linkItemList = this.links.filter(x => x.linkItemId == uid)
    var returnString = ''
    for (var linkItem of linkItemList) {
      if (linkItem.childProjectId == this.projectId) {
        if (returnString != '') {
          returnString = returnString + '</br>'
        }
        var parentProject = this.linksProblemCapture.find(x => x.problemUniqueId == linkItem.parentProjectId)
        returnString = returnString + "A link to this milestone has been created in project(s): " + parentProject.problemId.toString() + " - " + parentProject.problemTitle
      }
      else if (linkItem.parentProjectId == this.projectId) {
        if (returnString != '') {
          returnString = returnString + '</br>'
        }
        var childProject = this.linksProblemCapture.find(x => x.problemUniqueId == linkItem.childProjectId)
        returnString = returnString + "This milestone is sourced (linked) from " + childProject.problemId.toString() + " - " + childProject.problemTitle
      }
    }
    return returnString
  }

  getlinkname(uid: string): string {
    var linkItemList = this.links.filter(x => x.linkItemId == uid)
    var returnString = ''
    if (linkItemList.some(x => x.parentProjectId == this.projectId)) {
      var childProject = this.linksProblemCapture.find(x => x.problemUniqueId == linkItemList.find(x => x.parentProjectId == this.projectId).childProjectId)
      returnString = returnString + "This milestone is sourced (linked) from " + childProject.problemId.toString() + " - " + childProject.problemTitle
    }
    if(linkItemList.some(x => x.childProjectId == this.projectId)){
      var projectName = ''
      for(var linkItem of linkItemList.filter(x=>x.childProjectId == this.projectId)){
        var parentProject = this.linksProblemCapture.find(x => x.problemUniqueId == linkItem.parentProjectId)
        projectName = projectName == ''?projectName + parentProject.problemId.toString() + " - " + parentProject.problemTitle: projectName +=" , " + parentProject.problemId.toString() + " - " + parentProject.problemTitle
      }
      if(returnString != ''){
        returnString = returnString + '\n'
      }
      returnString = returnString + "A link to this milestone has been created in project(s): " + projectName
    }
    return returnString
  }
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.toggleChange.emit({
      tableIndex: this.tableIndex,
      selected: this.selected
    })
    this.projectHubService.isFormChanged = true
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }
  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
