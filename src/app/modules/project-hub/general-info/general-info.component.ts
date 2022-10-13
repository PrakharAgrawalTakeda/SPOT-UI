
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
    parentProgram: new FormControl(''),
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
        this.dataloader()
      }
    })
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
          this.projectHubService.lookUpMaster = lookup
          console.log('Filter Criteria:', filterres)
          this.filterCriteria = filterres
          console.log("General Info:", res)
          this.generalInfoData = res
          this.generalInfoForm.patchValue({
            problemTitle: res.projectData.problemTitle,
            problemType: res.projectData.problemType,
            topsGroup: res.topsData ? res.topsData.topsgroup : '',
            recordCreationDate: res.projectData.createdDate,
            parentProgram: res.parentProject ? res.parentProject.problemTitle : '',
            submittedBy: res.projectData.problemOwnerName,
            projectManager: res.portfolioCenterData.pm,
            sponsor: res.portfolioCenterData.sponsor,
            projectDescription: res.projectData.projectDescription,
            primaryProduct: res.primaryProduct?res.primaryProduct.fullProductName:'',
            otherImpactedProducts: res.otherImpactedProducts ? res.otherImpactedProducts : [],
            portfolioOwner: res.portfolioOwner ? res.portfolioOwner.portfolioOwner : '',
            excecutionScope: res.excecutionScope ? res.excecutionScope : [],
            enviornmentalPortfolio: res.enviornmentalPortfolio ? res.enviornmentalPortfolio.portfolioOwner : '',
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
    this.generalInfoForm.disable()
  }
  getExcecutionScope(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isExecutionScope == true)
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
}
