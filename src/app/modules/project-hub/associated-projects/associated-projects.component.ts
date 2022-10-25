
import {Component, OnInit,  ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import {ApexTooltip } from 'ng-apexcharts';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
@Component({
    selector: 'app-associated-projects',
    templateUrl: './associated-projects.component.html',
    styleUrls: ['./associated-projects.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AssociatedProjectsComponent implements OnInit {
    single: any[];
    constructor(
        private apiService: ProjectApiService,
        private _Activatedroute: ActivatedRoute,
        public projecthubservice: ProjectHubService,
        public indicator: SpotlightIndicatorsService,
        private router: Router
    ) {
    }
    id: string = '';
    rows = [];
    viewContent = false;
    view: any[] = [700, 400];
    lastIndex = 15;
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
                if(project.parentId == this.id){
                    children.push(project)
                }
                project.projectName =
                    project.problemId + ' - ' + project.problemTitle;
                project.projectCapitalOe =
                    project.phase +
                    ' - ' +
                    (project.capitalPhaseName
                        ? project.capitalPhaseName
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
        return ' horizontal-header-class';
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

    yAxisTickFormatting(value){
        return percentTickFormatting(value);
    }

    getCellClass(): any {
        return 'first-column-datatable';
    }
    getGraphCellClass(): any {
        return 'graph-cell-datatable';
    }
    getRowClass = (row) => {
        if(row.problemUniqueId == this.id){
            return 'current-project';}
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
