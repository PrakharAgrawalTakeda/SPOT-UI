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
  kpiMaster = []
  lookUpMaster = []
  projectViewDetails: any = {}
  opDb = []
  viewContent: boolean = false
  primaryKPIForm = new FormGroup({
    primaryKpi: new FormControl({})
  })
  operationalPerformanceForm = new FormArray([])
  operationalPerformanceEditStack = []
  editable: boolean = false
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService,
    public fuseAlert: FuseConfirmationService, private _Activatedroute: ActivatedRoute, public indicator: SpotlightIndicatorsService, private router: Router) { }

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
          this.kpiMaster = kpis
          this.lookUpMaster = lookup
          this.editable = this.projecthubservice.roleControllerControl.projectHub.projectBoard.overallStatusEdit
          this.primaryKPIForm.controls.primaryKpi.patchValue(this.projectViewDetails.projectData.primaryKpi ? this.kpiMaster.find(x => x.kpiid == this.projectViewDetails.projectData.primaryKpi) : {})
          for (var i of this.projectViewDetails.overallPerformace) {
            this.opDb.push(i)
            this.operationalPerformanceForm.push(new FormGroup({
              keySuccessUniqueId: new FormControl(i.keySuccessUniqueId),
              projectId: new FormControl(this.id),
              metric: new FormControl(i.metric),
              currentState: new FormControl(i.currentState),
              targetPerformance: new FormControl(i.targetPerformance),
              includeInCharter: new FormControl(i.includeInCharter),
              kpiid: new FormControl(i.kpiid && i.kpiid != '' ? this.kpiMaster.find(x => x.kpiid == i.kpiid) : {}),
              actualPerformance: new FormControl(i.actualPerformance),
              includeInProjectDashboard: new FormControl(i.includeInProjectDashboard),
              status: new FormControl(i.status),
              includeInCloseOut: new FormControl(i.includeInCloseOut),
              ptrbid: new FormControl(i.ptrbid),
              benefitDescriptionJustification: new FormControl(i.benefitDescriptionJustification),
              includeinProposal: new FormControl(i.includeinProposal)
            }))
          }

          this.disabler()
          //View Content
          this.viewContent = true
        })
      })
    })
  }
  getLookUpName(lookUpId: string): string {
    return lookUpId && lookUpId != '' ? this.lookUpMaster.find(x => x.lookUpId == lookUpId).lookUpName : ''
  }
  getKPIName(kpiid: string): string {
    return this.kpiMaster.find(x => x.kpiid == kpiid) ? this.kpiMaster.find(x => x.kpiid == kpiid).kpiname : ''
  }
  getIndicator(status: string): string {
    if (status == "91F35D36-B94B-44C7-9234-4AE76DB19DBB") {
      return 'Red'
    }
    else if (status == "7DFAAEDF-AB1C-4348-91B3-F2FE1C78237A") {
      return 'Yellow'
    }
    else if (status == "B12BD411-EBC7-4CC0-A8C4-5F41B8C5FC17") {
      return 'Green'
    }
    return 'Grey'
  }
  getStatus(): any {
    return this.lookUpMaster.filter(x => x.lookUpParentId == "2A4E375B-B9F8-4647-B4CB-71268B52A938")
  }
  disabler() {
    var formValue = this.operationalPerformanceForm.getRawValue()
    if (formValue.length > 0) {
      if (formValue.filter(x => x.includeInProjectDashboard == true).length < 3) {
        for (var i of this.operationalPerformanceForm.controls) {
          i['controls']['includeInProjectDashboard'].enable()
        }
      }
      else {
        for (var i of this.operationalPerformanceForm.controls) {
          if (i['controls']['includeInProjectDashboard'].value != true) {
            i['controls']['includeInProjectDashboard'].disable()
          }
        }
      }
    }
  }
  submitOP() {
    //PKPI


    //OP
    var formValue = this.operationalPerformanceForm.getRawValue()
    var submitObj = []
    if (formValue.length > 0) {
      submitObj = formValue.map(x => {
        return {
          keySuccessUniqueId: x.keySuccessUniqueId,
          projectId: x.projectId,
          metric: x.metric,
          currentState: x.currentState,
          targetPerformance: x.targetPerformance,
          includeInCharter: x.includeInCharter,
          kpiid: Object.keys(x.kpiid).length > 0 ? x.kpiid.kpiid : '',
          actualPerformance: x.actualPerformance,
          includeInProjectDashboard: x.includeInProjectDashboard,
          status: x.status,
          includeInCloseOut: x.includeInCloseOut,
          ptrbid: x.ptrbid,
          benefitDescriptionJustification: x.benefitDescriptionJustification,
          includeinProposal: x.includeinProposal
        }
      })
      if (JSON.stringify(submitObj) == JSON.stringify(this.opDb) && Object.keys(this.primaryKPIForm.controls.primaryKpi.value).length > 0 ? this.primaryKPIForm.controls.primaryKpi.value.kpiid == this.projectViewDetails.projectData.primaryKpi : this.projectViewDetails.projectData.primaryKpi == '') {
        this.projecthubservice.isNavChanged.next(true)
        this.projecthubservice.successSave.next(true)
        this.router.navigate(['project-hub/' + this.id + '/project-board'])
      }
      else {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Are you Sure?",
          "message": "Are you sure you want to Save this Information? ",
          "icon": {
            "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "warn"
          },
          "actions": {
            "confirm": {
              "show": true,
              "label": "Save",
              "color": "warn"
            },
            "cancel": {
              "show": true,
              "label": "Cancel"
            }
          },
          "dismissible": true
        }
        const operationalPerformanceAlert = this.fuseAlert.open(comfirmConfig)
        operationalPerformanceAlert.afterClosed().subscribe(close => {
          if (close == 'confirmed') {
            this.projectViewDetails.projectData.primaryKpi = Object.keys(this.primaryKPIForm.controls.primaryKpi.value).length > 0 ? this.primaryKPIForm.controls.primaryKpi.value.kpiid : ''
            this.apiService.editGeneralInfo(this.id, this.projectViewDetails.projectData).then(res => {
              this.apiService.bulkeditKeySuccess(submitObj, this.id).then(resp => {
                this.projecthubservice.isNavChanged.next(true)
                this.projecthubservice.successSave.next(true)
                this.router.navigate(['project-hub/' + this.id + '/project-board'])
              })
            })
          }
        })
      }
    }
  }
  cancel() {
    var formValue = this.operationalPerformanceForm.getRawValue()
    var submitObj = []
    if (formValue.length > 0) {
      submitObj = formValue.map(x => {
        return {
          keySuccessUniqueId: x.keySuccessUniqueId,
          projectId: x.projectId,
          metric: x.metric,
          currentState: x.currentState,
          targetPerformance: x.targetPerformance,
          includeInCharter: x.includeInCharter,
          kpiid: Object.keys(x.kpiid).length > 0 ? x.kpiid.kpiid : '',
          actualPerformance: x.actualPerformance,
          includeInProjectDashboard: x.includeInProjectDashboard,
          status: x.status,
          includeInCloseOut: x.includeInCloseOut,
          ptrbid: x.ptrbid,
          benefitDescriptionJustification: x.benefitDescriptionJustification,
          includeinProposal: x.includeinProposal
        }
      })
      if (JSON.stringify(submitObj) == JSON.stringify(this.opDb) && Object.keys(this.primaryKPIForm.controls.primaryKpi.value).length > 0 ? this.primaryKPIForm.controls.primaryKpi.value.kpiid == this.projectViewDetails.projectData.primaryKpi : this.projectViewDetails.projectData.primaryKpi == '') {
        this.router.navigate(['project-hub/' + this.id + '/project-board'])
      }
      else {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Are you Sure?",
          "message": "Are you sure you want to Cancel? ",
          "icon": {
            "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "warn"
          },
          "actions": {
            "confirm": {
              "show": true,
              "label": "Ok",
              "color": "warn"
            },
            "cancel": {
              "show": true,
              "label": "Cancel"
            }
          },
          "dismissible": true
        }
        const operationalPerformanceAlert = this.fuseAlert.open(comfirmConfig)
        operationalPerformanceAlert.afterClosed().subscribe(close => {
          if (close == 'confirmed') {
            this.router.navigate(['project-hub/' + this.id + '/project-board'])
          }
        })
      }
    }
  }
  //Table Edit
  operationalPerformanceTableEditRow(row: number) {
    if (this.projecthubservice.roleControllerControl.projectBenefits) {
      if (!this.operationalPerformanceEditStack.includes(row)) {
        this.operationalPerformanceEditStack.push(row)
      }
    }
  }
  deleteOP(rowIndex: number) {
    this.projectViewDetails.overallPerformace.splice(rowIndex, 1)
    this.operationalPerformanceForm.removeAt(rowIndex)
    if (this.operationalPerformanceEditStack.includes(rowIndex)) {
      this.operationalPerformanceEditStack.splice(this.operationalPerformanceEditStack.indexOf(rowIndex), 1)
    }
    this.operationalPerformanceEditStack = this.operationalPerformanceEditStack.map(function (value) {
      return value > rowIndex ? value - 1 : value;
    })
    this.disabler()
    this.projectViewDetails.overallPerformace = [...this.projectViewDetails.overallPerformace]
  }
  addOP() {
    {
      var j = [{
        keySuccessUniqueId: '',
        projectId: '',
        metric: '',
        currentState: '',
        targetPerformance: '',
        includeInCharter: '',
        kpiid: '',
        actualPerformance: '',
        includeInProjectDashboard: '',
        status: '',
        includeInCloseOut: '',
        ptrbid: '',
        benefitDescriptionJustification: '',
        includeinProposal: ''
      }]
      this.operationalPerformanceForm.push(new FormGroup({
        keySuccessUniqueId: new FormControl(''),
        projectId: new FormControl(this.id),
        metric: new FormControl(''),
        currentState: new FormControl(''),
        targetPerformance: new FormControl(''),
        includeInCharter: new FormControl(false),
        kpiid: new FormControl({}),
        actualPerformance: new FormControl(''),
        includeInProjectDashboard: new FormControl(false),
        status: new FormControl(''),
        includeInCloseOut: new FormControl(false),
        ptrbid: new FormControl(''),
        benefitDescriptionJustification: new FormControl(''),
        includeinProposal: new FormControl(false)
      }))
      this.projectViewDetails.overallPerformace = [...this.projectViewDetails.overallPerformace, ...j]
      this.disabler()
      this.operationalPerformanceEditStack.push(this.projectViewDetails.overallPerformace.length - 1)
    }

  }

}
