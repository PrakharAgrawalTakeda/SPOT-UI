import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-operational-performance-bulk-edit',
  templateUrl: './operational-performance-bulk-edit.component.html',
  styleUrls: ['./operational-performance-bulk-edit.component.scss']
})
export class OperationalPerformanceBulkEditComponent implements OnInit {
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' = 'Normal'
  projectViewDetails: any = {}
  opDb = []
  submitObj = []
  viewContent: boolean = false
  operationalPerformanceForm = new FormArray([])
  operationalPerformanceEditStack = []
  editable: boolean = false
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService,
    public fuseAlert: FuseConfirmationService, private _Activatedroute: ActivatedRoute, public indicator: SpotlightIndicatorsService, private router: Router) {
    this.operationalPerformanceForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.changeChecker()
        if (JSON.stringify(this.submitObj) == JSON.stringify(this.opDb)) {
          this.projecthubservice.isFormChanged = false
        }
        else {
          this.projecthubservice.isFormChanged = true
        }
      }
    })

  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.apiService.getprojectviewdata(this.projecthubservice.projectid).then((res: any) => {
      this.projectViewDetails = res
      for (var i of this.projectViewDetails.overallPerformace) {
        this.opDb.push(i)
        this.operationalPerformanceForm.push(new FormGroup({
          keySuccessUniqueId: new FormControl(i.keySuccessUniqueId),
          projectId: new FormControl(this.projecthubservice.projectid),
          metric: new FormControl(i.metric),
          currentState: new FormControl(i.currentState),
          targetPerformance: new FormControl(i.targetPerformance),
          includeInCharter: new FormControl(i.includeInCharter),
          kpiid: new FormControl(i.kpiid && i.kpiid != '' ? this.projecthubservice.kpiMasters.find(x => x.kpiid == i.kpiid) : {}),
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
      this.viewContent = true
    })
  }

  getLookUpName(lookUpId: string): string {
    return lookUpId && lookUpId != '' ? this.projecthubservice.lookUpMaster.find(x => x.lookUpId == lookUpId).lookUpName : ''
  }
  getKPIName(kpiid: string): string {
    return this.projecthubservice.kpiMasters.find(x => x.kpiid == kpiid) ? this.projecthubservice.kpiMasters.find(x => x.kpiid == kpiid).kpiname : ''
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
    return this.projecthubservice.lookUpMaster.filter(x => x.lookUpParentId == "2A4E375B-B9F8-4647-B4CB-71268B52A938")
  }
  disabler() {
    var formValue = this.operationalPerformanceForm.getRawValue()
    if (formValue.length > 0) {
      if (formValue.filter(x => x.includeInProjectDashboard == true).length < 3) {
        for (var i of this.operationalPerformanceForm.controls) {
          i['controls']['includeInProjectDashboard'].enable()
        }
      }
      if (formValue.filter(x => x.includeInCharter == true).length < 3) {
        for (var i of this.operationalPerformanceForm.controls) {
          i['controls']['includeInCharter'].enable()
        }
      }
      else {
        for (var i of this.operationalPerformanceForm.controls) {
          if (i['controls']['includeInProjectDashboard'].value != true) {
            i['controls']['includeInProjectDashboard'].disable()
          }
          if (i['controls']['includeInCharter'].value != true) {
            i['controls']['includeInCharter'].disable()
          }
        }
      }
      if (formValue.filter(x => x.includeInCloseOut == true).length < 3) {
        for (var i of this.operationalPerformanceForm.controls) {
          i['controls']['includeInCloseOut'].enable()
        }
      }
      else {
        for (var i of this.operationalPerformanceForm.controls) {
          if (i['controls']['includeInCloseOut'].value != true) {
            i['controls']['includeInCloseOut'].disable()
          }
        }
      }
    }
  }

  changeChecker() {
    var formValue = this.operationalPerformanceForm.getRawValue()
    formValue.length > 0 ? this.submitObj = formValue.map(x => {
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
    }) : this.submitObj = []
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
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Are you Sure?",
      "message": "Are you sure you want to Delete this Record? ",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Remove",
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
    })
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
        projectId: new FormControl(this.projecthubservice.projectid),
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
      var div = document.getElementsByClassName('datatable-scroll')[0]
      setTimeout(() => {
        div.scroll({
          top: div.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
  submitOP() {
    this.changeChecker()
    if (JSON.stringify(this.submitObj) == JSON.stringify(this.opDb)) {
      //this.projecthubservice.submitbutton.next(true)
      //this.projecthubservice.successSave.next(true)
      this.projecthubservice.toggleDrawerOpen('', '',[],'',true)
    }
    else {
      this.apiService.bulkeditKeySuccess(this.submitObj, this.projecthubservice.projectid).then(resp => {
        this.projecthubservice.isFormChanged = false
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.successSave.next(true)
        this.projecthubservice.toggleDrawerOpen('', '',[],'',true)
      })
    }
  }


}
