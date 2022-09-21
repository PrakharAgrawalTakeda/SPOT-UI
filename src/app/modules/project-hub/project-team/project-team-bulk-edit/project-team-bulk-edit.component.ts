import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-project-team-bulk-edit',
  templateUrl: './project-team-bulk-edit.component.html',
  styleUrls: ['./project-team-bulk-edit.component.scss']
})
export class ProjectTeamBulkEditComponent implements OnInit {

  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService) { }
  teamMembers: any = []
  viewContent: boolean = false
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader(){
    this.apiService.getmembersbyproject(this.projecthubservice.projectid).then((res) => {
      console.log(res)
      this.teamMembers = res
      this.viewContent = true
    })
  }

}
