import {ApplicationRef, Component, OnInit} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectApiService} from "../../common/project-api.service";
import {GlobalBusinessCaseOptions} from "../../../../shared/global-business-case-options";
import {Subject, takeUntil} from "rxjs";

@Component({
    selector: 'app-business-case-benefits',
    templateUrl: './business-case-benefits.component.html',
    styleUrls: ['./business-case-benefits.component.scss']
})
export class BusinessCaseBenefitsComponent implements OnInit {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    viewContent: boolean = false
    id: string = ''
    optionId: string = ''
    lookupMasters = []
    kpiMasters = []
    benefitsData:any;

    constructor(public projecthubservice: ProjectHubService,
                public auth: AuthService,
                private _Activatedroute: ActivatedRoute,
                public apiService: ProjectApiService,
                private router: Router,
                appRef: ApplicationRef) {
        this.projecthubservice.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            if (this.viewContent == true) {
                this.dataloader()
            }
        })
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
            this.apiService.getBusinessCaseBenefits(this.id, this.optionId).then((res: any) => {
                this.benefitsData = res;
                this.lookupMasters = lookup
                this.projecthubservice.lookUpMaster = lookup
                this.viewContent = true
            })
        })

    }


}
