import { Component, OnInit } from '@angular/core';
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
        this.costfundingData = res.costData
        this.projectHubService.lookUpMaster = lookup
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
        this.costData = [{
          category: 'Duration',
          baseCase: 'durationBaseCase',
          highCase: 'durationHighCase'
        },
        {
          category: 'People',
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
        this.costFundingForm.disable()
        this.viewContent = true
      })
    })
  }
}
