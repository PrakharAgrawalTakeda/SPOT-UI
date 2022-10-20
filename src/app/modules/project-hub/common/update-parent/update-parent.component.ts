import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {debounceTime, filter, map, Observable, startWith, Subject, takeUntil} from 'rxjs';
import { ProjectHubService } from '../../project-hub.service';
import {HttpClient, HttpParams} from "@angular/common/http";
import {GlobalVariables} from "../../../../shared/global-variables";
import {ActivatedRoute} from "@angular/router";
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
    resultValueName = new FormControl('');
    resultSets: any[];
    budget: any = [];
    temp: string = "";
    opened: boolean = false;
    id: string = '';
    removedIds: any[];

    constructor(
        public fuseAlert: FuseConfirmationService,
        public projecthubservice: ProjectHubService,
        private _httpClient: HttpClient,
        private _Activatedroute: ActivatedRoute,
        private apiService: ProjectApiService,
    ) {}

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

                    // Set the resultSets to null if there is no value or
                    // the length of the value is smaller than the minLength
                    // so the autocomplete panel can be closed
                    if ( !value || value.length < this.minLength )
                    {
                        this.resultSets = null;
                    }
                    this.temp = value
                    // Continue
                    return value;
                }),
                // Filter out undefined/null/false statements and also
                // filter out the values that are smaller than minLength
                filter(value => value && value.length >= this.minLength)
            )
            .subscribe((value) => {
                const params = new HttpParams().set('query', value);
                this._httpClient.post(GlobalVariables.apiurl+`Projects/Search?${params.toString()}`, {body:[]})
                    .subscribe((resultSets: any) => {
                        resultSets.projectData.forEach((item, index)=> {
                            this.removedIds.find(removedId=>{
                                if(item.problemUniqueId == removedId){
                                    resultSets.projectData.splice(index, 1);
                                }
                            })
                        })
                        // Store the result sets
                        this.resultSets = resultSets.projectData;
                        this.budget = resultSets.budget
                        console.log(resultSets)
                        console.log(GlobalVariables.apiurl+`Projects/Search?${params.toString()}`)
                        // Execute the event
                        this.search.next(resultSets);
                    });
            });
    }
    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        var ids = [];
        this.apiService.getProjectTree(this.id).then((res: any) => {
            res.values.forEach(project => {
                ids.push(project.problemUniqueId);
            })
            this.removedIds = ids;
        });
        this.viewContent = true;
    }
    onKeydown(event: KeyboardEvent): void
    {
        if ( this.appearance === 'bar' )
        {
            if ( event.code === 'Escape' )
            {
                this.close();
            }
        }
    }
    close(): void
    {
        if ( !this.opened )
        {
            return;
        }
        this.searchControl.setValue('');

        this.opened = false;
    }
    routeProject(projectid):void{
        window.open('project-hub/'+ projectid, "_blank")
    }
    budgetfind(projectid: string): string{
        if(this.resultSets != []){
            if(this.budget != []){
                var temp = this.budget.find(x=>x.projectId == projectid)
                if(temp != null){
                    return temp.capitalBudgetId
                }
            }
        }
        return ""
    }
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
    onOptionSelected(value: any) {
        this.resultValueName.setValue(value.problemId);
    }
    onSave(parentId){
        this.apiService.updateParent(this.id, parentId).then((res: any) => {
        });
    }
}
