import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-proposal-value-creation',
  templateUrl: './project-proposal-value-creation.component.html',
  styleUrls: ['./project-proposal-value-creation.component.scss']
})
export class ProjectProposalValueCreationComponent implements OnInit {
  ValueCaptureForm = new FormGroup({
    valueCaptureStart: new FormControl(''),
    primaryValueDriver: new FormControl(''),
    valueCommentary: new FormControl('')
  })
  valuecreationngxdata: any = []
  viewContent:boolean = true

  ngOnInit():void{
    this.ValueCaptureForm.disable()
  }
}
