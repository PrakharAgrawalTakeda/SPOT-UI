import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {
  projectid: string = ""
  projectdata: any = {}
  constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectid = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getGeneralInfoData(this.projectid).then((res: any) => {
      this.projectdata = res.projectData
      console.log("General Info")
      console.log(this.projectdata)
    })
  }

}
