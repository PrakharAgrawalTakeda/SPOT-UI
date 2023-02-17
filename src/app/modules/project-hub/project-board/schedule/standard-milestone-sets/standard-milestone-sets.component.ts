import {Component, Input, OnInit} from '@angular/core';
import {ProjectHubService} from "../../../project-hub.service";
import {ProjectApiService} from "../../../common/project-api.service";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {ActivatedRoute} from "@angular/router";
import { Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'app-standard-milestone-sets',
    templateUrl: './standard-milestone-sets.component.html',
    styleUrls: ['./standard-milestone-sets.component.scss']
})
export class StandardMilestoneSetsComponent implements OnInit {
    @Output() standardMilestonesAdded = new EventEmitter<any[]>();
    @Input() loadContent: boolean = false;
    standardMilestoneData: any = []
    standardMilestoneDBData: any = []
    standarMilestoneAdded: any = []
    viewContent: boolean = false
    id: string = ""
    constructor(public projectHubService: ProjectHubService,  public apiService: ProjectApiService, public fuseAlert: FuseConfirmationService,
                private _Activatedroute: ActivatedRoute) {
    }

    ngOnChanges() {
        if(this.loadContent){
            this.dataloader()
        }
    }
    ngOnInit(): void {

    }
    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.standardMilestoneData = []
        this.standardMilestoneDBData = []
        this.standarMilestoneAdded = []
        this.apiService.getStandardMilestoneSets(this.id).then(res => {
            this.standardMilestoneDBData = [...this.sortByLevel(res)]
            this.standardMilestoneData = this.sortByLevel(res)
            for (var i in this.standardMilestoneData) {
                this.standarMilestoneAdded.push([])
            }
            this.projectHubService.isFormChanged = false
            this.viewContent = true
        })
    }
    submitStandardMilestoneSets() {
        this.addStandardMilestonesToBulkEditList()
    }
    toggleSchedule(event: any) {
        this.standarMilestoneAdded[event.tableIndex] = [...event.selected]
    }
    sortByLevel(array: any): any {
        return array.length > 1 ? array.sort((a, b) => {
            if (a.level === null) {
                return -1;
            }
            if (b.level === null) {
                return 1;
            }
            if (a.level === b.level) {
                return 0;
            }
            return a.level < b.level ? -1 : 1;
        }) : array
    }
    addStandardMilestonesToBulkEditList() {
        this.standardMilestonesAdded.emit(this.standarMilestoneAdded);
    }
}
