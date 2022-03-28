import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { ProjectApiService } from '../common/project-api.service';


@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {
  data: any = {}
  id: string = ''
  constructor(private apiService: ProjectApiService,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log("project-team")
    this.id=this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getmembersbyproject(this.id).then((res)=>{
        console.log(res)
        this.data.teamMembers = res
    })
      }

}
