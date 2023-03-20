import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
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
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Business-Case' = 'Project-Charter'
  @Input() optionType: 'recommended-option' | 'option-2' | 'option-3' = 'recommended-option'
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

  costDataBC = [{
    category: 'Total CAPEX',
    baseCase: 'totalCapExBaseCase',
    highCase: 'totalCapExHighCase',
    curryearSpend: 'currentYearPlannedSpend'
  },
  {
    category: 'Project Spend Start',
    baseCase: 'projectSpendStart',
    highCase: 'projectSpendStart',
    curryearSpend: 'currentYearPlannedSpend'
  },
  {
    category: 'Asset in Service',
    baseCase: 'apisdate',
    highCase: 'apisdate',
    curryearSpend: 'currentYearPlannedSpend'
  },
  
  {
    category: 'Total non-FTE OPEX',
    baseCase: 'totalNonFteopExBaseCase',
    highCase: 'totalNonFteopExHighCase',
    curryearSpend: 'currentYearPlannedSpend'
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
    functionsRequiredId: new FormControl(null),
    currentYearPlannedSpend: new FormControl(''),
    projectSpendStart: new FormControl(''),
    apisdate: new FormControl('')
  })

  localcurrency: any;
  currency: any;
  constructor(private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute,
    private portApiService: PortfolioApiService,
    private authService: AuthService,
    private projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService) {
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

      this.apiService.getCostFunding(this.projectHubService.projectid).then((res: any) => {
        this.authService.lookupMaster().then((lookup: any) => {
          console.log(this.costDataBC)
          console.log("Cost Data", res)
          this.costfundingData = res.costData
          this.localcurrency = res.localCurrency
          this.currency = this.localcurrency.localCurrencyAbbreviation
          //this.CostData = res
          console.log(lookup)
          //console.log('Function RequiredValidator', res.costData.functionsRequiredId)
          if(this.costfundingData != null)
          {
          this.costForm.patchValue({
            durationBaseCase: res.costData.durationBaseCase ? res.costData.durationBaseCase : null,
            durationHighCase: res.costData.durationHighCase ? res.costData.durationHighCase : null,
            peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase ? res.costData.peopleFtemonthsRequiredBaseCase : null,
            peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase ? res.costData.peopleFtemonthsRequiredHighCase : null,
            totalCapExBaseCase: res.costData.totalCapExBaseCase ? res.costData.totalCapExBaseCase : null,
            totalCapExHighCase: res.costData.totalCapExHighCase ? res.costData.totalCapExHighCase : null,
            totalNonFteopExBaseCase: res.costData.totalNonFteopExBaseCase ? res.costData.totalNonFteopExBaseCase : null,
            totalNonFteopExHighCase: res.costData.totalNonFteopExHighCase ? res.costData.totalNonFteopExHighCase : null,
            functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId) : '',
            currentYearPlannedSpend: res.costData.currentYearPlannedSpend ? res.costData.currentYearPlannedSpend : null,
            projectSpendStart: res.costData.projectSpendStart ? res.costData.projectSpendStart : null,
            apisdate: res.costData.apisdate ? res.costData.apisdate : null
  
          })
        }
          console.log(this.costForm.getRawValue())
          this.viewContent = true
        })
      })


    
  }
  getDropDownValue(row: string): any {
    if (row == '# Functions Required') {
      return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '57955fe4-cede-4c81-8b00-d806193046d2')
    }

 }
  submitcost() {
    this.projectHubService.isFormChanged = false
    var mainObj = this.costfundingData
    var formValue = this.costForm.getRawValue()
    console.log(formValue)
    if (formValue.durationBaseCase > formValue.durationHighCase || formValue.peopleFtemonthsRequiredBaseCase > formValue.peopleFtemonthsRequiredHighCase ||
      formValue.totalCapExBaseCase > formValue.totalCapExHighCase || formValue.totalNonFteopExBaseCase > formValue.totalNonFteopExHighCase) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "The Base Case cannot be Higher than the High Case",
          "message": "",
          "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warning"
          },
          "actions": {
              "confirm": {
                  "show": true,
                  "label": "OK",
                  "color": "primary"
              },
              "cancel": {
                  "show": false,
                  "label": "Cancel"
              }
          },
          "dismissible": true
      }
      console.log(comfirmConfig)
      const alert = this.fuseAlert.open(comfirmConfig)
      alert.afterClosed().subscribe(close => {
        if (close == 'confirm') {
          this.viewContent = true
        }
      })
    }
    else 
    {
      mainObj.durationBaseCase= formValue.durationBaseCase,
      mainObj.durationHighCase= formValue.durationHighCase,
      mainObj.peopleFtemonthsRequiredBaseCase= formValue.peopleFtemonthsRequiredBaseCase,
      mainObj.peopleFtemonthsRequiredHighCase= formValue.peopleFtemonthsRequiredHighCase,
      mainObj.totalCapExBaseCase= formValue.totalCapExBaseCase,
      mainObj.totalCapExHighCase= formValue.totalCapExHighCase,
      mainObj.totalNonFteopExBaseCase= formValue.totalNonFteopExBaseCase,
      mainObj.totalNonFteopExHighCase= formValue.totalNonFteopExHighCase,
      mainObj.functionsRequiredId= Object.keys(formValue.functionsRequiredId).length > 0 ? formValue.functionsRequiredId.lookUpId : null,
      mainObj.apisdate= formValue.apisdate,
      mainObj.projectSpendStart= formValue.projectSpendStart,
      mainObj.currentYearPlannedSpend= formValue.currentYearPlannedSpend
      console.log("Main Cost Data",mainObj)
      this.apiService.updateCost(mainObj,this.projectHubService.projectid).then(Res => {
        if (this.mode == 'Project-Charter') {
          this.apiService.updateReportDates(this.projectHubService.projectid, "ModifiedDate").then(secondRes => {
              this.projectHubService.isFormChanged = false
              this.projectHubService.isNavChanged.next(true)
              this.projectHubService.submitbutton.next(true)
              this.projectHubService.successSave.next(true)
              this.projectHubService.toggleDrawerOpen('', '', [], '')
          })
        }
          else{
        this.projectHubService.isNavChanged.next(true)
        this.projectHubService.submitbutton.next(true)
        this.projectHubService.successSave.next(true)
        this.projectHubService.toggleDrawerOpen('', '', [], '')
          }
      })
    }
    
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
