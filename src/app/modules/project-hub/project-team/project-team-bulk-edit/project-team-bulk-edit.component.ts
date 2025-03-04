import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { RoleService } from 'app/core/auth/role.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
import * as moment from "moment";
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-team-bulk-edit',
  templateUrl: './project-team-bulk-edit.component.html',
  styleUrls: ['./project-team-bulk-edit.component.scss']
})
export class ProjectTeamBulkEditComponent implements OnInit {
  @Input() mode: 'Normal' | 'Close-Out' | 'Project-Proposal' | 'Project-Charter' = 'Normal'
  constructor(private Router: Router, public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public authService: AuthService, public role: RoleService, public fuseAlert: FuseConfirmationService) {
    this.projectTeamForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.submitPrep()
        if (JSON.stringify(this.teamMembersDb) != JSON.stringify(this.formValue)) {
          this.projecthubservice.isFormChanged = true
        }
        else {
          this.projecthubservice.isFormChanged = false
        }
      }
    })
  }
  teamMembers = []
  teamMembersDb = []
  viewContent: boolean = false
  lookupdata: any[]
  ptTableEditStack = []
  formValue: any = []
  Urlval: any;
  charterCount: number;
  projectTeamForm = new FormArray([])
  ngOnInit(): void {
    // const url = this.Router.url;
    // this.Urlval = url.substring(url.lastIndexOf('/') + 1);
    this.dataloader()
  }
  dataloader() {
    this.apiService.getmembersbyproject(this.projecthubservice.projectid).then((res: any) => {
      this.authService.lookupMaster().then((lookup: any) => {
        console.log(res)
        this.teamMembers = res
        this.lookupdata = lookup
        //Initializing Bulk Edit
        if (this.teamMembers.length > 0) {
          this.teamMembersDb = this.teamMembers.map(x => {
            return {
              "projectTeamUniqueId": x.projectTeamUniqueId,
              "problemUniqueId": x.problemUniqueId,
              "roleId": x.roleId,
              "teamMemberAdId": x.userId ? x.userId : "",
              "teamMemberName": x.userName ? x.userName : "",
              "teamPermissionId": x.teamPermissionId,
              "percentTime": x.percentTime,
              "duration": x.duration,
              "includeInCharter": x.includeInCharter,
              "includeInProposal": x.includeInProposal
            }
          })
          for (var i of this.teamMembers) {
            this.projectTeamForm.push(new FormGroup({
              projectTeamUniqueId: new FormControl(i.projectTeamUniqueId),
              user: i?.userId ? new FormControl({
                userAdid: i.userId,
                userDisplayName: i.userName
              }) : new FormControl(null),
              teamPermissionId: new FormControl(i.teamPermissionId),
              role: new FormControl(i.roleId || i.roleId != "" ? lookup.find(x => x.lookUpId == i.roleId) : {}),
              percentTime: new FormControl(i.percentTime),
              duration: new FormControl(i.duration),
              includeInCharter: new FormControl(i.includeInCharter),
              includeInProposal: new FormControl(i.includeInProposal),
              problemUniqueId: new FormControl(i.problemUniqueId),
            }))
            if (i.roleId == '17d65016-0541-4fcc-8a9c-1db0597817cc' || i.roleId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8') {
              this.projectTeamForm.controls[this.projectTeamForm.value.length - 1]['controls']['role'].disable()
            }
          }

        }
        console.log(this.projectTeamForm.value)
        this.disabler()
        //enable Table
        this.viewContent = true
      })
    })
  }

  valueChanges(event: any, rowIndex: number) {
    console.log('Form Value', event)
    if (Object.keys(event).length > 0) {
      this.findRoles(event.userAdid, rowIndex)
    }
    else {
      this.projectTeamForm.controls[rowIndex].get('teamPermissionId').enable()
    }
  }
  getPermissions(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == "474EE4AC-7A6C-4D30-B6EA-12A0D0F4BC2C" && x.lookUpId != "87DA989B-0BBA-406F-99C1-99E1E80EE9FE")
  }
  getRoles(): any {
    var j = this.projectTeamForm.getRawValue()
    if (j.some(x => x.role?.lookUpId == '17d65016-0541-4fcc-8a9c-1db0597817cc') && j.some(x => x.role?.lookUpId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
      return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && !['17d65016-0541-4fcc-8a9c-1db0597817cc', 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8'].includes(x.lookUpId))
    }
    else if (j.some(x => x.role?.lookUpId == '17d65016-0541-4fcc-8a9c-1db0597817cc')) {
      return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != '17d65016-0541-4fcc-8a9c-1db0597817cc')
    }
    else if (j.some(x => x.role?.lookUpId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
      return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')
    }
    return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
  }

  getLookUpName(id: string): string {
    return id && id != '' ? this.lookupdata.find(x => x.lookUpId == id)?.lookUpName : ''
  }

  submitPrep() {
    this.formValue = []
    var formValue = this.projectTeamForm.getRawValue()
    for (var i of formValue) {
      this.formValue.push({
        projectTeamUniqueId: i.projectTeamUniqueId,
        problemUniqueId: i.problemUniqueId,
        roleId: i.role?.lookUpId ? i.role.lookUpId : '',
        teamMemberAdId: i.user?.userAdid ? i.user.userAdid: '',
        teamMemberName: i.user?.userDisplayName? i.user.userDisplayName: '',
        teamPermissionId: i.teamPermissionId,
        percentTime: i.percentTime,
        duration: i.duration,
        includeInCharter: i.includeInCharter,
        includeInProposal: i.includeInProposal
      })
    }

  }


  findRoles(adid: string, index: number) {
    this.role.getCurrentRoleRequest(adid).subscribe((response: any) => {
      console.log(response)
      if (response.securityGroupId != "F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F") {
        this.projectTeamForm.controls[index].get('teamPermissionId').patchValue("3448BD5C-38F4-4B3C-BA4C-C99E659DC0B0")
        this.projectTeamForm.controls[index].get('teamPermissionId').disable()
      }
      else {
        this.projectTeamForm.controls[index].get('teamPermissionId').enable()
      }
    })
  }

  submitProjectTeams() {
    this.submitPrep()
    if (this.formValue.filter(x => x.includeInCharter == true).length > 10 && this.mode == "Project-Charter") {
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
    else {
      if (JSON.stringify(this.teamMembersDb) != JSON.stringify(this.formValue)) {
        console.log(this.formValue)
        this.projecthubservice.isFormChanged = false
        this.submitPrep()
        if (this.formValue.some(x => x.roleId == "")) {
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
        else {
          if (this.formValue.some(x => x.percentTime > 100 || x.percentTime < 0)) {
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
            if (this.formValue.some(x => x.duration < 0)) {
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
              if ((this.formValue.some(x => x.duration % 1 != 0 || x.percentTime % 1 != 0)) && (this.mode == "Project-Proposal" || this.mode == "Project-Charter")) {
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
              } else {
                this.apiService.bulkeditProjectTeam(this.formValue, this.projecthubservice.projectid).then(res => {
                    if (this.mode == 'Project-Proposal') {
                        this.apiService.updateReportDates(this.projecthubservice.projectid, "ProjectProposalModifiedDate").then(secondRes => {
                            this.projecthubservice.isFormChanged = false
                            this.projecthubservice.isNavChanged.next(true)
                            this.projecthubservice.submitbutton.next(true)
                            this.projecthubservice.successSave.next(true)
                            this.projecthubservice.toggleDrawerOpen('', '', [], '')
                        })
                    }else if (this.mode == 'Project-Charter'){
                        this.apiService.updateReportDates(this.projecthubservice.projectid, "ModifiedDate").then(secondRes => {
                            this.projecthubservice.isFormChanged = false
                            this.projecthubservice.isNavChanged.next(true)
                            this.projecthubservice.submitbutton.next(true)
                            this.projecthubservice.successSave.next(true)
                            this.projecthubservice.toggleDrawerOpen('', '', [], '')
                        })
                    }else{
                        this.projecthubservice.isFormChanged = false
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.toggleDrawerOpen('', '', [], '')
                        this.projecthubservice.isNavChanged.next(true)
                        this.projecthubservice.successSave.next(true)
                    }

                })
              }
            }

          }
        }
      }
      else {
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.toggleDrawerOpen('', '', [], '')
        this.projecthubservice.isNavChanged.next(true)
        this.projecthubservice.successSave.next(true)
      }
    }

  }
  deleteShowLogic(rowIndex: number): boolean {
    var j = this.projectTeamForm.controls[rowIndex]['controls']['role'].value
    if (j) {
      if (j.lookUpId == '17d65016-0541-4fcc-8a9c-1db0597817cc' || j.lookUpId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8') {
        return false
      }
    }
    this.disabler()
    return true
  }
  //Table Controls
  addPT() {

    console.log("Initial view", document.getElementById('projectTeamTableDiv').scrollHeight)
    var j = [{
      projectTeamUniqueId: '',
      userId: '',
      teamPermissionId: '',
      userName: '',
      userEmail: '',
      userOfficeLocation: '',
      roleId: '',
      roleName: ''
    }]
    this.disabler()
    this.projectTeamForm.push(new FormGroup({
      projectTeamUniqueId: new FormControl(''),
      user: new FormControl(null),
      teamPermissionId: new FormControl("BCEBDFAC-DB73-40D3-8EF0-166411B5322C"),
      role: new FormControl(null),
      percentTime: new FormControl(0),
      duration: new FormControl(0),
      includeInCharter: new FormControl(false),
      includeInProposal: new FormControl(false),
      problemUniqueId: new FormControl(this.projecthubservice.projectid),
    }))
    this.teamMembers = [...this.teamMembers, ...j]
    this.ptTableEditStack.push(this.teamMembers.length - 1)
    var div = document.getElementsByClassName('ngx-datatable')[0]
    setTimeout(() => {
      div.scroll({
        top: div.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);

  }
  deletePT(rowIndex: number) {
    var comfirmConfig: FuseConfirmationConfig = {
      "title": "Are you sure?",
      "message": "Are you sure you want to delete this record?",
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
        this.teamMembers.splice(rowIndex, 1)
        this.projectTeamForm.removeAt(rowIndex)
        if (this.ptTableEditStack.includes(rowIndex)) {
          this.ptTableEditStack.splice(this.ptTableEditStack.indexOf(rowIndex), 1)
        }
        this.ptTableEditStack = this.ptTableEditStack.map(function (value) {
          return value > rowIndex ? value - 1 : value;
        })
        this.teamMembers = [...this.teamMembers]
      }
    })
  }
  ptTableEditRow(row: number) {
    if (!this.ptTableEditStack.includes(row)) {
      if (this.projectTeamForm.at(row)?.value?.user) {
        this.findRoles(this.projectTeamForm.at(row).value.user.userAdid, row)
      }
      this.ptTableEditStack.push(row)
    }
    this.disabler()
  }
  disabler() {
    var formValue = this.projectTeamForm.getRawValue()
    if (formValue.length > 0) {
      if (formValue.filter(x => x.includeInProposal == true).length < 5) {
        for (var i of this.projectTeamForm.controls) {
          i['controls']['includeInProposal'].enable()
        }
      } else {
        for (var i of this.projectTeamForm.controls) {
          if (i['controls']['includeInProposal'].value != true) {
            i['controls']['includeInProposal'].disable()
          }
        }
      }
    }
  }
  getNgxDatatableNumberHeader(): any {
    return ' ngx-number-header';
  }

  getNgxDatatableIconHeader(): any {
    return ' ngx-icon-header';
  }


  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
