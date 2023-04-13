import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { SpotlightIndicatorsService } from 'app/core/spotlight-indicators/spotlight-indicators.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { GlobalBusinessCaseOptions } from 'app/shared/global-business-case-options';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';

@Component({
  selector: 'app-funding',
  templateUrl: './funding.component.html',
  styleUrls: ['./funding.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class FundingComponent implements OnInit, OnChanges {
  @Input() mode: 'Normal' | 'Project-Close-Out' | 'Project-Charter' | 'Business-Case' = 'Normal'
  @Input() optionType: 'recommended-option' | 'option-2' | 'option-3' = 'recommended-option'
  @Input() projectid: any;
  @Input() projectViewDetails: any;
  @Input() lookup: any
  @Input() kpi: any
  @Input() editable: boolean = true
  initializationComplete: boolean = false
  id: string = ""
  fundingbulkEditType: string = 'FundingBulkEdit';
  addSingle: string = 'FundingSingleEdit';
  viewContent: boolean = false
  fundingdata: any;
  fundingSourceData: any;
  Amount: any;
  localcurrency: any;
  optionId: any;
  fundingBCbulkEditType: string;

  constructor(private projecthubservice: ProjectHubService, private indicator: SpotlightIndicatorsService,
    public fuseAlert: FuseConfirmationService, private apiService: ProjectApiService, private authService: AuthService, private _Activatedroute: ActivatedRoute,
    private portApiService: PortfolioApiService) {
    this.projecthubservice.submitbutton.subscribe(res => {
      if (res == true) {
        this.dataloader()
      }
    })
  }

  ngOnInit(): void {
    //console.log(this.projectViewDetails)
    if (this.mode == 'Project-Charter') {
      this.addSingle = 'FundingSingleEdit'
    }
    else if (this.optionType == 'recommended-option') {
      this.addSingle = 'BCFundingSingleEdit'
    }
    else if (this.optionType == 'option-2') {
      this.addSingle = 'BC2FundingSingleEdit'
    }
    else if (this.optionType == 'option-3') {
      this.addSingle = 'BC3FundingSingleEdit'
    }
    this.dataloader()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
    if (this.optionType == 'recommended-option') {
      console.log("BUSINESS CASE")
      this.fundingBCbulkEditType = 'FundingBCBulkEdit'
      this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id")
      this.apiService.getCostFunding(this.id).then((res: any) => {
        this.authService.lookupMaster().then((lookup: any) => {
          this.portApiService.getfilterlist().then((po: any) => {
            this.fundingSourceData = po
            this.localcurrency = res.localCurrency
            this.Amount = this.localcurrency.localCurrencyAbbreviation
            console.log(this.fundingSourceData)
            console.log(res)
            console.log(res.fundingData)
            console.log(lookup)
            this.fundingdata = res.fundingData
            if (this.fundingdata != null) {
              for (var i of this.fundingdata) {
                console.log(i)
                //res.equipmentRatingId ? lookup.find(x => x.lookUpId == res.equipmentRatingId)?.lookUpName : ''
                i.fundingSourceName = i.fundingSourceId ? po.portfolioOwner.find(x => x.portfolioOwnerId == i.fundingSourceId).portfolioOwner : ''
              }
            }
            this.projecthubservice.lookUpMaster = lookup
            this.viewContent = true
          })
        })
      })
      this.initializationComplete = false
      this.initializationComplete = true
    }
    if (this.optionType == 'option-2') {
      console.log("BUSINESS CASE")
      this.optionId = GlobalBusinessCaseOptions.OPTION_2
      this.fundingBCbulkEditType = 'FundingBCEditO2'
      this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
      console.log("OPTION 2", this.id)
      this.apiService.getBusinessCaseCostFunding(this.id, this.optionId).then((res: any) => {
        this.authService.lookupMaster().then((lookup: any) => {
          this.portApiService.getfilterlist().then((po: any) => {
            this.fundingSourceData = po
            this.localcurrency = res.localCurrency
            this.Amount = this.localcurrency.localCurrencyAbbreviation
            console.log(this.fundingSourceData)
            console.log(res)
            console.log(res.fundingData)
            console.log(lookup)
            this.fundingdata = res.fundingData
            if (this.fundingdata != null) {
              for (var i of this.fundingdata) {
                console.log(i)
                //res.equipmentRatingId ? lookup.find(x => x.lookUpId == res.equipmentRatingId)?.lookUpName : ''
                i.fundingSourceName = i.fundingSourceId ? po.portfolioOwner.find(x => x.portfolioOwnerId == i.fundingSourceId).portfolioOwner : ''
              }
            }
            this.projecthubservice.lookUpMaster = lookup
            this.viewContent = true
          })
        })
      })
      this.initializationComplete = false
      this.initializationComplete = true
    }
    if (this.optionType == 'option-3') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_3
      this.fundingBCbulkEditType = 'FundingBCEditO3'
      this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
      this.apiService.getBusinessCaseCostFunding(this.id, this.optionId).then((res: any) => {
        this.authService.lookupMaster().then((lookup: any) => {
          this.portApiService.getfilterlist().then((po: any) => {
            this.fundingSourceData = po
            this.localcurrency = res.localCurrency
            this.Amount = this.localcurrency.localCurrencyAbbreviation
            console.log(this.fundingSourceData)
            console.log(res)
            console.log(res.fundingData)
            console.log(lookup)
            this.fundingdata = res.fundingData
            if (this.fundingdata != null) {
              for (var i of this.fundingdata) {
                console.log(i)
                //res.equipmentRatingId ? lookup.find(x => x.lookUpId == res.equipmentRatingId)?.lookUpName : ''
                i.fundingSourceName = i.fundingSourceId ? po.portfolioOwner.find(x => x.portfolioOwnerId == i.fundingSourceId).portfolioOwner : ''
              }
            }
            this.projecthubservice.lookUpMaster = lookup
            this.viewContent = true
          })
        })
      })
      this.initializationComplete = false
      this.initializationComplete = true
    }
    else if (this.mode == 'Project-Charter') {
      console.log("PROJECTCHARTER")
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      this.apiService.getCostFunding(this.id).then((res: any) => {
        this.authService.lookupMaster().then((lookup: any) => {
          this.portApiService.getfilterlist().then((po: any) => {
            this.fundingSourceData = po
            this.localcurrency = res.localCurrency
            this.Amount = this.localcurrency.localCurrencyAbbreviation
            console.log(this.fundingSourceData)
            console.log(res)
            console.log(res.fundingData)
            console.log(lookup)
            this.fundingdata = res.fundingData
            if (this.fundingdata != null) {
              for (var i of this.fundingdata) {
                console.log(i)
                //res.equipmentRatingId ? lookup.find(x => x.lookUpId == res.equipmentRatingId)?.lookUpName : ''
                i.fundingSourceName = i.fundingSourceId ? po.portfolioOwner.find(x => x.portfolioOwnerId == i.fundingSourceId).portfolioOwner : ''
              }
            }
            this.projecthubservice.lookUpMaster = lookup
            this.viewContent = true
          })
        })
      })
      this.initializationComplete = false
      this.initializationComplete = true
    }

  }
  // getLookUpName(lookUpId: string): string {
  //   return lookUpId && lookUpId != '' ? this.lookup.find(x => x.lookUpId == lookUpId).lookUpName : ''
  // }
  // getKPIName(kpiid: string): string {
  //   return this.kpi.find(x => x.kpiid == kpiid) ? this.kpi.find(x => x.kpiid == kpiid).kpiname : ''
  // }

  deleteFunding(id: string) {
    console.log(id)
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Remove Funding?",
      "message": "Are you sure you want to remove this record permanently? ",
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
    const fundingAlert = this.fuseAlert.open(comfirmConfig)

    fundingAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed' && this.mode == 'Project-Charter') {
        this.apiService.deleteFunding(id).then(res => {
          this.projecthubservice.submitbutton.next(true)
        })
      }
      if (close == 'confirmed' && this.optionType == 'recommended-option' && this.mode != 'Project-Charter') {
        this.apiService.deleteFundingBusinessCase(this.id, this.optionId, id).then(res => {
          this.projecthubservice.submitbutton.next(true)
        })
      }
      if (close == 'confirmed' && this.optionType == 'option-2' && this.mode != 'Project-Charter') {
        console.log("DELETING OPTION 2 FUNDING")
        this.apiService.deleteBusinessCaseFunding(this.id, GlobalBusinessCaseOptions.OPTION_2, id).then(res => {
          this.projecthubservice.submitbutton.next(true)
        })
      }
      if (close == 'confirmed' && this.optionType == 'option-3' && this.mode != 'Project-Charter') {
        this.apiService.deleteBusinessCaseFunding(this.id, GlobalBusinessCaseOptions.OPTION_3, id).then(res => {
          this.projecthubservice.submitbutton.next(true)
        })
      }
    })

  }
}
