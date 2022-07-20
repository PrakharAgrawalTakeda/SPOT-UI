import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-risk-issues-table',
  templateUrl: './risk-issues-table.component.html',
  styleUrls: ['./risk-issues-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RiskIssuesTableComponent implements OnInit {
  @Input() riskIssuesData: any;
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @ViewChild('riskIssuesTable') riskIssuesTable: any;

  riskIssuesngxdata: any = []
  constructor(public projecthubservice: ProjectHubService, private indicator: SpotlightIndicatorsService) { }

  ngOnInit(): void {
    this.riskIssuesData = this.projectViewDetails.riskIssuesData
    this.riskIssuesngxdata = this.riskIssuesData.filter(x=>x.closeDate == null)
    
  }
  changeriskissues(event: any){
    console.log(event)
    if(event.checked == true){
      this.riskIssuesngxdata = this.riskIssuesData
    }
    else{
      this.riskIssuesngxdata = this.riskIssuesData.filter(x=>x.closeDate == null)
    }
  }
 islink(uid: string): boolean {
    return this.projectViewDetails.links.some(x => x.linkItemId == uid)
  }
  getlinkname(uid: string): string {
    let temp = this.projectViewDetails.links.find(x => x.linkItemId == uid)
    temp = this.projectViewDetails.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
    return "This risk/issue is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle

  }
  onDetailToggle(event: any){
    console.log(event)
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', this.riskIssuesTable);
    this.riskIssuesTable.rowDetail.toggleExpandRow(row);
  }
}
