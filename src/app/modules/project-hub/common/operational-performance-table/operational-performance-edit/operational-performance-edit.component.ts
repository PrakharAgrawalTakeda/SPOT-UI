import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-operational-performance-edit',
  templateUrl: './operational-performance-edit.component.html',
  styleUrls: ['./operational-performance-edit.component.scss']
})
export class OperationalPerformanceEditComponent implements OnInit {
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Project-Proposal' = 'Normal'
  OperationalPerformance: any = {}
  formIntialized: boolean = false
  OperationalPerformanceForm = new FormGroup({
    status: new FormControl(''),
    kpiid: new FormControl({}),
    metric: new FormControl(''),
    currentState: new FormControl(''),
    targetPerformance: new FormControl(''),
    actualPerformance: new FormControl(''),
    ptrbid: new FormControl([]),
    benefitDescriptionJustification: new FormControl(''),
    includeInProjectDashboard: new FormControl(false),
    includeInCloseOut: new FormControl(false),
    includeInCharter: new FormControl(false),
    includeInProposal: new FormControl(false),
  })


  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public indicator: SpotlightIndicatorsService) {
    this.OperationalPerformanceForm.valueChanges.subscribe(res => {
      if (this.formIntialized == true) {
        this.projecthubservice.isFormChanged = true
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    console.log(this.projecthubservice.all)
    if (this.projecthubservice.itemid != 'new') {
      this.apiService.getOperationalPerformanceSingle(this.projecthubservice.itemid).then((op: any) => {
        this.OperationalPerformance = op
        this.OperationalPerformanceForm.patchValue({
          status: op.status,
          kpiid: this.projecthubservice.kpiMasters.some(x => x.kpiid == op.kpiid) ? this.projecthubservice.kpiMasters.find(x => x.kpiid == op.kpiid) : {},
          metric: op.metric,
          currentState: op.currentState,
          targetPerformance: op.targetPerformance,
          actualPerformance: op.actualPerformance,
          ptrbid: op.ptrbid,
          benefitDescriptionJustification: op.benefitDescriptionJustification,
          includeInProjectDashboard: op.includeInProjectDashboard,
          includeInCloseOut: op.includeInCloseOut,
          includeInCharter: op.includeInCharter,
          includeInProposal: op.includeInProposal
        })
        if (this.projecthubservice.all.length >= 3) {
          if (this.projecthubservice.all.filter(x => x.includeInProjectDashboard == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInProjectDashboard.value != true) {
            this.OperationalPerformanceForm.controls.includeInProjectDashboard.disable()
          }
          if (this.projecthubservice.all.filter(x => x.includeInCloseOut == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInCloseOut.value != true) {
            this.OperationalPerformanceForm.controls.includeInCloseOut.disable()
          }
          if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInCharter.value != true) {
            this.OperationalPerformanceForm.controls.includeInCharter.disable()
          }
          if (this.projecthubservice.all.filter(x => x.includeInProposal == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInProposal.value != true) {
              this.OperationalPerformanceForm.controls.includeInProposal.disable()
          }
        }
        this.formIntialized = true
      })
    }
    else {
      if (this.projecthubservice.all.length >= 3) {
        if (this.projecthubservice.all.filter(x => x.includeInProjectDashboard == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInProjectDashboard.value != true) {
          this.OperationalPerformanceForm.controls.includeInProjectDashboard.disable()
        }
        if (this.projecthubservice.all.filter(x => x.includeInCloseOut == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInCloseOut.value != true) {
          this.OperationalPerformanceForm.controls.includeInCloseOut.disable()
        }
        if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInCharter.value != true) {
          this.OperationalPerformanceForm.controls.includeInCharter.disable()
        }
        if (this.projecthubservice.all.filter(x => x.includeInProposal == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInProposal.value != true) {
           this.OperationalPerformanceForm.controls.includeInProposal.disable()
        }
      }
      this.formIntialized = true
    }

  }
  getStatus(): any {
    return this.projecthubservice.lookUpMaster.filter(x => x.lookUpParentId == "2A4E375B-B9F8-4647-B4CB-71268B52A938")
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
  submitop() {
    this.projecthubservice.isFormChanged = false
    var formValue = this.OperationalPerformanceForm.getRawValue()
    var mainObj: any = {
      projectId: this.projecthubservice.projectid,
      status: formValue.status,
      kpiid: Object.keys(formValue.kpiid || {}).length > 0 ? formValue.kpiid : null,
      metric: formValue.metric,
      currentState: formValue.currentState,
      targetPerformance: formValue.targetPerformance,
      actualPerformance: formValue.actualPerformance,
      includeInProjectDashboard: formValue.includeInProjectDashboard,
      //Common values end
      keySuccessUniqueId: '',
      includeInCharter: formValue.includeInCharter,
      includeInCloseOut: formValue.includeInCloseOut,
      includeinProposal: formValue.includeInProposal,
      ptrbid: formValue.ptrbid.length > 0 ? formValue.ptrbid.map(x => x.lookUpId).join() : '',
      benefitDescriptionJustification: formValue.benefitDescriptionJustification,
    }
    if (this.projecthubservice.itemid != 'new') {
      mainObj.keySuccessUniqueId = this.OperationalPerformance.keySuccessUniqueId
      mainObj.includeInCharter = formValue.includeInCharter
      mainObj.includeInCloseOut = formValue.includeInCloseOut
      mainObj.includeinProposal = formValue.includeInProposal
      mainObj.ptrbid = formValue.ptrbid.length > 0 ? formValue.ptrbid.map(x => x.lookUpId).join() : ''
      mainObj.benefitDescriptionJustification = formValue.benefitDescriptionJustification
      this.apiService.editOperationalPerformanceSingle(mainObj).then(res => {
        if (this.mode == 'Project-Proposal') {
            this.apiService.updateReportDates(this.projecthubservice.projectid, "ProjectProposalModifiedDate").then(secondRes => {
                this.projecthubservice.submitbutton.next(true)
                this.projecthubservice.successSave.next(true)
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
            })
        }else{
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.successSave.next(true)
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
        }

      })
    }
    else {
      this.apiService.addOperationalPerformanceSingle(mainObj).then(res => {
          if (this.mode == 'Project-Proposal') {
              this.apiService.updateReportDates(this.projecthubservice.projectid, "ProjectProposalModifiedDate").then(secondRes => {
                  this.projecthubservice.submitbutton.next(true)
                  this.projecthubservice.successSave.next(true)
                  this.projecthubservice.toggleDrawerOpen('', '', [], '')
              })
          }else{
              this.projecthubservice.submitbutton.next(true)
              this.projecthubservice.successSave.next(true)
              this.projecthubservice.toggleDrawerOpen('', '', [], '')
          }
      })
    }
  }
  getPTRB(): any {
      return this.projecthubservice.lookUpMaster.filter(x => x.lookUpParentId == 'f48236da-2436-4403-a054-918313159c6e')
  }
}
