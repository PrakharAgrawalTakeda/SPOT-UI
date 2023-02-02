import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';

@Component({
  selector: 'app-close-out-outcomes-single-edit',
  templateUrl: './close-out-outcomes-single-edit.component.html',
  styleUrls: ['./close-out-outcomes-single-edit.component.scss']
})
export class CloseOutOutcomesSingleEditComponent implements OnInit {
  viewType ='SidePanel'
  outcomeForm = new FormGroup({
    projectDescription: new FormControl(''),
    approachTaken: new FormControl(''),
    targetEndState: new FormControl(''),
    benefitsRealized: new FormControl('')
  })
  outcomeInfo: any = {}
  viewContent = false
  constructor(public projectHubService: ProjectHubService, private apiService: ProjectApiService) {
    this.outcomeForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
          this.projectHubService.isFormChanged = true
      }
    })
   }

  ngOnInit(): void {
  //   this.apiService.getGeneralInfoData(this.projectHubService.projectid).then((res: any) => {
  //     this.outcomeInfo = res
  //     this.outcomeForm.patchValue({
  //       projectDescription: res.projectData.projectDescription,
  //       approachTaken: res.projectData.approachTaken,
  //       targetEndState: res.projectData.TargetEndState,
  //       benefitsRealized: res.projectData.BenefitsRealizedOutcome
  //   })
  //     this.viewContent = true
  // })
    this.outcomeForm.patchValue({
        projectDescription: "test data",
        approachTaken: "test data",
        targetEndState: "test data",
        benefitsRealized: "test data"
    })
      this.viewContent = true
  }

}
