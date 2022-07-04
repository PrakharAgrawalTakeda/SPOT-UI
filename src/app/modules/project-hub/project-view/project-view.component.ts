import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { lookupMaster } from 'app/shared/lookup-global';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubComponent } from '../project-hub.component';
import { ProjectHubService } from '../project-hub.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectViewComponent implements OnInit {
  @ViewChild('riskIssuesTable', { read: MatSort }) riskIssuesMatSort: MatSort;
  riskIssues: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('askNeedTable', { read: MatSort }) askNeedMatSort: MatSort;
  askNeed: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('ScheduleTable', { read: MatSort }) ScheduleMatSort: MatSort;
  @ViewChild(ProjectHubComponent) parent;
  Schedule: MatTableDataSource<any> = new MatTableDataSource();
  projectViewDetails: any = {}
  id: string = ''
  showContent: boolean = false
  riskIssuesHeaders: string[] = ['logDate', 'dueDate', 'ifHappens', 'riskIssueTypeId'];
  askNeedHeaders: string[] = ['askNeedIndicator', 'askNeed1', 'needFromName', 'needByDate'];
  lookupmaster = new Map();
  ScheduleHeaders: string[] = ['milestone', 'baselineFinish', 'plannedFinish', 'responsiblePersonName'];
  askneedngxdata: any = [];
  askneedngxcolumns: any = []
  rows: any[] = [];
  expanded: any = {};
  timeout: any;

  @ViewChild('myTable') table: any;

  constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, private auth: AuthService, private indicator: SpotlightIndicatorsService, public projecthubservice: ProjectHubService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getprojectviewdata(this.id).then((res) => {
      this.projectViewDetails = res
      this.showContent = true
      this.riskIssues.data = this.projectViewDetails.riskIssuesData
      this.riskIssues.sort = this.riskIssuesMatSort
      this.onlyopenAskNeeds()
      console.log(this.askneedngxdata)
      this.askNeed.sort = this.askNeedMatSort
      this.Schedule.data = this.projectViewDetails.scheduleData
      this.Schedule.sort = this.ScheduleMatSort
    })

    this.auth.lookupMaster().then((res: any) => {
      for (let i of res) {
        this.lookupmaster.set(i.lookUpId, i.lookUpName)
      }
    })
  }
  allAskNeeds() {
    this.askneedngxdata = this.projectViewDetails.askNeedData
  }
  onlyopenAskNeeds() {
    this.askneedngxdata = this.projectViewDetails.askNeedData.filter(row => row.closeDate != null)
  }
  changeaskneed(event: any) {
    if (event.checked == true) {
      this.allAskNeeds()
    }
    else {
      this.onlyopenAskNeeds()
    }
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  trackByFnRI(index: number, item: any): any {
    return item.riskIssueUniqueId || index;
  }
  trackByFnAN(index: number, item: any): any {
    return item.askNeedUniqueId || index;
  }
  trackByFnS(index: number, item: any): any {
    return item.scheduleUniqueId || index;
  }
  getlookup(key) {
    return this.lookupmaster.get(key)
  }
}
