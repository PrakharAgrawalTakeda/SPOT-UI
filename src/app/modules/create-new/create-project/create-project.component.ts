import { Component, OnInit, ElementRef, EventEmitter, Output, Input, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PortfolioApiService } from './../../portfolio-center/portfolio-api.service';
import { Router } from '@angular/router';
import { SpotlightIndicatorsService } from './../../../core/spotlight-indicators/spotlight-indicators.service';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from './../../../core/auth/auth.service';
import { FuseNavigationService } from './../../../../@fuse/components/navigation/navigation.service';
import { Title } from '@angular/platform-browser';
import $ from "jquery";
import { FormBuilder, Validators, FormGroup, FormControl, FormArray} from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProjectHubService } from './../../project-hub/project-hub.service';
import { GeneralInfoComponent } from './../../project-hub/general-info/general-info.component';
import { EventType } from '@azure/msal-browser';
import { guideCategories } from 'app/mock-api/apps/help-center/data';
import * as uuid from "uuid";
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { QualityRefBulkEditComponent } from 'app/modules/project-hub/general-info/quality-ref-bulk-edit/quality-ref-bulk-edit.component';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CreateProjectComponent implements OnInit {
  @ViewChild(QualityRefBulkEditComponent) child
  @Output() eventName = new EventEmitter<EventType>();
  @Input() mode: 'General-Info' | 'Project-Creation' = 'General-Info';
  filterCriteria: any = {};
  getData: boolean = false;
  @Input() Data: any;
  lookupdata: any = [];
  projectid: string = "";
  qualityformValue = [];
  qualityType: any = [];
  qualityValue = false;
  qualityForm = new FormArray([])
  activeaccount: any;
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
    isArchived: new FormControl(false),
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
  })

  constructor(private apiService: PortfolioApiService, private router: Router, private titleService: Title, private authService: MsalService, private apiService2: ProjectApiService, public auth: AuthService) {
  }

  // ngAfterViewInit(): void {
  //   this.createProjectForm.patchValue({
  //     quality: this.child.qualityRefForm
  //   })
  // }
  
  ngOnInit(): void {
    this.activeaccount = this.authService.instance.getActiveAccount();
    console.log("From Create project " + history.state);
    this.titleService.setTitle("Create New Project")
    this.auth.lookupMaster().then(res => {
      this.lookupdata = res;
      this.qualityType = this.lookupdata.filter(x => x.lookUpParentId == 'A4C55F7E-C213-401E-A777-3BA741FF5802');
      this.qualityType.sort((a, b) => {
        return a.lookUpOrder - b.lookUpOrder;
      })
    })

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
    this.createProjectForm.patchValue({
      quality: this.child.qualityRefForm
    })
    var hubSettings = [{
      hubSettingId: "",
      projectId: "",
      lookUpId: "",
      hubValue: false
    }];
    var projectIDTemplate = "";
    var copyProjectParameter = "";
    var mainObj = [{
      ProblemUniqueID: null,
      ProblemTitle: null,
      ProblemType: null,
      PortfolioOwnerID: null,
      DefaultOwningOrganizationID: null,
      CreatedByID: null,
      ProblemOwnerID: null,
      ProblemOwnerName: null,
      ParentProgramID: null,
      PrimaryProductID: null,
      ProjectDescription: null,
      ExecutionScope: null,
      OtherImpactedProducts: null,
      IsTechTransfer: false,
      CampaignTypeID: null,
      CampaignPhaseID: null,
      ProductionStepID: null,
      TargetEndState: null,
      IsConfidential: false,
      LocalCurrencyID: null,
      IsOEProject: false,
      OEProjectType: null,
      IsAgile: false,
      AgilePrimaryWorkstream: null,
      AgileSecondaryWorkstream: null,
      agileWave: null,
      IsCapsProject: false,
      EmissionPortfolioID: null,
      IsPOBOS: false,
      IsSiteAssessment: false,
      POBOSCategory: null,
      SiteAssessmentCategory: null,
      PrimaryKPI: null,
      IsGMSGQLTAnnualMustWin: false,
      StrategicYearID: null,
      AnnualMustWinID: null
    }];
    var formValue = this.createProjectForm.getRawValue()
    this.projectid = uuid.v4()
    mainObj[0].ProblemUniqueID = this.projectid
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
    mainObj[0].IsOEProject = formValue.oeProject == "Yes" ? true : false
    if (mainObj[0].IsOEProject) {
      mainObj[0].OEProjectType = formValue.oeProjectType != "" ? formValue.oeProjectType.lookUpId : ''
    }
    mainObj[0].IsTechTransfer = formValue.techTransfer == "Yes" ? true : false
    if (mainObj[0].IsTechTransfer) {
      mainObj[0].CampaignPhaseID = formValue.campaignPhase != "" ? formValue.campaignPhase.lookUpId : ''
      mainObj[0].ProductionStepID = formValue.productionSteps != "" ? formValue.productionSteps.lookUpId : ''
      mainObj[0].CampaignTypeID = formValue.campaignType != "" ? formValue.campaignType.lookUpId : ''
    }
    mainObj[0].IsCapsProject = formValue.isCapsProject == "Yes" ? true : false
    mainObj[0].EmissionPortfolioID = Object.keys(formValue.enviornmentalPortfolio).length > 0 ? formValue.enviornmentalPortfolio.portfolioOwnerId : ''
    mainObj[0].PrimaryKPI = formValue.primaryKPI != "" ? formValue.primaryKPI.kpiid : ''
    mainObj[0].IsPOBOS = formValue.POBOS == "Yes" ? true : false
    if (mainObj[0].IsPOBOS) {
      mainObj[0].POBOSCategory = formValue.POBOSType != "" ? formValue.POBOSType.lookUpId : ''
    }
    mainObj[0].IsSiteAssessment = formValue.siteAssignment == "Yes" ? true : false
    if (mainObj[0].IsSiteAssessment) {
      mainObj[0].SiteAssessmentCategory = formValue.siteAssessmentType != "" ? formValue.siteAssessmentType.lookUpId : ''
    }
    mainObj[0].IsGMSGQLTAnnualMustWin = formValue.StrategicDeployment == "Yes" ? true : false
    if (mainObj[0].IsGMSGQLTAnnualMustWin) {
      mainObj[0].StrategicYearID = formValue.StrategicYear != "" ? formValue.StrategicYear.lookUpId : ''
      mainObj[0].AnnualMustWinID = formValue.AnnualMustWin != "" ? formValue.AnnualMustWin.lookUpId : ''
    }
    var dataToSend = {
      "projectCaptures": mainObj,
      "hubSettings": hubSettings,
      "projectIDTemplate": projectIDTemplate,
      "copyProjectParameter": copyProjectParameter
    }
    if (formValue.qualityReference == "Yes"){
      this.qualityValue = true;
      this.qualityformValue = []
      var genQRFORM = this.createProjectForm.value.quality.value
      for (var quality of genQRFORM) {
        this.qualityformValue.push({
          qualityUniqueId: quality.qualityUniqueId,
          problemUniqueId: this.projectid,
          qualityReferenceTypeId: Object.keys(quality.qualityReferenceTypeId).length > 0 ? quality.qualityReferenceTypeId.lookUpId : '',
          qualityReference1: quality.qualityReference1
        })
      }
  }
    this.apiService.createProject(dataToSend).then(res => {
      if (this.qualityValue == true)
        this.apiService2.bulkeditQualityReference(this.qualityformValue, this.projectid).then(quality => {
          console.log(quality);
          console.log(res);
          if (res != "") {
            window.open('/project-hub/' + this.projectid + '/project-board', "_blank")
          }
      })
    })
  }
}
