import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { GlobalBusinessCaseOptions } from 'app/shared/global-business-case-options';
import { ProjectHubService } from '../../project-hub.service';
import { ProjectApiService } from '../project-api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-option-info',
  templateUrl: './option-info.component.html',
  styleUrls: ['./option-info.component.scss']
})
export class OptionInfoComponent implements OnInit, OnDestroy{
  @Input() optionType: 'recommended-option' | 'option-2' | 'option-3' = 'recommended-option'
  optionInfoEditType: 'OptionInfoEditRC' | 'OptionInfoEditO2' | 'OptionInfoEditO3'
  feasibilityEditType: 'FeasibilityEditRC' | 'FeasibilityEditO2' | 'FeasibilityEditO3'
  optionId: string = ''
  optionInfoData = {}
  feasibilityData = []
  id: string = ''
  viewContent = false
  optionInfoForm = new FormGroup({
    optionTitle: new FormControl(''),
    proposalStatement: new FormControl(''),
    detailedDescription: new FormControl(''),
    rationaleWhyBestOption: new FormControl(''),
    tradeoffsConsiderations: new FormControl(''),

    //Feasiblity
    peopleRatingId: new FormControl(''),
    peopleJustification: new FormControl(''),
    technologyRatingId: new FormControl(''),
    technologyJustification: new FormControl(''),
    businessCaseProcessId: new FormControl(''),
    businessProcessJustification: new FormControl(''),
    manufacturingProcessId: new FormControl(''),
    manufacturingProcessJustification: new FormControl(''),
    equipmentRatingId: new FormControl(''),
    equipementJustification: new FormControl(''),
  })
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute,
    private portApiService: PortfolioApiService,
    private authService: AuthService,
    private projectHubService: ProjectHubService) { 
      this.projectHubService.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res=>{
        if(this.viewContent){
          this.dataloader()
        }
      })
      this.projectHubService.isNavChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(res=>{
        if(this.viewContent){
          this.dataloader()
        }
      })
    }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    if (this.optionType == 'recommended-option') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_1
      this.optionInfoEditType = 'OptionInfoEditRC'
      this.feasibilityEditType = 'FeasibilityEditRC'
    }
    else if (this.optionType == 'option-2') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_2
      this.optionInfoEditType = 'OptionInfoEditO2'
      this.feasibilityEditType = 'FeasibilityEditO2'
    }
    else if (this.optionType == 'option-3') {
      this.optionId = GlobalBusinessCaseOptions.OPTION_3
      this.optionInfoEditType = 'OptionInfoEditO3'
      this.feasibilityEditType = 'FeasibilityEditO3'
    }
    this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getBusinessCaseOptionInfoData(this.id, this.optionId).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {
        console.log("Option Info Data", res)
        this.optionInfoData = res
        this.projectHubService.lookUpMaster = lookup
        this.optionInfoForm.patchValue({
          optionTitle: res.optionTitle,
          proposalStatement: res.proposalStatement,
          detailedDescription: res.detailedDescription,
          rationaleWhyBestOption: res.rationaleWhyBestOption,
          tradeoffsConsiderations: res.tradeoffsConsiderations,

          //Feasiblity
          peopleRatingId: res.peopleRatingId ? lookup.find(x => x.lookUpId == res.peopleRatingId)?.lookUpName : '',
          peopleJustification: res.peopleJustification,
          technologyRatingId: res.technologyRatingId ? lookup.find(x => x.lookUpId == res.technologyRatingId)?.lookUpName : '',
          technologyJustification: res.technologyJustification,
          businessCaseProcessId: res.businessCaseProcessId? lookup.find(x => x.lookUpId == res.businessCaseProcessId)?.lookUpName : '',
          businessProcessJustification: res.businessProcessJustification,
          manufacturingProcessId: res.manufacturingProcessId? lookup.find(x => x.lookUpId == res.manufacturingProcessId)?.lookUpName : '',
          manufacturingProcessJustification: res.manufacturingProcessJustification,
          equipmentRatingId: res.equipmentRatingId ? lookup.find(x => x.lookUpId == res.equipmentRatingId)?.lookUpName : '',
          equipementJustification: res.equipementJustification,

        })
        this.feasibilityData = [{
          component: 'People',
          rating: 'peopleRatingId',
          justification: 'peopleJustification'
        },
        {
          component: 'Technology',
          rating: 'technologyRatingId',
          justification: 'technologyJustification'
        },
        {
          component: 'Business Processes',
          rating: 'businessCaseProcessId',
          justification: 'businessProcessJustification'
        },
        {
          component: 'Manufacturing Processes',
          rating: 'manufacturingProcessId',
          justification: 'manufacturingProcessJustification'
        },
        {
          component: 'Equipment',
          rating: 'equipmentRatingId',
          justification: 'equipementJustification'
        }]
        this.optionInfoForm.disable()
        this.viewContent = true
      })
    })
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
