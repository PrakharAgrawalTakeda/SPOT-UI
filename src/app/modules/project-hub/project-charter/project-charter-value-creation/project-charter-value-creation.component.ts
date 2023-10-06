import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-charter-value-creation',
  templateUrl: './project-charter-value-creation.component.html',
  styleUrls: ['./project-charter-value-creation.component.scss']
})
export class ProjectCharterValueCreationComponent {
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
