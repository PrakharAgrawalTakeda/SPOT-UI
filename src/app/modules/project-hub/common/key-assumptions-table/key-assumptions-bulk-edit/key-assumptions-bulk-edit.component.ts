import {Component, OnInit} from '@angular/core';
import {ProjectApiService} from "../../project-api.service";
import {ProjectHubService} from "../../../project-hub.service";
import {AuthService} from "../../../../../core/auth/auth.service";
import {RoleService} from "../../../../../core/auth/role.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
@Component({
    selector: 'app-key-assumptions-bulk-edit',
    templateUrl: './key-assumptions-bulk-edit.component.html',
    styleUrls: ['./key-assumptions-bulk-edit.component.scss']
})
export class KeyAssumptionsBulkEditComponent implements OnInit {

    constructor(public apiService: ProjectApiService, public projecthubservice: ProjectHubService, public authService: AuthService, public role: RoleService, public fuseAlert: FuseConfirmationService) {
        this.keyAssumptionForm.valueChanges.subscribe(res => {
            if (this.viewContent == true) {
                this.formValue()
                if (JSON.stringify(this.keyAssumptionsDb) != JSON.stringify(this.keyAssumptionsSubmit)) {
                    this.projecthubservice.isFormChanged = true
                } else {
                    this.projecthubservice.isFormChanged = false
                }
            }
        })
    }

    keyAssumptions = []
    keyAssumptionsDb = []
    keyAssumptionsSubmit = []
    viewContent: boolean = false
    lookupdata: any[]
    kaTableEditStack = []
    keyAssumptionForm = new FormArray([])

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.apiService.getKeyAssumptionsByProject(this.projecthubservice.projectid).then((res: any) => {
            this.keyAssumptions = res
            if (this.keyAssumptions.length > 0) {
                this.keyAssumptionsDb = this.keyAssumptions.map(x => {
                    return {
                        "keyAssumptionUniqueId": x.keyAssumptionUniqueId,
                        "projectId": x.projectId,
                        "keyAssumption": x.keyAssumption,
                        "includeInCharter": x.includeInCharter,
                        "assumptionRationale": x.assumptionRationale,
                    }
                })
                for (var i of this.keyAssumptions) {
                    this.keyAssumptionForm.push(new FormGroup({
                        keyAssumptionUniqueId: new FormControl(i.keyAssumptionUniqueId),
                        projectId: new FormControl(i.projectId),
                        keyAssumption: new FormControl(i.keyAssumption),
                        includeInCharter: new FormControl(i.includeInCharter),
                        assumptionRationale: new FormControl(i.assumptionRationale),
                    }))
                }
            }
            this.disabler();
            wait(150);
            this.viewContent = true;
        })

    }
    disabler() {
        if (this.projecthubservice.all.filter(x => x.includeInCharter == true).length <= 5) {
            for (var i of this.keyAssumptionForm.controls) {
                i['controls']['includeInCharter'].enable()
            }
        } else {
            for (var i of this.keyAssumptionForm.controls) {
                if (i['controls']['includeInCharter'].value != true) {
                    i['controls']['includeInCharter'].disable()
                }
            }
        }
    }

    formValue() {
        var form = this.keyAssumptionForm.getRawValue()
        if (form.length > 0) {
            this.keyAssumptionsSubmit = []
            for (var i of form) {
                this.keyAssumptionsSubmit.push({
                    "keyAssumptionUniqueId": i.keyAssumptionUniqueId,
                    "projectId": i.projectId,
                    "keyAssumption": i.keyAssumption,
                    "assumptionRationale": i.assumptionRationale,
                    "includeInCharter": i.includeInCharter,

                })
            }
        } else {
            this.keyAssumptionsSubmit = []
        }
    }

    addKA() {
        var j = [{
            keyAssumptionUniqueId: '',
            projectId: '',
            keyAssumption: '',
            assumptionRationale: '',
            includeInCharter: '',
        }]
        this.disabler()
        this.keyAssumptionForm.push(new FormGroup({
            keyAssumptionUniqueId: new FormControl(''),
            projectId: new FormControl({}),
            keyAssumption: new FormControl({}),
            assumptionRationale: new FormControl(0),
            includeInCharter: new FormControl(0),
        }))
        this.keyAssumptions = [...this.keyAssumptions, ...j]
        this.kaTableEditStack.push(this.keyAssumptions.length - 1)
        var div = document.getElementsByClassName('datatable-scroll')[0]
        setTimeout(() => {
            div.scroll({
                top: div.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }, 100);

    }

    kaTableEditRow(rowIndex) {
        if (!this.kaTableEditStack.includes(rowIndex)) {
            this.kaTableEditStack.push(rowIndex)
        }
        this.disabler()
    }

    deleteKA(rowIndex: number) {
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
                    this.keyAssumptions.splice(rowIndex, 1)
                    this.keyAssumptionForm.removeAt(rowIndex)
                    if (this.kaTableEditStack.includes(rowIndex)) {
                        this.kaTableEditStack.splice(this.kaTableEditStack.indexOf(rowIndex), 1)
                    }
                    this.kaTableEditStack = this.kaTableEditStack.map(function (value) {
                        return value > rowIndex ? value - 1 : value;
                    })
                    this.disabler()
                    this.keyAssumptions = [...this.keyAssumptions]
                }
            }
        )
    }

    submitKeyAssumptions() {
        this.formValue()
        if (JSON.stringify(this.keyAssumptionsDb) != JSON.stringify(this.keyAssumptionsSubmit)) {
            this.projecthubservice.isFormChanged = false
            this.formValue()
            this.apiService.bulkEditKeyAssumptions(this.keyAssumptionsSubmit, this.projecthubservice.projectid).then(res => {
                this.projecthubservice.submitbutton.next(true)
                this.projecthubservice.toggleDrawerOpen('', '', [], '')
                this.projecthubservice.isNavChanged.next(true)
            })

        } else {
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
            this.projecthubservice.isNavChanged.next(true)
        }
    }

}
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}
