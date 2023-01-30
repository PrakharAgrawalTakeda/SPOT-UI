import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FuseConfirmationConfig, FuseConfirmationService} from '@fuse/services/confirmation';
import {debounceTime, filter, map, Observable, startWith, Subject, takeUntil} from 'rxjs';
import {ProjectHubService} from '../../project-hub.service';
import {ProjectApiService} from "../project-api.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GlobalVariables} from "../../../../shared/global-variables";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-link-project',
    templateUrl: './link-project.component.html',
    styleUrls: ['./link-project.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LinkProjectComponent implements OnInit {
    @Input() debounce: number = 300;
    @Input() minLength: number = 4;
    @Input() appearance: 'basic' | 'bar' = 'bar';
    @Output() search: EventEmitter<any> = new EventEmitter<any>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public fuseAlert: FuseConfirmationService,
        public projecthubservice: ProjectHubService,
        private apiService: ProjectApiService,
        private _httpClient: HttpClient,
        private _Activatedroute: ActivatedRoute,
        private router: Router) {
    }

    searchControl: FormControl = new FormControl();
    selectedValueExists: FormControl = new FormControl(true);
    detailsHaveBeenChanged: FormControl = new FormControl(false);
    opened: boolean = false;
    rows = [];
    resultSets: any[];
    budget: any = [];
    temp: string = "";
    viewContent = false;
    id: string = '';
    isParent: boolean = false;

    ngOnInit(): void {
        this.rows = this.projecthubservice.projectChildren;
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
                const params = new HttpParams().set('query', value);
                if (this.selectedValueExists.value == true && this.searchControl.value !="") {
                    this._httpClient.post(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`, {body: []})
                        .subscribe((resultSets: any) => {
                            for (var i = 0; i < resultSets.projectData.length; i++) {
                                var obj = resultSets.projectData[i];
                                if (this.projecthubservice.removedIds.indexOf(obj.problemUniqueId) !== -1) {
                                    resultSets.projectData.splice(i, 1);
                                    i--;
                                }
                            }
                            this.resultSets = resultSets.projectData;
                            this.budget = resultSets.budget
                            this.search.next(resultSets);
                            if(this.resultSets.length <= 5){
                                this.resultSets.forEach(x=> {
                                    this.apiService.isParent(x.problemUniqueId).then((res: any) => {
                                        x.isParent = res;
                                    });
                                })
                            }
                        });

                }
            });
    }

    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.viewContent = true;
    }
    ngOnDestroy() {
        if(this.detailsHaveBeenChanged.value==true)
            window.location.reload();
    }
    onRemoveLink(projectId) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Remove child",
            "message": "Are you sure you want to unlink this record?",
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
                this.apiService.DeleteLink(projectId).then((res: any) => {
                });
                const objWithIdIndex = this.projecthubservice.projectChildren.findIndex((obj) => obj.problemUniqueId === projectId);
                const index = this.projecthubservice.removedIds.indexOf(projectId);
                this.projecthubservice.removedIds.splice(index, 1);
                this.searchControl.setValue('');
                this.selectedValueExists.setValue(true)
                this.rows.splice(objWithIdIndex, 1);
                this.rows = [...this.rows];
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
        if (this.resultSets != []) {
            if (this.budget != []) {
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
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Add child",
            "message": "Are you sure you want to add this project as a child?",
            "icon": {
                "show": true,
                "name": "heroicons_outline:exclamation",
                "color": "primary"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "Yes",
                    "color": "primary"
                },
                "cancel": {
                    "show": true,
                    "label": "No"
                }
            },
            "dismissible": true
        }
        const addAlert = this.fuseAlert.open(comfirmConfig)
        addAlert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                var addedProject = this.resultSets.find(_ => _.problemUniqueId === childId);
                this.apiService.linkProject(childId, this.id).then((res: any) => {
                });
                this.searchControl.setValue('');
                this.selectedValueExists.setValue(true);
                this.projecthubservice.removedIds.push(childId, 1);
                this.rows.push(addedProject);
                this.rows = [...this.rows];
                this.detailsHaveBeenChanged.setValue(true);
            }
        })
    }
    displayFn(value?: number) {
        let returnValue = "";
        if (value) {
            const selectedValue = this.resultSets.find(_ => _.problemUniqueId === value);
            returnValue = (selectedValue.isParent ? "[PGM] " : "") + selectedValue.problemId + " - " + this.budgetfind(selectedValue.problemUniqueId) + selectedValue.problemTitle;
        }
        return returnValue;
    }

}
