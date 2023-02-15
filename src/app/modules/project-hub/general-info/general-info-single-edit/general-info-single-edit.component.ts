import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventType } from '@azure/msal-browser';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { AuthService } from 'app/core/auth/auth.service';
import { I } from '@angular/cdk/keycodes';
import { QualityRefBulkEditComponent } from '../quality-ref-bulk-edit/quality-ref-bulk-edit.component';
import * as moment from 'moment';
import {HttpParams} from "@angular/common/http";
import {GlobalVariables} from "../../../../shared/global-variables";
import { MsalService } from '@azure/msal-angular';
@Component({
  selector: 'app-general-info-single-edit',
  templateUrl: './general-info-single-edit.component.html',
  styleUrls: ['./general-info-single-edit.component.scss']
})
export class GeneralInfoSingleEditComponent implements OnInit{
  @Input() viewType: 'SidePanel' | 'Form' = 'SidePanel'
  @Input() callLocation: 'ProjectHub' | 'CreateNew' | 'CopyProject' = 'ProjectHub'
  @Input() subCallLocation: 'ProjectHub' | 'ProjectProposal' | 'ProjectCharter' | 'CloseOut' = 'ProjectHub'
  @Input() viewElements: any = ["isArchived", "problemTitle", "parentProject", "portfolioOwner", "excecutionScope", "owningOrganization", "enviornmentalPortfolio", "isCapsProject", "primaryProduct", "otherImpactedProducts", "problemType", "projectDescription"]
  activeaccount: any;
  flag = 0
  @Output() eventName = new EventEmitter<EventType>();
  viewContent:boolean = false
  showMessage: boolean = false;
  filterCriteria: any = {}
  generalInfo: any = {}
  lookupdata: any = [];
  localCurrencyList: any = [];
  local:any=[];
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
    localCurrency: new FormControl(''),
    functionGroupID: new FormControl({}),
    whynotgoforNextBestAlternative: new FormControl(''),
    proposalStatement: new FormControl(''),
    projectReviewedYN: new FormControl({}),
    sponsor: new FormControl({}),
    projectManager: new FormControl({}),
  })

  @Output() formValue = new EventEmitter<FormGroup>();
 

  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService,
    public apiService2: PortfolioApiService, private authService: MsalService) {

    this.generalInfoForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (this.callLocation == 'ProjectHub' && history.state.callLocation == undefined) {
          this.projectHubService.isFormChanged = true
        }
        else if (this.callLocation == 'CreateNew'){
          this.formValue.emit(this.generalInfoForm.getRawValue())
          if (this.generalInfoForm.value.portfolioOwner.gmsbudgetOwnerEditable) {
            this.generalInfoForm.controls.localCurrency.enable()
          }
          else{
            this.generalInfoForm.controls.localCurrency.disable()
          }
        }
        else if (history.state.callLocation == 'CopyProject'){
          this.formValue.emit(this.generalInfoForm.getRawValue())
          if (this.generalInfoForm.value.portfolioOwner.gmsbudgetOwnerEditable) {
            this.generalInfoForm.controls.localCurrency.enable()
          }
          else {
            this.generalInfoForm.controls.localCurrency.disable()
          }
        }
      }
    })
    if (!this.projectHubService.roleControllerControl.generalInfo.porfolioOwner) {
      this.generalInfoForm.controls.owningOrganization.disable()
      this.generalInfoForm.controls.localCurrency.disable()
      this.generalInfoForm.controls.sponsor.disable()
      this.generalInfoForm.controls.projectManager.disable()
    } else {
      this.generalInfoForm.controls.owningOrganization.enable()
      this.generalInfoForm.controls.localCurrency.disable()
      this.generalInfoForm.controls.sponsor.enable()
      this.generalInfoForm.controls.projectManager.enable()
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

    this.generalInfoForm.controls.portfolioOwner.valueChanges.subscribe(res => {
      if (this.viewContent) {
        var portfolio=[]
        portfolio.push(res)
        var currency = this.localCurrencyList.filter(x => x.localCurrencyId == res.localCurrencyId)
        this.generalInfoForm.patchValue({
          excecutionScope: res.isExecutionScope ? portfolio : [],
          enviornmentalPortfolio: res.isEmissionPortfolio ? res : '',
          owningOrganization: res.defaultOwningOrganization,
          localCurrency: currency[0].localCurrencyAbbreviation
        })
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
        functionGroupID: res.projectData.functionGroupID ? this.projectHubService.lookUpMaster.find(x => x.lookUpId == res.projectData.functionGroupID.toLowerCase()) : {},
        whynotgoforNextBestAlternative: res.projectData.whynotgoforNextBestAlternative,
        proposalStatement: res.projectData.proposalStatement,
        projectReviewedYN: res.projectData.projectReviewedYN ? this.projectHubService.lookUpMaster.find(x => x.lookUpId == res.projectData.projectReviewedYN.toLowerCase()) : {},
        sponsor: res.sponsor ? {
          userAdid: res.sponsor.teamMemberAdId,
          userDisplayName: res.sponsor.teamMemberName
        } : {},
        projectManager: {
          userAdid: res.projectData.projectManagerId,
          userDisplayName: res.portfolioCenterData.pm
        }
      });

      this.owningOrganizationValues = this.projectHubService.all.defaultOwningOrganizations
      this.projectHubService.roleControllerControl.generalInfo.porfolioOwner || this.generalInfoForm.controls.problemType.value == 'Simple Project' ? this.generalInfoForm.controls.portfolioOwner.enable() : this.generalInfoForm.controls.portfolioOwner.disable()
      this.viewContent = true
    })
    }
    else {
      this.activeaccount = this.authService.instance.getActiveAccount();
      var user = {
        userAdid: this.activeaccount.localAccountId,
        userDisplayName: this.activeaccount.name
      };
      this.apiService.getfilterlist().then(res => {
        this.apiService2.getLocalCurrency().then(data => {
          this.localCurrencyList = data
          for (var i = 0; i < this.localCurrencyList.length; i++) {
            this.local.push(this.localCurrencyList[i].localCurrencyAbbreviation)
          }
          this.filterCriteria = res
          this.owningOrganizationValues = this.filterCriteria.defaultOwningOrganizations;
          if (history.state.data != undefined) {
            if(this.flag == 0){
            if (history.state.data.primaryProductId != null || history.state.data.primaryProductId != "") {
              this.flag = 1;
              history.state.data.primaryProductId = this.filterCriteria.products.filter(function (entry) {
                return entry.productId == history.state.data.primaryProductId
                  })
                }
            if (history.state.data.otherImpactedProducts != null || history.state.data.otherImpactedProducts != "") {
                  const data = history.state.data.otherImpactedProducts.split(',');
                  var impactedproducts = {};
                  var finaldata = [];
                  for (var i = 0; i < data.length; i++) {
                    impactedproducts = this.filterCriteria.products.filter(function (entry) {
                      return entry.productId == data[i]
                    })
                    finaldata.push(impactedproducts[0]);
                  }
                }
              }
                this.generalInfoForm.patchValue({
                  problemTitle: history.state.data.problemTitle,
                  projectsingle: '',
                  projectsingleid: '',
                  problemType: history.state.data.problemType,
                  projectDescription: history.state.data.projectDescription,
                  primaryProduct: history.state.data.primaryProductId == null ? '' : history.state.data.primaryProductId[0],
                  otherImpactedProducts: history.state.data.otherImpactedProducts[0] == undefined ? '' : finaldata,
                  portfolioOwner: '',
                  excecutionScope: '',
                  enviornmentalPortfolio: '',
                  isArchived: false,
                  isCapsProject: false,
                  owningOrganization: '',
                  SubmittedBy: user,
                  targetGoalSituation: history.state.data.targetEndState == null ? '' : history.state.data.targetEndState,
                  localCurrency: ''
                })
                this.formValue.emit(this.generalInfoForm.getRawValue())
                this.viewContent = true
          }
          else{
          this.generalInfoForm.patchValue({
            SubmittedBy: user
          })
          this.formValue.emit(this.generalInfoForm.getRawValue())
          this.viewContent = true
          }
        })
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
    
  }
  getProjectReviewedYN(): any {
    return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == 'c58fb456-3901-4677-9ec5-f4eada7158e6')
  }
  getFunctionGroupID(): any {
    return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == '0edea251-09b0-4323-80a0-9a6f90190c77')
  }
  viewElementChecker(element: string): boolean {
    return this.viewElements.some(x => x == element)
  }
  getSponsor(): any {
    return this.filterCriteria.sponsor
  }

  clickEvent(value: string, name: string) {
    if ((name == "Project Name *" || name == "Portfolio Ownerhelp *" || name == "None\nOwning Organizationhelp *" || name == "Submitted By *" || name == "Primary Producthelp *" || name == "Problem Description / Present Situation / Submission Description *" || name == "Project Type *") && (value == '' || value == undefined)){
      this.showMessage = true
    }
    else{
      this.showMessage = false
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
    mainObj.closeOutApprovedDate = formValue.closeOutApprovedDate ? moment(formValue.closeOutApprovedDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null
    mainObj.projectProposalApprovedDate = formValue.projectProposalApprovedDate ? moment(formValue.projectProposalApprovedDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null
    mainObj.approvedDate = formValue.approvedDate ? moment(formValue.approvedDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null
    mainObj.whynotgoforNextBestAlternative = formValue.whynotgoforNextBestAlternative
    mainObj.proposalStatement = formValue.proposalStatement
    mainObj.projectReviewedYN = Object.keys(formValue.projectReviewedYN).length > 0 ? formValue.projectReviewedYN.lookUpId : ''
    mainObj.functionGroupID = Object.keys(formValue.functionGroupID).length > 0 ? formValue.functionGroupID.lookUpId : ''
    mainObj.sponsorId =  Object.keys(formValue.sponsor).length > 0 ? formValue.sponsor.userAdid : ''
    mainObj.projectManagerId =  Object.keys(formValue.projectManager).length > 0 ? formValue.projectManager.userAdid : '',
    this.apiService.editGeneralInfo(this.projectHubService.projectid, mainObj).then(res => {
      if (this.subCallLocation == 'ProjectProposal') {
        this.apiService.updateReportDates(this.projectHubService.projectid, "ProjectProposalModifiedDate").then(secondRes => {
          this.projectHubService.isNavChanged.next(true)
          this.projectHubService.submitbutton.next(true)
          this.projectHubService.successSave.next(true)
          this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
      }
      else if (this.subCallLocation == 'CloseOut') {
        this.apiService.updateReportDates(this.projectHubService.projectid, "CloseoutModifiedDate").then(secondRes => {
          this.projectHubService.isNavChanged.next(true)
          this.projectHubService.submitbutton.next(true)
          this.projectHubService.successSave.next(true)
          this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
      }
      else if (this.subCallLocation == 'ProjectCharter') {
        this.apiService.updateReportDates(this.projectHubService.projectid, "ModifiedDate").then(secondRes => {
          this.projectHubService.isNavChanged.next(true)
          this.projectHubService.submitbutton.next(true)
          this.projectHubService.successSave.next(true)
          this.projectHubService.toggleDrawerOpen('', '', [], '')
        })
      }
      else {
        this.projectHubService.isNavChanged.next(true)
        this.projectHubService.submitbutton.next(true)
        this.projectHubService.successSave.next(true)
        this.projectHubService.toggleDrawerOpen('', '', [], '')
      }
    })
  }


}
