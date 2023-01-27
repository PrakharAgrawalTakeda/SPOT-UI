import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-project-charter-milestones',
  templateUrl: './project-charter-milestones.component.html',
  styleUrls: ['./project-charter-milestones.component.scss']
})
export class ProjectCharterMilestonesComponent implements OnInit {

  projectViewDetails: any = {}
  viewContent: boolean = false
  id: string = ''
  constructor(public projecthubservice: ProjectHubService,
    private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute) {
      this.projecthubservice.submitbutton.subscribe(res => {
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

}
