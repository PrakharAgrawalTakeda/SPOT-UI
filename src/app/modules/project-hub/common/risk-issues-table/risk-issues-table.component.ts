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
import {AuthService} from "../../../../core/auth/auth.service";
import {Constants} from "../../../../shared/constants";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalBusinessCaseOptions} from "../../../../shared/global-business-case-options";

@Component({
  selector: 'app-risk-issues-table',
  templateUrl: './risk-issues-table.component.html',
  styleUrls: ['./risk-issues-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RiskIssuesTableComponent implements OnInit, OnChanges {
  @Input() riskIssuesData: any = []
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @Input() editable: boolean
  @Input() callLocation:  'Normal'  | 'Project-Charter' | 'Business-Case'  = 'Normal'
  @ViewChild('riskIssuesTable') riskIssuesTable: any;
  getRowClass = (row) => {
    return {
      'row-color1': row.closeDate != null,
    };
  };
  riskIssuesngxdata: any = []
  isclosed: boolean = false;
  viewContent: boolean = false
  riskIssueViewEditType: string = "RiskIssue";
  riskIssueBulkEditType: string = "RiskIssuesBulkEdit";
  id: string = ''
  optionId: string = ''
  constructor(public projecthubservice: ProjectHubService,
    private indicator: SpotlightIndicatorsService,
    public fuseAlert: FuseConfirmationService,
    private apiService: ProjectApiService,
    public auth: AuthService,
    private router: Router,
    private _Activatedroute: ActivatedRoute) {
      this.projecthubservice.includeClosedItems.riskIssue.subscribe(res => {
          this.changeriskissues(res)
      })
  }
  localIncludedItems = new FormGroup({
      toggle: new FormControl(false)
  })
  ngOnChanges(changes: SimpleChanges): void {
      if(this.callLocation=="Business-Case"){
          this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
          if (this.router.url.includes('recommended-option')) {
              this.apiService.getRiskIssuesByOption(this.id,GlobalBusinessCaseOptions.OPTION_1).then((res) => {
                  this.riskIssuesngxdata  = res
                  console.log("aaaaaaaaaaaaa",res)
              })
          }
          if (this.router.url.includes('option-2')) {
              this.apiService.getRiskIssuesByOption(this.id,Constants.OPTION_2_ID.toString()).then((res) => {
                  this.riskIssuesngxdata  = res
              })
          }
          if (this.router.url.includes('option-3')) {
              this.apiService.getRiskIssuesByOption(this.id,Constants.OPTION_3_ID.toString()).then((res) => {
                  this.riskIssuesngxdata  = res
              })
          }
      }else{
          this.riskIssuesData = this.projectViewDetails.riskIssuesData
          if (this.isclosed == false) {
              this.riskIssuesngxdata = this.riskIssuesData.filter(x => x.closeDate == null)
          }
          else {
              this.riskIssuesngxdata = this.riskIssuesData
          }
      }
  }
  ngOnInit(): void {
     if(this.callLocation == 'Normal'){
        this.riskIssuesData = this.projectViewDetails.riskIssuesData
        this.riskIssuesngxdata = this.riskIssuesData.filter(x => x.closeDate == null)
     }
     if(this.callLocation == 'Business-Case'){
         this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
         if (this.router.url.includes('recommended-option')) {
             this.optionId = GlobalBusinessCaseOptions.OPTION_1
             this.riskIssuesData = this.projectViewDetails.riskIssuesData
         }
         if (this.router.url.includes('option-2')) {
             this.optionId = GlobalBusinessCaseOptions.OPTION_2
             this.apiService.getRiskIssuesByOption(this.id,GlobalBusinessCaseOptions.OPTION_2).then((res) => {
                 this.riskIssuesData  = res
             })
         }
         if (this.router.url.includes('option-3')) {
             this.optionId = GlobalBusinessCaseOptions.OPTION_3
             this.apiService.getRiskIssuesByOption(this.projecthubservice.projectid,GlobalBusinessCaseOptions.OPTION_3).then((res) => {
                 this.riskIssuesData  = res
             })
         }
         this.riskIssuesngxdata = this.riskIssuesData.filter(x => x.closeDate == null)
     }

     if(this.callLocation == 'Project-Charter'){
         this.riskIssueViewEditType = "ProjectCharterRiskIssueAddSingle"
         this.riskIssueBulkEditType = "ProjectCharterRiskIssueBulkEdit"
     }
     if(this.callLocation == 'Business-Case'){
         this.riskIssueViewEditType = "BusinessCaseRiskIssueAddSingle"
         this.riskIssueBulkEditType = "BusinessCaseIssueBulkEdit"
     }
  }
  getLookUpName(lookUpId: string): string {
       return lookUpId && lookUpId != '' ? this.lookup.find(x => x.lookUpId == lookUpId).lookUpName : ''
  }
  reload(): void {
      this.riskIssuesData = this.projectViewDetails.riskIssuesData
      this.riskIssuesngxdata = this.riskIssuesData.filter(x => x.closeDate == null)
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
          if (this.callLocation == 'Business-Case') {
              this.apiService.deleteRiskIssueByOption(id,this.optionId, this.id).then((res) => {
                  this.projecthubservice.submitbutton.next(true)
                  this.projecthubservice.isNavChanged.next(true)
            })
          }else{
              this.apiService.deleteRiskIssue(this.projectid, id).then(res => {
                  if (this.callLocation == 'Project-Charter') {
                      this.apiService.updateReportDates(this.projecthubservice.projectid, "ModifiedDate").then(secondRes => {
                          this.projecthubservice.submitbutton.next(true)
                          this.projecthubservice.isNavChanged.next(true)
                      })
                  }  else{
                      this.projecthubservice.submitbutton.next(true)
                      this.projecthubservice.isNavChanged.next(true)
                  }

              })
          }

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
