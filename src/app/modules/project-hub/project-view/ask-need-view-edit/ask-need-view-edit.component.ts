import { Component, OnInit } from '@angular/core';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-ask-need-view-edit',
  templateUrl: './ask-need-view-edit.component.html',
  styleUrls: ['./ask-need-view-edit.component.scss']
})
export class AskNeedViewEditComponent implements OnInit {
  formFieldHelpers: string[] = [''];
  constructor(public projecthubservice: ProjectHubService) {
  }

  ngOnInit(): void {

  }

}
