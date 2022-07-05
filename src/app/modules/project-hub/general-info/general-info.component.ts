
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalFiltersDropDown } from 'app/shared/global-filters';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// interface ProjectType {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {
  projectid: string = ""
  projectdata: any = {}
  checked = false;
  // projectType: ProjectType[] = [
  //   {value: 'Standard Project / Program', viewValue: 'Standard Project / Program'},
  //   {value: 'Simple Project', viewValue: 'Simple Project'}
  // ];

  //isOetoggle = false;
  constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute) { }



  ngOnInit(): void {


    this.projectid = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getGeneralInfoData(this.projectid).then((res: any) => {
      this.projectdata = res

      // if(isOeproject == "true")
      // this.projectdata.isOeproject = true
      // else
      // this.projectdata.isOeproject = false

      console.log(this.projectdata)


    })
  }

}
