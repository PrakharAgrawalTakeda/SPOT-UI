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
  reqType: boolean = false;
  filterCriteria: any = {}
  generalInfo: any = {}
  lookupdata: any = [];
  localCurrencyList: any = [];
  projectTypeDropDrownValues = ["Standard Project / Program", "Simple Project"]
  owningOrganizationValues = []
  generalInfoForm = new FormGroup({
    problemTitle: new FormControl('', Validators.required),
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
        else{
          
          this.formValue.emit(this.generalInfoForm.getRawValue())
          if (this.generalInfoForm.value.portfolioOwner.gmsbudgetOwnerEditable) {
            this.generalInfoForm.controls.localCurrency.enable()
          }
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
        functionGroupID: res.projectData.functionGroupID ? this.projectHubService.lookUpMaster.find(x => x.lookUpId == res.projectData.functionGroupID.toLowerCase()) : {},
        whynotgoforNextBestAlternative: res.projectData.whynotgoforNextBestAlternative,
        proposalStatement: res.projectData.proposalStatement,
        projectReviewedYN: res.projectData.projectReviewedYN ? this.projectHubService.lookUpMaster.find(x => x.lookUpId == res.projectData.projectReviewedYN.toLowerCase()) : {}
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
          this.filterCriteria = res
          if (history.state.data != undefined) {
                if (history.state.data[0].primaryProduct != null) {
                  history.state.data[0].primaryProduct = this.filterCriteria.products.filter(function (entry) {
                    return entry.productId == history.state.data[0].primaryProduct
                  })
                }
                if (history.state.data[0].otherImpactedProducts != null) {
                  const data = history.state.data[0].otherImpactedProducts.split(',');
                  var impactedproducts = {};
                  var finaldata = [];
                  for (var i = 0; i < data.length; i++) {
                    impactedproducts = this.filterCriteria.products.filter(function (entry) {
                      return entry.productId == data[i]
                    })
                    finaldata.push(impactedproducts[0]);
                  }
                }
                if (history.state.data[0].ProblemOwnerID != null) {
                  var user = {
                    userAdid: history.state.data[0].ProblemOwnerID,
                    userDisplayName: history.state.data[0].ProblemOwnerName
                  };
                }
                this.generalInfoForm.patchValue({
                  problemTitle: history.state.data[0].title,
                  projectsingle: '',
                  projectsingleid: '',
                  problemType: history.state.data[0].problemType,
                  projectDescription: history.state.data[0].problemDescription,
                  primaryProduct: history.state.data[0].primaryProduct == null ? '' : history.state.data[0].primaryProduct[0],
                  otherImpactedProducts: history.state.data[0].otherImpactedProducts == null ? '' : finaldata,
                  portfolioOwner: '',
                  excecutionScope: '',
                  enviornmentalPortfolio: '',
                  isArchived: "No",
                  isCapsProject: "No",
                  owningOrganization: '',
                  SubmittedBy: user,
                  targetGoalSituation: history.state.data[0].targetEndState == null ? '' : history.state.data[0].targetEndState,
                  localCurrency: ''
                })
                this.formValue.emit(this.generalInfoForm.getRawValue())
                this.generalInfoForm.controls.localCurrency.disable()
                this.viewContent = true
          }
          else{
          this.formValue.emit(this.generalInfoForm.getRawValue())
          this.generalInfoForm.controls.localCurrency.disable()
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
    else if (name == "Portfolio Ownerhelp *" && value != "") {
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
    else if (name == "Project Type *" && value == "") {
      this.reqType = true;
    }
    else if (name == "Project Type *" && value != "") {
      this.reqType = false;
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

    this.apiService.editGeneralInfo(this.projectHubService.projectid, mainObj).then(res => {
      this.projectHubService.isNavChanged.next(true)
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }

  GetPortfolioOwnerSelected(){
    // if(this.generalInfoForm.value.portfolioOwner.gmsbudgetOwnerEditable){
    //   this.generalInfoForm.controls.localCurrency.enable()
    // }
    
    var currency = this.localCurrencyList.filter(x => x.localCurrencyId == this.generalInfoForm.value.portfolioOwner.localCurrencyId)
    this.generalInfoForm.patchValue({
      owningOrganization: this.generalInfoForm.value.portfolioOwner.defaultOwningOrganization,
      localCurrency: currency[0]
    })
  }

}
