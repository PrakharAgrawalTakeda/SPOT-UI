
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
  @Input() viewElements: any = ["isConfidential", "isArchived", "problemTitle", "parentProject", "portfolioOwner", "excecutionScope", "owningOrganization", "enviornmentalPortfolio", "isCapsProject", "projectManager", "sponsor", "topsGroup", "primaryProduct", "otherImpactedProducts", "problemType", "projectDescription", "isTechTransfer", "isOeproject", "isQualityRef", "StrategicDrivers", "primaryKPI", "isAgile", "isPobos", "isGmsgqltannualMustWin", "isSiteAssessment", "isGoodPractise"]
  generalInfoType: 'GeneralInfoSingleEdit' | 'GeneralInfoSingleEditCloseOut' | 'GeneralInfoSingleEditProjectCharter' | 'GeneralInfoSingleEditProjectProposal' | 'GeneralInfoSingleEditBusinessCase' | 'GeneralInfoSingleEditStrategicInitiative' = 'GeneralInfoSingleEdit'
  strategicDriversType: 'StrategicDriversSingleEdit' | 'StrategicDriversSingleEditCloseOut' | 'StrategicDriversSingleEditProjectCharter' | 'StrategicDriversSingleEditProjectProposal' | 'StrategicDriversSingleEditStrategicInitiative' | 'StrategicDriversSingleEditProjectProposalStrategicInitiative' | 'StrategicDriversSingleEditCloseOutStrategicInitiative' = 'StrategicDriversSingleEdit'
  viewContent: boolean = false
  isWizzard: boolean = false
  projectNameLabel:string = "Project Name"
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
    primaryProduct: new FormControl(null),
    otherImpactedProducts: new FormControl([]),
    portfolioOwner: new FormControl(null),
    excecutionScope: new FormControl([]),
    enviornmentalPortfolio: new FormControl(null),
    isOeproject: new FormControl(false),
    oeprojectType: new FormControl(null),
    isCapsProject: new FormControl(false),
    isTechTransfer: new FormControl(false),
    productionStepId: new FormControl(''),
    campaignPhaseId: new FormControl(''),
    campaignTypeId: new FormControl(''),
    isQualityRef: new FormControl(false),
    isArchived: new FormControl(false),
    isConfidential: new FormControl(false),
    owningOrganization: new FormControl(''),
    closeOutApprovedDate: new FormControl(''),
    approvedDate: new FormControl(''),
    opU: new FormControl(''),
    projectId: new FormControl(''),
    //
    projectProposalApprovedDate: new FormControl(''),
    functionGroupID: new FormControl(''),
    whynotgoforNextBestAlternative: new FormControl(''),
    proposalStatement: new FormControl(''),
    projectReviewedYN: new FormControl(''),
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
    BCAuthor: new FormControl(null),
    RiskImpact: new FormControl(''),
    AdditionalAuthor: new FormControl([]),
    problemId: new FormControl(''),
    businessCaseApprovedDate: new FormControl('')
  })
  qrTableEditStack: any = []
  qualityRefForm = new FormArray([])
  projectTypeDropDrownValues = ["Standard Project / Program", "Simple Project", "Strategic Initiative / Program"]
  isStrategicInitiative: boolean = false
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
    if (this.callLocation != 'ProjectHub') {
      this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
      if (this.callLocation == 'CloseOut') {
        this.generalInfoType = 'GeneralInfoSingleEditCloseOut';
        this.strategicDriversType = 'StrategicDriversSingleEditCloseOut'
      }
      if (this.callLocation == 'ProjectCharter') {
        this.generalInfoType = 'GeneralInfoSingleEditProjectCharter';
        this.strategicDriversType = 'StrategicDriversSingleEditProjectCharter'
      }
      if (this.callLocation == 'ProjectProposal') {
        this.generalInfoType = 'GeneralInfoSingleEditProjectProposal';
        this.strategicDriversType = 'StrategicDriversSingleEditProjectProposal'
      }
      if (this.callLocation == 'BusinessCase') {
        this.generalInfoType = 'GeneralInfoSingleEditBusinessCase'
      }
    } else {
      this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    }
    this.portApiService.getfilterlist().then(filterres => {
      this.authService.lookupMaster().then((lookup: any) => {
        this.authService.KPIMaster().then((kpi: any) => {
          console.log('LookUp Data', lookup)
          this.lookUpData = lookup.filter(x => x.lookUpParentId == "999572a6-5aa8-4760-8082-c06774a17474")
          this.projectHubService.lookUpMaster = lookup
          console.log('Filter Criteria:', filterres)
          this.filterCriteria = filterres
          this.kpiData = kpi
          console.log(this.kpiData)
          console.log(this.lookUpData.filter(x => x.lookUpParentId == "999572a6-5aa8-4760-8082-c06774a17474"))
          this.projectHubService.kpiMasters = kpi
          if (this.callLocation == 'CloseOut') {
            this.apiService.getGeneralInfoDataWizzard(this.id, 'ProjectCloseOut').then((res: any) => {
              this.wizzardApprovedDate = res.projectData.closeOutApprovedDate
              this.generalInfoPatchValue(res)
              this.viewContent = true
            })
          }
          if (this.callLocation == 'ProjectCharter') {
            this.apiService.getGeneralInfoDataWizzard(this.id, 'ProjectCharter').then((res: any) => {
              this.wizzardApprovedDate = res.projectData.approvedDate
              this.generalInfoPatchValue(res)
              this.viewContent = true
            })
          }
          if (this.callLocation == 'ProjectProposal') {
            this.apiService.getGeneralInfoDataWizzard(this.id, 'ProjectProposal').then((res: any) => {
              this.wizzardApprovedDate = res.projectData.projectProposalApprovedDate
              this.generalInfoPatchValue(res)
              this.viewContent = true
            })
          }
          if (this.callLocation == 'ProjectHub') {
            this.apiService.getGeneralInfoData(this.id).then((res: any) => {
              this.generalInfoData = res
              this.generalInfoPatchValue(res)
              this.viewContent = true
            })
          }
          if (this.callLocation == 'BusinessCase') {
            this.apiService.getGeneralInfoDataWizzard(this.id, 'BusinessCase').then((res: any) => {
              // this.wizzardApprovedDate = res.projectData.closeOutApprovedDate
              this.generalInfoPatchValue(res)
              this.viewContent = true
            })
          }
        })
      })
    })
    this.disabler()
  }
  ngOnDestroy(): void {
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
   removeDuplicates(array1, array2): any {
    const result = [];
    for (const element of array1) {
      if (!array2.includes(element)) {
        result.push(element);
      }
    }
    return result;
  }
  
  generalInfoPatchValue(response) {
    this.isStrategicInitiative = response.projectData.problemType == "Strategic Initiative / Program"
    if (this.isStrategicInitiative) {
      this.projectNameLabel = "Initiaitive Name"
      if (this.callLocation == "ProjectHub") {
        this.viewElements = ["isConfidential", "isArchived", "problemTitle", "parentProject", "portfolioOwner", "excecutionScope", "owningOrganization", "sponsor", "topsGroup", "primaryProduct", "otherImpactedProducts", "problemType", "projectDescription", "StrategicDrivers", "primaryKPI", "isAgile"]
        this.strategicDriversType = "StrategicDriversSingleEditStrategicInitiative"
        this.generalInfoType = "GeneralInfoSingleEditStrategicInitiative"
      }
      if(this.callLocation == "ProjectProposal"){
        this.viewElements = this.removeDuplicates(this.viewElements, ["isPobos", "isGmsgqltannualMustWin", "isSiteAssessment"])
        this.viewElements.push("problemType")
        this.strategicDriversType = "StrategicDriversSingleEditProjectProposalStrategicInitiative"
      }
      if(this.callLocation == "BusinessCase"){
        this.viewElements.push("problemType")
        this.projectNameLabel = "Initiative Title/ Project Name"
      }
      if(this.callLocation == "ProjectCharter"){
        this.viewElements.push("problemType")
        this.projectNameLabel = "Initiative Title/ Project Name"
      }
      if(this.callLocation == "CloseOut"){
        this.viewElements.push(...["problemType", "isAgile"])
        this.strategicDriversType = "StrategicDriversSingleEditCloseOutStrategicInitiative"
        this.projectNameLabel = "Initiative Title/ Project Name"
      }
    }

    var oeprojectypelist = response.projectData.oeprojectType && response.projectData.oeprojectType != '' ? response.projectData.oeprojectType.split(',') : []
    console.log(response)
    console.log(response.projectData.primaryKpi)
    this.generalInfoForm.patchValue({
      problemTitle: response.projectData.problemTitle,
      problemType: response.projectData.problemType,
      topsGroup: response.topsData ? response.topsData.topsgroup : '',
      recordCreationDate: response.projectData.createdDate,
      parentProgram: response.parentProject ? response.parentProject.problemTitle : '',
      submittedBy: response.projectData.problemOwnerName,
      projectManager: response.portfolioCenterData.pm,
      sponsor: response.sponsor?.teamMemberName,
      projectDescription: response.projectData.projectDescription,
      primaryProduct: response.primaryProduct ? response.primaryProduct.fullProductName : '',
      otherImpactedProducts: response.otherImpactedProducts ? response.otherImpactedProducts : [],
      portfolioOwner: response.portfolioOwner ? response.portfolioOwner.portfolioOwner : '',
      excecutionScope: response.excecutionScope ? response.excecutionScope : [],
      enviornmentalPortfolio: response.enviornmentalPortfolio ? response.enviornmentalPortfolio.portfolioOwner : '',
      isOeproject: response.projectData.isOeproject,
      oeprojectType: oeprojectypelist.length > 0 ? this.projectHubService.lookUpMaster.filter(x => response.projectData.oeprojectType.includes(x.lookUpId)) : [],
      isCapsProject: response.projectData.isCapsProject,
      isTechTransfer: response.projectData.isTechTransfer,
      productionStepId: response.projectData.productionStepId,
      campaignPhaseId: response.projectData.campaignPhaseId,
      campaignTypeId: response.projectData.campaignTypeId,
      isQualityRef: response.qualityReferences.length != 0,
      isArchived: response.projectData.isArchived,
      isConfidential: response.projectData.isConfidential,
      owningOrganization: response.projectData.defaultOwningOrganizationId ? response.projectData.defaultOwningOrganizationId : [],
      projectId: response.projectData.problemId,
      opU: this.filterCriteria.opuMasters.find(
        x => x.lookUpId == response.portfolioOwner?.opU?.toLowerCase())?.lookUpName,
      isGoodPractise: response.projectData.isGoodPractise,
      approvedDate: this.wizzardApprovedDate,
      //
      functionGroupID: this.lookUpData.find(x => x.lookUpId == response.projectData.functionGroupID?.toLowerCase())?.lookUpName,
      whynotgoforNextBestAlternative: response.projectData.whynotgoforNextBestAlternative,
      proposalStatement: response.projectData.proposalStatement,
      projectReviewedYN: this.lookUpData.find(x => x.lookUpId == response.projectData.projectReviewedYN?.toLowerCase())?.lookUpName,
      projectProposalApprovedDate: response.projectData.projectProposalApprovedDate,
      //Stategic Drivers
      //primaryKPI: response.projectData.primaryKpi && this.lookUpData.find(x => x.lookUpId == response.projectData.primaryKpi) ? this.lookUpData.find(x => x.lookUpId == response.projectData.primaryKpi).lookUpName : '',
      primaryKPI: (() => {
        if (response.projectData.primaryKpi) {
            const lookUpResult = this.lookUpData.find(x => x.lookUpId == response.projectData.primaryKpi);
            if (lookUpResult) {
                return lookUpResult.lookUpName;
            } else {
                const kpiResult = this.kpiData.find(x => x.kpiid == response.projectData.primaryKpi);
                if (kpiResult) {
                    return kpiResult.kpiname;
                }
            }
        }
        else{
          return '';
        }
        
    })(),
      isAgile: response.agilePrimaryWorkstream || response.agileWave || response.agileSecondaryWorkstream,
      agilePrimaryWorkstream: response.agilePrimaryWorkstream ? response.agilePrimaryWorkstream.lookUpName : '',
      agileSecondaryWorkstream: response.agileSecondaryWorkstream ? response.agileSecondaryWorkstream : [],
      agileWave: response.agileWave ? response.agileWave.lookUpName : '',
      isPobos: response.projectData.isPobos,
      pobosCategory: response.pobosCategory ? response.pobosCategory : [],
      isGmsgqltannualMustWin: response.projectData.isGmsgqltannualMustWin,
      strategicYear: response.strategicYearID ? response.strategicYearID.lookUpName : '',
      annualMustWinID: response.annualMustWinID ? response.annualMustWinID.lookUpName : '',
      isSiteAssessment: response.projectData.isSiteAssessment,
      siteAssessmentCategory: response.siteAssessmentCategory ? response.siteAssessmentCategory : [],
      StrategicRationale: response.projectData.strategicRationale,
      BCAuthor: response.businessCaseAuthor == null ? '' : response.businessCaseAuthor.userDisplayName,
      RiskImpact: response.businessCaseImpactOfDoingNothing,
      AdditionalAuthor: response.businessCaseAdditionalAuthorsContributors == null ? [] : response.businessCaseAdditionalAuthorsContributors,
      problemId: response.projectData.problemId,
      businessCaseApprovedDate: response.businessCaseApprovedDate
    })
  }
}
