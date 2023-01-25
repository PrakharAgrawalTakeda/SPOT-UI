import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import * as moment from 'moment';
@Component({
  selector: 'app-general-info-single-edit',
  templateUrl: './general-info-single-edit.component.html',
  styleUrls: ['./general-info-single-edit.component.scss']
})
export class GeneralInfoSingleEditComponent implements OnInit {
  filterCriteria: any = {}
  generalInfo: any = {}
  projectTypeDropDrownValues = ["Standard Project / Program", "Simple Project"]
  @Input() viewType: 'SidePanel' | 'Form' = 'SidePanel'
  @Input() callLocation: 'ProjectHub' | 'CreateNew' | 'CopyProject' = 'ProjectHub'
  @Input() subCallLocation: 'ProjectHub' | 'ProjectProposal' | 'ProjectCharter' | 'CloseOut' = 'ProjectHub'
  @Input() viewElements: any = ["isArchived", "problemTitle", "parentProject", "portfolioOwner", "excecutionScope", "owningOrganization", "enviornmentalPortfolio", "isCapsProject", "primaryProduct", "otherImpactedProducts", "problemType", "projectDescription"]
  @Output() formValue = new EventEmitter();
  owningOrganizationValues = []
  viewContent = false
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
    functionGroupID: new FormControl({}),
    whynotgoforNextBestAlternative: new FormControl(''),
    proposalStatement: new FormControl(''),
    projectReviewedYN: new FormControl({}),
    sponsor: new FormControl(''),
    projectManager: new FormControl(''),
  })
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
      this.generalInfoForm.controls.sponsor.disable()
      this.generalInfoForm.controls.projectManager.disable()
    } else {
      this.generalInfoForm.controls.owningOrganization.enable()
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
  }

  ngOnInit(): void {
    if (this.callLocation == 'ProjectHub') {
      this.apiService.getGeneralInfoData(this.projectHubService.projectid).then((res: any) => {
        this.generalInfo = res
        this.filterCriteria = this.projectHubService.all
          console.log("Aaaaaaaaaaaaaaa", res)
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
          projectManager: res.portfolioCenterData.pm ? res.portfolioCenterData.pm : "",
          sponsor: res.sponsor.teamMemberName ? res.sponsor.teamMemberName : "",
        })
        this.owningOrganizationValues = this.projectHubService.all.defaultOwningOrganizations
        this.projectHubService.roleControllerControl.generalInfo.porfolioOwner || this.generalInfoForm.controls.problemType.value == 'Simple Project' ? this.generalInfoForm.controls.portfolioOwner.enable() : this.generalInfoForm.controls.portfolioOwner.disable()
        this.projectHubService.roleControllerControl.generalInfo.porfolioOwner ? this.generalInfoForm.controls.portfolioOwner.enable() : this.generalInfoForm.controls.portfolioOwner.disable()
        this.viewContent = true
      })
    }
    else {
      this.apiService.getfilterlist().then(res => {
        this.filterCriteria = res
        this.formValue.emit(this.generalInfoForm.getRawValue())
        this.viewContent = true
      })
    }
  }
  getPortfolioOwner(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isPortfolioOwner == true)
  }
  getEnviornmentPortfolio(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isEmissionPortfolio == true)
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
