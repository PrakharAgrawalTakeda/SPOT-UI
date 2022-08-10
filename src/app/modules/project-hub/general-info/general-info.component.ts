
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [],
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
