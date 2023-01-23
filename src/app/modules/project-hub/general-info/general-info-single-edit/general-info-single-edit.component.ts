import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EventType } from '@azure/msal-browser';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { AuthService } from 'app/core/auth/auth.service';
import { I } from '@angular/cdk/keycodes';
import { QualityRefBulkEditComponent } from '../quality-ref-bulk-edit/quality-ref-bulk-edit.component';

@Component({
  selector: 'app-general-info-single-edit',
  templateUrl: './general-info-single-edit.component.html',
  styleUrls: ['./general-info-single-edit.component.scss']
})
export class GeneralInfoSingleEditComponent implements OnInit{
  @Input() viewType: 'SidePanel' | 'Form' = 'SidePanel'
  @Input() callLocation: 'ProjectHub' | 'CreateNew' | 'CopyProject' = 'ProjectHub'
  @Input() viewElements: any = ["isArchived", "problemTitle", "parentProject", "portfolioOwner", "excecutionScope", "owningOrganization", "enviornmentalPortfolio", "isCapsProject", "primaryProduct", "otherImpactedProducts", "problemType", "projectDescription"]

  @Output() eventName = new EventEmitter<EventType>();
  viewContent:boolean = false
  reqName: boolean = false;
  reqPortfolio: boolean = false;
  reqUser: boolean = false;
  reqProduct: boolean = false;
  reqDesc: boolean = false;
  reqOwning: boolean = false;
  KPIlookupdata: any = [];
  filterCriteria: any = {}
  generalInfo: any = {}
  lookupdata: any = [];
  // oeProjectType: any = [];
  // campaignPhase: any = [];
  // productionSteps: any = [];
  // campaignType: any = [];
  // primWorkstream: any = [];
  // agileWave: any = [];
  // POBOSType: any = [];
  localCurrencyList: any = [];
  // siteAssessmentType: any = [];
  // qualityType: any = [];
  // startegicYear: any = [];  
  // AnnualMustWin: any = [];
  // qrTableEditStack = []
  projectTypeDropDrownValues = ["Standard Project / Program", "Simple Project"]
  owningOrganizationValues = []
  generalInfoForm = new FormGroup({
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
    closeOutApprovedDate: new FormControl(''),
    projectProposalApprovedDate: new FormControl(''),
    approvedDate: new FormControl(''),
    SubmittedBy: new FormControl(''),
    targetGoalSituation: new FormControl(''),
    localCurrency: new FormControl('')
  })

  @Output() formValue = new EventEmitter<FormGroup>();
 

  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService) {

    this.generalInfoForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (this.callLocation == 'ProjectHub') {
          this.projectHubService.isFormChanged = true
        }
        else {
          this.formValue.emit(this.generalInfoForm.getRawValue())
        }
      }
    })
    if (!this.projectHubService.roleControllerControl.generalInfo.porfolioOwner) {
      this.generalInfoForm.controls.owningOrganization.disable()
      this.generalInfoForm.controls.localCurrency.disable()
    } else {
      this.generalInfoForm.controls.owningOrganization.enable()
      this.generalInfoForm.controls.localCurrency.disable()
    }
    this.generalInfoForm.controls.problemType.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (res == 'Standard Project / Program') {
          if (!this.projectHubService.roleControllerControl.generalInfo.porfolioOwner) {
            this.generalInfoForm.controls.portfolioOwner.disable()
          }
        }
        else {
          this.generalInfoForm.controls.portfolioOwner.enable()
        }
      }
    })
  }

  ngOnInit(): void {
    if (this.callLocation == 'ProjectHub') {
    this.apiService.getGeneralInfoData(this.projectHubService.projectid).then((res: any) => {
      this.generalInfo = res
      this.filterCriteria = this.projectHubService.all
      this.generalInfoForm.patchValue({
        problemTitle: res.projectData.problemTitle,
        problemType: res.projectData.problemType,
        projectsingle: res.parentProject ? res.parentProject.problemTitle : '',
        projectsingleid: res.parentProject ? res.parentProject.problemUniqueId : '',
        projectDescription: res.projectData.projectDescription,
        primaryProduct: res.primaryProduct ? res.primaryProduct : {},
        otherImpactedProducts: res.otherImpactedProducts ? res.otherImpactedProducts : [],
        portfolioOwner: res.portfolioOwner ? res.portfolioOwner : {},
        excecutionScope: res.excecutionScope ? res.excecutionScope : [],
        enviornmentalPortfolio: res.enviornmentalPortfolio ? res.enviornmentalPortfolio : {},
        isArchived: res.projectData.isArchived,
        isCapsProject: res.projectData.isCapsProject,
        owningOrganization: res.projectData.defaultOwningOrganizationId,
        closeOutApprovedDate: res.projectData.closeOutApprovedDate,
        projectProposalApprovedDate: res.projectData.projectProposalApprovedDate,
        approvedDate: res.projectData.approvedDate,
      });
      this.owningOrganizationValues = this.projectHubService.all.defaultOwningOrganizations
      this.projectHubService.roleControllerControl.generalInfo.porfolioOwner || this.generalInfoForm.controls.problemType.value == 'Simple Project' ? this.generalInfoForm.controls.portfolioOwner.enable() : this.generalInfoForm.controls.portfolioOwner.disable()
      this.projectHubService.roleControllerControl.generalInfo.porfolioOwner ? this.generalInfoForm.controls.portfolioOwner.enable() : this.generalInfoForm.controls.portfolioOwner.disable()
      this.viewContent = true
    })
    }
    else {
      this.apiService.getfilterlist().then(res => {
        this.apiService.getLocalCurrency().then(data => {
          this.localCurrencyList = data
        })
        this.filterCriteria = res
        this.formValue.emit(this.generalInfoForm.getRawValue())
        this.generalInfoForm.controls.localCurrency.disable()
        this.viewContent = true
      })
    }
  }
  getPortfolioOwner(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isPortfolioOwner == true)
    // return "";
  }
  getEnviornmentPortfolio(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isEmissionPortfolio == true)
    // return "";
  }
  getExcecutionScope(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isExecutionScope == true)
    // return "";
  }
  viewElementChecker(element: string): boolean {
    return this.viewElements.some(x => x == element)
  }

  clickEvent(value: string, name: string) {
    if (name == "Project Name *" && value == '') {
      this.reqName = true;
    }
    else if (name == "Project Name *" && value != '') {
      this.reqName = false;
    }
    else if (name == "Portfolio Ownerhelp *" && value == "") {
      this.reqPortfolio = true;
    }
    else if (name == "Portfolio Ownerhelp *" && value == "") {
      this.reqPortfolio = false;
    } 
    else if (name == "None\nOwning Organizationhelp *" && value == "") {
      this.reqOwning = true;
    }
    else if (name == "None\nOwning Organizationhelp *" && value != "") {
      this.reqOwning = false;
    }
    else if (name == "Submitted By *" && value == "") {
      this.reqUser = true;
    }
    else if (name == "Submitted By *" && value != "") {
      this.reqUser = false;
    }
    else if (name == "Primary Producthelp *" && value == "") {
      this.reqProduct = true;
    }
    else if (name == "Primary Producthelp *" && value != "") {
      this.reqProduct = false;
    }
    else if (name == "Problem Description / Present Situation / Submission Description *" && value == "") {
      this.reqDesc = true;
    }
    else if (name == "Problem Description / Present Situation / Submission Description *" && value != "") {
      this.reqDesc = false;
    }
  }


  submitGI() {
    var formValue = this.generalInfoForm.getRawValue()
    if (this.generalInfo.parentProject) {
      if (this.generalInfo.parentProject.problemUniqueId != formValue.projectsingleid) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Are you sure?",
          "message": "Changing the parent project will remove all links to the original parent program. Are you sure you want to update the parent project?",
          "icon": {
            "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "warn"
          },
          "actions": {
            "confirm": {
              "show": true,
              "label": "Okay",
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
            this.submitLogic()
          }
        })
      }
      else {
        this.submitLogic()
      }
    }
    else {
      this.submitLogic()
    }
  }

  submitLogic() {

    this.projectHubService.isFormChanged = false
    var formValue = this.generalInfoForm.getRawValue()
    var mainObj = this.generalInfo.projectData
    mainObj.isArchived = formValue.isArchived
    mainObj.problemTitle = formValue.problemTitle
    mainObj.problemType = formValue.problemType
    mainObj.projectDescription = formValue.projectDescription
    mainObj.parentProgramId = formValue.projectsingleid
    mainObj.portfolioOwnerId = Object.keys(formValue.portfolioOwner).length > 0 ? formValue.portfolioOwner.portfolioOwnerId : ''
    mainObj.emissionPortfolioId = Object.keys(formValue.enviornmentalPortfolio).length > 0 ? formValue.enviornmentalPortfolio.portfolioOwnerId : ''
    mainObj.primaryProductId = Object.keys(formValue.primaryProduct).length > 0 ? formValue.primaryProduct.productId : ''
    mainObj.otherImpactedProducts = formValue.otherImpactedProducts.length > 0 ? formValue.otherImpactedProducts.map(x => x.productId).join() : ''
    mainObj.executionScope = formValue.excecutionScope.length > 0 ? formValue.excecutionScope.map(x => x.portfolioOwnerId).join() : ''
    mainObj.isCapsProject = formValue.isCapsProject
    mainObj.defaultOwningOrganizationId = formValue.owningOrganization
    mainObj.closeOutApprovedDate = formValue.closeOutApprovedDate
    mainObj.projectProposalApprovedDate = formValue.projectProposalApprovedDate
    mainObj.approvedDate = formValue.approvedDate
    this.apiService.editGeneralInfo(this.projectHubService.projectid, mainObj).then(res => {
      this.projectHubService.isNavChanged.next(true)
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }

  GetPortfolioOwnerSelected(){
    if(this.generalInfoForm.value.portfolioOwner.gmsbudgetOwnerEditable){
      this.generalInfoForm.controls.localCurrency.enable()
    }
    
    var currency = this.localCurrencyList.filter(x => x.localCurrencyId == this.generalInfoForm.value.portfolioOwner.localCurrencyId)
    this.generalInfoForm.patchValue({
      owningOrganization: this.generalInfoForm.value.portfolioOwner.defaultOwningOrganization,
      localCurrency: currency[0]
    })
  }

}
