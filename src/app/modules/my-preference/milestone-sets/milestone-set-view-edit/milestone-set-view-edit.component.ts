import {Component} from '@angular/core';
import {ProjectApiService} from "../../../project-hub/common/project-api.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {RoleService} from "../../../../core/auth/role.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {Router} from "@angular/router";
import {MyPreferenceService} from "../../my-preference.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MyPreferenceApiService} from "../../my-preference-api.service";
import {MsalService} from "@azure/msal-angular";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import moment from "moment";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
    selector: 'app-milestone-set-view-edit',
    templateUrl: './milestone-set-view-edit.component.html',
    styleUrls: ['./milestone-set-view-edit.component.scss']
})
export class MilestoneSetViewEditComponent {
    constructor(public myPreferenceApiService: MyPreferenceApiService, public apiService: ProjectApiService, public myPreferenceService: MyPreferenceService, public authService: AuthService,
                public role: RoleService, private msalService: MsalService, private portApiService: PortfolioApiService,
                public fuseAlert: FuseConfirmationService, private router: Router) {
        this.standardMilestonesTableForm.valueChanges.subscribe(res => {
            if (this.viewContent == true) {
                this.formValue()
                if (JSON.stringify(this.standardMilestonesTableDataDb) != JSON.stringify(this.standardMilestonesTableDataSubmit)) {
                    this.myPreferenceService.isFormChanged = true
                } else {
                    this.myPreferenceService.isFormChanged = false
                }
            }
        })
    }

    standardMilestonesTableData = []
    standardMilestonesTableDataDb = []
    standardMilestonesTableDataSubmit = []
    viewContent: boolean = false
    lookupdata: any[]
    smTableEditStack = []
    filterCriteria: any = {}
    mainObj: any = {}
    editedSet: any = {}
    portfolioOwnerList =[];
    orderView = false;
    standardMilestonesTableForm = new FormArray([])
    standardMilestonesDetailsForm = new FormGroup({
        milestoneTemplateId: new FormControl(""),
        milestonesetId: new FormControl(""),
        portfolioId: new FormControl(""),
        portfolioOwner: new FormControl(null),
        milestoneSet: new FormControl(""),
        templateOwner: new FormControl(""),
        templateOwnerName: new FormControl(""),
        createdDate: new FormControl(""),
        templateIsGlobal: new FormControl(null),
        modifiedTemplateOwner: new FormControl(""),
        modifiedDate: new FormControl(""),
        templateDetails: new FormArray([])
    })

    ngOnInit(): void {
        this.getllookup();
    }

    dataloader() {
        this.portApiService.getfilterlist().then(filterres => {
            this.filterCriteria = filterres
            if (this.myPreferenceService.itemid != "new") {
                this.myPreferenceApiService.GetPortfolioOwnerForPreferences('321be4b0-6338-4ed4-b40d-b9fdf9b4c489').then((portfolioRes: any) => {
                    this.portfolioOwnerList = portfolioRes;
                    this.myPreferenceApiService.getDetails(this.myPreferenceService.itemid).then((res: any) => {
                        this.editedSet = res
                        this.standardMilestonesDetailsForm.patchValue({
                            milestoneTemplateId: res.milestoneTemplateId,
                            milestonesetId: res.milestonesetId,
                            portfolioId: res.portfolioId,
                            portfolioOwner:  this.getPortfolioOwnerById(res.portfolioId),
                            milestoneSet: res.milestoneSet,
                            templateOwner: res.templateOwner,
                            templateOwnerName: res.templateOwnerName,
                            createdDate: res.createdDate,
                            templateIsGlobal: res.templateIsGlobal,
                            modifiedTemplateOwner: res.modifiedTemplateOwner,
                            modifiedDate: res.modifiedDate,
                            templateDetails: res.templateDetails
                        })
                        this.standardMilestonesTableDataDb = res.templateDetails.map(x => {
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
                        for (var i of res.templateDetails) {
                            this.standardMilestonesTableForm.push(new FormGroup({
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
                        this.standardMilestonesTableData = res.templateDetails;
                        this.myPreferenceService.isFormChanged = false
                        this.viewContent = true;
                    })
                })

            } else {
                let executionMilestones = [
                    {
                        milestoneTemplateId: '',
                        milestoneId: '',
                        milestoneInternalId: '',
                        milestone: 'Execution Start - ',
                        funtionalOwnerId: '',
                        comment: '',
                        includeInReport: false,
                        sortOrder: '',
                        milestoneType: 1,
                    },
                    {   milestoneTemplateId: '',
                        milestoneId: '',
                        milestoneInternalId: '',
                        milestone: 'Execution End - ',
                        funtionalOwnerId: '',
                        comment: '',
                        includeInReport: false,
                        sortOrder: '',
                        milestoneType: 2  }
                ];
                this.standardMilestonesTableData = executionMilestones;
                if (this.standardMilestonesTableData.length > 0) {
                    this.standardMilestonesTableDataDb = this.standardMilestonesTableData.map(x => {
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
                    for (var i of this.standardMilestonesTableData) {
                        this.standardMilestonesTableForm.push(new FormGroup({
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
                this.myPreferenceApiService.GetPortfolioOwnerForPreferences('321be4b0-6338-4ed4-b40d-b9fdf9b4c489').then((res: any) => {
                    this.portfolioOwnerList = res;
                })

                this.viewContent = true;
            }
        });
    }

    formValue() {
        var form = this.standardMilestonesTableForm.getRawValue()
        if (form.length > 0) {
            this.standardMilestonesTableDataSubmit = []
            let sortOrder = 100;
            for (var i of form) {
                this.standardMilestonesTableDataSubmit.push({
                    "milestoneTemplateId": i.milestoneTemplateId,
                    "milestoneId": i.milestoneId,
                    "milestone": i.milestone,
                    "funtionalOwnerId": i.funtionalOwnerId,
                    "comment": i.comment ? i.comment : "",
                    "includeInReport": i.includeInReport,
                    "sortOrder": sortOrder,
                    "milestoneType": i.milestoneType ? i.milestoneType : "0",
                })
                sortOrder = sortOrder + 100;
            }
        } else {
            this.standardMilestonesTableDataSubmit = []
        }
        if (this.myPreferenceService.itemid == "new") {
            this.mainObj = {
                milestoneTemplateId: "",
                portfolioId: this.standardMilestonesDetailsForm.value.portfolioOwner?.portfolioOwnerID,
                portfolioOwner: this.standardMilestonesDetailsForm.value.portfolioOwner?.portolioOwner,
                milestoneSet: this.standardMilestonesDetailsForm.value.milestoneSet,
                templateOwner: this.msalService.instance.getActiveAccount().localAccountId,
                templateOwnerName: "",
                modifiedTemplateOwner: this.msalService.instance.getActiveAccount().localAccountId,
                modifiedDate: moment(),
                templateDetails: this.standardMilestonesTableDataSubmit
            }
        }else{
            this.mainObj = {
                milestoneTemplateId: this.editedSet.milestoneTemplateId,
                milestonesetId: this.editedSet.milestonesetId,
                portfolioId: this.standardMilestonesDetailsForm.value.portfolioOwner?.portfolioOwnerID,
                portfolioOwner: this.standardMilestonesDetailsForm.value.portfolioOwner?.portfolioOwner,
                milestoneSet: this.standardMilestonesDetailsForm.value.milestoneSet,
                templateOwner: this.editedSet.templateOwner,
                templateOwnerName: this.editedSet.templateOwnerName,
                createdDate: this.editedSet.createdDate,
                modifiedTemplateOwner: this.msalService.instance.getActiveAccount().localAccountId,
                modifiedDate: moment(),
                templateIsGlobal: this.editedSet.templateIsGlobal,
                templateDetails: this.standardMilestonesTableDataSubmit
            }
        }
    }
    changeOrderView() {
        if (this.myPreferenceService.isFormChanged && this.orderView == false) {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "Are you sure?",
                "message": "Are you sure you want switch to the order view page? All the changes will be lost ",
                "icon": {
                    "show": true,
                    "name": "heroicons_outline:exclamation",
                    "color": "warn"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "OK",
                        "color": "warn"
                    },
                    "cancel": {
                        "show": true,
                        "label": "Cancel"
                    }
                },
                "dismissible": true
            }
            const riskIssueAlert = this.fuseAlert.open(comfirmConfig)
            riskIssueAlert.afterClosed().subscribe(close => {
                if (close == 'confirmed') {
                    this.smTableEditStack = [];
                    this.orderView = !this.orderView;
                }
            })
        }else{
            this.orderView = !this.orderView;
            this.smTableEditStack = [];
            this.myPreferenceService.isFormChanged = false;
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
            includeInReport: false,
            sortOrder: '',
            milestoneType: '',
        }]
        this.standardMilestonesTableForm.push(new FormGroup({
            milestoneTemplateId: new FormControl(''),
            milestoneId: new FormControl(''),
            milestoneInternalId: new FormControl(''),
            milestone: new FormControl(''),
            funtionalOwnerId: new FormControl(''),
            comment: new FormControl(''),
            includeInReport: new FormControl(false),
            sortOrder: new FormControl(''),
            milestoneType: new FormControl(''),
        }))

        this.standardMilestonesTableData = [...this.standardMilestonesTableData, ...j]
        this.smTableEditStack.push(this.standardMilestonesTableData.length - 1)
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
                    this.standardMilestonesTableData.splice(rowIndex, 1)
                    this.standardMilestonesTableForm.removeAt(rowIndex)
                    if (this.smTableEditStack.includes(rowIndex)) {
                        this.smTableEditStack.splice(this.smTableEditStack.indexOf(rowIndex), 1)
                    }
                    this.smTableEditStack = this.smTableEditStack.map(function (value) {
                        return value > rowIndex ? value - 1 : value;
                    })
                    this.standardMilestonesTableData = [...this.standardMilestonesTableData]
                }
            }
        )
    }

    submitStandardMilestones() {
        if (this.myPreferenceService.itemid != 'new') {
            if (JSON.stringify(this.standardMilestonesTableDataDb) != JSON.stringify(this.standardMilestonesTableDataSubmit)) {
                this.myPreferenceService.isFormChanged = false
                this.formValue()
                this.myPreferenceApiService.editStandardMilestoneSet(this.mainObj, this.mainObj.milestoneTemplateId).then(res => {
                    this.myPreferenceService.submitbutton.next(true)
                    this.myPreferenceService.toggleDrawerOpen('', '', [], '')
                })
            } else {
                this.myPreferenceService.submitbutton.next(true)
                this.myPreferenceService.toggleDrawerOpen('', '', [], '')

            }
        }else{
            if (JSON.stringify(this.standardMilestonesTableDataDb) != JSON.stringify(this.standardMilestonesTableDataSubmit)) {
                this.myPreferenceService.isFormChanged = false
                this.formValue()
                this.myPreferenceApiService.addStandardMilestoneSet(this.mainObj).then(res => {
                    this.myPreferenceService.submitbutton.next(true)
                    this.myPreferenceService.toggleDrawerOpen('', '', [], '')
                });
            }
        }
    }

    getPortfolioOwnerById(portfolioId: string): any {
        return this.portfolioOwnerList.filter(x =>  x.portfolioOwnerID == portfolioId)[0];
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
    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.standardMilestonesTableData, event.previousIndex, event.currentIndex);
        let group = (<FormArray>this.standardMilestonesTableForm).at(event.previousIndex);
        (<FormArray>this.standardMilestonesTableForm).removeAt(event.previousIndex);
        (<FormArray>this.standardMilestonesTableForm).insert(event.currentIndex,group);
    }
}
