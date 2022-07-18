
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from 'app/shared/global-variables';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { id } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralInfoComponent implements OnInit {


  productId: string = ''
  otherimpactedproductId: string = ''
  emPortfolioOwnerId: string = ''
  selectedValue: any = {};
  isConfidential: string = ''
  problemTitle: string = ''
  problemType: string = ''
  tops: string = ''
  //createdDate = new Date()
  problemOwnerName: string = ''
  teamMemberName: string = ''
  pm: string = ''
  portfolioOwner: string = ''
  projectDescription: string = ''
  isOeproject: string = ''
  isTechTransfer: string = ''
  isCapsProject: string = ''
  productList = []
  emPortfolioOwnerList: any = []



  proControl = new FormControl('');
  parentproj = ''
  projects: any = []
  filteredProjects: any = [];

  myControl = new FormControl('');
  value = ''
  options: any = []
  filteredOptions: any;

  emControl = new FormControl('');
  values = ''
  ems: any = []
  filteredEms: any = [];


  fruitCtrl = new FormControl('');
  filteredFruits: any = [];
  otherimpactedproducts: string[] = [];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  generalinfoform = new FormGroup({
    //confidential: new FormControl(''),
    title: new FormControl(''),
    type: new FormControl(''),
    tops: new FormControl({value:'', disabled: true}),
    //createddate: new FormControl(''),
    submittedby: new FormControl({value:'', disabled: true}),
    sponsor: new FormControl({value:'', disabled: true}),
    pm: new FormControl({value:'', disabled: true}),
    portfolioowner: new FormControl({value:'', disabled: true}),
    projectdesc: new FormControl(''),
    //OE: new FormControl(''),
    //techtransfer: new FormControl(''),
    //caps: new FormControl(''),
    projectsingle: new FormControl(''),
    projectsingleid: new FormControl('')
  })

  projectid: string = ""
  projectdata: any = {}
  checked = false;
  filterlist: any = {}
  filtersnew: any = {
    "portfolioOwner": [],
    "executionScope": [],
    "people": [],
    "phase": [],
    "state": [],
    "products": [],
    "totalCAPEX": []
  }


  constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, private fb: FormBuilder, private http: HttpClient) {
  
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterfruit(fruit) : this.options.slice())),
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._primaryProductFilter(value)),
    );

    this.filteredEms = this.emControl.valueChanges.pipe(
      startWith(''),
      map(values => this._emFilters(values)),

    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.otherimpactedproducts.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.otherimpactedproducts.indexOf(fruit);

    if (index >= 0) {
      this.otherimpactedproducts.splice(index, 1);
    }
  }




  // End
  ngOnInit(): void {

    this.projectid = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getGeneralInfoData(this.projectid).then((res: any) => {
      this.projectdata = res
      this.generalinfoform.patchValue({
        //confidential: res.projectData.isConfidential,
        title: res.projectData.problemTitle,
        type: res.projectData.problemType,
        tops: res.pm.tops,
        //createddate: res.projectData.createdDate,
        submittedby: res.projectData.problemOwnerName,
        sponsor: res.sponsor.teamMemberName,
        pm: res.pm.pm,
        portfolioowner: res.pm.portfolioOwner,
        projectdesc: res.projectData.projectDescription,
       // OE: res.projectData.isOeproject,
        //techtransfer: res.projectData.isTechTransfer,
        //caps: res.projectData.isCapsProject,
        projectsingleid: res.projectData.parentProgramId
      })

      // if(this.projectdata.enviornmentalPortfolio.isPortfolioOwner){
      this.isConfidential = this.projectdata.projectData.isConfidential.toString()
      this.problemTitle = this.projectdata.projectData.problemTitle
      this.problemType = this.projectdata.projectData.problemType
      this.tops = this.projectdata.pm.tops
      // this.createdDate =  moment(this.projectdata.projectData.createdDate).format('DD/MM/YYY')
      this.problemOwnerName = this.projectdata.projectData.problemOwnerName
      this.teamMemberName = this.projectdata.sponsor.teamMemberName
      this.pm = this.projectdata.pm.pm
      this.portfolioOwner = this.projectdata.pm.portfolioOwner
      console.log(this.portfolioOwner)
      this.projectDescription = this.projectdata.projectData.projectDescription
      this.isOeproject = this.projectdata.projectData.isOeproject.toString()
      this.isTechTransfer = this.projectdata.projectData.isTechTransfer.toString()
      this.isCapsProject = this.projectdata.projectData.isCapsProject.toString()

      this.emControl.patchValue(this.projectdata.enviornmentalPortfolio.portfolioOwner)
      this.emPortfolioOwnerId = this.projectdata.enviornmentalPortfolio.emissionPortfolioId

      this.myControl.patchValue(this.projectdata.primaryProduct.fullProductName)
      console.log(this.projectdata.primaryProduct.fullProductName)
      this.productId = this.projectdata.primaryProduct.productId
      //          console.log(this.emPortfolioOwnerId)
      // this.isConfidential = this.projectdata.projectData.isConfidential

      // this.emPortfolioOwnerId = this.projectdata.enviornmentalPortfolio.portfolioOwnerId
      // }
      console.log(this.projectdata)

      this.otherimpactedproducts = this.projectdata.otherImpactedProducts.map(x => x.fullProductName)
      this.otherimpactedproductId = this.projectdata.otherImpactedProducts.productId
      console.log(this.otherimpactedproducts)
      //this.value = this.projectdata.primaryProduct.fullProductName
      //this.myControl.setValue(this.projectdata.primaryProduct.fullProductName)
      //this.values = this.projectdata.enviornmentalPortfolio.portfolioOwner

      //this.parentproj = this.projectdata.projectData.
      //this.myControl.setValue(this.projectdata.enviornmentalPortfolio.portfolioOwner)

      //this.selectedValue = this.projectdata.projectData.problemType;
      //console.log(this.value)
      // console.log(this.values)
    })



    this.apiService.getfilterlist().then((data: any) => {
      this.filterlist = data;
      this.productList = data.products
      this.emPortfolioOwnerList = this.filterlist.portfolioOwner.filter(x => x.isEmissionPortfolio == true)
      // this.filteredFruits = this.options
      //console.log(this.filterlist)
      console.log(this.filteredFruits)
    })

  }

  private _filterfruit(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  _primaryProductFilter(value: string): any {
    const filterValue = value.toLowerCase();
    return this.productList.filter(x => x.fullProductName.toLowerCase().includes(filterValue))

  }

  _emFilters(values: string): string[] {
    const filterValues = values.toLowerCase();
    return this.emPortfolioOwnerList.filter(x => x.portfolioOwner.toLowerCase().includes(filterValues));
  }

  selectprimaryProduct(option: any) {
    this.myControl.patchValue(option.option.viewValue)
    this.productId = option.option.value
    console.log(this.myControl.value)
    console.log(this.productId)
  }

  selectemPortfolio(option: any) {
    this.emControl.patchValue(option.option.viewValue)
    this.emPortfolioOwnerId = option.option.value
    console.log(this.emControl.value)
    console.log(this.emPortfolioOwnerId)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
//this.fruitCtrl.patchValue(option.option.viewValue)
//this.otherimpactedproductId = option.option.value
    this.otherimpactedproducts.push(event.option.viewValue);
     this.fruitInput.nativeElement.value = '';
     this.fruitCtrl.setValue(null);
  }

  // selected(option: any) {
  //   this.otherimpactedproducts.push(option.option.viewValue);
  //   this.fruitInput.nativeElement.value = '';
  //   this.fruitCtrl.setValue(null);
  //   console.log('other')
  //   console.log(this.otherimpactedproducts)
  // }

  submitgeneralinfo() {
//console.log(this.isConfidential)
    const body = {
      "problemUniqueId": this.projectdata.projectData.problemUniqueId,
      "problemType": this.generalinfoform.controls['title'].value,
      "problemTitle": this.problemTitle,
      "problemId": this.projectdata.projectData.problemId,
      "portfolioOwnerId": this.projectdata.pm.portfolioOwnerId,
      "problemOwnerId": this.projectdata.projectData.problemOwnerId,
      "problemOwnerName": this.projectdata.projectData.problemOwnerName,
      "parentProgramId": this.generalinfoform.controls['projectsingleid'].value,
      "primaryProductId": this.myControl.value,
      "projectDescription": this.projectDescription,
      "strategicRationale": this.projectdata.projectData.strategicRationale,
      "projectClassificationId": this.projectdata.projectData.projectClassificationId,
      "executionScope": this.projectdata.projectData.executionScope,
      "otherImpactedProducts": this.fruitCtrl.value,
      "campaignTypeId": this.projectdata.projectData.campaignTypeId,
      "campaignPhaseId": this.projectdata.projectData.campaignPhaseId,
      "productionStepId": this.projectdata.projectData.productionStepId,
      "isConfidential": this.isConfidential,
      "createdDate": moment(this.projectdata.projectData.createdDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
      "isOeproject": this.isOeproject,
      "oeprojectType": this.projectdata.projectData.oeprojectType,
      "svpelementTypeId": this.projectdata.projectData.svpelementTypeId,
      "createdById": this.projectdata.projectData.createdById,
      "legacyPpmprojectId": this.projectdata.projectData.legacyPpmprojectId,
      "legacyPpmsystem": this.projectdata.projectData.legacyPpmsystem,
      "isTechTransfer": this.isTechTransfer,
      "dataMigrationInfo": this.projectdata.projectData.dataMigrationInfo,
      "projectSiteUrl": this.projectdata.projectData.projectSiteUrl,
      "isManualArchive": this.projectdata.projectData.isManualArchive,
      "archiveredBy": this.projectdata.projectData.archiveredBy,
      "archiveredOn": this.projectdata.projectData.archiveredOn,
      "isArchived": this.projectdata.projectData.isArchived,
      "agilePrimaryWorkstream": this.projectdata.projectData.agilePrimaryWorkstream,
      "agileSecondaryWorkstream": this.projectdata.projectData.agileSecondaryWorkstream,
      "agileWave": this.projectdata.projectData.agileWave,
      "targetEndState": this.projectdata.projectData.targetEndState,
      "primaryKpi": this.projectdata.projectData.primaryKpi,
      "benefitsRealizedOutcome": this.projectdata.projectData.benefitsRealizedOutcome,
      "isCapsProject": this.projectdata.projectData.isCapsProject,
      "calculatedEmissionsImpact": this.projectdata.projectData.calculatedEmissionsImpact,
      "emissionsImpactRealizationDate": moment(this.projectdata.projectData.emissionsImpactRealizationDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
      "emissionPortfolioId": this.emPortfolioOwnerId,
      "noCarbonImpact": this.projectdata.projectData.noCarbonImpact,
      "isGoodPractise": this.projectdata.projectData.isGoodPractise,
      "energyCostImpactPerYear": this.projectdata.projectData.energyCostImpactPerYear,
      "isPobos": this.projectdata.projectData.isPobos,
      "isSiteAssessment": this.projectdata.projectData.isSiteAssessment,
      "poboscategory": this.projectdata.projectData.poboscategory,
      "siteAssessmentCategory": this.projectdata.projectData.siteAssessmentCategory,
      "keyTakeaways": this.projectdata.projectData.keyTakeaways,
      "waterImpactUnits": this.projectdata.projectData.waterImpactUnits,
      "waterImpactCost": this.projectdata.projectData.waterImpactCost,
      "wasteImpactUnits": this.projectdata.projectData.wasteImpactUnits,
      "wasteImpactCost": this.projectdata.projectData.wasteImpactCost,
      "energyImpact": this.projectdata.projectData.energyImpact,
      "isGmsgqltannualMustWin": this.projectdata.projectData.isGmsgqltannualMustWin,
      "strategicYearId": this.projectdata.projectData.strategicYearId,
      "annualMustWinId": this.projectdata.projectData.annualMustWinId,
      "wasteLandfillImpactUnits": this.projectdata.projectData.wasteLandfillImpactUnits,
      "energyCostImpactPerYearFxconv": this.projectdata.projectData.energyCostImpactPerYearFxconv
    }

    this.apiService.putGeneralInfoData(this.projectdata.projectData.problemUniqueId, body).then()

  }
}
