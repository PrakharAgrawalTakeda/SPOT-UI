
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
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class GeneralInfoComponent implements OnInit {
  id: string = ""
  generalInfoData: any = {}
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
    projectDescription: new FormControl('')

  })
  formFieldHelpers: any
  constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute) {
    
   
   }
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader(): void {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getGeneralInfoData(this.id).then((res: any) => {
      console.log("General Info: ", res)
      this.generalInfoData = res
      this.generalInfoForm.patchValue({
        problemTitle: res.projectData.problemTitle,
        problemType: res.projectData.problemType,
        topsGroup: res.topsData ? res.topsData.topsgroup : '',
        recordCreationDate: res.projectData.createdDate,
        projectsingle: res.parentProject ? res.parentProject.problemTitle : '',
        projectsingleid: res.parentProject ? res.parentProject.problemUniqueId : '',
        submittedBy: res.projectData.problemOwnerName,
        projectManager: res.pm.pm,
        sponsor: res.pm.sponsor,
        projectDescription: res.projectData.projectDescription,
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

  submitGeneralInfo() {

  }
}
