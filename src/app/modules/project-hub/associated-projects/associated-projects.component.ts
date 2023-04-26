
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { FuseConfirmationConfig, FuseConfirmationService } from "../../../../@fuse/services/confirmation";
import { MsalService } from '@azure/msal-angular';
@Component({
    selector: 'app-associated-projects',
    templateUrl: './associated-projects.component.html',
    styleUrls: ['./associated-projects.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AssociatedProjectsComponent implements OnInit {
    single: any[];
    constructor(
        private apiService: ProjectApiService,
        private _Activatedroute: ActivatedRoute,
        public projecthubservice: ProjectHubService,
        public indicator: SpotlightIndicatorsService,
        private router: Router,
        public fuseAlert: FuseConfirmationService,
        private msalService: MsalService
    ) {
        this.projecthubservice.submitbutton.subscribe(res => {
            this.dataloader()
        })
    }
    id: string = '';
    rows = [];
    view: any[] = [700, 400];
    lastIndex = 15;
    viewContent = false;
    ngOnInit(): void {
        this.dataloader();
        window.dispatchEvent(new Event('resize'));
    }
    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get('id');
        var projects = [];
        var ids = [];
        var children = [];
        this.apiService.getProjectTree(this.id).then((res: any) => {
            res.values.forEach(project => {
                ids.push(project.problemUniqueId);
                if (project.parentId == this.id) {
                    children.push(project)
                }

                project.projectName =
                    project.problemId + ' - ' + project.problemTitle;
                project.projectCapitalOe =
                    project.phase +
                    ' - ' +
                    (project.capitalPhaseAbbreviation
                        ? project.capitalPhaseAbbreviation
                        : 'NA') +
                    ' - ' +
                    (project.oePhaseAbbreviation
                        ? project.oePhaseAbbreviation
                        : 'NA');
                project.nextMilestoneFinishDate = formatDate(new Date(project.nextMilestoneFinishDate));
                project.projectPlannedFinishDate = formatDate(new Date(project.projectPlannedFinishDate));
                project.treeStatus = "expanded";
                projects.push(project);
            })
            this.projecthubservice.removedIds = ids;
            this.projecthubservice.projectChildren = children;
            this.projecthubservice.projects = projects;
            this.rows = this.projecthubservice.projects;
        });

        this.viewContent = true;
    }
    getHeaderClass(): any {
        return ' vertical-header-class';
    }
    alignHeaderMiddleClass(): any {
        return ' align-header-middle-class';
    }
    getTotalCapexHeaderClass(): any {
        return ' total-capex-header-class';
    }
    onTreeAction(row: any) {
        if (row.treeStatus === 'collapsed') {
            row.treeStatus = 'expanded';
        } else {
            row.treeStatus = 'collapsed';
        }
        this.rows = [...this.rows];
    }
    sendToProject(row: any) {
        const url = this.router.serializeUrl(
            this.router.createUrlTree([`/project-hub/${row.problemUniqueId}`])
        );
        window.open(url, '_blank');
    }

    yAxisTickFormatting(value) {
        return percentTickFormatting(value);
    }

    getCellClass(): any {
        return 'first-column-datatable';
    }
    alignRight(): any {
        return 'align-right';
    }
    getGraphCellClass(): any {
        return 'graph-cell-datatable';
    }
    getRowClass = (row) => {
        if (row.problemUniqueId == this.id) {
            return 'current-project';
        }
        return 'associated-projects-row'
    }
    exportToExcel(): any {
        //To be changed once the power BI report is done
        const url = 'https://app.powerbi.com/groups/b852fec1-9c8e-4224-a4cc-a2f0587c7f2c/reports/2971aba4-a0e6-49ca-97ca-37f5e94bf8f5/ReportSectiond4669b229488cd3d4112';
        window.open(url, '_blank');
    }
    onProgramReport(): any {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Program Report",
            "message": "The selected report will be processed and distributed by e-Mail and may take a few minutes. Please check your inbox.",
            "icon": {
                "show": true,
                "name": "heroicons_outline:exclamation",
                "color": "primary"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "OK",
                    "color": "primary"
                },
                "cancel": {
                    "show": false,
                }
            },
            "dismissible": true
        }
        const reportAlert = this.fuseAlert.open(comfirmConfig)

        reportAlert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                let body = {ReportsData:[]};
                var newReport ={ProjectID:"", UserADID:"", ReportName:""};
                newReport.ProjectID = this.projecthubservice.projects.map(x=>{
                    return x.problemId.toString()
                }).join(',');
                newReport.ReportName = "Portfolio Report";
                newReport.UserADID = this.msalService.instance.getActiveAccount().localAccountId;
                body.ReportsData.push(newReport);
                this.apiService.programReport(body).then((res: any) => {
                });
            }
        })
    }
    tootlipFormatter(value, series) {
        return value.toString();
    }
}
function percentTickFormatting(val: any) {
    return val.toLocaleString() + '%';
}
function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

