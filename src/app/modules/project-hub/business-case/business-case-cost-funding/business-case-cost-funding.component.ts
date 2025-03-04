import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectApiService} from '../../common/project-api.service';
import {ProjectHubService} from '../../project-hub.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-business-case-cost-funding',
    templateUrl: './business-case-cost-funding.component.html',
    styleUrls: ['./business-case-cost-funding.component.scss']
})
export class BusinessCaseCostFundingComponent implements OnInit, OnDestroy {


    option: string = ''
    viewContent: boolean = false
    id: string;
    cost: any;
    funding: any;
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
        this.option = this._Activatedroute.parent.snapshot.routeConfig.path
        console.log(this.option)
// this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get("id");
// this.apiService.getCostFunding(this.id).then((res: any) => {
// this.cost = res.costData
// this.funding = res.fundingData
        this.viewContent = true
// });
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
      }

}
