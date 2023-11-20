import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from 'app/shared/global-variables';
import { RoleController } from 'app/shared/role-controller';
import { lastValueFrom } from 'rxjs';
import { F } from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  /* Roles
 SecurityGroupID='F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F'--SPOT Team Member
 SecurityGroupID='9E695295-DC5F-44A8-95F1-A329CD475203'--SPOT Project Manager
 SecurityGroupID='C9F323D4-EF97-4C2A-B748-11DB5B8589D0'--SPOT Portfolio Manager
 SecurityGroupID='C005FB71-C1FF-44D3-8779-5CA37643D794'--SPOT Confidential Manager
 SecurityGroupID='BDC4DF5A-14D6-4468-9238-B933CA6C1B46'--SPOT Capital Manager
 SecurityGroupID='500ee862-3878-43d9-9378-53feb1832cef'--SPOT Budget Administrators
 SecurityGroupID='0E83F6BE-79BE-426A-A316-F523FFAECC4F'--SPOT Business Admin
 SecurityGroupID='9E695295-DC5F-44A8-95F1-A329CD475203'--Business Admin and Portfolio Manager
 SecurityGroupID='BDC4DF5A-14D6-4468-9238-B933CA6C1B46,F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F'--Capital Manager and Team Member
 SecurityGroupID='BDC4DF5A-14D6-4468-9238-B933CA6C1B46,9E695295-DC5F-44A8-95F1-A329CD475203'--Capital Manager and Project Manager
 SecurityGroupID='BDC4DF5A-14D6-4468-9238-B933CA6C1B46,C9F323D4-EF97-4C2A-B748-11DB5B8589D0'--Capital Manager and Portfolio Manager
 SecurityGroupID='500ee862-3878-43d9-9378-53feb1832cef,F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F'--Budget Admin and Team Member
 SecurityGroupID='500ee862-3878-43d9-9378-53feb1832cef,9E695295-DC5F-44A8-95F1-A329CD475203'--Budget Admin and Project Manager
 SecurityGroupID='500ee862-3878-43d9-9378-53feb1832cef,C9F323D4-EF97-4C2A-B748-11DB5B8589D0'--Budget Admin and Portfolio Manager
 SecurityGroupID='0E83F6BE-79BE-426A-A316-F523FFAECC4F,F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F'--Business Admin and Team Member
 SecurityGroupID='0E83F6BE-79BE-426A-A316-F523FFAECC4F,9E695295-DC5F-44A8-95F1-A329CD475203'--Business Admin and Project Manager
 SecurityGroupID='0E83F6BE-79BE-426A-A316-F523FFAECC4F,C9F323D4-EF97-4C2A-B748-11DB5B8589D0'--Business Admin and Portfolio Manager
  */

  roleMaster: any = {}
  constructor(private http: HttpClient) { }
  roleController: RoleController = new RoleController;


  getRolesbyProjectData(projectid): RoleController {
    var localroleController = this.roleController
    localroleController.roleId = this.roleMaster.securityGroupId
    if (this.roleMaster.securityGroupId == 'F3A5B3D6-E83F-4BD4-8C30-6FC457D3404F') {
      localroleController.generalInfo.SPREdit = false
      if (!this.roleMaster.readWriteProjects.some(x => x == projectid)) {
        localroleController.projectHub.projectBoard = {
          askNeedEdit: false,
          riskIssuesEdit: false,
          overallStatusEdit: false,
          scheduleEdit: false,
          baselineedit: false,
          baselineproject: true,
          phaseState: false,
          keyAssumptionsEdit: false,
          operationalBenefitsEdit: false,
        }
        localroleController.projectTeam = false
        localroleController.projectBenefits = false
        localroleController.projectHub.hubSettings = false
        localroleController.projectHub.hubSettings = false
        localroleController.generalInfo.basicFields = false
        localroleController.generalInfo.porfolioOwner = false
        localroleController.projectHub.localAttributes = false
        localroleController.projectHub.CAPS = false
        if (!this.roleMaster?.secondarySecurityGroupId?.some(x=>x=='500ee862-3878-43d9-9378-53feb1832cef')) {
          localroleController.budgetAdmin = false
        }
        if (!this.roleMaster?.secondarySecurityGroupId?.some(x=>x=='C005FB71-C1FF-44D3-8779-5CA37643D794')) {
          localroleController.generalInfo.confidentialEdit = false
        }
      }
      else {
        localroleController.generalInfo.porfolioOwner = false
      }
    }
    else if (this.roleMaster.securityGroupId == '9E695295-DC5F-44A8-95F1-A329CD475203') {
      localroleController.generalInfo.SPREdit = false
      localroleController.generalInfo.porfolioOwner = false
      localroleController.projectManager = true;
      if (!this.roleMaster?.secondarySecurityGroupId?.some(x=>x=='500ee862-3878-43d9-9378-53feb1832cef')) {
        localroleController.budgetAdmin = false
      }
      if (!this.roleMaster?.secondarySecurityGroupId?.some(x=>x=='C005FB71-C1FF-44D3-8779-5CA37643D794')) {
        localroleController.generalInfo.confidentialEdit = false
      }
    }
    else if (this.roleMaster.securityGroupId == 'C9F323D4-EF97-4C2A-B748-11DB5B8589D0') {
      localroleController.generalInfo.SPREdit = false
      if (!this.roleMaster?.secondarySecurityGroupId?.some(x=>x=='500ee862-3878-43d9-9378-53feb1832cef')) {
        localroleController.budgetAdmin = false
      }
      if (!this.roleMaster?.secondarySecurityGroupId?.some(x=>x=='C005FB71-C1FF-44D3-8779-5CA37643D794')) {
        localroleController.generalInfo.confidentialEdit = false
      }
    }
    console.log("hello")
    return localroleController
  }


  getCurrentRoleRequest(userid) {
    var url = GlobalVariables.apiurl + "SecurityRoles/" + userid
    return this.http.get(url)
  }
  async getCurrentRole(userid) {
      var url = GlobalVariables.apiurl + "SecurityRoles/"+userid
      const abc$ = this.http.get(url)
      const response = await lastValueFrom(abc$)
      return response
  }
}
