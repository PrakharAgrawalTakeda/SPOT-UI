
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import * as moment from 'moment';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from '../project-hub.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @Input() viewType: 'SidePanel' | 'Form' = 'SidePanel'
  @Input() callLocation: 'ProjectHub' | 'ProjectProposal' | 'ProjectCharter' | 'CloseOut' | 'BusinessCase' = 'ProjectHub'
  @Input() viewElements: any = ["isArchived", "problemTitle", "parentProject", "portfolioOwner", "excecutionScope", "owningOrganization", "enviornmentalPortfolio", "isCapsProject","projectManager","sponsor","topsGroup", "primaryProduct", "otherImpactedProducts", "problemType", "projectDescription","isTechTransfer","isOeproject", "isQualityRef", "StrategicDrivers","primaryKPI","isAgile","isPobos","isGmsgqltannualMustWin","isSiteAssessment","isGoodPractise"]
  generalInfoType: 'GeneralInfoSingleEdit' | 'GeneralInfoSingleEditCloseOut' | 'GeneralInfoSingleEditProjectCharter' | 'GeneralInfoSingleEditProjectProposal' | 'GeneralInfoSingleEditBusinessCase' = 'GeneralInfoSingleEdit'
  strategicDriversType: 'StrategicDriversSingleEdit' | 'StrategicDriversSingleEditCloseOut' | 'StrategicDriversSingleEditProjectCharter' | 'StrategicDriversSingleEditProjectProposal' = 'StrategicDriversSingleEdit'
  viewContent: boolean = false
  isWizzard: boolean = false
  lookUpData: any = []
  kpiData: any = []
  id: string = ""
  generalInfoData: any = {}
  filterCriteria: any = {}
  wizzardApprovedDate: string = ""
  generalInfoForm = new FormGroup({
    problemTitle: new FormControl(''),
    parentProgram: new FormControl(''),
    problemType: new FormControl('Standard Project / Program'),
    topsGroup: new FormControl(''),
    recordCreationDate: new FormControl(''),
    submittedBy: new FormControl(''),
    sponsor: new FormControl(''),
    projectManager: new FormControl(''),
    projectDescription: new FormControl(''),
    primaryProduct: new FormControl({}),
    otherImpactedProducts: new FormControl([]),
    portfolioOwner: new FormControl({}),
    excecutionScope: new FormControl([]),
    enviornmentalPortfolio: new FormControl({}),
    isOeproject: new FormControl(false),
    oeprojectType: new FormControl({}),
    isCapsProject: new FormControl(false),
    isTechTransfer: new FormControl(false),
    productionStepId: new FormControl(''),
    campaignPhaseId: new FormControl(''),
    campaignTypeId: new FormControl(''),
    isQualityRef: new FormControl(false),
    isArchived: new FormControl(false),
    owningOrganization: new FormControl(''),
    closeOutApprovedDate: new FormControl(''),
    approvedDate: new FormControl(''),
    opU: new FormControl(''),
    projectId: new FormControl(''),
    localCurrencyAbbreviation: new FormControl(''),
    //
    projectProposalApprovedDate: new FormControl(''),
    functionGroupID:  new FormControl(''),
    whynotgoforNextBestAlternative:  new FormControl(''),
    proposalStatement:  new FormControl(''),
    projectReviewedYN:  new FormControl(''),
    //Stategic Drivers
    primaryKPI: new FormControl(''),
    isAgile: new FormControl(false),
    agilePrimaryWorkstream: new FormControl(''),
    agileSecondaryWorkstream: new FormControl([]),
    agileWave: new FormControl(''),
    isPobos: new FormControl(false),
    pobosCategory: new FormControl([]),
    isGmsgqltannualMustWin: new FormControl(false),
    strategicYear: new FormControl(''),
    annualMustWinID: new FormControl(''),
    isSiteAssessment: new FormControl(false),
    siteAssessmentCategory: new FormControl([]),
    isGoodPractise: new FormControl(false),
    StrategicRationale: new FormControl(''),
    BCAuthor: new FormControl({}),
    RiskImpact: new FormControl(''),
    AdditionalAuthor: new FormControl({}),
    problemId: new FormControl('')
  })
  qrTableEditStack: any = []
  qualityRefForm = new FormArray([])
  projectTypeDropDrownValues = ["Standard Project / Program", "Simple Project"]
  formFieldHelpers: any
  constructor(private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute,
    private portApiService: PortfolioApiService,
    private authService: AuthService,
    private projectHubService: ProjectHubService,
    private router: Router,
    public fuseAlert: FuseConfirmationService) {


    this.projectHubService.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (this.viewContent == true) {
        this.dataloader()
      }
    })
  }
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader(): void {
    if(this.callLocation != 'ProjectHub'){
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
        if(this.callLocation=='CloseOut'){
            this.generalInfoType = 'GeneralInfoSingleEditCloseOut';
            this.strategicDriversType = 'StrategicDriversSingleEditCloseOut'
        }
        if(this.callLocation=='ProjectCharter'){
            this.generalInfoType = 'GeneralInfoSingleEditProjectCharter';
            this.strategicDriversType = 'StrategicDriversSingleEditProjectCharter'
        }
        if(this.callLocation=='ProjectProposal'){
            this.generalInfoType = 'GeneralInfoSingleEditProjectProposal';
            this.strategicDriversType = 'StrategicDriversSingleEditProjectProposal'
        }
        if (this.callLocation == 'BusinessCase') {
            this.generalInfoType = 'GeneralInfoSingleEditBusinessCase'
        }
    }else{
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    }
    this.portApiService.getfilterlist().then(filterres => {
      this.authService.lookupMaster().then((lookup: any) => {
        this.authService.KPIMaster().then((kpi: any) => {
          console.log('LookUp Data', lookup)
          this.lookUpData = lookup
          this.projectHubService.lookUpMaster = lookup
          console.log('Filter Criteria:', filterres)
          this.filterCriteria = filterres
          this.kpiData = kpi
          this.projectHubService.kpiMasters = kpi
          console.log('KPI Masters', kpi)
          this.apiService.getGeneralInfoData(this.id).then((res: any) => {
            console.log("General Info:", res)
            this.generalInfoData = res
            if(this.callLocation=='CloseOut'){
                this.wizzardApprovedDate = res.projectData.closeOutApprovedDate
            }
            if(this.callLocation=='ProjectCharter'){
                this.wizzardApprovedDate = res.projectData.approvedDate
            }
            if(this.callLocation=='ProjectProposal'){
                this.wizzardApprovedDate = res.projectData.projectProposalApprovedDate
            }
            var oeprojectypelist = res.projectData.oeprojectType && res.projectData.oeprojectType != '' ? res.projectData.oeprojectType.split(',') : []
            this.generalInfoForm.patchValue({
              problemTitle: res.projectData.problemTitle,
              problemType: res.projectData.problemType,
              topsGroup: res.topsData ? res.topsData.topsgroup : '',
              recordCreationDate: res.projectData.createdDate,
              parentProgram: res.parentProject ? res.parentProject.problemTitle : '',
              submittedBy: res.projectData.problemOwnerName,
              projectManager: res.portfolioCenterData.pm,
              sponsor: res.portfolioCenterData.sponsor,
              projectDescription: res.projectData.projectDescription,
              primaryProduct: res.primaryProduct ? res.primaryProduct.fullProductName : '',
              otherImpactedProducts: res.otherImpactedProducts ? res.otherImpactedProducts : [],
              portfolioOwner: res.portfolioOwner ? res.portfolioOwner.portfolioOwner : '',
              excecutionScope: res.excecutionScope ? res.excecutionScope : [],
              enviornmentalPortfolio: res.enviornmentalPortfolio ? res.enviornmentalPortfolio.portfolioOwner : '',
              isOeproject: res.projectData.isOeproject,
              oeprojectType: oeprojectypelist.length > 0 ? this.projectHubService.lookUpMaster.filter(x => res.projectData.oeprojectType.includes(x.lookUpId)) : [],
              isCapsProject: res.projectData.isCapsProject,
              isTechTransfer: res.projectData.isTechTransfer,
              productionStepId: res.projectData.productionStepId,
              campaignPhaseId: res.projectData.campaignPhaseId,
              campaignTypeId: res.projectData.campaignTypeId,
              isQualityRef: res.qualityReferences.length != 0,
              isArchived: res.projectData.isArchived,
              owningOrganization: res.projectData.defaultOwningOrganizationId ? res.projectData.defaultOwningOrganizationId : [],
              projectId: res.projectData.problemId,
                opU:  this.filterCriteria.opuMasters.find(
                    x => x.lookUpId == res.portfolioOwner?.opU?.toLowerCase())?.lookUpName,
              isGoodPractise: res.projectData.isGoodPractise,
              approvedDate: this.wizzardApprovedDate,
              //
              functionGroupID: lookup.find(x => x.lookUpId == res.projectData.functionGroupID?.toLowerCase())?.lookUpName,
              whynotgoforNextBestAlternative: res.projectData.whynotgoforNextBestAlternative,
              proposalStatement: res.projectData.proposalStatement,
              projectReviewedYN: lookup.find(x => x.lookUpId == res.projectData.projectReviewedYN?.toLowerCase())?.lookUpName,
              projectProposalApprovedDate: res.projectData.projectProposalApprovedDate,
              localCurrencyAbbreviation: res.localCurrencyAbbreviation,
              //Stategic Drivers
              primaryKPI: res.projectData.primaryKpi ? kpi.find(x => x.kpiid == res.projectData.primaryKpi).kpiname : '',
              isAgile: res.agilePrimaryWorkstream || res.agileWave || res.agileSecondaryWorkstream,
              agilePrimaryWorkstream: res.agilePrimaryWorkstream ? res.agilePrimaryWorkstream.lookUpName : '',
              agileSecondaryWorkstream: res.agileSecondaryWorkstream ? res.agileSecondaryWorkstream : [],
              agileWave: res.agileWave ? res.agileWave.lookUpName : '',
              isPobos: res.projectData.isPobos,
              pobosCategory: res.pobosCategory ? res.pobosCategory : [],
              isGmsgqltannualMustWin: res.projectData.isGmsgqltannualMustWin,
              strategicYear: res.strategicYearID ? res.strategicYearID.lookUpName : '',
              annualMustWinID: res.annualMustWinID ? res.annualMustWinID.lookUpName : '',
              isSiteAssessment: res.projectData.isSiteAssessment,
              siteAssessmentCategory: res.siteAssessmentCategory ? res.siteAssessmentCategory : [],
              StrategicRationale: res.projectData.strategicRationale,
              BCAuthor: res.siteAssessmentCategory ? res.siteAssessmentCategory : [],
              RiskImpact: res.siteAssessmentCategory ? res.siteAssessmentCategory : [],
              AdditionalAuthor: res.siteAssessmentCategory ? res.siteAssessmentCategory : [],
              problemId : res.projectData.problemId
            })
            this.viewContent = true
          })
        })
      })
    })
    this.disabler()
  }
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }

  disabler() {
    this.generalInfoForm.disable()
  }
  getExcecutionScope(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isExecutionScope == true)
  }
  getoeprojectType(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "04D143E7-CAA7-4D8D-88C3-A6CB575890A3")
  }
  getCampaignPhase(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "183dc1f1-06ba-4022-bd6f-ae07f70751e2")
  }
  getCampaignType(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "01a49f16-0744-4100-ae8a-ec2e469dbf74")
  }
  getProductionStep(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "b137412d-8008-4446-8fe6-c56a06b83174")
  }
  getQRType(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "A4C55F7E-C213-401E-A777-3BA741FF5802")
  }
  getOwningOrganization(): any {
    return this.generalInfoData.defaultOwningOrganizations;
  }
  getLookUpName(id: string): string {
    return id && id != '' ? this.lookUpData.find(x => x.lookUpId == id).lookUpName : ''
  }
  viewElementChecker(element: string): boolean {
    return this.viewElements.some(x => x == element)
  }
}
