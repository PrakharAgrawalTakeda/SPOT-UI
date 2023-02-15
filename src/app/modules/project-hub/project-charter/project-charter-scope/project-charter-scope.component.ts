import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-project-charter-scope',
  templateUrl: './project-charter-scope.component.html',
  styleUrls: ['./project-charter-scope.component.scss']
})
export class ProjectCharterScopeComponent implements OnInit {

  id: string = ''
  projectViewDetails: any = {}
  lookupMasters = []
  kpiMasters = []
  viewContent: boolean = false
  editable: boolean = false
  scopeForm = new FormGroup({
      projectDescription: new FormControl(''),
     // detailedDescription: new FormControl(''),
      targetEndState: new FormControl(''),
      //benefitsRealizedOutcome: new FormControl('')
  })
  primaryKPIForm = new FormGroup({
    primaryKpi: new FormControl({})
  })

  constructor(
      public projectApiService: ProjectApiService,
      public projecthubservice: ProjectHubService,
      public auth: AuthService,
      private _Activatedroute: ActivatedRoute) {
      this.projecthubservice.submitbutton.subscribe(res => {
          if (res == true) {
              this.dataloader()
          }
      })
  }

  ngOnInit(): void {
      this.dataloader()
  }
  dataloader() {
      //debugger;
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      this.projectApiService.getprojectviewdata(this.id).then((res: any) => {
          this.projectApiService.getproject(this.id).then((data: any) => {
              this.projectApiService.projectCharterSingle(this.id).then((data1: any) => {
                  this.auth.KPIMaster().then((kpis: any) => {
                      this.auth.lookupMaster().then((lookup: any) => {
                      this.projectViewDetails = res
                      this.lookupMasters = lookup
                      this.kpiMasters = kpis
                      this.scopeForm.patchValue({
                          projectDescription: data.projectDescription,
                         // detailedDescription: data1.detailedDescription,
                          targetEndState: data.targetEndState,
                          //benefitsRealizedOutcome: data.benefitsRealizedOutcome
                      })
                      console.log("OVERALL DATA", this.projectViewDetails)
                      this.projecthubservice.lookUpMaster = lookup
                      this.projecthubservice.kpiMasters = kpis
                      this.editable = this.projecthubservice.roleControllerControl.projectHub.projectBoard.overallStatusEdit
                      this.primaryKPIForm.controls.primaryKpi.patchValue(this.projectViewDetails.projectData.primaryKpi ? kpis.find(x => x.kpiid == this.projectViewDetails.projectData.primaryKpi) : {})
                      this.primaryKPIForm.controls.primaryKpi.disable()
                      if (!this.projecthubservice.roleControllerControl.projectBenefits) {
                        this.primaryKPIForm.controls.primaryKpi.disable()
                      }

                      this.viewContent = true
              })
          })
      })
  })
  })

      this.disabler()
  }

  disabler() {
      this.scopeForm.disable()
  }

}
