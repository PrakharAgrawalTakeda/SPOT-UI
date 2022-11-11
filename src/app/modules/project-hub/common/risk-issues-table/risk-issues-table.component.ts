import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-risk-issues-table',
  templateUrl: './risk-issues-table.component.html',
  styleUrls: ['./risk-issues-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RiskIssuesTableComponent implements OnInit, OnChanges {
  @Input() riskIssuesData: any;
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @Input() editable: boolean
  @ViewChild('riskIssuesTable') riskIssuesTable: any;
  getRowClass = (row) => {
    return {
      'row-color1': row.closeDate != null,
    };
  };
  riskIssuesngxdata: any = []
  isclosed: boolean = false;
  constructor(public projecthubservice: ProjectHubService,
    private indicator: SpotlightIndicatorsService,
    public fuseAlert: FuseConfirmationService,
    private apiService: ProjectApiService) { }
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

  }
  changeriskissues(event: any) {
    console.log(event)
    if (event.checked == true) {
      this.riskIssuesngxdata = this.riskIssuesData
      this.isclosed = true
      console.log(this.riskIssuesngxdata)

    }
    else {
      this.riskIssuesngxdata = this.riskIssuesData.filter(x => x.closeDate == null)
      this.isclosed = false
      console.log(this.riskIssuesngxdata)
    }
  }
  islink(uid: string): boolean {
    return this.projectViewDetails.links.some(x => x.linkItemId == uid)
  }
    getlinkname(uid: string): string {
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
        this.apiService.deleteRiskIssue(id).then(res => {
          this.projecthubservice.submitbutton.next(true)
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
