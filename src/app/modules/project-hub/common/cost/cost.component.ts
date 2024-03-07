import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { GlobalBusinessCaseOptions } from 'app/shared/global-business-case-options';
import moment from 'moment';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit, OnDestroy {
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
    apisdate: new FormControl(''),
    assetInServiceNa: new FormControl(false),
    isProjectSpentNa: new FormControl(false),
    capexRequired: new FormControl(false),
    opexRequired: new FormControl(false)
  })
  // costFundingForm = new FormGroup({
  //   durationBaseCase: new FormControl(null),
  //   durationHighCase: new FormControl(null),
  //   peopleFtemonthsRequiredBaseCase: new FormControl(null),
  //   peopleFtemonthsRequiredHighCase: new FormControl(null),
  //   totalCapExBaseCase: new FormControl(null),
  //   totalCapExHighCase: new FormControl(null),
  //   totalNonFteopExBaseCase: new FormControl(null),
  //   totalNonFteopExHighCase: new FormControl(null),
  //   functionsRequiredId: new FormControl(null),
  //   currentYearPlannedSpend: new FormControl(null),
  //   projectSpendStart: new FormControl(''),
  //   apisdate: new FormControl(''),
  //   assetInServiceNa: new FormControl(false),
  //   isProjectSpentNa: new FormControl(false)
  // })
  cost: any;
  localcurrency: any;
  Amount: any;
  optionId: string;
  costData2 = [];
  costData1 = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute,
    private authService: AuthService,
    private projectHubService: ProjectHubService) {
    this.projectHubService.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (this.viewContent) {
        this.dataloader()
      }
    })
    this.projectHubService.isNavChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (this.viewContent) {
        this.dataloader()
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {

    this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
    if (this.mode != 'Project-Charter' && this.optionType == 'recommended-option') {
      this.apiService.getCostFunding(this.id).then((res: any) => {
        this.authService.lookupMaster().then((lookup: any) => {
          this.costBCbulkEditType = 'CostBCEdit'
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
          if (this.costfundingData != null) {
            this.costFundingForm.patchValue({
              durationBaseCase: res.costData.durationBaseCase ? res.costData.durationBaseCase : null,
              durationHighCase: res.costData.durationHighCase ? res.costData.durationHighCase : null,
              peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase ? res.costData.peopleFtemonthsRequiredBaseCase : null,
              peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase ? res.costData.peopleFtemonthsRequiredHighCase : null,
              totalCapExBaseCase: res.costData.totalCapExBaseCase ? res.costData.totalCapExBaseCase : null,
              totalCapExHighCase: res.costData.totalCapExHighCase ? res.costData.totalCapExHighCase : null,
              totalNonFteopExBaseCase: res.costData.totalNonFteopExBaseCase ? res.costData.totalNonFteopExBaseCase : null,
              totalNonFteopExHighCase: res.costData.totalNonFteopExHighCase ? res.costData.totalNonFteopExHighCase : null,
              functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId)?.lookUpName : '',
              currentYearPlannedSpend: res.costData.currentYearPlannedSpend ? res.costData.currentYearPlannedSpend : null,
              projectSpendStart: res.costData.projectSpendStart ? res.costData.projectSpendStart : null,
              apisdate: res.costData.apisdate ? res.costData.apisdate : null,
              assetInServiceNa: res.costData.assetInServiceNa ? res.costData.assetInServiceNa : false,
              isProjectSpentNa: res.costData.isProjectSpentNa ? res.costData.isProjectSpentNa : false

            })
          }

          this.costData = [{
            category: 'Total CAPEX' + ' (' + this.localcurrency.localCurrencyAbbreviation + ')',
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
            baseCase: 'apisdate',
            highCase: 'assetInServiceNa',
            curryearSpend: 'currentYearPlannedSpend'
          },

          {
            category: 'Total non-FTE OPEX' + ' (' + this.localcurrency.localCurrencyAbbreviation + ')',
            baseCase: 'totalNonFteopExBaseCase',
            highCase: 'totalNonFteopExHighCase',
            curryearSpend: 'currentYearPlannedSpend'
          }]
          console.log(this.costFundingForm.getRawValue())
          this.costFundingForm.disable()
          this.viewContent = true



        })
      })
    }
    if (this.mode == 'Project-Charter') {
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
          if (this.costfundingData != null) {
            this.costFundingForm.patchValue({
              durationBaseCase: res.costData.durationBaseCase ? res.costData.durationBaseCase : null,
              durationHighCase: res.costData.durationHighCase ? res.costData.durationHighCase : null,
              peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase ? res.costData.peopleFtemonthsRequiredBaseCase : null,
              peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase ? res.costData.peopleFtemonthsRequiredHighCase : null,
              totalCapExBaseCase: res.costData.totalCapExBaseCase ? res.costData.totalCapExBaseCase : null,
              totalCapExHighCase: res.costData.totalCapExHighCase ? res.costData.totalCapExHighCase : null,
              totalNonFteopExBaseCase: res.costData.totalNonFteopExBaseCase ? res.costData.totalNonFteopExBaseCase : null,
              totalNonFteopExHighCase: res.costData.totalNonFteopExHighCase ? res.costData.totalNonFteopExHighCase : null,
              functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId)?.lookUpName : '',
              currentYearPlannedSpend: res.costData.currentYearPlannedSpend ? res.costData.currentYearPlannedSpend : null,
              projectSpendStart: res.costData.projectSpendStart ? res.costData.projectSpendStart : null,
              apisdate: res.costData.apisdate ? res.costData.apisdate : null,
              assetInServiceNa: res.costData.assetInServiceNa ? res.costData.assetInServiceNa : false,
              isProjectSpentNa: res.costData.isProjectSpentNa ? res.costData.isProjectSpentNa : false

            })
          }

          if (this.mode == 'Project-Charter') {
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
              category: 'Total CAPEX' + ' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalCapExBaseCase',
              highCase: 'totalCapExHighCase'
            },
            {
              category: 'Total non-FTE OPEX' + ' (' + this.localcurrency.localCurrencyAbbreviation + ')',
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
    if (this.mode != 'Project-Charter' && this.optionType == 'option-2') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_2
      this.costBCbulkEditType = 'CostBCEdit02'
      this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
      console.log("OPTION 2", this.id)
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
          if (this.costfundingData != null) {
            this.costFundingForm.patchValue({
              durationBaseCase: res.costData.durationBaseCase ? res.costData.durationBaseCase : null,
              durationHighCase: res.costData.durationHighCase ? res.costData.durationHighCase : null,
              peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase ? res.costData.peopleFtemonthsRequiredBaseCase : null,
              peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase ? res.costData.peopleFtemonthsRequiredHighCase : null,
              totalCapExBaseCase: res.costData.totalCapexBaseCase ? res.costData.totalCapexBaseCase : null,
              totalCapExHighCase: res.costData.totalCapexHighCase ? res.costData.totalCapexHighCase : null,
              totalNonFteopExBaseCase: res.costData.totalNonFtebaseCase ? res.costData.totalNonFtebaseCase : null,
              totalNonFteopExHighCase: res.costData.totalNonFtehighCase ? res.costData.totalNonFtehighCase : null,
              functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId)?.lookUpName : '',
              currentYearPlannedSpend: res.costData.currentYearPlannedSpend ? res.costData.currentYearPlannedSpend : null,
              projectSpendStart: res.costData.projectSpendStart ? res.costData.projectSpendStart : null,
              apisdate: res.costData.assetInService ? res.costData.assetInService : null,
              assetInServiceNa: res.costData.assetInServiceNa ? res.costData.assetInServiceNa : false,
              isProjectSpentNa: res.costData.isProjectSpentNa ? res.costData.isProjectSpentNa : false,
              capexRequired: res.costData.capexRequired ? res.costData.capexRequired : false,
              opexRequired: res.costData.opexRequired ? res.costData.opexRequired : false

            })
          }

          this.costData1 = [{
            category: 'Total CAPEX' + ' (' + this.localcurrency.localCurrencyAbbreviation + ')',
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
            baseCase: 'apisdate',
            highCase: 'assetInServiceNa',
            curryearSpend: 'currentYearPlannedSpend'
          }]

          this.costData2 = [
            {
              category: 'Total non-FTE OPEX' + ' (' + this.localcurrency.localCurrencyAbbreviation + ')',
              baseCase: 'totalNonFteopExBaseCase',
              highCase: 'totalNonFteopExHighCase',
              curryearSpend: 'currentYearPlannedSpend'
            }]

          this.costFundingForm.disable()
          this.viewContent = true



        })
      })
    }
    if (this.mode != 'Project-Charter' && this.optionType == 'option-3') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_3
      this.costBCbulkEditType = 'CostBCEdit03'
      this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
      console.log("OPTION 3", this.id)
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
          if (this.costfundingData != null) {
            this.costFundingForm.patchValue({
              durationBaseCase: res.costData.durationBaseCase ? res.costData.durationBaseCase : null,
              durationHighCase: res.costData.durationHighCase ? res.costData.durationHighCase : null,
              peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase ? res.costData.peopleFtemonthsRequiredBaseCase : null,
              peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase ? res.costData.peopleFtemonthsRequiredHighCase : null,
              totalCapExBaseCase: res.costData.totalCapexBaseCase ? res.costData.totalCapexBaseCase : null,
              totalCapExHighCase: res.costData.totalCapexHighCase ? res.costData.totalCapexHighCase : null,
              totalNonFteopExBaseCase: res.costData.totalNonFtebaseCase ? res.costData.totalNonFtebaseCase : null,
              totalNonFteopExHighCase: res.costData.totalNonFtehighCase ? res.costData.totalNonFtehighCase : null,
              functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId)?.lookUpName : '',
              currentYearPlannedSpend: res.costData.currentYearPlannedSpend ? res.costData.currentYearPlannedSpend : null,
              projectSpendStart: res.costData.projectSpendStart ? res.costData.projectSpendStart : null,
              apisdate: res.costData.assetInService ? res.costData.assetInService : null,
              assetInServiceNa: res.costData.assetInServiceNa ? res.costData.assetInServiceNa : false,
              isProjectSpentNa: res.costData.isProjectSpentNa ? res.costData.isProjectSpentNa : false,
              capexRequired: res.costData.capexRequired ? res.costData.capexRequired : false,
              opexRequired: res.costData.opexRequired ? res.costData.opexRequired : false

            })
          }

          this.costData1 = [{
            category: 'Total CAPEX' + ' (' + this.localcurrency.localCurrencyAbbreviation + ')',
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
            baseCase: 'apisdate',
            highCase: 'assetInServiceNa',
            curryearSpend: 'currentYearPlannedSpend'
          }]

          this.costData2 = [
            {
              category: 'Total non-FTE OPEX' + ' (' + this.localcurrency.localCurrencyAbbreviation + ')',
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
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
