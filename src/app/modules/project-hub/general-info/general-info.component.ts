
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
//  interface Type {
//    value: string;
//   viewValue: string;
//  }

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {
  //testing
  myControl = new FormControl('');
  options: any =  []
  filteredOptions: Observable<string[]>;
  ///////
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
  selectedValue: string;
  //  types: Type[] = [
  //    {value: 'Standard Project / Program', viewValue: 'Standard Project / Program'},
  //    {value: 'Simple Project', viewValue: 'Simple Project'}
  //  ];

  //isOetoggle = false;
  formGroup: FormGroup;
  constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, private fb: FormBuilder) { 

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }



  ngOnInit(): void {

    // this.formGroup = this.fb.group({
    //   projectType : ['']
    // });
    // this.setDefaultValue();
    this.projectid = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getGeneralInfoData(this.projectid).then((res: any) => {
      this.projectdata = res

      console.log(this.projectdata)
      this.selectedValue = this.projectdata.projectData.problemType;
      console.log(this.selectedValue)

    })

    this.apiService.getfilterlist().then((data: any) => {
      this.filterlist = data;
      this.options = this.filterlist.products.map(t=>t.fullProductName)
      console.log(this.options)
    })
    
  }

  // setDefaultValue(){
  //   this.formGroup.patchValue({
  //     projectType : this.projectdata.projectData.problemType
  //   })
  // }

   ngAfterViewInit(): void { }
   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
   selectoption(event: MatAutocompleteSelectedEvent, field: string): void {
     if(field == "Product"){
       this.filtersnew.products.push(event.option.value)
       this.filterlist.products =  this.filterlist.products.filter(x=> x.id != event.option.value.id)
       //console.log(this.filtersnew)
     }
  }
}
