import { Component, OnInit } from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";

@Component({
  selector: 'app-state-check',
  templateUrl: './state-check.component.html',
  styleUrls: ['./state-check.component.scss']
})
export class StateCheckComponent implements OnInit {

  constructor(
      public projecthubservice: ProjectHubService,
      public fuseAlert: FuseConfirmationService,
  ) { }
  rows = [];
  ngOnInit(): void {
  }
  onSubmit(){
  }

}
