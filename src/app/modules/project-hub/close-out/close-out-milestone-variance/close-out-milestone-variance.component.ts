import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-close-out-milestone-variance',
  templateUrl: './close-out-milestone-variance.component.html',
  styleUrls: ['./close-out-milestone-variance.component.scss']
})
export class CloseOutMilestoneVarianceComponent implements OnInit {
  projectViewDetails: any = {}
  viewContent: boolean = false
  id: string = ''
  constructor(public projecthubservice: ProjectHubService,
    private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute) { }

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

}
