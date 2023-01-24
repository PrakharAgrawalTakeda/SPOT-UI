import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';


@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectTeamComponent implements OnInit {
  @Input() mode: 'Normal' | 'Project-Proposal' | 'Project-Charter' | 'Project-Dashboards' = 'Normal'
  teamMembers: any = []
  id: string = ''
  isGrid: boolean = false
  bulkEditType: string ='ProjectTeamBulkEdit';
  addSingle: string ='ProjectTeamAddSingle';
  constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService) {
    this.projecthubservice.submitbutton.subscribe(res => {
      if (res == true) {
        this.dataloader()
      }
    })
   }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader(){
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    if(this.mode != 'Normal'){
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    }
    if(this.mode == 'Project-Proposal'){
        this.bulkEditType = 'ProjectTeamBulkEditProjectProposal';
        this.addSingle = 'ProjectTeamAddSingleProjectProposal'
    }
    this.apiService.getmembersbyproject(this.id).then((res) => {
      this.teamMembers = res
    })
  }
  getNgxDatatableNumberHeader(): any {
    return ' ngx-number-header';
  }

}
