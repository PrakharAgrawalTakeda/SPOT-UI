import { Component } from '@angular/core';
import { ProjectApiService } from "../../../project-hub/common/project-api.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { RoleService } from "../../../../core/auth/role.service";
import { FuseConfirmationConfig, FuseConfirmationService } from "../../../../../@fuse/services/confirmation";
import { Router } from "@angular/router";
import { MyPreferenceService } from "../../my-preference.service";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import {MyPreferenceApiService} from "../../my-preference-api.service";
import {MsalService} from "@azure/msal-angular";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";

@Component({
    selector: 'app-milestone-set-view-edit',
    templateUrl: './milestone-set-view-edit.component.html',
    styleUrls: ['./milestone-set-view-edit.component.scss']
})
export class MilestoneSetViewEditComponent {
    constructor(public myPreferenceApiService: MyPreferenceApiService, public apiService: ProjectApiService, public myPreferenceService: MyPreferenceService, public authService: AuthService,
                public role: RoleService,private msalService: MsalService,  private portApiService: PortfolioApiService,
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
    filterCriteria: any = {}
    mainObj: any = {}
    standardMilestonesForm = new FormArray([])
    standardMilestonesDetailsForm = new FormGroup({
        milestoneSetName : new FormControl(""),
        portfolioOwner : new FormControl(null)
    })

    ngOnInit(): void {
        this.getllookup();
    }

    dataloader() {
        this.portApiService.getfilterlist().then(filterres => {
            this.filterCriteria = filterres

            if (this.standardMilestones.length > 0) {
                this.standardMilestonesDb = this.standardMilestones.map(x => {
                    return {
                        "milestoneTemplateId": x.keyAssumptionUniqueId,
                        "milestoneId": x.milestoneTemplateId,
                        "milestoneInternalId": x.milestoneInternalId,
                        "milestone": x.milestone,
                        "funtionalOwnerId": x.funtionalOwnerId,
                        "comment": x.comment,
                        "includeInReport": x.includeInReport,
                        "sortOrder": x.sortOrder,
                        "milestoneType": x.milestoneType,
                    }
                })
                for (var i of this.standardMilestones) {
                    this.standardMilestones.push(new FormGroup({
                        milestoneTemplateId: new FormControl(i.milestoneTemplateId),
                        milestoneId: new FormControl(i.milestoneId),
                        milestoneInternalId: new FormControl(i.milestoneInternalId),
                        milestone: new FormControl(i.milestone),
                        funtionalOwnerId: new FormControl(i.funtionalOwnerId),
                        comment: new FormControl(i.comment),
                        includeInReport: new FormControl(i.includeInReport),
                        sortOrder: new FormControl(i.sortOrder),
                        milestoneType: new FormControl(i.milestoneType),
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
                    "milestoneTemplateId": i.keyAssumptionUniqueId,
                    "milestoneId": i.milestoneTemplateId,
                    "milestoneInternalId": i.milestoneInternalId,
                    "milestone": i.milestone,
                    "funtionalOwnerId": i.funtionalOwnerId,
                    "comment": i.comment,
                    "includeInReport": i.includeInReport,
                    "sortOrder": i.sortOrder,
                    "milestoneType": i.milestoneType,

                })
            }
        } else {
            this.standardMilestonesSubmit = []
        }
        this.mainObj = {
            milestoneTemplateId: "",
            milestonesetId: '',
            portfolioId: this.standardMilestonesDetailsForm.value.portfolioOwner.portfolioOwnerId,
            portfolioOwner: "",
            milestoneSet: this.standardMilestonesDetailsForm.value.milestoneSetName,
            templateOwner: this.msalService.instance.getActiveAccount().localAccountId,
            templateOwnerName: "",
            createdDate: "",
            modifiedTemplateOwner: this.msalService.instance.getActiveAccount().localAccountId,
            modifiedDate: "",
            templateDetails: this.standardMilestonesSubmit
        }
    }

    addSM() {
        var j = [{}]
        j = [{
            milestoneTemplateId: '',
            milestoneId: '',
            milestoneInternalId: '',
            milestone: '',
            funtionalOwnerId: '',
            comment: '',
            includeInReport:false,
            sortOrder: '',
            milestoneType: '',
        }]
        this.standardMilestonesForm.push(new FormGroup({
            milestoneTemplateId: new FormControl(''),
            milestoneId: new FormControl(''),
            milestoneInternalId: new FormControl(''),
            milestone: new FormControl(''),
            funtionalOwnerId: new FormControl(''),
            comment: new FormControl(''),
            includeInReport:new FormControl(false),
            sortOrder: new FormControl(''),
            milestoneType: new FormControl(''),
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
            this.myPreferenceApiService.addStandardMilestoneSet(this.mainObj, '1').then(res => {
                // this.myPreferenceService.submitbutton.next(true)
                this.myPreferenceService.toggleDrawerOpen('', '', [], '')
                // this.myPreferenceService.isNavChanged.next(true)
            });
        }

    }
    getPortfolioOwner(): any {
        return this.filterCriteria.portfolioOwner.filter(x => x.isPortfolioOwner == true)
        // return "";
    }
    getFunctionOwner(): any {
        return this.lookupdata.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77").sort((a, b) => {
            return a.lookUpOrder - b.lookUpOrder;
        })
    }
    getLookUpName(id: string): string {
        return id && id != '' ? this.lookupdata.find(x => x.lookUpId == id).lookUpName : ''
    }
    getllookup() {
        this.authService.lookupMaster().then((resp: any) => {
            this.lookupdata = resp
            this.dataloader()
        })
    }
}
