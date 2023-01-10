import { Component, OnInit } from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {ProjectHubService} from "../../project-hub.service";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-close-out-general-info',
  templateUrl: './close-out-general-info.component.html',
  styleUrls: ['./close-out-general-info.component.scss']
})
export class CloseOutGeneralInfoComponent implements OnInit {
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
        isArchived: new FormControl(false),
        owningOrganization: new FormControl(''),
        projectId: new FormControl(''),
        opu: new FormControl(''),
        executionScope: new FormControl(''),
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
                    var oeprojectypelist = res.projectData.oeprojectType && res.projectData.oeprojectType != '' ? res.projectData.oeprojectType.split(',') : []
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
                        oeprojectType: oeprojectypelist.length > 0 ? this.projectHubService.lookUpMaster.filter(x => res.projectData.oeprojectType.includes(x.lookUpId)) : [],
                        isCapsProject: res.projectData.isCapsProject,
                        isTechTransfer: res.projectData.isTechTransfer,
                        productionStepId: res.projectData.productionStepId,
                        campaignPhaseId: res.projectData.campaignPhaseId,
                        campaignTypeId: res.projectData.campaignTypeId,
                        isQualityRef: res.qualityReferences.length != 0,
                        isArchived: res.projectData.isArchived,
                        owningOrganization: res.projectData.defaultOwningOrganizationId ? res.projectData.defaultOwningOrganizationId : [],
                    })
                    this.viewContent = true
                })
            })
        })
        this.disabler()
    }
    disabler() {
        this.generalInfoForm.disable()
    }
    getImpactedProducts(): any {
        return ""
    }
    getExecutionScope(): any {
        //todo: change when api available
        return this.lookUpData.filter(x => x.lookUpParentId == "183dc1f1-06ba-4022-bd6f-ae07f70751e2")
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
    getOwningOrganization(): any {
        return this.generalInfoData.defaultOwningOrganizations;
    }
    getLookUpName(id: string): string {
        return id && id != '' ? this.lookUpData.find(x => x.lookUpId == id).lookUpName : ''
    }

}
