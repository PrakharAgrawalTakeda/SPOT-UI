import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';

@Component({
  selector: 'app-project-benefits',
  templateUrl: './project-benefits.component.html',
  styleUrls: ['./project-benefits.component.scss']
})
export class ProjectBenefitsComponent implements OnInit {
  id: string = ''
 projectViewDetails: any = {}
  viewContent: boolean = false
  primaryKPIForm = new FormGroup({
    primaryKpi: new FormControl({})
  })
 editable: boolean = false
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute, public indicator: SpotlightIndicatorsService) {
      this.projecthubservice.submitbutton.subscribe(res=>{
        if(res){
          this.dataloader()
        }
      })
      this.projecthubservice.isNavChanged.subscribe(res=>{
        if(res){
          this.dataloader()
        }
      })
     }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getprojectviewdata(this.id).then((res: any) => {
      this.auth.KPIMaster().then((kpis: any) => {
        this.auth.lookupMaster().then((lookup: any) => {
          this.projectViewDetails = res

          console.log("OVERALL DATA", this.projectViewDetails.overallPerformace)
          this.projecthubservice.lookUpMaster = lookup
          this.projecthubservice.kpiMasters = kpis
          this.editable = this.projecthubservice.roleControllerControl.projectHub.projectBoard.overallStatusEdit
          this.primaryKPIForm.controls.primaryKpi.patchValue(this.projectViewDetails.projectData.primaryKpi ? kpis.find(x => x.kpiid == this.projectViewDetails.projectData.primaryKpi) : {})
          if(!this.projecthubservice.roleControllerControl.projectBenefits){
            this.primaryKPIForm.controls.primaryKpi.disable()
          }
          //View Content
          this.viewContent = true
        })
      })
    })
  }

}
