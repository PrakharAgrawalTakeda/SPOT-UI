import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  viewContent:boolean = false
  constructor(public projecthubservice: ProjectHubService) {
    this.KeyTakeawayForm.controls.primaryKpi.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projecthubservice.isFormChanged = true
      }
    })
   }

  ngOnInit(): void {
    if (this.projecthubservice.itemid && this.projecthubservice.itemid != "") {
      this.KeyTakeawayForm.controls.keyTakeaways.patchValue(this.projecthubservice.itemid)
    }
    this.viewContent = true
  }

  submitkTA() {
    this.projecthubservice.isFormChanged = false
    // this.apiService.updatePrimayKPI(this.projecthubservice.projectid, this.primaryKPIForm.controls.primaryKpi.value).then(res => {
    //   this.projecthubservice.submitbutton.next(true)
    //   this.projecthubservice.isNavChanged.next(true)
    //   this.projecthubservice.toggleDrawerOpen('', '', [], '')
    // })
  }

}
