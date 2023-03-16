import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit {
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Baseline-Log' |'Business-Case' = 'Project-Charter'
  costfundingData = {}
  costData = []
  id: string = ''
  costEditType: string = 'CostEdit';
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
    functionsRequiredId: new FormControl(null)
  })
  cost: any;
  localcurrency: any;
  Amount: any;
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
        // if(this.costfundingData != null)
        // {
          this.costFundingForm.patchValue({
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
        // }
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
          if(this.mode=='Business-Case'){
            this.costData = [{
              category: 'Total CAPEX'+' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalCapExBaseCase',
              highCase: 'totalCapExHighCase',
              curryearSpend: ''
            },
            {
              category: 'Project Spend Start',
              baseCase: 'peopleFtemonthsRequiredBaseCase',
              highCase: 'peopleFtemonthsRequiredHighCase'
            },
            {
              category: 'Asset in Service',
              baseCase: 'peopleFtemonthsRequiredBaseCase',
              highCase: 'peopleFtemonthsRequiredHighCase'
            },
            
            {
              category: 'Total non-FTE OPEX'+' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalNonFteopExBaseCase',
              highCase: 'totalNonFteopExHighCase'
            }]
          }
            this.costFundingForm.disable()
            this.viewContent = true
      
        
        
      })
    })
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
