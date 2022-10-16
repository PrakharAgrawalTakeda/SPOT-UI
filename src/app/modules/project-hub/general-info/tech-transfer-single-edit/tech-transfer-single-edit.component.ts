import { Component, OnInit } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-tech-transfer-single-edit',
  templateUrl: './tech-transfer-single-edit.component.html',
  styleUrls: ['./tech-transfer-single-edit.component.scss']
})
export class TechTransferSingleEditComponent implements OnInit {
  viewContent: boolean= false
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
