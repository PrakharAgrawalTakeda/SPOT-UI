import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FuseConfirmationConfig, FuseConfirmationService } from '@fuse/services/confirmation';
import { debounceTime, filter, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { ProjectHubService } from '../../project-hub.service';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GlobalVariables } from "../../../../shared/global-variables";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectApiService } from "../project-api.service";
import { RoleService } from 'app/core/auth/role.service';
import { MsalService } from '@azure/msal-angular';

@Component({
    selector: 'app-update-parent',
    templateUrl: './update-parent.component.html',
    styleUrls: ['./update-parent.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UpdateParentComponent implements OnInit {
    @Input() debounce: number = 300;
    @Input() minLength: number = 4;
    @Input() appearance: 'basic' | 'bar' = 'bar';
    @Output() search: EventEmitter<any> = new EventEmitter<any>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    searchControl: FormControl = new FormControl();
    selectedValueExists: FormControl = new FormControl(true);
    detailsHaveBeenChanged: FormControl = new FormControl(false);
    resultSets: any[];
    budget: any = [];
    temp: string = "";
    opened: boolean = false;
    id: string = '';
    removedIds: any[];
    rows = [];
    isConfidential: boolean = false;

    constructor(
        public fuseAlert: FuseConfirmationService,
        public projecthubservice: ProjectHubService,
        private _httpClient: HttpClient,
        private _Activatedroute: ActivatedRoute,
        private apiService: ProjectApiService,
        private router: Router, private roleService: RoleService, private msalService: MsalService
    ) {
    }

    viewContent = false;

    ngOnInit(): void {
        this.dataloader();
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
                this.refreshData(value)
            });
    }
    onFocus(event: FocusEvent): void {
        const value = this.searchControl.value;
        if (value && value.length >= this.minLength) {
          this.refreshData(value);
        }
      }
    private refreshData(value: string) {
        const params = new HttpParams().set('query', value);
        if (this.selectedValueExists.value == true && this.searchControl.value != "") {
            this._httpClient.post(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`, { body: [] })
                .subscribe((resultSets: any) => {
                    for (var i = 0; i < resultSets.projectData.length; i++) {
                        var obj = resultSets.projectData[i];
                        if (this.projecthubservice.removedIds.indexOf(obj.problemUniqueId) !== -1) {
                            resultSets.projectData.splice(i, 1);
                            i--;
                        }
                    }
                    if (!this.isConfidential) {
                        this.resultSets = resultSets.projectData?.filter(x => !x.isConfidential);
                        console.log("Confidential Projects", this.resultSets)
                    }
                    else {
                        var activeaccount = this.msalService.instance.getActiveAccount()
                        this.roleService.getCurrentRole(activeaccount.localAccountId).then((resp: any) => {
                            if (resp.confidentialProjects.length > 0) {
                                var confProjectUserList = resultSets.projectData?.filter(x => resp.confidentialProjects?.includes(x.problemUniqueId));
                                if (confProjectUserList?.length > 0) {
                                    this.resultSets = [...confProjectUserList];
                                }
                            }
                        });
                    }
                    this.budget = resultSets.budget
                    this.search.next(resultSets);
                });
        }
    }
    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        var currentProj = this.projecthubservice.projects.find((obj) => obj.problemUniqueId === this.id);
        if (currentProj.parentId != null) {
            var parrentProj = this.projecthubservice.projects.find((obj) => obj.problemUniqueId === currentProj.parentId);
            this.rows.push(parrentProj);
        }
        this.apiService.getproject(this.projecthubservice.projectid).then((res: any) => {
            this.isConfidential = res.isConfidential
            this.viewContent = true;
        })
    }

    onKeydown(event: KeyboardEvent): void {
        if (this.appearance === 'bar') {
            if (event.code === 'Escape') {
                this.close();
            }
        }
    }

    ngOnDestroy() {
        if (this.detailsHaveBeenChanged.value == true)
            window.location.reload();
    }

    close(): void {
        if (!this.opened) {
            return;
        }
        this.searchControl.setValue('');
        this.opened = false;
    }

    routeProject(projectid): void {
        window.open('project-hub/' + projectid, "_blank")
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

    displayFn(value?: number) {
        let returnValue = "";
        if (value && this.resultSets) {
            const selectedValue = this.resultSets.find(_ => _.problemUniqueId === value);
            returnValue = selectedValue.problemId + " - " + this.budgetfind(selectedValue.problemUniqueId) + selectedValue.problemTitle;
        }
        return returnValue;
    }

    onOptionSelected(event: any): void {
        this.selectedValueExists.setValue(false)
    }

    onSave(parentId) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Upate Parent Project",
            "message": "Changing the parent project will remove all links to the original parent program. Are you sure you want to update the parent project? ",
            "icon": {
                "show": true,
                "name": "heroicons_outline:exclamation",
                "color": "warn"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "Update",
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
                var addedProject = this.resultSets.find(_ => _.problemUniqueId === parentId);
                this.apiService.updateParent(this.id, parentId).then((res: any) => {
                });
                this.searchControl.setValue('');
                this.selectedValueExists.setValue(true);
                this.rows = [];
                this.rows.push(addedProject);
                this.rows = [...this.rows];
                this.detailsHaveBeenChanged.setValue(true);
            }
        })
    }

    onRemoveLink(parentId) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Remove Parent",
            "message": "Changing the parent project will remove all links to the original parent program. Are you sure you want to update the parent project?",
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
                this.apiService.DeleteLink(this.id).then((res: any) => {
                });
                const objWithIdIndex = this.projecthubservice.projectChildren.findIndex((obj) => obj.problemUniqueId === this.id);
                const index = this.projecthubservice.removedIds.indexOf(parentId);
                this.projecthubservice.removedIds.splice(index, 1);
                this.searchControl.setValue('');
                this.selectedValueExists.setValue(true)
                this.rows.splice(objWithIdIndex, 1);
                this.rows = [...this.rows];
                this.detailsHaveBeenChanged.setValue(true);
            }
        })
    }
}
