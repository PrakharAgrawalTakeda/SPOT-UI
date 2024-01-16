import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { GlobalBusinessCaseOptions } from 'app/shared/global-business-case-options';
import { ProjectApiService } from '../../project-api.service';
@Component({
  selector: 'app-feasibility-edit',
  templateUrl: './feasibility-edit.component.html',
  styleUrls: ['./feasibility-edit.component.scss']
})
export class FeasibilityEditComponent implements OnInit {
  @Input() optionType: 'recommended-option' | 'option-2' | 'option-3' = 'recommended-option'
  optionId: string = ''
  optionInfoData: any = {}
  id: string = ''
  feasibilityData = [{
    component: 'People',
    rating: 'peopleRatingId',
    justification: 'peopleJustification'
  },
  {
    component: 'Technology',
    rating: 'technologyRatingId',
    justification: 'technologyJustification'
  },
  {
    component: 'Business Processes',
    rating: 'businessCaseProcessId',
    justification: 'businessProcessJustification'
  },
  {
    component: 'Manufacturing Processes',
    rating: 'manufacturingProcessId',
    justification: 'manufacturingProcessJustification'
  },
  {
    component: 'Equipment',
    rating: 'equipmentRatingId',
    justification: 'equipementJustification'
  }]
  viewContent = false
  optionInfoForm = new FormGroup({
    peopleRatingId: new FormControl(null),
    peopleJustification: new FormControl(''),
    technologyRatingId: new FormControl(null),
    technologyJustification: new FormControl(''),
    businessCaseProcessId: new FormControl(null),
    businessProcessJustification: new FormControl(''),
    manufacturingProcessId: new FormControl(null),
    manufacturingProcessJustification: new FormControl(''),
    equipmentRatingId: new FormControl(null),
    equipementJustification: new FormControl(''),
  })
  constructor(private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute,
    private portApiService: PortfolioApiService,
    private authService: AuthService,
    private projectHubService: ProjectHubService) {
    this.optionInfoForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projectHubService.isFormChanged = true
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    if (this.optionType == 'recommended-option') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_1
    }
    else if (this.optionType == 'option-2') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_2
    }
    else if (this.optionType == 'option-3') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_3
    }
    this.apiService.getBusinessCaseOptionInfoData(this.projectHubService.projectid, this.optionId).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {

        console.log("Option Info Data", res)
        this.optionInfoData = res
        this.optionInfoForm.patchValue({
          peopleRatingId: res.peopleRatingId ? lookup.find(x => x.lookUpId == res.peopleRatingId) : '',
          peopleJustification: res.peopleJustification,
          technologyRatingId: res.technologyRatingId ? lookup.find(x => x.lookUpId == res.technologyRatingId) : '',
          technologyJustification: res.technologyJustification,
          businessCaseProcessId: res.businessCaseProcessId ? lookup.find(x => x.lookUpId == res.businessCaseProcessId) : '',
          businessProcessJustification: res.businessProcessJustification,
          manufacturingProcessId: res.manufacturingProcessId ? lookup.find(x => x.lookUpId == res.manufacturingProcessId) : '',
          manufacturingProcessJustification: res.manufacturingProcessJustification,
          equipmentRatingId: res.equipmentRatingId ? lookup.find(x => x.lookUpId == res.equipmentRatingId) : '',
          equipementJustification: res.equipementJustification,
        })
        this.viewContent = true
      })
    })
  }
  getDropDownValue(fromControlName: string): any {
    if (fromControlName == 'peopleRatingId') {
      return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '32873eaa-0ccc-4806-8f92-fd4a9b71d136')
    }
    else if (fromControlName == 'technologyRatingId') {
      return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == 'd5ad90ec-4361-42dc-9c06-5e35114dd2db')
    }
    else if (fromControlName == 'businessCaseProcessId') {
      return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '12159b0c-c19c-4c04-b507-7d789feae7a6')
    }
    else if (fromControlName == 'manufacturingProcessId') {
      return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == 'b0a4469a-5808-414c-b686-3792681cc9f8')
    }
    else if (fromControlName == 'equipmentRatingId') {
      return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '3f9fd31e-0640-4a47-985d-28637afdf121')
    }
  }
  submitOptionInfo() {
    this.projectHubService.isFormChanged = false
    var mainObj = this.optionInfoData
    var formValue = this.optionInfoForm.getRawValue()
    mainObj.businessOptionId = mainObj.businessOptionId ? mainObj.businessOptionId : this.optionId
    mainObj.peopleRatingId = Object.keys(formValue.peopleRatingId).length > 0 ? formValue.peopleRatingId.lookUpId : null
    mainObj.peopleJustification = formValue.peopleJustification
    mainObj.technologyRatingId = Object.keys(formValue.technologyRatingId).length > 0 ? formValue.technologyRatingId.lookUpId : null
    mainObj.technologyJustification = formValue.technologyJustification
    mainObj.businessCaseProcessId = Object.keys(formValue.businessCaseProcessId).length > 0 ? formValue.businessCaseProcessId.lookUpId : null
    mainObj.businessProcessJustification = formValue.businessProcessJustification
    mainObj.manufacturingProcessId = Object.keys(formValue.manufacturingProcessId).length > 0 ? formValue.manufacturingProcessId.lookUpId : null
    mainObj.manufacturingProcessJustification = formValue.manufacturingProcessJustification
    mainObj.equipmentRatingId = Object.keys(formValue.equipmentRatingId).length > 0 ? formValue.equipmentRatingId.lookUpId : null
    mainObj.equipementJustification = formValue.equipementJustification
    this.apiService.updateBusinessCaseOptionInfoDetails(mainObj,this.projectHubService.projectid).then(secondRes => {
      this.projectHubService.isNavChanged.next(true)
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }
}

