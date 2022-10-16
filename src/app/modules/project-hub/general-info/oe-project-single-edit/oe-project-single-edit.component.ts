import { Component, OnInit } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-oe-project-single-edit',
  templateUrl: './oe-project-single-edit.component.html',
  styleUrls: ['./oe-project-single-edit.component.scss']
})
export class OeProjectSingleEditComponent implements OnInit {
  viewContent: boolean = false
  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService) { }

  ngOnInit(): void {
    this.dataloader()    
  }
  dataloader(){
    this.viewContent = true
  }

}
