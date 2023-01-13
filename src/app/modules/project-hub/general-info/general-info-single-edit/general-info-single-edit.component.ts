import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EventType } from '@azure/msal-browser';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { AuthService } from 'app/core/auth/auth.service';
import { I } from '@angular/cdk/keycodes';
import { QualityRefBulkEditComponent } from '../quality-ref-bulk-edit/quality-ref-bulk-edit.component';

@Component({
  selector: 'app-general-info-single-edit',
  templateUrl: './general-info-single-edit.component.html',
  styleUrls: ['./general-info-single-edit.component.scss']
})
export class GeneralInfoSingleEditComponent implements OnInit{
  // @ViewChild(QualityRefBulkEditComponent) child
  @Output() eventName = new EventEmitter<EventType>();
  // @Output() updateDataEvent = new EventEmitter<string>();
  @Input() mode: 'General-Info' | 'Project-Creation' = 'General-Info';
  @Input() calledFrom: string = "";
  @Input() BasicsForm: string = "";
  @Input() DetailsForm: string = "";
  @Input() DetailsForm2:string = "";
  @Input() ReviewForm: string = "";
  @Input() CreateForm: FormGroup;
  reqName: boolean = false;
  reqPortfolio: boolean = false;
  reqUser: boolean = false;
  reqProduct: boolean = false;
  reqDesc: boolean = false;
  reqOwning: boolean = false;
  KPIlookupdata: any = [];
  filterCriteria: any = {}
  generalInfo: any = {}
  lookupdata: any = [];
  oeProjectType: any = [];
  campaignPhase: any = [];
  productionSteps: any = [];
  campaignType: any = [];
  primWorkstream: any = [];
  agileWave: any = [];
  POBOSType: any = [];
  siteAssessmentType: any = [];
  qualityType: any = [];
  startegicYear: any = [];
  AnnualMustWin: any = [];
  qrTableEditStack = []
  projectTypeDropDrownValues = ["Standard Project / Program", "Simple Project"]
  OEDropDrownValues = ["Yes", "No"]
  viewContent = false
  tableData: any = []
  qualityForm = new FormArray([])
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

    SubmittedBy: new FormControl(''),
    targetGoalSituation: new FormControl(''),
    oeProject: new FormControl(''),
    qualityReference: new FormControl(''),
    techTransfer: new FormControl(''),
    primaryKPI: new FormControl(''),
    AgileProject: new FormControl(''),
    siteAssignment: new FormControl(''),
    POBOS: new FormControl(''),
    oeProjectType: new FormControl(''),
    campaignPhase: new FormControl(''),
    productionSteps: new FormControl(''),
    campaignType: new FormControl(''),
    agilePrimaryWorkstream: new FormControl(''),
    agileSecondaryWorkstream: new FormControl(''),
    agileWave: new FormControl(''),
    POBOSType: new FormControl(''),
    siteAssessmentType: new FormControl(''),
    quality: new FormControl(new FormArray([])),
    StrategicDeployment: new FormControl(''),
    StrategicYear: new FormControl(''),
    AnnualMustWin: new FormControl(''),
  })

  @Output() newItemEvent = new EventEmitter<FormGroup>();

  addNewItem() {
    this.newItemEvent.emit(this.generalInfoForm);
  }
 

  // ngAfterViewInit(): void {
  //   this.generalInfoForm.patchValue({
  //     quality: this.child.qualityRefForm
  //   })
  // }

  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService, private apiService2: PortfolioApiService, public auth: AuthService) {
    if (this.mode == 'General-Info') {
      this.generalInfoForm.valueChanges.subscribe(res => {
        if (this.viewContent) {
          this.projectHubService.isFormChanged = true
        } 
      })
      this.generalInfoForm.controls.problemTitle.valueChanges.subscribe(res => {
        console.log("Problem title changed");
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
  }
  
  async ngOnInit(): Promise<void> {
debugger;
  
    console.log("From general info " + history.state, this.generalInfoForm);
    this.auth.KPIMaster().then((kpis: any) => {
      this.KPIlookupdata = kpis;
    })
    if (this.BasicsForm != "" || this.DetailsForm != "" || this.ReviewForm != "") {
    // if (this.mode == 'Project-Creation') {
      this.generalInfoForm = this.CreateForm;

      this.apiService.getfilterlist().then(data => {
        this.filterCriteria = data
        this.owningOrganizationValues = this.filterCriteria.defaultOwningOrganizations;
      });
      this.auth.lookupMaster().then(res => {
        this.lookupdata = res;
        this.oeProjectType = this.lookupdata.filter(x => x.lookUpParentId == '04D143E7-CAA7-4D8D-88C3-A6CB575890A3');
        this.oeProjectType.sort((a, b) => {
          return a.lookUpOrder - b.lookUpOrder;
        })
        this.campaignPhase = this.lookupdata.filter(x => x.lookUpParentId == '183dc1f1-06ba-4022-bd6f-ae07f70751e2');
        this.campaignPhase.sort((a, b) => {
          return a.lookUpOrder - b.lookUpOrder;
        })
        this.productionSteps = this.lookupdata.filter(x => x.lookUpParentId == 'b137412d-8008-4446-8fe6-c56a06b83174');
        this.productionSteps.sort((a, b) => {
          return a.lookUpOrder - b.lookUpOrder;
        })
        this.campaignType = this.lookupdata.filter(x => x.lookUpParentId == '01a49f16-0744-4100-ae8a-ec2e469dbf74');
        this.campaignType.sort((a, b) => {
          return a.lookUpOrder - b.lookUpOrder;
        })
        this.primWorkstream = this.lookupdata.filter(x => x.lookUpParentId == 'f4486388-4c52-48fc-8c05-836878da2247');
        this.primWorkstream.sort((a, b) => {
          return a.lookUpOrder - b.lookUpOrder;
        })
        this.agileWave = this.lookupdata.filter(x => x.lookUpParentId == '4bdbcbca-90f2-4c7b-b2a5-c337446d60b1');
        this.agileWave.sort((a, b) => {
          return a.lookUpOrder - b.lookUpOrder;
        })
        this.POBOSType = this.lookupdata.filter(x => x.lookUpParentId == 'A9AB0ADC-AA10-44C1-A99B-3BEB637D0A4E');
        this.POBOSType.sort((a, b) => {
          return a.lookUpOrder - b.lookUpOrder;
        })
        this.siteAssessmentType = this.lookupdata.filter(x => x.lookUpParentId == '1DB73E6F-DD4B-44FF-8234-CE5FB3EC68BC');
        this.siteAssessmentType.sort((a, b) => {
          return a.lookUpOrder - b.lookUpOrder;
        })
        this.qualityType = this.lookupdata.filter(x => x.lookUpParentId == 'A4C55F7E-C213-401E-A777-3BA741FF5802');
        this.qualityType.sort((a, b) => {
          return a.lookUpOrder - b.lookUpOrder;
        })
        this.startegicYear = this.lookupdata.filter(x => x.lookUpParentId == '459db0af-bad2-4036-8c9c-928b3c6f8bac');
        this.qualityType.sort((a, b) => {
          return a.lookUpOrder - b.lookUpOrder;
        })
        this.AnnualMustWin = this.lookupdata.filter(x => x.lookUpParentId == '265400f0-6202-469b-bb3d-38727928d1b2');
        this.qualityType.sort((a, b) => {
          return a.lookUpOrder - b.lookUpOrder;
        })
      })
      this.viewContent = true
    }
    else {
      if (this.mode == 'General-Info') {
        this.apiService.getGeneralInfoData(this.projectHubService.projectid).then((res: any) => {
          // this.apiService.getGeneralInfoData("150431af-43c0-40d3-9c24-bf841c595ee8").then((res: any) => {
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
          })
          this.owningOrganizationValues = this.projectHubService.all.defaultOwningOrganizations
          this.projectHubService.roleControllerControl.generalInfo.porfolioOwner || this.generalInfoForm.controls.problemType.value == 'Simple Project' ? this.generalInfoForm.controls.portfolioOwner.enable() : this.generalInfoForm.controls.portfolioOwner.disable()
          this.projectHubService.roleControllerControl.generalInfo.porfolioOwner ? this.generalInfoForm.controls.portfolioOwner.enable() : this.generalInfoForm.controls.portfolioOwner.disable()
          this.viewContent = true
        })
      }
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
    // return "";
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
    else if (name == "Portfolio Ownerhelp *" && value == "") {
      this.reqOwning = true;
    }
    else if (name == "None\nOwning Organizationhelp *" && value != "") {
      this.reqPortfolio = false;
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
    if (this.mode == 'General-Info') {
      this.apiService.editGeneralInfo(this.projectHubService.projectid, mainObj).then(res => {
        this.projectHubService.isNavChanged.next(true)
        this.projectHubService.submitbutton.next(true)
        this.projectHubService.successSave.next(true)
        this.projectHubService.toggleDrawerOpen('', '', [], '')
      })
    }
    else if (this.mode = 'Project-Creation') {
      this.eventName.emit();
    }
  }

  GetPortfolioOwnerr(){
    console.log("Mila portfolio ke nahi mila ?", this.generalInfoForm)
  }

}
