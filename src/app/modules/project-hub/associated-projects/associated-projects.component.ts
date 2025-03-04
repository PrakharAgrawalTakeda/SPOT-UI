import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { FuseConfirmationConfig, FuseConfirmationService } from "../../../../@fuse/services/confirmation";
import { MsalService } from '@azure/msal-angular';
import { PortfolioApiService } from "../../portfolio-center/portfolio-api.service";
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-associated-projects',
    templateUrl: './associated-projects.component.html',
    styleUrls: ['./associated-projects.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AssociatedProjectsComponent implements OnInit, OnDestroy {
    single: any[];
    localCurrency: any = [];
    filterCriteria: any = {};
    allprojects: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private apiService: ProjectApiService,
        private _Activatedroute: ActivatedRoute,
        public projecthubservice: ProjectHubService,
        public indicator: SpotlightIndicatorsService,
        private router: Router,
        public fuseAlert: FuseConfirmationService,
        private msalService: MsalService,
        private portApiService: PortfolioApiService
    ) {
        this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            if (this.viewContent) {
                this.dataloader();
            }
        })
    }
    id: string = '';
    rows = [];
    view: any[] = [700, 400];
    lastIndex = 15;
    viewContent = false;
    problemID = ''
    count: number = 0
    ngOnInit(): void {
        this.dataloader();
    }
    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get('id');
        var projects = [];
        var ids = [];
        var children = [];
        this.portApiService.getOnlyLocalCurrency(this.id).then(currency => {
            this.localCurrency = currency
        });
        this.apiService.getProjectTree(this.id).then((res: any) => {
            this.apiService.getfilterlist().then((filterCriteria: any) => {
                this.filterCriteria = filterCriteria
                console.log(res)
                this.allprojects = res
                res.values.forEach(project => {
                    if (project.problemUniqueId == this.projecthubservice.projectid) {
                        this.problemID = project.problemId
                    }
                    ids.push(project.problemUniqueId);
                    if (project.parentId == this.id) {
                        children.push(project)
                    }

                    project.projectName =
                        project.problemTitle;
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
                    project.nextMilestoneFinishDate = project.nextMilestoneFinishDate ? formatDate(new Date(project.nextMilestoneFinishDate)) : null;
                    project.projectPlannedFinishDate = project.projectPlannedFinishDate ? formatDate(new Date(project.projectPlannedFinishDate)) : null;
                    project.portfolioOwnerId = this.getPortfolioName(project.portfolioOwnerId)
                    project.treeStatus = "expanded";
                    projects.push(project);
                })
                this.projecthubservice.removedIds = ids;
                this.projecthubservice.projectChildren = children;
                this.projecthubservice.projects = projects;
                this.rows = this.projecthubservice.projects.filter(row => row.problemUniqueId !== row.parentId);
            })
        });
        this.viewContent = true;
        window.dispatchEvent(new Event('resize'));
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
    getPortfolioName(id: string) {
        return this.filterCriteria?.portfolioOwner?.find(x => x.portfolioOwnerId == id)?.portfolioOwner
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
        const url = 'https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/2971aba4-a0e6-49ca-97ca-37f5e94bf8f5/ReportSection082c84f8d370d4760d9b?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae';
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
                //debugger
                let problemIds: string[] = [];
                problemIds.push(this.problemID.toString());
                console.log(typeof this.allprojects)
                problemIds = this.allprojects.values.map(project => project.problemId.toString());

                const problemIdsString = ',' + problemIds.join(',');

                console.log(problemIdsString);
                this.apiService.generateReports(problemIdsString, 'Portfolio Report').then((res: any) => {
                    // handle response
                });
            }
        });
    }
    // tootlipFormatter(value, series) {
    //     return value.toString();
    // }
    tootlipFormatter(value, series) {
        this.count = this.count == undefined ? 0 : this.count
        if (this.count == 0) {
            this.count++
            return value.toString();
        }
        else if (this.count == 1) {
            this.count++
            return '<div style="color: #775DD0;">' + value.toString() + '</div>';
        }
        else {
            this.count = 0
            return '<div style="color: rgba(0,143,251,0.85);">' + value.toString() + '</div>';
        }
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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

