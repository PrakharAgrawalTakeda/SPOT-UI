
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import * as moment from 'moment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectHubService } from '../project-hub.service';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})
export class GeneralInfoComponent implements OnInit {
  viewContent: boolean = false
  lookUpData: any = []
  id: string = ""
  generalInfoData: any = {}
  filterCriteria: any = {}
  generalInfoForm = new FormGroup({
    problemTitle: new FormControl(''),
    projectsingle: new FormControl(''),
    projectsingleid: new FormControl(''),
    problemType: new FormControl('Standard Project / Program'),
    topsGroup: new FormControl(''),
    recordCreationDate: new FormControl(''),
    submittedBy: new FormControl(''),
    sponsor: new FormControl(''),
    projectManager: new FormControl(''),
    projectDescription: new FormControl(''),
    primaryProduct: new FormControl({}),
    otherImpactedProducts: new FormControl([]),
    portfolioOwner: new FormControl({}),
    excecutionScope: new FormControl([]),
    enviornmentalPortfolio: new FormControl({}),
    isOeproject: new FormControl(false),
    oeprojectType: new FormControl({}),
    isCapsProject: new FormControl(false),
    isTechTransfer: new FormControl(false),
    productionStepId: new FormControl(''),
    campaignPhaseId: new FormControl(''),
    campaignTypeId: new FormControl(''),
    isQualityRef: new FormControl(false),
    isArchived: new FormControl(false)
  })
  qrTableEditStack: any = []
  qualityRefForm = new FormArray([])
  projectTypeDropDrownValues = ["Standard Project / Program", "Simple Project"]
  formFieldHelpers: any
  constructor(private apiService: ProjectApiService,
    private _Activatedroute: ActivatedRoute,
    private portApiService: PortfolioApiService,
    private authService: AuthService,
    private projectHubService: ProjectHubService,
    private router: Router,
    public fuseAlert: FuseConfirmationService) {
    this.projectHubService.submitbutton.subscribe(res => {
      if (this.viewContent == true) {
        this.tableAlter()
      }
    })

    this.generalInfoForm.controls.isTechTransfer.valueChanges.subscribe(res => {
      if (this.viewContent == true) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the Tech Transfer Information?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Remove",
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
              this.generalInfoForm.controls.campaignTypeId.patchValue('')
              this.generalInfoForm.controls.campaignPhaseId.patchValue('')
              this.generalInfoForm.controls.productionStepId.patchValue('')
            }
            else {
              this.generalInfoForm.controls.isTechTransfer.patchValue(true)
            }
          })
        }
      }
    })


    this.generalInfoForm.controls.isOeproject.valueChanges.subscribe(res => {
      if (this.viewContent == true) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the OE Project Type Information?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Remove",
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
              this.generalInfoForm.controls.oeprojectType.patchValue({})
            }
            else {
              this.generalInfoForm.controls.isOeproject.patchValue(true)
            }
          })
        }
      }
    })

    this.generalInfoForm.controls.isQualityRef.valueChanges.subscribe(res => {
      if (this.viewContent == true) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the Quality Reference Information?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Remove",
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
              this.qrTableEditStack = []
              this.qualityRefForm = new FormArray([])
              this.generalInfoData.qualityReferences = []
            }
            else {
              this.generalInfoForm.controls.isQualityRef.patchValue(true)
              this.tableAlter()
            }
          })
        }
      }
    })
  }

  tableAlter() {
    if (this.generalInfoData.qualityReferences.length > 0) {
      this.generalInfoData.qualityReferences = []
      var qr = []
      var genQRFORM = this.qualityRefForm.getRawValue()
      for (var quality of genQRFORM) {
        qr.push({
          qualityUniqueId: quality.qualityUniqueId,
          qualityReferenceTypeId: Object.keys(quality.qualityReferenceTypeId).length > 0 ? quality.qualityReferenceTypeId.lookUpId : '',
          qualityReference1: quality.qualityReference1,
          problemUniqueId: quality.problemUniqueId
        })
      }
      this.generalInfoData.qualityReferences = [...this.generalInfoData.qualityReferences, ...qr]
    }
  }
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getGeneralInfoData(this.id).then((res: any) => {
      this.portApiService.getfilterlist().then(filterres => {
        this.authService.lookupMaster().then((lookup: any) => {
          console.log('LookUp Data', lookup)
          this.lookUpData = lookup
          console.log('Filter Criteria:', filterres)
          this.filterCriteria = filterres
          console.log("General Info:", res)
          this.generalInfoData = res
          this.generalInfoForm.patchValue({
            problemTitle: res.projectData.problemTitle,
            problemType: res.projectData.problemType,
            topsGroup: res.topsData ? res.topsData.topsgroup : '',
            recordCreationDate: res.projectData.createdDate,
            projectsingle: res.parentProject ? res.parentProject.problemTitle : '',
            projectsingleid: res.parentProject ? res.parentProject.problemUniqueId : '',
            submittedBy: res.projectData.problemOwnerName,
            projectManager: res.portfolioCenterData.pm,
            sponsor: res.portfolioCenterData.sponsor,
            projectDescription: res.projectData.projectDescription,
            primaryProduct: res.primaryProduct,
            otherImpactedProducts: res.otherImpactedProducts ? res.otherImpactedProducts : [],
            portfolioOwner: res.portfolioOwner ? res.portfolioOwner : {},
            excecutionScope: res.excecutionScope ? res.excecutionScope : [],
            enviornmentalPortfolio: res.enviornmentalPortfolio ? res.enviornmentalPortfolio : {},
            isOeproject: res.projectData.isOeproject,
            oeprojectType: res.projectData.oeprojectType ? {} : lookup.find(x => x.lookUpId == res.projectData.oeprojectType),
            isCapsProject: res.projectData.isCapsProject,
            isTechTransfer: res.projectData.isTechTransfer,
            productionStepId: res.projectData.productionStepId,
            campaignPhaseId: res.projectData.campaignPhaseId,
            campaignTypeId: res.projectData.campaignTypeId,
            isQualityRef: res.qualityReferences.length != 0,
            isArchived: res.projectData.isArchived
          })
          if (res.qualityReferences.length != 0) {
            for (var i of res.qualityReferences) {
              this.qualityRefForm.push(new FormGroup({
                qualityUniqueId: new FormControl(i.qualityUniqueId),
                qualityReferenceTypeId: new FormControl(this.lookUpData.find(x => x.lookUpId == i.qualityReferenceTypeId)),
                qualityReference1: new FormControl(i.qualityReference1),
                problemUniqueId: new FormControl(this.id)
              }))
            }
          }
          console.log(this.qualityRefForm.getRawValue())
          this.viewContent = true
        })
      })
    })
    this.disabler()
  }


  disabler() {
    if (!this.projectHubService.roleControllerControl.generalInfo.basicFields) {
      this.generalInfoForm.disable()
    }
    if (!this.projectHubService.roleControllerControl.generalInfo.porfolioOwner) {
      console.log('hit')
      this.generalInfoForm.controls.portfolioOwner.disable()
    }
    this.generalInfoForm.controls.topsGroup.disable()
    this.generalInfoForm.controls.recordCreationDate.disable()
    this.generalInfoForm.controls.submittedBy.disable()
    this.generalInfoForm.controls.projectManager.disable()
    this.generalInfoForm.controls.sponsor.disable()
  }
  getPortfolioOwner(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isPortfolioOwner == true)
  }
  getExcecutionScope(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isExecutionScope == true)
  }
  getEnviornmentPortfolio(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isEmissionPortfolio == true)
  }
  getoeprojectType(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "04D143E7-CAA7-4D8D-88C3-A6CB575890A3")
  }
  getCampaignPhase(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "183dc1f1-06ba-4022-bd6f-ae07f70751e2")
  }
  getCampaignType(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "01a49f16-0744-4100-ae8a-ec2e469dbf74")
  }
  getProductionStep(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "b137412d-8008-4446-8fe6-c56a06b83174")
  }
  getQRType(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "A4C55F7E-C213-401E-A777-3BA741FF5802")
  }
  getLookUpName(id: string): string {
    return id && id != '' ? this.lookUpData.find(x => x.lookUpId == id).lookUpName : ''
  }
  qrTableEditRow(row: number) {
    if (!this.qrTableEditStack.includes(row)) {
      this.qrTableEditStack.push(row)
    }
  }
  deleteQR(rowIndex: number) {
    this.generalInfoData.qualityReferences.splice(rowIndex, 1)
    this.qualityRefForm.removeAt(rowIndex)
    if (this.qrTableEditStack.includes(rowIndex)) {
      this.qrTableEditStack.splice(this.qrTableEditStack.indexOf(rowIndex), 1)
    }
    this.qrTableEditStack = this.qrTableEditStack.map(function (value) {
      return value > rowIndex ? value - 1 : value;
    })
    this.generalInfoData.qualityReferences = [...this.generalInfoData.qualityReferences]
    
  }
  addQR() {
    this.qualityRefForm.push(new FormGroup({
      qualityUniqueId: new FormControl(''),
      qualityReferenceTypeId: new FormControl({}),
      qualityReference1: new FormControl(''),
      problemUniqueId: new FormControl(this.id)
    }))
    var j = [{
      qualityUniqueId: '',
      qualityReferenceTypeId: '',
      qualityReference1: '',
      problemUniqueId: ''
    }]
    this.generalInfoData.qualityReferences = [...this.generalInfoData.qualityReferences, ...j]
    this.qrTableEditStack.push(this.generalInfoData.qualityReferences.length - 1)

  }
  reset() {
    this.router.navigate(['project-hub/' + this.id + '/project-board'])
  }
  submitGeneralInfo() {
    var qr = []
    if (this.generalInfoData.qualityReferences.length > 0) {
      var genQRFORM = this.qualityRefForm.getRawValue()
      for (var quality of genQRFORM) {
        qr.push({
          qualityUniqueId: quality.qualityUniqueId,
          qualityReferenceTypeId: Object.keys(quality.qualityReferenceTypeId).length > 0 ? quality.qualityReferenceTypeId.lookUpId : '',
          qualityReference1: quality.qualityReference1,
          problemUniqueId: quality.problemUniqueId
        })
      }
    }
    var formValue = this.generalInfoForm.getRawValue()
    console.log(formValue)
    var submitObj = this.generalInfoData.projectData
    submitObj.problemTitle = formValue.problemTitle
    submitObj.parentProgramId = formValue.projectsingleid
    submitObj.problemType = formValue.problemType
    submitObj.projectDescription = formValue.projectDescription
    submitObj.primaryProductId = formValue.primaryProduct ? formValue.primaryProduct.productId : ''
    submitObj.otherImpactedProducts = formValue.otherImpactedProducts.length > 0 ? formValue.otherImpactedProducts.map(x => x.productId).join() : ''
    submitObj.portfolioOwnerId = Object.keys(formValue.portfolioOwner).length > 0 ? formValue.portfolioOwner.portfolioOwnerId : ''
    submitObj.executionScope = formValue.excecutionScope.length > 0 ? formValue.excecutionScope.map(x => x.portfolioOwnerId).join() : ''
    submitObj.emissionPortfolioId = Object.keys(formValue.enviornmentalPortfolio).length > 0 ? formValue.enviornmentalPortfolio.portfolioOwnerId : ''
    submitObj.isOeproject = formValue.isOeproject
    submitObj.oeprojectType = formValue.oeprojectType ? formValue.oeprojectType.lookUpId : ''
    submitObj.isCapsProject = formValue.isCapsProject
    submitObj.isTechTransfer = formValue.isTechTransfer
    submitObj.productionStepId = formValue.productionStepId
    submitObj.campaignPhaseId = formValue.campaignPhaseId
    submitObj.campaignTypeId = formValue.campaignTypeId
    submitObj.isArchived = formValue.isArchived
    console.log('Final Object', submitObj)
    console.log('Final Object', qr)
    this.apiService.bulkeditQualityReference(qr, this.id).then(resp => {
      this.apiService.editGeneralInfo(this.id, submitObj).then(res => {
        console.log("Success", res)
        this.projectHubService.isNavChanged.next(true)
        this.projectHubService.successSave.next(true)
        this.router.navigate(['project-hub/' + this.id + '/project-board'])
      })
    })

  }
}
