import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';

@Component({
  selector: 'app-project-charter',
  templateUrl: './project-charter.component.html',
  styleUrls: ['./project-charter.component.scss']
})
export class ProjectCharterComponent implements OnInit {

  constructor(private projectHubService: ProjectHubService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute) { 
    this.projectHubService.submitbutton.subscribe(res=>{
      if(res == true){
        this.dataloader()
      }
    })
  }
  id: string = ''
  viewContent: boolean = false
  reportInfoData: any = {}
  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
    this.apiService.getReportInfoData(this.id).then(res => {
      console.log("Report Info", res)
      this.reportInfoData = res
      this.viewContent = true
    })
  }
}
