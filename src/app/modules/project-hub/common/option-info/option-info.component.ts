import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { GlobalBusinessCaseOptions } from 'app/shared/global-business-case-options';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-option-info',
  templateUrl: './option-info.component.html',
  styleUrls: ['./option-info.component.scss']
})
export class OptionInfoComponent implements OnInit {
  @Input() optionType: 'recommended-option' | 'option-2' | 'option-3' = 'recommended-option'
  optionInfoEditType: 'OptionInfoEditRC' | 'OptionInfoEditO2' | 'OptionInfoEditO3'
  optionId: string = ''
  optionInfoData = {}
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
    private projectHubService: ProjectHubService) { }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    if (this.optionType == 'recommended-option') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_1
      this.optionInfoEditType = 'OptionInfoEditRC'
    }
    else if (this.optionType == 'option-2') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_2
      this.optionInfoEditType = 'OptionInfoEditO2'
    }
    else if (this.optionType == 'option-3') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_3
      this.optionInfoEditType = 'OptionInfoEditO3'
    }
    this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getBusinessCaseOptionInfoData(this.id, this.optionId).then((res: any) => {
      console.log("Option Info Data", res)
      this.optionInfoData = res
      this.optionInfoForm.patchValue({
        optionTitle: res.optionTitle,
        proposalStatement: res.proposalStatement,
        detailedDescription: res.detailedDescription,
        rationaleWhyBestOption: res.rationaleWhyBestOption,
        tradeoffsConsiderations: res.tradeoffsConsiderations,
      })
      this.optionInfoForm.disable()
      this.viewContent = true
    })
  }
}
