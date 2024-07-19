import {Component, Input, OnDestroy} from '@angular/core';
import {ProjectApiService} from "../../common/project-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectHubService} from "../../project-hub.service";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {PortfolioApiService} from "../../../portfolio-center/portfolio-api.service";
import { Subject, takeUntil } from 'rxjs';
@Component({
    selector: 'app-budget-funding-information-table',
    templateUrl: './budget-funding-information-table.component.html',
    styleUrls: ['./budget-funding-information-table.component.scss']
})
export class BudgetFundingInformationTableComponent implements OnDestroy {
    @Input() editable: boolean
    @Input() budgetInfo: any;
    @Input() addButtonShow: boolean;
    bulkEditButtonShow: boolean = false;
    fundingRequests = [];
    id: string = ''
    localCurrency:any = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute,
                public projecthubservice: ProjectHubService,
                public fuseAlert: FuseConfirmationService) {
        this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            if (res == true) {
                this.dataloader()
            }
        })
    }

    ngOnInit(): void {
        this.dataloader()
    }
    ngOnChanges() {
        this.dataloader()
    }

    dataloader() {
        this.id = this._Activatedroute.parent.snapshot.paramMap.get("id");
        this.fundingRequests = this.budgetInfo?.budgetIOs
        if(this.budgetInfo.budgetIOs.length!=0){
            for(let ios of this.budgetInfo.budgetIOs){
                if(ios.keep == true){
                    this.bulkEditButtonShow = true;
                    break;
                }
            }
        }else{
            if(this.addButtonShow){
                this.bulkEditButtonShow = true;
            }
        }
    }

    deleteFundingRequest(id: string) {
        var comfirmConfig: FuseConfirmationConfig = {
            "title": "Remove Funding Request?",
            "message": "Are you sure you want to delete this record? ",
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
        const fundingRequestAlert = this.fuseAlert.open(comfirmConfig)
        fundingRequestAlert.afterClosed().subscribe(close => {
            if (close == 'confirmed') {
                const indexToRemove = this.fundingRequests.findIndex(obj => obj.budgetIoid === id);
                if (indexToRemove !== -1) {
                    this.fundingRequests.splice(indexToRemove, 1);
                    this.budgetInfo.budgetIOs = this.fundingRequests;
                    this.apiService.updateBudgetPageInfo(this.id,this.budgetInfo).then(res => {
                        this.projecthubservice.submitbutton.next(true)
                        this.projecthubservice.isNavChanged.next(true)
                    })
                }
            }
        })
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
      }
}
