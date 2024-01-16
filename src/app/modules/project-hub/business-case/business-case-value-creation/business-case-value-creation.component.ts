import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-case-value-creation',
  templateUrl: './business-case-value-creation.component.html',
  styleUrls: ['./business-case-value-creation.component.scss']
})
export class BusinessCaseValueCreationComponent {
  option: string = ''
  ValueCaptureForm = new FormGroup({
    valueCaptureStart: new FormControl(''),
    primaryValueDriver: new FormControl(''),
    valueCommentary: new FormControl('')
  })
  valuecreationngxdata: any = []
  viewContent:boolean = true
  constructor(
    private _Activatedroute: ActivatedRoute) {}

  ngOnInit():void{
    this.ValueCaptureForm.disable()
    this.option = this._Activatedroute.parent.snapshot.routeConfig.path
  console.log(this.option)
  }
}
