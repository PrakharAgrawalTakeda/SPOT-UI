import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';

@Component({
  selector: 'app-project-charter-scope-single-edit',
  templateUrl: './project-charter-scope-single-edit.component.html',
  styleUrls: ['./project-charter-scope-single-edit.component.scss']
})
export class ProjectCharterScopeSingleEditComponent implements OnInit {

  viewType ='SidePanel'
  scopeForm = new FormGroup({
    projectDescription: new FormControl(''),
    detailedDescription: new FormControl(''),
    targetEndState: new FormControl(''),
    proposalStatement: new FormControl(''),
    inScope: new FormControl(''),
    outOfScope: new FormControl('')
  })
  outcomeInfo: any = {}
  outcomeInfoCharter: any = {}
  viewContent = false
  constructor(public projectHubService: ProjectHubService, private apiService: ProjectApiService) {
    this.scopeForm.valueChanges.subscribe(res => {
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
      this.scopeForm.patchValue({
        projectDescription: data.projectDescription,
        detailedDescription: data1.detailedDescription,
        targetEndState: data.targetEndState,
        proposalStatement: data1.proposalStatement,
        inScope: data1.inScope,
        outOfScope: data1.outOfScope

    })
    this.viewContent = true
  })

  })

  }

  submitScope() {
    console.log(this.projectHubService.projectid)
    this.projectHubService.isFormChanged = false
    var formValue = this.scopeForm.getRawValue()
    var mainObj = this.outcomeInfo
    console.log(this.outcomeInfo)
    var charterObj = this.outcomeInfoCharter
    mainObj.emissionPortfolioId = mainObj.emissionPortfolioId == null ? "" : mainObj.emissionPortfolioId
    mainObj.projectDescription = formValue.projectDescription
    charterObj.detailedDescription = formValue.detailedDescription
    mainObj.targetEndState = formValue.targetEndState
    charterObj.proposalStatement = formValue.proposalStatement
    charterObj.inScope = formValue.inScope
    charterObj.outOfScope = formValue.outOfScope
    charterObj.projectId = this.projectHubService.projectid
    mainObj.projectId = mainObj.projectId
    console.log(mainObj)
    console.log(charterObj)
    this.apiService.editGeneralInfo(this.projectHubService.projectid, mainObj).then(res => {
      this.apiService.BulkEditProjectCharter(charterObj, this.projectHubService.projectid).then(res1 => {
        this.projectHubService.isNavChanged.next(true)
        this.projectHubService.submitbutton.next(true)
        this.projectHubService.successSave.next(true)
        this.projectHubService.toggleDrawerOpen('', '', [], '')
      })
    })
  }

}
