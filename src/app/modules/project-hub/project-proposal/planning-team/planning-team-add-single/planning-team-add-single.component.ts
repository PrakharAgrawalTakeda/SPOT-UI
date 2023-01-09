import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProjectHubService} from "../../../project-hub.service";
import {AuthService} from "../../../../../core/auth/auth.service";
import {RoleService} from "../../../../../core/auth/role.service";
import {ProjectApiService} from "../../../common/project-api.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";

@Component({
    selector: 'app-planning-team-add-single',
    templateUrl: './planning-team-add-single.component.html',
    styleUrls: ['./planning-team-add-single.component.scss']
})
export class PlanningTeamAddSingleComponent implements OnInit {
    formFieldHelpers: string[] = [''];
    lookUpData: any = []
    projectTeamAddForm = new FormGroup({
        role: new FormControl({}),
        usersingle: new FormControl({}),
        percentage: new FormControl(''),
        duration: new FormControl(''),
        includeInProposal: new FormControl(''),
    })
    formInital: boolean = false

    constructor(public projecthubservice: ProjectHubService, public auth: AuthService, public role: RoleService, private apiService: ProjectApiService, public fuseAlert: FuseConfirmationService) {
        this.projectTeamAddForm.valueChanges.subscribe(res => {
                if (this.formInital == true) {
                    this.projecthubservice.isFormChanged = true
                }
            }
        )
    }

    ngOnInit(): void {
        this.auth.lookupMaster().then((resp: any) => {
            this.lookUpData = resp
            this.formInital = true
            this.projectTeamAddForm.patchValue({
                includeInProposal: false
            })
            if (this.projecthubservice.all != []) {
                if (this.projecthubservice.all.filter(x => x.includeInProposal == true).length >= 5) {
                    if (this.projectTeamAddForm.value.includeInProposal != true) {
                        this.projectTeamAddForm.controls['includeInProposal'].disable()
                    }
                }
            }
        })

        console.log("aaaaaaaaaaaaaaaaaaaa",this.projectTeamAddForm)
    }

    getRoles(): any {
        var j = this.projecthubservice.all
        if (j.some(x => x.roleId == '17d65016-0541-4fcc-8a9c-1db0597817cc') && j.some(x => x.roleId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
            return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && !['17d65016-0541-4fcc-8a9c-1db0597817cc', 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8'].includes(x.lookUpId))
        } else if (j.some(x => x.roleId == '17d65016-0541-4fcc-8a9c-1db0597817cc')) {
            return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != '17d65016-0541-4fcc-8a9c-1db0597817cc')
        } else if (j.some(x => x.roleId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
            return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')
        }
        return this.lookUpData.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
    }

    getPermissions(): any {
        return this.lookUpData.filter(x => x.lookUpParentId == "474EE4AC-7A6C-4D30-B6EA-12A0D0F4BC2C" && x.lookUpId != "87DA989B-0BBA-406F-99C1-99E1E80EE9FE")
    }

    submitProjectTeam() {
        if (Object.keys(this.projectTeamAddForm.controls.role.value).length > 0) {
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
        } else {
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
}
