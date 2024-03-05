import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {ProjectApiService} from "../../common/project-api.service";
import {ActivatedRoute} from "@angular/router";
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-business-case-timeline',
    templateUrl: './business-case-timeline.component.html',
    styleUrls: ['./business-case-timeline.component.scss']
})
export class BusinessCaseTimelineComponent implements OnInit, OnDestroy {

    projectViewDetails: any = {}
    viewContent: boolean = false
    id: string = ''
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(public projecthubservice: ProjectHubService,
                private apiService: ProjectApiService,
                private _Activatedroute: ActivatedRoute) {
        this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            if (res == true) {
                this.dataloader()
            }
        })
    }

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
        this.apiService.getprojectviewdata(this.id).then((res) => {
            this.projectViewDetails = res
            this.viewContent = true
        });
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
      }
}
