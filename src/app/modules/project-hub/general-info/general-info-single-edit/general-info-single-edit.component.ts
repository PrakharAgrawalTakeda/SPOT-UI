import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-general-info-single-edit',
  templateUrl: './general-info-single-edit.component.html',
  styleUrls: ['./general-info-single-edit.component.scss']
})
export class GeneralInfoSingleEditComponent implements OnInit {
  filterCriteria: any = {}
  generalInfo: any = {}
  projectTypeDropDrownValues = ["Standard Project / Program", "Simple Project"]
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
    owningOrganization: new FormControl('')
  })
  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService) {

    this.generalInfoForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projectHubService.isFormChanged = true
      }
    })
    if (!this.projectHubService.roleControllerControl.generalInfo.porfolioOwner) {
      this.generalInfoForm.controls.owningOrganization.disable()
    } else {
      this.generalInfoForm.controls.owningOrganization.enable()
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
      });
      this.owningOrganizationValues = this.projectHubService.all.defaultOwningOrganizations
      this.projectHubService.roleControllerControl.generalInfo.porfolioOwner || this.generalInfoForm.controls.problemType.value == 'Simple Project' ? this.generalInfoForm.controls.portfolioOwner.enable() : this.generalInfoForm.controls.portfolioOwner.disable()
      this.projectHubService.roleControllerControl.generalInfo.porfolioOwner ? this.generalInfoForm.controls.portfolioOwner.enable() : this.generalInfoForm.controls.portfolioOwner.disable()
      this.viewContent = true
    })
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
    this.apiService.editGeneralInfo(this.projectHubService.projectid, mainObj).then(res => {
      this.projectHubService.isNavChanged.next(true)
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }
}
