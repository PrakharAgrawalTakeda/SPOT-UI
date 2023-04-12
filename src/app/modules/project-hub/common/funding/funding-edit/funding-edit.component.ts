import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';
import { AuthService } from 'app/core/auth/auth.service';
import { GlobalBusinessCaseOptions } from 'app/shared/global-business-case-options';

@Component({
  selector: 'app-funding-edit',
  templateUrl: './funding-edit.component.html',
  styleUrls: ['./funding-edit.component.scss']
})
export class FundingEditComponent implements OnInit {
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Business-Case' = 'Normal'
  @Input() optionType: 'recommended-option' | 'option-2' | 'option-3' = 'recommended-option'
  @Input() lookup: any;
  Funding: any = {}
  formIntialized: boolean = false
  FundingForm = new FormGroup({
    fundingTypeId: new FormControl(''),
    fundingSourceId: new FormControl(''),
    fundingSourceName: new FormControl(''),
    fundingIntheplan: new FormControl(null),
    fundingAmount: new FormControl(0),
    fundingAmountFxconv: new FormControl(null),
    fundingUniqueId: new FormControl(''),
    fundingNotes: new FormControl(''),
    includeInCharter: new FormControl(false),
    includeInBusinessCase: new FormControl(false),
    projectId: new FormControl(''),
  })

  FundingBCForm = new FormGroup({
    businessOptionId: new FormControl(''),
    businessFundingUniqueId: new FormControl(''),
    fundingAmount: new FormControl(0),
    fundingAmountFxconv: new FormControl(null),
    fundingIntheplan: new FormControl(null),
    fundingNotes: new FormControl(''),
    fundingSourceId: new FormControl(''),
    fundingSourceName: new FormControl(''),
    fundingTypeId: new FormControl(''),
    includeInBusinessCase: new FormControl(false)
  })

  id: string = ""
  fundingdata: any;
  fundingSourceData: any;
  lookupdata: any;
  localcurrency: any;
  Amount: any;
  optionId: any;
  dataIntialized: boolean = false
  labelText: string;
  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public auth: AuthService, private _Activatedroute: ActivatedRoute, private portApiService: PortfolioApiService) {
    this.FundingForm.valueChanges.subscribe(res => {
      if (this.formIntialized == true) {
        this.projecthubservice.isFormChanged = true
      }
    })
    this.FundingBCForm.valueChanges.subscribe(res => {
      if (this.formIntialized == true) {
        this.projecthubservice.isFormChanged = true
      }
    })
  }

  ngOnInit() {
    
    if (this.mode == 'Project-Charter') {
      this.id = this._Activatedroute.parent.snapshot.paramMap.get("id")
      this.apiService.getCostFunding(this.id).then((res: any) => {
      this.portApiService.getfilterlist().then((po: any) => {
        this.auth.lookupMaster().then((resp: any) => {
          this.fundingSourceData = po
          this.lookupdata = resp
          this.localcurrency = res.localCurrency
          this.Amount = this.localcurrency.localCurrencyAbbreviation
          this.labelText = `Amount (${this.Amount})`
          this.dataIntialized = true
          
          console.log(this.projecthubservice.all)
          if (this.projecthubservice.all) {
            if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length >= 3) {
              if (this.FundingForm.value.includeInCharter != true) {
                this.FundingForm.controls['includeInCharter'].disable()
              }
            }
            if (this.projecthubservice.all.filter(x => x.includeInBusinessCase == true).length >= 2) {
              if (this.FundingBCForm.value.includeInBusinessCase != true) {
                this.FundingBCForm.controls['includeInBusinessCase'].disable()
              }
            }
          }
          this.FundingForm.valueChanges.subscribe(res => {
            this.projecthubservice.isFormChanged = true
          })
        })
      })
    })
    }

    if (this.mode != 'Project-Charter' && (this.optionType == 'recommended-option' || this.optionType=='option-2' || 
    this.optionType == 'option-3')) {
      this.id = this._Activatedroute.parent.snapshot.paramMap.get("id")
      this.apiService.getCostFunding(this.id).then((res: any) => {
        this.portApiService.getfilterlist().then((po: any) => {
          this.auth.lookupMaster().then((resp: any) => {
            this.fundingSourceData = po
            this.lookupdata = resp
            this.localcurrency = res.localCurrency
            this.Amount = this.localcurrency.localCurrencyAbbreviation
            this.labelText = `Amount (${this.Amount})`
          this.dataIntialized = true
          
          console.log(this.projecthubservice.all)
          if (this.projecthubservice.all) {
            if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length >= 3) {
              if (this.FundingForm.value.includeInCharter != true) {
                this.FundingForm.controls['includeInCharter'].disable()
              }
            }
            if (this.projecthubservice.all.filter(x => x.includeInBusinessCase == true).length >= 2) {
              if (this.FundingBCForm.value.includeInBusinessCase != true) {
                this.FundingBCForm.controls['includeInBusinessCase'].disable()
              }
            }
          }
          this.FundingBCForm.valueChanges.subscribe(res => {
            this.projecthubservice.isFormChanged = true
          })
        })
      })
    })
    }





    // this.FundingBCForm.valueChanges.subscribe(res => {
    //   this.projecthubservice.isFormChanged = true
    // })

  }


  getfundingtype(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == 'b127f31e-aeae-4940-ba32-ddd0d4e5287b').sort((a, b) => {
      return a.lookUpOrder - b.lookUpOrder;
    })
  }
  getfundingintheplan(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == 'c58fb456-3901-4677-9ec5-f4eada7158e6').sort((a, b) => {
      return b.lookUpOrder - a.lookUpOrder;
    })
  }

  getPO(): string {
    return this.fundingSourceData.portfolioOwner.filter(x => x.isPortfolioOwner == true)
  }

  getSource(source: string): string {
    return source ? this.fundingSourceData.portfolioOwner.find(x => x.portfolioOwnerId == source).portfolioOwner : ''
  }
  submitfunding() {
    this.projecthubservice.isFormChanged = false
    var funding = this.FundingForm.getRawValue()
    var BCfunding = this.FundingBCForm.getRawValue()
    console.log(this.optionType)
    if (this.mode == 'Project-Charter') {
      var mainObj = {
        fundingUniqueId: "",
        projectId: this.projecthubservice.projectid,
        fundingTypeId: funding.fundingTypeId,
        fundingSourceId: funding.fundingSourceId,
        fundingIntheplan: funding.fundingIntheplan,
        fundingAmount: funding.fundingAmount,
        fundingNotes: funding.fundingNotes,
        includeInCharter: funding.includeInCharter,
        fundingAmountFxconv: funding.fundingAmountFxconv,
        includeInBusinessCase: false
      }
      this.apiService.addFunding(mainObj).then(res => {
        this.apiService.updateReportDates(this.projecthubservice.projectid, "ModifiedDate").then(secondRes => {
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
        })

      })
    }
    if (this.mode != 'Project-Charter' && this.optionType == 'recommended-option') {
      var submitObj = {
        fundingUniqueId: "",
        businessFundingUniqueId: "",
        businessOptionId: GlobalBusinessCaseOptions.OPTION_1,
        projectId: this.projecthubservice.projectid,
        fundingTypeId: BCfunding.fundingTypeId,
        fundingSourceId: BCfunding.fundingSourceId,
        fundingIntheplan: BCfunding.fundingIntheplan,
        fundingAmount: BCfunding.fundingAmount,
        fundingNotes: BCfunding.fundingNotes,
        includeInCharter: false,
        fundingAmountFxconv: BCfunding.fundingAmountFxconv,
        includeInBusinessCase: BCfunding.includeInBusinessCase
      }
      this.apiService.addBCFunding(submitObj, GlobalBusinessCaseOptions.OPTION_1,this.projecthubservice.projectid).then(res => {
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
        })
    }

    if (this.mode != 'Project-Charter' && this.optionType == 'option-2') {
      var submitObj = {
        fundingUniqueId: "",
        businessFundingUniqueId: "",
        businessOptionId: GlobalBusinessCaseOptions.OPTION_2,
        projectId: this.projecthubservice.projectid,
        fundingTypeId: BCfunding.fundingTypeId,
        fundingSourceId: BCfunding.fundingSourceId,
        fundingIntheplan: BCfunding.fundingIntheplan,
        fundingAmount: BCfunding.fundingAmount,
        fundingNotes: BCfunding.fundingNotes,
        includeInCharter: false,
        fundingAmountFxconv: BCfunding.fundingAmountFxconv,
        includeInBusinessCase: BCfunding.includeInBusinessCase
      }
      this.apiService.addBCFunding(submitObj, GlobalBusinessCaseOptions.OPTION_2,this.projecthubservice.projectid).then(res => {
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
        })
    }
    if (this.mode != 'Project-Charter' && this.optionType == 'option-3') {
      var submitObj = {
        fundingUniqueId: "",
        businessFundingUniqueId: "",
        businessOptionId: GlobalBusinessCaseOptions.OPTION_3,
        projectId: this.projecthubservice.projectid,
        fundingTypeId: BCfunding.fundingTypeId,
        fundingSourceId: BCfunding.fundingSourceId,
        fundingIntheplan: BCfunding.fundingIntheplan,
        fundingAmount: BCfunding.fundingAmount,
        fundingNotes: BCfunding.fundingNotes,
        includeInCharter: false,
        fundingAmountFxconv: BCfunding.fundingAmountFxconv,
        includeInBusinessCase: BCfunding.includeInBusinessCase
      }
      console.log(submitObj)
      this.apiService.addBCFunding(submitObj, GlobalBusinessCaseOptions.OPTION_3,this.projecthubservice.projectid).then(res => {
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
        })
    }
  }

}
