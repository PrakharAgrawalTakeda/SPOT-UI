
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexLegend, ApexPlotOptions,
    ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
export type ChartOptions = {
    tooltip: ApexTooltip;
};
@Component({
    selector: 'app-associated-projects',
    templateUrl: './associated-projects.component.html',
    styleUrls: ['./associated-projects.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AssociatedProjectsComponent implements OnInit {
    single: any[];
    public chartOptions: Partial<ChartOptions>;
    constructor(
        private apiService: ProjectApiService,
        private _Activatedroute: ActivatedRoute,
        public projecthubservice: ProjectHubService,
        public indicator: SpotlightIndicatorsService,
    ) {
        this.chartOptions = {
            tooltip: {
                custom: function({series, seriesIndex, dataPointIndex, w}) {
                    var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

                    return '<ul>' +
                        '<li><b>Price</b>: ' + data.x + '</li>' +
                        '<li><b>Number</b>: ' + data.y + '</li>' +
                        '<li><b>Product</b>: \'' + data.product + '\'</li>' +
                        '<li><b>Info</b>: \'' + data.info + '\'</li>' +
                        '<li><b>Site</b>: \'' + data.site + '\'</li>' +
                        '</ul>';
                }
            },
        }
    }
    id: string = '';
    rows = [];
    viewContent = false;
    view: any[] = [700, 400];

    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    lastIndex = 15;
    getCellClass(row: any): any {
        if (row.value == 'RedStop') {
            return 'red-stop';
        }
    }
    getApexTooltip({series, seriesIndex, dataPointIndex, w}) {
        var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return '<ul>' +
            '<li><b>Price</b>: ' + data.x + '</li>' +
            '<li><b>Number</b>: ' + data.y + '</li>' +
            '<li><b>Product</b>: \'' + data.product + '\'</li>' +
            '<li><b>Info</b>: \'' + data.info + '\'</li>' +
            '<li><b>Site</b>: \'' + data.site + '\'</li>' +
            '</ul>';
    }
    ngOnInit(): void {
        this.dataloader();
        window.dispatchEvent(new Event('resize'));
    }

    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get('id');
        var projects = [];
        this.apiService.getProjectTree(this.id).then((res: any) => {
            res.values.forEach(project => {
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

            this.rows = projects;
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

    yAxisTickFormatting(value){
        return percentTickFormatting(value);
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


