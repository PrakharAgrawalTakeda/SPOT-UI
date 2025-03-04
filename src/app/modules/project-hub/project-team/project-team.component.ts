import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { EventType } from '@azure/msal-browser';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectTeamComponent implements OnInit, OnDestroy {
  @Input() mode: 'Normal' | 'Project-Proposal' | 'Project-Charter' | 'Project-Dashboards' = 'Normal'
  teamMembers: any = []
  id: string = ''
  isGrid: boolean = false
  Urlval: any;
  bulkEditType: string = 'ProjectTeamBulkEdit';
  addSingle: string = 'ProjectTeamAddSingle';
  chartercount: string;
  isStrategicInitiative:boolean = false
  @Output() eventName = new EventEmitter<EventType>();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private Router: Router, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, public projecthubservice: ProjectHubService) {
    this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
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
  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    if (this.mode == 'Project-Proposal') {
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      this.bulkEditType = 'ProjectTeamBulkEditProjectProposal';
      this.addSingle = 'ProjectTeamAddSingleProjectProposal'
    }
    if (this.mode == 'Project-Charter') {
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      this.bulkEditType = 'ProjectTeamBulkEditProjectCharter';
      this.addSingle = 'ProjectTeamAddSingleProjectCharter'
    }
    if (this.mode == 'Project-Charter') {
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      this.bulkEditType = 'ProjectTeamBulkEditProjectCharter';
      this.addSingle = 'ProjectTeamAddSingleProjectCharter'
    }
    if(this.id == null || this.id == ''){
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    }
    this.apiService.getmembersbyproject(this.id ? this.id : this.projecthubservice.projectid).then((res) => {
      this.apiService.getGeneralInfoData(this.id).then((result:any)=>{
      this.isStrategicInitiative = result.projectData.problemType == "Strategic Initiative / Program"
      this.teamMembers = res
      this.chartercount = this.teamMembers.filter(x => x.includeInCharter == true).length;
      localStorage.setItem('chartercount', this.chartercount);
      for (let i = 0; i < this.teamMembers.length; i++) {
        if (this.teamMembers[i].includeInCharter === null) {
          this.teamMembers[i].includeInCharter = false;
        }
      }
    })
  })
  }
  getNgxDatatableNumberHeader(): any {
    return ' ngx-number-header';
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
