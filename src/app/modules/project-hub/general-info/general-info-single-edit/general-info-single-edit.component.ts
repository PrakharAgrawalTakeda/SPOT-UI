import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventType } from '@azure/msal-browser';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

import { HttpParams } from "@angular/common/http";
import { GlobalVariables } from "../../../../shared/global-variables";
import { MsalService } from '@azure/msal-angular';
import { RoleService } from 'app/core/auth/role.service';
import { pairwise } from 'rxjs';
@Component({
  selector: 'app-general-info-single-edit',
  templateUrl: './general-info-single-edit.component.html',
  styleUrls: ['./general-info-single-edit.component.scss']
})
export class GeneralInfoSingleEditComponent implements OnInit, OnChanges {
  @Input() viewType: 'SidePanel' | 'Form' = 'SidePanel'
  @Input() callLocation: 'ProjectHub' | 'CreateNew' | 'CopyProject' | 'CreateNewSIP' = 'ProjectHub'
  @Input() subCallLocation: 'ProjectHub' | 'ProjectProposal' | 'ProjectCharter' | 'CloseOut' | 'BusinessCase' = 'ProjectHub'
  @Input() viewElements: any = ["isConfidential", "isArchived", "problemTitle", "parentProject", "portfolioOwner", "excecutionScope", "owningOrganization", "enviornmentalPortfolio", "isCapsProject", "primaryProduct", "otherImpactedProducts", "problemType", "projectDescription"]
  @Input() createform: any
  @Input() portfolio
  activeaccount: any;
  flag = 0
  @Output() eventName = new EventEmitter<EventType>();
  viewContent: boolean = false
  showMessage: boolean = false;
  filterCriteria: any = {}
  generalInfo: any = {}
  lookupdata: any = [];
  localCurrencyList: any = [];
  local: any = [];
  projectTypeDropDrownValues1 = ["Standard Project / Program", "SimpleProject"]
  projectTypeDropDrownValues = ["Standard Project / Program", "SimpleProject", 'Strategic Initiative / Program']
  isStrategicInitiative: boolean = false
  projectNameLabel: string = "Project Name"
  owningOrganizationValues = []
  changeExecutionScope: boolean = false
  generalInfoForm = new FormGroup({
    problemTitle: new FormControl(''),
    projectsingle: new FormControl(''),
    projectsingleid: new FormControl(''),
    problemType: new FormControl('Standard Project / Program'),
    projectDescription: new FormControl(''),
    primaryProduct: new FormControl(null),
    otherImpactedProducts: new FormControl([]),
    portfolioOwner: new FormControl(null),
    excecutionScope: new FormControl([]),
    enviornmentalPortfolio: new FormControl(null),
    isArchived: new FormControl(false),
    isConfidential: new FormControl(false),
    isCapsProject: new FormControl(false),
    owningOrganization: new FormControl(''),
    closeOutApprovedDate: new FormControl(''),
    projectProposalApprovedDate: new FormControl(''),
    approvedDate: new FormControl(''),
    SubmittedBy: new FormControl(null),
    targetGoalSituation: new FormControl(''),
    localCurrency: new FormControl(''),
    functionGroupID: new FormControl(null),
    whynotgoforNextBestAlternative: new FormControl(''),
    proposalStatement: new FormControl(''),
    projectReviewedYN: new FormControl(null),
    sponsor: new FormControl(null),
    projectManager: new FormControl(null),
    StrategicRationale: new FormControl(''),
    BCAuthor: new FormControl(null),
    RiskImpact: new FormControl(''),
    AdditionalAuthor: new FormControl([]),
    businessCaseApprovedDate: new FormControl(''),
    valueCaptureStart: new FormControl('')
  })
  @Output() formValue = new EventEmitter<any>();


  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService,
    public apiService2: PortfolioApiService, private authService: MsalService, public role: RoleService, private Router: Router) {

    this.generalInfoForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (this.callLocation == 'ProjectHub' && history.state.callLocation == undefined) {
          this.projectHubService.isFormChanged = true
        }
        else if (this.callLocation == 'CreateNew') {
          this.formValue.emit(this.generalInfoForm.getRawValue())
        }
        else if (this.callLocation == 'CreateNewSIP') {
          this.formValue.emit(this.generalInfoForm.getRawValue())
        }
        else if (history.state.callLocation == 'CopyProject') {
          this.formValue.emit(this.generalInfoForm.getRawValue())
        }
      }
    })
    this.generalInfoForm.controls.problemType.valueChanges.subscribe(res => {
      if (this.viewContent && this.callLocation == 'ProjectHub') {
        if (res != this.generalInfo.projectData.problemType) {
          if(res == "Strategic Initiative / Program"){
            if(this.generalInfo.hasCAPEX || this.generalInfo.hasCAPS || this.generalInfo.hasTOPS){
              console.log("CONDITIONS NOT MET")
              var comfirmConfig: FuseConfirmationConfig = {
                "title": "The project type cannot be changed to Strategic Initiative as it contains Caps/Tops/Capex data.",
                "message": "",
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
                },
                "dismissible": true
              }
              const alert = this.fuseAlert.open(comfirmConfig)
              this.generalInfoForm.controls.problemType.patchValue(this.generalInfo.projectData.problemType)
            }
            else{
                this.generalInfoForm.controls.projectsingleid.patchValue("")
                this.generalInfoForm.controls.projectsingle.patchValue("")
                this.isStrategicInitiative = true
            }
          }

          //IF CONDITIONS NOT MET ALERT
          //SwITCH BACK TO OG PROJECT TYPE
          //ELSE MET CONFIRMATION ALERT
          //UPDATE PARENT 
          //

          
        }
      }
    })
    const url = this.Router.url;
    if (url.substring(url.lastIndexOf('/') + 1) == 'create-new-project') {
      if (this.role.roleMaster.securityGroupId == "F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F") {
        this.generalInfoForm.controls.owningOrganization.disable()
        this.generalInfoForm.controls.localCurrency.disable()
      }
      else {
        this.generalInfoForm.controls.owningOrganization.enable()
        this.generalInfoForm.controls.localCurrency.disable()
      }
    }
    else if (url.substring(url.lastIndexOf('/') + 1) == 'create-strategic-initiative-project') {
      this.generalInfoForm.controls.problemType.disable()
    }
    else {
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
    }
    this.generalInfoForm.controls.problemType.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (res != 'Strategic Initiative / Program') {
          if (res == 'Standard Project / Program') {
            if (!this.projectHubService.roleControllerControl.generalInfo.porfolioOwner) {
              this.generalInfoForm.controls.portfolioOwner.disable()
            }
          }
          else {
            this.generalInfoForm.controls.portfolioOwner.enable()
          }
        }
      }
    })

    this.generalInfoForm.controls.portfolioOwner.valueChanges.subscribe(res => {
      if (this.viewContent) {
        var portfolio = []
        if (res != null) {
          portfolio.push(res)
          if(this.callLocation == 'CreateNew' || this.callLocation == 'CopyProject'){
            if (res.portfolioGroup == "Center Function") {
              this.generalInfoForm.controls.localCurrency.enable()
            }
            else {
              this.generalInfoForm.controls.localCurrency.disable()
            }
          }
          var currency = this.localCurrencyList.filter(x => x.localCurrencyId == res.localCurrencyId)
          this.generalInfoForm.patchValue({
            excecutionScope: res.isExecutionScope ? portfolio : [],
            enviornmentalPortfolio: res.isEmissionPortfolio ? res : '',
            owningOrganization: res.defaultOwningOrganization,
            localCurrency: currency[0]?.localCurrencyAbbreviation
          })
        }
        else{
          this.generalInfoForm.controls.localCurrency.enable()
        }
      }
    })

    this.generalInfoForm.controls.excecutionScope.valueChanges.pipe(pairwise())
      .subscribe(([prev, next]: [any, any]) => {
        if (this.viewContent) {
          if (prev.length > next.length) {
            this.changeExecutionScope = true
          }
        }
      })
    this.generalInfoForm.controls.isConfidential.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.generalInfoForm.patchValue({
          projectsingleid: '',
          projectsingle: ''
        })
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generalInfoForm.patchValue({ enviornmentalPortfolio: changes.portfolio?.currentValue })
  }

  ngOnInit(): void {
    if(this.callLocation == 'CreateNew'){
      this.generalInfoForm.controls.localCurrency.enable()
    }
    else if(this.callLocation=='CopyProject'){
      if (this.generalInfoForm.value.portfolioOwner.portfolioGroup == "Center Function") {
        this.generalInfoForm.controls.localCurrency.enable()
      }
      else {
        this.generalInfoForm.controls.localCurrency.disable()
      }
    }
    else if(this.callLocation=='CreateNewSIP'){
      this.generalInfoForm.controls.problemType.disable()
    }
    if (this.callLocation == 'ProjectHub') {
      var api;
      if (this.subCallLocation == 'BusinessCase') {
        api = this.apiService.getGeneralInfoDataWizzard(this.projectHubService.projectid, 'BusinessCase')
      }
      else {
        api = this.apiService.getGeneralInfoData(this.projectHubService.projectid)
      }
      api.then((res: any) => {
        this.generalInfo = res
        this.filterCriteria = this.projectHubService.all
        this.isStrategicInitiative = res.projectData.problemType == "Strategic Initiative / Program"
        this.generalInfoForm.patchValue({
          problemTitle: res.projectData.problemTitle,
          problemType: res.projectData.problemType,
          projectsingle: res.parentProject ? res.parentProject.problemId + ' - ' + res.parentProject.problemTitle : '',
          projectsingleid: res.parentProject ? res.parentProject.problemUniqueId : '',
          projectDescription: res.projectData.projectDescription,
          primaryProduct: res.primaryProduct ? res.primaryProduct : {},
          otherImpactedProducts: res.otherImpactedProducts ? res.otherImpactedProducts : [],
          portfolioOwner: res.portfolioOwner ? res.portfolioOwner : {},
          excecutionScope: res.excecutionScope ? res.excecutionScope : [],
          enviornmentalPortfolio: res.enviornmentalPortfolio,
          isArchived: res.projectData.isArchived,
          isConfidential: res.projectData.isConfidential,
          isCapsProject: res.projectData.isCapsProject,
          owningOrganization: res.projectData.defaultOwningOrganizationId,
          closeOutApprovedDate: res.projectData.closeOutApprovedDate,
          projectProposalApprovedDate: res.projectData.projectProposalApprovedDate,
          approvedDate: res.projectData.approvedDate,
          functionGroupID: res.projectData.functionGroupID ? this.projectHubService.lookUpMaster.find(x => x.lookUpId == res.projectData.functionGroupID.toLowerCase()) : {},
          whynotgoforNextBestAlternative: res.projectData.whynotgoforNextBestAlternative,
          proposalStatement: res.projectData.proposalStatement,
          projectReviewedYN: res.projectData.projectReviewedYN ? this.projectHubService.lookUpMaster.find(x => x.lookUpId == res.projectData.projectReviewedYN.toLowerCase()) : {},
          StrategicRationale: res.projectData.strategicRationale,
          BCAuthor: res.businessCaseAuthor ? res.businessCaseAuthor : {},
          RiskImpact: res.businessCaseImpactOfDoingNothing,
          businessCaseApprovedDate: res.businessCaseApprovedDate,
          AdditionalAuthor: res.businessCaseAdditionalAuthorsContributors ? res.businessCaseAdditionalAuthorsContributors : [],
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
        this.projectHubService.roleControllerControl.generalInfo.porfolioOwner || this.generalInfoForm.controls.problemType.value == 'SimpleProject' ? this.generalInfoForm.controls.portfolioOwner.enable() : this.generalInfoForm.controls.portfolioOwner.disable()
        //this.projectHubService.roleControllerControl.generalInfo.porfolioOwner ? this.generalInfoForm.controls.problemType.enable() : this.generalInfoForm.controls.problemType.disable()
        if (this.isStrategicInitiative) {
          this.projectNameLabel = "Initiaitive Name"
          if (['ProjectCharter', 'CloseOut', 'BusinessCase'].includes(this.subCallLocation)) {
            this.projectNameLabel = "Initiative Title/ Project Name"
          }
          this.generalInfoForm.controls.problemType.disable()
        }
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
          this.local.sort()
          this.filterCriteria = res
          this.owningOrganizationValues = this.filterCriteria.defaultOwningOrganizations;
          if (history.state.data != undefined) {
            if (this.flag == 0) {
              if (history.state.data.primaryProductId != null || history.state.data.primaryProductId != "") {
                this.flag = 1;
                history.state.data.primaryProductId = this.filterCriteria.products.filter(function (entry) {
                  return entry.productId == history.state.data.primaryProductId
                })
              }
              if (history.state.data.otherImpactedProducts != null && history.state.data.otherImpactedProducts != "") {
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
              otherImpactedProducts: history.state.data.otherImpactedProducts == undefined || history.state.data.otherImpactedProducts == null || history.state.data.otherImpactedProducts == "" ? [] : finaldata,
              portfolioOwner: '',
              excecutionScope: [],
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
          else {
            if (this.callLocation == "CreateNewSIP") {
              this.generalInfoForm.patchValue({
                SubmittedBy: user,
                problemType: "Strategic Initiative / Program"
              })
            }
            else {
              this.generalInfoForm.patchValue({
                SubmittedBy: user
              })
            }
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
  getActiveProducts(): any {
    if (this.filterCriteria && this.filterCriteria.products) {
      return this.filterCriteria.products.filter(x => x.showProduct == true);
    }
    return [];
  }

  clickEvent(value: string, name: string) {
    if ((name == "Project Name" || name == "Portfolio Owner\nhelp" || name == "None\nOwning Organizationhelp *" || name == "Submitted By" || name == "Primary Producthelp *" || name == "Problem Description / Present Situation / Submission Description *" || name == "Project Type *") && (value == '' || value == undefined)) {
      this.showMessage = true
    }
    else {
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
      else if (Object.keys(formValue.portfolioOwner).length == 0) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Please select a portfolio owner",
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
      else if (this.generalInfo.portfolioOwner != formValue.portfolioOwner) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Are you sure?",
          "message": "Changing the portfolio owner will remove all the existing local attributes. Are you sure you want to update the portfolio owner ?",
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
      else if (this.changeExecutionScope == true) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Are you sure?",
          "message": "Changing the execution scope will remove all the existing local attributes. Are you sure you want to update the execution scope ?",
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
      else if (this.generalInfo.enviornmentalPortfolio != formValue.enviornmentalPortfolio && (this.generalInfo.enviornmentalPortfolio != null || Object.keys(formValue.enviornmentalPortfolio).length == 0)) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Are you sure?",
          "message": "If you change the currently selected Environmental Portfolio, all CAPS data will be removed! Do you want to proceed ?",
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
      if (Object.keys(formValue.portfolioOwner).length == 0) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Please select a portfolio owner",
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
      else if (this.generalInfo.portfolioOwner != formValue.portfolioOwner) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Are you sure?",
          "message": "Changing the portfolio owner will remove all the existing local attributes. Are you sure you want to update the portfolio owner ?",
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
      else if (this.changeExecutionScope == true) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Are you sure?",
          "message": "Changing the execution scope will remove all the existing local attributes. Are you sure you want to update the execution scope ?",
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
      else if (this.generalInfo.enviornmentalPortfolio != formValue.enviornmentalPortfolio && (this.generalInfo.enviornmentalPortfolio != null || Object.keys(formValue.enviornmentalPortfolio).length == 0)) {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Are you sure?",
          "message": "If you change the currently selected Environmental Portfolio, all CAPS data will be removed! Do you want to proceed ?",
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
  }

  submitLogic() {
    var formValue = this.generalInfoForm.getRawValue()
    var mainObj = this.generalInfo.projectData
    mainObj.isArchived = formValue.isArchived
    mainObj.isConfidential = formValue.isConfidential
    mainObj.problemTitle = formValue.problemTitle
    mainObj.problemType = formValue.problemType
    mainObj.projectDescription = formValue.projectDescription
    mainObj.parentProgramId = formValue.projectsingleid
    mainObj.portfolioOwnerId = formValue.portfolioOwner?.portfolioOwnerId
    mainObj.emissionPortfolioId = formValue.enviornmentalPortfolio?.portfolioOwnerId
    mainObj.primaryProductId = formValue.primaryProduct?.productId
    mainObj.otherImpactedProducts = formValue.otherImpactedProducts.length > 0 ? formValue.otherImpactedProducts.map(x => x.productId).join() : ''
    mainObj.executionScope = formValue.excecutionScope.length > 0 ? formValue.excecutionScope.map(x => x.portfolioOwnerId).join() : ''
    mainObj.isCapsProject = formValue.isCapsProject
    mainObj.defaultOwningOrganizationId = formValue.owningOrganization
    mainObj.closeOutApprovedDate = formValue.closeOutApprovedDate ? moment(formValue.closeOutApprovedDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null
    mainObj.projectProposalApprovedDate = formValue.projectProposalApprovedDate ? moment(formValue.projectProposalApprovedDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null
    mainObj.approvedDate = formValue.approvedDate ? moment(formValue.approvedDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null
    mainObj.whynotgoforNextBestAlternative = formValue.whynotgoforNextBestAlternative
    mainObj.proposalStatement = formValue.proposalStatement
    mainObj.projectReviewedYN = formValue.projectReviewedYN?.lookUpId
    mainObj.functionGroupID = formValue.functionGroupID?.lookUpId
    mainObj.sponsorId = formValue.sponsor?.userAdid
    mainObj.projectManagerId = formValue.projectManager?.userAdid
    mainObj.strategicRationale = formValue.StrategicRationale
    mainObj.businessCaseImpactOfDoingNothing = formValue.RiskImpact
    mainObj.businessCaseAuthorADId = formValue.BCAuthor?.userAdid
    mainObj.businessCaseAdditionalAuthorsContributorsADIds = formValue.AdditionalAuthor.length > 0 ? formValue.AdditionalAuthor.map(x => x.userAdid).join() : ''
    mainObj.businessCaseApprovedDate = formValue.businessCaseApprovedDate ? moment(formValue.businessCaseApprovedDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]') : null

    if (this.subCallLocation == 'ProjectHub') {
      this.apiService.editGeneralInfoWizzard(this.projectHubService.projectid, mainObj, '').then(res => {
        this.projectHubService.isFormChanged = false
        this.projectHubService.isNavChanged.next(true)
        this.projectHubService.submitbutton.next(true)
        this.projectHubService.successSave.next(true)
        this.projectHubService.toggleDrawerOpen('', '', [], '')
      })
    } else {
      this.apiService.editGeneralInfoWizzard(this.projectHubService.projectid, mainObj, this.subCallLocation).then(res => {
        this.projectHubService.isFormChanged = false
        this.projectHubService.isNavChanged.next(true)
        this.projectHubService.submitbutton.next(true)
        this.projectHubService.successSave.next(true)
        this.projectHubService.toggleDrawerOpen('', '', [], '')
      })
    }
  }


}
