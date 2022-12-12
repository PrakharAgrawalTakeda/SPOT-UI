import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProjectHubService } from "../../../project-hub.service";
import { ProjectApiService } from "../../../common/project-api.service";
import { SpotlightIndicatorsService } from "../../../../../core/spotlight-indicators/spotlight-indicators.service";
import { FuseConfirmationConfig, FuseConfirmationService } from "../../../../../../@fuse/services/confirmation";
import { SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from "../../../../../core/auth/auth.service";

@Component({
    selector: 'app-risk-issue-table',
    templateUrl: './risk-issue-table.component.html',
    styleUrls: ['./risk-issue-table.component.scss']
})
export class RiskIssueTableComponent implements OnInit {
    @Input() tableData: any = []
    @Input() riskIssueData: any = []
    @Input() projectId: string = ''
    @Input() parentProjectId: string = ''
    @Input() mode: 'Normal' | 'Link' = 'Normal'
    @Input() links: any = []
    @Input() linksProblemCapture: any = []
    @Input() tableIndex: number = 0
    @Output() toggleChange = new EventEmitter();
    lookupdata: any = []
    selected = [];
    SelectionType = SelectionType;
    getRowClass = (row) => {
        return {
            'row-color1': row.closeDate != null,
        };
    };
    @ViewChild('riskIssueTable') table: any;
    constructor(public projectHubService: ProjectHubService, public auth: AuthService, public apiService: ProjectApiService, public indicator: SpotlightIndicatorsService
        , public fuseAlert: FuseConfirmationService) {

    }

    ngOnInit(): void {
        if (this.mode == 'Link') {
            this.getllookup()
        }
    }
    getllookup() {
        this.auth.lookupMaster().then((resp: any) => {
            this.lookupdata = resp
            this.dataloaderLink()
        })
    }
    dataloaderLink() {
        if (!this.links) {
            this.links = [];
        }
        var temp = []
        for (var item of this.links) {
            if (item.parentProjectId == this.parentProjectId && item.childProjectId == this.projectId) {
                temp.push(this.riskIssueData.find(x => x.riskIssueUniqueId == item.linkItemId))
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
        if (!this.links) {
            this.links = [];
        }
        return this.links.some(x => x.linkItemId == uid)
    }
    // getlinkname2(uid: string): string {
    //     let temp = this.links.find(x => x.linkItemId == uid)
    //     temp = this.linksProblemCapture.find(x => x.problemUniqueId == temp.childProjectId)
    //     if (temp) {
    //         return "This risk/issue is sourced (linked) from " + temp.problemId.toString() + " - " + temp.problemTitle
    //     }
    //     temp = this.linksProblemCapture.find(x => x.problemUniqueId == temp.parentProjectId)
    //     if (temp) {
    //         return "A link to this risk/issue has been created in project(s): " + temp.problemId.toString() + " - " + temp.problemTitle
    //     }
    // }
    getLinkType(projectId: string): string {
        return projectId == this.projectId ? 'mat_solid:link' : 'heroicons_outline:link'
      }
    getlinkname(uid: string): string {
        var linkItemList = this.links.filter(x => x.linkItemId == uid)
        var returnString = ''
        if (linkItemList.some(x => x.parentProjectId == this.projectId)) {
            var childProject = this.linksProblemCapture.find(x => x.problemUniqueId == linkItemList.find(x => x.parentProjectId == this.projectId).childProjectId)
            if (childProject != null) {
                returnString = returnString + "This risk/issue is sourced (linked) from " + childProject.problemId.toString() + " - " + childProject.problemTitle
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
            returnString = returnString + "A link to this risk/issue has been created in project(s): " + projectName
        }
        return returnString
    }
    deleteRiskIssue(id: string) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Remove Risk Issue?",
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
                this.apiService.deleteRiskIssue(this.projectId).then(res => {
                    this.projectHubService.submitbutton.next(true)
                })
            }
        })
    }
    onSelect({ selected }) {
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
    getLookUpName(id: string): string {
        return id && id != '' ? this.projectHubService.lookUpMaster.find(x => x.lookUpId == id).lookUpName : ''
    }
}
