import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-close-out-outcomes',
  templateUrl: './close-out-outcomes.component.html',
  styleUrls: ['./close-out-outcomes.component.scss']
})
export class CloseOutOutcomesComponent implements OnInit {
  id: string = ''
  projectViewDetails: any = {}
  lookupMasters = []
  kpiMasters = []
  viewContent: boolean = false
  editable: boolean = false
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getprojectviewdata(this.id).then((res: any) => {
      this.auth.KPIMaster().then((kpis: any) => {
        this.auth.lookupMaster().then((lookup: any) => {
          this.projectViewDetails = res
          this.lookupMasters = lookup
          this.kpiMasters = kpis
          console.log("OVERALL DATA", this.projectViewDetails)
          this.projecthubservice.lookUpMaster = lookup
          this.projecthubservice.kpiMasters = kpis
          this.editable = this.projecthubservice.roleControllerControl.projectHub.projectBoard.overallStatusEdit
          //View Content
          this.viewContent = true
        })
      })
    })
  }

}
