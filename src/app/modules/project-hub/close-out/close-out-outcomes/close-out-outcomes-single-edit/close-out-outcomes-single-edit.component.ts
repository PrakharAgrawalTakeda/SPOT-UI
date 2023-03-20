import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { CloseOutApiService } from '../../close-out.service';

@Component({
  selector: 'app-close-out-outcomes-single-edit',
  templateUrl: './close-out-outcomes-single-edit.component.html',
  styleUrls: ['./close-out-outcomes-single-edit.component.scss']
})
export class CloseOutOutcomesSingleEditComponent implements OnInit {
  viewType ='SidePanel'
  outcomeForm = new FormGroup({
    projectDescription: new FormControl(''),
    detailedDescription: new FormControl(''),
    targetEndState: new FormControl(''),
    benefitsRealizedOutcome: new FormControl('')
  })
  outcomeInfo: any = {}
  outcomeInfoCharter: any = {}
  viewContent = false
  constructor(public projectHubService: ProjectHubService, private apiService: ProjectApiService,
        public closeoutApiService: CloseOutApiService) {
    this.outcomeForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
          this.projectHubService.isFormChanged = true
      }
    })
   }

  ngOnInit(): void {
    this.apiService.getproject(this.projectHubService.projectid).then((data: any) => {
      this.apiService.projectCharterSingle(this.projectHubService.projectid).then((data1: any) => {
      this.outcomeInfo = data
      this.outcomeInfoCharter = data1
      this.outcomeForm.patchValue({
        projectDescription: data.projectDescription,
        detailedDescription: data1.detailedDescription,
        targetEndState: data.targetEndState,
        benefitsRealizedOutcome: data.benefitsRealizedOutcome
      })
        this.viewContent = true
  })
  })
  }

  submitOutcomes() {
    this.projectHubService.isFormChanged = false
    var formValue = this.outcomeForm.getRawValue()
    var mainObj = this.outcomeInfo
    var charterObj = this.outcomeInfoCharter
    mainObj.emissionPortfolioId = mainObj.emissionPortfolioId == null ? "" : mainObj.emissionPortfolioId
    mainObj.projectDescription = formValue.projectDescription
    charterObj.detailedDescription = formValue.detailedDescription
    mainObj.targetEndState = formValue.targetEndState
    mainObj.benefitsRealizedOutcome = formValue.benefitsRealizedOutcome
    mainObj.projectId = this.projectHubService.projectid
    this.apiService.editGeneralInfo(this.projectHubService.projectid, mainObj).then(res => {
      this.apiService.BulkEditProjectCharter(this.projectHubService.projectid, charterObj).then(res1 => {
         this.apiService.updateReportDates(this.projectHubService.projectid, "CloseoutModifiedDate").then(secondRes => {
             this.projectHubService.isNavChanged.next(true)
             this.projectHubService.submitbutton.next(true)
             this.projectHubService.successSave.next(true)
             this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
      })
    })
  }

}
