import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-oe-project-single-edit',
  templateUrl: './oe-project-single-edit.component.html',
  styleUrls: ['./oe-project-single-edit.component.scss']
})
export class OeProjectSingleEditComponent implements OnInit {
  viewContent: boolean = false
  projectData: any = {}
  generalInfoForm = new FormGroup({
    isOeproject: new FormControl(false),
    oeprojectType: new FormControl([]),
  })
  constructor(private apiService: ProjectApiService,
    public projectHubService: ProjectHubService,
    public fuseAlert: FuseConfirmationService) {
    this.generalInfoForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projectHubService.isFormChanged = true
      }
    })
    this.generalInfoForm.controls.isOeproject.valueChanges.subscribe(res => {
      if (this.viewContent) {
        if (res == false) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to remove the OE Project Information?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Remove",
                "color": "warn"
              },
              "cancel": {
                "show": true,
                "label": "Cancel"
              }
            },
            "dismissible": true
          }
          const alert = this.fuseAlert.open(comfirmConfig)
          alert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
              this.generalInfoForm.patchValue({
                oeprojectType: []
              })
            }
            else {
              this.generalInfoForm.controls.isOeproject.patchValue(true)
            }
          })
        }
      }
    })


  }

  ngOnInit(): void {
    this.dataloader()
  }
  dataloader() {
    this.apiService.getGeneralInfoData(this.projectHubService.projectid).then((res: any) => {
      this.projectData = res.projectData
      var oeprojectypelist = res.projectData.oeprojectType && res.projectData.oeprojectType != '' ? res.projectData.oeprojectType.split(',') : []
      this.generalInfoForm.patchValue({
        isOeproject: res.projectData.isOeproject,
        oeprojectType: oeprojectypelist.length > 0 ? this.projectHubService.lookUpMaster.filter(x => res.projectData.oeprojectType.includes(x.lookUpId)) : [],
      })
      this.viewContent = true
    })
  }
  getoeprojectType(): any {
    return this.projectHubService.lookUpMaster.filter(x => x.lookUpParentId == "04D143E7-CAA7-4D8D-88C3-A6CB575890A3")
  }
  OE() {
    this.projectHubService.isFormChanged = false
    var formValue = this.generalInfoForm.getRawValue()
    this.projectData.isOeproject = formValue.isOeproject
    if (this.projectData.isOeproject) {
      this.projectData.oeprojectType = formValue.oeprojectType.length > 0 ? formValue.oeprojectType.map(x => x.lookUpId).join() : ''
    }
    else {
      this.projectData.oeprojectType = ''
    }
    this.apiService.editGeneralInfo(this.projectHubService.projectid, this.projectData).then(res => {
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.successSave.next(true)
      this.projectHubService.toggleDrawerOpen('', '', [], '')
    })
  }
}
