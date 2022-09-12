import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'app/core/auth/auth.service';
import { RoleService } from 'app/core/auth/role.service';
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
    permission: new FormControl(''),
    usersingle: new FormControl({}),
  })
  constructor(public projecthubservice: ProjectHubService, public auth: AuthService, public role: RoleService) {
    this.projectTeamAddForm.controls.usersingle.valueChanges.subscribe(res => {
      if (Object.keys(res).length != 0) {
        this.role.getCurrentRoleRequest(res.userAdid).subscribe((response: any) => {
          console.log(response)
          if (response.securityGroupId != "F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F") {
            this.projectTeamAddForm.controls.permission.patchValue("3448BD5C-38F4-4B3C-BA4C-C99E659DC0B0")
            this.projectTeamAddForm.controls.permission.disable()
          }
          else {
            this.projectTeamAddForm.controls.permission.patchValue("")
            this.projectTeamAddForm.controls.permission.enable()
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this.auth.lookupMaster().then((resp: any) => {
      this.lookUpData = resp
    })
  }
  getRoles(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
  }
  getPermissions(): any {
    return this.lookUpData.filter(x => x.lookUpParentId == "474EE4AC-7A6C-4D30-B6EA-12A0D0F4BC2C" && x.lookUpId != "87DA989B-0BBA-406F-99C1-99E1E80EE9FE")
  }
  submitProjectTeam() {

  }
}
