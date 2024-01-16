import {ApplicationRef, Component, Input} from '@angular/core';
import {ProjectHubService} from "../../project-hub.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectApiService} from "../project-api.service";
import {FormControl, FormGroup} from "@angular/forms";
import { PortfolioApiService } from 'app/modules/portfolio-center/portfolio-api.service';


@Component({
    selector: 'app-benefits-page',
    templateUrl: './benefits-page.component.html',
    styleUrls: ['./benefits-page.component.scss']
})
export class BenefitsPageComponent {
    @Input() optionId;
    @Input() lookup: any;
    @Input() benefitsData: any;
    viewContent: boolean = false
    localCurrency:any = [];

    constructor(public projectHubService: ProjectHubService,
                private _Activatedroute: ActivatedRoute,
                private portApiService: PortfolioApiService,
                public apiService: ProjectApiService,) {
    }

    benefitsInfoForm = new FormGroup({
        projectId: new FormControl(''),
        optionId: new FormControl(''),
        strategicAlignment: new FormControl(''),
        strategicAlignmentJustification: new FormControl(''),
        npvBaseCase: new FormControl(''),
        npvHighCase: new FormControl(''),
        npvRationale: new FormControl(''),
        operationalBenefits: new FormControl(''),
    })

    ngOnInit(): void {
        this.dataloader()
    }
    ngOnChanges() {
        this.dataloader()
    }
    dataloader() {
        this.benefitsInfoPatchValue(this.benefitsData)
        this.benefitsInfoForm.disable()
        this.portApiService.getOnlyLocalCurrency(this.benefitsData.projectId).then(currency => {
            this.localCurrency = currency
        });
    }

    benefitsInfoPatchValue(response) {
        this.benefitsInfoForm.patchValue({
            projectId: response.projectId,
            optionId: response.optionId,
            strategicAlignment: response.strategicAlignment,
            strategicAlignmentJustification: response.strategicAlignmentJustification,
            npvBaseCase: response.npvBaseCase,
            npvHighCase: response.npvHighCase,
            npvRationale: response.npvRationale,
            operationalBenefits: response.operationalBenefits,
        })
    }
}
