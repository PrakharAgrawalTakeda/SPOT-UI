import {Component} from '@angular/core';
import {ProjectApiService} from "../../../project-hub/common/project-api.service";
import {ProjectHubService} from "../../../project-hub/project-hub.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {RoleService} from "../../../../core/auth/role.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {Router} from "@angular/router";
import {MyPreferenceService} from "../../my-preference.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {GlobalBusinessCaseOptions} from "../../../../shared/global-business-case-options";

@Component({
    selector: 'app-milestone-set-view-edit',
    templateUrl: './milestone-set-view-edit.component.html',
    styleUrls: ['./milestone-set-view-edit.component.scss']
})
export class MilestoneSetViewEditComponent {
    constructor(public apiService: ProjectApiService, public myPreferenceService: MyPreferenceService, public authService: AuthService, public role: RoleService,
                public fuseAlert: FuseConfirmationService, private router: Router) {
        this.standardMilestonesForm.valueChanges.subscribe(res => {
            if (this.viewContent == true) {
                this.formValue()
                if (JSON.stringify(this.standardMilestonesDb) != JSON.stringify(this.standardMilestonesSubmit)) {
                    this.myPreferenceService.isFormChanged = true
                } else {
                    this.myPreferenceService.isFormChanged = false
                }
            }
        })
    }

    standardMilestones = []
    standardMilestonesDb = []
    standardMilestonesSubmit = []
    viewContent: boolean = false
    lookupdata: any[]
    smTableEditStack = []
    standardMilestonesForm = new FormArray([])

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.apiService.getKeyAssumptionsByOption(this.myPreferenceService.projectid, GlobalBusinessCaseOptions.OPTION_1).then((res: any) => {
            this.standardMilestones = res
            if (this.standardMilestones.length > 0) {
                this.standardMilestonesDb = this.standardMilestones.map(x => {
                    return {
                        "keyAssumptionUniqueId": x.keyAssumptionUniqueId,
                        "projectId": x.projectId,
                        "keyAssumption": x.keyAssumption,
                        "includeInCharter": x.includeInCharter,
                        "includeInBusinessCase": x.includeInBusinessCase,
                        "assumptionRationale": x.assumptionRationale,
                    }
                })
                for (var i of this.standardMilestones) {
                    this.standardMilestones.push(new FormGroup({
                        keyAssumptionUniqueId: new FormControl(i.keyAssumptionUniqueId),
                        projectId: new FormControl(i.projectId),
                        keyAssumption: new FormControl(i.keyAssumption),
                        includeInCharter: new FormControl(i.includeInCharter),
                        includeInBusinessCase: new FormControl(i.includeInBusinessCase),
                        assumptionRationale: new FormControl(i.assumptionRationale),
                    }))
                }
            }
            this.viewContent = true;
        })
    }

    formValue() {
        var form = this.standardMilestonesForm.getRawValue()
        if (form.length > 0) {
            this.standardMilestonesSubmit = []
            for (var i of form) {
                this.standardMilestonesSubmit.push({
                    "keyAssumptionUniqueId": i.keyAssumptionUniqueId,
                    "projectId": i.projectId,
                    "keyAssumption": i.keyAssumption,
                    "assumptionRationale": i.assumptionRationale,
                    "includeInCharter": i.includeInCharter,
                    "includeInBusinessCase": i.includeInBusinessCase,

                })
            }
        } else {
            this.standardMilestonesSubmit = []
        }
    }

    addSM() {
        var j = [{}]
        j = [{
            keyAssumptionUniqueId: '',
            projectId: '',
            keyAssumption: '',
            assumptionRationale: '',
            includeInCharter: false,
            includeInBusinessCase: false,
        }]
        this.standardMilestonesForm.push(new FormGroup({
            keyAssumptionUniqueId: new FormControl(''),
            projectId: new FormControl(this.myPreferenceService.projectid),
            keyAssumption: new FormControl(''),
            assumptionRationale: new FormControl(''),
            includeInCharter: new FormControl(false),
            includeInBusinessCase: new FormControl(false),
        }))

        this.standardMilestones = [...this.standardMilestones, ...j]
        this.smTableEditStack.push(this.standardMilestones.length - 1)
        var div = document.getElementsByClassName('datatable-scroll')[0]
        setTimeout(() => {
            div.scroll({
                top: div.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }, 100);

    }

    smTableEditRow(rowIndex) {
        if (!this.smTableEditStack.includes(rowIndex)) {
            this.smTableEditStack.push(rowIndex)
        }
    }

    deleteSM(rowIndex: number) {
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
                    this.standardMilestones.splice(rowIndex, 1)
                    this.standardMilestonesForm.removeAt(rowIndex)
                    if (this.smTableEditStack.includes(rowIndex)) {
                        this.smTableEditStack.splice(this.smTableEditStack.indexOf(rowIndex), 1)
                    }
                    this.smTableEditStack = this.smTableEditStack.map(function (value) {
                        return value > rowIndex ? value - 1 : value;
                    })
                    this.standardMilestones = [...this.standardMilestones]
                }
            }
        )
    }

    submitStandardMilestones() {
        if (JSON.stringify(this.standardMilestonesDb) != JSON.stringify(this.standardMilestonesSubmit)) {
            this.myPreferenceService.isFormChanged = false
            this.formValue()
            this.apiService.bulkEditKeyAssumptions(this.standardMilestonesSubmit, this.myPreferenceService.projectid).then(res => {
                // this.myPreferenceService.submitbutton.next(true)
                this.myPreferenceService.toggleDrawerOpen('', '', [], '')
                // this.myPreferenceService.isNavChanged.next(true)
            });
        }

    }
}
