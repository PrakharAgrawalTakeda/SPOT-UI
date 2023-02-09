import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { GlobalBusinessCaseOptions } from 'app/shared/global-business-case-options';
import { ProjectApiService } from '../../project-api.service';
@Component({
  selector: 'app-option-info-edit',
  templateUrl: './option-info-edit.component.html',
  styleUrls: ['./option-info-edit.component.scss']
})
export class OptionInfoEditComponent implements OnInit {
  @Input() optionType: 'recommended-option' | 'option-2' | 'option-3' = 'recommended-option'
  optionId: string = ''
  optionInfoData: any = {}
  id: string = ''
  viewContent = false
  optionInfoForm = new FormGroup({
    optionTitle: new FormControl(''),
    proposalStatement: new FormControl(''),
    detailedDescription: new FormControl(''),
    rationaleWhyBestOption: new FormControl(''),
    tradeoffsConsiderations: new FormControl(''),
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
      console.log("Option Info Data", res)
      this.optionInfoData = res
      this.optionInfoForm.patchValue({
        optionTitle: res.optionTitle,
        proposalStatement: res.proposalStatement,
        detailedDescription: res.detailedDescription,
        rationaleWhyBestOption: res.rationaleWhyBestOption,
        tradeoffsConsiderations: res.tradeoffsConsiderations,
      })
      this.viewContent = true
    })
  }

  submitOptionInfo() {
    this.projectHubService.isFormChanged = false
    var mainObj = this.optionInfoData
    var formValue = this.optionInfoForm.getRawValue()
    mainObj.businessOptionId = mainObj.businessOptionId ? mainObj.businessOptionId : this.optionId
    mainObj.optionTitle = formValue.optionTitle
    mainObj.proposalStatement = formValue.proposalStatement
    mainObj.detailedDescription = formValue.detailedDescription
    mainObj.rationaleWhyBestOption = formValue.rationaleWhyBestOption
    mainObj.tradeoffsConsiderations = formValue.tradeoffsConsiderations
    this.apiService.updateBusinessCaseOptionInfoDetails(mainObj,this.projectHubService.projectid).then(secondRes => {
      this.projectHubService.isNavChanged.next(true)
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }
}
