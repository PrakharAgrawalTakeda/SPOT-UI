import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-proposal-value-creation',
  templateUrl: './project-proposal-value-creation.component.html',
  styleUrls: ['./project-proposal-value-creation.component.scss']
})
export class ProjectProposalValueCreationComponent {
  ValueCaptureForm = new FormGroup({
    valueCaptureStart: new FormControl(''),
    primaryValueDriver: new FormControl(''),
    valueCommentary: new FormControl('')
  })
  viewContent:boolean = true
}
