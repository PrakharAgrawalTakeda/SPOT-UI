
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { AuthService } from 'app/core/auth/auth.service';

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
  })
  projectTypeDropDrownValues = ["Standard Project / Program", "Simple Project"]
  formFieldHelpers: any
  constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, private portApiService: PortfolioApiService, private authService: AuthService) {

    this.generalInfoForm.controls.isOeproject.valueChanges.subscribe(res => {
      console.log(res)
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
            otherImpactedProducts: res.otherImpactedProducts,
            portfolioOwner: res.portfolioOwner,
            excecutionScope: res.excecutionScope,
            enviornmentalPortfolio: res.enviornmentalPortfolio,
            isOeproject: res.projectData.isOeproject,
            oeprojectType: res.projectData.oeprojectType == '' ? {} : lookup.find(x => x.lookUpId == res.projectData.oeprojectType),
            isCapsProject: res.projectData.isCapsProject,
            isTechTransfer: res.projectData.isTechTransfer,
            productionStepId: res.projectData.productionStepId,
            campaignPhaseId: res.projectData.campaignPhaseId,
            campaignTypeId: res.projectData.campaignTypeId,
            isQualityRef: false,
          })
          this.viewContent = true
        })
      })
    })
    this.disabler()
  }


  disabler() {
    this.generalInfoForm.controls.topsGroup.disable()
    this.generalInfoForm.controls.recordCreationDate.disable()
    this.generalInfoForm.controls.submittedBy.disable()
    this.generalInfoForm.controls.projectManager.disable()
    this.generalInfoForm.controls.sponsor.disable()
  }

  getPortfolioOwner(): any {
    return this.filterCriteria.portfolioOwner
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

  submitGeneralInfo() {

  }
}
