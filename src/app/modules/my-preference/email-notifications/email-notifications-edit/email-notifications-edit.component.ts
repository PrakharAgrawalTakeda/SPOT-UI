import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FuseConfirmationConfig, FuseConfirmationService} from '@fuse/services/confirmation';
import {AuthService} from 'app/core/auth/auth.service';
import {ProjectApiService} from 'app/modules/project-hub/common/project-api.service';
import {ProjectHubService} from 'app/modules/project-hub/project-hub.service';
import {MsalService} from '@azure/msal-angular';

import {debounceTime, filter, map, Observable, startWith, Subject, Subscription, takeUntil} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";
import {GlobalVariables} from 'app/shared/global-variables';
import {MyPreferenceApiService} from '../../my-preference-api.service';
import {MyPreferenceService} from '../../my-preference.service';
import {RoleService} from 'app/core/auth/role.service';

@Component({
    selector: 'app-email-notifications-edit',
    templateUrl: './email-notifications-edit.component.html',
    styleUrls: ['./email-notifications-edit.component.scss']
})
export class EmailNotificationsEditComponent {
    @Input() debounce: number = 300;
    @Input() minLength: number = 4;
    @Input() appearance: 'basic' | 'bar' = 'bar';
    @Output() search: EventEmitter<any> = new EventEmitter<any>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    emailNotiEditType: string = 'EmailNotiEdit';
    emailNotiTableEditType: string = 'EmailNotiTableEdit';
    id: string = ""
    emailNotiForm = new FormGroup({
        recieveEmailNotification: new FormControl(false),
        reportFrequencyId: new FormControl(null),
        emailNotifcationNotifcationReportScopeIds: new FormControl(null),
        portfolioOwner: new FormControl([]),
        excecutionScope: new FormControl([]),
        role: new FormControl(),
        rows: new FormControl(),
        includeChild: new FormControl(false),
        products: new FormControl(),
        emailNotifcationPortfolioReportTypes: new FormControl(null),
        notificationId: new FormControl(''),
        problemId: new FormControl([]),
        problemTitle: new FormControl([])
    })
    viewContent: boolean = false
    emailNoti: any;
    eventsData: any;
    lookUpData: any;
    reportFrequency: any;
    lookUpMaster: any;
    lookUpData2: any;
    filterCriteria: any = {}
    lookup: any = []
    searchControl: FormControl = new FormControl();
    selectedValueExists: FormControl = new FormControl(true);
    detailsHaveBeenChanged: FormControl = new FormControl(false);
    opened: boolean = false;
    rows = [];
    resultSets: any[];
    budget: any = [];
    temp: string = "";
    isParent: boolean = false;
    showPortfolioOwnerField: boolean = false;
    valueChangesSubscription: Subscription;
    emailDb: any;
    lookUpData3: any;
    reportsData: any;
    projects: any[] = [];
    reportScopechange: boolean;
    isConfidential: boolean = false;
    executionScopeRequired : boolean = false;
    portfolioOwnerRequired : boolean = false;
    projectBasedRequired : boolean = false;
    individualProjectsRequired : boolean = false;
    productsRequired : boolean = false;


    constructor(public projecthubservice: ProjectHubService,
                private _httpClient: HttpClient,
                private _Activatedroute: ActivatedRoute, private msalService: MsalService, private apiService: MyPreferenceApiService,
                public auth: AuthService, private roleService: RoleService, public fuseAlert: FuseConfirmationService, private authService: AuthService, private apiservice: ProjectApiService,
                public preferenceservice: MyPreferenceService) {
        this.emailNotiForm.valueChanges.subscribe(res => {
            this.preferenceservice.isFormChanged = true
        })

        this.emailNotiForm.controls['emailNotifcationNotifcationReportScopeIds'].valueChanges.subscribe(value => {
            if (this.viewContent == true) {
                var comfirmConfig: FuseConfirmationConfig = {
                    "title": "You have changed the notification scope. Do you want to proceed?",
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

            if (value.lookUpId == 'ecbe5dae-7278-4b2f-906d-ec9aaa77d868') {
                this.emailNotiForm.controls['excecutionScope'].setValue([]);
                this.emailNotiForm.controls['role'].setValue(null);
                this.emailNotiForm.controls['rows'].setValue([]);
                this.emailNotiForm.controls['products'].setValue(null);
                this.resultSets = [];
                this.rows = []
                this.projects = []
                this.resetRequired();
                this.portfolioOwnerRequired = true;
            }

            if (value.lookUpId == '11336470-8b35-4c7a-abe4-d62d58d33fca') {
                this.emailNotiForm.controls['portfolioOwner'].setValue([]);
                this.emailNotiForm.controls['role'].setValue(null);
                this.emailNotiForm.controls['rows'].setValue([]);
                this.emailNotiForm.controls['products'].setValue(null);
                this.resultSets = [];
                this.rows = []
                this.projects = []
                this.resetRequired();
                this.executionScopeRequired = true;
            }


            if (value.lookUpId == '897633cf-3516-49b0-9f45-a6ddc9374c0e') {
                this.emailNotiForm.controls['excecutionScope'].setValue([]);
                this.emailNotiForm.controls['portfolioOwner'].setValue(null);
                this.emailNotiForm.controls['rows'].setValue([]);
                this.emailNotiForm.controls['products'].setValue(null);
                this.resultSets = [];
                this.rows = []
                this.projects = []
                this.resetRequired();
                this.projectBasedRequired = true;
            }

            if (value.lookUpId == 'dca7a55b-6b8d-448e-b2be-0796a043775c') {
                this.emailNotiForm.controls['excecutionScope'].setValue([]);
                this.emailNotiForm.controls['role'].setValue(null);
                this.emailNotiForm.controls['portfolioOwner'].setValue([]);
                this.emailNotiForm.controls['products'].setValue(null);
                this.resetRequired();
                this.individualProjectsRequired = true;
            }

            if (value.lookUpId == 'd290915b-cda2-4ba3-87a3-ce504fd6f15c') {
                this.emailNotiForm.controls['excecutionScope'].setValue([]);
                this.emailNotiForm.controls['role'].setValue(null);
                this.emailNotiForm.controls['portfolioOwner'].setValue([]);
                this.resultSets = [];
                this.rows = []
                this.projects = []
                this.resetRequired();
                this.productsRequired = true;
            }
        });

    }

    ngOnInit(): void {

        this.dataloader()
        console.log(this.projecthubservice.all)
        window.dispatchEvent(new Event('resize'));
        this.searchControl.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this._unsubscribeAll),
                startWith(''),
                map((value) => {
                    if (!value || value.length < this.minLength) {
                        this.resultSets = null;
                    }
                    this.temp = value
                    return value;
                }),
                filter(value => value && value.length >= this.minLength)
            )
            .subscribe((value) => {
                const params = new HttpParams().set('query', value);
                if (this.selectedValueExists.value == true && this.searchControl.value != "") {
                    this._httpClient.post(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`, {body: []})
                        .subscribe((resultSets: any) => {
                            for (var i = 0; i < resultSets.projectData.length; i++) {
                                var obj = resultSets.projectData[i];
                              }
                              console.log(this.resultSets)
                              this.resultSets = resultSets.projectData;
                              this.budget = resultSets.budget
                              this.search.next(resultSets);
                            });

                }
            });
    }

    dataloader() {
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");

        this.apiService.getemailNoti(this.msalService.instance.getActiveAccount().localAccountId).then((res: any) => {
            this.authService.lookupMaster().then((lookup: any) => {
                this.apiservice.getfilterlist().then(filter => {

                    this.lookup = lookup
                    this.filterCriteria = filter
                    console.log('LookUp Data', lookup)
                    this.lookUpData = lookup.filter(x => x.lookUpParentId == '3df298d8-fcac-4b2c-b571-c7ddfdeafbdc')
                    this.lookUpData.sort((a, b) => {
                        return a.lookUpOrder - b.lookUpOrder;
                    })

                    this.lookUpData2 = lookup.filter(x => x.lookUpParentId == '995740b8-8a4a-44b8-afb0-813a23c61160')
                    this.lookUpData2.sort((a, b) => {
                        return a.lookUpOrder - b.lookUpOrder;
                    })
                    this.lookUpData3 = lookup.filter(x => x.lookUpParentId == '15cb0049-6b90-45a7-b71e-12d32d091f73')
                    this.lookUpData3.sort((a, b) => {
                        return a.lookUpOrder - b.lookUpOrder;
                    })
                    this.emailNoti = res
                    this.reportsData = res.reportOptions
                    this.emailDb = this.emailNoti
                    this.eventsData = res.eventsMasterData
                    res.eventsMasterData.sort((a, b) => a.priority - b.priority)
                    console.log("DB", res)
                    console.log("ROWS", this.rows)
                    console.log(this.filterCriteria.products)
                    if (this.emailNoti != null) {
                        this.emailNotiForm.patchValue({
                            recieveEmailNotification: res.reportOptions.recieveEmailNotification ? res.reportOptions.recieveEmailNotification : false,
                            reportFrequencyId: res.reportOptions.reportFrequencyId ? this.lookUpData.find(x => x.lookUpId == res.reportOptions.reportFrequencyId) : '',
                            emailNotifcationNotifcationReportScopeIds: res.reportOptions.emailNotifcationNotifcationReportScopeIds ? this.lookUpData2.find(x => x.lookUpId == res.reportOptions.emailNotifcationNotifcationReportScopeIds) : '',
                            portfolioOwner: res.reportOptions.portfolioScopeIds && this.filterCriteria.portfolioOwner
                                ? res.reportOptions.portfolioScopeIds.split(',').map(id => this.filterCriteria.portfolioOwner.find(x => x.portfolioOwnerId === id)).filter(Boolean)
                                : [],
                            excecutionScope: res.reportOptions.executionScopeIds && this.filterCriteria.portfolioOwner
                                ? res.reportOptions.executionScopeIds.split(',').map(id => this.filterCriteria.portfolioOwner.find(x => x.portfolioOwnerId === id)).filter(Boolean)
                                : [],
                            role: res.reportOptions.roleIds && this.getRoles()
                                ? res.reportOptions.roleIds.split(',').map(id => this.getRoles().find(x => x.lookUpId === id)).filter(Boolean)
                                : [],
                            rows: res.reportOptions.projectIds
                                ? res.reportOptions.projectIds.split(',')
                                : [],
                            includeChild: res.reportOptions.includeChild,
                            products: res.reportOptions.productIds && this.filterCriteria.products ?
                                res.reportOptions.productIds.split(',').map(id => this.filterCriteria.products.find(x => x.productId === id)).filter(Boolean) : [],
                            emailNotifcationPortfolioReportTypes: res.reportOptions.emailNotifcationPortfolioReportTypes
                                ? this.lookUpData3.find(x => x.lookUpId === res.reportOptions.emailNotifcationPortfolioReportTypes)
                                : this.lookUpData3.find(x => x.lookUpName === 'All Projects'),
                            notificationId: res.reportOptions.notificationId
                        })
                        console.log("FORM", this.emailNotiForm.getRawValue())
                        console.log(this.getRoles())

                    }
                    this.emailNotiForm.controls['emailNotifcationNotifcationReportScopeIds'].valueChanges.subscribe(value => {
                        if (value.lookUpId == 'dca7a55b-6b8d-448e-b2be-0796a043775c' && res.reportOptions.emailNotifcationNotifcationReportScopeIds.lookUpId == 'dca7a55b-6b8d-448e-b2be-0796a043775c')
                            //
                        {
                            if (res.reportOptions.projectIds) {
                                this.apiService.getprojectDetails(res.reportOptions.projectIds.split(',')).then((id: any) => {
                                    if (id) {
                                        this.isConfidential = id.isConfidential
                                        this.projects = id
                                        console.log(this.projects)
                                    }

                                })
                            }
                        }
                    })

                    if (res.reportOptions.projectIds) {
                        this.apiService.getprojectDetails(res.reportOptions.projectIds.split(',')).then((id: any) => {
                            if (id) {
                                this.projects = id
                                console.log(this.projects)
                            }

                        })
                    }


                    this.preferenceservice.isFormChanged = false


                    this.viewContent = true;
                })
            })
        })
    }

    getPortfolioOwner(): any {
        if (this.filterCriteria && this.filterCriteria.portfolioOwner) {
            return this.filterCriteria.portfolioOwner.filter(x => x.isPortfolioOwner == true);

        }
        return [];
    }
    resetRequired(): void {
        this.executionScopeRequired = false;
        this.portfolioOwnerRequired = false;
        this.projectBasedRequired = false;
        this.individualProjectsRequired = false;
        this.productsRequired = false;
    }

    getExcecutionScope(): any {
        if (this.filterCriteria && this.filterCriteria.portfolioOwner) {
            return this.filterCriteria.portfolioOwner.filter(x => x.isExecutionScope == true);
        }
        return [];
    }

    getActiveProducts(): any {
        if (this.filterCriteria && this.filterCriteria.products) {
            return this.filterCriteria.products.filter(x => x.showProduct == true);
        }
        return [];
    }

    getRoles(): any {
        var j = this.projecthubservice.all
        if (j.some(x => x.roleId == '17d65016-0541-4fcc-8a9c-1db0597817cc') && j.some(x => x.roleId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
            return this.lookup.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && !['17d65016-0541-4fcc-8a9c-1db0597817cc', 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8'].includes(x.lookUpId))
        } else if (j.some(x => x.roleId == '17d65016-0541-4fcc-8a9c-1db0597817cc')) {
            return this.lookup.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != '17d65016-0541-4fcc-8a9c-1db0597817cc')
        } else if (j.some(x => x.roleId == 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')) {
            return this.lookup.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77" && x.lookUpId != 'e42f20f9-1913-4f17-bd8b-5d2fc46bf4e8')
        }
        return this.lookup.filter(x => x.lookUpParentId == "0edea251-09b0-4323-80a0-9a6f90190c77")
    }

    ngOnDestroy() {
        // if (this.detailsHaveBeenChanged.value == true)
        //   window.location.reload();
    }

    onRemoveLink(projectId: string, rowIndex: number) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Remove project",
            "message": "Are you sure you want to remove this project?",
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
        const deleteAlert = this.fuseAlert.open(comfirmConfig)

        deleteAlert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                // this.apiService.DeleteLink(projectId).then((res: any) => {
                // });
                //const objWithIdIndex = this.projecthubservice.projectChildren.findIndex((obj) => obj.problemUniqueId === projectId);
                //const index = this.projecthubservice.removedIds.indexOf(projectId);
                //this.projecthubservice.removedIds.splice(index, 1);
                this.searchControl.setValue('');
                this.selectedValueExists.setValue(true)
                this.rows.splice(rowIndex, 1);
                this.rows = [...this.rows];
                this.projects.splice(rowIndex, 1);
                this.projects = [...this.projects];
                this.detailsHaveBeenChanged.setValue(true);
            }
        })
    }

    onKeydown(event: KeyboardEvent): void {
        if (this.appearance === 'bar') {
            if (event.code === 'Escape') {
                this.close();
            }
        }
    }

    close(): void {
        if (!this.opened) {
            return;
        }
        this.searchControl.setValue('');

        this.opened = false;
    }

    onOptionSelected() {
        this.selectedValueExists.setValue(false)
    }

    budgetfind(projectid: string): string {
        if (this.resultSets.length > 0) {
            if (this.budget.length > 0) {
                var temp = this.budget.find(x => x.projectId == projectid)
                if (temp != null) {
                    return temp.capitalBudgetId
                }
            }
        }
        return ""
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    onAdd(childId) {
        var addedProject = this.resultSets.find(_ => _.problemUniqueId === childId);
        console.log(this.projects)
        this.searchControl.setValue('');
        this.selectedValueExists.setValue(true);
        //this.projecthubservice.removedIds.push(childId, 1);
        this.rows.push(addedProject);
        this.rows = [...this.rows];
        console.log(this.rows)
        this.projects.push(addedProject)
        this.projects = [...this.projects]
        this.detailsHaveBeenChanged.setValue(true);
    }
    deleteProject(id: string) {
        this.projects = this.projects.filter(obj => obj.problemUniqueId !== id);
        this.rows = [...this.rows];
    }

    displayFn(value?: number) {
        let returnValue = "";
        if (value) {
            const selectedValue = this.resultSets.find(_ => _.problemUniqueId === value);
            returnValue = (selectedValue.isParent ? "[PGM] " : "") + selectedValue.problemId + " - " + this.budgetfind(selectedValue.problemUniqueId) + selectedValue.problemTitle;
        }
        return returnValue;
    }

    submitnotifications() {
        this.preferenceservice.isFormChanged = false
        var formValue = this.emailNotiForm.getRawValue()
        if (Object.keys(formValue.reportFrequencyId).length == 0 || Object.keys(formValue.emailNotifcationNotifcationReportScopeIds).length == 0) {
            var comfirmConfig: FuseConfirmationConfig = {
                "title": "In order to save the information it is required to enter Report Frequency and Report Scope!",
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
        } else {
            if(this.checkRequiredFields()){
                if (JSON.stringify(formValue) == JSON.stringify(this.emailDb)) {
                    this.preferenceservice.submitbutton.next(true)
                    this.projecthubservice.toggleDrawerOpen('', '', [], '', true)
                } else {
                    var mainObj = {
                        reportOptions: {
                            emailNotifcationNotifcationReportScopeIds: formValue.emailNotifcationNotifcationReportScopeIds.lookUpId || '',
                            emailNotifcationPortfolioReportTypes: formValue.emailNotifcationPortfolioReportTypes?.lookUpId || '77b04381-623f-4ab4-887d-8d4192d1bf4b',
                            executionScopeIds: formValue.excecutionScope ? formValue.excecutionScope.map(x => x.portfolioOwnerId).join() : '',
                            includeChild: formValue.includeChild ? formValue.includeChild : false,
                            notificationId: formValue.notificationId ? formValue.notificationId : null,
                            portfolioScopeIds: formValue.portfolioOwner
                                ? formValue.portfolioOwner.map(x => x.portfolioOwnerId).join()
                                : '',
                            productIds: formValue.products ? formValue.products.map(x => x.productId).join() : '',
                            projectIds: this.projects ? this.projects.map(x => x.problemUniqueId).join() : '',
                            recieveEmailNotification: formValue.recieveEmailNotification ? formValue.recieveEmailNotification : false,
                            reportFrequencyId: formValue.reportFrequencyId ? formValue.reportFrequencyId.lookUpId : '',
                            roleIds: formValue.role ? formValue.role.map(x => x.lookUpId).join() : '',
                            userId: this.msalService.instance.getActiveAccount().localAccountId,
                        },
                        eventsMasterData: [],
                        eventsUserData: []
                    }
                }
                if (this.emailNotiForm.get('recieveEmailNotification').value == true) {
                    this.apiService.editEmailSettings(mainObj, this.msalService.instance.getActiveAccount().localAccountId).then(Res => {
                        this.preferenceservice.isFormChanged = false
                        this.preferenceservice.submitbutton.next(true)
                        this.preferenceservice.toggleDrawerOpen('', '', [], '')
                        this.showConfirmationMessage()
                    })
                } else {
                    var deactivateConfig: FuseConfirmationConfig = {
                        "message": "Are you sure you want to de-activate the e-mail notifications?",
                        "icon": {
                            "show": true,
                            "name": "heroicons_outline:exclamation",
                            "color": "warn"
                        },
                        "actions": {
                            "confirm": {
                                "show": true,
                                "label": "Yes",
                                "color": "warn"
                            },
                            "cancel": {
                                "show": true,
                                "label": "Cancel"
                            }
                        },
                        "dismissible": true
                    }
                    const deactivateAlert = this.fuseAlert.open(deactivateConfig)
                    deactivateAlert.afterClosed().subscribe(close => {
                        if (close == 'confirmed') {
                            this.apiService.editEmailSettings(mainObj, this.msalService.instance.getActiveAccount().localAccountId).then(Res => {
                                this.preferenceservice.isFormChanged = false
                                this.preferenceservice.submitbutton.next(true)
                                this.preferenceservice.toggleDrawerOpen('', '', [], '')
                                this.showDeactivationMessage()
                            })
                        } else {
                            this.preferenceservice.isFormChanged = true;
                        }
                    })
                }
            }
            else{
                var comfirmConfig: FuseConfirmationConfig = {
                    "title": "In order to save the information , please select at least one value for the report scope",
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
                        }
                    },
                    "dismissible": true
                }
                this.fuseAlert.open(comfirmConfig)
            }

        }
    }
    checkRequiredFields(): boolean{
        if(this.emailNotiForm.controls['emailNotifcationNotifcationReportScopeIds'].value.lookUpId == 'ecbe5dae-7278-4b2f-906d-ec9aaa77d868' && this.emailNotiForm.controls['portfolioOwner'].value.length == 0){
            return false;
        }
        if(this.emailNotiForm.controls['emailNotifcationNotifcationReportScopeIds'].value.lookUpId == '11336470-8b35-4c7a-abe4-d62d58d33fca' && this.emailNotiForm.controls['excecutionScope'].value.length == 0){
            return false;
        }
        if(this.emailNotiForm.controls['emailNotifcationNotifcationReportScopeIds'].value.lookUpId == '897633cf-3516-49b0-9f45-a6ddc9374c0e' && this.emailNotiForm.controls['role'].value.length == 0){
            return false;
        }
        if(this.emailNotiForm.controls['emailNotifcationNotifcationReportScopeIds'].value.lookUpId == 'dca7a55b-6b8d-448e-b2be-0796a043775c' && this.projects.length == 0){
            return false;
        }
        if(this.emailNotiForm.controls['emailNotifcationNotifcationReportScopeIds'].value.lookUpId == 'd290915b-cda2-4ba3-87a3-ce504fd6f15c' && this.emailNotiForm.controls['products'].value.length == 0){
            return false;
        }
        return true;
    }
    showDeactivationMessage(): void {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "You have successfully de-activated the e-mail notification feature.",
            "message": "",
            "icon": {
                "show": true,
                "name": "heroicons_outline:check",
                "color": "success"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "Okay",
                    "color": "primary"
                },
            },
            "dismissible": true
        }
        this.fuseAlert.open(comfirmConfig)
    }

    showConfirmationMessage(): void {
        let titleText;
        if (this.emailNotiForm.get('reportFrequencyId').value.lookUpName == "Weekly") {
            titleText = "You have successfully activated the e-mail notification feature. The report will be distributed by e-mail every Sunday. Please note that only active projects are considered for e-mail notification."
        } else {
            titleText = "You have successfully activated the e-mail notification feature. The report will be distributed by e-mail every first Sunday of a month. Please note that only active projects are considered for e-mail notification."
        }
        var comfirmConfig: FuseConfirmationConfig = {
            "title": titleText,
            "message": "",
            "icon": {
                "show": true,
                "name": "heroicons_outline:check",
                "color": "success"
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
        this.fuseAlert.open(comfirmConfig)
    }
}
