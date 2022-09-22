import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';

@Component({
  selector: 'app-project-benefits',
  templateUrl: './project-benefits.component.html',
  styleUrls: ['./project-benefits.component.scss']
})
export class ProjectBenefitsComponent implements OnInit {
  id: string = ''
  kpiMaster= []
  lookUpMaster = []
  projectViewDetails = {}
  viewContent: boolean = false
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService,
    public fuseAlert: FuseConfirmationService, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getprojectviewdata(this.id).then((res: any) => {
      this.auth.KPIMaster().then((kpis:any) => {
        this.auth.lookupMaster().then((lookup:any) => {
          this.projectViewDetails = res
          this.kpiMaster = kpis
          this.lookUpMaster = lookup
          this.viewContent = true
        })
      })
    })
  }
}
