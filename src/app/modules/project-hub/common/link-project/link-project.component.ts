import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FuseConfirmationConfig, FuseConfirmationService} from '@fuse/services/confirmation';
import {debounceTime, filter, map, Observable, startWith, Subject, takeUntil} from 'rxjs';
import {ProjectHubService} from '../../project-hub.service';
import {ProjectApiService} from "../project-api.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GlobalVariables} from "../../../../shared/global-variables";
import {ActivatedRoute} from "@angular/router";

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
        private _Activatedroute: ActivatedRoute,) {
    }

    searchControl: FormControl = new FormControl();
    selectedValue: FormControl = new FormControl(true);
    opened: boolean = false;
    rows = [];
    inputValue = '';
    resultSets: any[];
    budget: any = [];
    temp: string = "";
    viewContent = false;
    id: string = '';

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
                if (this.selectedValue.value == true) {
                    this._httpClient.post(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`, {body: []})
                        .subscribe((resultSets: any) => {
                            resultSets.projectData.forEach((item, index) => {
                                this.projecthubservice.removedIds.find(removedId => {
                                    if (item.problemUniqueId == removedId) {
                                        resultSets.projectData.splice(index, 1);
                                    }
                                })
                            })
                            this.resultSets = resultSets.projectData;
                            this.budget = resultSets.budget
                            this.search.next(resultSets);
                        });
                }
            });
    }

    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.viewContent = true;
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
        const riskIssueAlert = this.fuseAlert.open(comfirmConfig)

        riskIssueAlert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                this.apiService.DeleteLink(projectId).then((res: any) => {
                });
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
        this.selectedValue.setValue(false)
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
        this.apiService.updateParent(childId, this.id).then((res: any) => {
        });
        this.projecthubservice.toggleDrawerOpen('', '', [], '');
        window.location.reload();
    }

}
