import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { debounceTime, filter, map, startWith, Subject, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations/public-api';
import { Router } from '@angular/router';
import { GlobalVariables } from 'app/shared/global-variables';
import { RoleService } from 'app/core/auth/role.service';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    encapsulation: ViewEncapsulation.None,
    exportAs: 'fuseSearch',
    animations: fuseAnimations
})
export class SearchComponent implements OnChanges, OnInit, OnDestroy {
    @Input() appearance: 'basic' | 'bar' = 'bar';
    @Input() debounce: number = 300;
    @Input() minLength: number = 4;
    @Output() search: EventEmitter<any> = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<string>();
    @Input() opened: boolean = false;
    @Input() calledFrom: string = "";
    projectdata: any;
    // opened: boolean = false;
    resultSets: any[];
    budget: any = [];
    hide: boolean = true
    searchControl: FormControl = new FormControl();
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    temp: string = ""

    /**
     * Constructor
     */
    constructor(
        private _elementRef: ElementRef,
        private _httpClient: HttpClient,
        private _renderer2: Renderer2,
        private routes: Router,
        private roleService: RoleService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        return {
            'search-appearance-bar': this.appearance === 'bar',
            'search-appearance-basic': this.appearance === 'basic',
            'search-opened': this.opened
        };
    }

    /**
     * Setter for bar search input
     *
     * @param value
     */
    @ViewChild('barSearchInput')
    set barSearchInput(value: ElementRef) {
        // If the value exists, it means that the search input
        // is now in the DOM and we can focus on the input..
        if (value) {
            // Give Angular time to complete the change detection cycle
            setTimeout(() => {

                // Focus to the input element
                value.nativeElement.focus();
            });
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Appearance
        if ('appearance' in changes) {
            // To prevent any issues, close the
            // search after changing the appearance
            this.close();
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the search field value changes
        this.searchControl.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this._unsubscribeAll),
                startWith(''),
                map((value) => {

                    // Set the resultSets to null if there is no value or
                    // the length of the value is smaller than the minLength
                    // so the autocomplete panel can be closed
                    if (!value || value.length < this.minLength) {
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
                this._httpClient.post(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`, { body: [] })
                    .subscribe((resultSets: any) => {

                        // Store the result sets
                        this.resultSets = resultSets.projectData?.filter(x => !x.isConfidential);
                        if (this.roleService.roleMaster?.confidentialProjects) {
                            if (this.roleService.roleMaster.confidentialProjects.length > 0) {
                                var confProjectUserList = resultSets.projectData?.filter(x=>this.roleService.roleMaster.confidentialProjects.includes(x.problemUniqueId) )
                                if(confProjectUserList?.length>0){
                                    console.log(confProjectUserList)
                                    this.resultSets = [...this.resultSets, ...confProjectUserList]
                                }
                            }
                        }
                        this.budget = resultSets.budget
                        console.log(resultSets)
                        console.log(GlobalVariables.apiurl + `Projects/Search?${params.toString()}`)
                        // Execute the event
                        this.search.next(resultSets);
                    });
            });
    }
    routeProject(projectid): void {
        if (this.calledFrom != 'Copy') {
            window.open('project-hub/' + projectid, "_blank")

        }

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
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On keydown of the search input
     *
     * @param event
     */
    selectedOption(event: any): void {
        if (this.calledFrom == 'Copy') {
            //  this.searchControl.patchValue(event.option.value.problemTitle);
            //  this.projectid = event.option.value.problemUniqueId;
            this.searchControl.patchValue("")
            this.projectdata = event.option.value
            this.addNewItem();
            this.hide = false
            //  this.getNgxDatatableNumberHeader()
        }
        else {
            this.searchControl.patchValue(this.temp)
            this.routeProject(event.option.value.problemUniqueId)
            document.getElementById('myText').blur();
        }
    }

    // getNgxDatatableNumberHeader(): any {
    //     this.hide= true
    //     return ' ngx-hide';
    // }

    addNewItem() {
        this.newItemEvent.emit(this.projectdata);
    }

    onKeydown(event: KeyboardEvent): void {
        // Listen for escape to close the search
        // if the appearance is 'bar'
        if (this.appearance === 'bar') {
            // Escape
            if (event.code === 'Escape') {
                // Close the search
                this.close();
            }
        }
    }

    /**
     * Open the search
     * Used in 'bar'
     */
    open(): void {

        // Return if it's already opened
        if (this.opened) {
            return;
        }
        window.scroll(0, 0);
        // Open the search
        this.opened = true;
    }

    /**
     * Close the search
     * * Used in 'bar'
     */
    close(): void {
        if (this.calledFrom == "Copy") {
            this.searchControl.setValue('');
        }
        else {
            // Return if it's already closed
            if (!this.opened) {
                return;
            }

            // Clear the search input
            this.searchControl.setValue('');

            // Close the search
            this.opened = false;
        }
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
