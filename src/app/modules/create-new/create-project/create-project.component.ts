import { Component, OnInit, EventEmitter, Output, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { PortfolioApiService } from './../../portfolio-center/portfolio-api.service';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from './../../../core/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, FormArray} from '@angular/forms';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { QualityRefBulkEditComponent } from 'app/modules/project-hub/general-info/quality-ref-bulk-edit/quality-ref-bulk-edit.component';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { __classPrivateFieldSet } from 'tslib';
import { MatStepper } from '@angular/material/stepper';
import { CreateNewApiService } from '../create-new-api.service';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';
import { LocalAttributeSingleEditComponent } from 'app/modules/project-hub/local-attributes/local-attribute-single-edit/local-attribute-single-edit.component';
import moment from 'moment';
import { RoleService } from 'app/core/auth/role.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CreateProjectComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(LocalAttributeSingleEditComponent, { static: false }) localAttribute: LocalAttributeSingleEditComponent
  filterCriteria: any = {};
  getData: boolean = false;
  lookupdata: any = [];
  activeaccount: any;
  projectid: string = "";
  qualityformValue = [];
  qualityType: any = [];
  campaignPhase: any = [];
  campaignType: any = [];
  productionSteps: any = [];
  qualityValue = false;
  qualityForm = []
  campaingPhaseName:string = "";
  campaingTypeName: string = "";
  productionStepName: string = "";
  localCurrency:any = [];
  viewContent:boolean = false
  showLocalAttributes:boolean = false
  showLocalAttributesTitle:boolean = false
  portfolioOwners = ""
  executionScope = ""
  createProjectForm = new FormGroup({
    problemTitle: new FormControl(),
    projectsingle: new FormControl(),
    projectsingleid: new FormControl(),
    problemType: new FormControl(),
    projectDescription: new FormControl(),
    primaryProduct: new FormControl(null),
    otherImpactedProducts: new FormControl([]),
    portfolioOwner: new FormControl(null),
    excecutionScope: new FormControl([]),
    enviornmentalPortfolio: new FormControl(null),
    isCapsProject: new FormControl(null),
    owningOrganization: new FormControl(),
    SubmittedBy: new FormControl(),
    targetGoalSituation: new FormControl(),
    isOeproject: new FormControl(null),
    qualityReference: new FormControl(),
    isTechTransfer: new FormControl(null),
    primaryKPI: new FormControl(),
    isAgile: new FormControl(),
    isSiteAssessment: new FormControl(),
    isPobos: new FormControl(),
    oeProjectType: new FormControl(),
    campaignPhase: new FormControl(),
    productionSteps: new FormControl(),
    campaignType: new FormControl(),
    agilePrimaryWorkstream: new FormControl(),
    agileSecondaryWorkstream: new FormControl(),
    agileWave: new FormControl(),
    pobosCategory: new FormControl(),
    siteAssessmentCategory: new FormControl(),
    quality: new FormControl(new FormArray([])),
    isGmsgqltannualMustWin: new FormControl(),
    strategicYear: new FormControl(),
    annualMustWinID: new FormControl(),
    localCurrency: new FormControl(),
    isArchived: new FormControl(),
    isConfidential: new FormControl(),
    valueCaptureStart: new FormControl(''),
    sponsor: new FormControl(null),
  })
  newmainnav: any = []
  envPortfolio:any
  SIP:boolean = false
  capturedValues = ['', '']
  LAData:any = []
  // fuseAlert: any;

  constructor(private apiService: PortfolioApiService, private router: Router, private titleService: Title, private authService: MsalService, private apiService2: ProjectApiService, public auth: AuthService, public fuseAlert: FuseConfirmationService, public createApiService: CreateNewApiService, public _fuseNavigationService: FuseNavigationService, public projectHubService: ProjectHubService, private msalService: MsalService, public role: RoleService) {
  }

  
  ngOnInit(): void {
    const url = this.router.url;
    var Urlval = url.substring(url.lastIndexOf('/') + 1);
    if (Urlval == "create-strategic-initiative-project") {
      this.checkPermission()
    }
    const mainNavComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
    this.activeaccount = this.msalService.instance.getActiveAccount();
    this.newmainnav = [
      {
        id: 'portfolio-center',
        title: 'Portfolio Center',
        type: 'basic',
        link: '/portfolio-center'
      },
      {
        // id: 'create-project',
        title: 'Create Project',
        type: 'collapsable',
        link: '/create-project',
        children: [
          {
            title: 'Create a Strategic Initiative/Program',
            type: 'basic',
            link: '/create-project/create-strategic-initiative-project'
          },
          {
            title: 'Create a Standard/Simple Project/Program',
            type: 'basic',
            link: '/create-project/create-new-project'
          },
          {
            title: 'Copy an existing Project',
            type: 'basic',
            link: '/create-project/copy-project'
          }
        ],
      },
      {
        id: 'project-hub',
        title: 'Project Hub',
        type: 'basic',
        link: '/project-hub'
      },
      {
        id: 'spot-documents',
        title: 'SPOT Supporting Documents',
        type: 'basic',
        externalLink: true,
        link: 'https://mytakeda.sharepoint.com/sites/PMT-SPOT/SitePages/home.aspx',
        target: '_blank'
      },
      {
        id: 'report-navigator',
        title: 'Report Navigator',
        type: 'basic',
        link: 'https://app.powerbi.com/groups/me/apps/2455a697-d480-4b4f-b83b-6be92a73a81e/reports/e6c7feb2-8dca-49ea-9eff-9596f519c64e/ReportSectiona2d604c32b4ad7a54177?ctid=57fdf63b-7e22-45a3-83dc-d37003163aae',
        externalLink: true,
        target: "_blank"
  
      },
      {
        id: 'spot-support',
        title: 'Need Help or Propose a Change',
        type: 'basic',
        link: 'mailto:DL.SPOTSupport@takeda.com?Subject=SPOT Support Request ' + this.activeaccount.name + ' (Logged on ' + moment().format('llll') + ')',
        externalLink: true,
        target: "_blank"
  
      }
    ]
    mainNavComponent.navigation = this.newmainnav
    mainNavComponent.refresh()
    this.projectHubService.projectidInjector("")
    console.log("Inside init")
    if (Urlval == "create-strategic-initiative-project"){
      this.SIP = true
    }
    this.auth.lookupMaster().then(res => {
      this.apiService.getLocalCurrency().then(currency => {
        this.localCurrency = currency
      this.lookupdata = res;
        console.log("lookUpMaster", this.lookupdata)
      this.qualityType = this.lookupdata.filter(x => x.lookUpParentId == 'A4C55F7E-C213-401E-A777-3BA741FF5802');
      this.qualityType.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      this.campaignPhase = this.lookupdata.filter(x => x.lookUpParentId == '183dc1f1-06ba-4022-bd6f-ae07f70751e2');
      this.campaignPhase.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      this.campaignType = this.lookupdata.filter(x => x.lookUpParentId == '01a49f16-0744-4100-ae8a-ec2e469dbf74');
      this.campaignType.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
      this.productionSteps = this.lookupdata.filter(x => x.lookUpParentId == 'b137412d-8008-4446-8fe6-c56a06b83174');
      this.productionSteps.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
    })
    })
    console.log("From Create project " + history.state);
    
    this.titleService.setTitle("Create New Project")
    

  }

  captureValue(index: number, event: any) {
    this.capturedValues[index] = event
    if(index == 4){
      this.capturedValues[index] = event.value
      this.qualityForm = event.value;
    }
    if (index == 6) {
      this.capturedValues[index] = event.value
      this.createProjectForm.patchValue({
        qualityReference: event.value.isQualityRef
      })
    }
    else if (index == 0) {
      if(!this.SIP){
      this.envPortfolio = event.enviornmentalPortfolio
      }
      this.createProjectForm.patchValue({
        problemTitle: event.problemTitle,
        problemType: this.SIP ? "Strategic Initiative/Program" : event.problemType,
        localCurrency: event.localCurrency,
        projectsingle: event.projectsingle == "" ? event.projectsingle.problemTitle : event.projectsingle,
        projectsingleid: event.projectsingleid == "" ? event.projectsingle.problemUniqueId : event.projectsingleid,
        projectDescription: event.projectDescription,
        primaryProduct: event.primaryProduct == undefined ? [] : event.primaryProduct,
        otherImpactedProducts: event.otherImpactedProducts ? event.otherImpactedProducts : [],
        portfolioOwner: event.portfolioOwner == undefined ? '' : event.portfolioOwner,
        excecutionScope: event.excecutionScope ? event.excecutionScope : [],  
        enviornmentalPortfolio: event.enviornmentalPortfolio == undefined ? '' : event.enviornmentalPortfolio,
        isArchived: event.isArchived,
        isCapsProject: event.isCapsProject,
        owningOrganization: event.owningOrganization,
        SubmittedBy: event.SubmittedBy,
        targetGoalSituation: event.targetGoalSituation,
        valueCaptureStart: event.valueCaptureStart,
        sponsor: event.sponsor
      })
    }
    else if (index == 1) {
      if(this.SIP){
        this.createProjectForm.patchValue({
          isConfidential: event.isConfidential,
        projectsingle: event.projectsingle == "" ? event.projectsingle.problemTitle : event.projectsingle,
          projectsingleid: event.projectsingleid == "" ? event.projectsingle.problemUniqueId : event.projectsingleid,
          isCapsProject: event.isCapsProject
        })
      }
      else{
        this.createProjectForm.patchValue({
          isConfidential: event.isConfidential,
          projectsingle: event.projectsingle == "" ? event.projectsingle.problemTitle : event.projectsingle,
          projectsingleid: event.projectsingleid == "" ? event.projectsingle.problemUniqueId : event.projectsingleid,
          enviornmentalPortfolio: event.enviornmentalPortfolio,
          isCapsProject: event.isCapsProject
        })
      }
    }
    else if (index == 2) {
      this.createProjectForm.patchValue({
        isOeproject: event.isOeproject,
        oeProjectType: event.oeprojectType
      })
    }
    else if (index == 3) {
      if (this.campaignPhase.length == 0){
        this.auth.lookupMaster().then(res => {
          this.lookupdata = res;
          this.campaignPhase = this.lookupdata.filter(x => x.lookUpParentId == '183dc1f1-06ba-4022-bd6f-ae07f70751e2');
          this.campaignPhase.sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })
          this.campaignType = this.lookupdata.filter(x => x.lookUpParentId == '01a49f16-0744-4100-ae8a-ec2e469dbf74');
          this.campaignType.sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })
          this.productionSteps = this.lookupdata.filter(x => x.lookUpParentId == 'b137412d-8008-4446-8fe6-c56a06b83174');
          this.productionSteps.sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
          })
          this.campaingPhaseName = event.campaignPhaseId != "" && event.campaignPhaseId != undefined ? this.campaignPhase.filter(x => x.lookUpId == event.campaignPhaseId)[0].lookUpName : ""
          this.campaingTypeName = event.campaignTypeId != "" && event.campaignTypeId != undefined ? this.campaignType.filter(x => x.lookUpId == event.campaignTypeId)[0].lookUpName : ""
          this.productionStepName = event.productionStepId != "" && event.productionStepId != undefined ? this.productionSteps.filter(x => x.lookUpId == event.productionStepId)[0].lookUpName : ""
          this.createProjectForm.patchValue({
            isTechTransfer: event.isTechTransfer,
            campaignPhase: event.campaignPhaseId,
            campaignType: event.campaignTypeId,
            productionSteps: event.productionStepId
          })
        })
      }
      else{
        this.campaingPhaseName = event.campaignPhaseId != "" && event.campaignPhaseId != undefined ? this.campaignPhase.filter(x => x.lookUpId == event.campaignPhaseId)[0].lookUpName : ""
        this.campaingTypeName = event.campaignTypeId != "" && event.campaignTypeId != undefined ? this.campaignType.filter(x => x.lookUpId == event.campaignTypeId)[0].lookUpName : ""
        this.productionStepName = event.productionStepId != "" && event.productionStepId != undefined ? this.productionSteps.filter(x => x.lookUpId == event.productionStepId)[0].lookUpName : ""
        this.createProjectForm.patchValue({
          isTechTransfer: event.isTechTransfer,
          campaignPhase: event.campaignPhaseId,
          campaignType: event.campaignTypeId,
          productionSteps: event.productionStepId
        })
      }
    }
    else if (index == 5) {
      this.createProjectForm.patchValue({
        primaryKPI: event.primaryKPI,
        isAgile: event.isAgile,
        agilePrimaryWorkstream: event.agilePrimaryWorkstream,
        agileSecondaryWorkstream: event.agileSecondaryWorkstream,
        agileWave: event.agileWave,
        isPobos: event.isPobos,
        pobosCategory: event.pobosCategory,
        isSiteAssessment: event.isSiteAssessment,
        siteAssessmentCategory: event.siteAssessmentCategory,
        isGmsgqltannualMustWin: event.isGmsgqltannualMustWin,
        strategicYear: event.strategicYear,
        annualMustWinID: event.annualMustWinID,
      })
    }
  }


  RouteBack() {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Are you Sure?",
      "message": "Are you sure you want to exit?",
      "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
      },
      "actions": {
        "confirm": {
          "show": true,
          "label": "Yes",
          "color": "warn"
        },
        "cancel": {
          "show": true,
          "label": "Cancel"
        }
      },
      "dismissible": true
    }
    const createProjectAlert = this.fuseAlert.open(comfirmConfig)
    createProjectAlert.afterClosed().subscribe(close => {
      if (close == 'confirmed') {
      this.router.navigate([`./portfolio-center`]);
      }
    })
  }

  addItem(newItem: FormGroup) {
    this.createProjectForm = newItem;
  }

  callCreateProject() {
    this.router.navigate([`./portfolio-center`]);
  }

  createProject() {
    console.log(this.qualityForm);
    var hubSettings = [{
      hubSettingId: "",
      projectId: "",
      lookUpId: "",
      hubValue: false
    }];
    var projectIDTemplate = "";
    var copyProjectParameter = "";
    var LocalCurrencyID = ""
    var mainObjCreate = []
    if(this.SIP){
      mainObjCreate = [{
        problemUniqueId:null,
        problemTitle:null,
        problemType:null,
        portfolioOwnerId:null,
        defaultOwningOrganizationId:null,
        problemOwnerId:null,
        problemOwnerName:null,
        parentProgramId:null,
        primaryProductId:null,
        projectDescription:null,
        executionScope:null,
        otherImpactedProducts:null,
        isAgile:false,
        agilePrimaryWorkstream:null,
        agileSecondaryWorkstream:null,
        agileWave:null,
        isCapsProject:false,
        primaryValueDriver:null,
        financialRealizationStartDate: null,
        strategicInitiativeOwner: null
        }];
    }
    else{
      mainObjCreate = [{
        ProblemUniqueID:null,
        ProblemTitle:null,
        ProblemType:null,
        PortfolioOwnerID:null,
        DefaultOwningOrganizationID:null,
        CreatedByID:null,
        ProblemOwnerID:null,
        ProblemOwnerName:null,
        ParentProgramID:null,
        PrimaryProductID:null,
        ProjectDescription:null,
        ExecutionScope:null,
        OtherImpactedProducts:null,
        IsTechTransfer:false,
        CampaignTypeID:null,
        CampaignPhaseID:null,
        ProductionStepID:null,
        TargetEndState:null,
        IsConfidential:false,
        IsOEProject:false,
        OEProjectType:null,
        IsAgile:false,
        AgilePrimaryWorkstream:null,
        AgileSecondaryWorkstream:null,
        agileWave:null,
        IsCapsProject:false,
        EmissionPortfolioID:null,
        IsPOBOS:false,
        IsSiteAssessment:false,
        POBOSCategory:null,
        SiteAssessmentCategory:null,
        PrimaryKPI:null,
        IsGMSGQLTAnnualMustWin:false,
        StrategicYearID:null,
        AnnualMustWinID:null
      }];
    }
    var formValue = this.createProjectForm.getRawValue()
    if(this.SIP){
      mainObjCreate[0].problemUniqueId = ""
      mainObjCreate[0].problemTitle = formValue.problemTitle
      mainObjCreate[0].problemType = formValue.problemType
      mainObjCreate[0].portfolioOwnerId = Object.keys(formValue.portfolioOwner).length > 0 ? formValue.portfolioOwner.portfolioOwnerId : ''
      mainObjCreate[0].executionScope = formValue.excecutionScope.length > 0 ? formValue.excecutionScope.map(x => x.portfolioOwnerId).join() : ''
      mainObjCreate[0].problemOwnerId = formValue.SubmittedBy != "" ? formValue.SubmittedBy.userAdid : ''
      mainObjCreate[0].problemOwnerName = formValue.SubmittedBy != "" ? formValue.SubmittedBy.userDisplayName : ''
      mainObjCreate[0].primaryProductId = Object.keys(formValue.primaryProduct).length > 0 ? formValue.primaryProduct.productId : ''
      mainObjCreate[0].otherImpactedProducts = formValue.otherImpactedProducts.length > 0 ? formValue.otherImpactedProducts.map(x => x.productId).join() : ''
      mainObjCreate[0].parentProgramId = formValue.projectsingleid
      mainObjCreate[0].projectDescription = formValue.projectDescription
      mainObjCreate[0].defaultOwningOrganizationId = formValue.owningOrganization
      mainObjCreate[0].primaryValueDriver = formValue.primaryKPI != "" && formValue.primaryKPI != null && formValue.primaryKPI != undefined ? formValue.primaryKPI.kpiid : ''
      mainObjCreate[0].isAgile = formValue.isAgile == "" ? false : formValue.isAgile
      if (mainObjCreate[0].isAgile) {
          mainObjCreate[0].agilePrimaryWorkstream = formValue.agilePrimaryWorkstream != "" && formValue.agilePrimaryWorkstream != undefined && formValue.agilePrimaryWorkstream != null? formValue.agilePrimaryWorkstream.lookUpId : ''
          mainObjCreate[0].agileSecondaryWorkstream = formValue.agileSecondaryWorkstream.length > 0 ? formValue.agileSecondaryWorkstream.map(x => x.lookUpId).join() : ''
          mainObjCreate[0].agileWave = formValue.agileWave != "" && formValue.agileWave != undefined && formValue.agileWave != null ? formValue.agileWave.lookUpId : ''
      }
      mainObjCreate[0].isCapsProject = false
      mainObjCreate[0].strategicInitiativeOwner = formValue.sponsor != "" ? formValue.sponsor.userAdid : ''
      mainObjCreate[0].financialRealizationStartDate = formValue.valueCaptureStart ? moment(formValue.valueCaptureStart).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : formValue.valueCaptureStart
    }
    else{
        LocalCurrencyID = Object.keys(formValue.localCurrency).length > 0 ? this.localCurrency.filter(x => x.localCurrencyAbbreviation == formValue.localCurrency)[0].localCurrencyId : ''
        mainObjCreate[0].ProblemUniqueID = ""
        mainObjCreate[0].ProblemTitle = formValue.problemTitle
        mainObjCreate[0].PortfolioOwnerID = Object.keys(formValue.portfolioOwner).length > 0 ? formValue.portfolioOwner.portfolioOwnerId : ''
        mainObjCreate[0].ExecutionScope = formValue.excecutionScope.length > 0 ? formValue.excecutionScope.map(x => x.portfolioOwnerId).join() : ''
        mainObjCreate[0].ProblemOwnerID = formValue.SubmittedBy != "" ? formValue.SubmittedBy.userAdid : ''
        mainObjCreate[0].CreatedByID = formValue.SubmittedBy != "" ? formValue.SubmittedBy.userAdid : ''
        mainObjCreate[0].ProblemOwnerName = formValue.SubmittedBy != "" ? formValue.SubmittedBy.userDisplayName : ''
        mainObjCreate[0].PrimaryProductID = Object.keys(formValue.primaryProduct).length > 0 ? formValue.primaryProduct.productId : ''
        mainObjCreate[0].OtherImpactedProducts = formValue.otherImpactedProducts.length > 0 ? formValue.otherImpactedProducts.map(x => x.productId).join() : ''
        mainObjCreate[0].ParentProgramID = formValue.projectsingleid
        mainObjCreate[0].ProjectDescription = formValue.projectDescription
        mainObjCreate[0].TargetEndState = formValue.targetGoalSituation
        mainObjCreate[0].ProblemType = formValue.problemType
        mainObjCreate[0].IsConfidential =  formValue.isConfidential == "" || formValue.isConfidential == "No" ? false : true
        mainObjCreate[0].DefaultOwningOrganizationID = formValue.owningOrganization
      mainObjCreate[0].IsOEProject = formValue.isOeproject == "" ? false : formValue.isOeproject
        if (mainObjCreate[0].IsOEProject) {
          mainObjCreate[0].OEProjectType = formValue.oeProjectType.length > 0 ? formValue.oeProjectType.map(x => x.lookUpId).join() : ''
      }
      mainObjCreate[0].IsTechTransfer = formValue.isTechTransfer == "" ? false : formValue.isTechTransfer
        if (mainObjCreate[0].IsTechTransfer) {
          mainObjCreate[0].CampaignPhaseID = this.campaingPhaseName != "" && this.campaingPhaseName != undefined && this.campaingPhaseName != null ? this.campaignPhase.filter(x => x.lookUpName == this.campaingPhaseName)[0].lookUpId : ""
          mainObjCreate[0].CampaignTypeID = this.campaingTypeName != "" && this.campaingTypeName != undefined && this.campaingTypeName != null ? this.campaignType.filter(x => x.lookUpName == this.campaingTypeName)[0].lookUpId : ""
          mainObjCreate[0].ProductionStepID = this.productionStepName != "" && this.productionStepName != undefined && this.productionStepName != null ? this.productionSteps.filter(x => x.lookUpName == this.productionStepName)[0].lookUpId : ""
        }
      mainObjCreate[0].IsAgile = formValue.isAgile == "" ? false : formValue.isAgile
        if (mainObjCreate[0].IsAgile) {
          mainObjCreate[0].AgilePrimaryWorkstream = formValue.agilePrimaryWorkstream != "" && formValue.agilePrimaryWorkstream != undefined && formValue.agilePrimaryWorkstream != null? formValue.agilePrimaryWorkstream.lookUpId : ''
          mainObjCreate[0].AgileSecondaryWorkstream = formValue.agileSecondaryWorkstream.length > 0 ? formValue.agileSecondaryWorkstream.map(x => x.lookUpId).join() : ''
          mainObjCreate[0].agileWave = formValue.agileWave != "" && formValue.agileWave != undefined && formValue.agileWave != null ? formValue.agileWave.lookUpId : ''
      }
        mainObjCreate[0].IsCapsProject = formValue.isCapsProject == "" || formValue.isCapsProject == "No" ? false : true
        mainObjCreate[0].EmissionPortfolioID = Object.keys(formValue.enviornmentalPortfolio).length > 0 ? formValue.enviornmentalPortfolio.portfolioOwnerId : ''
      mainObjCreate[0].PrimaryKPI = formValue.primaryKPI != "" && formValue.primaryKPI != null && formValue.primaryKPI != undefined ? formValue.primaryKPI.kpiid : ''
        mainObjCreate[0].IsPOBOS = formValue.isPobos == "" ? false : formValue.isPobos
        if (mainObjCreate[0].IsPOBOS) {
          mainObjCreate[0].POBOSCategory = formValue.pobosCategory.length > 0 ? formValue.pobosCategory.map(x => x.lookUpId).join() : ''
      }
      mainObjCreate[0].IsSiteAssessment = formValue.isSiteAssessment == "" ? false : formValue.isSiteAssessment
        if (mainObjCreate[0].IsSiteAssessment) {
          mainObjCreate[0].SiteAssessmentCategory = formValue.siteAssessmentCategory.length > 0 ? formValue.siteAssessmentCategory.map(x => x.lookUpId).join() : ''
      }
      mainObjCreate[0].IsGMSGQLTAnnualMustWin = formValue.isGmsgqltannualMustWin == "" ? false : formValue.isGmsgqltannualMustWin
        if (mainObjCreate[0].IsGMSGQLTAnnualMustWin) {
          mainObjCreate[0].StrategicYearID = formValue.strategicYear != "" && formValue.strategicYear != undefined && formValue.strategicYear != null ? formValue.strategicYear.lookUpId : ''
          mainObjCreate[0].AnnualMustWinID = formValue.annualMustWinID != "" && formValue.annualMustWinID != undefined && formValue.annualMustWinID != null ? formValue.annualMustWinID.lookUpId : ''
        }
    }
    
    if(!this.SIP){
      var dataToSend = {}
        if (history.state.callLocation == "CopyProject"){
        dataToSend = {
          "projectCaptures": mainObjCreate,
          "hubSettings": hubSettings,
          "projectIDTemplate": history.state.copytemplateId,
          "copyProjectParameter": history.state.lookupString,
          "LocalCurrencyID": LocalCurrencyID,
          "copyProjectParameters": history.state.copyParameterObject
        }
      }
      else{
        dataToSend = {
          "projectCaptures": mainObjCreate,
          "hubSettings": hubSettings,
          "projectIDTemplate": projectIDTemplate,
          "copyProjectParameter": copyProjectParameter,
          "LocalCurrencyID": LocalCurrencyID,
          "copyProjectParameters": null
        }
      }
      
        if (formValue.qualityReference){
          this.qualityValue = true;
        }
        this.createApiService.createProject(dataToSend).then((res: any) => {
          this.projectid = res.problemUniqueId
          if (this.qualityValue == true) {
            this.qualityformValue = []
            var genQRFORM = this.qualityForm
            if (history.state.callLocation == "CopyProject"){
            for (var quality of this.qualityForm) {
              if (Object.keys(quality.qualityReferenceTypeId).length > 0 && quality.qualityReference1 != "") {
                this.qualityformValue.push({
                  qualityUniqueId: "",
                  problemUniqueId: res.problemUniqueId,
                  qualityReferenceTypeId: quality.qualityReferenceTypeId.length == undefined ? quality.qualityReferenceTypeId.lookUpId : quality.qualityReferenceTypeId,
                  qualityReference1: quality.qualityReference1
                })
              }
            }
          }
          else{
            for (var quality of this.qualityForm) {
              if (Object.keys(quality.qualityReferenceTypeId).length > 0 && quality.qualityReference1 != "") {
                  this.qualityformValue.push({
                    qualityUniqueId: quality.qualityUniqueId,
                    problemUniqueId: res.problemUniqueId,
                    qualityReferenceTypeId: Object.keys(quality.qualityReferenceTypeId).length > 0 ? quality.qualityReferenceTypeId.lookUpId : '',
                    qualityReference1: quality.qualityReference1
                  })
              }
            }
          }
            this.apiService2.bulkeditQualityReference(this.qualityformValue, res.problemUniqueId).then(quality => {
              console.log(quality);
              this.createApiService.updatePortfolioCenterData(res.problemUniqueId).then(response => {
                if (this.localAttribute != undefined) {
                  this.localAttribute.submitLA(res.problemUniqueId)
                }
                this.viewContent = true
              })
          })
            
        }
        else{
            this.createApiService.updatePortfolioCenterData(res.problemUniqueId).then(response => {
              if (this.localAttribute != undefined){
                this.localAttribute.submitLA(res.problemUniqueId)
              }
              this.viewContent = true
            })
        }
      })
    }
    else{
      this.createApiService.createProjectStrategic(mainObjCreate[0]).then((res: any) => {
        this.createApiService.updatePortfolioCenterData(res.problemUniqueId).then(response => {
          this.projectid = res.problemUniqueId
          if (this.localAttribute != undefined){
            this.localAttribute.submitLA(res.problemUniqueId)
          }
          this.viewContent = true
        })
      })
    }
  }

  RoutetoBoard(){
    this.router.navigate([`./portfolio-center`]);
    window.open('/project-hub/' + this.projectid + '/project-board', "_blank")
  }

  RoutetoCharter() {
    this.router.navigate([`./portfolio-center`]);
    window.open('/project-hub/' + this.projectid + '/project-charter/general-info', "_blank")
  }

  RoutetoBC() {
    this.router.navigate([`./portfolio-center`]);
    window.open('/project-hub/' + this.projectid + '/business-case/general-info', "_blank")
  }

  RoutetoProposal() {
    this.router.navigate([`./portfolio-center`]);
    window.open('/project-hub/' + this.projectid + '/project-proposal/general-info', "_blank")
  }

  RouteCreateProject() {
    this.router.navigate([`./portfolio-center`]);
    window.location.reload()
  }
  
  CheckMandatory(index: number){
    this.stepper.selectedIndex = index;
    if(this.SIP){
      if (this.createProjectForm.value.problemTitle == "" || this.createProjectForm.value.owningOrganization == "" || this.createProjectForm.value.owningOrganization == null || Object.keys(this.createProjectForm.value.portfolioOwner).length == 0 || Object.keys(this.createProjectForm.value.SubmittedBy).length == 0 || this.createProjectForm.value.localCurrency == "" || Object.keys(this.createProjectForm.value.primaryProduct).length == 0 || this.createProjectForm.value.projectDescription == "" || this.createProjectForm.value.excecutionScope.length == 0 || this.createProjectForm.value.sponsor == null || Object.keys(this.createProjectForm.value.sponsor).length == 0 || this.createProjectForm.value.valueCaptureStart == "" || this.createProjectForm.value.valueCaptureStart == null) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "You must complete all mandatory fields.",
          "message": "",
          "icon": {
            "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "warning"
          },
          "actions": {
            "confirm": {
              "show": true,
              "label": "Okay",
              "color": "primary"
            },
            "cancel": {
              "show": false,
              "label": "Cancel"
            }
          },
          "dismissible": true
        }
        const alert = this.fuseAlert.open(comfirmConfig)
        this.stepper.selectedIndex = index-1;
      }
      else {
        this.showLocalAttributes = false
        this.portfolioOwners = ""
        this.executionScope = ""
        this.portfolioOwners += this.createProjectForm.controls.portfolioOwner.value.portfolioOwnerId
        for (var z = 0; z < this.createProjectForm.controls.excecutionScope.value.length; z++) {
          this.executionScope += this.createProjectForm.controls.excecutionScope.value[z].portfolioOwnerId + ','
        }
        this.showLocalAttributes = true
        this.stepper.selectedIndex = index;
      }
    }
    else{
    if (this.createProjectForm.value.problemTitle == "" || this.createProjectForm.value.owningOrganization == "" || this.createProjectForm.value.owningOrganization == null || Object.keys(this.createProjectForm.value.portfolioOwner).length == 0 || Object.keys(this.createProjectForm.value.SubmittedBy).length == 0 || this.createProjectForm.value.localCurrency == "" || Object.keys(this.createProjectForm.value.primaryProduct).length == 0 || this.createProjectForm.value.projectDescription == "" || this.createProjectForm.value.excecutionScope.length == 0) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "You must complete all mandatory fields.",
        "message": "",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warning"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Okay",
            "color": "primary"
          },
          "cancel": {
            "show": false,
            "label": "Cancel"
          }
        },
        "dismissible": true
      }
      const alert = this.fuseAlert.open(comfirmConfig)
      this.stepper.selectedIndex = index-1;
    }
    else {
      this.showLocalAttributes = false
      this.portfolioOwners = ""
      this.executionScope = ""
      this.portfolioOwners += this.createProjectForm.controls.portfolioOwner.value.portfolioOwnerId
      for (var z = 0; z < this.createProjectForm.controls.excecutionScope.value.length; z++) {
        this.executionScope += this.createProjectForm.controls.excecutionScope.value[z].portfolioOwnerId + ','
      }
      this.showLocalAttributes = true
      this.stepper.selectedIndex = index;
    }
  }
    
  }

  captureValueLA(index, event){
    this.LAData = event.data
    this.showLocalAttributes = event.show
    this.showLocalAttributesTitle = event.show
  }
  getLookUpName(id: any): any {
    if (typeof (id) == 'string'){
      return id != '' ? this.qualityType.find(x => x.lookUpId == id).lookUpName : ''
    }
    else if (Object.keys(id).length > 0) {
      return id && id.lookUpId != '' ? this.qualityType.find(x => x.lookUpId == id.lookUpId).lookUpName : ''
    }
  }

  selectionChange(index){
    console.log(index)
    if (index._selectedIndex == 1 || index._selectedIndex == 2){
      if(this.SIP){
        if (this.createProjectForm.value.problemTitle == "" || this.createProjectForm.value.owningOrganization == "" || this.createProjectForm.value.owningOrganization == null || Object.keys(this.createProjectForm.value.portfolioOwner).length == 0 || Object.keys(this.createProjectForm.value.SubmittedBy).length == 0 || Object.keys(this.createProjectForm.value.primaryProduct).length == 0 || this.createProjectForm.value.projectDescription == "" || this.createProjectForm.value.excecutionScope.length == 0 || this.createProjectForm.value.sponsor == null || Object.keys(this.createProjectForm.value.sponsor).length == 0 || this.createProjectForm.value.valueCaptureStart == "" || this.createProjectForm.value.valueCaptureStart == null) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "You must complete all mandatory fields.",
            "message": "",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warning"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Okay",
                "color": "primary"
              },
              "cancel": {
                "show": false,
                "label": "Cancel"
              }
            },
            "dismissible": true
          }
          const alert = this.fuseAlert.open(comfirmConfig)
          this.stepper.selectedIndex = "0"
        }
        else {
          this.showLocalAttributes = false
          this.portfolioOwners = ""
          this.executionScope = ""
          this.portfolioOwners += this.createProjectForm.controls.portfolioOwner.value.portfolioOwnerId
          for (var z = 0; z < this.createProjectForm.controls.excecutionScope.value.length; z++) {
            this.executionScope += this.createProjectForm.controls.excecutionScope.value[z].portfolioOwnerId + ','
          }
          this.showLocalAttributes = true
          this.stepper.selectedIndex = index._selectedIndex;
        }
      }
      else{
        if (this.createProjectForm.value.problemTitle == "" || this.createProjectForm.value.owningOrganization == "" || this.createProjectForm.value.owningOrganization == null || Object.keys(this.createProjectForm.value.portfolioOwner).length == 0 || Object.keys(this.createProjectForm.value.SubmittedBy).length == 0 || this.createProjectForm.value.localCurrency == "" || Object.keys(this.createProjectForm.value.primaryProduct).length == 0 || this.createProjectForm.value.projectDescription == "" || this.createProjectForm.value.excecutionScope.length == 0) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "You must complete all mandatory fields.",
          "message": "",
          "icon": {
            "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "warning"
          },
          "actions": {
            "confirm": {
              "show": true,
              "label": "Okay",
              "color": "primary"
            },
            "cancel": {
              "show": false,
              "label": "Cancel"
            }
          },
          "dismissible": true
        }
        const alert = this.fuseAlert.open(comfirmConfig)
        this.stepper.selectedIndex = "0"
      }
      else {
        this.showLocalAttributes = false
        this.portfolioOwners = ""
        this.executionScope = ""
        this.portfolioOwners += this.createProjectForm.controls.portfolioOwner.value.portfolioOwnerId
        for (var z = 0; z < this.createProjectForm.controls.excecutionScope.value.length; z++) {
          this.executionScope += this.createProjectForm.controls.excecutionScope.value[z].portfolioOwnerId + ','
        }
        this.showLocalAttributes = true
        this.stepper.selectedIndex = index._selectedIndex;
      }
    }
      
    }
  }


  checkPermission() {
    if (this.role.roleMaster.securityGroupId != "C9F323D4-EF97-4C2A-B748-11DB5B8589D0") {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Only Portfolio Manager security level users can create a Strategic Initiative record. Once created, users with edit permissions can manage/edit the record!",
        "message": "",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warning"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Okay",
            "color": "primary"
          },
          "cancel": {
            "show": false,
            "label": "Cancel"
          }
        },
        "dismissible": false
      }
      const alert = this.fuseAlert.open(comfirmConfig)
      alert.afterClosed().subscribe(close => {
        if (close == 'confirmed') {
          this.router.navigate([`./portfolio-center`]);
        }
      })
    }
  }

}
