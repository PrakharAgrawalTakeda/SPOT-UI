import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-funding-edit',
  templateUrl: './funding-edit.component.html',
  styleUrls: ['./funding-edit.component.scss']
})
export class FundingEditComponent implements OnInit {

  Funding: any = {}
  formIntialized: boolean = false
  FundingForm = new FormGroup({
    fundingTypeId: new FormControl({}),
    fundingSourceId: new FormControl({}),
    fundingIntheplan: new FormControl({}),
    fundingAmount: new FormControl(''),
    fundingNotes: new FormControl(''),
    includeInCharter: new FormControl(false)
  })
  id:string=""

  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, private _Activatedroute: ActivatedRoute) {
    this.FundingForm.valueChanges.subscribe(res => {
      if (this.formIntialized == true) {
        this.projecthubservice.isFormChanged = true
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
   dataloader() {
  //   console.log(this.projecthubservice.all)
  //   this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
  //   if (this.projecthubservice.itemid != 'new') {
  //     this.apiService.getFunding(this.id).then((res: any) => {
  //       this.Funding = res
  //       this.FundingForm.patchValue({
  //         fundingTypeId: res.fundingIntheplan == 'Yes' ? true : false,
  //   fundingSourceId: this.projecthubservice.lookUpMaster.some(x => x.lookUpId == res.fundingSourceId) ? this.projecthubservice.lookUpMaster.find(x => x.kpiid == res.fundingSourceId) : {},
  //   fundingIntheplan: res.fundingIntheplan == 'Yes' ? true : false,
  //   fundingAmount: res.fundingAmount,
  //   fundingNotes: res.fundingNotes,
  //   includeInCharter: res.includeInCharter
  //       })
  //       if (this.projecthubservice.all.length >= 3) {
  //         console.log('hit 1')
  //         if (this.projecthubservice.all.filter(x => x.includeInProjectDashboard == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInProjectDashboard.value != true) {
  //           console.log('hit 2')
  //           this.OperationalPerformanceForm.controls.includeInProjectDashboard.disable()
  //         }
  //         if (this.projecthubservice.all.filter(x => x.includeInCloseOut == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInCloseOut.value != true) {
  //           console.log('hit 2')
  //           this.OperationalPerformanceForm.controls.includeInCloseOut.disable()
  //         }
  //         if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInCharter.value != true) {
  //           console.log('hit 2')
  //           this.OperationalPerformanceForm.controls.includeInCharter.disable()
  //         }
  //       }
  //       this.formIntialized = true
  //     })
  //   }
  //   else {
  //     if (this.projecthubservice.all.length >= 3) {
  //       console.log('hit 1')
  //       if (this.projecthubservice.all.filter(x => x.includeInProjectDashboard == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInProjectDashboard.value != true) {
  //         console.log('hit 2')
  //         this.OperationalPerformanceForm.controls.includeInProjectDashboard.disable()
  //       }
  //       if (this.projecthubservice.all.filter(x => x.includeInCloseOut == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInCloseOut.value != true) {
  //         console.log('hit 2')
  //         this.OperationalPerformanceForm.controls.includeInCloseOut.disable()
  //       }
  //       if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length >= 3 && this.OperationalPerformanceForm.controls.includeInCharter.value != true) {
  //         console.log('hit 2')
  //         this.OperationalPerformanceForm.controls.includeInCharter.disable()
  //       }
  //     }
  //     this.formIntialized = true
  //   }

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
  submitfunding() {
  //   this.projecthubservice.isFormChanged = false
  //   var formValue = this.OperationalPerformanceForm.getRawValue()
  //   var mainObj: any = {
  //     projectId: this.projecthubservice.projectid,
  //     status: formValue.status,
  //     kpiid: Object.keys(formValue.kpiid).length > 0 ? formValue.kpiid.kpiid : '',
  //     metric: formValue.metric,
  //     currentState: formValue.currentState,
  //     targetPerformance: formValue.targetPerformance,
  //     actualPerformance: formValue.actualPerformance,
  //     includeInProjectDashboard: formValue.includeInProjectDashboard,
  //     //Common values end
  //     keySuccessUniqueId: '',
  //     includeInCharter: formValue.includeInCharter,
  //     includeInCloseOut: formValue.includeInCloseOut,
  //     includeinProposal: null,
  //     ptrbid: '',
  //     benefitDescriptionJustification: '',
  //   }
  //   if (this.projecthubservice.itemid != 'new') {
  //     mainObj.keySuccessUniqueId = this.OperationalPerformance.keySuccessUniqueId
  //     mainObj.includeInCharter = formValue.includeInCharter
  //     mainObj.includeInCloseOut = formValue.includeInCloseOut
  //     mainObj.includeinProposal = this.OperationalPerformance.includeinProposal
  //     mainObj.ptrbid = this.OperationalPerformance.ptrbid
  //     mainObj.benefitDescriptionJustification = this.OperationalPerformance.benefitDescriptionJustification

  //     this.apiService.editOperationalPerformanceSingle(mainObj).then(res => {
  //       this.projecthubservice.submitbutton.next(true)
  //       this.projecthubservice.successSave.next(true)
  //       this.projecthubservice.toggleDrawerOpen('', '', [], '')
  //     })
  //   }
  //   else {
  //     this.apiService.addOperationalPerformanceSingle(mainObj).then(res => {
  //       this.projecthubservice.submitbutton.next(true)
  //       this.projecthubservice.successSave.next(true)
  //       this.projecthubservice.toggleDrawerOpen('', '', [], '')
  //     })
  //   }
   }

}
