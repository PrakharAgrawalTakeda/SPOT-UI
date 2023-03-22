import {Component, OnInit} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectApiService} from "../../common/project-api.service";

@Component({
    selector: 'app-project-proposal-benefits',
    templateUrl: './project-proposal-benefits.component.html',
    styleUrls: ['./project-proposal-benefits.component.scss']
})
export class ProjectProposalBenefitsComponent implements OnInit {

    viewContent: boolean = false
    id: string = ''
    projectViewDetails: any = {}
    lookupMasters = []
    kpiMasters = []

    constructor(public projecthubservice: ProjectHubService,
                public auth: AuthService,
                private _Activatedroute: ActivatedRoute,
                public apiService: ProjectApiService,) {
    }
    ngOnInit(): void {
        this.dataloader()
    }
    dataloader() {
        this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
        this.apiService.getprojectviewdata(this.id).then((res: any) => {
            this.auth.KPIMaster().then((kpis: any) => {
                this.auth.lookupMaster().then((lookup: any) => {
                    this.projectViewDetails = res
                    this.lookupMasters = lookup
                    this.kpiMasters = kpis
                    this.projecthubservice.lookUpMaster = lookup
                    this.projecthubservice.kpiMasters = kpis
                    this.viewContent = true
                })
            })
        })
    }

}
