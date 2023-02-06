import { Component, OnInit, EventEmitter, Output, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { PortfolioApiService } from './../../portfolio-center/portfolio-api.service';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from './../../../core/auth/auth.service';
import { Title } from '@angular/platform-browser';
import $ from "jquery";
import { FormGroup, FormControl, FormArray} from '@angular/forms';
import { EventType } from '@azure/msal-browser';
import * as uuid from "uuid";
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { QualityRefBulkEditComponent } from 'app/modules/project-hub/general-info/quality-ref-bulk-edit/quality-ref-bulk-edit.component';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { __classPrivateFieldSet } from 'tslib';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CreateProjectComponent implements OnInit {
  filterCriteria: any = {};
  getData: boolean = false;
  lookupdata: any = [];
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
  createProjectForm = new FormGroup({
    problemTitle: new FormControl(''),
    projectsingle: new FormControl(''),
    projectsingleid: new FormControl(''),
    problemType: new FormControl('Standard Project / Program'),
    projectDescription: new FormControl(''),
    primaryProduct: new FormControl({}),
    otherImpactedProducts: new FormControl([]),
    portfolioOwner: new FormControl({}),
    excecutionScope: new FormControl([]),
    enviornmentalPortfolio: new FormControl({}),
    isCapsProject: new FormControl(false),
    owningOrganization: new FormControl(''),
    SubmittedBy: new FormControl(''),
    targetGoalSituation: new FormControl(''),
    oeProject: new FormControl(''),
    qualityReference: new FormControl(''),
    techTransfer: new FormControl(''),
    primaryKPI: new FormControl(''),
    AgileProject: new FormControl(''),
    siteAssignment: new FormControl(''),
    POBOS: new FormControl(''),
    oeProjectType: new FormControl(''),
    campaignPhase: new FormControl(''),
    productionSteps: new FormControl(''),
    campaignType: new FormControl(''),
    agilePrimaryWorkstream: new FormControl(''),
    agileSecondaryWorkstream: new FormControl(''),
    agileWave: new FormControl(''),
    POBOSType: new FormControl(''),
    siteAssessmentType: new FormControl(''),
    quality: new FormControl(new FormArray([])),
    StrategicDeployment: new FormControl(''),
    StrategicYear: new FormControl(''),
    AnnualMustWin: new FormControl(''),
    localCurrency: new FormControl('')
  })

  capturedValues = ['', '']
  // fuseAlert: any;

  constructor(private apiService: PortfolioApiService, private router: Router, private titleService: Title, private authService: MsalService, private apiService2: ProjectApiService, public auth: AuthService, private apiProjectService: ProjectApiService, public fuseAlert: FuseConfirmationService) {
  }

  
  ngOnInit(): void {
    this.auth.lookupMaster().then(res => {
      this.apiService.getLocalCurrency().then(currency => {
        this.localCurrency = currency
      this.lookupdata = res;
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
    else if (index == 0){
      this.createProjectForm.patchValue({
        problemTitle: event.problemTitle,
        problemType: event.problemType,
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
        targetGoalSituation: event.targetGoalSituation
      })
    }
    else if (index == 1) {
      this.createProjectForm.patchValue({
        enviornmentalPortfolio: event.enviornmentalPortfolio,
        isCapsProject: event.isCapsProject
      })
    }
    else if (index == 2) {
      this.createProjectForm.patchValue({
        oeProject: event.isOeproject,
        oeProjectType: event.oeprojectType
      })
    }
    else if (index == 3) {
      this.campaingPhaseName = this.campaignPhase.filter(x => x.lookUpId == event.campaignPhaseId)[0].lookUpName
      this.campaingTypeName = this.campaignType.filter(x => x.lookUpId == event.campaignTypeId)[0].lookUpName
      this.productionStepName = this.productionSteps.filter(x => x.lookUpId == event.productionStepId)[0].lookUpName
      this.createProjectForm.patchValue({
        techTransfer: event.isTechTransfer,
        campaignPhase: event.campaignPhaseId,
        campaignType: event.campaignTypeId,
        productionSteps: event.productionStepId
      })
    }
    else if (index == 5) {
      this.createProjectForm.patchValue({
        primaryKPI: event.primaryKPI,
        AgileProject: event.isAgile,
        agilePrimaryWorkstream: event.agilePrimaryWorkstream,
        agileSecondaryWorkstream: event.agileSecondaryWorkstream,
        agileWave: event.agileWave,
        POBOS: event.isPobos,
        POBOSType: event.pobosCategory,
        siteAssignment: event.isSiteAssessment,
        siteAssessmentType: event.siteAssessmentCategory,
        StrategicDeployment: event.isGmsgqltannualMustWin,
        StrategicYear: event.strategicYear,
        AnnualMustWin: event.annualMustWinID,
      })
    }
  }


  RouteBack() {
    this.router.navigate([`./portfolio-center`]);
  }

  addItem(newItem: FormGroup) {
    this.createProjectForm = newItem;
  }

  callCreateProject() {
    this.router.navigate([`./portfolio-center`]);
  }

  createProject() {
    // if (history.state.data != undefined){
    //   var mainObj = {
    //   agilePrimaryWorkstream:null,
    //   agileSecondaryWorkstream:null,
    //   agileWave:null,
    //   annualMustWinId:null,
    //   approvedDate:null,
    //   archiveredBy:null,
    //   archiveredOn:null,
    //   benefitsRealizedOutcome:null,
    //   calculatedEmissionsImpact:null,
    //   campaignPhaseId:null,
    //   campaignTypeId:null,
    //   closeOutApprovedDate:null,
    //   createdById:"",
    //   createdDate:"2023-02-3T13:16:13.5",
    //   dataMigrationInfo:null,
    //   defaultOwningOrganizationId:"",
    //   emissionPortfolioId:"",
    //   emissionsImpactRealizationDate:null,
    //   energyCostImpactPerYear:null,
    //   energyCostImpactPerYearFxconv:null,
    //   energyImpact:null,
    //   executionScope:"",
    //   functionGroupID:"",
    //   isArchived:null,
    //   isCapsProject:false,
    //   isConfidential:false,
    //   isGmsgqltannualMustWin:null,
    //   isGoodPractise:null,
    //   isManualArchive:null,
    //   isOeproject:false,
    //   isPobos:null,
    //   isSiteAssessment:null,
    //   isTechTransfer:false,
    //   keyTakeaways:null,
    //   legacyPpmprojectId:null,
    //   legacyPpmsystem:null,
    //   noCarbonImpact:null,
    //   oeprojectType:null,
    //   otherImpactedProducts:"",
    //   parentProgramId:"",
    //   poboscategory:null,
    //   portfolioOwnerId:"",
    //   primaryKpi:null,
    //   primaryProductId:"",
    //   problemId: history.state.data.problemId,
    //   problemOwnerId:"",
    //   problemOwnerName:"",
    //   problemTitle:"",
    //   problemType:"",
    //   problemUniqueId:"",
    //   productionStepId:null,
    //   projectClassificationId:null,
    //   projectDescription:"",
    //   projectManagerId:"",
    //   projectProposalApprovedDate:null,
    //   projectReviewedYN:"",
    //   projectSiteUrl:null,
    //   proposalStatement:null,
    //   siteAssessmentCategory:null,
    //   sponsorId:"",
    //   strategicRationale:null,
    //   strategicYearId:null,
    //   svpelementTypeId:null,
    //   targetEndState:"",
    //   wasteImpactCost:null,
    //   wasteImpactUnits:null,
    //   wasteLandfillImpactUnits:null,
    //   waterImpactCost:null,
    //   waterImpactUnits:null,
    //   whynotgoforNextBestAlternative:null
    //   }
    //   var formValue = this.createProjectForm.getRawValue()
    //   mainObj.problemUniqueId = history.state.data.problemUniqueId
    //   mainObj.problemTitle = formValue.problemTitle
    //   mainObj.portfolioOwnerId = Object.keys(formValue.portfolioOwner).length > 0 ? formValue.portfolioOwner.portfolioOwnerId : ''
    //   mainObj.executionScope = formValue.excecutionScope.length > 0 ? formValue.excecutionScope.map(x => x.portfolioOwnerId).join() : ''
    //   mainObj.problemOwnerId = formValue.SubmittedBy != "" ? formValue.SubmittedBy.userAdid : ''
    //   mainObj.createdById = formValue.SubmittedBy != "" ? formValue.SubmittedBy.userAdid : ''
    //   mainObj.problemOwnerName = formValue.SubmittedBy != "" ? formValue.SubmittedBy.userDisplayName : ''
    //   mainObj.primaryProductId = Object.keys(formValue.primaryProduct).length > 0 ? formValue.primaryProduct.productId : ''
    //   mainObj.otherImpactedProducts = formValue.otherImpactedProducts.length > 0 ? formValue.otherImpactedProducts.map(x => x.productId).join() : ''
    //   mainObj.parentProgramId = formValue.projectsingleid
    //   mainObj.projectDescription = formValue.projectDescription
    //   mainObj.targetEndState = formValue.targetGoalSituation
    //   mainObj.problemType = formValue.problemType
    //   mainObj.defaultOwningOrganizationId = formValue.owningOrganization
    //   // mainObj[0].LocalCurrencyID = Object.keys(formValue.localCurrency).length > 0 ? this.localCurrency.filter(x => x.localCurrencyAbbreviation == formValue.localCurrency)[0].localCurrencyId : ''
    //   mainObj.isOeproject = formValue.oeProject == "" ? false : formValue.oeProject
    //   if (mainObj.isOeproject) {
    //     mainObj.oeprojectType = formValue.oeProjectType.length > 0 ? formValue.oeProjectType.map(x => x.lookUpId).join() : ''
    //   }
    //   mainObj.isTechTransfer = formValue.techTransfer == "" ? false : formValue.techTransfer
    //   if (mainObj.isTechTransfer) {
    //     mainObj.campaignPhaseId = formValue.campaignPhase != "" ? formValue.campaignPhase : ''
    //     mainObj.productionStepId = formValue.productionSteps != "" ? formValue.productionSteps : ''
    //     mainObj.campaignTypeId = formValue.campaignType != "" ? formValue.campaignType : ''
    //   }
    //   if (formValue.AgileProject) {
    //     mainObj.agilePrimaryWorkstream = formValue.agilePrimaryWorkstream != "" ? formValue.agilePrimaryWorkstream.lookUpId : ''
    //     mainObj.agileSecondaryWorkstream = formValue.agileSecondaryWorkstream.length > 0 ? formValue.agileSecondaryWorkstream.map(x => x.lookUpId).join() : ''
    //     mainObj.agileWave = formValue.agileWave != "" ? formValue.agileWave.lookUpId : ''
    //   }
    //   mainObj.isCapsProject = formValue.isCapsProject == "" || formValue.isCapsProject == "No" ? false : true
    //   mainObj.emissionPortfolioId = Object.keys(formValue.enviornmentalPortfolio).length > 0 ? formValue.enviornmentalPortfolio.portfolioOwnerId : ''
    //   mainObj.primaryKpi = formValue.primaryKPI != "" ? formValue.primaryKPI.kpiid : ''
    //   mainObj.isPobos = formValue.POBOS == "" ? false : formValue.POBOS
    //   if (mainObj.isPobos) {
    //     mainObj.poboscategory = formValue.POBOSType.length > 0 ? formValue.POBOSType.map(x => x.lookUpId).join() : ''
    //   }
    //   mainObj.isSiteAssessment = formValue.siteAssignment == "" ? false : formValue.siteAssignment
    //   if (mainObj.isSiteAssessment) {
    //     mainObj.siteAssessmentCategory = formValue.siteAssessmentType.length > 0 ? formValue.siteAssessmentType.map(x => x.lookUpId).join() : ''
    //   }
    //   mainObj.isGmsgqltannualMustWin = formValue.StrategicDeployment == "" ? false : formValue.StrategicDeployment
    //   if (mainObj.isGmsgqltannualMustWin) {
    //     mainObj.strategicYearId = formValue.StrategicYear != "" ? formValue.StrategicYear.lookUpId : ''
    //     mainObj.annualMustWinId = formValue.AnnualMustWin != "" ? formValue.AnnualMustWin.lookUpId : ''
    //   }
    //   if (mainObj.problemTitle == "" || mainObj.portfolioOwnerId == "" || mainObj.problemOwnerId == "" || mainObj.primaryProductId == "" || mainObj.problemOwnerId == "" || mainObj.executionScope == "") {
    //     var comfirmConfig: FuseConfirmationConfig = {
    //       "title": "You must complete all mandatory fields.",
    //       "message": "",
    //       "icon": {
    //         "show": true,
    //         "name": "heroicons_outline:exclamation",
    //         "color": "warning"
    //       },
    //       "actions": {
    //         "confirm": {
    //           "show": true,
    //           "label": "Okay",
    //           "color": "primary"
    //         },
    //         "cancel": {
    //           "show": false,
    //           "label": "Cancel"
    //         }
    //       },
    //       "dismissible": true
    //     }
    //     const alert = this.fuseAlert.open(comfirmConfig)
    //   }
    //   if (formValue.qualityReference) {
    //     this.qualityValue = true;
    //   }
    //   this.apiService2.editGeneralInfo(history.state.data.problemUniqueId, mainObj).then(res => {
    //   // this.apiService.copyProject(mainObj[0], history.state.data.problemUniqueId).then((res: any) => {
    //     if (this.qualityValue == true) {
    //       this.qualityformValue = []
    //       var genQRFORM = this.qualityForm
    //       for (var quality of this.qualityForm) {
    //         if (Object.keys(quality.qualityReferenceTypeId).length > 0 && quality.qualityReference1 != "") {
    //           this.qualityformValue.push({
    //             qualityUniqueId: "",
    //             problemUniqueId: history.state.data.problemUniqueId,
    //             qualityReferenceTypeId: quality.qualityReferenceTypeId != "" ? quality.qualityReferenceTypeId : '',
    //             qualityReference1: quality.qualityReference1
    //           })
    //         }
    //       }
    //       this.apiService2.bulkeditQualityReference(this.qualityformValue, history.state.data.problemUniqueId).then(quality => {
    //         console.log(quality);
    //         if (res != "") {
    //           this.createProjectForm.reset();
    //           window.open('/project-hub/' + history.state.data.problemUniqueId + '/project-board', "_blank")
    //         }
    //       })
    //     }
    //     else {
    //       window.open('/project-hub/' + history.state.data.problemUniqueId + '/project-board', "_blank")
    //     }
    //   })
    // }
    // else{
    debugger;
    console.log(this.qualityForm);
    var hubSettings = [{
      hubSettingId: "",
      projectId: "",
      lookUpId: "",
      hubValue: false
    }];
    var projectIDTemplate = "";
    var copyProjectParameter = "";
    var mainObjCreate = [{
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
      LocalCurrencyID:null,
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
    var formValue = this.createProjectForm.getRawValue()
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
      mainObjCreate[0].DefaultOwningOrganizationID = formValue.owningOrganization
      mainObjCreate[0].LocalCurrencyID = Object.keys(formValue.localCurrency).length > 0 ? this.localCurrency.filter(x => x.localCurrencyAbbreviation == formValue.localCurrency)[0].localCurrencyId : ''
      mainObjCreate[0].IsOEProject = formValue.oeProject == "" ? false : formValue.oeProject
      if (mainObjCreate[0].IsOEProject) {
        mainObjCreate[0].OEProjectType = formValue.oeProjectType.length > 0 ? formValue.oeProjectType.map(x => x.lookUpId).join() : ''
    }
      mainObjCreate[0].IsTechTransfer = formValue.techTransfer == "" ? false : formValue.techTransfer
      if (mainObjCreate[0].IsTechTransfer) {
        mainObjCreate[0].CampaignPhaseID = formValue.campaignPhase != "" ? formValue.campaignPhase : ''
        mainObjCreate[0].ProductionStepID = formValue.productionSteps != "" ? formValue.productionSteps : ''
        mainObjCreate[0].CampaignTypeID = formValue.campaignType != "" ? formValue.campaignType : ''
    }
      mainObjCreate[0].IsAgile = formValue.AgileProject == "" ? false : formValue.AgileProject
      if (mainObjCreate[0].IsAgile) {
        mainObjCreate[0].AgilePrimaryWorkstream = formValue.agilePrimaryWorkstream != "" ? formValue.agilePrimaryWorkstream.lookUpId : ''
        mainObjCreate[0].AgileSecondaryWorkstream = formValue.agileSecondaryWorkstream.length > 0 ? formValue.agileSecondaryWorkstream.map(x => x.lookUpId).join() : ''
        mainObjCreate[0].agileWave = formValue.agileWave != "" ? formValue.agileWave.lookUpId : ''
    }
      mainObjCreate[0].IsCapsProject = formValue.isCapsProject == "" || formValue.isCapsProject == "No" ? false : true
      mainObjCreate[0].EmissionPortfolioID = Object.keys(formValue.enviornmentalPortfolio).length > 0 ? formValue.enviornmentalPortfolio.portfolioOwnerId : ''
      mainObjCreate[0].PrimaryKPI = formValue.primaryKPI != "" ? formValue.primaryKPI.kpiid : ''
      mainObjCreate[0].IsPOBOS = formValue.POBOS == "" ? false : formValue.POBOS
      if (mainObjCreate[0].IsPOBOS) {
        mainObjCreate[0].POBOSCategory = formValue.POBOSType.length > 0 ? formValue.POBOSType.map(x => x.lookUpId).join() : ''
    }
      mainObjCreate[0].IsSiteAssessment = formValue.siteAssignment == "" ? false : formValue.siteAssignment
      if (mainObjCreate[0].IsSiteAssessment) {
        mainObjCreate[0].SiteAssessmentCategory = formValue.siteAssessmentType.length > 0 ? formValue.siteAssessmentType.map(x => x.lookUpId).join() : ''
    }
      mainObjCreate[0].IsGMSGQLTAnnualMustWin = formValue.StrategicDeployment == "" ? false : formValue.StrategicDeployment
      if (mainObjCreate[0].IsGMSGQLTAnnualMustWin) {
        mainObjCreate[0].StrategicYearID = formValue.StrategicYear != "" ? formValue.StrategicYear.lookUpId : ''
        mainObjCreate[0].AnnualMustWinID = formValue.AnnualMustWin != "" ? formValue.AnnualMustWin.lookUpId : ''
    }
      if (mainObjCreate[0].ProblemTitle == "" || mainObjCreate[0].PortfolioOwnerID == "" || mainObjCreate[0].ProblemOwnerID == "" || mainObjCreate[0].LocalCurrencyID == "" || mainObjCreate[0].PrimaryProductID == "" || mainObjCreate[0].ProjectDescription == "" || mainObjCreate[0].ExecutionScope == "") {
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
    }
    else{
    var dataToSend = {}
      if (history.state.callLocation == "CopyProject"){
      dataToSend = {
        "projectCaptures": mainObjCreate,
        "hubSettings": hubSettings,
        "projectIDTemplate": history.state.copytemplateId,
        "copyProjectParameter": history.state.lookupString
      }
    }
    else{
      dataToSend = {
        "projectCaptures": mainObjCreate,
        "hubSettings": hubSettings,
        "projectIDTemplate": projectIDTemplate,
        "copyProjectParameter": copyProjectParameter
      }
    }
    
      if (formValue.qualityReference){
        this.qualityValue = true;
      }
      this.apiService.createProject(dataToSend).then((res: any) => {
        if (this.qualityValue == true) {
          this.qualityformValue = []
          var genQRFORM = this.qualityForm
          if (history.state.callLocation == "CopyProject"){
          for (var quality of this.qualityForm) {
            if (Object.keys(quality.qualityReferenceTypeId).length > 0 && quality.qualityReference1 != "") {
              this.qualityformValue.push({
                qualityUniqueId: "",
                problemUniqueId: history.state.data.problemUniqueId,
                qualityReferenceTypeId: quality.qualityReferenceTypeId != "" ? quality.qualityReferenceTypeId : '',
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
            if (res != "") {
              this.createProjectForm.reset();
              window.open('/project-hub/' + res.problemUniqueId + '/project-board', "_blank")
            }
        })
      }
      else{
          window.open('/project-hub/' + res.problemUniqueId + '/project-board', "_blank")
      }
    })
  }
  }

  getLookUpName(id: any): any {
    if (typeof (id) == 'string'){
      return id != '' ? this.qualityType.find(x => x.lookUpId == id).lookUpName : ''
    }
    else if (Object.keys(id).length > 0) {
      return id && id.lookUpId != '' ? this.qualityType.find(x => x.lookUpId == id.lookUpId).lookUpName : ''
    }
  }

}
