import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { EventType } from '@azure/msal-browser';


@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectTeamComponent implements OnInit {
  teamMembers: any = []
  id: string = ''
  isGrid: boolean = false
  Urlval: any;
  chartercount: string;
  @Output() eventName = new EventEmitter<EventType>();
  @Input() mode: 'Project-Teams' | 'project-charter-project-teams' = 'Project-Teams';
  constructor(private Router: Router, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService) {
    this.projecthubservice.submitbutton.subscribe(res => {
      if (res == true) {
        this.dataloader()
      }
    })
   }

  ngOnInit(): void {
    const url = this.Router.url;
    this.Urlval = url.substring(url.lastIndexOf('/') + 1);
    this.dataloader()
  }
  dataloader(){
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getmembersbyproject(this.id).then((res) => {
      console.log(res)
      this.teamMembers = res
      this.chartercount = this.teamMembers.filter(x => x.includeInCharter == true).length;
      localStorage.setItem('chartercount', this.chartercount);
      for (let i = 0; i < this.teamMembers.length; i++) {
        if (this.teamMembers[i].includeInCharter === null) {
          this.teamMembers[i].includeInCharter = false;
        }
      }
    })
  }

}
