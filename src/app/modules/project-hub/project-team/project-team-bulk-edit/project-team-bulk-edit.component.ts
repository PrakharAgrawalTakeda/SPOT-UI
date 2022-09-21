import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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

  constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public authService: AuthService, public role: RoleService) {


  }
  teamMembers: any = []
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
          for (var i of this.teamMembers){
            this.projectTeamForm.push(new FormGroup({
              projectTeamUniqueId: new FormControl(i.projectTeamUniqueId),
              user: i.userId || i.userId != "" ? new FormControl({
                userAdid: i.userId,
                userDisplayName: i.userName
              }) : new FormControl({}),
              teamPermissionId: new FormControl(i.teamPermissionId),
              role: new FormControl(i.roleId || i.roleId != "" ? lookup.find(x => x.lookUpId == i.roleId) : {}),
            }))
          }
          
        }
        console.log(this.projectTeamForm.value)
        //enable Table
        this.viewContent = true
      })
    })
  }
  getPermissions(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == "474EE4AC-7A6C-4D30-B6EA-12A0D0F4BC2C" && x.lookUpId != "87DA989B-0BBA-406F-99C1-99E1E80EE9FE")
  }
  getRoles(): any {
    return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
  }

  getLookUpName(id: string): string {
    return id && id != '' ? this.lookupdata.find(x => x.lookUpId == id).lookUpName : ''
  }

 
  //Table Controls
  addPT() {
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
      teamPermissionId: new FormControl(''),
      role: new FormControl({}),
    }))
    this.teamMembers = [...this.teamMembers, ...j]
    this.ptTableEditStack.push(this.teamMembers.length - 1)
  }
  deletePT(rowIndex: number) {
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
  ptTableEditRow(row: number) {
    if (!this.ptTableEditStack.includes(row)) {
      this.ptTableEditStack.push(row)
    }
  }

}
