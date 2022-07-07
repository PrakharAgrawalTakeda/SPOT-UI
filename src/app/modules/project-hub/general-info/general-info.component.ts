
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralInfoComponent implements OnInit {

selectedValue: any = {};

  myControl = new FormControl('');
  value = ''
  options: any =  []
  filteredOptions: Observable<string[]>;

  emControl = new FormControl('');
  values = ''
  ems: any =  []
  filteredEms: Observable<string[]>;

 
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  otherimpactedproducts: string[] = [];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

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
  filters: any = {
    "portfolioOwner": [],
    "phase": [],
    "executionScope": [],
    "people": [],
    "products": [],
    "state": [],
    "totalCAPEX": [],
    "gmsBudgetOwner": [],
    "oeProjectType": [],
    "projectType": [],
    "fundingStatus": [],
    "agileWorkstream": [],
    "agileWave": [],
    "primaryKPI": [],
    "startegicYear": [],
    "annualInitiatives": [],
    "topsGroup": [],
    "capsProject": [],
    "projectName": []
  }


  constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, private fb: FormBuilder) { 



    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterfruit(fruit) : this.options.slice())),
    );
  }


remove(fruit: string): void {
  const index = this.otherimpactedproducts.indexOf(fruit);

  if (index >= 0) {
    this.otherimpactedproducts.splice(index, 1);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.otherimpactedproducts.push(event.option.viewValue);
  this.fruitInput.nativeElement.value = '';
  this.fruitCtrl.setValue(null);
  //console.log(this.otherimpactedproducts)
}
private _filterfruit(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options.filter(fruit => fruit.toLowerCase().includes(filterValue));
}

// End
  ngOnInit(): void {



    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredEms = this.emControl.valueChanges.pipe(
      startWith(''),
      map(values => this._filters(values || '')),
    );

    this.projectid = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getGeneralInfoData(this.projectid).then((res: any) => {
      this.projectdata = res

      console.log(this.projectdata)
      this.otherimpactedproducts = this.projectdata.otherImpactedProducts.map(x=>x.fullProductName)
      this.value = this.projectdata.primaryProduct.fullProductName
      //this.myControl.setValue(this.projectdata.primaryProduct.fullProductName)
      this.values = this.projectdata.enviornmentalPortfolio.portfolioOwner
      //this.myControl.setValue(this.projectdata.enviornmentalPortfolio.portfolioOwner)
      
      this.selectedValue = this.projectdata.projectData.problemType;
      //console.log(this.selectedValue)
      //console.log(this.myControl)
    })

    this.apiService.getfilterlist().then((data: any) => {
      this.filterlist = data;
      this.options = this.filterlist.products.map(t=>t.fullProductName)
      this.filteredFruits = this.options
      //console.log(this.options)
    })
    
  }

   ngAfterViewInit(): void { }

   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filters(values: string): string[] {
    const filterValues = values.toLowerCase();

    return this.ems.filter(em => em.toLowerCase().includes(filterValues));
  }
   selectoption(event: MatAutocompleteSelectedEvent, field: string): void {
     if(field == "Product"){
       this.filtersnew.products.push(event.option.value)
       this.filterlist.products =  this.filterlist.products.filter(x=> x.id != event.option.value.id)
       //console.log(this.filtersnew)
     }
  }
}
