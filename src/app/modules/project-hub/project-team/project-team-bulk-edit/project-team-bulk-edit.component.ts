import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { RoleService } from 'app/core/auth/role.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-project-team-bulk-edit',
  templateUrl: './project-team-bulk-edit.component.html',
  styleUrls: ['./project-team-bulk-edit.component.scss']
})
export class ProjectTeamBulkEditComponent implements OnInit {

  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public authService: AuthService, public role: RoleService, public fuseAlert: FuseConfirmationService) {
    this.projectTeamForm.valueChanges.subscribe(res => {
      if (this.viewContent == true) {
        this.formValue()
        console.log("DB", this.teamMembersDb)
        console.log("SUB", this.teamMembersSubmit)
        if (JSON.stringify(this.teamMembersDb) != JSON.stringify(this.teamMembersSubmit)) {
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
  teamMembersSubmit = []
  viewContent: boolean = false
  lookupdata: any[]
  ptTableEditStack = []
  projectTeamForm = new FormArray([])
  ngOnInit(): void {
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
              "teamMemberAdId": x.userId,
              "teamMemberName": x.userName,
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
              user: i.userId || i.userId != "" ? new FormControl({
                userAdid: i.userId,
                userDisplayName: i.userName
              }) : new FormControl({}),
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
    if (j.some(x => x.role.lookUpId == '17d65016-0541-4fcc-8a9c-1db0597817cc') && j.some(x => x.role.lookUpId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
      return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && !['17d65016-0541-4fcc-8a9c-1db0597817cc', 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8'].includes(x.lookUpId))
    }
    else if (j.some(x => x.role.lookUpId == '17d65016-0541-4fcc-8a9c-1db0597817cc')) {
      return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != '17d65016-0541-4fcc-8a9c-1db0597817cc')
    }
    else if (j.some(x => x.role.lookUpId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
      return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')
    }
    return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
  }

  getLookUpName(id: string): string {
    return id && id != '' ? this.lookupdata.find(x => x.lookUpId == id).lookUpName : ''
  }

  formValue() {
    var form = this.projectTeamForm.getRawValue()
    if (form.length > 0) {
      this.teamMembersSubmit = []
      for (var i of form) {
        this.teamMembersSubmit.push({
          "projectTeamUniqueId": i.projectTeamUniqueId,
          "problemUniqueId": i.problemUniqueId,
          "roleId": Object.keys(i.role).length > 0 ? i.role.lookUpId : '',
          "teamMemberAdId": Object.keys(i.user).length > 0 ? i.user.userAdid : '',
          "teamMemberName": Object.keys(i.user).length > 0 ? i.user.userDisplayName : '',
          "teamPermissionId": i.teamPermissionId,
          "percentTime": i.percentTime,
          "duration": i.duration,
          "includeInCharter": i.includeInCharter,
          "includeInProposal": i.includeInProposal
        })
      }
    }
    else {
      this.teamMembersSubmit = []
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
    this.formValue()
    if (JSON.stringify(this.teamMembersDb) != JSON.stringify(this.teamMembersSubmit)) {
      console.log(this.teamMembersSubmit)
      this.projecthubservice.isFormChanged = false
      this.formValue()
      /*if (this.teamMembersSubmit.some(x => x.teamMemberAdId == "")) {
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
      }
      else {*/
      this.apiService.bulkeditProjectTeam(this.teamMembersSubmit, this.projecthubservice.projectid).then(res => {
        this.projecthubservice.submitbutton.next(true)
        this.projecthubservice.toggleDrawerOpen('', '', [], '')
      })
    }
    else {
      this.projecthubservice.submitbutton.next(true)
      this.projecthubservice.toggleDrawerOpen('', '', [], '')
    }
  }
  deleteShowLogic(rowIndex: number): boolean {
    var j = this.projectTeamForm.controls[rowIndex]['controls']['role'].value
    if (Object.keys(j).length > 0) {
      if (j.lookUpId == '17d65016-0541-4fcc-8a9c-1db0597817cc' || j.lookUpId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8') {
        return false
      }
    }
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
    this.projectTeamForm.push(new FormGroup({
      projectTeamUniqueId: new FormControl(''),
      user: new FormControl({}),
      teamPermissionId: new FormControl("BCEBDFAC-DB73-40D3-8EF0-166411B5322C"),
      role: new FormControl({}),
      percentTime: new FormControl(0),
      duration: new FormControl(0),
      includeInCharter: new FormControl(false),
      includeInProposal: new FormControl(false),
      problemUniqueId: new FormControl(this.projecthubservice.projectid),
    }))
    this.teamMembers = [...this.teamMembers, ...j]
    this.ptTableEditStack.push(this.teamMembers.length - 1)
    var div = document.getElementsByClassName('datatable-scroll')[0]
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
      "message": "Are you sure you want Delete this Record?",
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
      if (Object.keys(this.projectTeamForm.at(row).value.user).length > 0) {
        this.findRoles(this.projectTeamForm.at(row).value.user.userAdid, row)
      }
      this.ptTableEditStack.push(row)
    }
  }

}
