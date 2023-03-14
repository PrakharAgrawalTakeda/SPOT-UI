import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-cost-edit',
  templateUrl: './cost-edit.component.html',
  styleUrls: ['./cost-edit.component.scss']
})
export class CostEditComponent {
  //@Input() optionType: 'recommended-option' | 'option-2' | 'option-3' = 'recommended-option'
  optionId: string = ''
  costfundingData: any = {}
  id: string = ''
  costData = [{
    category: 'Duration (Months)',
    baseCase: 'durationBaseCase',
    highCase: 'durationHighCase'
  },
  {
    category: 'People (FTE Months)',
    baseCase: 'peopleFtemonthsRequiredBaseCase',
    highCase: 'peopleFtemonthsRequiredHighCase'
  },
  {
    category: 'Total CAPEX',
    baseCase: 'totalCapExBaseCase',
    highCase: 'totalCapExHighCase'
  },
  {
    category: 'Total non-FTE OPEX',
    baseCase: 'totalNonFteopExBaseCase',
    highCase: 'totalNonFteopExHighCase'
  },
  {
    category: '# Functions Required',
    baseCase: 'functionsRequiredId',
    highCase: 'functionsRequiredId'
  }]
  viewContent = false
  costForm = new FormGroup({
    durationBaseCase: new FormControl(''),
    durationHighCase: new FormControl(''),
    peopleFtemonthsRequiredBaseCase: new FormControl(''),
    peopleFtemonthsRequiredHighCase: new FormControl(''),
    totalCapExBaseCase: new FormControl(''),
    totalCapExHighCase: new FormControl(''),
    totalNonFteopExBaseCase: new FormControl(''),
    totalNonFteopExHighCase: new FormControl(''),
    functionsRequiredId: new FormControl(null)
  })
  localcurrency: any;
  currency: any;
  constructor(private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute,
    private portApiService: PortfolioApiService,
    private authService: AuthService,
    private projectHubService: ProjectHubService) {
    this.costForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projectHubService.isFormChanged = true
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    //this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
    //console.log(this.id)
    this.apiService.getCostFunding(this.projectHubService.projectid).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {
        console.log("Cost Data", res)
        this.costfundingData = res.costData
        this.localcurrency = res.localCurrency
        this.currency = this.localcurrency.localCurrencyAbbreviation
        //this.CostData = res
        this.costForm.patchValue({
          durationBaseCase: res.costData.durationBaseCase,
          durationHighCase: res.costData.durationHighCase,
          peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase,
          peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase,
          totalCapExBaseCase: res.costData.totalCapExBaseCase,
          totalCapExHighCase: res.costData.totalCapExHighCase,
          totalNonFteopExBaseCase: res.costData.totalNonFteopExBaseCase,
          totalNonFteopExHighCase: res.costData.totalNonFteopExHighCase,
          functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId)?.lookUpName : ''

        })
        this.viewContent = true
      })
    })
  }
  getDropDownValue(fromControlName: string): any {
    if (fromControlName == 'functionsRequiredId') {
      return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '57955fe4-cede-4c81-8b00-d806193046d2')
    }
  //   else if (fromControlName == 'technologyRatingId') {
  //     return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == 'd5ad90ec-4361-42dc-9c06-5e35114dd2db')
  //   }
  //   else if (fromControlName == 'businessCaseProcessId') {
  //     return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '12159b0c-c19c-4c04-b507-7d789feae7a6')
  //   }
  //   else if (fromControlName == 'manufacturingProcessId') {
  //     return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == 'b0a4469a-5808-414c-b686-3792681cc9f8')
  //   }
  //   else if (fromControlName == 'equipmentRatingId') {
  //     return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '3f9fd31e-0640-4a47-985d-28637afdf121')
  //   }
 }
  submitcost() {
    this.projectHubService.isFormChanged = false
    var mainObj = this.costfundingData
    var formValue = this.costForm.getRawValue()
    mainObj.durationBaseCase= formValue.durationBaseCase,
    mainObj.durationHighCase= formValue.durationHighCase,
    mainObj.peopleFtemonthsRequiredBaseCase= formValue.peopleFtemonthsRequiredBaseCase,
    mainObj.peopleFtemonthsRequiredHighCase= formValue.peopleFtemonthsRequiredHighCase,
    mainObj.totalCapExBaseCase= formValue.totalCapExBaseCase,
    mainObj.totalCapExHighCase= formValue.totalCapExHighCase,
    mainObj.totalNonFteopExBaseCase= formValue.totalNonFteopExBaseCase,
    mainObj.totalNonFteopExHighCase= formValue.totalNonFteopExHighCase,
    mainObj.functionsRequiredId= Object.keys(formValue.functionsRequiredId).length > 0 ? formValue.functionsRequiredId.lookUpId : null
    this.apiService.updateCost(mainObj,this.projectHubService.projectid).then(secondRes => {
      this.projectHubService.isNavChanged.next(true)
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }
}
