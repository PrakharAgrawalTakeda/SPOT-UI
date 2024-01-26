import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { RoleService } from 'app/core/auth/role.service';
import { MyPreferenceApiService } from '../my-preference-api.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent {
  preferenceForm = new FormGroup({
    role: new FormControl('')
  })
  archiveForm = new FormGroup({
    userAdid: new FormControl(''),
    includeArchiveProject: new FormControl(false)
  })
  lookupdata: any = []
  private initialized = false;
  toggle: boolean = false;

  constructor(private titleService: Title, public auth: AuthService, private roleService: RoleService, private apiService: MyPreferenceApiService, private msalService: MsalService,
    public fuseAlert: FuseConfirmationService) {

    this.archiveForm.valueChanges.subscribe(res => {
      console.log(this.archiveForm.getRawValue())
      if (this.initialized) {
        this.changeToggle()
      } else {
        this.initialized = true;
      }
    })
    //   this.archiveForm.controls.includeArchiveProject.valueChanges.subscribe(res => {
    //     if (this.initialized) {


    //   }
    // })
  }

  ngOnInit(): void {
    console.log("Project settings")
    this.auth.lookupMaster().then(res => {
      this.lookupdata = res
      this.titleService.setTitle("My Preferences")
    })
    this.dataloader()

  }

  dataloader() {
    this.apiService.getuserPreference(this.msalService.instance.getActiveAccount().localAccountId).then((res: any) => {

      this.archiveForm.patchValue({
        userAdid: res.userAdid,
        includeArchiveProject: res.includeArchiveProject
      })
    })
  }

  changeToggle() {
    this.initialized = false
    var archiveProject = this.archiveForm.getRawValue();

    if (archiveProject.includeArchiveProject == true) {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Are you sure?",
        "message": "Including archived projects in the portfolio center search may slow down the performance of SPOT and lead to increased response time. Are you sure you want to continue?",
        "icon": {
          "show": true,
          "name": "heroicons_outline:exclamation",
          "color": "warn"
        },
        "actions": {
          "confirm": {
            "show": true,
            "label": "Ok",
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
          this.archiveForm.patchValue({
            includeArchiveProject: true

          })
          var archiveProject = this.archiveForm.getRawValue();
          var mainObj = {
            userAdid: archiveProject.userAdid,
            includeArchiveProject: archiveProject.includeArchiveProject
          }
          this.apiService.updateuserPreference(this.msalService.instance.getActiveAccount().localAccountId, mainObj).then(res => {
            location.reload()
          })


        }
        else {

          location.reload()
        }
      })

    }
    else {
      var archiveProject = this.archiveForm.getRawValue();
      var mainObj = {
        userAdid: archiveProject.userAdid,
        includeArchiveProject: archiveProject.includeArchiveProject
      }
      this.apiService.updateuserPreference(this.msalService.instance.getActiveAccount().localAccountId, mainObj).then(res => {
        location.reload()
      })
    }



  }

}
