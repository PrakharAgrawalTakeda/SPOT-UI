import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationService } from '@fuse/components/navigation';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project-dashboard-budget',
  templateUrl: './project-dashboard-budget.component.html',
  styleUrls: ['./project-dashboard-budget.component.scss']
})
export class ProjectDashboardBudgetComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private projectHubService: ProjectHubService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, private _fuseNavigationService: FuseNavigationService, private router: Router) { 
    this.projectHubService.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res=>{
      if(res == true){
        this.dataloader()
      }
    })
    this.router.events.subscribe(res => {
      if (this.viewContent) {
        this.navItem = null
        //this.reloadName()
      }
    })
  }
  id: string = ''
  viewContent: boolean = false
  reportInfoData: any = {}
  navItem: any
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getProjectDashboard(this.id).then(res => {
      console.log("Report Info", res)
      this.reportInfoData = res
      //this.reloadName()
      this.viewContent = true
    })
  }
  isNavActive(link: string): boolean {
    return this.router.url.includes(link)
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
