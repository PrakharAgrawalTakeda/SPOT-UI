import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { RoleService } from 'app/core/auth/role.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-project-team-add-single',
  templateUrl: './project-team-add-single.component.html',
  styleUrls: ['./project-team-add-single.component.scss']
})
export class ProjectTeamAddSingleComponent implements OnInit {
  lookUpData: any = []
  projectTeamAddForm = new FormGroup({
    role: new FormControl({}),
    permission: new FormControl('BCEBDFAC-DB73-40D3-8EF0-166411B5322C'),
    usersingle: new FormControl({}),
  })
  formInital: boolean = false
  constructor(public projecthubservice: ProjectHubService, public auth: AuthService, public role: RoleService, private apiService: ProjectApiService, public fuseAlert: FuseConfirmationService) {
    this.projectTeamAddForm.valueChanges.subscribe(res => {
      if (this.formInital == true) {
        this.projecthubservice.isFormChanged = true
      }
    }
    )
    this.projectTeamAddForm.controls.usersingle.valueChanges.subscribe(res => {
      if (Object.keys(res).length != 0) {
        this.role.getCurrentRoleRequest(res.userAdid).subscribe((response: any) => {
          console.log(response)
          if (response.securityGroupId != "F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F") {
            this.projectTeamAddForm.controls.permission.patchValue("3448BD5C-38F4-4B3C-BA4C-C99E659DC0B0")
            this.projectTeamAddForm.controls.permission.disable()
          }
          else {
            this.projectTeamAddForm.controls.permission.patchValue("BCEBDFAC-DB73-40D3-8EF0-166411B5322C")
            this.projectTeamAddForm.controls.permission.enable()
          }
        })
      }
      else {
        this.projectTeamAddForm.controls.permission.patchValue("BCEBDFAC-DB73-40D3-8EF0-166411B5322C")
        this.projectTeamAddForm.controls.permission.enable()
      }
    })
  }

  ngOnInit(): void {
    this.auth.lookupMaster().then((resp: any) => {
      this.lookUpData = resp
      this.formInital = true
    })
  }
  getRoles(): any {
    var j = this.projecthubservice.all
    if (j.some(x => x.roleId == '17d65016-0541-4fcc-8a9c-1db0597817cc') && j.some(x => x.roleId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
      return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && !['17d65016-0541-4fcc-8a9c-1db0597817cc', 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8'].includes(x.lookUpId))
    }
    else if (j.some(x => x.roleId == '17d65016-0541-4fcc-8a9c-1db0597817cc')) {
      return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != '17d65016-0541-4fcc-8a9c-1db0597817cc')
    }
    else if (j.some(x => x.roleId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
      return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')
    }
    return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
  }
  getPermissions(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "474EE4AC-7A6C-4D30-B6EA-12A0D0F4BC2C" && x.lookUpId != "87DA989B-0BBA-406F-99C1-99E1E80EE9FE")
  }
  submitProjectTeam() {
    //  if (Object.keys(this.projectTeamAddForm.controls.usersingle.value).length > 0) {
    this.projecthubservice.isFormChanged = false
    var projectTeam = this.projectTeamAddForm.getRawValue();
    var mainObj = {
      projectTeamUniqueId: "",
      problemUniqueId: this.projecthubservice.projectid,
      roleId: Object.keys(projectTeam.role).length > 0 ? projectTeam.role.lookUpId : "",
      teamMemberAdId: Object.keys(projectTeam.usersingle).length > 0 ? projectTeam.usersingle.userAdid : "",
      teamMemberName: Object.keys(projectTeam.usersingle).length > 0 ? projectTeam.usersingle.userDisplayName : "",
      teamPermissionId: projectTeam.permission,
      percentTime: 0,
      duration: 0,
      includeInCharter: false,
      includeInProposal: false
    }
    this.apiService.addProjectTeam(mainObj).then(res => {
      this.projecthubservice.submitbutton.next(true)
      this.projecthubservice.toggleDrawerOpen('', '', [], '')
    })
    // }
    /* else{
       var comfirmConfig: FuseConfirmationConfig = {
         "title": "Please select a Team Member Name",
         "message": "",
         "icon": {
           "show": true,
           "name": "heroicons_outline:exclamation",
           "color": "warning"
         },
         "actions": {
           "confirm": {
             "show": true,
             "label": "Okay",
             "color": "primary"
           },
           "cancel": {
             "show": false,
             "label": "Cancel"
           }
         },
         "dismissible": true
       }
       const alert = this.fuseAlert.open(comfirmConfig)
     }*/
  }
}
