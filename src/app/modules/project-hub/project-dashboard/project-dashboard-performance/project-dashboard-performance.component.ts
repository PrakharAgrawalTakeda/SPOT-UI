import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project-dashboard-performance',
  templateUrl: './project-dashboard-performance.component.html',
  styleUrls: ['./project-dashboard-performance.component.scss']
})
export class ProjectDashboardPerformanceComponent implements OnInit, OnDestroy {
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
  // reloadName() {
  //   const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('projecthub-navigation');
  //   this.navItem = this._fuseNavigationService.getItem('project-dashboard', navComponent.navigation)
  // }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
