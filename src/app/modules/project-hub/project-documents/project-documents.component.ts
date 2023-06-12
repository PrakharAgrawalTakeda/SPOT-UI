import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-documents',
  templateUrl: './project-documents.component.html',
  styleUrls: ['./project-documents.component.scss']
})
export class ProjectDocumentsComponent implements OnInit {

  id: string = ''
  projectData: any = {}
  sharepointLink: any = null
  viewContent: boolean = false
  isCreate: boolean = true
  constructor(private projectHubService: ProjectHubService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute, private sanitizer: DomSanitizer) {

  }


  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getproject(this.id).then((data: any) => {
      this.projectData = data
      console.log("Project Data", this.projectData)
      if (this.projectData.projectSiteUrl) {
        if (this.projectData.projectSiteUrl != '') {
          this.sharepointLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.projectData.projectSiteUrl);
          this.isCreate = false
        }
      }
      this.viewContent = true
    })
  }
}
