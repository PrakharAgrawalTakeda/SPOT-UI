import {Component, OnInit} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectApiService} from "../../common/project-api.service";
import {GlobalBusinessCaseOptions} from "../../../../shared/global-business-case-options";

@Component({
    selector: 'app-business-case-benefits',
    templateUrl: './business-case-benefits.component.html',
    styleUrls: ['./business-case-benefits.component.scss']
})
export class BusinessCaseBenefitsComponent implements OnInit {

    viewContent: boolean = false
    id: string = ''
    optionId: string = ''
    lookupMasters = []
    kpiMasters = []

    constructor(public projecthubservice: ProjectHubService,
                public auth: AuthService,
                private _Activatedroute: ActivatedRoute,
                public apiService: ProjectApiService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.dataloader()
    }

    dataloader() {
        this.id = this._Activatedroute.parent.parent.parent.snapshot.paramMap.get('id');
        this.projecthubservice.projectid = this.id;
        if (this.router.url.includes('option-3')) {
            this.optionId= GlobalBusinessCaseOptions.OPTION_3
        }
        if (this.router.url.includes('option-2')) {
            this.optionId= GlobalBusinessCaseOptions.OPTION_2
        }
        if (this.router.url.includes('recommended-option')) {
            this.optionId=GlobalBusinessCaseOptions.OPTION_1
        }
        this.auth.lookupMaster().then((lookup: any) => {
            this.lookupMasters = lookup
            this.projecthubservice.lookUpMaster = lookup
            this.viewContent = true
        })
    }


}
