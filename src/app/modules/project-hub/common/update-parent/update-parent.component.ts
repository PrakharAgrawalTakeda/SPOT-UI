import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FuseConfirmationConfig, FuseConfirmationService} from '@fuse/services/confirmation';
import {debounceTime, filter, map, Observable, startWith, Subject, takeUntil} from 'rxjs';
import {ProjectHubService} from '../../project-hub.service';
import {HttpClient, HttpParams} from "@angular/common/http";
import {GlobalVariables} from "../../../../shared/global-variables";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectApiService} from "../project-api.service";

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
    selectedValue: FormControl = new FormControl(true);
    resultSets: any[];
    budget: any = [];
    temp: string = "";
    opened: boolean = false;
    id: string = '';
    removedIds: any[];
    inputValue = '';


    constructor(
        public fuseAlert: FuseConfirmationService,
        public projecthubservice: ProjectHubService,
        private _httpClient: HttpClient,
        private _Activatedroute: ActivatedRoute,
        private apiService: ProjectApiService,
        private router: Router
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
        var currentProj = this.projecthubservice.projects.find((obj) => obj.problemUniqueId === this.id);
        if(currentProj.parentId!=null){
            var parrentProj = this.projecthubservice.projects.find((obj) => obj.problemUniqueId === currentProj.parentId);
            this.resultSets = currentProj.parentId;
            this.inputValue = parrentProj.problemId + " - " + this.budgetfind(parrentProj.problemUniqueId) + parrentProj.problemTitle;
            this.selectedValue.setValue(false);
        }
        this.viewContent = true;
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

    routeProject(projectid): void {
        window.open('project-hub/' + projectid, "_blank")
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

    displayFn(value?: number) {
        let returnValue = "";
        if (value && this.resultSets ) {
            const selectedValue = this.resultSets.find(_ => _.problemUniqueId === value);
            returnValue = selectedValue.problemId + " - " + this.budgetfind(selectedValue.problemUniqueId) + selectedValue.problemTitle;
        }
        return returnValue;
    }

    onOptionSelected(event: any): void {
        this.selectedValue.setValue(false)
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
                this.apiService.updateParent(this.id, parentId).then((res: any) => {
                });
                this.projecthubservice.toggleDrawerOpen('', '', [], '');
                window.location.reload();
            }
        })
    }
    redirectTo(uri:string){
        this.router.navigateByUrl('/', )
            .then(()=> this.router.navigate([uri]));
    }
}
