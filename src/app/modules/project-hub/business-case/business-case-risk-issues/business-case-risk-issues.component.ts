import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectApiService} from "../../common/project-api.service";
import {lookupMaster} from "../../../../shared/lookup-global";
import {AuthService} from "../../../../core/auth/auth.service";
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-business-case-risk-issues',
    templateUrl: './business-case-risk-issues.component.html',
    styleUrls: ['./business-case-risk-issues.component.scss']
})
export class BusinessCaseRiskIssuesComponent implements OnInit,OnDestroy {
    id: string = ''
    projectViewDetails: any = {}
    viewContent: boolean = false
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(public projecthubservice: ProjectHubService,
                private _Activatedroute: ActivatedRoute,
                private apiService: ProjectApiService,
                private auth: AuthService) {
        this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            if (res) {
                this.dataloader()
            }
        })
    }

    ngOnInit(): void {
        if(this.projecthubservice.lookUpMaster.length === 0){
            this.auth.lookupMaster().then((lookup: any) => {
                this.projecthubservice.lookUpMaster = lookup;
                this.dataloader()
            })
        }else{
            this.dataloader()
        }
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
