import { Component, Input, OnInit } from '@angular/core';
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
  lookupMasters = []
  kpiMasters = []
  primaryKPIForm = new FormGroup({
    primaryKpi: new FormControl(null),
    vcdate: new FormControl(null),
    valueCommentary: new FormControl(null)
  })
  valuecreationngxdata: any = []
  @Input() projectid: any;
  editable: boolean = false
  viewHisOpPerformance: boolean = false;
  bulkEditType: string = 'OperationalPerformanceBulkEdit';
  valueCreation: any;
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute, public indicator: SpotlightIndicatorsService) {
    this.projecthubservice.submitbutton.subscribe(res => {
      if (res) {
        this.dataloader()
      }
    })
    this.projecthubservice.isNavChanged.subscribe(res => {
      if (res) {
        this.dataloader()
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
    
  }
  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getvalueCreation(this.id).then((vc: any) => {
    this.apiService.getprojectviewdata(this.id).then((res: any) => {
      this.auth.KPIMaster().then((kpis: any) => {
        this.auth.lookupMaster().then((lookup: any) => {
          this.valueCreation = vc
          console.log("Value Creation Data",vc)
          this.projectViewDetails = res
          this.lookupMasters = lookup
          this.kpiMasters = kpis
          console.log("OVERALL DATA", this.projectViewDetails)
          console.log(this.projectViewDetails.projectData.primaryKpi)
          this.projecthubservice.lookUpMaster = lookup
          this.projecthubservice.kpiMasters = kpis
          console.log(vc.problemCapture.financialRealizationStartDate)
          this.editable = this.projecthubservice.roleControllerControl.projectHub.projectBoard.overallStatusEdit
          this.primaryKPIForm.controls.primaryKpi.patchValue(vc.problemCapture.primaryKpi ? lookup.find(x => x.lookUpId == vc.problemCapture.primaryKpi) : {})
          //this.primaryKPIForm.controls.primaryKpi.patchValue(this.projectViewDetails.projectData.primaryKpi ? kpis.find(x => x.kpiid == this.projectViewDetails.projectData.primaryKpi) : {})
          this.primaryKPIForm.controls.vcdate.patchValue(vc.problemCapture.financialRealizationStartDate)
          this.primaryKPIForm.controls.valueCommentary.patchValue(vc.problemCapture.valueCommentary)          
          this.primaryKPIForm.controls.primaryKpi.disable()
          if (!this.projecthubservice.roleControllerControl.projectBenefits) {
            this.primaryKPIForm.controls.primaryKpi.disable()
          }
          console.log(this.projectViewDetails)
          //for (var i of this.projectViewDetails.projectData) {
            this.projectViewDetails.projectData.primaryKpi = lookup.find(x => x.lookUpId == vc.problemCapture.primaryKpi) ? lookup.find(x => x.lookUpId == vc.problemCapture.primaryKpi).lookUpName : ''
          //}
          //View Content
          this.viewContent = true
          this.primaryKPIForm.disable()
        })
      })
    })
  })
  }

  openOperationalPerformance(){
    this.viewHisOpPerformance = true
    this.viewContent = true
  }

}
