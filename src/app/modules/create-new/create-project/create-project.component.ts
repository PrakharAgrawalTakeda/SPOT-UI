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
        primaryProduct: event.primaryProduct ? event.primaryProduct : {},
        otherImpactedProducts: event.otherImpactedProducts ? event.otherImpactedProducts : [],
        portfolioOwner: event.portfolioOwner ? event.portfolioOwner : {},
        excecutionScope: event.excecutionScope ? event.excecutionScope : [],
        enviornmentalPortfolio: event.enviornmentalPortfolio ? event.enviornmentalPortfolio : {},
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
    var mainObj = [{
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
    mainObj[0].ProblemUniqueID = ""
    mainObj[0].ProblemTitle = formValue.problemTitle
    mainObj[0].PortfolioOwnerID = Object.keys(formValue.portfolioOwner).length > 0 ? formValue.portfolioOwner.portfolioOwnerId : ''
    mainObj[0].ExecutionScope = formValue.excecutionScope.length > 0 ? formValue.excecutionScope.map(x => x.portfolioOwnerId).join() : ''
    mainObj[0].ProblemOwnerID = formValue.SubmittedBy != "" ? formValue.SubmittedBy.userAdid : ''
    mainObj[0].CreatedByID = formValue.SubmittedBy != "" ? formValue.SubmittedBy.userAdid : ''
    mainObj[0].ProblemOwnerName = formValue.SubmittedBy != "" ? formValue.SubmittedBy.userDisplayName : ''
    mainObj[0].PrimaryProductID = Object.keys(formValue.primaryProduct).length > 0 ? formValue.primaryProduct.productId : ''
    mainObj[0].OtherImpactedProducts = formValue.otherImpactedProducts.length > 0 ? formValue.otherImpactedProducts.map(x => x.productId).join() : ''
    mainObj[0].ParentProgramID = formValue.projectsingleid
    mainObj[0].ProjectDescription = formValue.projectDescription
    mainObj[0].TargetEndState = formValue.targetGoalSituation
    mainObj[0].ProblemType = formValue.problemType
    mainObj[0].DefaultOwningOrganizationID = formValue.owningOrganization
    mainObj[0].LocalCurrencyID = Object.keys(formValue.localCurrency).length > 0 ? this.localCurrency.filter(x => x.localCurrencyAbbreviation == formValue.localCurrency)[0].localCurrencyId : ''
    mainObj[0].IsOEProject = formValue.oeProject == "" ? false : formValue.oeProject
    if (mainObj[0].IsOEProject) {
      mainObj[0].OEProjectType = formValue.oeProjectType.length > 0 ? formValue.oeProjectType.map(x => x.lookUpId).join() : ''
    }
    mainObj[0].IsTechTransfer = formValue.techTransfer == "" ? false : formValue.techTransfer
    if (mainObj[0].IsTechTransfer) {
      mainObj[0].CampaignPhaseID = formValue.campaignPhase != "" ? formValue.campaignPhase : ''
      mainObj[0].ProductionStepID = formValue.productionSteps != "" ? formValue.productionSteps : ''
      mainObj[0].CampaignTypeID = formValue.campaignType != "" ? formValue.campaignType : ''
    }
    mainObj[0].IsAgile = formValue.AgileProject == "" ? false : formValue.AgileProject
    if (mainObj[0].IsAgile) {
      mainObj[0].AgilePrimaryWorkstream = formValue.agilePrimaryWorkstream != "" ? formValue.agilePrimaryWorkstream.lookUpId : ''
      mainObj[0].AgileSecondaryWorkstream = formValue.agileSecondaryWorkstream.length > 0 ? formValue.agileSecondaryWorkstream.map(x => x.lookUpId).join() : ''
      mainObj[0].agileWave = formValue.agileWave != "" ? formValue.agileWave.lookUpId : ''
    }
    mainObj[0].IsCapsProject = formValue.isCapsProject == "" || formValue.isCapsProject == "No" ? false : true
    mainObj[0].EmissionPortfolioID = Object.keys(formValue.enviornmentalPortfolio).length > 0 ? formValue.enviornmentalPortfolio.portfolioOwnerId : ''
    mainObj[0].PrimaryKPI = formValue.primaryKPI != "" ? formValue.primaryKPI.kpiid : ''
    mainObj[0].IsPOBOS = formValue.POBOS == "" ? false : formValue.POBOS
    if (mainObj[0].IsPOBOS) {
      mainObj[0].POBOSCategory = formValue.POBOSType.length > 0 ? formValue.POBOSType.map(x => x.lookUpId).join() : ''
    }
    mainObj[0].IsSiteAssessment = formValue.siteAssignment == "" ? false : formValue.siteAssignment
    if (mainObj[0].IsSiteAssessment) {
      mainObj[0].SiteAssessmentCategory = formValue.siteAssessmentType.length > 0 ? formValue.siteAssessmentType.map(x => x.lookUpId).join() : ''
    }
    mainObj[0].IsGMSGQLTAnnualMustWin = formValue.StrategicDeployment == "" ? false : formValue.StrategicDeployment
    if (mainObj[0].IsGMSGQLTAnnualMustWin) {
      mainObj[0].StrategicYearID = formValue.StrategicYear != "" ? formValue.StrategicYear.lookUpId : ''
      mainObj[0].AnnualMustWinID = formValue.AnnualMustWin != "" ? formValue.AnnualMustWin.lookUpId : ''
    }
    if (mainObj[0].ProblemTitle == "" || mainObj[0].PortfolioOwnerID == "" || mainObj[0].ProblemOwnerID == "" || mainObj[0].LocalCurrencyID == "" || mainObj[0].PrimaryProductID == "" || mainObj[0].ProjectDescription == "" || mainObj[0].ExecutionScope == "") {
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
    if (history.state.data != undefined){
      dataToSend = {
        "projectCaptures": mainObj,
        "hubSettings": hubSettings,
        "projectIDTemplate": history.state.copytemplateId,
        "copyProjectParameter": history.state.lookupString
      }
    }
    else{
        dataToSend = {
          "projectCaptures": mainObj,
          "hubSettings": hubSettings,
          "projectIDTemplate": projectIDTemplate,
          "copyProjectParameter": copyProjectParameter
        }
    }
      if (formValue.qualityReference){
        this.qualityValue = true;
        // this.qualityformValue = []
        // var genQRFORM = this.qualityForm
        // for (var quality of this.qualityForm) {
        //   if (Object.keys(quality.qualityReferenceTypeId).length > 0 && quality.qualityReference1 != ""){
        //     if (history.state.callLocation == "CopyProject"){
        //       this.qualityformValue.push({
        //         qualityUniqueId: "",
        //         problemUniqueId: this.projectid,
        //         qualityReferenceTypeId: quality.qualityReferenceTypeId != "" ? quality.qualityReferenceTypeId : '',
        //         qualityReference1: quality.qualityReference1
        //       })
        //     }
        //     else{
        //       this.qualityformValue.push({
        //         qualityUniqueId: quality.qualityUniqueId,
        //         problemUniqueId: this.projectid,
        //         qualityReferenceTypeId: Object.keys(quality.qualityReferenceTypeId).length > 0 ? quality.qualityReferenceTypeId.lookUpId : '',
        //         qualityReference1: quality.qualityReference1
        //       })
        //     }
        //   }
        // }
    }
      var jsonData = JSON.stringify(dataToSend)
      console.log(JSON.parse(jsonData))
      this.apiService.createProject(JSON.parse(jsonData)).then((res: any) => {
        if (this.qualityValue == true) {
          this.qualityformValue = []
          var genQRFORM = this.qualityForm
          for (var quality of this.qualityForm) {
            if (Object.keys(quality.qualityReferenceTypeId).length > 0 && quality.qualityReference1 != "") {
              if (history.state.callLocation == "CopyProject") {
                this.qualityformValue.push({
                  qualityUniqueId: "",
                  problemUniqueId: res.problemUniqueId,
                  qualityReferenceTypeId: quality.qualityReferenceTypeId != "" ? quality.qualityReferenceTypeId : '',
                  qualityReference1: quality.qualityReference1
                })
              }
              else {
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
