import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';

@Component({
  selector: 'app-ask-need-table',
  templateUrl: './ask-need-table.component.html',
  styleUrls: ['./ask-need-table.component.scss']
})
export class AskNeedTableComponent implements OnInit {
  @Input() tableData: any = []
  @Input() askNeedData: any = []
  @Input() mode: 'Normal' | 'Link' = 'Normal'
  @Input() links: any = []
  @Input() linksProblemCapture: any = []
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
    console.log(this.tableData)
  }

  islink(uid: string): boolean {
    return this.links.some(x => x.linkItemId == uid)
  }
  getlinkname(uid: string): string {
    let temp = this.links.find(x => x.linkItemId == uid)
    temp = this.linksProblemCapture.find(x => x.problemUniqueId == temp.childProjectId)
    if (temp) {
      return "This ask/need is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle
    }
    temp = this.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
    if (temp) {
      return "A link to this ask/need has been created in project(s): " + temp.problemId.toString() + " - " + temp.problemTitle
    }
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
        this.apiService.deleteAskNeed(id).then(res => {
          this.projectHubService.submitbutton.next(true)
        })
      }
    })
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
