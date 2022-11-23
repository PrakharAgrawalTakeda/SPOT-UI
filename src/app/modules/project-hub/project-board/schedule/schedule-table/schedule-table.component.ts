import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { SelectionType } from '@swimlane/ngx-datatable';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';


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
  getRowClass = (row) => {
    return {
      'row-color1': row.closeDate != null,
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

  calculateVariance(array:any):any{
    for(var item of array){
      
    }
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
  getlinkname(uid: string): string {
    var linkItemList = this.links.filter(x => x.linkItemId == uid)
    var returnString = ''
    for (var linkItem of linkItemList) {
      if (linkItem.childProjectId == this.projectId) {
        if (returnString != '') {
          returnString = returnString + '</br>'
        }
        var parentProject = this.linksProblemCapture.find(x => x.problemUniqueId == linkItem.parentProjectId)
        returnString = returnString + "A link to this ask/need has been created in project(s): " + parentProject.problemId.toString() + " - " + parentProject.problemTitle
      }
      else if (linkItem.parentProjectId == this.projectId) {
        if (returnString != '') {
          returnString = returnString + '</br>'
        }
        var childProject = this.linksProblemCapture.find(x => x.problemUniqueId == linkItem.childProjectId)
        returnString = returnString + "This ask/need is sourced (linked) from " + childProject.problemId.toString() + " - " + childProject.problemTitle
      }
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
