import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectApiService } from 'app/modules/project-hub/common/project-api.service';
import { ProjectHubService } from 'app/modules/project-hub/project-hub.service';

@Component({
  selector: 'app-key-takeaway-single-edit',
  templateUrl: './key-takeaway-single-edit.component.html',
  styleUrls: ['./key-takeaway-single-edit.component.scss']
})
export class KeyTakeawaySingleEditComponent implements OnInit {
  KeyTakeawayForm = new FormGroup({
    keyTakeaways: new FormControl('')
  })
  DatatoSend: any
  viewContent:boolean = false
  constructor(public projecthubservice: ProjectHubService, public apiService: ProjectApiService) {
    this.KeyTakeawayForm.controls.keyTakeaways.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projecthubservice.isFormChanged = true
      }
    })
   }

  ngOnInit(): void {
    if (this.projecthubservice.itemid && this.projecthubservice.itemid != "") {
      this.DatatoSend = this.projecthubservice.itemid
      this.KeyTakeawayForm.controls.keyTakeaways.patchValue(this.projecthubservice.all)
    }
    this.viewContent = true
  }

  submitkTA() {
    this.projecthubservice.isFormChanged = false
    this.DatatoSend.keyTakeaways = this.KeyTakeawayForm.controls.keyTakeaways.value
    this.apiService.editGeneralInfo(this.projecthubservice.projectid, this.DatatoSend).then(res => {
      this.projecthubservice.submitbutton.next(true)
      this.projecthubservice.isNavChanged.next(true)
      this.projecthubservice.toggleDrawerOpen('', '', [], '')
    })
  }

}
