import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup } from '@angular/forms';
import { primaryRoles, secondaryRoles } from 'app/shared/roles';
import { RoleService } from 'app/core/auth/role.service';
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
  constructor(public adminService: AdminService, private roleService: RoleService) {
    this.managerUserRolesForm.controls.user.valueChanges.subscribe((res: any) => {
      console.log(res)
      if (Object.keys(res).length > 0) {
        this.roleService.getCurrentRole(res.userAdid).then((resp: any) => {
          console.log(resp)
          this.managerUserRolesForm.patchValue({
            userPrimaryRole: resp.securityGroupId
          })
          this.isUserSelected = true
        })
      }
      else {
        this.isUserSelected = false
        this.managerUserRolesForm.patchValue({
          userPrimaryRole: {},
          userSecondaryRoles: []
        })
      }
      console.log(this.managerUserRolesForm.getRawValue())
    })
  }
  ngOnInit(): void {
  }
}
