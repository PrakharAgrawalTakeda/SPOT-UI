import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { GlobalBusinessCaseOptions } from 'app/shared/global-business-case-options';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit {
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Business-Case' = 'Normal'
  @Input() optionType: 'recommended-option' | 'option-2' | 'option-3' = 'recommended-option'
  costfundingData = {}
  costData = []
  id: string = ''
  costEditType: string = 'CostEdit';
  costBCbulkEditType: string;
  viewContent = false
  costFundingForm = new FormGroup({
    durationBaseCase: new FormControl(''),
    durationHighCase: new FormControl(''),
    peopleFtemonthsRequiredBaseCase: new FormControl(''),
    peopleFtemonthsRequiredHighCase: new FormControl(''),
    totalCapExBaseCase: new FormControl(''),
    totalCapExHighCase: new FormControl(''),
    totalNonFteopExBaseCase: new FormControl(''),
    totalNonFteopExHighCase: new FormControl(''),
    functionsRequiredId: new FormControl(null),
    currentYearPlannedSpend: new FormControl(''),
    projectSpendStart: new FormControl(''),
    assetInService: new FormControl(''),
    assetInServiceNa: new FormControl(false),
    isProjectSpentNa: new FormControl(false)
  })
  cost: any;
  localcurrency: any;
  Amount: any;
  optionId: string;
  constructor(private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute,
    private authService: AuthService,
    private projectHubService: ProjectHubService) { 
      this.projectHubService.submitbutton.subscribe(res=>{
        if(this.viewContent){
          this.dataloader()
        }
      })
      this.projectHubService.isNavChanged.subscribe(res=>{
        if(this.viewContent){
          this.dataloader()
        }
      })
    }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {

    this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
    if (this.optionType == 'recommended-option') {
      this.costBCbulkEditType = 'CostBCEdit'
    this.apiService.getCostFunding(this.id).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {
        console.log("Cost Data", res.costData)
        this.cost = res
        console.log(res)
        //if(res.localCurrency)
        //{
          this.localcurrency = res.localCurrency
        
          this.Amount = this.localcurrency.localCurrencyAbbreviation
          
        //}
        console.log(this.Amount)
        this.costfundingData = res.costData
        this.projectHubService.lookUpMaster = lookup
        if(this.costfundingData != null)
        {
          this.costFundingForm.patchValue({
            durationBaseCase: res.costData.durationBaseCase,
            durationHighCase: res.costData.durationHighCase,
            peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase,
            peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase,
            totalCapExBaseCase: res.costData.totalCapExBaseCase,
            totalCapExHighCase: res.costData.totalCapExHighCase,
            totalNonFteopExBaseCase: res.costData.totalNonFteopExBaseCase,
            totalNonFteopExHighCase: res.costData.totalNonFteopExHighCase,
            functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId)?.lookUpName : '',
            currentYearPlannedSpend: res.costData.currentYearPlannedSpend,
            projectSpendStart: res.costData.projectSpendStart,
            assetInService: res.costData.assetInService,
            assetInServiceNa: res.costData.assetInServiceNa,
            isProjectSpentNa: res.costData.isProjectSpentNa
  
          })
        }

            this.costData = [{
              category: 'Total CAPEX'+' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalCapExBaseCase',
              highCase: 'totalCapExHighCase',
              curryearSpend: 'currentYearPlannedSpend'
            },
            {
              category: 'Project Spend Start',
              baseCase: 'projectSpendStart',
              highCase: 'isProjectSpentNa',
              curryearSpend: 'currentYearPlannedSpend'
            },
            {
              category: 'Asset in Service',
              baseCase: 'assetInService',
              highCase: 'assetInServiceNa',
              curryearSpend: 'currentYearPlannedSpend'
            },
            
            {
              category: 'Total non-FTE OPEX'+' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalNonFteopExBaseCase',
              highCase: 'totalNonFteopExHighCase',
              curryearSpend: 'currentYearPlannedSpend'
            }]
            this.costFundingForm.disable()
            this.viewContent = true
      
        
        
      })
    })
  }
  if(this.mode == 'Project-Charter')
  {
    this.apiService.getCostFunding(this.id).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {
        console.log("Cost Data", res.costData)
        this.cost = res
        console.log(res)
        //if(res.localCurrency)
        //{
          this.localcurrency = res.localCurrency
        
          this.Amount = this.localcurrency.localCurrencyAbbreviation
          
        //}
        console.log(this.Amount)
        this.costfundingData = res.costData
        this.projectHubService.lookUpMaster = lookup
        if(this.costfundingData != null)
        {
          this.costFundingForm.patchValue({
            durationBaseCase: res.costData.durationBaseCase,
            durationHighCase: res.costData.durationHighCase,
            peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase,
            peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase,
            totalCapExBaseCase: res.costData.totalCapExBaseCase,
            totalCapExHighCase: res.costData.totalCapExHighCase,
            totalNonFteopExBaseCase: res.costData.totalNonFteopExBaseCase,
            totalNonFteopExHighCase: res.costData.totalNonFteopExHighCase,
            functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId)?.lookUpName : '',
            currentYearPlannedSpend: res.costData.currentYearPlannedSpend,
            projectSpendStart: res.costData.projectSpendStart,
            assetInService: res.costData.assetInService,
            assetInServiceNa: res.costData.assetInServiceNa,
            isProjectSpentNa: res.costData.isProjectSpentNa
  
          })
        }
      
          if(this.mode=='Project-Charter'){
            this.costData = [{
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
              category: 'Total CAPEX'+' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalCapExBaseCase',
              highCase: 'totalCapExHighCase'
            },
            {
              category: 'Total non-FTE OPEX'+' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalNonFteopExBaseCase',
              highCase: 'totalNonFteopExHighCase'
            },
            {
              category: '# Functions Required',
              baseCase: 'functionsRequiredId',
              highCase: 'functionsRequiredId'
            }]
          }
          
            this.costFundingForm.disable()
            this.viewContent = true
      
        
        
      })
    })
  }
 if (this.optionType == 'option-2')
  {
    this.optionId = GlobalBusinessCaseOptions.OPTION_2
      this.costBCbulkEditType = 'CostBCEdit02'
      this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
      console.log("OPTION 2",this.id)
      this.apiService.getBusinessCaseCostFunding(this.id, this.optionId).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {
        console.log("Cost Data", res.costData)
        this.cost = res
        console.log(res)
        //if(res.localCurrency)
        //{
          this.localcurrency = res.localCurrency
        
          this.Amount = this.localcurrency.localCurrencyAbbreviation
          
        //}
        console.log(this.Amount)
        this.costfundingData = res.costData
        this.projectHubService.lookUpMaster = lookup
        if(this.costfundingData != null)
        {
          this.costFundingForm.patchValue({
            durationBaseCase: res.costData.durationBaseCase,
            durationHighCase: res.costData.durationHighCase,
            peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase,
            peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase,
            totalCapExBaseCase: res.costData.totalCapExBaseCase,
            totalCapExHighCase: res.costData.totalCapExHighCase,
            totalNonFteopExBaseCase: res.costData.totalNonFteopExBaseCase,
            totalNonFteopExHighCase: res.costData.totalNonFteopExHighCase,
            functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId)?.lookUpName : '',
            currentYearPlannedSpend: res.costData.currentYearPlannedSpend,
            projectSpendStart: res.costData.projectSpendStart,
            assetInService: res.costData.assetInService,
            assetInServiceNa: res.costData.assetInServiceNa,
            isProjectSpentNa: res.costData.isProjectSpentNa
  
          })
        }

            this.costData = [{
              category: 'Total CAPEX'+' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalCapExBaseCase',
              highCase: 'totalCapExHighCase',
              curryearSpend: 'currentYearPlannedSpend'
            },
            {
              category: 'Project Spend Start',
              baseCase: 'projectSpendStart',
              highCase: 'isProjectSpentNa',
              curryearSpend: 'currentYearPlannedSpend'
            },
            {
              category: 'Asset in Service',
              baseCase: 'assetInService',
              highCase: 'assetInServiceNa',
              curryearSpend: 'currentYearPlannedSpend'
            },
            
            {
              category: 'Total non-FTE OPEX'+' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalNonFteopExBaseCase',
              highCase: 'totalNonFteopExHighCase',
              curryearSpend: 'currentYearPlannedSpend'
            }]

            this.costFundingForm.disable()
            this.viewContent = true
      
        
        
      })
    })
  }
  if (this.optionType == 'option-3')
  {
    this.optionId = GlobalBusinessCaseOptions.OPTION_3
      this.costBCbulkEditType = 'CostBCEdit03'
      this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
      console.log("OPTION 3",this.id)
      this.apiService.getBusinessCaseCostFunding(this.id, this.optionId).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {
        console.log("Cost Data", res.costData)
        this.cost = res
        console.log(res)
        //if(res.localCurrency)
        //{
          this.localcurrency = res.localCurrency
        
          this.Amount = this.localcurrency.localCurrencyAbbreviation
          
        //}
        console.log(this.Amount)
        this.costfundingData = res.costData
        this.projectHubService.lookUpMaster = lookup
        if(this.costfundingData != null)
        {
          this.costFundingForm.patchValue({
            durationBaseCase: res.costData.durationBaseCase,
            durationHighCase: res.costData.durationHighCase,
            peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase,
            peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase,
            totalCapExBaseCase: res.costData.totalCapExBaseCase,
            totalCapExHighCase: res.costData.totalCapExHighCase,
            totalNonFteopExBaseCase: res.costData.totalNonFteopExBaseCase,
            totalNonFteopExHighCase: res.costData.totalNonFteopExHighCase,
            functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId)?.lookUpName : '',
            currentYearPlannedSpend: res.costData.currentYearPlannedSpend,
            projectSpendStart: res.costData.projectSpendStart,
            assetInService: res.costData.assetInService,
            assetInServiceNa: res.costData.assetInServiceNa,
            isProjectSpentNa: res.costData.isProjectSpentNa
  
          })
        }

            this.costData = [{
              category: 'Total CAPEX'+' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalCapExBaseCase',
              highCase: 'totalCapExHighCase',
              curryearSpend: 'currentYearPlannedSpend'
            },
            {
              category: 'Project Spend Start',
              baseCase: 'projectSpendStart',
              highCase: 'isProjectSpentNa',
              curryearSpend: 'currentYearPlannedSpend'
            },
            {
              category: 'Asset in Service',
              baseCase: 'assetInService',
              highCase: 'assetInServiceNa',
              curryearSpend: 'currentYearPlannedSpend'
            },
            
            {
              category: 'Total non-FTE OPEX'+' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalNonFteopExBaseCase',
              highCase: 'totalNonFteopExHighCase',
              curryearSpend: 'currentYearPlannedSpend'
            }]

            this.costFundingForm.disable()
            this.viewContent = true
      
        
        
      })
    })
  }
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
