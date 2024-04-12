import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup } from '@angular/forms';
import { primaryRoles, secondaryRoles } from 'app/shared/roles';
import { RoleService } from 'app/core/auth/role.service';
import { AdminApiService } from '../admin-api.service';
@Component({
  selector: 'app-manage-users-edit',
  templateUrl: './manage-users-edit.component.html',
  styleUrls: ['./manage-users-edit.component.scss']
})
export class ManageUsersEditComponent implements OnInit {
  viewContent = true
  managerUserRolesForm = new FormGroup({
    user: new FormControl({}),
    userPrimaryRole: new FormControl({}),
    userSecondaryRoles: new FormControl([])
  })
  primaryRoles = primaryRoles
  secondaryRoles = secondaryRoles
  isUserSelected: boolean = false
  constructor(public adminService: AdminService, private roleService: RoleService, private adminApiService: AdminApiService) {
    this.managerUserRolesForm.controls.user.valueChanges.subscribe((res: any) => {
      this.isUserSelected = false
      this.managerUserRolesForm.patchValue({
        userPrimaryRole: {},
        userSecondaryRoles: []
      })
      if (Object.keys(res).length > 0) {
        this.roleService.getCurrentRole(res.userAdid).then((resp: any) => {
          console.log(resp)
          this.managerUserRolesForm.patchValue({
            userPrimaryRole: resp.securityGroupId,
            userSecondaryRoles: this.prepareSecondaryRoles(resp.secondarySecurityGroupId)
          })
          this.isUserSelected = true
        })
      }
      else {
        this.isUserSelected = false
      }
      console.log(this.managerUserRolesForm.getRawValue())
    })
  }

  ngOnInit(): void {
  }
  prepareSecondaryRoles(roles: any): any {
    if (roles?.length > 0) {
      var secondaryRoles = []
      roles.forEach(element => {
        secondaryRoles.push(this.secondaryRoles.find(x => x.roleId.toLowerCase() == element.toLowerCase()))
      });
      return secondaryRoles
    }
    return []
  }

  submitRolesChange() {
    var formValue: any = this.managerUserRolesForm.getRawValue()
    var roles = []
    roles.push(formValue.userPrimaryRole)
    if (formValue.userSecondaryRoles.length > 0) {
      var secondaryRoles = formValue.userSecondaryRoles.map(function (item) {
        return item['roleId'];
      });
      roles = roles.concat(secondaryRoles)
    }
    console.log(formValue)
    console.log(formValue.user.userAdid)
    console.log(roles.toString())
    this.adminApiService.updateRole(formValue.user.userAdid, roles.toString()).then(res=>{
      this.adminService.successSave.next(true)
      this.adminService.toggleDrawerOpen('', '', [], '')
    })
  }
}
