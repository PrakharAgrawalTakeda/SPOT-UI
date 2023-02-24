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
    functionsRequiredId: new FormControl('')
  })
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
    this.apiService.getTOPS(this.id).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {
        console.log("Cost Data", res)
        this.costfundingData = res
        this.projectHubService.lookUpMaster = lookup
        this.costFundingForm.patchValue({
          durationBaseCase: res.durationBaseCase,
          durationHighCase: res.durationHighCase,
          peopleFtemonthsRequiredBaseCase: res.peopleFtemonthsRequiredBaseCase,
          peopleFtemonthsRequiredHighCase: res.peopleFtemonthsRequiredHighCase,
          totalCapExBaseCase: res.totalCapExBaseCase,
          totalCapExHighCase: res.totalCapExHighCase,
          totalNonFteopExBaseCase: res.totalNonFteopExBaseCase,
          totalNonFteopExHighCase: res.totalNonFteopExHighCase,
          functionsRequiredId: res.functionsRequiredId ? lookup.find(x => x.lookUpId == res.functionsRequiredId)?.lookUpName : ''

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
          highCase: ' '
        }]
        this.costFundingForm.disable()
        this.viewContent = true
      })
    })
  }
}
