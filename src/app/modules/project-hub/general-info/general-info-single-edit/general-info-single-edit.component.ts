import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-general-info-single-edit',
  templateUrl: './general-info-single-edit.component.html',
  styleUrls: ['./general-info-single-edit.component.scss']
})
export class GeneralInfoSingleEditComponent implements OnInit {
  filterCriteria: any =  {}
  generalInfo = {}
  viewContent = false
  generalInfoForm = new FormGroup({
    problemTitle: new FormControl(''),
    parentProgram: new FormControl(''),
    problemType: new FormControl('Standard Project / Program'),
    projectDescription: new FormControl(''),
    primaryProduct: new FormControl({}),
    otherImpactedProducts: new FormControl([]),
    portfolioOwner: new FormControl({}),
    excecutionScope: new FormControl([]),
    enviornmentalPortfolio: new FormControl({}),
    isArchived: new FormControl(false)
  })
  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService) { }

  ngOnInit(): void {
    this.apiService.getGeneralInfoData(this.projectHubService.projectid).then((res: any) => {
      this.generalInfo = res
      this.filterCriteria = this.projectHubService.all
      this.generalInfoForm.patchValue({
        problemTitle: res.projectData.problemTitle,
        problemType: res.projectData.problemType,
        parentProgram: res.parentProject ? res.parentProject.problemTitle : '',
        projectDescription: res.projectData.projectDescription,
        primaryProduct: res.primaryProduct ? res.primaryProduct.fullProductName : '',
        otherImpactedProducts: res.otherImpactedProducts ? res.otherImpactedProducts : [],
        portfolioOwner: res.portfolioOwner ? res.portfolioOwner.portfolioOwner : '',
        excecutionScope: res.excecutionScope ? res.excecutionScope : [],
        enviornmentalPortfolio: res.enviornmentalPortfolio ? res.enviornmentalPortfolio.portfolioOwner : '',
        isArchived: res.projectData.isArchived
      })
      this.viewContent = true
    })
  }


  getExcecutionScope(): any {
    return this.filterCriteria.portfolioOwner.filter(x => x.isExecutionScope == true)
  }


  submitGI(){

  }
}
