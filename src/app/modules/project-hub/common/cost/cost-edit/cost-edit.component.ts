import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { GlobalBusinessCaseOptions } from 'app/shared/global-business-case-options';
import { ProjectApiService } from '../../project-api.service';

@Component({
  selector: 'app-cost-edit',
  templateUrl: './cost-edit.component.html',
  styleUrls: ['./cost-edit.component.scss']
})
export class CostEditComponent {
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Business-Case' = 'Normal'
  @Input() optionType: 'recommended-option' | 'option-2' | 'option-3' = 'recommended-option'
  optionId: string = ''
  costfundingData: any = {}
  mainObj = []
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
    category: 'Total non-FTE OPEX',
    baseCase: 'totalNonFteopExBaseCase',
    highCase: 'totalNonFteopExHighCase',
    curryearSpend: 'currentYearPlannedSpend'
  }]

  costData1 = [{
    category: 'Total CAPEX',
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

  costData2 = [
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
    apisdate: new FormControl(''),
    assetInServiceNa: new FormControl(false),
    isProjectSpentNa: new FormControl(false),
    capexRequired: new FormControl(false),
    opexRequired: new FormControl(false)

  })

  localcurrency: any;
  currency: any;
  costDb: any;
  constructor(private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute,
    private portApiService: PortfolioApiService,
    private authService: AuthService,
    private projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService) {

    this.costForm.valueChanges.subscribe(res => {
     // debugger
      if (this.viewContent) {

        this.projectHubService.isFormChanged = true
      }
    })

    this.costForm.controls.capexRequired.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the CAPEX Information?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Remove",
                "color": "warn"
              },
              "cancel": {
                "show": true,
                "label": "Cancel"
              }
            },
            "dismissible": true
          }
          const alert = this.fuseAlert.open(comfirmConfig)
          alert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
              this.costForm.patchValue({
                durationBaseCase: null,
                durationHighCase:  null,
                totalCapExBaseCase:  null,
                totalCapExHighCase:  null,
                currentYearPlannedSpend: null,
                projectSpendStart:  null,
                apisdate:  null,
                assetInServiceNa:  false,
                isProjectSpentNa:  false
  
              })
            }
            else {
              this.costForm.controls.capexRequired.patchValue(true)
            }
          })
        }
      }
    })

    this.costForm.controls.opexRequired.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the OPEX Information?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Remove",
                "color": "warn"
              },
              "cancel": {
                "show": true,
                "label": "Cancel"
              }
            },
            "dismissible": true
          }
          const alert = this.fuseAlert.open(comfirmConfig)
          alert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
              this.costForm.patchValue({
                totalNonFteopExBaseCase:  null,
              totalNonFteopExHighCase:  null,
  
              })
            }
            else {
              this.costForm.controls.opexRequired.patchValue(true)
            }
          })
        }
      }
    })
  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
    if (this.mode == 'Project-Charter') {
      this.apiService.getCostFunding(this.projectHubService.projectid).then((res: any) => {
        this.authService.lookupMaster().then((lookup: any) => {
          console.log(this.costDataBC)
          console.log("Cost Data", res)
          this.costfundingData = res.costData
          this.localcurrency = res.localCurrency
          this.currency = this.localcurrency.localCurrencyAbbreviation
          this.costDb = this.costfundingData
          //this.CostData = res
          console.log(lookup)
          //console.log('Function RequiredValidator', res.costData.functionsRequiredId)
          if (this.costfundingData != null) {
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
              apisdate: res.costData.apisdate ? res.costData.apisdate : null,
              assetInServiceNa: res.costData.assetInServiceNa ? res.costData.assetInServiceNa : false,
              isProjectSpentNa: res.costData.isProjectSpentNa ? res.costData.isProjectSpentNa : false,
              capexRequired: res.costData.capexRequired ? res.costData.capexRequired : false,
              opexRequired: res.costData.opexRequired ? res.costData.opexRequired : false

            })
          }
          console.log(this.costForm.getRawValue())
          this.viewContent = true
        })
      })
    }

    if (this.mode != 'Project-Charter' && this.optionType == 'recommended-option') {
      this.apiService.getCostFunding(this.projectHubService.projectid).then((res: any) => {
        this.authService.lookupMaster().then((lookup: any) => {
          console.log(this.costDataBC)
          console.log("Cost Data", res)
          this.costfundingData = res.costData
          this.localcurrency = res.localCurrency
          this.currency = this.localcurrency.localCurrencyAbbreviation
          this.costDb = this.costfundingData
          //this.CostData = res
          console.log(lookup)
          //console.log('Function RequiredValidator', res.costData.functionsRequiredId)
          if (this.costfundingData != null) {
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
              apisdate: res.costData.apisdate ? res.costData.apisdate : null,
              assetInServiceNa: res.costData.assetInServiceNa ? res.costData.assetInServiceNa : false,
              isProjectSpentNa: res.costData.isProjectSpentNa ? res.costData.isProjectSpentNa : false,
              capexRequired: res.costData.capexRequired ? res.costData.capexRequired : false,
              opexRequired: res.costData.opexRequired ? res.costData.opexRequired : false

            })
          }
          console.log(this.costForm.getRawValue())
          this.viewContent = true
        })
      })
    }

    if (this.mode != 'Project-Charter' && this.optionType == 'option-2') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_2
      this.apiService.getBusinessCaseCostFunding(this.projectHubService.projectid, this.optionId).then((res: any) => {
        this.authService.lookupMaster().then((lookup: any) => {
          console.log(this.costDataBC)
          console.log("Cost Data", res)
          this.costfundingData = res.costData
          this.localcurrency = res.localCurrency
          this.currency = this.localcurrency.localCurrencyAbbreviation
          this.costDb = this.costfundingData
          //this.CostData = res
          console.log(lookup)
          //console.log('Function RequiredValidator', res.costData.functionsRequiredId)
          if (this.costfundingData != null) {
            this.costForm.patchValue({
              durationBaseCase: res.costData.durationBaseCase ? res.costData.durationBaseCase : null,
              durationHighCase: res.costData.durationHighCase ? res.costData.durationHighCase : null,
              peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase ? res.costData.peopleFtemonthsRequiredBaseCase : null,
              peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase ? res.costData.peopleFtemonthsRequiredHighCase : null,
              totalCapExBaseCase: res.costData.totalCapexBaseCase ? res.costData.totalCapexBaseCase : null,
              totalCapExHighCase: res.costData.totalCapexHighCase ? res.costData.totalCapexHighCase : null,
              totalNonFteopExBaseCase: res.costData.totalNonFtebaseCase ? res.costData.totalNonFtebaseCase : null,
              totalNonFteopExHighCase: res.costData.totalNonFtehighCase ? res.costData.totalNonFtehighCase : null,
              functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId) : '',
              currentYearPlannedSpend: res.costData.currentYearPlannedSpend ? res.costData.currentYearPlannedSpend : null,
              projectSpendStart: res.costData.projectSpendStart ? res.costData.projectSpendStart : null,
              apisdate: res.costData.assetInService ? res.costData.assetInService : null,
              assetInServiceNa: res.costData.assetInServiceNa ? res.costData.assetInServiceNa : false,
              isProjectSpentNa: res.costData.isProjectSpentNa ? res.costData.isProjectSpentNa : false,
              capexRequired: res.costData.capexRequired ? res.costData.capexRequired : false,
              opexRequired: res.costData.opexRequired ? res.costData.opexRequired : false

            })
          }
          console.log(this.costForm.getRawValue())
          this.viewContent = true
        })
      })
    }

    if (this.mode != 'Project-Charter' && this.optionType == 'option-3') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_3
      this.apiService.getBusinessCaseCostFunding(this.projectHubService.projectid, this.optionId).then((res: any) => {
        this.authService.lookupMaster().then((lookup: any) => {
          console.log(this.costDataBC)
          console.log("Cost Data", res)
          this.costfundingData = res.costData
          this.localcurrency = res.localCurrency
          this.currency = this.localcurrency.localCurrencyAbbreviation
          this.costDb = this.costfundingData
          //this.CostData = res
          console.log(lookup)
          //console.log('Function RequiredValidator', res.costData.functionsRequiredId)
          if (this.costfundingData != null) {
            this.costForm.patchValue({
              durationBaseCase: res.costData.durationBaseCase ? res.costData.durationBaseCase : null,
              durationHighCase: res.costData.durationHighCase ? res.costData.durationHighCase : null,
              peopleFtemonthsRequiredBaseCase: res.costData.peopleFtemonthsRequiredBaseCase ? res.costData.peopleFtemonthsRequiredBaseCase : null,
              peopleFtemonthsRequiredHighCase: res.costData.peopleFtemonthsRequiredHighCase ? res.costData.peopleFtemonthsRequiredHighCase : null,
              totalCapExBaseCase: res.costData.totalCapexBaseCase ? res.costData.totalCapexBaseCase : null,
              totalCapExHighCase: res.costData.totalCapexHighCase ? res.costData.totalCapexHighCase : null,
              totalNonFteopExBaseCase: res.costData.totalNonFtebaseCase ? res.costData.totalNonFtebaseCase : null,
              totalNonFteopExHighCase: res.costData.totalNonFtehighCase ? res.costData.totalNonFtehighCase : null,
              functionsRequiredId: res.costData.functionsRequiredId ? lookup.find(x => x.lookUpId == res.costData.functionsRequiredId) : '',
              currentYearPlannedSpend: res.costData.currentYearPlannedSpend ? res.costData.currentYearPlannedSpend : null,
              projectSpendStart: res.costData.projectSpendStart ? res.costData.projectSpendStart : null,
              apisdate: res.costData.assetInService ? res.costData.assetInService : null,
              assetInServiceNa: res.costData.assetInServiceNa ? res.costData.assetInServiceNa : false,
              isProjectSpentNa: res.costData.isProjectSpentNa ? res.costData.isProjectSpentNa : false,
              capexRequired: res.costData.capexRequired ? res.costData.capexRequired : false,
              opexRequired: res.costData.opexRequired ? res.costData.opexRequired : false

            })
          }
          console.log(this.costForm.getRawValue())
          this.viewContent = true
        })
      })
    }

  }
  getDropDownValue(row: string): any {
    if (row == '# Functions Required') {
      return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '57955fe4-cede-4c81-8b00-d806193046d2')
    }

  }
  submitcost() {
    this.projectHubService.isFormChanged = false
    //var mainObj = this.costfundingData
    var formValue = this.costForm.getRawValue()
    console.log(formValue)
    if (JSON.stringify(formValue) == JSON.stringify(this.costDb)) {
      this.projectHubService.toggleDrawerOpen('', '', [], '', true)
    }
    if ((formValue.durationHighCase != null && formValue.durationBaseCase > formValue.durationHighCase) ||
    (formValue.peopleFtemonthsRequiredHighCase != null && formValue.peopleFtemonthsRequiredBaseCase > formValue.peopleFtemonthsRequiredHighCase) ||
      (formValue.totalCapExHighCase != null && formValue.totalCapExBaseCase > formValue.totalCapExHighCase) ||
      (formValue.totalNonFteopExHighCase != null && formValue.totalNonFteopExBaseCase > formValue.totalNonFteopExHighCase)) {
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
    else {
      if (this.mode == 'Project-Charter') {
        let mainObj = this.costfundingData
        if (!this.costfundingData) {
          //mainObj = this.costfundingData
          mainObj = {
            projectId: this.projectHubService.projectid,
            durationBaseCase: typeof formValue.durationBaseCase === 'string' ? Number(formValue.durationBaseCase) : formValue.durationBaseCase,
            durationHighCase: typeof formValue.durationHighCase === 'string' ? Number(formValue.durationHighCase) : formValue.durationHighCase,
            peopleFtemonthsRequiredBaseCase: typeof formValue.peopleFtemonthsRequiredBaseCase === 'string' ? Number(formValue.peopleFtemonthsRequiredBaseCase) : formValue.peopleFtemonthsRequiredBaseCase,
            peopleFtemonthsRequiredHighCase: typeof formValue.peopleFtemonthsRequiredHighCase === 'string' ? Number(formValue.peopleFtemonthsRequiredHighCase) : formValue.peopleFtemonthsRequiredHighCase,
            totalCapExBaseCase: typeof formValue.totalCapExBaseCase === 'string' ? Number(formValue.totalCapExBaseCase) : formValue.totalCapExBaseCase,
            totalCapExHighCase: typeof formValue.totalCapExHighCase === 'string' ? Number(formValue.totalCapExHighCase) : formValue.totalCapExHighCase,
            totalNonFteopExBaseCase: typeof formValue.totalNonFteopExBaseCase === 'string' ? Number(formValue.totalNonFteopExBaseCase) : formValue.totalNonFteopExBaseCase,
            totalNonFteopExHighCase: typeof formValue.totalNonFteopExHighCase === 'string' ? Number(formValue.totalNonFteopExHighCase) : formValue.totalNonFteopExHighCase,
            functionsRequiredId: formValue.functionsRequiredId && Object.keys(formValue.functionsRequiredId).length > 0 ? formValue.functionsRequiredId.lookUpId : null,
            apisdate: formValue.apisdate ? formValue.apisdate : null,
            projectSpendStart: formValue.projectSpendStart ? formValue.projectSpendStart : null,
            currentYearPlannedSpend: typeof formValue.currentYearPlannedSpend === 'string' ? Number(formValue.currentYearPlannedSpend) : formValue.currentYearPlannedSpend,
            assetInServiceNa: formValue.assetInServiceNa ? formValue.assetInServiceNa : false,
            isProjectSpentNa: formValue.isProjectSpentNa ? formValue.isProjectSpentNa : false
          }
        } else if (formValue) {
          mainObj.durationBaseCase = formValue.durationBaseCase ? formValue.durationBaseCase : null,
            mainObj.durationHighCase = formValue.durationHighCase ? formValue.durationHighCase : null,
            mainObj.peopleFtemonthsRequiredBaseCase = formValue.peopleFtemonthsRequiredBaseCase ? formValue.peopleFtemonthsRequiredBaseCase : null,
            mainObj.peopleFtemonthsRequiredHighCase = formValue.peopleFtemonthsRequiredHighCase ? formValue.peopleFtemonthsRequiredHighCase : null,
            mainObj.totalCapExBaseCase = formValue.totalCapExBaseCase ? formValue.totalCapExBaseCase : null,
            mainObj.totalCapExHighCase = formValue.totalCapExHighCase ? formValue.totalCapExHighCase : null,
            mainObj.totalNonFteopExBaseCase = formValue.totalNonFteopExBaseCase ? formValue.totalNonFteopExBaseCase : null,
            mainObj.totalNonFteopExHighCase = formValue.totalNonFteopExHighCase ? formValue.totalNonFteopExHighCase : null,
            mainObj.functionsRequiredId = Object.keys(formValue.functionsRequiredId).length > 0 ? formValue.functionsRequiredId.lookUpId : null,
            mainObj.apisdate = formValue.apisdate ? formValue.apisdate : null,
            mainObj.projectSpendStart = formValue.projectSpendStart ? formValue.projectSpendStart : null,
            mainObj.currentYearPlannedSpend = formValue.currentYearPlannedSpend ? formValue.currentYearPlannedSpend : null,
            mainObj.assetInServiceNa = formValue.assetInServiceNa ? formValue.assetInServiceNa : false,
            mainObj.isProjectSpentNa = formValue.isProjectSpentNa ? formValue.isProjectSpentNa : false
        }

        console.log("Main Cost Data", mainObj)
        this.apiService.updateCost(mainObj, this.projectHubService.projectid).then(Res => {
          this.apiService.updateReportDates(this.projectHubService.projectid, "ModifiedDate").then(secondRes => {
            //this.projectHubService.isFormChanged = false
            this.projectHubService.isNavChanged.next(true)
            this.projectHubService.submitbutton.next(true)
            this.projectHubService.successSave.next(true)
            this.projectHubService.toggleDrawerOpen('', '', [], '')
          })
        })
      }
       if (this.mode != 'Project-Charter' && this.optionType == 'recommended-option') {
           let mainObj;
           mainObj = {
               projectId: this.projectHubService.projectid,
               businessOptionId: this.optionId,
               totalCapexBaseCase: typeof formValue.totalCapExBaseCase === 'string' ? Number(formValue.totalCapExBaseCase) : formValue.totalCapExBaseCase,
               totalCapexHighCase: typeof formValue.totalCapExHighCase === 'string' ? Number(formValue.totalCapExHighCase) : formValue.totalCapExHighCase,
               totalNonFtebaseCase: typeof formValue.totalNonFteopExBaseCase === 'string' ? Number(formValue.totalNonFteopExBaseCase) : formValue.totalNonFteopExBaseCase,
               totalNonFtehighCase: typeof formValue.totalNonFteopExHighCase === 'string' ? Number(formValue.totalNonFteopExHighCase) : formValue.totalNonFteopExHighCase,
               assetInService: formValue.apisdate ? formValue.apisdate : null,
               projectSpendStart: formValue.projectSpendStart ? formValue.projectSpendStart : null,
               currentYearPlannedSpend: typeof formValue.currentYearPlannedSpend === 'string' ? Number(formValue.currentYearPlannedSpend) : formValue.currentYearPlannedSpend,
               assetInServiceNa: formValue.assetInServiceNa ? formValue.assetInServiceNa : false,
               isProjectSpentNa: formValue.isProjectSpentNa ? formValue.isProjectSpentNa : false
           }
        this.apiService.updateBusinessCaseCost(mainObj, this.projectHubService.projectid, GlobalBusinessCaseOptions.OPTION_1).then(Res => {
          this.projectHubService.isNavChanged.next(true)
          this.projectHubService.submitbutton.next(true)
          this.projectHubService.successSave.next(true)
          this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
      }
      if (this.mode != 'Project-Charter' && this.optionType == 'option-2') {
          let mainObj;
          console.log(formValue.capexRequired)
          mainObj = {
              projectId: this.projectHubService.projectid,
              businessOptionId: this.optionId,
              totalCapexBaseCase: typeof formValue.totalCapExBaseCase === 'string' ? Number(formValue.totalCapExBaseCase) : formValue.totalCapExBaseCase,
              totalCapexHighCase: typeof formValue.totalCapExHighCase === 'string' ? Number(formValue.totalCapExHighCase) : formValue.totalCapExHighCase,
              totalNonFtebaseCase: typeof formValue.totalNonFteopExBaseCase === 'string' ? Number(formValue.totalNonFteopExBaseCase) : formValue.totalNonFteopExBaseCase,
              totalNonFtehighCase: typeof formValue.totalNonFteopExHighCase === 'string' ? Number(formValue.totalNonFteopExHighCase) : formValue.totalNonFteopExHighCase,
              assetInService: formValue.apisdate ? formValue.apisdate : null,
              projectSpendStart: formValue.projectSpendStart ? formValue.projectSpendStart : null,
              currentYearPlannedSpend: typeof formValue.currentYearPlannedSpend === 'string' ? Number(formValue.currentYearPlannedSpend) : formValue.currentYearPlannedSpend,
              assetInServiceNa: formValue.assetInServiceNa ? formValue.assetInServiceNa : false,
              isProjectSpentNa: formValue.isProjectSpentNa ? formValue.isProjectSpentNa : false,
              capexRequired: formValue.capexRequired ? formValue.capexRequired : false,
              opexRequired: formValue.opexRequired ? formValue.opexRequired : false
          }
        this.optionId = GlobalBusinessCaseOptions.OPTION_2
        console.log(mainObj)
        this.apiService.updateBusinessCaseCost(mainObj, this.projectHubService.projectid, this.optionId).then(Res => {
          this.projectHubService.isNavChanged.next(true)
          this.projectHubService.submitbutton.next(true)
          this.projectHubService.successSave.next(true)
          this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
      }
      if (this.mode != 'Project-Charter' && this.optionType == 'option-3') {
          let mainObj;
          mainObj = {
              projectId: this.projectHubService.projectid,
              businessOptionId: this.optionId,
              totalCapexBaseCase: typeof formValue.totalCapExBaseCase === 'string' ? Number(formValue.totalCapExBaseCase) : formValue.totalCapExBaseCase,
              totalCapexHighCase: typeof formValue.totalCapExHighCase === 'string' ? Number(formValue.totalCapExHighCase) : formValue.totalCapExHighCase,
              totalNonFtebaseCase: typeof formValue.totalNonFteopExBaseCase === 'string' ? Number(formValue.totalNonFteopExBaseCase) : formValue.totalNonFteopExBaseCase,
              totalNonFtehighCase: typeof formValue.totalNonFteopExHighCase === 'string' ? Number(formValue.totalNonFteopExHighCase) : formValue.totalNonFteopExHighCase,
              assetInService: formValue.apisdate ? formValue.apisdate : null,
              projectSpendStart: formValue.projectSpendStart ? formValue.projectSpendStart : null,
              currentYearPlannedSpend: typeof formValue.currentYearPlannedSpend === 'string' ? Number(formValue.currentYearPlannedSpend) : formValue.currentYearPlannedSpend,
              assetInServiceNa: formValue.assetInServiceNa ? formValue.assetInServiceNa : false,
              isProjectSpentNa: formValue.isProjectSpentNa ? formValue.isProjectSpentNa : false,
              capexRequired: formValue.capexRequired ? formValue.capexRequired : false,
              opexRequired: formValue.opexRequired ? formValue.opexRequired : false
          }
        this.optionId = GlobalBusinessCaseOptions.OPTION_3
        this.apiService.updateBusinessCaseCost(mainObj, this.projectHubService.projectid, this.optionId).then(Res => {
          this.projectHubService.isNavChanged.next(true)
          this.projectHubService.submitbutton.next(true)
          this.projectHubService.successSave.next(true)
          this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
      }
    }

  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
