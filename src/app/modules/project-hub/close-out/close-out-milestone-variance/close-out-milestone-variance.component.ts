import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-close-out-milestone-variance',
  templateUrl: './close-out-milestone-variance.component.html',
  styleUrls: ['./close-out-milestone-variance.component.scss']
})
export class CloseOutMilestoneVarianceComponent implements OnInit, OnDestroy {
  projectViewDetails: any = {}
  viewContent: boolean = false
  id: string = ''
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(public projecthubservice: ProjectHubService,
    private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute) {
      this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      console.log(res)
      if(res == true)
      {
        this.dataloader()
      } })
    }

    ngOnInit(): void {
      this.dataloader()
  }
  dataloader() {
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      this.apiService.getprojectviewdata(this.id).then((res) => {
          this.projectViewDetails = res
          this.viewContent = true
      });
    }
    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
    }
}
