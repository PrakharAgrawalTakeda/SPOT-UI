import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ProjectHubService} from "../../project-hub.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {RoleService} from "../../../../core/auth/role.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {Router} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import {BudgetService} from "../budget.service";

@Component({
    selector: 'app-budget-funding-information-bulk-edit',
    templateUrl: './budget-funding-information-bulk-edit.component.html',
    styleUrls: ['./budget-funding-information-bulk-edit.component.scss']
})
export class BudgetFundingInformationBulkEditComponent {
    constructor(public apiService: ProjectApiService,
                public projecthubservice: ProjectHubService,
                public authService: AuthService,
                public role: RoleService,
                private portfoliService: PortfolioApiService,
                public fuseAlert: FuseConfirmationService,
                public budgetService: BudgetService) {
        this.fundingRequestForm.valueChanges.subscribe(res => {
            if (this.viewContent == true) {
                this.formValue()
                if (JSON.stringify(this.fundingRequestsDb) != JSON.stringify(this.fundingRequestsSubmit)) {
                    this.projecthubservice.isFormChanged = true
                } else {
                    this.projecthubservice.isFormChanged = false
                }
            }
        })
    }

    budgetInfo: any;
    fundingRequests = []
    fundingRequestsDb = []
    fundingRequestsSubmit = []
    viewContent: boolean = false
    lookupdata: any[]
    frTableEditStack = []
    fundingRequestForm = new FormArray([])
    localCurrency:any = [];
    showAddNewButton: boolean = false;

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.budgetInfo = this.projecthubservice.all
        this.fundingRequests = this.budgetService.budgetPageInfo.budgetIOs;
        this.portfoliService.getLocalCurrency().then(currency => {
            this.localCurrency = currency
            this.viewContent = true;
        })
        if(this.budgetInfo.budget.budgetOwner=="3BAA5DAB-6A5F-4E6C-9428-D7D1A620B0EC" || this.budgetInfo.budget.budgetOwner==null){
            this.showAddNewButton = true;
        }
        if (this.fundingRequests.length > 0) {
                    this.fundingRequestsDb = this.fundingRequests.map(x => {
                        return {
                            "budgetIoid": x.budgetIoid,
                            "projectId": x.projectId,
                            "budgetIo1": x.budgetIo1,
                            "carapprovedCapex": x.carapprovedCapex,
                            "carapprovedOpex": x.carapprovedOpex,
                            "ammendedCar": x.ammendedCar,
                            "localCarapprovedCapex": x.localCarapprovedCapex,
                            "localCarapprovedOpex": x.localCarapprovedOpex,
                            "localCurrencyId": x.localCurrencyId,
                            "approvalStatus": x.approvalStatus,
                            "approvalCurrency": x.approvalCurrency,
                            "keep": x.keep
                        }
                    })
                    for (var i of this.fundingRequests) {
                        this.fundingRequestForm.push(new FormGroup({
                            budgetIoid: new FormControl(i.budgetIoid),
                            projectId: new FormControl(i.projectId),
                            budgetIo1: new FormControl(i.budgetIo1),
                            carapprovedCapex: new FormControl(i.carapprovedCapex),
                            carapprovedOpex: new FormControl(i.carapprovedOpex),
                            ammendedCar: new FormControl(i.ammendedCar),
                            localCarapprovedCapex: new FormControl(i.localCarapprovedCapex),
                            localCarapprovedOpex: new FormControl(i.localCarapprovedOpex),
                            localCurrencyId: new FormControl(i.localCurrencyId),
                            approvalStatus: new FormControl(i.approvalStatus),
                            approvalCurrency: new FormControl(i.approvalCurrency),
                            keep: new FormControl(i.keep),
                        }))
                    }
                }
    }
    formValue() {
        var form = this.fundingRequestForm.getRawValue()
        if (form.length > 0) {
            this.fundingRequestsSubmit = []
            for (var i of form) {
                this.fundingRequestsSubmit.push({
                    "budgetIoid": i.budgetIoid ? i.budgetIoid : "",
                    "projectId": this.projecthubservice.projectid,
                    "budgetIo1": i.budgetIo1,
                    "carapprovedCapex": i.carapprovedCapex,
                    "carapprovedOpex": i.carapprovedOpex,
                    "ammendedCar": i.ammendedCar,
                    "localCarapprovedCapex": i.localCarapprovedCapex =="" ? null : i.localCarapprovedCapex,
                    "localCarapprovedOpex": i.localCarapprovedOpex=="" ? null : i.localCarapprovedOpex,
                    "localCurrencyId": i.localCurrencyId,
                    "approvalStatus": i.approvalStatus,
                    "approvalCurrency": i.approvalCurrency,
                    "keep": i.keep,
                })
            }
        } else {
            this.fundingRequestsSubmit = []
        }
    }

    addFR() {
        var j = [{}]
        j = [{
            budgetIoid: '',
            projectId: '',
            budgetIo1: '',
            carapprovedCapex:null,
            carapprovedOpex: null,
            ammendedCar: '',
            localCarapprovedCapex: '',
            localCarapprovedOpex: '',
            localCurrencyId: '',
            approvalStatus:'Approved',
            approvalCurrency:'',
            keep: true,
        }]
        this.fundingRequestForm.push(new FormGroup({
            budgetIoid: new FormControl(null),
            projectId: new FormControl(this.projecthubservice.projectid),
            budgetIo1: new FormControl(''),
            carapprovedCapex: new FormControl(null),
            carapprovedOpex: new FormControl(null),
            ammendedCar: new FormControl(''),
            localCarapprovedCapex: new FormControl(''),
            localCarapprovedOpex: new FormControl(''),
            localCurrencyId: new FormControl(''),
            approvalStatus: new FormControl('Approved'),
            approvalCurrency: new FormControl(''),
            keep: new FormControl(true),
        }))
        this.fundingRequests = [...this.fundingRequests, ...j]
        this.frTableEditStack.push(this.fundingRequests.length - 1)
        var div = document.getElementsByClassName('ngx-datatable')[0]
        setTimeout(() => {
            div.scroll({
                top: div.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }, 100);

    }

    frTableEditRow(rowIndex,row?) {
        if (!this.frTableEditStack.includes(rowIndex)) {
            this.frTableEditStack.push(rowIndex)
        }
    }
    checkRow(row,rowIndex):boolean {
        if (this.frTableEditStack.includes(rowIndex)) {
            return !!row.keep;
        }else{
            return false;
        }
    }
    checkFundingCell(row,rowIndex):boolean {
        if (this.frTableEditStack.includes(rowIndex) && row.budgetIoid=="") {
            return true;
        }else{
            return false;
        }
    }
    getCurrency(id: string): string{
        return id && id != '' ? this.localCurrency.find(x => x.localCurrencyId == id)?.localCurrencyAbbreviation : ''
    }
    deleteFR(rowIndex: number) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Are you sure?",
            "message": "Are you sure you want to delete this record?",
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
                    this.fundingRequests.splice(rowIndex, 1)
                    this.fundingRequestForm.removeAt(rowIndex)
                    if (this.frTableEditStack.includes(rowIndex)) {
                        this.frTableEditStack.splice(this.frTableEditStack.indexOf(rowIndex), 1)
                    }
                    this.frTableEditStack = this.frTableEditStack.map(function (value) {
                        return value > rowIndex ? value - 1 : value;
                    })
                    this.fundingRequests = [...this.fundingRequests]
                }
            }
        )
    }
    checkDuplicateIds(objects: any[]): string {
        const ids = new Set<string>();
        for (const obj of objects) {
            if (ids.has(obj.budgetIo1)) {
                return obj.budgetIo1;
            }
            ids.add(obj.budgetIo1);
        }
        return '';
    }
     checkEmptyIds(myList: any[]): boolean {
        const idMap: { [id: string]: boolean } = {};
        for (const object of myList) {
            const id = object.budgetIo1;
            if (!id || id.trim() === '') {
                return true;
            }
            if (!object.localCurrencyId || object.localCurrencyId.trim() === '') {
                return true;
            }
            idMap[id] = true;
        }
        return false;
    }
    submitFundingRequests() {
        if (JSON.stringify(this.fundingRequestsDb) != JSON.stringify(this.fundingRequestsSubmit)) {
            if(this.checkEmptyIds(this.fundingRequestsSubmit)){
                var comfirmConfig: FuseConfirmationConfig = {
                    "title": "To save your changes it is required to populate all 'Funding Request ID' and 'Approval Currency' fields !",
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
            }else{
                let duplicate = this.checkDuplicateIds(this.fundingRequestsSubmit)
                if(duplicate!="") {
                    var comfirmConfig: FuseConfirmationConfig = {
                        "title": "The Funding Request ID (" + duplicate + ") you have entered does already exist and cannot be added a second time. Please change or remove it",
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
                }else{
                    this.projecthubservice.isFormChanged = false
                    this.formValue()
                    this.budgetInfo.budgetIOs  = this.fundingRequestsSubmit.filter((item) => item.keep);
                    this.budgetInfo.budgetForecasts = []
                    this.budgetInfo.budgetForecastsY1 = []
                    this.apiService.updateBudgetPageInfo(this.projecthubservice.projectid,this.budgetInfo).then(res => {
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.toggleDrawerOpen('', '', [], '')
                        this.projecthubservice.isNavChanged.next(true)
                    })
                }
            }

        } else {
            this.projecthubservice.submitbutton.next(true)
            this.projecthubservice.toggleDrawerOpen('', '', [], '')
            this.projecthubservice.isNavChanged.next(true)
        }
    }
    calculateHeight(): string {
        if (this.showAddNewButton) {
            return 'calc(100vh - 160px)';
        } else {
            return 'calc(100vh - 120px)';
        }
    }
}
