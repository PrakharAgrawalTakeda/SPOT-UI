import { Component, OnInit } from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectHubService} from "../../project-hub.service";

@Component({
  selector: 'app-planning-team',
  templateUrl: './planning-team.component.html',
  styleUrls: ['./planning-team.component.scss']
})
export class PlanningTeamComponent implements OnInit {
    teamMembers: any = []
    id: string = ''
    isGrid: boolean = false
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
        this.apiService.getmembersbyproject(this.id).then((res) => {
            this.teamMembers = res
        })
    }

}
