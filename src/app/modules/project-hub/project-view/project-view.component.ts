import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  @ViewChild('riskIssuesTable', {read: MatSort}) riskIssuesMatSort: MatSort;
  riskIssues: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('askNeedTable', {read: MatSort}) askNeedMatSort: MatSort;
  askNeed: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('ScheduleTable', {read: MatSort}) ScheduleMatSort: MatSort;
  Schedule: MatTableDataSource<any> = new MatTableDataSource();
  projectViewDetails: any = {}
  id: string = ''
  showContent : boolean = false
  riskIssuesHeaders: string[] = [ 'logDate', 'dueDate', 'ifHappens', 'riskIssueTypeId'];
  askNeedHeaders: string[] = [ 'askNeed1', 'needFromName', 'needByDate'];
 
  ScheduleHeaders: string[] = [ 'milestone', 'baselineFinish', 'plannedFinish', 'responsiblePersonName'];
  constructor(private apiService: ProjectApiService,private _Activatedroute:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.id=this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getprojectviewdata(this.id).then((res) => {
      this.projectViewDetails = res
      this.showContent = true
      this.riskIssues.data = this.projectViewDetails.riskIssuesData
      this.riskIssues.sort = this.riskIssuesMatSort
      this.askNeed.data = this.projectViewDetails.askNeedData
      this.askNeed.sort = this.askNeedMatSort
      this.Schedule.data = this.projectViewDetails.scheduleData
      this.Schedule.sort = this.ScheduleMatSort
      
      console.log(this.riskIssues)
    })
    
  }
  trackByFnRI(index: number, item: any): any
  {
      console.log(index)
      return item.riskIssueUniqueId || index;
  }
  trackByFnAN(index: number, item: any): any
  {
      console.log(index)
      return item.askNeedUniqueId || index;
  }
  trackByFnS(index: number, item: any): any
  {
      console.log(index)
      return item.scheduleUniqueId || index;
  }
}
