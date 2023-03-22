import {Component, OnInit} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectApiService} from "../../common/project-api.service";

@Component({
    selector: 'app-business-case-benefits',
    templateUrl: './business-case-benefits.component.html',
    styleUrls: ['./business-case-benefits.component.scss']
})
export class BusinessCaseBenefitsComponent implements OnInit {

    viewContent: boolean = false
    id: string = ''
    lookupMasters = []
    kpiMasters = []

    constructor(public projecthubservice: ProjectHubService,
                public auth: AuthService,
                private _Activatedroute: ActivatedRoute,
                public apiService: ProjectApiService) {
    }

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.auth.KPIMaster().then((kpis: any) => {
            this.auth.lookupMaster().then((lookup: any) => {
                this.lookupMasters = lookup
                this.kpiMasters = kpis
                this.projecthubservice.lookUpMaster = lookup
                this.projecthubservice.kpiMasters = kpis
                this.viewContent = true
            })
        })

    }


}
