import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-close-out-value-creation',
  templateUrl: './close-out-value-creation.component.html',
  styleUrls: ['./close-out-value-creation.component.scss']
})
export class CloseOutValueCreationComponent implements OnInit {
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
