import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import {DatatableComponent, SelectionType} from '@swimlane/ngx-datatable';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-ask-need-table',
  templateUrl: './ask-need-table.component.html',
  styleUrls: ['./ask-need-table.component.scss']
})
export class AskNeedTableComponent implements OnInit {
  @Input() tableData: any = []
  @Input() askNeedData: any = []
  @Input() projectId: string = ''
  @Input() parentProjectId: string = ''
  @Input() mode: 'Normal' | 'Link' = 'Normal'
  @Input() links: any = []
  @Input() linksProblemCapture: any = []
  @Input() tableIndex: number = 0
  @Output() toggleChange = new EventEmitter();
  @ViewChild('askNeedTable') askNeedTable: DatatableComponent;
  selected = [];
  SelectionType = SelectionType;
  columnMode = new BehaviorSubject<string>('flex');
  getRowClass = (row) => {
    return {
      'row-color1': row.closeDate != null,
    };
  };
  @ViewChild('askNeedTable') table: any;
  constructor(public projectHubService: ProjectHubService, public apiService: ProjectApiService, public indicator: SpotlightIndicatorsService
    , public fuseAlert: FuseConfirmationService) {

  }

  ngOnInit(): void {
    if (this.mode == 'Link') {
      this.dataloaderLink()
    }
  }
  dataloaderLink() {
    var temp = []
    for (var item of this.links) {
      if (item.parentProjectId == this.parentProjectId && item.childProjectId == this.projectId) {
        temp.push(this.askNeedData.find(x => x.askNeedUniqueId == item.linkItemId))
      }
    }
    if (temp.length > 0) {
      this.selected.push(...temp.filter(x => x != null))
      this.toggleChange.emit({
        tableIndex: this.tableIndex,
        selected: temp
      })
    }
  }
  islink(uid: string): boolean {
    return this.links.some(x => x.linkItemId == uid)
  }
  getLinkType(projectId: string): string {
    return projectId == this.projectId ? 'mat_solid:link' : 'heroicons_outline:link'
  }
  getlinkname(uid: string): string {
    var linkItemList = this.links.filter(x => x.linkItemId == uid)
    var returnString = ''
    if (linkItemList.some(x => x.parentProjectId == this.projectId)) {
      var childProject = this.linksProblemCapture.find(x => x.problemUniqueId == linkItemList.find(x => x.parentProjectId == this.projectId).childProjectId)
      if (childProject != null) {
        returnString = returnString + "This ask/need is sourced (linked) from " + childProject.problemId.toString() + " - " + childProject.problemTitle
      }
    }
    if (linkItemList.some(x => x.childProjectId == this.projectId)) {
      var projectName = ''
      for (var linkItem of linkItemList.filter(x => x.childProjectId == this.projectId)) {
        var parentProject = this.linksProblemCapture.find(x => x.problemUniqueId == linkItem.parentProjectId)
        if (parentProject != null) {
          projectName = projectName == '' ? projectName + parentProject.problemId.toString() + " - " + parentProject.problemTitle : projectName += " , " + parentProject.problemId.toString() + " - " + parentProject.problemTitle
        }
      }
      if (returnString != '') {
        returnString = returnString + '\n'
      }
      returnString = returnString + "A link to this ask/need has been created in project(s): " + projectName
    }
    return returnString
  }
  deleteAskNeed(id: string) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Ask Need?",
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
    const askNeedAlert = this.fuseAlert.open(comfirmConfig)
    askNeedAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.apiService.deleteAskNeed(this.projectId, id).then(res => {
          this.projectHubService.submitbutton.next(true)
          this.projectHubService.isNavChanged.next(true)
        })
      }
    })
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
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
