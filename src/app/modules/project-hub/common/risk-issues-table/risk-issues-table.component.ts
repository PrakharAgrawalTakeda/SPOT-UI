import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FuseConfirmationConfig, FuseConfirmationService} from '@fuse/services/confirmation';
import {SpotlightIndicatorsService} from 'app/core/spotlight-indicators/spotlight-indicators.service';
import {ProjectHubService} from '../../project-hub.service';
import {ProjectApiService} from '../project-api.service';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-risk-issues-table',
  templateUrl: './risk-issues-table.component.html',
  styleUrls: ['./risk-issues-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RiskIssuesTableComponent implements OnInit, OnChanges {
  @Input() riskIssuesData: any = []
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @Input() editable: boolean
  @Input() mode: 'Normal' | 'Project-Charter' = 'Normal'
  @ViewChild('riskIssuesTable') riskIssuesTable: any;
  getRowClass = (row) => {
    return {
      'row-color1': row.closeDate != null,
    };
  };
  riskIssuesngxdata: any = []
  isclosed: boolean = false;
  viewContent: boolean = false
  constructor(public projecthubservice: ProjectHubService,
    private indicator: SpotlightIndicatorsService,
    public fuseAlert: FuseConfirmationService,
    private apiService: ProjectApiService) {
      this.projecthubservice.includeClosedItems.riskIssue.subscribe(res => {
          this.changeriskissues(res)
      })
  }
  localIncludedItems = new FormGroup({
      toggle: new FormControl(false)
  })
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.riskIssuesData = this.projectViewDetails.riskIssuesData
    if (this.isclosed == false) {
      this.riskIssuesngxdata = this.riskIssuesData.filter(x => x.closeDate == null)
    }
    else {
      this.riskIssuesngxdata = this.riskIssuesData
    }

  }
  ngOnInit(): void {
    this.riskIssuesData = this.projectViewDetails.riskIssuesData
    this.riskIssuesngxdata = this.riskIssuesData.filter(x => x.closeDate == null)
    this.viewContent = true
  }
  changeriskissues(event: any) {
    if (event == true) {
      this.riskIssuesngxdata = this.riskIssuesData
      this.isclosed = true
    }
    else {
      this.riskIssuesngxdata = this.riskIssuesData.filter(x => x.closeDate == null)
      this.isclosed = false
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
/*     getlinkname2(uid: string): string {
    let temp = this.projectViewDetails.links.find(x => x.linkItemId == uid)
    temp = this.projectViewDetails.linksProblemCapture.find(x => x.problemUniqueId == temp.childProjectId)
    if (temp) {
      return "This risk/issue is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle
    }
    temp = this.projectViewDetails.links.find(x => x.linkItemId == uid)
    temp = this.projectViewDetails.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
    if(temp){
      return "A link to this risk/issue has been created in project(s): " + temp.problemId.toString() + " - " + temp.problemTitle
    }
  } */

  getlinkname(uid: string): string {
    var linkItemList = this.projectViewDetails.links.filter(x => x.linkItemId == uid)
    var returnString = ''
    if (linkItemList.some(x => x.parentProjectId == this.projectid)) {
        var childProject = this.projectViewDetails.linksProblemCapture.find(x => x.problemUniqueId == linkItemList.find(x => x.parentProjectId == this.projectid).childProjectId)
        if (childProject != null) {
            returnString = returnString + "This risk/issue is sourced (linked) from " + childProject.problemId.toString() + " - " + childProject.problemTitle
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
        returnString = returnString + "A link to this risk/issue has been created in project(s): " + projectName
    }
    return returnString
}
  toggleRiskIssue(event: any) {
    this.projecthubservice.includeClosedItems.riskIssue.next(event.checked)
  }
  deleteRiskIssue(id: string) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Risk/Issue?",
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
    const riskIssueAlert = this.fuseAlert.open(comfirmConfig)

    riskIssueAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
        this.apiService.deleteRiskIssue(this.projectid, id).then(res => {
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.isNavChanged.next(true)
        })
      }
    })

  }
  onDetailToggle(event: any) {
    console.log(event)
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', this.riskIssuesTable);
    this.riskIssuesTable.rowDetail.toggleExpandRow(row);
  }
}
