import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { RoleService } from 'app/core/auth/role.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-team-add-single',
  templateUrl: './project-team-add-single.component.html',
  styleUrls: ['./project-team-add-single.component.scss']
})
export class ProjectTeamAddSingleComponent implements OnInit {
  @Input() mode: string;
  lookUpData: any = []
  Urlval: any;
  charterCount: number;

  projectTeamAddForm = new FormGroup({
    role: new FormControl({}),
    permission: new FormControl('BCEBDFAC-DB73-40D3-8EF0-166411B5322C'),
    usersingle: new FormControl({}),
    percentTime: new FormControl(),
    duration: new FormControl(),
    includeInCharter: new FormControl(false),
    includeInProposal: new FormControl(false),
  })
  formInital: boolean = false
  constructor(private Router: Router, public projecthubservice: ProjectHubService, public auth: AuthService, public role: RoleService, private apiService: ProjectApiService, public fuseAlert: FuseConfirmationService) {
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
    const url = this.Router.url;
    this.Urlval = url.substring(url.lastIndexOf('/') + 1);
    this.auth.lookupMaster().then((resp: any) => {
      this.lookUpData = resp
      this.formInital = true
      if (this.projecthubservice.all != []) {
        if (this.projecthubservice.all.filter(x => x.includeInProposal == true).length >= 5) {
          if (this.projectTeamAddForm.value.includeInProposal != true) {
            this.projectTeamAddForm.controls['includeInProposal'].disable()
          }
        }
        if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length >= 10) {
          if (this.projectTeamAddForm.value.includeInCharter != true) {
            this.projectTeamAddForm.controls['includeInCharter'].disable()
          }
        }
      }
    })
    this.charterCount = parseInt(localStorage.getItem('chartercount'));
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
    var projectTeam = this.projectTeamAddForm.getRawValue();
    if (projectTeam.includeInCharter === false) {
      if (Object.keys(this.projectTeamAddForm.controls.role.value).length > 0) {
        if (this.projectTeamAddForm.controls.percentTime.value < 0 || this.projectTeamAddForm.controls.percentTime.value > 100) {
          var comfirmConfig: FuseConfirmationConfig = {
            "title": "Percent time value cannot be greater than 100 or smaller than 0",
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
        } else {
          if (this.projectTeamAddForm.controls.duration.value < 0) {
            var comfirmConfig: FuseConfirmationConfig = {
              "title": "Duration value cannot be smaller than 0",
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
          } else {
              if (this.projectTeamAddForm.controls.duration.value % 1 != 0 || this.projectTeamAddForm.controls.percentTime.value % 1 != 0) {
                  var comfirmConfig: FuseConfirmationConfig = {
                      "title": "Duration and percent can't have decimals",
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
              }else{
                  this.projecthubservice.isFormChanged = false
                  var projectTeam = this.projectTeamAddForm.getRawValue();
                  // var projectDuration = this.Urlval == 'project-charter-project-teams' ? projectTeam.duration.replaceAll(',', '') : 0;
                  var mainObj = {
                      projectTeamUniqueId: "",
                      problemUniqueId: this.projecthubservice.projectid,
                      roleId: Object.keys(projectTeam.role).length > 0 ? projectTeam.role.lookUpId : "",
                      teamMemberAdId: Object.keys(projectTeam.usersingle).length > 0 ? projectTeam.usersingle.userAdid : "",
                      teamMemberName: Object.keys(projectTeam.usersingle).length > 0 ? projectTeam.usersingle.userDisplayName : "",
                      teamPermissionId: projectTeam.permission,
                      percentTime: projectTeam.percentTime == "" ? 0 : projectTeam.percentTime,
                      duration: projectTeam.duration == "" ? 0 : projectTeam.duration,
                      includeInCharter: projectTeam.includeInCharter,
                      includeInProposal: projectTeam.includeInProposal
                  }
                  this.apiService.addProjectTeam(mainObj).then(res => {
                      this.projecthubservice.submitbutton.next(true)
                      this.projecthubservice.toggleDrawerOpen('', '', [], '')
                  })
              }

          }
        }

      }
      else {
        var comfirmConfig: FuseConfirmationConfig = {
          "title": "Please select a Role",
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
      }
    }
    else if (this.charterCount < 10) {
      if (Object.keys(this.projectTeamAddForm.controls.role.value).length > 0) {

        this.projecthubservice.isFormChanged = false

        var projectDuration = this.Urlval == 'project-charter-project-teams' ? projectTeam.duration.replaceAll(',', '') : 0;

        var mainObj = {
          projectTeamUniqueId: "",
          problemUniqueId: this.projecthubservice.projectid,
          roleId: Object.keys(projectTeam.role).length > 0 ? projectTeam.role.lookUpId : "",
          teamMemberAdId: Object.keys(projectTeam.usersingle).length > 0 ? projectTeam.usersingle.userAdid : "",
          teamMemberName: Object.keys(projectTeam.usersingle).length > 0 ? projectTeam.usersingle.userDisplayName : "",
          teamPermissionId: projectTeam.permission,
          percentTime: projectTeam.percentTime == "" ? 0 : projectTeam.percentTime,
          duration: projectTeam.duration == "" ? 0 : projectTeam.duration,
          includeInCharter: projectTeam.includeInCharter,
          includeInProposal: projectTeam.includeInProposal
        }
        this.apiService.addProjectTeam(mainObj).then(res => {
          this.projecthubservice.submitbutton.next(true)
          this.projecthubservice.toggleDrawerOpen('', '', [], '')
        })
      }
    }
    else {
      var comfirmConfig: FuseConfirmationConfig = {
        "title": "Only 10 can be selected at a time for Team Charter slide display.",
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
    }
  }

  processMyValue(event): void {
    let numberVal = parseInt(event.target.value).toLocaleString();
    this.projectTeamAddForm.controls.duration.patchValue(numberVal);
  }
}
  